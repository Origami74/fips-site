<template>
  <section id="identity" class="section identity">
    <div class="container">
      <div class="identity-layout">
        <div class="identity-text">
          <p class="section-eyebrow">Identity</p>
          <h2 class="section-heading">Your keypair is your address</h2>

          <p class="identity-intro">
            Your node identity is a Nostr keypair (secp256k1). From that single keypair,
            three things are deterministically derived — no registration, no authority, no coordination.
          </p>

          <div class="derivations">
            <div class="derivation derivation--npub">
              <div class="derivation-header">
                <span class="derivation-tag">npub</span>
                <span class="derivation-label">Application identity</span>
              </div>
              <p class="derivation-desc">
                The human-readable identifier you share with others. Used by the native API for
                addressed datagrams.
              </p>
            </div>

            <div class="derivation derivation--addr">
              <div class="derivation-header">
                <span class="derivation-tag">node_addr</span>
                <span class="derivation-label">Routing identifier</span>
              </div>
              <p class="derivation-desc">
                SHA-256 hash of the public key. Opaque to the mesh — nodes route by this address
                without knowing who you are.
              </p>
            </div>

            <div class="derivation derivation--ipv6">
              <div class="derivation-header">
                <span class="derivation-tag">fd00::/8</span>
                <span class="derivation-label">IPv6 address</span>
              </div>
              <p class="derivation-desc">
                Deterministically derived for legacy app compatibility. Lets unmodified applications
                reach any node by IPv6 address.
              </p>
            </div>
          </div>

          <p class="identity-footer">
            Generate a key. Join the mesh. That's it.
          </p>
        </div>

        <div class="identity-diagram">
          <div class="diagram-frame">
            <img
              src="/diagrams/fips-identity-derivation.svg"
              alt="Identity derivation diagram: secp256k1 keypair branches to npub (application identity), node_addr (SHA-256 routing hash), and fd00::/8 IPv6 address"
              class="identity-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.identity {
  background-color: var(--bg-surface-alt);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.identity-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  align-items: center;
}

/* Text */
.identity-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.identity-intro {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

/* Derivations */
.derivations {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.derivation {
  padding: var(--space-md);
  border-radius: 6px;
  border-left: 3px solid transparent;
}

.derivation--npub {
  background-color: var(--color-app);
  border-left-color: var(--color-app-border);
}

.derivation--addr {
  background-color: var(--color-fmp);
  border-left-color: var(--color-fmp-border);
}

.derivation--ipv6 {
  background-color: var(--color-tun);
  border-left-color: var(--color-tun-border);
}

.derivation-header {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.derivation-tag {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
}

.derivation-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.derivation-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

.identity-footer {
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  color: var(--text-muted);
  padding-top: var(--space-md);
  border-top: 1px solid var(--border-subtle);
  margin: 0;
}

/* Diagram */
.identity-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
}

.diagram-frame {
  width: 100%;
  max-width: 420px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background-color: var(--bg-surface);
}

.identity-img {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 900px) {
  .identity-layout {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }

  .identity-diagram {
    order: -1;
  }

  .diagram-frame {
    max-width: 100%;
  }
}
</style>