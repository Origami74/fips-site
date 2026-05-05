<template>
  <!-- Sparse routing mesh between source S and destination D.
       Initially traffic flows along the top branch (S → R₁ → R₂ → R₃
       → D). The R₂↔R₃ link degrades; the routing layer re-evaluates
       parents and the next packet automatically reroutes through the
       centre cross-link (S → R₁ → R₂ → R₇ → R₅ → R₆ → D), avoiding
       the degraded link without operator intervention. ~12s loop. -->
  <div class="diagram">
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A nine-node mesh routes a packet from source S to destination D via the top branch; the top link degrades; the next packet reroutes automatically through the centre cross-link."
    >
      <!-- ===== Non-tree mesh links (faint grey, drawn first) ===== -->
      <g stroke="var(--border-medium)" stroke-width="1" fill="none">
        <line x1="170" y1="110" x2="200" y2="290"/> <!-- R₁-R₄ -->
        <line x1="480" y1="100" x2="510" y2="290"/> <!-- R₃-R₆ -->
      </g>

      <!-- ===== Cyan mesh edges (always available) ===== -->
      <g stroke="var(--color-fmp-border)" stroke-width="1.5" fill="none" opacity="0.7">
        <line x1="50"  y1="200" x2="170" y2="110"/> <!-- S-R₁ -->
        <line x1="50"  y1="200" x2="200" y2="290"/> <!-- S-R₄ -->
        <line x1="170" y1="110" x2="310" y2="80" /> <!-- R₁-R₂ -->
        <line x1="480" y1="100" x2="670" y2="200"/> <!-- R₃-D -->
        <line x1="200" y1="290" x2="370" y2="320"/> <!-- R₄-R₅ -->
        <line x1="370" y1="320" x2="510" y2="290"/> <!-- R₅-R₆ -->
        <line x1="510" y1="290" x2="670" y2="200"/> <!-- R₆-D -->
        <line x1="310" y1="80"  x2="340" y2="200"/> <!-- R₂-R₇ -->
        <line x1="340" y1="200" x2="370" y2="320"/> <!-- R₇-R₅ -->
      </g>

      <!-- ===== R₂-R₃ link — the one that degrades. Starts cyan, snaps
           to red dashes mid-loop. ===== -->
      <line x1="310" y1="80" x2="480" y2="100"
            stroke="var(--color-fmp-border)" stroke-width="1.8" fill="none">
        <animate attributeName="stroke"
                 values="var(--color-fmp-border);var(--color-fmp-border);#f87171;#f87171;var(--color-fmp-border)"
                 keyTimes="0;0.30;0.34;0.95;1"
                 dur="12s" repeatCount="indefinite" calcMode="discrete"/>
        <animate attributeName="stroke-dasharray"
                 values="0 0;0 0;3 5;3 5;0 0"
                 keyTimes="0;0.30;0.34;0.95;1"
                 dur="12s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- ===== Link-stat labels for the degrading link ===== -->
      <g font-family="var(--font-mono)" font-size="11" text-anchor="middle">
        <text x="395" y="62" fill="var(--color-fmp-border)" opacity="0.9">
          5ms · 820 Mb/s
          <animate attributeName="opacity"
                   values="0.9;0.9;0;0;0.9"
                   keyTimes="0;0.30;0.32;0.95;1"
                   dur="12s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="395" y="62" fill="#f87171" opacity="0">
          62ms · 35 Mb/s · loss
          <animate attributeName="opacity"
                   values="0;0;1;1;0;0"
                   keyTimes="0;0.32;0.34;0.95;0.97;1"
                   dur="12s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>

      <!-- ===== Alt-path link-stat label (centre cross) ===== -->
      <g font-family="var(--font-mono)" font-size="11" text-anchor="middle">
        <text x="262" y="138" fill="var(--text-muted)" opacity="0">
          14ms · 240 Mb/s
          <animate attributeName="opacity"
                   values="0;0;0.9;0.9;0"
                   keyTimes="0;0.36;0.40;0.95;1"
                   dur="12s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>

      <!-- ===== Packet 1 — top path, while R₂-R₃ is still good ===== -->
      <circle r="5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.05;0.07;0.28;0.30;1"
                 dur="12s" repeatCount="indefinite"/>
        <animateMotion
          dur="12s"
          repeatCount="indefinite"
          path="M 50 200 L 170 110 L 310 80 L 480 100 L 670 200"
          keyTimes="0;0.07;0.28;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- ===== Packet 2 — alt route via R₇ once R₂-R₃ is bad ===== -->
      <circle r="5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.45;0.47;0.74;0.76;1"
                 dur="12s" repeatCount="indefinite"/>
        <animateMotion
          dur="12s"
          repeatCount="indefinite"
          path="M 50 200 L 170 110 L 310 80 L 340 200 L 370 320 L 510 290 L 670 200"
          keyTimes="0;0.47;0.74;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- ===== Nodes ===== -->
      <g class="nodes">
        <g transform="translate(50 200)" ><circle r="14" class="node node--endpoint"/><text class="node-label">S</text></g>
        <g transform="translate(670 200)"><circle r="14" class="node node--endpoint"/><text class="node-label">D</text></g>
        <g transform="translate(170 110)"><circle r="11" class="node"/><text class="node-label">R₁</text></g>
        <g transform="translate(310 80)" ><circle r="11" class="node"/><text class="node-label">R₂</text></g>
        <g transform="translate(480 100)"><circle r="11" class="node"/><text class="node-label">R₃</text></g>
        <g transform="translate(200 290)"><circle r="11" class="node"/><text class="node-label">R₄</text></g>
        <g transform="translate(370 320)"><circle r="11" class="node"/><text class="node-label">R₅</text></g>
        <g transform="translate(510 290)"><circle r="11" class="node"/><text class="node-label">R₆</text></g>
        <g transform="translate(340 200)"><circle r="11" class="node"/><text class="node-label">R₇</text></g>
      </g>

      <!-- ===== Captions ===== -->
      <g font-family="var(--font-mono)" font-size="11" fill="var(--text-muted)">
        <text x="20" y="22" opacity="0">
          top branch preferred
          <animate attributeName="opacity" values="1;1;0;0"
                   keyTimes="0;0.30;0.32;1"
                   dur="12s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="22" opacity="0">
          R₂↔R₃ degrades — parents reselect
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.32;0.34;0.45;0.47;1"
                   dur="12s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="22" opacity="0">
          rerouted via R₇ (centre cross)
          <animate attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.47;0.49;0.95;1"
                   dur="12s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.diagram { width: 100%; max-width: 760px; margin: 0 auto; }
.diagram svg { width: 100%; height: auto; display: block; }

.node {
  fill: var(--bg-surface);
  stroke: var(--color-fmp-border);
  stroke-width: 1.5;
}
.node--endpoint {
  stroke: var(--color-fsp-border);
  stroke-width: 2;
}
.node-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  text-anchor: middle;
  fill: var(--text-primary);
  dominant-baseline: middle;
}
</style>
