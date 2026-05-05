<template>
  <!-- The pitch, split into full-viewport "Why" frames. Each frame holds
       a single idea: a short headline, a one-liner, and one supporting
       visual. Lighter text than the previous prose-heavy layout. -->
  <section id="what-it-does" class="why-section">
    <article class="why-frame">
      <div class="container why-frame__inner">
        <p class="why-eyebrow">Why · 01</p>
        <h2 class="why-heading">Transport agnostic</h2>
        <p class="why-subhead">
          End-to-end encrypted between peers. Re-encrypted at every hop.
          Bluetooth, Ethernet, UDP, Tor, Serial — same protocol, same mesh.
        </p>
        <TransportFlow class="why-diagram" />
      </div>
    </article>

    <article class="why-frame">
      <div class="container why-frame__inner">
        <p class="why-eyebrow">Why · 02</p>
        <h2 class="why-heading">Same apps, new plumbing.</h2>
        <p class="why-subhead">
          If it works over IP today, it works over FIPS — your stack
          doesn't notice.
        </p>
        <WorksFlow class="why-diagram why-diagram--works" />
      </div>
    </article>

    <article class="why-frame">
      <div class="container why-frame__inner">
        <p class="why-eyebrow">Why · 03</p>
        <h2 class="why-heading">Self-organizing</h2>
        <p class="why-subhead">
          No coordinator, no setup. The mesh elects its own root, merges
          with neighbours on contact, and reroutes around damage on its
          own.
        </p>
        <SelfOrganizingFlow class="why-diagram why-diagram--mesh" />
      </div>
    </article>

    <article class="why-frame">
      <div class="container why-frame__inner">
        <p class="why-eyebrow">Why · 04</p>
        <h2 class="why-heading">One keypair. Three identifiers.</h2>
        <p class="why-subhead">
          One Nostr secp256k1 keypair, generated locally — no
          registration, no authority. <code>npub</code> for sessions,
          <code>node_addr</code> (a SHA-256 hash) for mesh routing,
          <code>fd00::/8</code> IPv6 for unmodified apps.
        </p>
        <WhyIdentity class="why-diagram why-diagram--ident" />
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import TransportFlow from './TransportFlow.vue'
import WorksFlow from './WorksFlow.vue'
import SelfOrganizingFlow from './SelfOrganizingFlow.vue'
import WhyIdentity from './WhyIdentity.vue'
</script>

<style scoped>
/* Each frame is a near-full-viewport block with content centred. The
 * tall padding + min-height creates the "scroll one full screen per
 * idea" feel without a hard scroll-snap. */
.why-frame {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-2xl) 0;
  border-bottom: 1px solid var(--border-subtle);
  background-color: var(--bg-surface-alt);
}
.why-frame:nth-child(even) {
  background-color: var(--bg-page);
}

.why-frame__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-md);
}

.why-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-fmp-border);
  margin: 0;
}

.why-heading {
  font-family: var(--font-mono);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
  color: var(--text-primary);
}

.why-subhead {
  font-size: 1.0625rem;
  line-height: 1.55;
  color: var(--text-secondary);
  max-width: 640px;
  margin: 0;
}
.why-subhead code {
  font-family: var(--font-mono);
  font-size: 0.95em;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.1em 0.4em;
  border-radius: 4px;
}

.why-diagram {
  width: 100%;
  margin-top: var(--space-lg);
}
.why-diagram--works {
  max-width: 680px;
}
.why-diagram--mesh {
  max-width: 920px;
}
.why-diagram--ident {
  max-width: 920px;
}

/* On short / small viewports, drop the full-height requirement so the
 * frames stack naturally without forcing huge empty space. */
@media (max-height: 720px), (max-width: 768px) {
  .why-frame {
    min-height: auto;
    padding: var(--space-xl) 0;
  }
}
</style>
