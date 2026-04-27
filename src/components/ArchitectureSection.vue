<template>
  <section id="how-it-works" class="section architecture">
    <div class="container">
      <header class="arch-header">
        <p class="section-eyebrow">How It Works</p>
        <h2 class="section-heading">Architecture at a glance</h2>
        <p class="section-subheading">
          Four layers. Each one does exactly one job. Each one is independently replaceable.
        </p>
      </header>

      <div class="stack-wrapper">
        <div class="stack">
          <a
            v-for="layer in layers"
            :key="layer.id"
            :href="layer.link"
            target="_blank"
            rel="noopener noreferrer"
            class="layer"
            :class="`layer--${layer.id}`"
          >
            <div class="layer-left">
              <div class="layer-indicator" :style="{ backgroundColor: layer.borderColor }"></div>
              <div class="layer-info">
                <span class="layer-name">{{ layer.name }}</span>
                <span class="layer-desc">{{ layer.description }}</span>
              </div>
            </div>
            <div class="layer-right">
              <span class="layer-spec">spec →</span>
            </div>
          </a>
        </div>

        <div class="stack-annotations">
          <div class="annotation annotation--e2e">
            <div class="annotation-line"></div>
            <span class="annotation-label">end-to-end encrypted (Noise XK)</span>
          </div>
          <div class="annotation annotation--hop">
            <div class="annotation-line"></div>
            <span class="annotation-label">hop-by-hop encrypted (Noise IK)</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const layers = [
  {
    id: 'app',
    name: 'Application Interface',
    description: 'Native API (npub-addressed datagrams) or IPv6 TUN adapter for legacy apps',
    borderColor: 'var(--color-app-border)',
    link: 'https://github.com/jmcorgan/fips/tree/master/docs/design/fips-ipv6-adapter.md',
  },
  {
    id: 'fsp',
    name: 'FSP — Session Protocol',
    description: 'End-to-end Noise XK encryption between any two nodes',
    borderColor: 'var(--color-fsp-border)',
    link: 'https://github.com/jmcorgan/fips/tree/master/docs/design/fips-session-layer.md',
  },
  {
    id: 'fmp',
    name: 'FMP — Mesh Protocol',
    description: 'Hop-by-hop Noise IK encryption, spanning tree, bloom filters, routing',
    borderColor: 'var(--color-fmp-border)',
    link: 'https://github.com/jmcorgan/fips/tree/master/docs/design/fips-mesh-layer.md',
  },
  {
    id: 'transport',
    name: 'Transport',
    description: 'Pluggable: UDP, Ethernet, WiFi, Bluetooth, Tor, Serial, ...',
    borderColor: 'var(--color-transport-border)',
    link: 'https://github.com/jmcorgan/fips/tree/master/docs/design/fips-transport-layer.md',
  },
]
</script>

<style scoped>
.architecture {
  background-color: var(--bg-page);
}

.arch-header {
  margin-bottom: var(--space-xl);
}

/* Stack */
.stack-wrapper {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-lg);
  max-width: 760px;
  margin: 0 auto var(--space-2xl);
  align-items: start;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.layer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  border-radius: 6px;
  border: 1px solid transparent;
  transition: border-color 0.2s, background-color 0.2s, transform 0.15s;
  cursor: pointer;
}

.layer--app {
  background-color: var(--color-app);
  border-color: rgba(64, 160, 96, 0.3);
}
.layer--app:hover {
  border-color: var(--color-app-border);
  transform: translateX(3px);
}

.layer--fsp {
  background-color: var(--color-fsp);
  border-color: rgba(128, 96, 192, 0.3);
}
.layer--fsp:hover {
  border-color: var(--color-fsp-border);
  transform: translateX(3px);
}

.layer--fmp {
  background-color: var(--color-fmp);
  border-color: rgba(80, 128, 192, 0.3);
}
.layer--fmp:hover {
  border-color: var(--color-fmp-border);
  transform: translateX(3px);
}

.layer--transport {
  background-color: var(--color-transport);
  border-color: rgba(192, 96, 64, 0.3);
}
.layer--transport:hover {
  border-color: var(--color-transport-border);
  transform: translateX(3px);
}

.layer-left {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex: 1;
  min-width: 0;
}

.layer-indicator {
  width: 3px;
  height: 36px;
  border-radius: 2px;
  flex-shrink: 0;
  opacity: 0.8;
}

.layer-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.layer-name {
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.layer-desc {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.layer-right {
  flex-shrink: 0;
  margin-left: var(--space-md);
}

.layer-spec {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: color 0.2s;
}

.layer:hover .layer-spec {
  color: var(--text-primary);
}

/* Annotations */
.stack-annotations {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;
  height: 100%;
  gap: var(--space-sm);
}

.annotation {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.annotation-line {
  width: 2px;
  border-radius: 1px;
}

.annotation--e2e .annotation-line {
  background-color: var(--color-fsp-border);
  height: 80px;
}

.annotation--hop .annotation-line {
  background-color: var(--color-fmp-border);
  height: 56px;
}

.annotation-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
  white-space: nowrap;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .stack-wrapper {
    grid-template-columns: 1fr;
  }

  .stack-annotations {
    display: none;
  }

  .layer-desc {
    white-space: normal;
  }
}
</style>