<template>
  <!-- Self-organizing mesh demo, snowflake topology:
       1 hub (M) + 6 inner ring + 6 outer ring = 13 nodes, 24 edges.
       A = outer NW, D = outer SE.
       Phase 1: packet routes A → I_NW → M → I_SE → D (through hub).
       Phase 2: M dies. Spanning tree flickers along the inner ring.
       Phase 3: packet retries A → I_NW → I_W → I_SW → I_SE → D
                (around the dead hub via inner ring).
       Loops every 10s. -->
  <div class="heal">
    <svg
      viewBox="0 0 760 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Snowflake-shaped mesh: a packet flows through the central hub from a NW endpoint to a SE endpoint; the hub fails; the spanning tree recomputes around the inner ring; the packet retries via the ring."
    >
      <!-- ========== mesh edges (always visible, faint) ========== -->
      <g class="mesh-edges" stroke="var(--border-medium)" stroke-width="1" fill="none">
        <!-- spokes hub→inner -->
        <line x1="380" y1="220" x2="470" y2="220"/>
        <line x1="380" y1="220" x2="425" y2="142"/>
        <line x1="380" y1="220" x2="335" y2="142"/>
        <line x1="380" y1="220" x2="290" y2="220"/>
        <line x1="380" y1="220" x2="335" y2="298"/>
        <line x1="380" y1="220" x2="425" y2="298"/>
        <!-- inner ring -->
        <line x1="470" y1="220" x2="425" y2="142"/>
        <line x1="425" y1="142" x2="335" y2="142"/>
        <line x1="335" y1="142" x2="290" y2="220"/>
        <line x1="290" y1="220" x2="335" y2="298"/>
        <line x1="335" y1="298" x2="425" y2="298"/>
        <line x1="425" y1="298" x2="470" y2="220"/>
        <!-- inner→outer arms -->
        <line x1="470" y1="220" x2="560" y2="220"/>
        <line x1="425" y1="142" x2="470" y2="64"/>
        <line x1="335" y1="142" x2="290" y2="64"/>
        <line x1="290" y1="220" x2="200" y2="220"/>
        <line x1="335" y1="298" x2="290" y2="376"/>
        <line x1="425" y1="298" x2="470" y2="376"/>
        <!-- outer ring -->
        <line x1="560" y1="220" x2="470" y2="64"/>
        <line x1="470" y1="64"  x2="290" y2="64"/>
        <line x1="290" y1="64"  x2="200" y2="220"/>
        <line x1="200" y1="220" x2="290" y2="376"/>
        <line x1="290" y1="376" x2="470" y2="376"/>
        <line x1="470" y1="376" x2="560" y2="220"/>
      </g>

      <!-- ========== top path highlight (A → I_NW → M → I_SE → D) -->
      <g stroke="var(--color-fmp-border)" stroke-width="2.5" fill="none" stroke-linecap="round">
        <path d="M 290 64 L 335 142 L 380 220 L 425 298 L 470 376">
          <animate attributeName="stroke-opacity"
                   values="1;1;0.12;0.12;1"
                   keyTimes="0;0.30;0.34;0.95;1"
                   dur="10s" repeatCount="indefinite"/>
        </path>
      </g>

      <!-- ========== bottom path highlight (A → I_NW → I_W → I_SW → I_SE → D) -->
      <g stroke="var(--color-fmp-border)" stroke-width="2.5" fill="none" stroke-linecap="round">
        <path d="M 290 64 L 335 142 L 290 220 L 335 298 L 425 298 L 470 376" stroke-opacity="0.12">
          <animate attributeName="stroke-opacity"
                   values="0.12;0.12;1;1;0.12"
                   keyTimes="0;0.48;0.52;0.95;1"
                   dur="10s" repeatCount="indefinite"/>
        </path>
      </g>

      <!-- ========== flicker overlay (spanning-tree recompute) ==========
           Inner-ring edges pulse cyan during the heal window. -->
      <g class="flicker" stroke="var(--accent-cyan, #22d3ee)" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M 335 142 L 290 220" stroke-opacity="0">
          <animate attributeName="stroke-opacity"
                   values="0;0;0.9;0.1;0.9;0.1;0.9;0.1;0;0"
                   keyTimes="0;0.34;0.36;0.39;0.41;0.43;0.45;0.47;0.50;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </path>
        <path d="M 290 220 L 335 298" stroke-opacity="0">
          <animate attributeName="stroke-opacity"
                   values="0;0;0.1;0.9;0.1;0.9;0.1;0.9;0;0"
                   keyTimes="0;0.34;0.36;0.39;0.41;0.43;0.45;0.47;0.50;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </path>
        <path d="M 335 298 L 425 298" stroke-opacity="0">
          <animate attributeName="stroke-opacity"
                   values="0;0;0.9;0.1;0.9;0.1;0.9;0.1;0;0"
                   keyTimes="0;0.34;0.37;0.40;0.42;0.44;0.46;0.48;0.50;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </path>
        <path d="M 425 142 L 335 142" stroke-opacity="0">
          <animate attributeName="stroke-opacity"
                   values="0;0;0.1;0.9;0.1;0.9;0.1;0.9;0;0"
                   keyTimes="0;0.34;0.37;0.40;0.42;0.44;0.46;0.48;0.50;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </path>
        <path d="M 425 298 L 470 220" stroke-opacity="0">
          <animate attributeName="stroke-opacity"
                   values="0;0;0.1;0.9;0.1;0.9;0.1;0;0"
                   keyTimes="0;0.34;0.36;0.39;0.42;0.45;0.48;0.50;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </path>
      </g>

      <!-- ========== nodes ========== -->

      <!-- Hub M — fails at t=0.32 -->
      <g class="node node--hub">
        <circle cx="380" cy="220" r="13">
          <animate attributeName="fill"
                   values="var(--bg-surface);var(--bg-surface);#3a1414;#3a1414;var(--bg-surface)"
                   keyTimes="0;0.32;0.34;0.95;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
          <animate attributeName="stroke"
                   values="var(--color-fmp-border);var(--color-fmp-border);#a04040;#a04040;var(--color-fmp-border)"
                   keyTimes="0;0.32;0.34;0.95;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </circle>
        <text x="380" y="224" class="node-label">
          <animate attributeName="fill"
                   values="var(--text-primary);var(--text-primary);#7a3030;#7a3030;var(--text-primary)"
                   keyTimes="0;0.32;0.34;0.95;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
          M
        </text>
        <g stroke="#d04848" stroke-width="2" stroke-linecap="round" opacity="0">
          <line x1="372" y1="212" x2="388" y2="228"/>
          <line x1="388" y1="212" x2="372" y2="228"/>
          <animate attributeName="opacity"
                   values="0;0;1;1;0"
                   keyTimes="0;0.32;0.34;0.93;0.95"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </g>
      </g>

      <!-- inner ring -->
      <g class="node"><circle cx="470" cy="220" r="10"/><text x="470" y="224" class="node-label">·</text></g>
      <g class="node"><circle cx="425" cy="142" r="10"/><text x="425" y="146" class="node-label">·</text></g>
      <g class="node"><circle cx="335" cy="142" r="10"/><text x="335" y="146" class="node-label">·</text></g>
      <g class="node"><circle cx="290" cy="220" r="10"/><text x="290" y="224" class="node-label">·</text></g>
      <g class="node"><circle cx="335" cy="298" r="10"/><text x="335" y="302" class="node-label">·</text></g>
      <g class="node"><circle cx="425" cy="298" r="10"/><text x="425" y="302" class="node-label">·</text></g>

      <!-- outer ring (non-endpoint) -->
      <g class="node"><circle cx="560" cy="220" r="10"/></g>
      <g class="node"><circle cx="470" cy="64"  r="10"/></g>
      <g class="node"><circle cx="200" cy="220" r="10"/></g>
      <g class="node"><circle cx="290" cy="376" r="10"/></g>

      <!-- A (NW endpoint) -->
      <g class="node node--endpoint">
        <circle cx="290" cy="64" r="14"/>
        <text x="290" y="68" class="node-label">A</text>
      </g>

      <!-- D (SE endpoint) -->
      <g class="node node--endpoint">
        <circle cx="470" cy="376" r="14"/>
        <text x="470" y="380" class="node-label">D</text>
      </g>

      <!-- ========== bloom rows on key inner-ring nodes ==========
           Bits flip during the heal window (0.36–0.38). -->
      <g class="bloom">
        <!-- I_NW bloom (above-left) — bit 3 clears (lost route via M) -->
        <g transform="translate(308 118)">
          <rect width="5" height="4" x="0"  fill="var(--color-fmp-border)" opacity="0.9"/>
          <rect width="5" height="4" x="6"  fill="var(--border-medium)"   opacity="0.5"/>
          <rect width="5" height="4" x="12" fill="var(--color-fmp-border)" opacity="0.9"/>
          <rect width="5" height="4" x="18" fill="var(--color-fmp-border)" opacity="0.9">
            <animate attributeName="opacity"
                     values="0.9;0.9;0.15;0.15;0.9"
                     keyTimes="0;0.36;0.38;0.95;1"
                     dur="10s" repeatCount="indefinite" calcMode="discrete"/>
          </rect>
          <rect width="5" height="4" x="24" fill="var(--border-medium)"   opacity="0.5"/>
          <rect width="5" height="4" x="30" fill="var(--color-fmp-border)" opacity="0.9"/>
        </g>

        <!-- I_W bloom (left) — bit 4 sets (gained role on new path) -->
        <g transform="translate(244 234)">
          <rect width="5" height="4" x="0"  fill="var(--border-medium)"   opacity="0.5"/>
          <rect width="5" height="4" x="6"  fill="var(--color-fmp-border)" opacity="0.9"/>
          <rect width="5" height="4" x="12" fill="var(--border-medium)"   opacity="0.5"/>
          <rect width="5" height="4" x="18" fill="var(--border-medium)"   opacity="0.5"/>
          <rect width="5" height="4" x="24" fill="var(--border-medium)"   opacity="0.5">
            <animate attributeName="opacity"
                     values="0.5;0.5;0.9;0.9;0.5"
                     keyTimes="0;0.36;0.38;0.95;1"
                     dur="10s" repeatCount="indefinite" calcMode="discrete"/>
            <animate attributeName="fill"
                     values="var(--border-medium);var(--border-medium);var(--color-fmp-border);var(--color-fmp-border);var(--border-medium)"
                     keyTimes="0;0.36;0.38;0.95;1"
                     dur="10s" repeatCount="indefinite" calcMode="discrete"/>
          </rect>
          <rect width="5" height="4" x="30" fill="var(--color-fmp-border)" opacity="0.9"/>
        </g>

        <!-- I_SW bloom (below-left) — bit 1 sets -->
        <g transform="translate(308 314)">
          <rect width="5" height="4" x="0"  fill="var(--color-fmp-border)" opacity="0.9"/>
          <rect width="5" height="4" x="6"  fill="var(--border-medium)"   opacity="0.5">
            <animate attributeName="opacity"
                     values="0.5;0.5;0.9;0.9;0.5"
                     keyTimes="0;0.36;0.38;0.95;1"
                     dur="10s" repeatCount="indefinite" calcMode="discrete"/>
            <animate attributeName="fill"
                     values="var(--border-medium);var(--border-medium);var(--color-fmp-border);var(--color-fmp-border);var(--border-medium)"
                     keyTimes="0;0.36;0.38;0.95;1"
                     dur="10s" repeatCount="indefinite" calcMode="discrete"/>
          </rect>
          <rect width="5" height="4" x="12" fill="var(--border-medium)"   opacity="0.5"/>
          <rect width="5" height="4" x="18" fill="var(--color-fmp-border)" opacity="0.9"/>
          <rect width="5" height="4" x="24" fill="var(--border-medium)"   opacity="0.5"/>
          <rect width="5" height="4" x="30" fill="var(--color-fmp-border)" opacity="0.9"/>
        </g>

        <!-- I_E bloom (right) — bit 0 clears (no longer M-transit) -->
        <g transform="translate(486 234)">
          <rect width="5" height="4" x="0"  fill="var(--color-fmp-border)" opacity="0.9">
            <animate attributeName="opacity"
                     values="0.9;0.9;0.15;0.15;0.9"
                     keyTimes="0;0.36;0.38;0.95;1"
                     dur="10s" repeatCount="indefinite" calcMode="discrete"/>
          </rect>
          <rect width="5" height="4" x="6"  fill="var(--border-medium)"   opacity="0.5"/>
          <rect width="5" height="4" x="12" fill="var(--color-fmp-border)" opacity="0.9"/>
          <rect width="5" height="4" x="18" fill="var(--border-medium)"   opacity="0.5"/>
          <rect width="5" height="4" x="24" fill="var(--color-fmp-border)" opacity="0.9"/>
          <rect width="5" height="4" x="30" fill="var(--border-medium)"   opacity="0.5"/>
        </g>
      </g>

      <!-- ========== packets ========== -->
      <circle r="5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.04;0.05;0.30;0.31;1"
                 dur="10s" repeatCount="indefinite"/>
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          path="M 290 64 L 335 142 L 380 220 L 425 298 L 470 376"
          keyTimes="0;0.05;0.30;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <circle r="5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.54;0.55;0.82;0.83;1"
                 dur="10s" repeatCount="indefinite"/>
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          path="M 290 64 L 335 142 L 290 220 L 335 298 L 425 298 L 470 376"
          keyTimes="0;0.55;0.82;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- ========== captions ========== -->
      <g class="caption" font-family="var(--font-mono)" font-size="11" fill="var(--text-muted)">
        <text x="20" y="26" opacity="0">
          routing A → D via hub
          <animate attributeName="opacity"
                   values="1;1;0;0"
                   keyTimes="0;0.31;0.33;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          M lost — recomputing tree
          <animate attributeName="opacity"
                   values="0;0;1;1;0;0"
                   keyTimes="0;0.33;0.34;0.50;0.52;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="26" opacity="0">
          rerouted around the ring
          <animate attributeName="opacity"
                   values="0;0;1;1;0;0"
                   keyTimes="0;0.52;0.53;0.93;0.94;1"
                   dur="10s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.heal {
  width: 100%;
  max-width: 920px;
  margin-top: var(--space-lg);
}
.heal svg {
  width: 100%;
  height: auto;
  display: block;
}

.node circle {
  fill: var(--bg-surface);
  stroke: var(--color-fmp-border);
  stroke-width: 1.5;
}
.node--hub circle {
  stroke-width: 2;
}
.node--endpoint circle {
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
