<template>
  <section id="learn-discover" class="section learn-discover">
    <div class="container">
      <header class="ld-header">
        <p class="section-eyebrow">Learn &amp; Discover</p>
        <h2 class="section-heading">Start here.</h2>
      </header>

      <div class="ld-cards">
        <!-- Learn card -->
        <div class="ld-card ld-card--learn">
          <div class="ld-card-top">
            <div class="ld-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
              </svg>
            </div>
            <h3 class="ld-card-title">Learn</h3>
            <p class="ld-card-desc">Understand the protocol from first principles — the layer stack, cryptography, routing, and packet formats.</p>
          </div>

          <ul class="ld-links">
            <li>
              <a href="https://github.com/jmcorgan/fips/blob/master/docs/design/architecture.md" target="_blank" rel="noopener noreferrer" class="ld-link">
                <span>Architecture overview</span>
                <span class="ld-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/jmcorgan/fips/tree/master/docs/design" target="_blank" rel="noopener noreferrer" class="ld-link">
                <span>Protocol specifications</span>
                <span class="ld-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/jmcorgan/fips" target="_blank" rel="noopener noreferrer" class="ld-link">
                <span>Read the source</span>
                <span class="ld-link-arrow">→</span>
              </a>
            </li>
          </ul>

          <a href="https://learn.fips.network" target="_blank" rel="noopener noreferrer" class="ld-cta">
            Start learning →
          </a>
        </div>

        <!-- Discover card -->
        <div class="ld-card ld-card--discover">
          <div class="ld-card-top">
            <div class="ld-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/>
              </svg>
            </div>
            <h3 class="ld-card-title">Discover Peers</h3>
            <p class="ld-card-desc">Run a node, find peers via Nostr, and join a mesh that no one controls. Your keypair is your address.</p>
          </div>

          <ul class="ld-links">
            <li>
              <a href="https://github.com/jmcorgan/fips/releases" target="_blank" rel="noopener noreferrer" class="ld-link">
                <span>Run a node</span>
                <span class="ld-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="https://primal.net/e/nevent1qqsvd3nzk5p92fzp9z7p34m50039dwee0aemrvk9cl2jpng3kawsz0q6wuh7w" target="_blank" rel="noopener noreferrer" class="ld-link">
                <span>Find peers on Nostr</span>
                <span class="ld-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/jmcorgan/fips/issues" target="_blank" rel="noopener noreferrer" class="ld-link">
                <span>Report what breaks</span>
                <span class="ld-link-arrow">→</span>
              </a>
            </li>
          </ul>

          <a href="https://join.fips.network" target="_blank" rel="noopener noreferrer" class="ld-cta">
            Join the network →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.learn-discover {
  background-color: var(--bg-page);
}

.ld-header {
  margin-bottom: var(--space-xl);
}

/* Cards */
.ld-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.ld-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-lg);
  border-radius: 10px;
  border: 1px solid var(--border-subtle);
  background-color: var(--bg-surface);
  transition: border-color 0.2s;
}

.ld-card--learn {
  border-top: 3px solid var(--color-fmp-border);
}

.ld-card--discover {
  border-top: 3px solid var(--color-app-border);
}

/* Card top */
.ld-card-top {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.ld-card-icon {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ld-card--learn   .ld-card-icon { background-color: var(--color-fmp); color: var(--color-fmp-border); }
.ld-card--discover .ld-card-icon { background-color: var(--color-app); color: var(--color-app-border); }

.ld-card-title {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.ld-card-desc {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

/* Link list */
.ld-links {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.ld-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--text-secondary);
  padding: 9px var(--space-sm);
  border-radius: 6px;
  border: 1px solid transparent;
  transition: color 0.15s, border-color 0.15s, background-color 0.15s;
}

.ld-link:hover {
  color: var(--text-primary);
  background-color: rgba(255,255,255,0.04);
}

.ld-card--learn   .ld-link:hover { border-color: var(--color-fmp-border); }
.ld-card--discover .ld-link:hover { border-color: var(--color-app-border); }

.ld-link-arrow {
  color: var(--text-muted);
  opacity: 0;
  transition: opacity 0.15s;
}

.ld-link:hover .ld-link-arrow { opacity: 1; }

/* CTA button */
.ld-cta {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 6px;
  border: 1px solid;
  transition: all 0.2s;
  align-self: flex-start;
}

.ld-card--learn   .ld-cta { color: var(--color-fmp-border); border-color: var(--color-fmp-border); }
.ld-card--learn   .ld-cta:hover { background-color: var(--color-fmp); }
.ld-card--discover .ld-cta { color: var(--color-app-border); border-color: var(--color-app-border); }
.ld-card--discover .ld-cta:hover { background-color: var(--color-app); }

@media (max-width: 720px) {
  .ld-cards {
    grid-template-columns: 1fr;
  }
}
</style>
