<template>
  <section
    id="learn-discover"
    ref="sectionRef"
    class="ld-section"
    :class="{
      'is-visible': isVisible,
      'is-learn-active': learnActive,
      'is-join-active': joinActive,
    }"
  >
    <div class="container ld-header-wrap">
      <header class="ld-header">
        <p class="section-eyebrow">Learn &amp; Discover</p>
        <h2 class="section-heading">Pick a thread.</h2>
      </header>
    </div>

    <div class="ld-stage">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        class="ld-svg"
        aria-hidden="true"
      >
        <defs>
          <!-- Layered Gaussian blur for the glow / bloom effect. -->
          <filter id="ld-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur1"/>
            <feGaussianBlur stdDeviation="6" in="SourceGraphic" result="blur2"/>
            <feMerge>
              <feMergeNode in="blur2"/>
              <feMergeNode in="blur1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <!-- Central explosion — bright cyan/green cross-fade. -->
          <radialGradient id="ld-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="#cfecff" stop-opacity="0.85"/>
            <stop offset="20%"  stop-color="#5ab7e0" stop-opacity="0.55"/>
            <stop offset="55%"  stop-color="#3a7090" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Central flare: behind everything, blooms in last. -->
        <circle cx="960" cy="540" r="260"
                fill="url(#ld-flare)" class="ld-flare"/>

        <!-- All fan content sits inside the glow filter group. -->
        <g filter="url(#ld-glow)">
          <!-- ===== Left fan (cyan / Learn) ===== -->
          <g class="ld-fan ld-fan--left">
            <!-- Tendrils: one continuous path per leaf, anchor →
                 leaf. Drawing each as a single stroke from the
                 tip back inward gives a unified outer→inner sweep. -->
            <path
              v-for="t in leftFan.tendrils"
              :key="`l-t-${t.id}`"
              :d="t.d"
              class="ld-tendril"
              pathLength="1"
              :style="{
                '--gd': `${t.growDelay}s`,
                '--hd': `${t.hoverDelay}s`,
                '--w':  t.strokeWidth,
              }"
            />
            <!-- Mesh shortcuts: cousin links. Drawn as separate
                 short paths so the network reads as a real mesh. -->
            <path
              v-for="e in leftFan.meshEdges"
              :key="`l-m-${e.id}`"
              :d="e.d"
              class="ld-edge ld-edge--mesh"
              pathLength="1"
              :style="{
                '--gd': `${e.growDelay}s`,
                '--hd': `${e.hoverDelay}s`,
              }"
            />
            <circle
              v-for="n in leftFan.nodes"
              :key="`l-n-${n.id}`"
              :cx="n.x"
              :cy="n.y"
              :r="n.id === 0 ? 0 : n.size"
              class="ld-node"
              :style="{
                '--gd': `${n.growDelay}s`,
                '--hd': `${n.hoverDelay}s`,
              }"
            />
            <circle
              v-for="(s, idx) in leftFan.sparks"
              :key="`l-s-${idx}`"
              :cx="s.x"
              :cy="s.y"
              :r="s.size"
              class="ld-spark"
              :style="{
                '--gd': `${s.delay}s`,
                '--td': `${s.twinkleDur}s`,
                '--to': `${s.twinkleOffset}s`,
              }"
            />
          </g>

          <!-- ===== Right fan (green / Join) — mirrored. ===== -->
          <g class="ld-fan ld-fan--right">
            <path
              v-for="t in rightFan.tendrils"
              :key="`r-t-${t.id}`"
              :d="t.d"
              class="ld-tendril"
              pathLength="1"
              :style="{
                '--gd': `${t.growDelay}s`,
                '--hd': `${t.hoverDelay}s`,
                '--w':  t.strokeWidth,
              }"
            />
            <path
              v-for="e in rightFan.meshEdges"
              :key="`r-m-${e.id}`"
              :d="e.d"
              class="ld-edge ld-edge--mesh"
              pathLength="1"
              :style="{
                '--gd': `${e.growDelay}s`,
                '--hd': `${e.hoverDelay}s`,
              }"
            />
            <circle
              v-for="n in rightFan.nodes"
              :key="`r-n-${n.id}`"
              :cx="n.x"
              :cy="n.y"
              :r="n.id === 0 ? 0 : n.size"
              class="ld-node"
              :style="{
                '--gd': `${n.growDelay}s`,
                '--hd': `${n.hoverDelay}s`,
              }"
            />
            <circle
              v-for="(s, idx) in rightFan.sparks"
              :key="`r-s-${idx}`"
              :cx="s.x"
              :cy="s.y"
              :r="s.size"
              class="ld-spark"
              :style="{
                '--gd': `${s.delay}s`,
                '--td': `${s.twinkleDur}s`,
                '--to': `${s.twinkleOffset}s`,
              }"
            />
          </g>
        </g>
      </svg>

      <a
        href="https://learn.fips.network"
        target="_blank"
        rel="noopener noreferrer"
        class="ld-cta ld-cta--learn"
        @mouseenter="learnActive = true"
        @mouseleave="learnActive = false"
        @focus="learnActive = true"
        @blur="learnActive = false"
      ><span class="ld-cta-arrow ld-cta-arrow--left" aria-hidden="true">←</span><span class="ld-cta-label">Learn</span></a>

      <a
        href="https://join.fips.network"
        target="_blank"
        rel="noopener noreferrer"
        class="ld-cta ld-cta--join"
        @mouseenter="joinActive = true"
        @mouseleave="joinActive = false"
        @focus="joinActive = true"
        @blur="joinActive = false"
      ><span class="ld-cta-label">Join</span><span class="ld-cta-arrow" aria-hidden="true">→</span></a>
    </div>

    <div class="container ld-footer-wrap">
      <ul class="ld-chips" aria-label="Secondary resources">
        <li><a href="https://github.com/jmcorgan/fips/tree/master/docs/design" target="_blank" rel="noopener noreferrer">Spec</a></li>
        <li><a href="https://github.com/jmcorgan/fips" target="_blank" rel="noopener noreferrer">Source</a></li>
        <li><a href="https://github.com/jmcorgan/fips/releases" target="_blank" rel="noopener noreferrer">Releases</a></li>
        <li><a href="https://primal.net/e/nevent1qqsvd3nzk5p92fzp9z7p34m50039dwee0aemrvk9cl2jpng3kawsz0q6wuh7w" target="_blank" rel="noopener noreferrer">Discuss it</a></li>
        <li><a href="https://github.com/jmcorgan/fips/issues" target="_blank" rel="noopener noreferrer">Break it</a></li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const learnActive = ref(false)
