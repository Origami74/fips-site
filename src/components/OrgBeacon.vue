<template>
  <!-- Existing tree on the left. A new node X beacons on shared media; a
       neighbour hears it and a radio link forms; X is absorbed into the
       tree with a parent pointer toward the root. ~9s loop. -->
  <div class="diagram">
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A four-node tree on the left; a fresh node X on the right pulses beacons; the nearest tree node detects it and a radio link is established; X becomes part of the tree."
    >
      <defs>
        <marker id="ob-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--accent-gold, #f5b942)" opacity="0.7"/>
        </marker>
      </defs>

      <!-- Tree edges -->
      <g stroke="var(--color-fmp-border)" stroke-width="1.5" fill="none" opacity="0.7">
        <line x1="220" y1="200" x2="130" y2="130"/>
        <line x1="220" y1="200" x2="130" y2="270"/>
        <line x1="220" y1="200" x2="310" y2="200"/>
      </g>

      <!-- Beacon waves emanating from X -->
      <g class="waves">
        <animate attributeName="opacity"
                 values="1;1;0;0;1"
                 keyTimes="0;0.32;0.36;0.95;1"
                 dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="560" cy="200" r="0" fill="none"
                stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r" values="8;78" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="560" cy="200" r="0" fill="none"
                stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r" values="8;78" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="560" cy="200" r="0" fill="none"
                stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r" values="8;78" dur="1.8s" begin="1.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.8s" begin="1.2s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- Radio link D ↔ X (dashed, appears once D detects the beacon) -->
      <line x1="310" y1="200" x2="560" y2="200"
            stroke="var(--color-fmp-border)" stroke-width="1.5"
            stroke-dasharray="4 5" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.36;0.40;0.95;1"
                 dur="9s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- Spanning-tree parent pointers (resulting state). X's parent is
           D — the node that heard the beacon — not A directly. -->
      <g stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none" opacity="0" marker-end="url(#ob-arrow)">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.62;0.66;0.95;1"
                 dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        <!-- existing tree: B → A,  C → A,  D → A -->
        <line x1="130" y1="130" x2="209" y2="191"/>
        <line x1="130" y1="270" x2="209" y2="209"/>
        <line x1="310" y1="200" x2="234" y2="200"/>
        <!-- new edge:    X → D -->
        <line x1="560" y1="200" x2="324" y2="200"/>
      </g>

      <!-- Root star at A -->
      <g transform="translate(220 200)">
        <polygon points="0,-20 5,-6 19,-6 7,3 12,17 0,8 -12,17 -7,3 -19,-6 -5,-6"
                 fill="var(--accent-gold, #f5b942)" opacity="0.95"/>
      </g>

      <!-- Tree nodes -->
      <g class="nodes">
        <g transform="translate(130 130)"><circle r="12" class="node"/><text class="node-label">B</text></g>
        <g transform="translate(130 270)"><circle r="12" class="node"/><text class="node-label">C</text></g>
        <g transform="translate(310 200)"><circle r="12" class="node"/><text class="node-label">D</text></g>
      </g>

      <!-- New node X — pulses while beaconing, settles afterward. -->
      <g transform="translate(560 200)">
        <circle r="13" class="node node--new">
          <animate attributeName="r"
                   values="13;15;13;13"
                   keyTimes="0;0.18;0.36;1"
                   dur="9s" repeatCount="indefinite"/>
        </circle>
        <text class="node-label">X</text>
      </g>

      <!-- Captions -->
      <g font-family="var(--font-mono)" font-size="11" fill="var(--text-muted)">
        <text x="20" y="26" opacity="0">
          new node beaconing
          <animate attributeName="opacity" values="1;1;0;0"
                   keyTimes="0;0.36;0.38;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          neighbour heard — link up
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.38;0.40;0.62;0.64;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          absorbed into the tree
          <animate attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.64;0.66;0.95;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
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
.node--new {
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
