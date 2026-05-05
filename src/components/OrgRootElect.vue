<template>
  <!-- Distributed root election. Ten nodes scattered in a sparse mesh
       briefly announce their addresses; the lowest (A) becomes root and
       a real spanning tree forms — every non-root node aims at its own
       parent (next hop toward A), not at A directly. ~9s loop.

       Tree:
         A (root)
         ├─ B          (tier 1)
         │  └─ E       (tier 2)
         ├─ C
         │  ├─ H
         │  └─ I
         └─ D
            ├─ F
            │  └─ J    (tier 3)
            └─ G
  -->
  <div class="diagram">
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ten nodes in a sparse mesh announce their addresses; the lowest becomes root and a multi-tier spanning tree forms with each node pointing at its parent."
    >
      <defs>
        <marker id="oe-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--accent-gold, #f5b942)" opacity="0.75"/>
        </marker>
      </defs>

      <!-- Mesh edges, faint and always visible. Tree edges first, then
           a handful of cross-links that exist physically but don't end
           up in the tree (siblings, etc). -->
      <g class="mesh-edges" stroke="var(--border-medium)" stroke-width="1" fill="none">
        <!-- tree edges -->
        <line x1="360" y1="320" x2="180" y2="240"/>
        <line x1="360" y1="320" x2="360" y2="200"/>
        <line x1="360" y1="320" x2="540" y2="240"/>
        <line x1="180" y1="240" x2="90"  y2="150"/>
        <line x1="360" y1="200" x2="260" y2="110"/>
        <line x1="360" y1="200" x2="440" y2="80"/>
        <line x1="540" y1="240" x2="540" y2="130"/>
        <line x1="540" y1="240" x2="640" y2="200"/>
        <line x1="540" y1="130" x2="610" y2="50"/>
        <!-- non-tree mesh links -->
        <line x1="180" y1="240" x2="360" y2="200"/>
        <line x1="360" y1="200" x2="540" y2="240"/>
        <line x1="260" y1="110" x2="440" y2="80"/>
        <line x1="540" y1="130" x2="640" y2="200"/>
        <line x1="440" y1="80"  x2="610" y2="50"/>
      </g>

      <!-- Spanning-tree parent pointers — fade in once A is elected.
           Endpoints are shortened by ~14px so the arrowhead lands just
           outside each parent's circle. -->
      <g class="parent-arrows" stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" fill="none" opacity="0" marker-end="url(#oe-arrow)">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.45;0.50;0.95;1"
                 dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        <!-- tier 1: B, C, D → A -->
        <line x1="180" y1="240" x2="347" y2="314"/>
        <line x1="360" y1="200" x2="360" y2="306"/>
        <line x1="540" y1="240" x2="373" y2="314"/>
        <!-- tier 2: E → B,  H + I → C,  F + G → D -->
        <line x1="90"  y1="150" x2="170" y2="230"/>
        <line x1="260" y1="110" x2="350" y2="190"/>
        <line x1="440" y1="80"  x2="368" y2="188"/>
        <line x1="540" y1="130" x2="540" y2="226"/>
        <line x1="640" y1="200" x2="553" y2="235"/>
        <!-- tier 3: J → F -->
        <line x1="610" y1="50"  x2="549" y2="120"/>
      </g>

      <!-- Address chips — visible during the announcement phase. -->
      <g class="addrs" font-family="var(--font-mono)" font-size="10" fill="var(--text-muted)" text-anchor="middle" opacity="0">
        <animate attributeName="opacity"
                 values="0;1;1;0;0"
                 keyTimes="0;0.06;0.40;0.45;1"
                 dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        <text x="360" y="348">0x01</text>
        <text x="155" y="232">0x14</text>
        <text x="334" y="184">0x1c</text>
        <text x="565" y="232">0x23</text>
        <text x="90"  y="134">0x2f</text>
        <text x="260" y="92" >0x37</text>
        <text x="440" y="62" >0x42</text>
        <text x="540" y="112">0x4b</text>
        <text x="660" y="194">0x52</text>
        <text x="610" y="32" >0x5e</text>
      </g>

      <!-- Nodes -->
      <g class="nodes">
        <g transform="translate(360 320)">
          <circle r="13" class="node node--root">
            <animate attributeName="r"
                     values="13;13;18;14;14"
                     keyTimes="0;0.42;0.46;0.55;1"
                     dur="9s" repeatCount="indefinite"/>
          </circle>
          <text class="node-label">A</text>
        </g>
        <g transform="translate(180 240)"><circle r="11" class="node"/><text class="node-label">B</text></g>
        <g transform="translate(360 200)"><circle r="11" class="node"/><text class="node-label">C</text></g>
        <g transform="translate(540 240)"><circle r="11" class="node"/><text class="node-label">D</text></g>
        <g transform="translate(90 150)" ><circle r="11" class="node"/><text class="node-label">E</text></g>
        <g transform="translate(540 130)"><circle r="11" class="node"/><text class="node-label">F</text></g>
        <g transform="translate(640 200)"><circle r="11" class="node"/><text class="node-label">G</text></g>
        <g transform="translate(260 110)"><circle r="11" class="node"/><text class="node-label">H</text></g>
        <g transform="translate(440 80)" ><circle r="11" class="node"/><text class="node-label">I</text></g>
        <g transform="translate(610 50)" ><circle r="11" class="node"/><text class="node-label">J</text></g>
      </g>

      <!-- Gold root star at A — appears once election lands. -->
      <g transform="translate(360 320)" class="root-star" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.45;0.50;0.95;1"
                 dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        <polygon
          points="0,-18 4,-6 17,-6 7,2 11,15 0,7 -11,15 -7,2 -17,-6 -4,-6"
          fill="var(--accent-gold, #f5b942)" opacity="0.95"/>
      </g>

      <!-- Captions -->
      <g font-family="var(--font-mono)" font-size="11" fill="var(--text-muted)">
        <text x="20" y="26" opacity="0">
          nodes announce — lowest addr wins
          <animate attributeName="opacity"
                   values="1;1;0;0"
                   keyTimes="0;0.43;0.45;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          A elected — spanning tree forms
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.45;0.46;0.95;1"
                   dur="9s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.diagram {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}
.diagram svg { width: 100%; height: auto; display: block; }

.node {
  fill: var(--bg-surface);
  stroke: var(--color-fmp-border);
  stroke-width: 1.5;
}
.node--root { stroke-width: 2; }

.node-label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 600;
  text-anchor: middle;
  fill: var(--text-primary);
  dominant-baseline: middle;
}
</style>
