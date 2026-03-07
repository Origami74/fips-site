<template>
  <section id="what-it-does" class="section features">
    <div class="container">
      <header class="features-header">
        <p class="section-eyebrow">What It Does</p>
        <h2 class="section-heading">The pitch in 30 seconds</h2>
      </header>

      <div class="features-list">
        <!-- Transport Agnostic -->
        <article class="feature">
          <div class="feature-visual feature-visual--transport">
            <div class="transport-grid">
              <div class="transport-group">
                <span class="tg-label">Overlay</span>
                <div class="tg-items">
                  <span class="tg-item">UDP</span>
                  <span class="tg-item">Tor</span>
                  <span class="tg-item">TCP</span>
                </div>
              </div>
              <div class="transport-group">
                <span class="tg-label">Shared Medium</span>
                <div class="tg-items">
                  <span class="tg-item">WiFi</span>
                  <span class="tg-item">Ethernet</span>
                  <span class="tg-item">BLE</span>
                </div>
              </div>
              <div class="transport-group">
                <span class="tg-label">Point-to-Point</span>
                <div class="tg-items">
                  <span class="tg-item">Serial</span>
                  <span class="tg-item">Satellite</span>
                </div>
              </div>
            </div>
            <div class="feature-visual-label">same protocol, same mesh</div>
          </div>
          <div class="feature-body">
            <div class="feature-number">01</div>
            <h3 class="feature-title">Transport Agnostic</h3>
            <p class="feature-desc">
              FIPS runs over WiFi, Ethernet, Bluetooth, UDP overlays, serial links, satellite uplinks, or Tor circuits.
              The protocol doesn't know or care what carries the packets. A single node can bridge between transports —
              peers on WiFi and peers on Ethernet join the same mesh automatically.
            </p>
          </div>
        </article>

        <!-- Works With What You Have -->
        <article class="feature feature--reverse">
          <div class="feature-visual feature-visual--compat">
            <TerminalBlock
              :lines="[
                '$ ping npub1qjk...a4f.fips',
                'PING npub1qjk...a4f.fips (fd12:ab34::1)',
                '64 bytes: seq=0 ttl=64 time=12.3 ms',
                '64 bytes: seq=1 ttl=64 time=11.8 ms',
                '',
                '$ curl http://npub1qjk...a4f.fips/',
                'HTTP/1.1 200 OK',
              ]"
              title="node-a"
            />
          </div>
          <div class="feature-body">
            <div class="feature-number">02</div>
            <h3 class="feature-title">Works With What You Have</h3>
            <p class="feature-desc">
              Existing applications work unmodified. The IPv6 adapter gives every FIPS node a <code>fd00::/8</code> address
              and a <code>.fips</code> DNS name. <code>ping npub1xxx.fips</code> just works. <code>curl</code>, SSH,
              Nostr relays — anything that speaks IPv6 runs over the mesh without code changes.
            </p>
          </div>
        </article>

        <!-- Self-Organizing Mesh -->
        <article class="feature">
          <div class="feature-visual feature-visual--mesh">
            <img
              src="/diagrams/fips-mesh-topology.svg"
              alt="Mesh network topology showing nodes connected in a self-organizing mesh with spanning tree paths highlighted"
              class="feature-diagram"
              loading="lazy"
            />
          </div>
          <div class="feature-body">
            <div class="feature-number">03</div>
            <h3 class="feature-title">Self-Organizing Mesh</h3>
            <p class="feature-desc">
              Connect to one peer and you can reach the entire network. Nodes discover each other, build a spanning tree,
              exchange bloom filters, and route traffic — all without central coordination. The network heals around
              failures and adapts to topology changes automatically.
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TerminalBlock from './TerminalBlock.vue'
</script>

<style scoped>
.features {
  background-color: var(--bg-surface-alt);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.features-header {
  margin-bottom: var(--space-xl);
}

/* Feature rows */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: center;
  padding: var(--space-xl) 0;
  border-bottom: 1px solid var(--border-subtle);
}

.feature:last-child {
  border-bottom: none;
}

.feature--reverse .feature-visual {
  order: 2;
}

.feature--reverse .feature-body {
  order: 1;
}

/* Visual panels */
.feature-visual {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background-color: var(--bg-surface);
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  position: relative;
}

.feature-visual--transport {
  border-color: var(--color-transport-border);
  background-color: var(--color-transport);
}

.feature-visual--compat {
  border-color: var(--color-tun-border);
  background-color: transparent;
  padding: 0;
}

.feature-visual--mesh {
  border-color: var(--color-fmp-border);
  background-color: var(--bg-page);
  padding: 0;
}

/* Transport grid */
.transport-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: 100%;
}

.transport-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.tg-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
  width: 110px;
  flex-shrink: 0;
  text-align: right;
}

.tg-items {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.tg-item {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 3px 8px;
  background-color: rgba(192, 96, 64, 0.15);
  border: 1px solid var(--color-transport-border);
  border-radius: 3px;
  color: var(--text-primary);
}

.feature-visual-label {
  margin-top: var(--space-md);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

/* Mesh diagram */
.feature-diagram {
  display: block;
  width: 100%;
  height: auto;
}

/* Body */
.feature-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.feature-number {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.feature-title {
  font-family: var(--font-mono);
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.feature-desc {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .feature {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .feature--reverse .feature-visual {
    order: 0;
  }

  .feature--reverse .feature-body {
    order: 0;
  }

  .feature-visual {
    min-height: 180px;
  }
}
</style>