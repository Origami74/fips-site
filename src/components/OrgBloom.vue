<template>
  <!-- Bloom filter propagation. Seven-node tree, each node sporting a
       6-bit bloom filter underneath (cyan = bit set, grey = unset,
       gold = the "L" bit — the new entry being propagated).

       L joins under C; gold comets travel along tree edges in the
       order C→A, A→R + A→D (parallel), R→B, B→E + B→F (parallel),
       and at each comet's arrival the receiving node's L bit snaps
       from grey to gold. Final state: every peer's filter has L
       set, meaning every peer can answer "yes, L is maybe reachable
       through me".

       Tree:        R
                   / \
                  A   B
                 /|   |\
                C D   E F
       L peers with C via dashed radio link.

       15s loop. -->
  <div class="diagram">
    <svg
      viewBox="0 0 720 420"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A seven-node spanning tree with a 6-bit bloom filter under each node. A new node L joins under C; gold comets carry L's identity along tree edges; every node's L bit lights up as the FilterAnnounce arrives."
    >
      <!-- ===== Legend (top right) ===== -->
      <g transform="translate(515 16)" font-family="var(--font-mono)" font-size="9" fill="var(--text-muted)">
        <rect x="0"   y="0" width="11" height="7" fill="var(--color-fmp-border)"/>
        <text x="15"  y="7">set</text>
        <rect x="42"  y="0" width="11" height="7" fill="var(--border-medium)"/>
        <text x="57"  y="7">unset</text>
        <rect x="98"  y="0" width="11" height="7" fill="var(--accent-gold, #f5b942)"/>
        <text x="113" y="7">new entry (L)</text>
      </g>

      <!-- ===== Tree edges (cyan) ===== -->
      <g stroke="var(--color-fmp-border)" stroke-width="1.5" fill="none" opacity="0.65">
        <line x1="365" y1="50"  x2="220" y2="170"/> <!-- R-A -->
        <line x1="365" y1="50"  x2="510" y2="170"/> <!-- R-B -->
        <line x1="220" y1="170" x2="170" y2="290"/> <!-- A-C -->
        <line x1="220" y1="170" x2="320" y2="290"/> <!-- A-D -->
        <line x1="510" y1="170" x2="440" y2="290"/> <!-- B-E -->
        <line x1="510" y1="170" x2="590" y2="290"/> <!-- B-F -->
      </g>

      <!-- ===== L's dashed peer link to C ===== -->
      <line x1="40" y1="360" x2="170" y2="290"
            stroke="var(--color-fmp-border)" stroke-width="1.5"
            stroke-dasharray="4 5" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.18;0.20;0.95;1"
                 dur="15s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- ===== Stationary nodes ===== -->
      <g transform="translate(365 50)" ><circle r="11" class="node"/><text class="node-label">R</text></g>
      <g transform="translate(220 170)"><circle r="11" class="node"/><text class="node-label">A</text></g>
      <g transform="translate(510 170)"><circle r="11" class="node"/><text class="node-label">B</text></g>
      <g transform="translate(170 290)"><circle r="11" class="node"/><text class="node-label">C</text></g>
      <g transform="translate(320 290)"><circle r="11" class="node"/><text class="node-label">D</text></g>
      <g transform="translate(440 290)"><circle r="11" class="node"/><text class="node-label">E</text></g>
      <g transform="translate(590 290)"><circle r="11" class="node"/><text class="node-label">F</text></g>

      <!-- ===== L (the joiner) — fades in at 18% ===== -->
      <g transform="translate(40 360)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.18;0.20;0.95;1"
                 dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        <circle r="11" fill="var(--bg-surface)"
                stroke="var(--accent-gold, #f5b942)" stroke-width="2"/>
        <text class="node-label">L</text>
      </g>

      <!-- ===== Bloom-filter bit rows (6 bits each, cell 12×8 px,
           gap 2 px, total 82 px wide). Bits 0–4 are static
           pseudo-decoration so each filter looks like a "real"
           bit pattern; bit 5 (rightmost) is the L bit, dim until
           that node learns about L, then snaps to gold.

           Bit x-positions in row, from leftmost: -41, -27, -13, 1,
           15, 29 (each 12 wide). ===== -->

      <!-- R bit row -->
      <g transform="translate(365 76)">
        <rect x="-41" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="-27" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="-13" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="1"   y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="15"  y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="29"  y="0" width="12" height="8" fill="#505070"/>
        <rect x="29"  y="0" width="12" height="8" fill="#d0a040" opacity="0">
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.43;0.45;0.97;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </rect>
      </g>

      <!-- A bit row -->
      <g transform="translate(220 196)">
        <rect x="-41" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="-27" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="-13" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="1"   y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="15"  y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="29"  y="0" width="12" height="8" fill="#505070"/>
        <rect x="29"  y="0" width="12" height="8" fill="#d0a040" opacity="0">
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.32;0.34;0.97;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </rect>
      </g>

      <!-- B bit row -->
      <g transform="translate(510 196)">
        <rect x="-41" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="-27" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="-13" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="1"   y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="15"  y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="29"  y="0" width="12" height="8" fill="#505070"/>
        <rect x="29"  y="0" width="12" height="8" fill="#d0a040" opacity="0">
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.54;0.56;0.97;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </rect>
      </g>

      <!-- C bit row — first to gain L (peers directly with L) -->
      <g transform="translate(170 316)">
        <rect x="-41" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="-27" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="-13" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="1"   y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="15"  y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="29"  y="0" width="12" height="8" fill="#505070"/>
        <rect x="29"  y="0" width="12" height="8" fill="#d0a040" opacity="0">
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.21;0.23;0.97;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </rect>
      </g>

      <!-- D bit row -->
      <g transform="translate(320 316)">
        <rect x="-41" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="-27" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="-13" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="1"   y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="15"  y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="29"  y="0" width="12" height="8" fill="#505070"/>
        <rect x="29"  y="0" width="12" height="8" fill="#d0a040" opacity="0">
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.43;0.45;0.97;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </rect>
      </g>

      <!-- E bit row -->
      <g transform="translate(440 316)">
        <rect x="-41" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="-27" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="-13" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="1"   y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="15"  y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="29"  y="0" width="12" height="8" fill="#505070"/>
        <rect x="29"  y="0" width="12" height="8" fill="#d0a040" opacity="0">
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.65;0.67;0.97;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </rect>
      </g>

      <!-- F bit row -->
      <g transform="translate(590 316)">
        <rect x="-41" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="-27" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="-13" y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="1"   y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="15"  y="0" width="12" height="8" fill="var(--color-fmp-border)"/>
        <rect x="29"  y="0" width="12" height="8" fill="#505070"/>
        <rect x="29"  y="0" width="12" height="8" fill="#d0a040" opacity="0">
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.65;0.67;0.97;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </rect>
      </g>

      <!-- L bit row — L knows about itself the moment it appears. -->
      <g transform="translate(40 386)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.18;0.20;0.95;1"
                 dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        <rect x="-41" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="-27" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="-13" y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="1"   y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="15"  y="0" width="12" height="8" fill="var(--border-medium)"/>
        <rect x="29"  y="0" width="12" height="8" fill="var(--accent-gold, #f5b942)"/>
      </g>

      <!-- ===== FilterAnnounce comets. A single gold dot per edge,
           travelling from sender to receiver during its window.
           Direction is unambiguous from the motion path. ===== -->

      <!-- C → A (upward) -->
      <circle r="6" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.24;0.26;0.32;0.34;1"
                 dur="15s" repeatCount="indefinite"/>
        <animateMotion dur="15s" repeatCount="indefinite"
                       path="M 170 290 L 220 170"
                       keyTimes="0;0.26;0.32;1" keyPoints="0;0;1;1"
                       calcMode="linear"/>
      </circle>

      <!-- A → R (upward) -->
      <circle r="6" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.34;0.36;0.43;0.45;1"
                 dur="15s" repeatCount="indefinite"/>
        <animateMotion dur="15s" repeatCount="indefinite"
                       path="M 220 170 L 365 50"
                       keyTimes="0;0.36;0.43;1" keyPoints="0;0;1;1"
                       calcMode="linear"/>
      </circle>

      <!-- A → D (downward, in parallel with A → R) -->
      <circle r="6" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.34;0.36;0.43;0.45;1"
                 dur="15s" repeatCount="indefinite"/>
        <animateMotion dur="15s" repeatCount="indefinite"
                       path="M 220 170 L 320 290"
                       keyTimes="0;0.36;0.43;1" keyPoints="0;0;1;1"
                       calcMode="linear"/>
      </circle>

      <!-- R → B (downward) -->
      <circle r="6" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.45;0.47;0.54;0.56;1"
                 dur="15s" repeatCount="indefinite"/>
        <animateMotion dur="15s" repeatCount="indefinite"
                       path="M 365 50 L 510 170"
                       keyTimes="0;0.47;0.54;1" keyPoints="0;0;1;1"
                       calcMode="linear"/>
      </circle>

      <!-- B → E (downward) -->
      <circle r="6" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.56;0.58;0.65;0.67;1"
                 dur="15s" repeatCount="indefinite"/>
        <animateMotion dur="15s" repeatCount="indefinite"
                       path="M 510 170 L 440 290"
                       keyTimes="0;0.58;0.65;1" keyPoints="0;0;1;1"
                       calcMode="linear"/>
      </circle>

      <!-- B → F (downward, in parallel with B → E) -->
      <circle r="6" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.56;0.58;0.65;0.67;1"
                 dur="15s" repeatCount="indefinite"/>
        <animateMotion dur="15s" repeatCount="indefinite"
                       path="M 510 170 L 590 290"
                       keyTimes="0;0.58;0.65;1" keyPoints="0;0;1;1"
                       calcMode="linear"/>
      </circle>

      <!-- ===== Captions ===== -->
      <g font-family="var(--font-mono)" font-size="11" fill="var(--text-muted)">
        <text x="20" y="26" opacity="0">
          tree at rest — each peer holds a bloom filter
          <animate attributeName="opacity" values="1;1;0;0"
                   keyTimes="0;0.18;0.20;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          L joins, peers with C — C adds L to its filter
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.20;0.22;0.32;0.34;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          FilterAnnounce — L bit propagates up the tree
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.34;0.36;0.45;0.47;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          and back down through every other branch
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.47;0.49;0.65;0.67;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          every peer now has L in its filter
          <animate attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.67;0.69;0.95;1"
                   dur="15s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.diagram { width: 100%; max-width: 800px; margin: 0 auto; }
.diagram svg { width: 100%; height: auto; display: block; }

.node {
  fill: var(--bg-surface);
  stroke: var(--color-fmp-border);
  stroke-width: 1.5;
}
.node-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 600;
  text-anchor: middle;
  fill: var(--text-primary);
  dominant-baseline: middle;
}
</style>
