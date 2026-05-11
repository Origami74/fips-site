<template>
  <!-- Bootstrap peering, from a blank canvas. Ten nodes appear in
       quick succession on shared media; each beacons; whenever two
       within range hear each other, a dashed peer link snaps in. By
       the end of the loop, several nodes are broadcasting at once
       and a sparse mesh has formed — no root, no central authority,
       no operator config.

       Final peer links: A-B, A-C, B-D, B-E, C-D, D-F, E-G, F-G,
                         F-H, G-H, G-I, H-J, I-J

       14s loop. -->
  <div class="diagram">
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ten nodes appear on shared media one after another, beacon, and form peer links with neighbours that hear them, building up a sparse mesh from nothing with multiple nodes broadcasting concurrently."
    >
      <!-- ===== Peer links (dashed = radio). Each fades in at the
           moment both endpoints have heard each other. Stay
           visible to end of loop. ===== -->
      <g stroke="var(--color-fmp-border)" stroke-width="1.5" fill="none" stroke-dasharray="4 5">
        <line x1="110" y1="220" x2="260" y2="110" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.13;0.15;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="110" y1="220" x2="200" y2="320" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.17;0.19;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="260" y1="110" x2="380" y2="200" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.23;0.25;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="200" y1="320" x2="380" y2="200" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.23;0.25;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="260" y1="110" x2="420" y2="80" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.29;0.31;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="380" y1="200" x2="420" y2="80" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.29;0.31;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="380" y1="200" x2="480" y2="310" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.37;0.39;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="420" y1="80"  x2="540" y2="150" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.43;0.45;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="480" y1="310" x2="540" y2="150" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.43;0.45;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="480" y1="310" x2="610" y2="250" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.51;0.53;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="540" y1="150" x2="610" y2="250" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.51;0.53;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="540" y1="150" x2="680" y2="100" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.58;0.60;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="610" y1="250" x2="660" y2="320" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.65;0.67;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
        <line x1="680" y1="100" x2="660" y2="320" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.65;0.67;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </line>
      </g>

      <!-- ===== Beacon waves. Each node has a beacon group whose
           opacity is on between [appear, has-found-its-peers]. Two
           staggered pulse circles per group give the continuous
           "still broadcasting" feel. ===== -->

      <!-- A (110, 220) — appears 5%, peers by 19% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.05;0.07;0.20;0.22;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="110" cy="220" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="110" cy="220" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- B (260, 110) — appears 10%, peers by 31% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.10;0.12;0.32;0.34;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="260" cy="110" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="260" cy="110" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- C (200, 320) — appears 14%, peers by 25% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.14;0.16;0.27;0.29;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="200" cy="320" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="320" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- D (380, 200) — appears 20%, peers by 39% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.20;0.22;0.40;0.42;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="380" cy="200" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="380" cy="200" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- E (420, 80) — appears 26%, peers by 45% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.26;0.28;0.46;0.48;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="420" cy="80" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="420" cy="80" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- F (480, 310) — appears 34%, peers by 53% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.34;0.36;0.54;0.56;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="480" cy="310" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="480" cy="310" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- G (540, 150) — appears 40%, peers by 60% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.40;0.42;0.61;0.63;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="540" cy="150" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="540" cy="150" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- H (610, 250) — appears 48%, peers by 67% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.48;0.50;0.68;0.70;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="610" cy="250" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="610" cy="250" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- I (680, 100) — appears 55%, peers by 67% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.55;0.57;0.68;0.70;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="680" cy="100" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="680" cy="100" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- J (660, 320) — appears 62%, peers by 67% -->
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0"
                 keyTimes="0;0.62;0.64;0.69;0.71;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <circle cx="660" cy="320" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="660" cy="320" r="0" fill="none" stroke="var(--color-fmp-border)" stroke-width="1.4">
          <animate attributeName="r"       values="8;55" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0" dur="1.6s" begin="0.55s" repeatCount="indefinite"/>
        </circle>
      </g>

      <!-- ===== Nodes (each fades in at appearance, stays) ===== -->
      <g class="nodes">
        <g transform="translate(110 220)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.05;0.07;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">A</text>
        </g>
        <g transform="translate(260 110)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.10;0.12;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">B</text>
        </g>
        <g transform="translate(200 320)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.14;0.16;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">C</text>
        </g>
        <g transform="translate(380 200)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.20;0.22;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">D</text>
        </g>
        <g transform="translate(420 80)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.26;0.28;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">E</text>
        </g>
        <g transform="translate(480 310)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.34;0.36;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">F</text>
        </g>
        <g transform="translate(540 150)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.40;0.42;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">G</text>
        </g>
        <g transform="translate(610 250)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.48;0.50;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">H</text>
        </g>
        <g transform="translate(680 100)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.55;0.57;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">I</text>
        </g>
        <g transform="translate(660 320)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.62;0.64;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
          <circle r="11" class="node"/><text class="node-label">J</text>
        </g>
      </g>

      <!-- ===== Traffic packets — start flowing as soon as ≥3 nodes
           have peered up. Each packet uses only the peer links that
           exist at its launch time, so the route grows as the mesh
           grows. ===== -->

      <!-- Packet 1 (17%): B → A → C  (first 3 peers: A, B, C) -->
      <circle r="4.5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.17;0.19;0.28;0.30;1"
                 dur="14s" repeatCount="indefinite"/>
        <animateMotion
          dur="14s"
          repeatCount="indefinite"
          path="M 260 110 L 110 220 L 200 320"
          keyTimes="0;0.19;0.28;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- Packet 2 (32%): D → C → A  (B-D and C-D in play now) -->
      <circle r="4.5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.32;0.34;0.43;0.45;1"
                 dur="14s" repeatCount="indefinite"/>
        <animateMotion
          dur="14s"
          repeatCount="indefinite"
          path="M 380 200 L 200 320 L 110 220"
          keyTimes="0;0.34;0.43;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- Packet 3 (47%): E → G → F  (after E-G and F-G snap in) -->
      <circle r="4.5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.47;0.49;0.58;0.60;1"
                 dur="14s" repeatCount="indefinite"/>
        <animateMotion
          dur="14s"
          repeatCount="indefinite"
          path="M 420 80 L 540 150 L 480 310"
          keyTimes="0;0.49;0.58;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- Packet 4 (62%): A → B → D → F → H -->
      <circle r="4.5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.62;0.64;0.76;0.78;1"
                 dur="14s" repeatCount="indefinite"/>
        <animateMotion
          dur="14s"
          repeatCount="indefinite"
          path="M 110 220 L 260 110 L 380 200 L 480 310 L 610 250"
          keyTimes="0;0.64;0.76;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- Packet 5 (72%): C → D → E → G -->
      <circle r="4.5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.72;0.74;0.83;0.85;1"
                 dur="14s" repeatCount="indefinite"/>
        <animateMotion
          dur="14s"
          repeatCount="indefinite"
          path="M 200 320 L 380 200 L 420 80 L 540 150"
          keyTimes="0;0.74;0.83;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- Packet 6 (82%): J → H → G → I -->
      <circle r="4.5" fill="var(--accent-gold, #f5b942)" opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.82;0.84;0.93;0.95;1"
                 dur="14s" repeatCount="indefinite"/>
        <animateMotion
          dur="14s"
          repeatCount="indefinite"
          path="M 660 320 L 610 250 L 540 150 L 680 100"
          keyTimes="0;0.84;0.93;1"
          keyPoints="0;0;1;1"
          calcMode="linear"/>
      </circle>

      <!-- ===== Mobile passerby node — walks left → right along the
           bottom of the canvas at walking pace, holding peer links
           with its two nearest fixed nodes. Each link's P-side
           endpoint tracks P's x-coordinate, and pairs hand off as
           the closest neighbours change. ===== -->

      <!-- P-A : visible 28-42% (P near x=20-170) -->
      <line y1="360" y2="220" x2="110"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            stroke-dasharray="3 4" opacity="0">
        <animate attributeName="x1"
                 values="20;20;700;700"
                 keyTimes="0;0.28;0.92;1"
                 dur="14s" repeatCount="indefinite"/>
        <animate attributeName="opacity"
                 values="0;0;0.85;0.85;0;0"
                 keyTimes="0;0.29;0.31;0.41;0.43;1"
                 dur="14s" repeatCount="indefinite"/>
      </line>

      <!-- P-C : visible 28-52% (P near x=20-280) -->
      <line y1="360" y2="320" x2="200"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            stroke-dasharray="3 4" opacity="0">
        <animate attributeName="x1"
                 values="20;20;700;700"
                 keyTimes="0;0.28;0.92;1"
                 dur="14s" repeatCount="indefinite"/>
        <animate attributeName="opacity"
                 values="0;0;0.85;0.85;0;0"
                 keyTimes="0;0.29;0.31;0.51;0.53;1"
                 dur="14s" repeatCount="indefinite"/>
      </line>

      <!-- P-D : visible 40-64% (P near x=150-410) -->
      <line y1="360" y2="200" x2="380"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            stroke-dasharray="3 4" opacity="0">
        <animate attributeName="x1"
                 values="20;20;700;700"
                 keyTimes="0;0.28;0.92;1"
                 dur="14s" repeatCount="indefinite"/>
        <animate attributeName="opacity"
                 values="0;0;0.85;0.85;0;0"
                 keyTimes="0;0.39;0.41;0.63;0.65;1"
                 dur="14s" repeatCount="indefinite"/>
      </line>

      <!-- P-F : visible 50-76% (P near x=255-535) -->
      <line y1="360" y2="310" x2="480"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            stroke-dasharray="3 4" opacity="0">
        <animate attributeName="x1"
                 values="20;20;700;700"
                 keyTimes="0;0.28;0.92;1"
                 dur="14s" repeatCount="indefinite"/>
        <animate attributeName="opacity"
                 values="0;0;0.85;0.85;0;0"
                 keyTimes="0;0.49;0.51;0.75;0.77;1"
                 dur="14s" repeatCount="indefinite"/>
      </line>

      <!-- P-H : visible 62-88% (P near x=380-660) -->
      <line y1="360" y2="250" x2="610"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            stroke-dasharray="3 4" opacity="0">
        <animate attributeName="x1"
                 values="20;20;700;700"
                 keyTimes="0;0.28;0.92;1"
                 dur="14s" repeatCount="indefinite"/>
        <animate attributeName="opacity"
                 values="0;0;0.85;0.85;0;0"
                 keyTimes="0;0.61;0.63;0.87;0.89;1"
                 dur="14s" repeatCount="indefinite"/>
      </line>

      <!-- P-J : visible 74-92% (P near x=510-700) -->
      <line y1="360" y2="320" x2="660"
            stroke="var(--accent-gold, #f5b942)" stroke-width="1.4" fill="none"
            stroke-dasharray="3 4" opacity="0">
        <animate attributeName="x1"
                 values="20;20;700;700"
                 keyTimes="0;0.28;0.92;1"
                 dur="14s" repeatCount="indefinite"/>
        <animate attributeName="opacity"
                 values="0;0;0.85;0.85;0;0"
                 keyTimes="0;0.73;0.75;0.91;0.93;1"
                 dur="14s" repeatCount="indefinite"/>
      </line>

      <!-- P node itself — fades in at 28%, walks linearly to x=700,
           fades out at 93%. -->
      <g opacity="0">
        <animate attributeName="opacity"
                 values="0;0;1;1;0;0"
                 keyTimes="0;0.27;0.29;0.92;0.94;1"
                 dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        <animateTransform attributeName="transform" type="translate"
                          values="20 360;20 360;700 360;700 360"
                          keyTimes="0;0.28;0.92;1"
                          dur="14s" repeatCount="indefinite"/>
        <circle r="9" fill="var(--bg-surface)"
                stroke="var(--accent-gold, #f5b942)" stroke-width="1.8"/>
        <text class="node-label">P</text>
      </g>

      <!-- ===== Captions ===== -->
      <g font-family="var(--font-mono)" font-size="11" fill="var(--text-muted)">
        <text x="20" y="22" opacity="0">
          nodes power up, beacon on shared media
          <animate attributeName="opacity" values="1;1;0;0"
                   keyTimes="0;0.32;0.34;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="22" opacity="0">
          peers found — packets start crossing
          <animate attributeName="opacity" values="0;0;1;1;0;0"
                   keyTimes="0;0.34;0.36;0.72;0.74;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
        </text>
        <text x="20" y="22" opacity="0">
          mesh up — traffic flows
          <animate attributeName="opacity" values="0;0;1;1;0"
                   keyTimes="0;0.74;0.76;0.95;1"
                   dur="14s" repeatCount="indefinite" calcMode="discrete"/>
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