const joinActive = ref(false)

interface FanNode {
  id: number
  x: number
  y: number
  depth: number
  size: number
  growDelay: number
  hoverDelay: number
}
interface FanEdge {
  id: string
  from: number
  to: number
  kind: 'tree' | 'mesh'
  d: string
  strokeWidth: number
  growDelay: number
  hoverDelay: number
}
interface Spark {
  x: number
  y: number
  size: number
  delay: number
  twinkleDur: number
  twinkleOffset: number
}
interface Tendril {
  id: number
  d: string
  strokeWidth: number
  growDelay: number
  hoverDelay: number
}
interface Fan {
  nodes: FanNode[]
  meshEdges: FanEdge[]
  tendrils: Tendril[]
  sparks: Spark[]
}

function mulberry32(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const VIEW_W = 1920
const VIEW_H = 1080
const ANCHOR_X = 960
const ANCHOR_Y = 540
const NUM_DEPTHS = 7

function distanceToEdge(
  ax: number,
  ay: number,
  theta: number,
  dir: -1 | 1,
): number {
  const dx = dir * Math.cos(theta)
  const dy = -Math.sin(theta)
  let r = Infinity
  if (dx < 0) r = Math.min(r, -ax / dx)
  if (dx > 0) r = Math.min(r, (VIEW_W - ax) / dx)
  if (dy < 0) r = Math.min(r, -ay / dy)
  if (dy > 0) r = Math.min(r, (VIEW_H - ay) / dy)
  return r
}

// Cubic Bezier between two nodes with perpendicular wobble — gives
// edges the organic, wispy curve of the reference.
function curvePath(
  fx: number, fy: number,
  tx: number, ty: number,
  rng: () => number,
): string {
  const dx = tx - fx
  const dy = ty - fy
  const len = Math.hypot(dx, dy) || 1
  const px = -dy / len
  const py = dx / len
  const o1 = (rng() - 0.5) * len * 0.35
  const o2 = (rng() - 0.5) * len * 0.35
  const c1x = fx + dx * 0.3 + px * o1
  const c1y = fy + dy * 0.3 + py * o1
  const c2x = fx + dx * 0.7 + px * o2
  const c2y = fy + dy * 0.7 + py * o2
  return (
    `M ${fx.toFixed(1)} ${fy.toFixed(1)} ` +
    `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ` +
    `${c2x.toFixed(1)} ${c2y.toFixed(1)}, ` +
    `${tx.toFixed(1)} ${ty.toFixed(1)}`
  )
}

// Build one half of the fan. Both halves share the same anchor
// at (960, 540) so the two fans appear to emerge from a single
// bright epicentre. side='left' grows leftward; side='right' grows
// rightward. Each fan covers a half-disk reaching to the screen
// edges (and the corners on the far depth).
function buildFan(side: 'left' | 'right', seed: number): Fan {
  const rng = mulberry32(seed)
  const dir: -1 | 1 = side === 'left' ? -1 : 1

  // [angular spread (rad), node count] per depth ring.
  const arcs: Array<[number, number]> = [
    [0.30, 4],
    [0.60, 8],
    [0.90, 14],
    [1.15, 22],
    [1.32, 30],
    [1.43, 38],
    [1.50, 46],
  ]

  const nodes: FanNode[] = [
    { id: 0, x: ANCHOR_X, y: ANCHOR_Y, depth: 0, size: 0, growDelay: 0, hoverDelay: 0 },
  ]
  const edges: FanEdge[] = []

  arcs.forEach(([thetaMax, count], arcIdx) => {
    const depth = arcIdx + 1
    const fraction = depth / NUM_DEPTHS
    for (let i = 0; i < count; i++) {
      const t = count === 1 ? 0.5 : i / (count - 1)
      const baseTheta = (t - 0.5) * 2 * thetaMax
      const theta = baseTheta + (rng() - 0.5) * 0.10
      const tipR = distanceToEdge(ANCHOR_X, ANCHOR_Y, theta, dir)
      const jitterR = (rng() - 0.5) * 0.05
      const r = tipR * (fraction + jitterR)
      const x = ANCHOR_X + r * Math.cos(theta) * dir
      const y = ANCHOR_Y - r * Math.sin(theta)

      // Attach to nearest node one ring closer to the anchor.
      let parentId = 0
      let parentDist = Infinity
      for (const n of nodes) {
        if (n.depth !== depth - 1) continue
        const d = Math.hypot(n.x - x, n.y - y)
        if (d < parentDist) {
          parentDist = d
          parentId = n.id
        }
      }
      const id = nodes.length
      // Outward → inward animation: tips fire first, anchor last.
      // Big per-depth stagger so the wave is actually perceptible.
      const growDelay = (NUM_DEPTHS - depth) * 0.22 + rng() * 0.04
      const hoverDelay = depth * 0.04
      // Node size + edge thickness taper from trunk to fine branches.
      const size = 3.6 - depth * 0.28
      const strokeWidth = 2.4 - depth * 0.18
      nodes.push({ id, x, y, depth, size, growDelay, hoverDelay })
      const parent = nodes[parentId]
      edges.push({
        id: `t-${parentId}-${id}`,
        from: parentId,
        to: id,
        kind: 'tree',
        d: curvePath(parent.x, parent.y, x, y, rng),
        strokeWidth,
        growDelay,
        hoverDelay,
      })
    }
  })

  // Mesh shortcut edges for the "this is a real network" texture.
  const meshTarget = 30
  const candidates: Array<{ a: number; b: number; d: number }> = []
  for (let i = 1; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i]
      const b = nodes[j]
      const treeLink = edges.some(
        (e) =>
          (e.from === i && e.to === j) || (e.from === j && e.to === i),
      )
      if (treeLink) continue
      if (Math.abs(a.depth - b.depth) > 1) continue
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      if (d > 200) continue
      candidates.push({ a: i, b: j, d })
    }
  }
  candidates.sort((p, q) => p.d - q.d)
  const meshCount = Math.min(meshTarget, candidates.length)
  for (let k = 0; k < meshCount; k++) {
    const { a, b } = candidates[k]
    const aNode = nodes[a]
    const bNode = nodes[b]
    const minDepth = Math.min(aNode.depth, bNode.depth)
    edges.push({
      id: `m-${a}-${b}`,
      from: a,
      to: b,
      kind: 'mesh',
      d: curvePath(aNode.x, aNode.y, bNode.x, bNode.y, rng),
      strokeWidth: 1,
      growDelay: (NUM_DEPTHS - minDepth) * 0.22 + 0.18 + (k % 6) * 0.03,
      hoverDelay: minDepth * 0.04 + 0.05,
    })
  }

  // Sparks: bright dots scattered through the fan area, with extra
  // density near the centre to play with the flare's bloom.
  const sparks: Spark[] = []
  const sparkCount = 60
  for (let i = 0; i < sparkCount; i++) {
    // Bias toward smaller radii (more sparks near anchor).
    const rNorm = Math.pow(rng(), 1.6)
    const theta = (rng() - 0.5) * 2 * 1.5
    const tipR = distanceToEdge(ANCHOR_X, ANCHOR_Y, theta, dir)
    const r = tipR * rNorm
    sparks.push({
      x: ANCHOR_X + r * Math.cos(theta) * dir,
      y: ANCHOR_Y - r * Math.sin(theta),
      size: 0.8 + rng() * 1.6,
      // Sparks fade in once the wave has mostly arrived.
      delay: 1.3 + rng() * 0.8,
      // Each spark twinkles at its own pace + phase so the
      // field shimmers organically instead of pulsing in unison.
      twinkleDur: 2.6 + rng() * 3.2,
      twinkleOffset: rng() * 4,
    })
  }

  // Build tendrils — one continuous curved path per leaf (depth-7
  // node), traversing through every ancestor back to the anchor.
  // Drawing each as a single stroke from the screen-edge tip back
  // to the anchor produces a unified outer-→-inner sweep instead of
  // many independent edge reveals. Inner segments are shared by
  // dozens of tendrils, which causes the trunk to overlap-bloom
  // densely under the glow filter — the bright epicentre of the
  // reference image.
  const parentOf = new Map<number, number>()
  for (const e of edges) {
    if (e.kind === 'tree') parentOf.set(e.to, e.from)
  }
  const leaves = nodes.filter((n) => n.depth === NUM_DEPTHS)
  const tendrils: Tendril[] = leaves.map((leaf, idx) => {
    const pathNodes: FanNode[] = []
    let cur: FanNode | undefined = leaf
    while (cur) {
      pathNodes.unshift(cur)
      const pid = parentOf.get(cur.id)
      cur = pid !== undefined ? nodes[pid] : undefined
    }
    let d = `M ${pathNodes[0].x.toFixed(1)} ${pathNodes[0].y.toFixed(1)}`
    for (let i = 0; i < pathNodes.length - 1; i++) {
      const from = pathNodes[i]
      const to = pathNodes[i + 1]
      const dx = to.x - from.x
      const dy = to.y - from.y
      const len = Math.hypot(dx, dy) || 1
      const px = -dy / len
      const py = dx / len
      const o1 = (rng() - 0.5) * len * 0.30
      const o2 = (rng() - 0.5) * len * 0.30
      const c1x = from.x + dx * 0.3 + px * o1
      const c1y = from.y + dy * 0.3 + py * o1
      const c2x = from.x + dx * 0.7 + px * o2
      const c2y = from.y + dy * 0.7 + py * o2
      d +=
        ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)},` +
        ` ${c2x.toFixed(1)} ${c2y.toFixed(1)},` +
        ` ${to.x.toFixed(1)} ${to.y.toFixed(1)}`
    }
    // Hover cascade: tendrils whose leaves sit closer to the
    // hovered side's anchor flip first. Since both fans share the
    // same anchor, we use the leaf's distance from anchor as a
    // proxy — tighter tendrils light up before sprawling ones.
    const leafDist = Math.hypot(leaf.x - ANCHOR_X, leaf.y - ANCHOR_Y)
    return {
      id: idx,
      d,
      strokeWidth: 1.2 + rng() * 0.5,
      // Small jitter so tendrils don't all start drawing in lockstep.
      growDelay: rng() * 0.20,
      hoverDelay: (leafDist / 1100) * 0.45,
    }
  })

  // Drop tree-edges from the output now that the tendrils carry
  // them. Mesh shortcuts stay (they're not on the spanning tree).
  const meshEdges = edges.filter((e) => e.kind === 'mesh')

  return { nodes, meshEdges, tendrils, sparks }
}

const leftFan = computed<Fan>(() => buildFan('left', 7))
const rightFan = computed<Fan>(() => buildFan('right', 19))

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sectionRef.value) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      }
    },
    { threshold: 0.06, rootMargin: '0px 0px -8% 0px' },
  )
  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
/* Local brighter accent palette — reused across nodes, edges, text. */
.ld-section {
  --ld-cyan:        #5ab7e0;
  --ld-cyan-bright: #a8e0f5;
  --ld-green:       #5cd87a;
  --ld-green-bright:#a8f0c0;
}

.ld-section {
  background-color: #050a14;  /* darker than the page bg, more "void" */
  position: relative;
  /* Fit the section into the viewport BELOW the fixed nav.
     Without this, the section is 100vh tall and its bottom edge
     always sits below the visible area. */
  min-height: calc(100vh - var(--header-height));
  overflow: hidden;
  /* Tight top padding so anchor-scrolled eyebrow lands just below
     the fixed header instead of being pushed deep into the viewport. */
  padding-top: var(--space-md);
  padding-bottom: var(--space-md);
}

/* Header and footer are absolute overlays so the stage owns the
   full viewport height — no vertical real estate stolen by chrome.
   pointer-events on the wrappers themselves stay on; we let the
   transparent gaps fall through via children that don't capture. */
.ld-header-wrap {
  position: absolute;
  top: var(--space-md);
  left: 0;
  right: 0;
  z-index: 4;
  pointer-events: none;
}
.ld-header-wrap > .container,
.ld-footer-wrap > .container { pointer-events: auto; }

.ld-footer-wrap {
  position: absolute;
  bottom: var(--space-md);
  left: 0;
  right: 0;
  z-index: 4;
  pointer-events: none;
}

.ld-header { margin: 0; position: relative; }

/* Soft dark vignette behind the header so the eyebrow + heading
   read clearly against the dense tree background. The ::before
   bounds extend well beyond the gradient's fade-to-zero so no
   rectangle edge ever shows. */
.ld-header::before {
  content: '';
  position: absolute;
  inset: -70px -260px -70px -180px;
  z-index: -1;
  background: radial-gradient(
    ellipse 28% 55% at 30% 50%,
    rgba(5, 10, 20, 0.95) 0%,
    rgba(5, 10, 20, 0.7) 30%,
    rgba(5, 10, 20, 0.3) 60%,
    rgba(5, 10, 20, 0) 100%
  );
  pointer-events: none;
}
.ld-header .section-eyebrow,
.ld-header .section-heading {
  text-shadow:
    0 0 18px rgba(0, 0, 0, 0.95),
    0 0 36px rgba(0, 0, 0, 0.7);
}
.ld-header .section-heading { color: var(--text-primary); }
.ld-header .section-eyebrow { color: #c0d4e8; }

/* ===== Stage fills the entire section ===== */
.ld-stage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.ld-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

/* ===== Central flare ===== */
.ld-flare {
  opacity: 0;
  transform-origin: 960px 540px;
  transform: scale(0.4);
  transition:
    opacity 0.9s ease 1.5s,
    transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) 1.5s;
}
.ld-section.is-visible .ld-flare {
  opacity: 1;
  transform: scale(1);
}
.ld-section.is-learn-active .ld-flare,
.ld-section.is-join-active  .ld-flare {
  opacity: 1.2;
  transform: scale(1.18);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* ===== Tendrils: one continuous path per leaf, drawn as a single
   long stroke so the eye sees the whole branch sweep in from the
   screen edge to the anchor in one motion. ===== */
.ld-tendril {
  fill: none;
  stroke: var(--ld-cyan);
  stroke-width: var(--w, 1.4);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0.92;
  transition:
    stroke-dashoffset 1.4s cubic-bezier(0.22, 0.61, 0.36, 1) var(--gd, 0s),
    stroke 0.55s ease var(--hd, 0s),
    opacity 0.4s ease;
  vector-effect: non-scaling-stroke;
}
.ld-fan--right .ld-tendril { stroke: var(--ld-green); }
.ld-section.is-visible .ld-tendril { stroke-dashoffset: 0; }

/* ===== Mesh shortcuts: cousin links between depth-N nodes. Faded
   in after the tendrils land. ===== */
.ld-edge {
  fill: none;
  stroke: var(--ld-cyan);
  stroke-width: 1;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0.45;
  transition:
    stroke-dashoffset 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) var(--gd, 0s),
    stroke 0.5s ease var(--hd, 0s),
    opacity 0.4s ease;
  vector-effect: non-scaling-stroke;
}
.ld-fan--right .ld-edge { stroke: var(--ld-green); }
.ld-section.is-visible .ld-edge { stroke-dashoffset: 0; }

/* ===== Nodes ===== */
.ld-node {
  fill: var(--ld-cyan-bright);
  opacity: 0;
  transition:
    opacity 0.5s ease var(--gd, 0s),
    fill 0.5s ease var(--hd, 0s);
}
.ld-fan--right .ld-node { fill: var(--ld-green-bright); }
.ld-section.is-visible .ld-node { opacity: 1; }

/* ===== Sparks: tiny bright dots, fade in last, then twinkle
   forever at their own pace + phase. Subtle on purpose — the
   amplitude is small so the field just feels alive. ===== */
.ld-spark {
  fill: #ffffff;
  opacity: 0;
}
.ld-section.is-visible .ld-spark {
  animation:
    ld-spark-in 0.7s ease both var(--gd, 0s),
    ld-spark-twinkle var(--td, 4s) ease-in-out
      calc(var(--gd, 0s) + 0.7s + var(--to, 0s)) infinite;
}
@keyframes ld-spark-in {
  from { opacity: 0; }
  to   { opacity: 0.85; }
}
@keyframes ld-spark-twinkle {
  0%, 100% { opacity: 0.85; }
  50%      { opacity: 0.45; }
}

/* ===== Hover propagation: cross-recolour the OPPOSITE fan ===== */
.ld-section.is-learn-active .ld-fan--right .ld-tendril,
.ld-section.is-learn-active .ld-fan--right .ld-edge { stroke: var(--ld-cyan); }
.ld-section.is-learn-active .ld-fan--right .ld-node { fill:   var(--ld-cyan-bright); }
.ld-section.is-join-active  .ld-fan--left  .ld-tendril,
.ld-section.is-join-active  .ld-fan--left  .ld-edge { stroke: var(--ld-green); }
.ld-section.is-join-active  .ld-fan--left  .ld-node { fill:   var(--ld-green-bright); }

/* ===== CTAs — big bold loose text overlaying the trees, sitting at
   ~30% / ~70% across (over the cyan / green halves of the canvas). ===== */
.ld-cta {
  position: absolute;
  top: 50%;
  font-family: var(--font-mono);
  font-size: clamp(3rem, 7.5vw, 6.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  background: transparent;
  border: none;
  text-decoration: none;
  cursor: pointer;
  z-index: 3;
  white-space: nowrap;
  opacity: 0;
  display: inline-flex;
  align-items: baseline;
  gap: 0.18em;
  transition:
    opacity 0.7s ease 1.6s,
    color 0.25s ease,
    text-shadow 0.25s ease,
    transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
  text-shadow:
    0 0 30px rgba(0, 0, 0, 0.6),
    0 0 60px rgba(0, 0, 0, 0.4);
}
.ld-section.is-visible .ld-cta { opacity: 1; }

/* Underline that scales in on hover — the header-style affordance
   that screams "this is a link". */
.ld-cta-label {
  position: relative;
  display: inline-block;
}
.ld-cta-label::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.08em;
  height: 0.06em;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  border-radius: 1px;
}
.ld-cta:hover .ld-cta-label::after,
.ld-cta:focus .ld-cta-label::after { transform: scaleX(1); }

/* Arrows — visible by default at half opacity, slide outward on
   hover toward their tree. */
.ld-cta-arrow {
  display: inline-block;
  font-weight: 500;
  opacity: 0.55;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.ld-cta:hover .ld-cta-arrow,
.ld-cta:focus .ld-cta-arrow { opacity: 1; }

.ld-cta--learn {
  left: 30%;
  transform: translate(-50%, -50%);
}
.ld-cta--learn:hover,
.ld-cta--learn:focus {
  color: var(--ld-cyan-bright);
  transform: translate(calc(-50% - 6px), -50%);
  text-shadow:
    0 0 24px var(--ld-cyan),
    0 0 48px rgba(90, 183, 224, 0.5);
}
.ld-cta--learn:hover .ld-cta-arrow,
.ld-cta--learn:focus .ld-cta-arrow { transform: translateX(-4px); }

.ld-cta--join {
  left: 70%;
  transform: translate(-50%, -50%);
}
.ld-cta--join:hover,
.ld-cta--join:focus {
  color: var(--ld-green-bright);
  transform: translate(calc(-50% + 6px), -50%);
  text-shadow:
    0 0 24px var(--ld-green),
    0 0 48px rgba(92, 216, 122, 0.5);
}
.ld-cta--join:hover .ld-cta-arrow,
.ld-cta--join:focus .ld-cta-arrow { transform: translateX(4px); }

/* ===== Secondary chips ===== */
.ld-footer-wrap > .container {
  position: relative;
}
/* Soft vignette behind chips so they read against the dense
   trees at the bottom. */
.ld-footer-wrap > .container::before {
  content: '';
  position: absolute;
  inset: -20px -12% -14px -12%;
  z-index: -1;
  background: radial-gradient(
    ellipse 65% 100% at 50% 50%,
    rgba(5, 10, 20, 0.97) 0%,
    rgba(5, 10, 20, 0.85) 50%,
    rgba(5, 10, 20, 0) 100%
  );
  pointer-events: none;
}
.ld-chips {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  /* Make the chips themselves capture clicks even though their
     wrapper has pointer-events: none. */
  pointer-events: auto;
}
.ld-chips li { display: inline-flex; }
.ld-chips a {
  color: #d4e4f4;
  padding: 7px 14px;
  border-radius: 6px;
  border: 1px solid rgba(180, 200, 230, 0.25);
  background-color: rgba(8, 14, 26, 0.88);
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
  pointer-events: auto;
}
.ld-chips a:hover {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.55);
  background-color: rgba(20, 32, 50, 0.95);
}

/* ===== Reduced motion ===== */
@media (prefers-reduced-motion: reduce) {
  .ld-tendril, .ld-edge, .ld-node, .ld-spark, .ld-flare, .ld-cta {
    transition: color 0.2s, fill 0.2s, stroke 0.2s, text-shadow 0.2s;
  }
  .ld-tendril, .ld-edge { stroke-dashoffset: 0; }
  .ld-node, .ld-spark, .ld-cta { opacity: 1; }
  .ld-section.is-visible .ld-spark { animation: none; opacity: 0.85; }
  .ld-flare { opacity: 1; transform: scale(1); }
}

/* ===== Mobile ===== */
@media (max-width: 720px) {
  .ld-cta { font-size: clamp(2rem, 8vw, 3rem); }
  .ld-cta--learn { left: 25%; }
  .ld-cta--join  { left: 75%; }
  .ld-stage { min-height: 480px; }
}
</style>
