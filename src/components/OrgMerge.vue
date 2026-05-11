<template>
  <!-- Two seven-node trees with their roots at opposite corners (L₁
       top-left, R₁ bottom-right). Each island is a sparse mesh — solid
       cyan tree edges plus faint grey non-tree links between siblings
       and cousins, just like a real partial topology.

       A diagonal bridge forms; the merge cascade ripples outward from
       the bridge node through R₃ → R₂ → R₁ (parent updates) and then
       continues as gold pulses through the rest of the right subtree.

       Then the bridge breaks. Red pulses propagate back the same way:
       R₃ falls back to R₂, R₂ falls back to R₁, R₁ has no path to L₁
       and re-elects itself.

       17s loop. -->
  <div class="diagram">
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Two seven-node sparse-mesh trees with diagonally opposite roots merge over a bridge with a cascading parent-update; the bridge then breaks and the right partition re-elects its old root."
    >
      <defs>
        <marker id="om-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--accent-gold, #f5b942)" opacity="0.75"/>
        </marker>
      </defs>

      <!-- ===== Non-tree mesh links (faint grey, drawn first so they
           sit behind tree edges). These give the islands a real mesh
           feel and are the alternate paths C/D/etc. could fall back
           to. ===== -->
      <g stroke="var(--border-medium)" stroke-width="1" fill="none">
        <!-- left island -->
        <line x1="150" y1="50"  x2="200" y2="220"/> <!-- L₂-L₅ -->
        <line x1="270" y1="110" x2="200" y2="220"/> <!-- L₃-L₅ -->
        <line x1="50"  y1="300" x2="190" y2="320"/> <!-- L₆-L₇ -->
        <!-- right island -->
        <line x1="560" y1="320" x2="530" y2="210"/> <!-- R₂-R₅ -->
        <line x1="450" y1="280" x2="530" y2="210"/> <!-- R₃-R₅ -->
        <line x1="670" y1="70"  x2="530" y2="90" /> <!-- R₆-R₇ -->
      </g>

      <!-- ===== Cyan tree edges (left) ===== -->
      <g stroke="var(--color-fmp-border)" stroke-width="1.5" fill="none" opacity="0.7">
        <line x1="50"  y1="90"  x2="150" y2="50" /> <!-- L₁-L₂ -->
        <line x1="150" y1="50"  x2="270" y2="110"/> <!-- L₂-L₃ -->
        <line x1="50"  y1="90"  x2="80"  y2="190"/> <!-- L₁-L₄ -->
        <line x1="80"  y1="190" x2="200" y2="220"/> <!-- L₄-L₅ -->
        <line x1="80"  y1="190" x2="50"  y2="300"/> <!-- L₄-L₆ -->
        <line x1="200" y1="220" x2="190" y2="320"/> <!-- L₅-L₇ -->
      </g>

      <!-- ===== Cyan tree edges (right) ===== -->
      <g stroke="var(--color-fmp-border)" stroke-width="1.5" fill="none" opacity="0.7">
        <line x1="670" y1="310" x2="560" y2="320"/> <!-- R₁-R₂ -->
        <line x1="560" y1="320" x2="450" y2="280"/> <!-- R₂-R₃ -->
        <line x1="670" y1="310" x2="640" y2="190"/> <!-- R₁-R₄ -->
        <line x1="640" y1="190" x2="530" y2="210"/> <!-- R₄-R₅ -->
        <line x1="640" y1="190" x2="670" y2="70" /> <!-- R₄-R₆ -->
        <line x1="530" y1="210" x2="530" y2="90" /> <!-- R₅-R₇ -->
      </g>

      <!-- ===== Diagonal bridge link (dashed). Visible during merged
           window. Blinks red just before tearing. ===== -->
      <line x1="270" y1="110" x2="450" y2="280"
            stroke="var(--color-fmp-border)" stroke-width="1.5"
            stroke-dasharray="4 5" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.22;0.26;0.58;0.62;1"
                 dur="17s" repeatCount="indefinite"/>
        <animate attributeName="stroke"
                 values="var(--color-fmp-border);var(--color-fmp-border);#f87171;var(--color-fmp-border);#f87171;var(--color-fmp-border);#f87171;var(--color-fmp-border)"
                 keyTimes="0;0.56;0.57;0.58;0.59;0.60;0.61;1"
                 dur="17s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- ===== Left-tree gold pointers — always visible ===== -->
      <g stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none" marker-end="url(#om-arrow)">
        <line x1="150" y1="50"  x2="63"  y2="85" /> <!-- L₂ → L₁ -->
        <line x1="270" y1="110" x2="163" y2="56" /> <!-- L₃ → L₂ -->
        <line x1="80"  y1="190" x2="54"  y2="103"/> <!-- L₄ → L₁ -->
        <line x1="200" y1="220" x2="94"  y2="193"/> <!-- L₅ → L₄ -->
        <line x1="50"  y1="300" x2="76"  y2="204"/> <!-- L₆ → L₄ -->
        <line x1="190" y1="320" x2="199" y2="234"/> <!-- L₇ → L₅ -->
      </g>

      <!-- ===== Right-tree gold pointers (sub-branches that never
           change parent: always visible) ===== -->
      <g stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none" marker-end="url(#om-arrow)">
        <line x1="640" y1="190" x2="667" y2="296"/> <!-- R₄ → R₁ -->
        <line x1="670" y1="70"  x2="643" y2="176"/> <!-- R₆ → R₄ -->
        <line x1="530" y1="90"  x2="530" y2="196"/> <!-- R₇ → R₅ -->
      </g>

      <!-- R₅'s parent flips during the merged window. Pre-merge and
           post-split it points at R₄ (its tree neighbour); while merged
           it shortcuts via the R₃-R₅ non-tree mesh link, since
           R₅ → R₃ → L₃ → L₁ is 3 hops to root vs 6 hops via R₄. -->
      <line x1="530" y1="210" x2="626" y2="192"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            marker-end="url(#om-arrow)">
        <animate attributeName="opacity"
                 values="1;1;0;0;1;1"
                 keyTimes="0;0.43;0.45;0.70;0.72;1"
                 dur="17s" repeatCount="indefinite" calcMode="discrete"/>
      </line>
      <line x1="530" y1="210" x2="461" y2="271"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            marker-end="url(#om-arrow)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.45;0.47;0.70;0.72;1"
                 dur="17s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- ===== Time-varying right pointers ===== -->
      <!-- R₂ → R₁ : pre-merge AND post-split. -->
      <line x1="560" y1="320" x2="656" y2="311"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            marker-end="url(#om-arrow)">
        <animate attributeName="opacity"
                 values="1;1;0;0;1;1"
                 keyTimes="0;0.30;0.32;0.66;0.68;1"
                 dur="17s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- R₃ → R₂ : pre-merge AND post-split. -->
      <line x1="450" y1="280" x2="547" y2="315"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            marker-end="url(#om-arrow)">
        <animate attributeName="opacity"
                 values="1;1;0;0;1;1"
                 keyTimes="0;0.26;0.28;0.62;0.64;1"
                 dur="17s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- R₃ → L₃ : merged window only (over the bridge). -->
      <line x1="450" y1="280" x2="280" y2="120"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            marker-end="url(#om-arrow)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.28;0.30;0.62;0.64;1"
                 dur="17s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- R₂ → R₃ : merged window only. -->
      <line x1="560" y1="320" x2="463" y2="285"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            marker-end="url(#om-arrow)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.32;0.34;0.66;0.68;1"
                 dur="17s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- R₁ → R₂ : merged window only. -->
      <line x1="670" y1="310" x2="574" y2="319"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            marker-end="url(#om-arrow)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.36;0.38;0.70;0.72;1"
                 dur="17s" repeatCount="indefinite" calcMode="discrete"/>
      </line>

      <!-- ===== Cascade pulse rings (gold = merge wave) ===== -->
      <g class="merge-pulse">
        <circle cx="450" cy="280" r="11" fill="none" stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="11;11;26;26" keyTimes="0;0.27;0.31;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.7;0;0" keyTimes="0;0.27;0.29;0.31;1" dur="17s" repeatCount="indefinite"/>
        </circle>
        <circle cx="560" cy="320" r="11" fill="none" stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="11;11;26;26" keyTimes="0;0.31;0.35;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.7;0;0" keyTimes="0;0.31;0.33;0.35;1" dur="17s" repeatCount="indefinite"/>
        </circle>
        <circle cx="670" cy="310" r="13" fill="none" stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="13;13;28;28" keyTimes="0;0.35;0.39;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.7;0;0" keyTimes="0;0.35;0.37;0.39;1" dur="17s" repeatCount="indefinite"/>
        </circle>
        <circle cx="640" cy="190" r="11" fill="none" stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="11;11;24;24" keyTimes="0;0.39;0.43;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.7;0;0" keyTimes="0;0.39;0.41;0.43;1" dur="17s" repeatCount="indefinite"/>
        </circle>
        <circle cx="530" cy="210" r="11" fill="none" stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="11;11;24;24" keyTimes="0;0.43;0.47;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.7;0;0" keyTimes="0;0.43;0.45;0.47;1" dur="17s" repeatCount="indefinite"/>
        </circle>
        <circle cx="670" cy="70"  r="11" fill="none" stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="11;11;24;24" keyTimes="0;0.43;0.47;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.7;0;0" keyTimes="0;0.43;0.45;0.47;1" dur="17s" repeatCount="indefinite"/>
        </circle>
        <circle cx="530" cy="90"  r="11" fill="none" stroke="var(--accent-gold, #f5b942)" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="11;11;24;24" keyTimes="0;0.47;0.51;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.7;0;0" keyTimes="0;0.47;0.49;0.51;1" dur="17s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- ===== Cascade pulse rings (red = split wave) ===== -->
      <g class="split-pulse">
        <circle cx="450" cy="280" r="11" fill="none" stroke="#f87171" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="11;11;26;26" keyTimes="0;0.62;0.66;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.62;0.64;0.66;1" dur="17s" repeatCount="indefinite"/>
        </circle>
        <circle cx="560" cy="320" r="11" fill="none" stroke="#f87171" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="11;11;26;26" keyTimes="0;0.66;0.70;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.66;0.68;0.70;1" dur="17s" repeatCount="indefinite"/>
        </circle>
        <circle cx="670" cy="310" r="13" fill="none" stroke="#f87171" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="13;13;28;28" keyTimes="0;0.70;0.74;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.70;0.72;0.74;1" dur="17s" repeatCount="indefinite"/>
        </circle>
        <!-- R₅ pulse — its parent R₃ becomes orphaned, R₅ falls back to R₄. -->
        <circle cx="530" cy="210" r="11" fill="none" stroke="#f87171" stroke-width="1.5" opacity="0">
          <animate attributeName="r"       values="11;11;24;24" keyTimes="0;0.66;0.70;1" dur="17s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.66;0.68;0.70;1" dur="17s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- ===== Roots ===== -->
      <!-- L₁ — never changes -->
      <g transform="translate(50 90)">
        <polygon points="0,-18 4,-6 17,-6 7,2 11,15 0,7 -11,15 -7,2 -17,-6 -4,-6"
                 fill="var(--accent-gold, #f5b942)" opacity="0.95"/>
      </g>

      <!-- R₁ — gold star pre-merge AND post-split. -->
      <g transform="translate(670 310)">
        <polygon points="0,-18 4,-6 17,-6 7,2 11,15 0,7 -11,15 -7,2 -17,-6 -4,-6"
                 fill="var(--accent-gold, #f5b942)" opacity="0.95">
          <animate attributeName="opacity"
                   values="0.95;0.95;0;0;0.95;0.95"
                   keyTimes="0;0.36;0.38;0.78;0.79;1"
                   dur="17s" repeatCount="indefinite" calcMode="discrete"/>
        </polygon>
      </g>

      <!-- R₁ as a regular circle during the merged window. -->
      <g transform="translate(670 310)">
        <circle r="13" fill="var(--bg-surface)" stroke="var(--color-fmp-border)" stroke-width="1.5" opacity="0">
          <animate attributeName="opacity"
                   values="0;0;1;1;0;0"
                   keyTimes="0;0.36;0.38;0.78;0.79;1"
                   dur="17s" repeatCount="indefinite" calcMode="discrete"/>
        </circle>
      </g>

      <!-- ===== Other nodes ===== -->
      <g class="nodes">
        <!-- left -->
        <g transform="translate(150 50)" ><circle r="11" class="node"/><text class="node-label">L₂</text></g>
        <g transform="translate(270 110)"><circle r="11" class="node"/><text class="node-label">L₃</text></g>
        <g transform="translate(80 190)" ><circle r="11" class="node"/><text class="node-label">L₄</text></g>
        <g transform="translate(200 220)"><circle r="11" class="node"/><text class="node-label">L₅</text></g>
        <g transform="translate(50 300)" ><circle r="11" class="node"/><text class="node-label">L₆</text></g>
        <g transform="translate(190 320)"><circle r="11" class="node"/><text class="node-label">L₇</text></g>
        <!-- right -->
        <g transform="translate(560 320)"><circle r="11" class="node"/><text class="node-label">R₂</text></g>
        <g transform="translate(450 280)"><circle r="11" class="node"/><text class="node-label">R₃</text></g>
        <g transform="translate(640 190)"><circle r="11" class="node"/><text class="node-label">R₄</text></g>
        <g transform="translate(530 210)"><circle r="11" class="node"/><text class="node-label">R₅</text></g>
        <g transform="translate(670 70)" ><circle r="11" class="node"/><text class="node-label">R₆</text></g>
        <g transform="translate(530 90)" ><circle r="11" class="node"/><text class="node-label">R₇</text></g>
      </g>

      <!-- Root labels -->
      <text x="50"  y="90"  class="node-label">L₁</text>
      <text x="670" y="310" class="node-label">R₁</text>

      <!-- Captions -->
      <g font-family="var(--font-mono)" font-size="11" fill="var(--text-muted)">
        <text x="20" y="22" opacity="0">
          two separate trees
          <animate attributeName="opacity" values="1;1;0;0"
                   keyTimes="0;0.22;0.24;1" dur="17s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="22" opacity="0">
          radio bridge — addrs compared
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.24;0.26;0.30;0.32;1" dur="17s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="22" opacity="0">
          merging — re-parent cascade
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.32;0.34;0.52;0.54;1" dur="17s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="22" opacity="0">
          merged — single root L₁
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.54;0.56;0.62;0.64;1" dur="17s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="22" opacity="0">
          bridge breaks — partition
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.64;0.66;0.74;0.76;1" dur="17s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="22" opacity="0">
          right side re-elects R₁
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.76;0.78;0.97;0.98;1" dur="17s" repeatCount="indefinite" calcMode="discrete"/>
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
  font-size: 10px;
  font-weight: 600;
  text-anchor: middle;
  fill: var(--text-primary);
  dominant-baseline: middle;
}
</style>
