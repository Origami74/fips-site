<template>
  <!-- Self-organizing demo, two scenes (FIPS docs §spanning-tree-dynamics, §bloom-filters).

       12 nodes labelled A–L (sorted by node_addr). Root is whichever
       node has the lowest addr — drawn as a gold star. Each tree edge
       carries one outbound bloom filter on the SENDER side (per-peer,
       directional), rendered as a small bit row + arrow aligned with
       the edge. Bit 2 is reserved for L's destination.

       SCENE A — bootstrap (0–6s):
         L fades in with one link to J. Its FilterAnnounce propagates
         outward; bit 2 lights up in each sender's outbound filter as
         it learns of L. After ~7 hops, every directional filter on the
         propagation path has bit 2 set.

       SCENE B — convergence on root loss (7–19s):
         A dies. B (lowest remaining addr) is promoted — its circle
         morphs into a gold star. C re-parents to B. TreeAnnounce
         gossip propagates outward; each receiving node briefly flashes
         gold ("learned new root"). Only 1 of 11 nodes changed parent.

       20s loop. -->
  <div class="converge">
    <svg
      viewBox="0 -50 720 530"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Self-organizing mesh: scene 1 — a new node joins via one peer and a directional bloom-filter bit propagates outward; scene 2 — the root dies, the spanning tree converges on a new root with most parent pointers unchanged."
    >
      <!-- ============== big phase title ============== -->
      <g class="phase">
        <text x="360" y="-22" class="phase-title" opacity="0">
          SCENE 1 · BOOTSTRAP
          <animate attributeName="opacity" values="1;1;0;0;1"
                   keyTimes="0;0.470;0.490;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="360" y="-22" class="phase-title" opacity="0">
          SCENE 2 · CONVERGENCE
          <animate attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.470;0.490;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>

      <!-- ============== legend (top-right) ============== -->
      <g class="legend" transform="translate(450 -28)">
        <g transform="translate(0 0)">
          <rect x="-9" y="-1.8" width="3" height="3.5" fill="var(--color-fmp-border)" opacity="0.7"/>
          <rect x="-5" y="-1.8" width="3" height="3.5" fill="var(--color-fmp-border)" opacity="0.7"/>
          <rect x="-1" y="-1.8" width="3" height="3.5" fill="var(--accent-cyan,#22d3ee)"/>
          <rect x="3"  y="-1.8" width="3" height="3.5" fill="var(--color-fmp-border)" opacity="0.7"/>
          <path d="M 8 -2.5 L 12 0 L 8 2.5 Z" fill="var(--color-fmp-border)" opacity="0.7"/>
        </g>
        <text x="22" y="3" class="legend-label">outbound peer filter — bit 2 = L</text>
        <g transform="translate(220 0)">
          <path d="M 0 -7 L 1.5 -2 L 6.7 -2 L 2.5 1 L 4.1 6 L 0 3 L -4.1 6 L -2.5 1 L -6.7 -2 L -1.5 -2 Z"
                fill="var(--accent-gold,#f5b942)" stroke="none"/>
        </g>
        <text x="234" y="3" class="legend-label">root</text>
      </g>

      <!-- ============== peer edges (mesh, faint, non-tree) ============== -->
      <g class="peer-edges" stroke="var(--border-medium)" stroke-width="1" stroke-opacity="0.45">
        <line x1="200" y1="200" x2="210" y2="60"/>
        <line x1="310" y1="310" x2="340" y2="130"/>
        <line x1="50"  y1="400" x2="250" y2="410"/>
        <line x1="470" y1="210" x2="530" y2="80"/>
        <line x1="110" y1="320" x2="310" y2="310"/>
      </g>

      <!-- ============== tree edges (most static) ============== -->
      <g class="tree-edges" stroke="var(--color-fmp-border)" stroke-width="2.2" stroke-linecap="round">
        <line x1="200" y1="200" x2="110" y2="320"/>
        <line x1="200" y1="200" x2="310" y2="310"/>
        <line x1="210" y1="60"  x2="340" y2="130"/>
        <line x1="210" y1="60"  x2="380" y2="50"/>
        <line x1="110" y1="320" x2="50"  y2="400"/>
        <line x1="310" y1="310" x2="250" y2="410"/>
        <line x1="340" y1="130" x2="470" y2="210"/>
        <line x1="380" y1="50"  x2="530" y2="80"/>
      </g>

      <!-- A→B and A→C tree edges: die in scene B when A dies -->
      <g stroke="var(--color-fmp-border)" stroke-width="2.2" stroke-linecap="round">
        <line x1="90" y1="90" x2="200" y2="200">
          <animate attributeName="stroke-opacity" values="1;1;0.1;0.1;1"
                   keyTimes="0;0.495;0.505;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="90" y1="90" x2="210" y2="60">
          <animate attributeName="stroke-opacity" values="1;1;0.1;0.1;1"
                   keyTimes="0;0.495;0.505;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
      </g>

      <!-- C → B: new tree edge after re-parent -->
      <g stroke="var(--color-fmp-border)" stroke-width="2.2" stroke-linecap="round">
        <line x1="200" y1="200" x2="210" y2="60" stroke-opacity="0">
          <animate attributeName="stroke-opacity" values="0;0;1;1;0"
                   keyTimes="0;0.535;0.540;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
      </g>

      <!-- L → J: tree edge appears when L joins (scene A) -->
      <g stroke="var(--color-fmp-border)" stroke-width="2.2" stroke-linecap="round">
        <line x1="610" y1="320" x2="470" y2="210" stroke-opacity="0">
          <animate attributeName="stroke-opacity" values="0;0;1;1;0"
                   keyTimes="0;0.035;0.04;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
      </g>

      <!-- ============== directional bloom-filter widgets ==============
           One per tree edge, on the SENDER side, rotated to align with
           the edge. Bit 2 = L's destination. Arrow points at receiver. -->
      <g class="filters">
        <g
          v-for="e in FILTER_EDGES"
          :key="e.fid"
          :transform="`translate(${fpos(e).x.toFixed(1)} ${fpos(e).y.toFixed(1)}) rotate(${fang(e).toFixed(1)})`"
          :opacity="e.fadeIn ? 0 : 1"
        >
          <animate v-if="e.fadeIn"
                   attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.035;0.04;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
          <rect x="-9" y="-1.8" width="3" height="3.5" fill="var(--color-fmp-border)" opacity="0.7"/>
          <rect x="-5" y="-1.8" width="3" height="3.5" fill="var(--color-fmp-border)" opacity="0.7"/>
          <rect x="-1" y="-1.8" width="3" height="3.5" fill="var(--border-medium)" opacity="0.3">
            <animate attributeName="fill"
                     :values="`var(--border-medium);var(--border-medium);var(--accent-cyan,#22d3ee);var(--accent-cyan,#22d3ee);var(--border-medium)`"
                     :keyTimes="`0;${(e.srcTime - 0.004).toFixed(3)};${e.srcTime};0.95;1`"
                     dur="20s" repeatCount="indefinite" calcMode="discrete"/>
            <animate attributeName="opacity"
                     :values="`0.3;0.3;1;1;0.3`"
                     :keyTimes="`0;${(e.srcTime - 0.004).toFixed(3)};${e.srcTime};0.95;1`"
                     dur="20s" repeatCount="indefinite" calcMode="discrete"/>
          </rect>
          <rect x="3"  y="-1.8" width="3" height="3.5" fill="var(--color-fmp-border)" opacity="0.7"/>
          <path d="M 8 -2.5 L 12 0 L 8 2.5 Z" fill="var(--color-fmp-border)" opacity="0.7"/>
        </g>
      </g>

      <!-- ============== gossip dots — scene A (FilterAnnounce) ============== -->
      <g class="gossip" fill="var(--accent-cyan, #22d3ee)">
        <circle
          v-for="(g, i) in GOSSIP_A"
          :key="'a' + i"
          r="3.5"
          opacity="0"
        >
          <animate attributeName="opacity"
                   :values="`0;0;1;1;0;0`"
                   :keyTimes="`0;${(g.t1 - 0.001).toFixed(3)};${g.t1};${g.t2};${(g.t2 + 0.001).toFixed(3)};1`"
                   dur="20s" repeatCount="indefinite"/>
          <animateMotion
            dur="20s" repeatCount="indefinite"
            :path="`M ${g.x1} ${g.y1} L ${g.x2} ${g.y2}`"
            :keyTimes="`0;${g.t1};${g.t2};1`"
            keyPoints="0;0;1;1"
            calcMode="linear"/>
        </circle>
      </g>

      <!-- ============== gossip dots — scene B (TreeAnnounce) ============== -->
      <g class="gossip" fill="var(--accent-gold, #f5b942)">
        <circle
          v-for="(g, i) in GOSSIP_B"
          :key="'b' + i"
          r="3.5"
          opacity="0"
        >
          <animate attributeName="opacity"
                   :values="`0;0;1;1;0;0`"
                   :keyTimes="`0;${(g.t1 - 0.001).toFixed(3)};${g.t1};${g.t2};${(g.t2 + 0.001).toFixed(3)};1`"
                   dur="20s" repeatCount="indefinite"/>
          <animateMotion
            dur="20s" repeatCount="indefinite"
            :path="`M ${g.x1} ${g.y1} L ${g.x2} ${g.y2}`"
            :keyTimes="`0;${g.t1};${g.t2};1`"
            keyPoints="0;0;1;1"
            calcMode="linear"/>
        </circle>
      </g>

      <!-- ============== ordinary nodes (8): circle + letter + brief gold flash on TreeAnnounce arrival ============== -->
      <g
        v-for="n in ORDINARY_NODES"
        :key="n.id"
        class="node"
      >
        <circle :cx="n.cx" :cy="n.cy" r="13">
          <animate attributeName="stroke"
                   :values="`var(--color-fmp-border);var(--color-fmp-border);var(--accent-gold,#f5b942);var(--color-fmp-border);var(--color-fmp-border)`"
                   :keyTimes="`0;${(n.rTime - 0.005).toFixed(3)};${n.rTime};${(n.rTime + 0.020).toFixed(3)};1`"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </circle>
        <text :x="n.cx" :y="n.cy + 3" class="node-id">{{ n.id }}</text>
      </g>

      <!-- ============== A (initial root, dies in scene B) ============== -->
      <g class="node node--root">
        <path
          transform="translate(90 90)"
          d="M 0 -14 L 3.1 -4.4 L 13.3 -4.3 L 5.1 1.7 L 8.2 11.3 L 0 5.5 L -8.2 11.3 L -5.1 1.7 L -13.3 -4.3 L -3.1 -4.4 Z"
          fill="var(--accent-gold,#f5b942)"
          stroke="var(--accent-gold,#f5b942)"
          stroke-width="1"
          stroke-linejoin="round"
        >
          <animate attributeName="fill"
                   values="var(--accent-gold,#f5b942);var(--accent-gold,#f5b942);#a04040;#a04040;var(--accent-gold,#f5b942)"
                   keyTimes="0;0.495;0.505;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
          <animate attributeName="stroke"
                   values="var(--accent-gold,#f5b942);var(--accent-gold,#f5b942);#a04040;#a04040;var(--accent-gold,#f5b942)"
                   keyTimes="0;0.495;0.505;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </path>
        <text x="90" y="93" class="node-id node-id--on-star">A</text>
        <g stroke="#d04848" stroke-width="2.2" stroke-linecap="round" opacity="0">
          <line x1="80" y1="80" x2="100" y2="100"/>
          <line x1="100" y1="80" x2="80" y2="100"/>
          <animate attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.495;0.505;0.95;0.96"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </g>
      </g>

      <!-- ============== B (becomes new root in scene B) ============== -->
      <g class="node">
        <!-- circle (visible until promotion) -->
        <circle cx="200" cy="200" r="13">
          <animate attributeName="opacity" values="1;1;0;0;1"
                   keyTimes="0;0.520;0.525;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
          <animate attributeName="stroke"
                   values="var(--color-fmp-border);var(--color-fmp-border);var(--accent-gold,#f5b942);var(--color-fmp-border);var(--color-fmp-border)"
                   keyTimes="0;0.515;0.520;0.540;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </circle>
        <!-- star (appears at promotion) -->
        <path
          transform="translate(200 200)"
          d="M 0 -14 L 3.1 -4.4 L 13.3 -4.3 L 5.1 1.7 L 8.2 11.3 L 0 5.5 L -8.2 11.3 L -5.1 1.7 L -13.3 -4.3 L -3.1 -4.4 Z"
          fill="var(--accent-gold,#f5b942)"
          stroke="var(--accent-gold,#f5b942)"
          stroke-width="1"
          stroke-linejoin="round"
          opacity="0"
        >
          <animate attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.520;0.525;0.95;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </path>
        <text x="200" y="203" class="node-id">B</text>
      </g>

      <!-- ============== C (re-parents in scene B) ============== -->
      <g class="node">
        <circle cx="210" cy="60" r="13">
          <animate attributeName="stroke"
                   values="var(--color-fmp-border);var(--color-fmp-border);var(--accent-gold,#f5b942);var(--color-fmp-border);var(--color-fmp-border)"
                   keyTimes="0;0.530;0.540;0.560;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </circle>
        <text x="210" y="63" class="node-id">C</text>
        <!-- re-parented ripple -->
        <circle cx="210" cy="60" r="13" fill="none" stroke="var(--accent-cyan,#22d3ee)" stroke-width="1.5" opacity="0">
          <animate attributeName="opacity" values="0;0;0.9;0;0"
                   keyTimes="0;0.535;0.555;0.585;1"
                   dur="20s" repeatCount="indefinite"/>
          <animate attributeName="r" values="13;13;28;28;13"
                   keyTimes="0;0.535;0.585;0.95;1"
                   dur="20s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- ============== L (joins in scene A) ============== -->
      <g class="node" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0"
                 keyTimes="0;0.035;0.04;0.95;1"
                 dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="610" cy="320" r="13">
          <animate attributeName="stroke"
                   values="var(--color-fmp-border);var(--color-fmp-border);var(--accent-gold,#f5b942);var(--color-fmp-border);var(--color-fmp-border)"
                   keyTimes="0;0.676;0.681;0.701;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </circle>
        <text x="610" y="323" class="node-id">L</text>
        <!-- joined ripple -->
        <circle cx="610" cy="320" r="13" fill="none" stroke="var(--accent-cyan,#22d3ee)" stroke-width="1.5" opacity="0">
          <animate attributeName="opacity" values="0;0;0.9;0;0"
                   keyTimes="0;0.04;0.06;0.09;1"
                   dur="20s" repeatCount="indefinite"/>
          <animate attributeName="r" values="13;13;26;26;13"
                   keyTimes="0;0.04;0.09;0.95;1"
                   dur="20s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- ============== step caption (bottom) ============== -->
      <g class="step-caption">
        <text x="20" y="455" opacity="0">
          steady · 11 nodes converged on root A
          <animate attributeName="opacity" values="1;1;0;0"
                   keyTimes="0;0.035;0.045;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="455" opacity="0">
          L joins via J — sends FilterAnnounce upstream
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.045;0.055;0.150;0.160;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="455" opacity="0">
          each peer recomputes its outbound filters · split-horizon, bit 2 set
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.160;0.170;0.235;0.245;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="455" opacity="0">
          L reachable from every node via one bloom bit
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.245;0.255;0.485;0.495;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="455" opacity="0">
          root A lost — direct children re-evaluate parent
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.495;0.505;0.555;0.565;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="455" opacity="0">
          B has lowest remaining addr → new root · C re-parents
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.565;0.575;0.720;0.730;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="455" opacity="0">
          converged · 1 of 11 nodes changed parent · the rest only updated their root view
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.730;0.740;0.945;0.950;1"
                   dur="20s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
