<template>
  <!-- Why · 04 — One Nostr secp256k1 keypair fans out into the
       three FIPS identifiers, each used at a different layer:
         npub      — FSP session-level addressing
         node_addr — FMP mesh routing (what the mesh actually sees)
         fd00::/8  — TUN adapter for unmodified IPv6 apps

       node_addr is a SHA-256 hash of the pubkey, so intermediate
       routers see hashes only — never the pubkey itself. That's
       the privacy story baked into the layer split.

       8s loop. -->
  <div class="ident">
    <svg
      viewBox="0 0 720 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A Nostr secp256k1 keypair fans out deterministically into three FIPS identifiers, each used at a different protocol layer: npub at the FSP session layer, node_addr at the FMP mesh routing layer (the only one the mesh sees), and an fd00::/8 IPv6 address for the TUN adapter and legacy applications."
    >
      <defs>
        <marker id="wi-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="var(--text-muted)" opacity="0.7"/>
        </marker>
      </defs>

      <!-- ===== Central keypair (the source of truth) ===== -->
      <g class="key-source" transform="translate(120 190)">
        <polygon points="-46,-26 -23,-46 23,-46 46,-26 46,26 23,46 -23,46 -46,26"
                 class="key-hex"/>
        <text x="0" y="-12" class="key-eyebrow" text-anchor="middle">NOSTR · secp256k1</text>
        <text x="0" y="8"  class="key-title"   text-anchor="middle">your keypair</text>
        <text x="0" y="26" class="key-mono"    text-anchor="middle">sk · pk</text>
      </g>

      <!-- ===== Three branches fanning out (just the curves —
           operation labels live in the subhead now). ===== -->
      <path d="M 170 168 C 240 130, 320 95, 400 80"
            class="branch-line branch--npub"
            stroke="var(--color-fsp-border)"
            fill="none" pathLength="1" marker-end="url(#wi-arrow)"/>
      <path d="M 175 190 L 400 190"
            class="branch-line branch--addr"
            stroke="var(--color-fmp-border)"
            fill="none" pathLength="1" marker-end="url(#wi-arrow)"/>
      <path d="M 170 212 C 240 250, 320 285, 400 300"
            class="branch-line branch--ipv6"
            stroke="var(--color-app-border)"
            fill="none" pathLength="1" marker-end="url(#wi-arrow)"/>

      <!-- ===== Three derivation cards (right side) ===== -->
      <!-- Each card: layer pill (left), tag + value + role (right). -->

      <!-- npub → FSP -->
      <g class="deriv deriv--npub" transform="translate(410 50)">
        <rect width="290" height="58" rx="6" class="deriv-box"
              stroke="var(--color-fsp-border)"/>
        <rect x="0" y="0" width="44" height="58" rx="6 0 0 6" class="layer-pill"
              fill="var(--color-fsp)" stroke="var(--color-fsp-border)"/>
        <text x="22" y="23" class="layer-pill-name"
              fill="var(--color-fsp-border)" text-anchor="middle">FSP</text>
        <text x="22" y="38" class="layer-pill-role"
              fill="var(--color-fsp-border)" text-anchor="middle">session</text>
        <text x="56" y="20" class="deriv-tag"
              fill="var(--color-fsp-border)">npub</text>
        <text x="56" y="36" class="deriv-mono">npub1qjk2nice…7pf2vpu</text>
        <text x="56" y="50" class="deriv-role">application identity</text>
      </g>

      <!-- node_addr → FMP — the mesh-routing one -->
      <g class="deriv deriv--addr" transform="translate(410 160)">
        <rect width="290" height="58" rx="6" class="deriv-box"
              stroke="var(--color-fmp-border)"/>
        <rect x="0" y="0" width="44" height="58" rx="6 0 0 6" class="layer-pill"
              fill="var(--color-fmp)" stroke="var(--color-fmp-border)"/>
        <text x="22" y="23" class="layer-pill-name"
              fill="var(--color-fmp-border)" text-anchor="middle">FMP</text>
        <text x="22" y="38" class="layer-pill-role"
              fill="var(--color-fmp-border)" text-anchor="middle">routing</text>
        <text x="56" y="20" class="deriv-tag"
              fill="var(--color-fmp-border)">node_addr</text>
        <text x="56" y="36" class="deriv-mono">9a4f 7b21 c8e0 5f43…</text>
        <text x="56" y="50" class="deriv-role">what the mesh sees</text>
      </g>

      <!-- Privacy badge floating off the FMP card. -->
      <g class="privacy-badge">
        <rect x="410" y="226" width="290" height="22" rx="4"
              class="privacy-bg"/>
        <text x="555" y="241" class="privacy-text" text-anchor="middle">
          routes by hash, not by pubkey
        </text>
      </g>

      <!-- IPv6 → TUN -->
      <g class="deriv deriv--ipv6" transform="translate(410 270)">
        <rect width="290" height="58" rx="6" class="deriv-box"
              stroke="var(--color-app-border)"/>
        <rect x="0" y="0" width="44" height="58" rx="6 0 0 6" class="layer-pill"
              fill="var(--color-app)" stroke="var(--color-app-border)"/>
        <text x="22" y="23" class="layer-pill-name"
              fill="var(--color-app-border)" text-anchor="middle">TUN</text>
        <text x="22" y="38" class="layer-pill-role"
              fill="var(--color-app-border)" text-anchor="middle">legacy</text>
        <text x="56" y="20" class="deriv-tag"
              fill="var(--color-app-border)">fd00::/8</text>
        <text x="56" y="36" class="deriv-mono">fd9a:4f7b:21c8:e05f::/64</text>
        <text x="56" y="50" class="deriv-role">for unmodified IPv6 apps</text>
      </g>

      <!-- Entrance is driven by `.is-step-{1..4}` classes on the
           outer .ident container (see <script> + <style> below). -->
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let timer: number | null = null

