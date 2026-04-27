<template>
  <canvas ref="canvasRef" class="bg-mesh" aria-hidden="true" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Living mesh background for the hero. Floating nodes drift; when two come
// close they "connect" — both nodes type "connecting" then sit at "connected"
// while a tiny bloom-filter readout shows which peers each one has seen.
// Pull them apart and they type "disconnecting" before going dark.
//
// Built as a self-sized canvas so the same component drops into other
// sections later without code changes.

const canvasRef = ref<HTMLCanvasElement | null>(null)
let cleanup: (() => void) | null = null

// Tunables ----------------------------------------------------------------
const NODE_DENSITY = 0.000022          // nodes per px² of hero area
const NODE_MIN = 10
const NODE_MAX = 20
// Wired baseline ranges. Wireless edges scale these (see rangesFor below).
const CONNECT_DIST = 240
const DISCONNECT_DIST = 290
// Wireless short-range falls off faster — phones, BLE-style hops.
const WL_SHORT_SCALE = 0.55
// Wireless long-range — the LoRa / directional-antenna outlier that
// visually anchors the mesh with a stretched-out link almost always present.
const WL_LONG_SCALE = 1.85
const HANDSHAKE_MS = 900               // typewriter window for connect/disconnect
const NODE_RADIUS = 6
const DRIFT_NUDGE = 0.012              // per-frame random drift kick
// Synthetic link stats — derived from distance, just to feel network-y.
// Closer pairs read as fatter, faster, lower-latency links.
const LATENCY_MIN_MS = 6
const LATENCY_MAX_MS = 80
const BW_MIN_MBPS = 4
const BW_MAX_MBPS = 96
const LINE_W_MIN = 0.8
const LINE_W_MAX = 2.6
// Multi-hop messages route through the mesh: pick a source, BFS along
// connected edges, animate a glowing dot from hop to hop until it reaches
// the destination. Each hop's duration scales with that link's *displayed*
// latency — fast links carry the packet quickly, slow ones drag it along.
const PACKET_SPAWN_PERIOD_MS = 650
const PACKET_HOP_MS_MIN = 120          // floor so a 6 ms link still reads
const PACKET_HOP_MS_MAX = 900          // ceiling so an 80 ms link doesn't crawl
const PACKET_HOP_MS_PER_LATENCY = 9    // multiplier from latency-ms → hop-ms
const PACKET_TAIL_FADE_HOPS = 1.4      // trail length, in hops

// Palette borrowed from learn.fips.network — cyan-leaning, lighter feel
// than the gold/green fips-site default. Hex-coded RGB triplets get reused
// in the rgba() string templates below.
const COLOR_NODE = '#22d3ee'                                 // fips-accent
const COLOR_NODE_GLOW = 'rgba(34, 211, 238, 0.45)'
const COLOR_LABEL = 'rgba(226, 232, 240, 0.92)'              // fips-text
const COLOR_LABEL_DIM = 'rgba(136, 150, 171, 0.65)'          // fips-muted
const COLOR_EDGE_CONNECTING = 'rgba(245, 158, 11, ALPHA)'    // fips-highlight (amber pulse)
const COLOR_EDGE_CONNECTED = 'rgba(34, 211, 238, ALPHA)'     // fips-accent
const COLOR_EDGE_DISCONNECTING = 'rgba(248, 113, 113, ALPHA)' // fips-red

interface MeshNode {
  id: number
  x: number
  y: number
  vx: number
  vy: number
}