type Edge = { fid: string; from: [number, number]; to: [number, number]; srcTime: number; fadeIn?: boolean }

// Each tree edge gets ONE outbound filter widget on the sender side.
// Order matches the propagation chain so srcTime = sender's learn-time.
const FILTER_EDGES: Edge[] = [
  { fid: 'L-J', from: [610, 320], to: [470, 210], srcTime: 0.04, fadeIn: true },
  { fid: 'J-F', from: [470, 210], to: [340, 130], srcTime: 0.075 },
  { fid: 'F-C', from: [340, 130], to: [210, 60],  srcTime: 0.10  },
  { fid: 'C-A', from: [210, 60],  to: [90, 90],   srcTime: 0.125 },
  { fid: 'C-G', from: [210, 60],  to: [380, 50],  srcTime: 0.125 },
  { fid: 'A-B', from: [90, 90],   to: [200, 200], srcTime: 0.15  },
  { fid: 'G-K', from: [380, 50],  to: [530, 80],  srcTime: 0.15  },
  { fid: 'B-D', from: [200, 200], to: [110, 320], srcTime: 0.175 },
  { fid: 'B-E', from: [200, 200], to: [310, 310], srcTime: 0.175 },
  { fid: 'D-H', from: [110, 320], to: [50, 400],  srcTime: 0.20  },
  { fid: 'E-I', from: [310, 310], to: [250, 410], srcTime: 0.20  },
]

