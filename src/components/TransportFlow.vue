<template>
  <!-- Two-layer view of a FIPS message in flight:
       - Top: a single FSP session line, encrypted end-to-end between A and E,
         carrying a sealed envelope (the session message).
       - Bottom: per-hop FMP "bridges" — each one a different transport,
         independently encrypted, drawn as an upward arc.
       The packet's *wrapper* shape and tint changes at every hop to make
       per-hop encryption visible: each forwarder strips the previous
       cipher and re-wraps the same payload before sending it on. The
       small bright dot at the bow apex is the constant FSP-encrypted
       payload underneath.
       Reference: docs/design/diagrams/fips-architecture-overview.svg -->
  <svg
    class="transport-flow"
    viewBox="0 0 660 160"
    role="img"
    aria-label="A FIPS session between a browser and a server, carried over five FMP-encrypted hops — Bluetooth, Ethernet, UDP, Tor, and Serial — each at its own speed and with its own cipher wrapping the same end-to-end-encrypted payload."
  >
    <!-- ===== FSP layer (top) ===== -->
    <!-- Browser (left peer). -->
    <g class="endpoint endpoint-browser" transform="translate(50 18)">
      <rect x="-14" y="-11" width="28" height="22" rx="2.5" />
      <line x1="-14" y1="-4" x2="14" y2="-4" class="endpoint-line" />
      <circle class="dot dot-r" cx="-10.5" cy="-7.5" r="1" />
      <circle class="dot dot-y" cx="-7.5"  cy="-7.5" r="1" />
      <circle class="dot dot-g" cx="-4.5"  cy="-7.5" r="1" />
      <line x1="-9" y1="2" x2="9" y2="2" class="endpoint-line endpoint-line--dim" />
      <line x1="-9" y1="6" x2="3" y2="6" class="endpoint-line endpoint-line--dim" />
    </g>

    <!-- Server (right peer). -->
    <g class="endpoint endpoint-server" transform="translate(610 18)">
      <rect x="-12" y="-13" width="24" height="26" rx="2.5" />
      <line x1="-12" y1="-4.5" x2="12" y2="-4.5" class="endpoint-line endpoint-line--dim" />
      <line x1="-12" y1="4.5"  x2="12" y2="4.5"  class="endpoint-line endpoint-line--dim" />
      <circle class="dot dot-led" cx="-7" cy="-9" r="1" />
      <circle class="dot dot-led" cx="-7" cy="0"  r="1" />
      <circle class="dot dot-led" cx="-7" cy="9"  r="1" />
      <line x1="-3" y1="-9" x2="8" y2="-9" class="endpoint-line endpoint-line--dim" />
      <line x1="-3" y1="0"  x2="8" y2="0"  class="endpoint-line endpoint-line--dim" />
      <line x1="-3" y1="9"  x2="8" y2="9"  class="endpoint-line endpoint-line--dim" />
    </g>

    <!-- FSP session line: end-to-end, dashed gold. -->
    <line class="session" x1="64" y1="18" x2="598" y2="18" />

    <!-- Sealed envelope traveling along the session line — the FSP session
         message itself. Body + closed flap V + a clear gold padlock on
         its face. Same x-profile as the FMP packet (41 samples, 8 per
         hop) so it sits exactly above the moving wrapper at every
         instant across all 5 hops. -->
    <g class="session-envelope">
      <rect class="env-body" x="-12" y="-7.5" width="24" height="15" rx="1.2" />
      <path class="env-flap" d="M -12 -7.5 L 0 -2 L 12 -7.5" />
      <path class="env-lock-shackle" d="M -2.3 0 V -2.3 A 2.3 2.3 0 0 1 2.3 -2.3 V 0" />
      <rect class="env-lock-body" x="-4" y="0" width="8" height="6" rx="0.8" />
      <circle class="env-lock-hole" cx="0" cy="3" r="0.8" />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="50 18;53.81 18;64.64 18;80.87 18;100 18;119.13 18;135.36 18;146.19 18;150 18;153.81 18;164.64 18;180.87 18;200 18;219.13 18;235.36 18;246.19 18;250 18;253.81 18;264.64 18;280.87 18;300 18;319.13 18;335.36 18;346.19 18;350 18;355.71 18;371.97 18;396.30 18;425 18;453.70 18;478.03 18;494.29 18;500 18;504.19 18;516.11 18;533.95 18;555 18;576.05 18;593.89 18;605.81 18;610 18"
        keyTimes="0;0.01;0.02;0.03;0.04;0.05;0.06;0.07;0.08;0.0863;0.0925;0.0988;0.105;0.1113;0.1175;0.1238;0.13;0.1488;0.1675;0.1863;0.205;0.2238;0.2425;0.2613;0.28;0.3575;0.435;0.5125;0.59;0.6675;0.745;0.8225;0.90;0.9125;0.925;0.9375;0.95;0.9625;0.975;0.9875;1"
        dur="6s"
        repeatCount="indefinite"
        calcMode="linear"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;1;0"
        keyTimes="0;0.04;0.5;0.96;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </g>

    <!-- Stack drops — vertical stubs from each peer down to the FMP layer. -->
    <line class="stack-drop" x1="50"  y1="30" x2="50"  y2="115" />
    <line class="stack-drop" x1="610" y1="32" x2="610" y2="115" />

    <!-- ===== FMP layer (below) ===== -->
    <!-- Five bows. Tor is the long arc in the middle-right; Serial is a
         shorter trailing arc to the destination. -->
    <path class="hop hop-bt"     d="M 50  120 A 50 50 0 0 1 150 120" />
    <path class="hop hop-eth"    d="M 150 120 A 50 50 0 0 1 250 120" />
    <path class="hop hop-udp"    d="M 250 120 A 50 50 0 0 1 350 120" />
    <path class="hop hop-tor"    d="M 350 120 A 75 75 0 0 1 500 120" />
    <path class="hop hop-serial" d="M 500 120 A 55 55 0 0 1 610 120" />

    <!-- Six FMP nodes: 2 endpoints (under the peers' stack drops) + 4 transit. -->
    <circle class="node node-end" cx="50"  cy="120" r="6" />
    <circle class="node" cx="150" cy="120" r="5" />
    <circle class="node" cx="250" cy="120" r="5" />
    <circle class="node" cx="350" cy="120" r="5" />
    <circle class="node" cx="500" cy="120" r="5" />
    <circle class="node node-end" cx="610" cy="120" r="6" />

    <!-- ===== Per-hop transport icons + labels (between adjacent nodes) ===== -->
    <!-- Bluetooth: stylised "ᛒ" rune as a single closed path so the
         vertical spine on the left can't go missing. Trace: top → upper
         bump → middle → lower bump → bottom → up the spine back to top. -->
    <g class="hop-icon hop-icon--bt" transform="translate(100 120) scale(1.25)">
      <path d="M 0 -9 L 5 -4.5 L 0 0 L 5 4.5 L 0 9 Z" />
    </g>
    <g class="hop-icon hop-icon--eth" transform="translate(200 120) scale(1.25)">
      <polygon points="-8,7 8,7 8,-3 4,-3 4,-7 -4,-7 -4,-3 -8,-3" />
      <line x1="-5" y1="3" x2="-5" y2="6" />
      <line x1="-2" y1="3" x2="-2" y2="6" />
      <line x1="2"  y1="3" x2="2"  y2="6" />
      <line x1="5"  y1="3" x2="5"  y2="6" />
    </g>
    <!-- UDP: rectangle centred on origin, arrow centred inside. -->
    <g class="hop-icon hop-icon--udp" transform="translate(300 120) scale(1.25)">
      <rect x="-8" y="-5" width="16" height="10" rx="1.2" />
      <line x1="-4" y1="0" x2="1" y2="0" />
      <polygon class="solid" points="1,-2 4,0 1,2" />
    </g>
    <g class="hop-icon hop-icon--tor" transform="translate(425 120) scale(1.25)">
      <circle r="9" />
      <circle r="6" />
      <circle r="3" />
      <line x1="0" y1="-9" x2="0" y2="9" />
    </g>
    <!-- Serial-over-USB-C — represented by a USB-C connector pictogram:
         outer pill + inner contact pill. Conceptually still the "serial"
         hop; visually the modern carrier most people recognise. -->
    <g class="hop-icon hop-icon--serial" transform="translate(555 120) scale(1.25)">
      <rect x="-9" y="-3.2" width="18" height="6.4" rx="3.2" />
      <rect x="-6" y="-1.4" width="12" height="2.8" rx="1.4" />
    </g>

    <text class="hop-label" x="100" y="148">bluetooth</text>
    <text class="hop-label" x="200" y="148">ethernet</text>
    <text class="hop-label" x="300" y="148">udp</text>
    <text class="hop-label" x="425" y="148">tor</text>
    <text class="hop-label" x="555" y="148">serial</text>

    <!-- Invisible motion path: chain of all five bows. -->
    <path
      id="transport-flow-path"
      d="M 50 120 A 50 50 0 0 1 150 120 A 50 50 0 0 1 250 120 A 50 50 0 0 1 350 120 A 75 75 0 0 1 500 120 A 55 55 0 0 1 610 120"
      fill="none"
      stroke="none"
    />

    <!-- ============ THE FMP PACKET ============
         keyPoints come from cumulative arc-length fractions:
            BT  end: 157.08 / 879.65 = 0.1786
            Eth end: 314.16 / 879.65 = 0.3571
            UDP end: 471.24 / 879.65 = 0.5357
            Tor end: 706.86 / 879.65 = 0.8036
            Serial end: 1.0
         keyTimes per hop (sum to 1, slow Tor, fast Eth, etc):
            0;0.08;0.13;0.28;0.73;1 -->

    <!-- Always-on payload core riding the bow path. -->
    <circle class="packet-core" r="2.6">
      <animateMotion
        dur="6s"
        repeatCount="indefinite"
        calcMode="linear"
        keyPoints="0;0.1786;0.3571;0.5357;0.8036;1"
        keyTimes="0;0.08;0.13;0.28;0.90;1"
      >
        <mpath href="#transport-flow-path" />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;1;1;1;0"
        keyTimes="0;0.04;0.5;0.96;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </circle>

    <!-- Lock that drifts up off the browser at session start. -->
    <g class="lock-drift">
      <rect class="lock-body" x="-1.8" y="-0.5" width="3.6" height="2.4" rx="0.4" />
      <path class="lock-shackle" d="M -1.1 -0.5 V -1.5 A 1.1 1.1 0 0 1 1.1 -1.5 V -0.5" />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="50 14; 50 14; 38 2; 38 2"
        keyTimes="0;0.015;0.10;1"
        dur="6s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0;0"
        keyTimes="0;0.025;0.06;0.10;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </g>

    <!-- Checkmark that drifts up off the server at journey end. -->
    <g class="check-drift">
      <path class="check" d="M -2.2 0 L -0.5 1.7 L 2.2 -1.7" />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="610 14; 610 14; 622 2"
        keyTimes="0;0.93;1"
        dur="6s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;0;1;1;0"
        keyTimes="0;0.93;0.95;0.99;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </g>

    <!-- Hop wrappers — each visible only during its hop, crossfading at
         the node boundaries (0.08, 0.13, 0.28, 0.73). -->

    <!-- Hop 1 — Bluetooth: wavy concentric ripples (radio). -->
    <g class="wrap wrap-wavy">
      <circle r="8.5" fill="none" stroke-width="1.2" stroke-dasharray="2.2 2.6" />
      <circle r="12" fill="none" stroke-width="0.8" stroke-dasharray="1.5 3" opacity="0.55" />
      <animateMotion
        dur="6s"
        repeatCount="indefinite"
        calcMode="linear"
        keyPoints="0;0.1786;0.3571;0.5357;0.8036;1"
        keyTimes="0;0.08;0.13;0.28;0.90;1"
      >
        <mpath href="#transport-flow-path" />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="1;1;0;0;0;0"
        keyTimes="0;0.075;0.085;0.99;0.999;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </g>

    <!-- Hop 2 — Ethernet: jagged 8-point star. -->
    <g class="wrap wrap-jagged">
      <polygon
        points="11,0 4.21,1.74 7.78,7.78 1.74,4.21 0,11 -1.74,4.21 -7.78,7.78 -4.21,1.74 -11,0 -4.21,-1.74 -7.78,-7.78 -1.74,-4.21 0,-11 1.74,-4.21 7.78,-7.78 4.21,-1.74"
        fill="none"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
      <animateMotion
        dur="6s"
        repeatCount="indefinite"
        calcMode="linear"
        keyPoints="0;0.1786;0.3571;0.5357;0.8036;1"
        keyTimes="0;0.08;0.13;0.28;0.90;1"
      >
        <mpath href="#transport-flow-path" />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0.075;0.085;0.125;0.135;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </g>

    <!-- Hop 3 — UDP: sawtooth (6-point star, sharper). -->
    <g class="wrap wrap-sawtooth">
      <polygon
        points="11,0 2.75,1.59 5.5,9.53 -2.75,1.59 -5.5,9.53 -2.75,-1.59 -11,0 -2.75,-1.59 -5.5,-9.53 2.75,-1.59 5.5,-9.53 2.75,1.59"
        fill="none"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
      <animateMotion
        dur="6s"
        repeatCount="indefinite"
        calcMode="linear"
        keyPoints="0;0.1786;0.3571;0.5357;0.8036;1"
        keyTimes="0;0.08;0.13;0.28;0.90;1"
      >
        <mpath href="#transport-flow-path" />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0.125;0.135;0.275;0.285;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </g>

    <!-- Hop 4 — Tor: scrambled noise. -->
    <g class="wrap wrap-noise">
      <circle cx="-7"  cy="-4" r="1.6" />
      <circle cx="6"   cy="-6" r="1.3" />
      <circle cx="9"   cy="2"  r="1.5" />
      <circle cx="3"   cy="8"  r="1.4" />
      <circle cx="-5"  cy="7"  r="1.7" />
      <circle cx="-9"  cy="0"  r="1.5" />
      <circle cx="-3"  cy="-1" r="1.1" />
      <circle cx="2"   cy="2"  r="1.0" />
      <circle cx="0"   cy="-8" r="1.3" />
      <animateMotion
        dur="6s"
        repeatCount="indefinite"
        calcMode="linear"
        keyPoints="0;0.1786;0.3571;0.5357;0.8036;1"
        keyTimes="0;0.08;0.13;0.28;0.90;1"
      >
        <mpath href="#transport-flow-path" />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0.275;0.285;0.895;0.905;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </g>

    <!-- Hop 5 — Serial: vertical-stripe "binary stream". -->
    <g class="wrap wrap-stripes">
      <line x1="-9"  y1="-3.5" x2="-9"  y2="3.5" stroke-width="0.8" />
      <line x1="-6"  y1="-3.5" x2="-6"  y2="3.5" stroke-width="1.7" />
      <line x1="-3"  y1="-3.5" x2="-3"  y2="3.5" stroke-width="0.8" />
      <line x1="0"   y1="-3.5" x2="0"   y2="3.5" stroke-width="0.8" />
      <line x1="3"   y1="-3.5" x2="3"   y2="3.5" stroke-width="1.7" />
      <line x1="6"   y1="-3.5" x2="6"   y2="3.5" stroke-width="0.8" />
      <line x1="9"   y1="-3.5" x2="9"   y2="3.5" stroke-width="1.7" />
      <animateMotion
        dur="6s"
        repeatCount="indefinite"
        calcMode="linear"
        keyPoints="0;0.1786;0.3571;0.5357;0.8036;1"
        keyTimes="0;0.08;0.13;0.28;0.90;1"
      >
        <mpath href="#transport-flow-path" />
      </animateMotion>
      <animate
        attributeName="opacity"
        values="0;0;1;1;0"
        keyTimes="0;0.895;0.905;0.99;1"
        dur="6s"
        repeatCount="indefinite"
      />
    </g>
  </svg>
</template>

<style scoped>
.transport-flow {
  width: 100%;
  height: auto;
  display: block;
  max-width: 960px;
  margin: 0 auto;
}

/* FSP session — gold, matching the architecture diagram in the docs. */
.session {
  stroke: #d0a040;
  stroke-width: 1.6;
  stroke-dasharray: 8 4;
  stroke-linecap: round;
  animation: session-flow 6s linear infinite;
}
@keyframes session-flow {
  to { stroke-dashoffset: -36; }
}

/* FMP bridges — blue, matching the FMP layer colour in the docs. Line
 * style alone differentiates the transport. */
.hop {
  fill: none;
  stroke: var(--color-fmp-border);
  stroke-width: 1.6;
  stroke-linecap: round;
  opacity: 0.85;
}
.hop-bt     { stroke-dasharray: 5 4; }
.hop-eth    { /* solid */ }
.hop-udp    { stroke-dasharray: 2 5; }
.hop-tor    { stroke-dasharray: 1 6; stroke-width: 1.8; }
.hop-serial { stroke-dasharray: 4 2 1 2; }

.node {
  fill: var(--color-fmp-border);
  filter: drop-shadow(0 0 6px rgba(80, 128, 192, 0.7));
}
.node-end {
  fill: #7ab2e6;
  filter: drop-shadow(0 0 8px rgba(80, 128, 192, 0.9));
}

.stack-drop {
  stroke: var(--color-fmp-border);
  stroke-width: 1;
  stroke-dasharray: 2 3;
  opacity: 0.6;
}

.hop-icon {
  stroke: var(--color-fmp-border);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.2;
  opacity: 0.85;
}
.hop-icon path,
.hop-icon line,
.hop-icon polygon,
.hop-icon rect,
.hop-icon circle {
  fill: none;
}
.hop-icon .solid {
  fill: var(--color-fmp-border);
  stroke: none;
}

.hop-label {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  fill: var(--text-muted);
  text-anchor: middle;
}

.endpoint rect {
  fill: var(--bg-page);
  stroke: var(--color-fmp-border);
  stroke-width: 1.2;
  filter: drop-shadow(0 0 6px rgba(80, 128, 192, 0.45));
}
.endpoint-line {
  stroke: var(--text-primary);
  stroke-width: 1;
  stroke-linecap: round;
}
.endpoint-line--dim {
  stroke: var(--text-muted);
  stroke-width: 0.7;
  stroke-linecap: round;
}
.dot { stroke: none; }
.dot-r { fill: #f87171; }
.dot-y { fill: #f59e0b; }
.dot-g { fill: var(--color-app-border); }
.dot-led {
  fill: var(--color-app-border);
  filter: drop-shadow(0 0 2px var(--color-app-border));
}

.packet-core {
  fill: #f5fbff;
  filter: drop-shadow(0 0 6px rgba(186, 244, 255, 0.95));
}

/* Sealed envelope on the session line — the FSP session message. */
.session-envelope {
  filter: drop-shadow(0 0 6px rgba(186, 244, 255, 0.55));
}
.env-body { fill: #f5fbff; stroke: none; }
.env-flap {
  fill: none;
  stroke: rgba(13, 17, 23, 0.55);
  stroke-width: 0.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.env-lock-body { fill: #d0a040; stroke: none; }
.env-lock-shackle {
  fill: none;
  stroke: #d0a040;
  stroke-width: 1.1;
  stroke-linecap: round;
}
.env-lock-hole { fill: rgba(13, 17, 23, 0.85); }

/* Lock drifting off browser. */
.lock-drift {
  filter: drop-shadow(0 0 4px rgba(208, 160, 64, 0.85));
}
.lock-body { fill: #d0a040; stroke: none; }
.lock-shackle {
  fill: none;
  stroke: #d0a040;
  stroke-width: 0.7;
  stroke-linecap: round;
}

/* Checkmark drifting off server. */
.check-drift {
  filter: drop-shadow(0 0 4px rgba(52, 211, 153, 0.9));
}
.check {
  fill: none;
  stroke: #34d399;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Hop wrappers — different shape AND tint per hop. */
.wrap circle, .wrap polygon, .wrap rect, .wrap line {
  filter: drop-shadow(0 0 5px currentColor);
}
.wrap-wavy     { color: #5fb6ff; stroke: #5fb6ff; }
.wrap-jagged   { color: #ffb066; stroke: #ffb066; }
.wrap-sawtooth { color: #6ee7b7; stroke: #6ee7b7; }
.wrap-noise    { color: #b78cff; }
.wrap-noise circle {
  fill: #b78cff;
  stroke: none;
}
.wrap-stripes {
  color: #f87171;
  stroke: #f87171;
  stroke-linecap: round;
}

@media (prefers-reduced-motion: reduce) {
  .session { animation: none; }
  .packet-core animate, .packet-core animateMotion,
  .session-envelope animate, .session-envelope animateTransform,
  .wrap animate, .wrap animateMotion,
  .lock-drift animate, .lock-drift animateTransform,
  .check-drift animate, .check-drift animateTransform {
    display: none;
  }
  .lock-drift, .check-drift { display: none; }
}
</style>
