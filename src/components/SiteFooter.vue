<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-logo">FIPS</span>
          <span class="footer-domain">fips.network</span>
        </div>

        <nav class="footer-nav" aria-label="Footer links">
          <a href="https://github.com/jmcorgan/fips" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://github.com/jmcorgan/fips/tree/master/docs" target="_blank" rel="noopener noreferrer">Design Docs</a>
          <a href="https://primal.net/e/nevent1qqsvd3nzk5p92fzp9z7p34m50039dwee0aemrvk9cl2jpng3kawsz0q6wuh7w" target="_blank" rel="noopener noreferrer">Discussion</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <span class="footer-license">MIT License</span>
        <span class="footer-sep" aria-hidden="true">·</span>
        <span class="footer-nostr">Identity on Nostr</span>
        <span class="footer-sep" aria-hidden="true">·</span>
        <span class="footer-note">No tracking. No analytics. No cookies.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border-subtle);
  background-color: var(--bg-surface);
  padding: var(--space-xl) 0 var(--space-lg);
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--border-subtle);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-logo {
  font-family: var(--font-mono);
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
}

.footer-domain {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.footer-nav {
  display: flex;
  gap: var(--space-lg);
}

.footer-nav a {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.footer-license,
.footer-nostr,
.footer-note {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
}

.footer-sep {
  color: var(--border-medium);
  font-size: 0.75rem;
}

@media (max-width: 600px) {
  .footer-top {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
  }

  .footer-nav {
    flex-wrap: wrap;
    gap: var(--space-md);
  }
}
</style>