const fpos = (e: Edge) => ({
  x: e.from[0] + 0.32 * (e.to[0] - e.from[0]),
  y: e.from[1] + 0.32 * (e.to[1] - e.from[1]),
})
const fang = (e: Edge) =>
  (Math.atan2(e.to[1] - e.from[1], e.to[0] - e.from[0]) * 180) / Math.PI

const ORDINARY_NODES = [
  { id: 'D', cx: 110, cy: 320, rTime: 0.565 },
  { id: 'E', cx: 310, cy: 310, rTime: 0.565 },
  { id: 'F', cx: 340, cy: 130, rTime: 0.595 },
  { id: 'G', cx: 380, cy: 50,  rTime: 0.595 },
  { id: 'H', cx: 50,  cy: 400, rTime: 0.625 },
  { id: 'I', cx: 250, cy: 410, rTime: 0.625 },
  { id: 'J', cx: 470, cy: 210, rTime: 0.650 },
  { id: 'K', cx: 530, cy: 80,  rTime: 0.650 },
]

const GOSSIP_A = [
  { x1: 610, y1: 320, x2: 470, y2: 210, t1: 0.05,  t2: 0.075 },
  { x1: 470, y1: 210, x2: 340, y2: 130, t1: 0.075, t2: 0.10  },
  { x1: 340, y1: 130, x2: 210, y2: 60,  t1: 0.10,  t2: 0.125 },
  { x1: 210, y1: 60,  x2: 90,  y2: 90,  t1: 0.125, t2: 0.15  },
  { x1: 210, y1: 60,  x2: 380, y2: 50,  t1: 0.125, t2: 0.15  },
  { x1: 90,  y1: 90,  x2: 200, y2: 200, t1: 0.15,  t2: 0.175 },
  { x1: 380, y1: 50,  x2: 530, y2: 80,  t1: 0.15,  t2: 0.175 },
  { x1: 200, y1: 200, x2: 110, y2: 320, t1: 0.175, t2: 0.20  },
  { x1: 200, y1: 200, x2: 310, y2: 310, t1: 0.175, t2: 0.20  },
  { x1: 110, y1: 320, x2: 50,  y2: 400, t1: 0.20,  t2: 0.225 },
  { x1: 310, y1: 310, x2: 250, y2: 410, t1: 0.20,  t2: 0.225 },
]

