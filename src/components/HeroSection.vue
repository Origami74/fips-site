<template>
  <section class="hero">
    <div class="hero-inner container--wide container">
      <div class="hero-text">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>mesh protocol</span>
        </div>

        <h1 class="hero-title">
          <span class="hero-title-fips">FIPS</span>
          <span class="hero-title-full">Free Internetworking<br>Peering System</span>
        </h1>

        <p class="hero-tagline">
          A self-organizing encrypted mesh that works over anything you can send packets through.
        </p>

        <ul class="hero-props">
          <li>
            <span class="prop-icon prop-icon--transport">⬡</span>
            Transport agnostic — WiFi, Ethernet, Bluetooth, UDP, Tor, serial
          </li>
          <li>
            <span class="prop-icon prop-icon--compat">⬡</span>
            Existing apps work unmodified via IPv6 TUN adapter
          </li>
          <li>
            <span class="prop-icon prop-icon--mesh">⬡</span>
            Self-organizing — connect to one peer, reach the mesh
          </li>
          <li>
            <span class="prop-icon prop-icon--identity">⬡</span>
            Nostr keypair is your address — no registrars, no authorities
          </li>
        </ul>

        <div class="hero-ctas">
          <a
            href="https://github.com/fips-network/fips/tree/master/docs/design"
            target="_blank"
            rel="noopener noreferrer"
            class="cta cta--primary"
          >Read the docs</a>
          <a
            href="https://github.com/fips-network/fips"
            target="_blank"
            rel="noopener noreferrer"
            class="cta cta--secondary"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Get started
          </a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="diagram-frame">
          <img
            src="/diagrams/fips-node-architecture-hero.svg"
            alt="FIPS node architecture: layered protocol stack showing Application Interface, IPv6 Adapter, FSP Session Protocol, FMP Mesh Protocol, and Transport layers with Overlay, Shared Medium, and Point-to-Point transport categories"
            class="hero-diagram"
            loading="eager"
          />
        </div>
      </div>
    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
      <span>scroll</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: var(--space-xl);
  position: relative;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  align-items: center;
}

/* Text side */
.hero-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-app-border);
  box-shadow: 0 0 6px var(--color-app-border);
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin: 0;
}

.hero-title-fips {
  font-family: var(--font-mono);
  font-size: 5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--text-primary);
}

.hero-title-full {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.01em;
  line-height: 1.5;
}

.hero-tagline {
  font-size: 1.1875rem;
  line-height: 1.55;
  color: var(--text-secondary);
  max-width: 480px;
  margin: 0;
}

/* Key props list */
.hero-props {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  border-left: 1px solid var(--border-subtle);
  padding-left: var(--space-md);
}

.hero-props li {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.prop-icon {
  font-size: 0.625rem;
  flex-shrink: 0;
}

.prop-icon--transport { color: var(--color-transport-border); }
.prop-icon--compat    { color: var(--color-tun-border); }
.prop-icon--mesh      { color: var(--color-fmp-border); }
.prop-icon--identity  { color: var(--color-fsp-border); }

/* CTAs */
.hero-ctas {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cta--primary {
  background-color: var(--color-app-border);
  color: #0a1a10;
}

.cta--primary:hover {
  background-color: #52c070;
  color: #0a1a10;
}

.cta--secondary {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-medium);
}

.cta--secondary:hover {
  background-color: rgba(255,255,255,0.04);
  border-color: var(--text-secondary);
}

/* Visual side */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.diagram-frame {
  width: 100%;
  max-width: 680px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background-color: var(--bg-surface);
}

.hero-diagram {
  display: block;
  width: 100%;
  height: auto;
}

/* Scroll hint */
.hero-scroll-hint {
  position: absolute;
  bottom: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0.6;
}

@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .hero-title-fips {
    font-size: 3.5rem;
  }

  .hero-visual {
    order: -1;
  }

  .diagram-frame {
    max-width: 100%;
  }

  .hero-scroll-hint {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title-fips {
    font-size: 2.75rem;
  }

  .hero-tagline {
    font-size: 1rem;
  }

  .hero-ctas {
    flex-direction: column;
  }

  .cta {
    justify-content: center;
  }
}
</style>