type EdgeState = 'connecting' | 'connected' | 'disconnecting'
interface Edge {
  a: number
  b: number
  state: EdgeState
  startedAt: number
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const reduceMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)')
  let reduceMotion = reduceMotionMQ.matches

  let width = 0
  let height = 0
  let nodes: MeshNode[] = []
  // Edge identity is the unordered pair (a,b); key is `min_max`.
  const edges = new Map<string, Edge>()
  let rafId: number | null = null
  const start = performance.now()

  function edgeKey(a: number, b: number) {
    return a < b ? `${a}_${b}` : `${b}_${a}`
  }

  // Stable medium per pair — derived from node ids so a pair always uses
  // the same medium across reconnects. ~35% wireless, of which ~12% are
  // long-range; tweak the modulo cutoffs to redial the balance.
  function isWireless(a: number, b: number) {
    const h = ((a * 2654435761) ^ (b * 40503)) >>> 0
    return (h % 100) < 35
  }
  function isLongRange(a: number, b: number) {
    if (!isWireless(a, b)) return false
    const h = ((a * 1597) ^ (b * 1009)) >>> 0
    return (h % 100) < 12
  }

  function rangesFor(a: number, b: number) {
    if (isLongRange(a, b)) {
      return {
        connect: CONNECT_DIST * WL_LONG_SCALE,
        disconnect: DISCONNECT_DIST * WL_LONG_SCALE,
      }
    }
    if (isWireless(a, b)) {
      return {
        connect: CONNECT_DIST * WL_SHORT_SCALE,
        disconnect: DISCONNECT_DIST * WL_SHORT_SCALE,
      }
    }
    return { connect: CONNECT_DIST, disconnect: DISCONNECT_DIST }
  }

  function rebuildNodes() {
    const area = Math.max(1, width * height)
    const count = Math.min(
      NODE_MAX,
      Math.max(NODE_MIN, Math.round(area * NODE_DENSITY)),
    )
    nodes = []
    edges.clear()
    for (let i = 0; i < count; i++) {
      nodes.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      })
    }
  }

  function resize() {
    const rect = canvas!.getBoundingClientRect()
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    width = rect.width
    height = rect.height
    canvas!.width = Math.floor(width * dpr)
    canvas!.height = Math.floor(height * dpr)
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx!.font = '10px "JetBrains Mono", monospace'
    rebuildNodes()
  }

  function tickPhysics(dtMs: number) {
    if (reduceMotion) return
    const dt = Math.min(dtMs, 32) / 16  // normalise to ~16ms frame
    const pad = 12
    for (const n of nodes) {
      n.x += n.vx * dt
      n.y += n.vy * dt
      // Soft drift drag so they don't shoot off after a collision push.
      n.vx *= 0.998
      n.vy *= 0.998
      // Random nudge keeps the field from settling into a static lattice
      // and gives the connect/disconnect cycles a steady churn.
      n.vx += (Math.random() - 0.5) * DRIFT_NUDGE
      n.vy += (Math.random() - 0.5) * DRIFT_NUDGE
      // Cap top speed so big nudges over time don't snowball.
      const speed = Math.hypot(n.vx, n.vy)
      const cap = 1.4
      if (speed > cap) {
        n.vx = (n.vx / speed) * cap
        n.vy = (n.vy / speed) * cap
      }
      if (n.x < pad) {
        n.x = pad
        n.vx = Math.abs(n.vx)
      }
      if (n.x > width - pad) {
        n.x = width - pad
        n.vx = -Math.abs(n.vx)
      }
      if (n.y < pad) {
        n.y = pad
        n.vy = Math.abs(n.vy)
      }
      if (n.y > height - pad) {
        n.y = height - pad
        n.vy = -Math.abs(n.vy)
      }
    }
  }

  function tickEdges(now: number) {
    // Promote / demote edges based on distance + elapsed handshake time.
    // Connect/disconnect thresholds are per-pair so wireless short edges
    // break sooner and the rare long-range link survives across the screen.
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]
        const b = nodes[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d = Math.hypot(dx, dy)
        const key = edgeKey(a.id, b.id)
        const existing = edges.get(key)
        const r = rangesFor(a.id, b.id)

        if (!existing) {
          if (d < r.connect) {
            edges.set(key, {
              a: a.id, b: b.id, state: 'connecting', startedAt: now,
            })
          }
          continue
        }

        const age = now - existing.startedAt
        if (existing.state === 'connecting') {
          if (d > r.disconnect) {
            // Pulled apart before the handshake completed — silent drop.
            edges.delete(key)
          } else if (age >= HANDSHAKE_MS) {
            existing.state = 'connected'
            existing.startedAt = now
          }
        } else if (existing.state === 'connected') {
          if (d > r.disconnect) {
            existing.state = 'disconnecting'
            existing.startedAt = now
          }
        } else if (existing.state === 'disconnecting') {
          if (d < r.connect) {
            // Came back together mid-disconnect — reverse course.
            existing.state = 'connected'
          } else if (age >= HANDSHAKE_MS) {
            edges.delete(key)
          }
        }
      }
    }
  }

  // Per-node summary for label rendering. Only handshake states surface a
  // label — once connected, the edge line itself is the visual.
  type NodeStatus =
    | { kind: 'idle' }
    | { kind: 'typing'; text: string; revealed: number; alpha: number }
  function nodeStatus(idx: number, now: number): NodeStatus {
    let connecting: Edge | null = null
    let disconnecting: Edge | null = null
    for (const e of edges.values()) {
      if (e.a !== idx && e.b !== idx) continue
      if (e.state === 'connecting') {
        if (!connecting || e.startedAt > connecting.startedAt) connecting = e
      } else if (e.state === 'disconnecting') {
        if (!disconnecting || e.startedAt > disconnecting.startedAt) disconnecting = e
      }
    }

    const handshake = connecting ?? disconnecting
    if (handshake) {
      const text = handshake.state === 'connecting' ? 'connecting…' : 'disconnecting…'
      const t = (now - handshake.startedAt) / HANDSHAKE_MS
      const revealed = Math.min(text.length, Math.ceil(t * text.length))
      // Fade label out in the last 20% so it doesn't blink off abruptly.
      const alpha = t > 0.8 ? Math.max(0, (1 - t) / 0.2) : 1
      return { kind: 'typing', text, revealed, alpha }
    }
    return { kind: 'idle' }
  }

  // Map a distance into [0..1] where 1 = touching, 0 = at this edge's
  // disconnect boundary. Per-edge so a long-range link still reads as
  // "fading" near its own boundary rather than the wired one.
  function linkStrength(d: number, disconnect: number) {
    return Math.max(0, Math.min(1, 1 - d / disconnect))
  }

  function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
  }

  function drawEdges(now: number) {
    for (const e of edges.values()) {
      const a = nodes[e.a]
      const b = nodes[e.b]
      if (!a || !b) continue
      const r = rangesFor(e.a, e.b)
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      const strength = linkStrength(dist, r.disconnect)
      const age = now - e.startedAt
      let alpha = 0.45
      let template = COLOR_EDGE_CONNECTED
      let width = lerp(LINE_W_MIN, LINE_W_MAX, strength)
      if (e.state === 'connecting') {
        alpha = Math.min(0.6, age / HANDSHAKE_MS)
        template = COLOR_EDGE_CONNECTING
        width = 1
      } else if (e.state === 'disconnecting') {
        alpha = Math.max(0, 0.6 * (1 - age / HANDSHAKE_MS))
        template = COLOR_EDGE_DISCONNECTING
        width = lerp(LINE_W_MIN, LINE_W_MAX, strength) * (1 - age / HANDSHAKE_MS)
      }
      ctx!.strokeStyle = template.replace('ALPHA', alpha.toFixed(3))
      ctx!.lineWidth = width
      // Wireless links render dashed; long-range gets a sparser dash pattern
      // to read as a different medium ("over the air, far") at a glance.
      if (isLongRange(e.a, e.b)) {
        ctx!.setLineDash([Math.max(3, width * 1.4), Math.max(7, width * 4)])
      } else if (isWireless(e.a, e.b)) {
        ctx!.setLineDash([Math.max(2, width * 1.2), Math.max(3, width * 2.4)])
      } else {
        ctx!.setLineDash([])
      }
      ctx!.beginPath()
      ctx!.moveTo(a.x, a.y)
      ctx!.lineTo(b.x, b.y)
      ctx!.stroke()
      ctx!.setLineDash([])

      if (e.state === 'connected') {
        drawLinkStats(a, b, dist, strength)
      }
    }
  }

  // Latency for a given link, derived from current distance + per-edge
  // ranges. Single source of truth — the displayed `Xms` and the packet
  // hop duration both come through here.
  function latencyMsFor(idA: number, idB: number) {
    const a = nodes[idA]
    const b = nodes[idB]
    if (!a || !b) return LATENCY_MAX_MS
    const dist = Math.hypot(a.x - b.x, a.y - b.y)
    const r = rangesFor(idA, idB)
    const strength = linkStrength(dist, r.disconnect)
    return lerp(LATENCY_MAX_MS, LATENCY_MIN_MS, strength)
  }

  function packetHopMs(idA: number, idB: number) {
    const ms = latencyMsFor(idA, idB) * PACKET_HOP_MS_PER_LATENCY
    return Math.max(PACKET_HOP_MS_MIN, Math.min(PACKET_HOP_MS_MAX, ms))
  }

  function drawLinkStats(
    a: MeshNode,
    b: MeshNode,
    dist: number,
    strength: number,
  ) {
    // Hide stats until the line is long enough to host a label without
    // colliding with the endpoint glows.
    if (dist < 110) return
    const latency = Math.round(lerp(LATENCY_MAX_MS, LATENCY_MIN_MS, strength))
    const bw = Math.round(lerp(BW_MIN_MBPS, BW_MAX_MBPS, strength))
    const text = `${latency}ms · ${bw} Mb/s`
    const mx = (a.x + b.x) / 2
    const my = (a.y + b.y) / 2
    // Lift the text a touch off the line so it doesn't overstrike.
    const dx = b.x - a.x
    const dy = b.y - a.y
    const norm = Math.hypot(dx, dy) || 1
    const nx = -dy / norm
    const ny = dx / norm
    const px = mx + nx * 8
    const py = my + ny * 8
    ctx!.save()
    ctx!.fillStyle = COLOR_LABEL_DIM
    ctx!.textAlign = 'center'
    ctx!.textBaseline = 'middle'
    ctx!.fillText(text, px, py)
    ctx!.restore()
  }

  function drawLabel(
    x: number,
    y: number,
    text: string,
    revealed: number,
    alpha: number,
  ) {
    const slice = text.slice(0, revealed)
    ctx!.fillStyle = COLOR_LABEL.replace('0.92', (0.92 * alpha).toFixed(3))
    ctx!.textAlign = 'center'
    ctx!.fillText(slice, x, y)
    // Faint trailing caret while still typing.
    if (revealed < text.length) {
      const caretX = x + ctx!.measureText(slice).width / 2 + 1
      ctx!.fillStyle = COLOR_LABEL_DIM
      ctx!.fillRect(caretX, y - 8, 1, 9)
    }
  }

  function drawNodes(now: number) {
    const labelOffset = NODE_RADIUS + 18
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      // Glow halo.
      const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, NODE_RADIUS * 4)
      grad.addColorStop(0, COLOR_NODE_GLOW)
      grad.addColorStop(1, 'rgba(34, 211, 238, 0)')
      ctx!.fillStyle = grad
      ctx!.beginPath()
      ctx!.arc(n.x, n.y, NODE_RADIUS * 4, 0, Math.PI * 2)
      ctx!.fill()
      // Core.
      ctx!.fillStyle = COLOR_NODE
      ctx!.beginPath()
      ctx!.arc(n.x, n.y, NODE_RADIUS, 0, Math.PI * 2)
      ctx!.fill()

      const status = nodeStatus(i, now)
      if (status.kind === 'typing') {
        drawLabel(n.x, n.y - labelOffset, status.text, status.revealed, status.alpha)
      }
    }
  }

  // Routed messages — each one carries a path of node ids it'll hop through.
  interface Packet {
    path: number[]
    startedAt: number
  }
  const packets: Packet[] = []
  let lastSpawn = 0

  // BFS over the *currently connected* edge graph, then pick a random node
  // 2+ hops out from a random source. Returns null if the graph isn't dense
  // enough to find a multi-hop path right now.
  function buildRoutedPath(): number[] | null {
    const adj = new Map<number, number[]>()
    for (const e of edges.values()) {
      if (e.state !== 'connected') continue
      if (!adj.has(e.a)) adj.set(e.a, [])
      if (!adj.has(e.b)) adj.set(e.b, [])
      adj.get(e.a)!.push(e.b)
      adj.get(e.b)!.push(e.a)
    }
    const sources = [...adj.keys()]
    if (sources.length === 0) return null
    const src = sources[Math.floor(Math.random() * sources.length)]

    const dist = new Map<number, number>()
    const parent = new Map<number, number>()
    dist.set(src, 0)
    const queue: number[] = [src]
    while (queue.length) {
      const cur = queue.shift()!
      for (const nb of adj.get(cur) ?? []) {
        if (dist.has(nb)) continue
        dist.set(nb, dist.get(cur)! + 1)
        parent.set(nb, cur)
        queue.push(nb)
      }
    }
    // Prefer 2..4-hop targets so messages have a clear journey but don't
    // sprawl across the whole component.
    const farEnough = [...dist.entries()].filter(([, d]) => d >= 2 && d <= 4)
    const pool = farEnough.length > 0
      ? farEnough
      : [...dist.entries()].filter(([, d]) => d >= 1)
    if (pool.length === 0) return null
    const [target] = pool[Math.floor(Math.random() * pool.length)]

    const path: number[] = []
    let cur: number | undefined = target
    while (cur !== undefined) {
      path.unshift(cur)
      cur = parent.get(cur)
    }
    return path
  }

  function maybeSpawnPacket(now: number) {
    // Add a bit of jitter so packets don't pulse on a metronome.
    const due = lastSpawn + PACKET_SPAWN_PERIOD_MS + Math.random() * 400
    if (now < due) return
    const path = buildRoutedPath()
    lastSpawn = now
    if (!path || path.length < 2) return
    packets.push({ path, startedAt: now })
  }

  function drawPackets(now: number) {
    // Iterate backwards so we can splice out completed ones in-place.
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i]

      // Compute per-hop duration each frame from the current latency on
      // that segment. Node motion makes these drift slightly; fine for
      // visual purposes (≪1 ms per frame).
      const hopMs: number[] = []
      let total = 0
      for (let h = 0; h < p.path.length - 1; h++) {
        const ms = packetHopMs(p.path[h], p.path[h + 1])
        hopMs.push(ms)
        total += ms
      }

      const elapsed = now - p.startedAt
      if (elapsed >= total) {
        packets.splice(i, 1)
        continue
      }

      drawPacketAtMs(elapsed, p.path, hopMs, 1)
      // Trailing dots fading behind the head — anchored to the average hop
      // duration so the trail length feels consistent across slow + fast paths.
      const avgHop = total / hopMs.length
      const trailSteps = 4
      for (let s = 1; s <= trailSteps; s++) {
        const back = elapsed - (s / trailSteps) * PACKET_TAIL_FADE_HOPS * avgHop
        if (back < 0) break
        drawPacketAtMs(back, p.path, hopMs, 1 - s / (trailSteps + 1))
      }
    }
  }

  function drawPacketAtMs(
    elapsed: number,
    path: number[],
    hopMs: number[],
    alpha: number,
  ) {
    if (elapsed < 0) return
    let idx = 0
    let into = elapsed
    while (idx < hopMs.length && into >= hopMs[idx]) {
      into -= hopMs[idx]
      idx++
    }
    if (idx >= hopMs.length) return
    const t = into / hopMs[idx]
    const a = nodes[path[idx]]
    const b = nodes[path[idx + 1]]
    if (!a || !b) return
    const x = a.x + (b.x - a.x) * t
    const y = a.y + (b.y - a.y) * t
    const r = 1.4 + 1.4 * alpha
    ctx!.fillStyle = `rgba(186, 244, 255, ${(alpha * 0.95).toFixed(3)})`
    ctx!.beginPath()
    ctx!.arc(x, y, r, 0, Math.PI * 2)
    ctx!.fill()
  }

  let lastFrame = start
  function frame(now: number) {
    const dt = now - lastFrame
    lastFrame = now
    tickPhysics(dt)
    tickEdges(now)
    maybeSpawnPacket(now)
    ctx!.clearRect(0, 0, width, height)
    drawEdges(now)
    drawPackets(now)
    drawNodes(now)
    rafId = requestAnimationFrame(frame)
  }

  function onMotionChange(ev: MediaQueryListEvent) {
    reduceMotion = ev.matches
  }

  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()
  rafId = requestAnimationFrame(frame)
  reduceMotionMQ.addEventListener?.('change', onMotionChange)

  cleanup = () => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    ro.disconnect()
    reduceMotionMQ.removeEventListener?.('change', onMotionChange)
  }
})

onBeforeUnmount(() => {
  if (cleanup) cleanup()
})
</script>

<style scoped>
.bg-mesh {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* Sit just under the hero content but above the page background. */
  z-index: 0;
  /* Soft fade at the bottom so the hero blends into the next section. */
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.9) 14%,
    rgba(0, 0, 0, 0.9) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.9) 14%,
    rgba(0, 0, 0, 0.9) 80%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
