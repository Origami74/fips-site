<template>
  <!-- Two independent trees, each with their own gold-star root, drift
       within range. A radio bridge forms between them; the higher-addr
       root demotes; the right subtree reorients toward the left root.
       ~9s loop. -->
  <div class="diagram">
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Two separate four-node trees with their own roots come into range, form a radio bridge, then merge into a single tree under the lower-address root."
    >
      <defs>
        <marker id="om-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--accent-gold, #f5b942)" opacity="0.7"/>
        </marker>
      </defs>

      <!-- Left tree edges (always present) -->
      <g stroke="var(--color-fmp-border)" stroke-width="1.5" fill="none" opacity="0.7">
        <line x1="190" y1="200" x2="110" y2="130"/>
        <line x1="190" y1="200" x2="110" y2="270"/>
        <line x1="190" y1="200" x2="270" y2="200"/>
      </g>

      <!-- Right tree edges — color shifts to match left after merge. -->
      <g stroke-width="1.5" fill="none" opacity="0.7">
        <line x1="530" y1="200" x2="450" y2="200">
          <animate attributeName="stroke"
                   values="var(--color-fsp-border);var(--color-fsp-border);var(--color-fmp-border);var(--color-fmp-border)"
                   keyTimes="0;0.55;0.65;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="530" y1="200" x2="610" y2="130">
          <animate attributeName="stroke"
                   values="var(--color-fsp-border);var(--color-fsp-border);var(--color-fmp-border);var(--color-fmp-border)"
                   keyTimes="0;0.55;0.65;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="530" y1="200" x2="610" y2="270">
          <animate attributeName="stroke"
                   values="var(--color-fsp-border);var(--color-fsp-border);var(--color-fmp-border);var(--color-fmp-border)"
                   keyTimes="0;0.55;0.65;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
      </g>

      <!-- Radio bridge between the two islands — appears mid-loop. -->
      <line x1="270" y1="200" x2="450" y2="200"
            stroke="var(--color-fmp-border)" stroke-width="1.5"
            stroke-dasharray="4 5" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.30;0.35;0.95;1"
                 dur="9s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- Right-subtree parent pointers after merge. The bridge (L₄ ↔ R₂)
           is the new gateway: R₂'s parent is L₄, then R₁ chains through
           R₂, and R₃/R₄ stay attached to their old parent R₁ — exactly
           what a real spanning tree does after a topology change. -->
      <g stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none" opacity="0" marker-end="url(#om-arrow)">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.65;0.70;0.95;1"
                 dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        <!-- R₂ → L₄ (over the bridge) -->
        <line x1="450" y1="200" x2="284" y2="200"/>
        <!-- R₁ → R₂ -->
        <line x1="530" y1="200" x2="464" y2="200"/>
        <!-- R₃ → R₁ -->
        <line x1="610" y1="130" x2="540" y2="191"/>
        <!-- R₄ → R₁ -->
        <line x1="610" y1="270" x2="540" y2="209"/>
      </g>

      <!-- Left root (stays a star) -->
      <g transform="translate(190 200)">
        <polygon points="0,-20 5,-6 19,-6 7,3 12,17 0,8 -12,17 -7,3 -19,-6 -5,-6"
                 fill="var(--accent-gold, #f5b942)" opacity="0.95"/>
      </g>

      <!-- Right root: star → circle once demoted -->
      <g transform="translate(530 200)">
        <polygon points="0,-20 5,-6 19,-6 7,3 12,17 0,8 -12,17 -7,3 -19,-6 -5,-6"
                 fill="var(--accent-gold, #f5b942)" opacity="0.95">
          <animate attributeName="opacity"
                   values="0.95;0.95;0;0"
                   keyTimes="0;0.55;0.60;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </polygon>
        <circle r="13" class="node" opacity="0">
          <animate attributeName="opacity"
                   values="0;0;1;1"
                   keyTimes="0;0.55;0.60;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </circle>
      </g>

      <!-- Other nodes -->
      <g class="nodes">
        <g transform="translate(110 130)"><circle r="12" class="node"/><text class="node-label">L₂</text></g>
        <g transform="translate(110 270)"><circle r="12" class="node"/><text class="node-label">L₃</text></g>
        <g transform="translate(270 200)"><circle r="12" class="node"/><text class="node-label">L₄</text></g>
        <g transform="translate(450 200)"><circle r="12" class="node"/><text class="node-label">R₂</text></g>
        <g transform="translate(610 130)"><circle r="12" class="node"/><text class="node-label">R₃</text></g>
        <g transform="translate(610 270)"><circle r="12" class="node"/><text class="node-label">R₄</text></g>
      </g>

      <!-- Captions -->
      <g font-family="var(--font-mono)" font-size="11" fill="var(--text-muted)">
        <text x="20" y="26" opacity="0">
          two separate trees
          <animate attributeName="opacity" values="1;1;0;0"
                   keyTimes="0;0.30;0.32;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          radio bridge — addrs compared
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.32;0.34;0.60;0.62;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          merged — single root
          <animate attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.62;0.64;0.95;1"
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
.node-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  text-anchor: middle;
  fill: var(--text-primary);
  dominant-baseline: middle;
}
</style>