const GOSSIP_B = [
  { x1: 200, y1: 200, x2: 110, y2: 320, t1: 0.540, t2: 0.565 },
  { x1: 200, y1: 200, x2: 310, y2: 310, t1: 0.540, t2: 0.565 },
  { x1: 210, y1: 60,  x2: 340, y2: 130, t1: 0.570, t2: 0.595 },
  { x1: 210, y1: 60,  x2: 380, y2: 50,  t1: 0.570, t2: 0.595 },
  { x1: 110, y1: 320, x2: 50,  y2: 400, t1: 0.600, t2: 0.625 },
  { x1: 310, y1: 310, x2: 250, y2: 410, t1: 0.600, t2: 0.625 },
  { x1: 340, y1: 130, x2: 470, y2: 210, t1: 0.625, t2: 0.650 },
  { x1: 380, y1: 50,  x2: 530, y2: 80,  t1: 0.625, t2: 0.650 },
  { x1: 470, y1: 210, x2: 610, y2: 320, t1: 0.656, t2: 0.681 },
]
</script>

<style scoped>
.converge {
  width: 100%;
  max-width: 920px;
  margin-top: var(--space-lg);
}
.converge svg {
  width: 100%;
  height: auto;
  display: block;
}

.phase-title {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-anchor: middle;
  fill: var(--text-primary);
}

.legend-label {
  font-family: var(--font-mono);
  font-size: 9.5px;
  fill: var(--text-muted);
  letter-spacing: 0.04em;
  dominant-baseline: middle;
}

.node circle {
  fill: var(--bg-surface);
  stroke: var(--color-fmp-border);
  stroke-width: 1.5;
}

.node-id {
  font-family: var(--font-mono);
  font-size: 10.5px;
  font-weight: 700;
  text-anchor: middle;
  fill: var(--text-primary);
  dominant-baseline: middle;
}
.node-id--on-star {
  fill: #1a1a1a;
}

.step-caption text {
  font-family: var(--font-mono);
  font-size: 12px;
  fill: var(--text-secondary);
}
</style>
