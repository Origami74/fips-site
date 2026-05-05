<template>
  <!-- Two parallel paths from S to D; the top one is initially preferred.
       Live link metrics degrade it; the next packet automatically takes
       the bottom path. ~10s loop. -->
  <div class="diagram">
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A packet routes from source S to destination D via the upper path; that path's link metrics degrade; the next packet routes via the lower path."
    >
      <!-- Top path links -->
      <line x1="90"  y1="200" x2="260" y2="90"
            stroke="var(--color-fmp-border)" stroke-width="1.8" fill="none">
        <animate attributeName="stroke"
                 values="var(--color-fmp-border);var(--color-fmp-border);#f87171;#f87171;var(--color-fmp-border)"
                 keyTimes="0;0.40;0.45;0.95;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        <animate attributeName="stroke-dasharray"
                 values="0 0;0 0;3 5;3 5;0 0"
                 keyTimes="0;0.40;0.45;0.95;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
      </line>
      <line x1="260" y1="90"  x2="470" y2="90"
            stroke="var(--color-fmp-border)" stroke-width="1.8" fill="none">
        <animate attributeName="stroke"
                 values="var(--color-fmp-border);var(--color-fmp-border);#f87171;#f87171;var(--color-fmp-border)"
                 keyTimes="0;0.40;0.45;0.95;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        <animate attributeName="stroke-dasharray"
                 values="0 0;0 0;3 5;3 5;0 0"
                 keyTimes="0;0.40;0.45;0.95;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
      </line>
      <line x1="470" y1="90"  x2="630" y2="200"
            stroke="var(--color-fmp-border)" stroke-width="1.8" fill="none">
        <animate attributeName="stroke"
                 values="var(--color-fmp-border);var(--color-fmp-border);#f87171;#f87171;var(--color-fmp-border)"
                 keyTimes="0;0.40;0.45;0.95;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        <animate attributeName="stroke-dasharray"
                 values="0 0;0 0;3 5;3 5;0 0"
                 keyTimes="0;0.40;0.45;0.95;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- Bottom path links — start dim, brighten once chosen. -->
      <line x1="90"  y1="200" x2="260" y2="310"
            stroke="var(--border-medium)" stroke-width="1.4" fill="none">
        <animate attributeName="stroke"
                 values="var(--border-medium);var(--border-medium);var(--color-fmp-border);var(--border-medium)"
                 keyTimes="0;0.45;0.50;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        <animate attributeName="stroke-width"
                 values="1.4;1.4;1.8;1.4"
                 keyTimes="0;0.45;0.50;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
      </line>
      <line x1="260" y1="310" x2="470" y2="310"
            stroke="var(--border-medium)" stroke-width="1.4" fill="none">
        <animate attributeName="stroke"
                 values="var(--border-medium);var(--border-medium);var(--color-fmp-border);var(--border-medium)"
                 keyTimes="0;0.45;0.50;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        <animate attributeName="stroke-width"
                 values="1.4;1.4;1.8;1.4"
                 keyTimes="0;0.45;0.50;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
      </line>
      <line x1="470" y1="310" x2="630" y2="200"
            stroke="var(--border-medium)" stroke-width="1.4" fill="none">
        <animate attributeName="stroke"
                 values="var(--border-medium);var(--border-medium);var(--color-fmp-border);var(--border-medium)"
                 keyTimes="0;0.45;0.50;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        <animate attributeName="stroke-width"
                 values="1.4;1.4;1.8;1.4"
                 keyTimes="0;0.45;0.50;1"
                 dur="10s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- Link-stat label, top path -->
      <g font-family="var(--font-mono)" font-size="11" text-anchor="middle">
        <text x="365" y="72" fill="var(--color-fmp-border)" opacity="0.9">
          5ms · 820 Mb/s
          <animate attributeName="opacity"
                   values="0.9;0.9;0;0"
                   keyTimes="0;0.40;0.42;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="365" y="72" fill="#f87171" opacity="0">
          62ms · 35 Mb/s · loss
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.42;0.44;0.95;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>

      <!-- Link-stat label, bottom path -->
      <g font-family="var(--font-mono)" font-size="11" text-anchor="middle">
        <text x="365" y="338" fill="var(--text-muted)" opacity="0.7">
          14ms · 240 Mb/s
          <animate attributeName="opacity"
                   values="0.7;0.7;1;0.7"
                   keyTimes="0;0.45;0.50;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>

      <!-- Packet via top path (early in loop, while top is good) -->
      <circle r="5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.10;0.12;0.32;0.34;1"
                 dur="10s" repeatCount="indefinite"/>
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          path="M 90 200 L 260 90 L 470 90 L 630 200"
          keyTimes="0;0.12;0.32;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- Packet via bottom path (after top degrades) -->
      <circle r="5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.55;0.57;0.80;0.82;1"
                 dur="10s" repeatCount="indefinite"/>
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          path="M 90 200 L 260 310 L 470 310 L 630 200"
          keyTimes="0;0.57;0.80;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- Nodes -->
      <g class="nodes">
        <g transform="translate(90 200)" ><circle r="14" class="node node--endpoint"/><text class="node-label">S</text></g>
        <g transform="translate(630 200)"><circle r="14" class="node node--endpoint"/><text class="node-label">D</text></g>
        <g transform="translate(260 90)" ><circle r="11" class="node"/></g>
        <g transform="translate(470 90)" ><circle r="11" class="node"/></g>
        <g transform="translate(260 310)"><circle r="11" class="node"/></g>
        <g transform="translate(470 310)"><circle r="11" class="node"/></g>
      </g>

      <!-- Captions -->
      <g font-family="var(--font-mono)" font-size="11" fill="var(--text-muted)">
        <text x="20" y="26" opacity="0">
          top path preferred
          <animate attributeName="opacity" values="1;1;0;0"
                   keyTimes="0;0.40;0.42;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          link degrades — parents reselect
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.42;0.44;0.55;0.57;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          traffic on the better path
          <animate attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.57;0.59;0.95;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
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
