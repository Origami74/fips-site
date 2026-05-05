<template>
  <!-- Why · 04 — One Nostr secp256k1 keypair generates two primary
       identifiers: an `npub` for FSP sessions, and a `node_addr` for
       FMP mesh routing. The IPv6 (TUN) identifier is set apart
       because it isn't derived from the keypair directly — it's
       chained off `node_addr` for backwards compatibility with
       unmodified IPv6 apps. The two primary cards (FSP, FMP) are
       the same width because they live at the same level of the
       protocol stack.

       Because `node_addr` is a SHA-256 hash of the pubkey, routers
       see hashes only — never the pubkey itself.

       8s loop. -->
  <div class="ident">
    <svg
      viewBox="0 0 920 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A Nostr secp256k1 keypair derives two primary identifiers — npub for FSP sessions and node_addr for FMP mesh routing — and from node_addr a third, smaller IPv6 identifier for the TUN adapter, set apart for backwards compatibility."
    >
      <!-- ===== Central keypair (the source of truth) — vertically
           aligned to the midpoint between the FSP and FMP cards.
           Hex bumped to 156×156 so the eyebrow + title + sk·pk
           lines have generous padding around them. -->
      <g class="key-source" transform="translate(130 210)">
        <polygon points="-78,-44 -39,-78 39,-78 78,-44 78,44 39,78 -39,78 -78,44"
                 class="key-hex"/>
        <text x="0" y="-22" class="key-eyebrow" text-anchor="middle">NOSTR · secp256k1</text>
        <text x="0" y="8"   class="key-title"   text-anchor="middle">your keypair</text>
        <text x="0" y="38"  class="key-mono"    text-anchor="middle">sk · pk</text>
      </g>

      <!-- ===== Primary branches (keypair → FSP, keypair → FMP).
           Start *outside* the hex (right edge sits at x≈208, so we
           begin at x=212) so the lines don't appear to emerge from
           inside the gold border. ===== -->
      <path d="M 212 168 C 248 124, 268 84, 286 84"
            class="branch-line branch--npub"
            stroke="var(--color-fsp-border)"
            fill="none" pathLength="1"/>
      <path d="M 212 252 C 248 296, 268 336, 286 336"
            class="branch-line branch--addr"
            stroke="var(--color-fmp-border)"
            fill="none" pathLength="1"/>

      <!-- ===== Derivation arrow: FMP node_addr → TUN ===== -->
      <path d="M 714 336 L 734 336"
            class="branch-line branch--tun"
            stroke="var(--color-app-border)"
            fill="none" pathLength="1"/>

      <!-- ===== Manual arrowheads (drawn separately so they fade in
           only after the corresponding line has finished drawing).
           Tips sit just outside each card's left edge so the line
           and arrowhead read as one element. ===== -->
      <path d="M 280 80 L 286 84 L 280 88 Z"
            class="arrow arrow--npub"
            fill="var(--color-fsp-border)"/>
      <path d="M 280 332 L 286 336 L 280 340 Z"
            class="arrow arrow--addr"
            fill="var(--color-fmp-border)"/>
      <path d="M 728 332 L 734 336 L 728 340 Z"
            class="arrow arrow--tun"
            fill="var(--color-app-border)"/>

      <!-- ===== FSP card (top, 420 wide × 88 tall) ===== -->
      <g class="deriv deriv--npub" transform="translate(290 40)">
        <rect width="420" height="88" rx="8" class="deriv-box"
              stroke="var(--color-fsp-border)"/>
        <!-- Layer pill: path with rounded LEFT corners only so the
             pill's right edge meets the card border cleanly. -->
        <path d="M 8 0 L 60 0 L 60 88 L 8 88 A 8 8 0 0 1 0 80 L 0 8 A 8 8 0 0 1 8 0 Z"
              class="layer-pill"
              fill="var(--color-fsp)" stroke="var(--color-fsp-border)"/>
        <text x="30" y="40" class="layer-pill-name"
              fill="var(--color-fsp-border)" text-anchor="middle">FSP</text>
        <text x="30" y="60" class="layer-pill-role"
              fill="var(--color-fsp-border)" text-anchor="middle">session</text>
        <text x="76" y="28" class="deriv-tag"
              fill="var(--color-fsp-border)">npub</text>
        <text x="76" y="54" class="deriv-mono">npub1qjk2nice…7pf2vpu</text>
        <text x="76" y="74" class="deriv-role">application identity · who you talk to</text>
      </g>

      <!-- ===== FMP card (bottom, 420 wide × 88 tall — same width
           as FSP because they live at the same level of the stack). ===== -->
      <g class="deriv deriv--addr" transform="translate(290 292)">
        <rect width="420" height="88" rx="8" class="deriv-box"
              stroke="var(--color-fmp-border)"/>
        <path d="M 8 0 L 60 0 L 60 88 L 8 88 A 8 8 0 0 1 0 80 L 0 8 A 8 8 0 0 1 8 0 Z"
              class="layer-pill"
              fill="var(--color-fmp)" stroke="var(--color-fmp-border)"/>
        <text x="30" y="40" class="layer-pill-name"
              fill="var(--color-fmp-border)" text-anchor="middle">FMP</text>
        <text x="30" y="60" class="layer-pill-role"
              fill="var(--color-fmp-border)" text-anchor="middle">routing</text>
        <text x="76" y="28" class="deriv-tag"
              fill="var(--color-fmp-border)">node_addr</text>
        <text x="76" y="54" class="deriv-mono">9a4f 7b21 c8e0 5f43… (16 B)</text>
        <text x="76" y="74" class="deriv-role">routing identifier · what the mesh sees</text>
      </g>

      <!-- ===== TUN card — same height + fonts as FMP for visual
           parity. Width is narrower because it has to fit beside
           FMP, and the dashed border + reduced opacity keeps it
           reading as a downstream derivation rather than a peer. ===== -->
      <g class="deriv deriv--ipv6" transform="translate(740 292)">
        <rect width="172" height="88" rx="8" class="deriv-box deriv-box--secondary"
              stroke="var(--color-app-border)"/>
        <path d="M 8 0 L 60 0 L 60 88 L 8 88 A 8 8 0 0 1 0 80 L 0 8 A 8 8 0 0 1 8 0 Z"
              class="layer-pill"
              fill="var(--color-app)" stroke="var(--color-app-border)"/>
        <text x="30" y="40" class="layer-pill-name"
              fill="var(--color-app-border)" text-anchor="middle">TUN</text>
        <text x="30" y="60" class="layer-pill-role"
              fill="var(--color-app-border)" text-anchor="middle">legacy</text>
        <text x="74" y="28" class="deriv-tag"
              fill="var(--color-app-border)">ipv6_addr</text>
        <text x="74" y="54" class="deriv-mono">fd9a:4f7b…</text>
        <text x="74" y="74" class="deriv-role">for IPv6 apps</text>
      </g>


      <!-- ===== Privacy badge — directly under FMP, full width ===== -->
      <g class="privacy-badge">
        <rect x="290" y="392" width="420" height="28" rx="4"
              class="privacy-bg"/>
        <text x="500" y="411" class="privacy-text" text-anchor="middle">
          routes by node_addr · npub not known to mesh
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let timer: number | null = null

