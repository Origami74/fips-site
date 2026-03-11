<template>
  <section id="get-involved" class="section get-involved">
    <div class="container">
      <header class="gi-header">
        <p class="section-eyebrow">Get Involved</p>
        <h2 class="section-heading">Here's the code. Here's how to run it.</h2>
        <p class="section-subheading">Tell us what breaks.</p>
      </header>

      <div class="gi-grid">
        <a
          href="https://github.com/jmcorgan/fips/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="gi-card gi-card--run"
        >
          <div class="gi-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
            </svg>
          </div>
          <div class="gi-card-body">
            <h3 class="gi-card-title">Run It</h3>
            <p class="gi-card-desc">
              Install from GitHub releases, grab a tarball, or build from source.
              OpenWRT packages available. Docker test meshes for quick experimentation without hardware.
            </p>
            <span class="gi-card-link">View releases →</span>
          </div>
        </a>

        <a
          href="https://github.com/jmcorgan/fips/issues"
          target="_blank"
          rel="noopener noreferrer"
          class="gi-card gi-card--break"
        >
          <div class="gi-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
            </svg>
          </div>
          <div class="gi-card-body">
            <h3 class="gi-card-title">Break It</h3>
            <p class="gi-card-desc">
              Test it. Find bugs. Stress the protocol. Try to break the encryption,
              flood the mesh, disconnect nodes at the worst moment. We want to know what fails before it matters.
            </p>
            <span class="gi-card-link">Open an issue →</span>
          </div>
        </a>

        <a
          href="https://github.com/jmcorgan/fips/tree/master/docs/design"
          target="_blank"
          rel="noopener noreferrer"
          class="gi-card gi-card--read"
        >
          <div class="gi-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
            </svg>
          </div>
          <div class="gi-card-body">
            <h3 class="gi-card-title">Read the Specs</h3>
            <p class="gi-card-desc">
              The design docs cover everything: protocol layers, packet formats, cryptography, routing algorithms.
              Start with the architecture overview, then dive into specific layers. 10+ specification documents.
            </p>
            <span class="gi-card-link">Browse docs →</span>
          </div>
        </a>

        <a
          href="https://primal.net/e/nevent1qqsvd3nzk5p92fzp9z7p34m50039dwee0aemrvk9cl2jpng3kawsz0q6wuh7w"
          target="_blank"
          rel="noopener noreferrer"
          class="gi-card gi-card--talk"
        >
          <div class="gi-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
            </svg>
          </div>
          <div class="gi-card-body">
            <h3 class="gi-card-title">Talk About It</h3>
            <p class="gi-card-desc">
              Discussion happens on Nostr. Follow the contributors and check the relevant threads.
            </p>
            <span class="gi-card-link">Join the conversation →</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.get-involved {
  background-color: var(--bg-page);
}

.gi-header {
  margin-bottom: var(--space-xl);
}

.gi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
}

.gi-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg);
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  transition: border-color 0.2s, background-color 0.2s;
  cursor: pointer;
}

.gi-card:hover {
  background-color: rgba(255,255,255,0.02);
}

.gi-card--run:hover  { border-color: var(--color-app-border); }
.gi-card--break:hover { border-color: var(--color-transport-border); }
.gi-card--read:hover  { border-color: var(--color-fmp-border); }
.gi-card--talk:hover  { border-color: var(--color-fsp-border); }

.gi-card-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.gi-card--run  .gi-card-icon { background-color: var(--color-app);       color: var(--color-app-border); }
.gi-card--break .gi-card-icon { background-color: var(--color-transport); color: var(--color-transport-border); }
.gi-card--read  .gi-card-icon { background-color: var(--color-fmp);       color: var(--color-fmp-border); }
.gi-card--talk  .gi-card-icon { background-color: var(--color-fsp);       color: var(--color-fsp-border); }

.gi-card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  flex: 1;
}

.gi-card-title {
  font-family: var(--font-mono);
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.gi-card-desc {
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin: 0;
  flex: 1;
}

.gi-card-link {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition: color 0.2s;
  margin-top: auto;
}

.gi-card:hover .gi-card-link {
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .gi-grid {
    grid-template-columns: 1fr;
  }
}
</style>