function startCycle(el: HTMLElement) {
  el.classList.remove('is-step-1', 'is-step-2', 'is-step-3', 'is-step-4')
  setTimeout(() => el.classList.add('is-step-1'), 60)    // keypair
  setTimeout(() => el.classList.add('is-step-2'), 900)   // branches
  setTimeout(() => el.classList.add('is-step-3'), 1800)  // cards
  setTimeout(() => el.classList.add('is-step-4'), 2700)  // sub-caption + privacy badge
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
  max-width: 920px;
  margin: 0 auto;
}
.ident svg { width: 100%; height: auto; display: block; }

/* ===== Keypair source ===== */
.key-hex {
  fill: var(--bg-surface);
  stroke: var(--accent-gold, #d0a040);
  stroke-width: 1.6;
}
.key-eyebrow {
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: 0.16em;
  fill: var(--text-muted);
}
.key-title {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  fill: var(--text-primary);
}
.key-mono {
  font-family: var(--font-mono);
  font-size: 10px;
  fill: var(--accent-gold, #d0a040);
  letter-spacing: 0.06em;
}
/* ===== Branches ===== */

/* ===== Derivation cards ===== */
.deriv-box {
  fill: var(--bg-surface);
  stroke-width: 1.4;
  opacity: 0.95;
}
.layer-pill {
  stroke-width: 1.4;
  opacity: 0.7;
}
.layer-pill-name {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.layer-pill-role {
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: 0.06em;
  opacity: 0.85;
}
.deriv-tag {
  font-family: var(--font-mono);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.deriv-mono {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: var(--text-primary);
}
.deriv-role {
  font-family: var(--font-mono);
  font-size: 9.5px;
  fill: var(--text-muted);
}

/* ===== Privacy badge on the FMP / node_addr card ===== */
.privacy-bg {
  fill: rgba(80, 128, 192, 0.10);
  stroke: var(--color-fmp-border);
  stroke-width: 0.8;
  stroke-dasharray: 3 3;
}
.privacy-text {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 600;
  fill: var(--color-fmp-border);
  letter-spacing: 0.02em;
}

/* ===== Step-driven animations ===== */
.key-source,
.deriv,
.privacy-badge { opacity: 0; }
.branch-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  stroke-width: 1.6;
}

.key-source,
.deriv,
.privacy-badge {
  transition: opacity 0.5s ease;
}
.branch-line {
  transition: stroke-dashoffset 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.ident.is-step-1 .key-source { opacity: 1; }
.ident.is-step-2 .branch-line { stroke-dashoffset: 0; }
.ident.is-step-3 .deriv       { opacity: 1; }
.ident.is-step-3 .deriv--npub { transition-delay: 0s; }
.ident.is-step-3 .deriv--addr { transition-delay: 0.12s; }
.ident.is-step-3 .deriv--ipv6 { transition-delay: 0.24s; }
.ident.is-step-4 .privacy-badge { opacity: 1; }
</style>