function startCycle(el: HTMLElement) {
  el.classList.remove('is-step-1', 'is-step-2', 'is-step-3', 'is-step-4')
  setTimeout(() => el.classList.add('is-step-1'), 60)    // keypair
  setTimeout(() => el.classList.add('is-step-2'), 800)   // primary branches + cards
  setTimeout(() => el.classList.add('is-step-3'), 1900)  // FMP→TUN derivation + TUN card
  setTimeout(() => el.classList.add('is-step-4'), 2700)  // privacy badge
}

onMounted(() => {
  const target = (typeof document !== 'undefined') ?
    (document.querySelector('.ident') as HTMLElement | null) : null
  if (!target) return
  startCycle(target)
  timer = window.setInterval(() => startCycle(target), 8000)
})

onBeforeUnmount(() => {
  if (timer !== null) window.clearInterval(timer)
})
</script>

<style scoped>
.ident {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}
.ident svg { width: 100%; height: auto; display: block; }

/* ===== Keypair source ===== */
.key-hex {
  fill: var(--bg-surface);
  stroke: var(--accent-gold, #d0a040);
  stroke-width: 1.8;
}
.key-eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  fill: var(--text-muted);
}
.key-title {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 700;
  fill: var(--text-primary);
}
.key-mono {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: var(--accent-gold, #d0a040);
  letter-spacing: 0.06em;
}

/* ===== Derivation cards ===== */
.deriv-box {
  fill: var(--bg-surface);
  stroke-width: 1.6;
  opacity: 0.95;
}
.deriv-box--secondary {
  fill: var(--bg-surface);
  opacity: 0.78;
  stroke-width: 1.3;
  stroke-dasharray: 3 3;
}

.layer-pill {
  stroke-width: 1.5;
  opacity: 0.7;
}
.layer-pill-name {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.layer-pill-name--sm { font-size: 12px; }
.layer-pill-role {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  opacity: 0.85;
}

.deriv-tag {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.deriv-tag--sm { font-size: 11.5px; }

.deriv-mono {
  font-family: var(--font-mono);
  font-size: 13px;
  fill: var(--text-primary);
}
.deriv-mono--sm { font-size: 10.5px; }

.deriv-role {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: var(--text-muted);
}
.deriv-role--sm { font-size: 9px; }

/* ===== Derivation hint on FMP→TUN arrow ===== */
.deriv-hint {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.04em;
  opacity: 0.7;
}

/* ===== Privacy badge ===== */
.privacy-bg {
  fill: rgba(80, 128, 192, 0.10);
  stroke: var(--color-fmp-border);
  stroke-width: 0.9;
  stroke-dasharray: 3 3;
}
.privacy-text {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  fill: var(--color-fmp-border);
  letter-spacing: 0.02em;
}

/* ===== Arrowheads (separate so we can defer their appearance
   until the corresponding line has finished drawing). ===== */
.arrow {
  opacity: 0;
  transition: opacity 0.18s ease;
}

/* ===== Step-driven animations ===== */
.key-source,
.deriv,
.privacy-badge { opacity: 0; }
.branch-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  stroke-width: 1.8;
}
.branch--tun { stroke-width: 1.5; }

.key-source,
.deriv,
.privacy-badge {
  transition: opacity 0.5s ease;
}
.branch-line {
  transition: stroke-dashoffset 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.ident.is-step-1 .key-source { opacity: 1; }

.ident.is-step-2 .branch--npub,
.ident.is-step-2 .branch--addr     { stroke-dashoffset: 0; }
.ident.is-step-2 .deriv--npub      { opacity: 1; transition-delay: 0.5s; }
.ident.is-step-2 .deriv--addr      { opacity: 1; transition-delay: 0.55s; }
.ident.is-step-2 .arrow--npub      { opacity: 0.9; transition-delay: 0.7s; }
.ident.is-step-2 .arrow--addr      { opacity: 0.9; transition-delay: 0.7s; }

.ident.is-step-3 .branch--tun      { stroke-dashoffset: 0; }
.ident.is-step-3 .arrow--tun       { opacity: 0.9; transition-delay: 0.55s; }
.ident.is-step-3 .deriv--ipv6      { opacity: 1; transition-delay: 0.4s; }

.ident.is-step-4 .privacy-badge { opacity: 1; }
</style>
