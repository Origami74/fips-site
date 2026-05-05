<template>
  <!-- Distributed root election + cascading failover. Ten nodes scatter
       in a sparse mesh:

         Phase 1 (announce):     each node calls out its addr.
         Phase 2 (elect):        lowest addr (A) becomes root, tree forms.
         Phase 3 (failover):     A dies; B (next-lowest) is promoted; C
                                 re-parents to B, then D re-parents to C
                                 — only nodes whose parent vanished have
                                 to act, the rest of the tree is intact.

       Tree (initial):                   After A dies → tree under B:
         A                                   B
         ├─ B → E                            ├─ C → H, I,  D → C
         ├─ C → H, I                         │     D → F → J,  D → G
         └─ D → F → J,  D → G                └─ E (still B's child)

       13s loop. -->
  <div class="diagram">
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ten nodes elect a root and form a spanning tree; the root then dies and the tree re-converges on the next-lowest address with only the affected subtree re-parenting."
    >
      <defs>
        <marker id="oe-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--accent-gold, #f5b942)" opacity="0.75"/>
        </marker>
      </defs>

      <!-- Survivor mesh edges — never touch A. Always visible. -->
      <g class="mesh-edges" stroke="var(--border-medium)" stroke-width="1" fill="none">
        <!-- tree edges (deeper subtrees) -->
        <line x1="180" y1="240" x2="90"  y2="150"/>
        <line x1="360" y1="200" x2="260" y2="110"/>
        <line x1="360" y1="200" x2="440" y2="80"/>
        <line x1="540" y1="240" x2="540" y2="130"/>
        <line x1="540" y1="240" x2="640" y2="200"/>
        <line x1="540" y1="130" x2="610" y2="50"/>
        <!-- non-tree mesh links — these are what let C and D re-parent. -->
        <line x1="180" y1="240" x2="360" y2="200"/>
        <line x1="360" y1="200" x2="540" y2="240"/>
        <line x1="260" y1="110" x2="440" y2="80"/>
        <line x1="540" y1="130" x2="640" y2="200"/>
        <line x1="440" y1="80"  x2="610" y2="50"/>
      </g>

      <!-- A-incident mesh edges — blink red with A, then fade out
           together. Linear opacity for a soft fade. -->
      <g class="mesh-edges-a" stroke="var(--border-medium)" stroke-width="1" fill="none" opacity="1">
        <animate attributeName="stroke"
                 values="var(--border-medium);var(--border-medium);#f87171;var(--border-medium);#f87171;var(--border-medium);#f87171;var(--border-medium)"
                 keyTimes="0;0.44;0.45;0.46;0.47;0.48;0.49;1"
                 dur="13s" repeatCount="indefinite" calcMode="discrete"/>
        <animate attributeName="opacity"
                 values="1;1;0;0"
                 keyTimes="0;0.50;0.55;1"
                 dur="13s" repeatCount="indefinite"/>
        <line x1="360" y1="320" x2="180" y2="240"/>
        <line x1="360" y1="320" x2="360" y2="200"/>
        <line x1="360" y1="320" x2="540" y2="240"/>
      </g>

      <!-- Tier-1 arrows pointing at A. Fade out linearly with A's death
           — B becomes root with no parent; C and D re-parent further
           down via the failover arrows below. -->
      <g stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" fill="none" opacity="0" marker-end="url(#oe-arrow)">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.30;0.32;0.50;0.55;1"
                 dur="13s" repeatCount="indefinite"/>
        <line x1="180" y1="240" x2="347" y2="314"/>
        <line x1="360" y1="200" x2="360" y2="306"/>
        <line x1="540" y1="240" x2="373" y2="314"/>
      </g>

      <!-- Tier-2 / tier-3 arrows. Their parents (B, C, D, F) all survive
           A's death, so these stay valid through the whole election +
           failover. Visible from tree-form until just before loop reset. -->
      <g stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" fill="none" opacity="0" marker-end="url(#oe-arrow)">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.30;0.32;0.95;1"
                 dur="13s" repeatCount="indefinite" calcMode="discrete"/>
        <!-- E → B,  H + I → C,  F + G → D,  J → F -->
        <line x1="90"  y1="150" x2="170" y2="230"/>
        <line x1="260" y1="110" x2="350" y2="190"/>
        <line x1="440" y1="80"  x2="368" y2="188"/>
        <line x1="540" y1="130" x2="540" y2="226"/>
        <line x1="640" y1="200" x2="553" y2="235"/>
        <line x1="610" y1="50"  x2="549" y2="120"/>
      </g>

      <!-- Failover arrow: C → B. Appears once C realises its old parent
           (A) is gone. -->
      <line x1="360" y1="200" x2="194" y2="237"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" fill="none"
            opacity="0" marker-end="url(#oe-arrow)">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.65;0.67;0.95;1"
                 dur="13s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- Failover arrow: D → C. Appears one step after C re-parents,
           since D's path to root now goes via C. -->
      <line x1="540" y1="240" x2="374" y2="203"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" fill="none"
            opacity="0" marker-end="url(#oe-arrow)">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.75;0.77;0.95;1"
                 dur="13s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- Address chips — visible during the announcement phase. -->
      <g class="addrs" font-family="var(--font-mono)" font-size="10" fill="var(--text-muted)" text-anchor="middle" opacity="0">
        <animate attributeName="opacity"
                 values="0;1;1;0;0"
                 keyTimes="0;0.04;0.23;0.27;1"
                 dur="13s" repeatCount="indefinite" calcMode="discrete"/>
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

      <!-- A node group. Stroke blinks red (3 beats) while A is failing,
           then the whole group fades to nothing. Stroke + fill are set
           inline (no .node class) so the SMIL stroke animation isn't
           overridden by CSS. -->
      <g class="node-a" transform="translate(360 320)">
        <animate attributeName="opacity"
                 values="1;1;0;0"
                 keyTimes="0;0.50;0.55;1"
                 dur="13s" repeatCount="indefinite"/>
        <circle r="13"
                fill="var(--bg-surface)"
                stroke="var(--color-fmp-border)"
                stroke-width="2">
          <animate attributeName="r"
                   values="13;13;18;14;14"
                   keyTimes="0;0.27;0.30;0.40;1"
                   dur="13s" repeatCount="indefinite"/>
          <animate attributeName="stroke"
                   values="var(--color-fmp-border);var(--color-fmp-border);#f87171;var(--color-fmp-border);#f87171;var(--color-fmp-border);#f87171;var(--color-fmp-border)"
                   keyTimes="0;0.44;0.45;0.46;0.47;0.48;0.49;1"
                   dur="13s" repeatCount="indefinite" calcMode="discrete"/>
          <animate attributeName="stroke-width"
                   values="2;2;3.5;2;3.5;2;3.5;2"
                   keyTimes="0;0.44;0.45;0.46;0.47;0.48;0.49;1"
                   dur="13s" repeatCount="indefinite" calcMode="discrete"/>
        </circle>
        <text class="node-label">A</text>
      </g>

      <!-- A's gold root star — visible only while A is alive (32–44%).
           Note the explicit snap-to-0 at 0.46 so the star actually
           disappears under discrete-mode SMIL; without it the prior
           value (1) would persist all the way to the loop seam. -->
      <g transform="translate(360 320)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.30;0.32;0.44;0.46;1"
                 dur="13s" repeatCount="indefinite" calcMode="discrete"/>
        <polygon
          points="0,-18 4,-6 17,-6 7,2 11,15 0,7 -11,15 -7,2 -17,-6 -4,-6"
          fill="var(--accent-gold, #f5b942)" opacity="0.95"/>
      </g>

      <!-- Other nodes -->
      <g class="nodes">
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

      <!-- B's promotion star — appears once A is dead. -->
      <g transform="translate(180 240)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0"
                 keyTimes="0;0.55;0.57;0.95;1"
                 dur="13s" repeatCount="indefinite" calcMode="discrete"/>
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
                   keyTimes="0;0.27;0.29;1"
                   dur="13s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          A elected — spanning tree forms
          <animate attributeName="opacity"
                   values="0;0;1;1;0;0"
                   keyTimes="0;0.30;0.32;0.44;0.46;1"
                   dur="13s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          A failing — cascading re-parent
          <animate attributeName="opacity"
                   values="0;0;1;1;0;0"
                   keyTimes="0;0.44;0.46;0.83;0.85;1"
                   dur="13s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          tree converges on B
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.85;0.87;0.95;1"
                   dur="13s" repeatCount="indefinite" calcMode="discrete"/>
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
