<template>
  <section class="hero">
    <HeroBackgroundMesh />
    <div class="hero-inner container--wide container">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="hero-title-fips">FIPS</span>
          <span class="hero-title-full">Free Internetworking Peering System</span>
        </h1>

        <p class="hero-tagline">
          A self-organizing encrypted mesh that works over any medium that can transfer packets.
        </p>

        <div class="hero-ctas">
          <a
            href="https://learn.fips.network"
            target="_blank"
            rel="noopener noreferrer"
            class="cta cta--ghost cta--learn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
            </svg>
            Learn
          </a>
          <a
            href="https://github.com/jmcorgan/fips/tree/master/docs"
            target="_blank"
            rel="noopener noreferrer"
            class="cta cta--ghost cta--docs"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            Docs
          </a>
          <a
            href="https://join.fips.network"
            target="_blank"
            rel="noopener noreferrer"
            class="cta cta--ghost cta--discover"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75A1.125 1.125 0 0 0 6 4.875v15.75a1.125 1.125 0 0 0 1.5 1.06l6-3 6 3a1.125 1.125 0 0 0 1.5-1.06V4.875A1.125 1.125 0 0 0 19.5 3.75h-12Z"/>
            </svg>
            Discover peers
          </a>
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

<script setup lang="ts">
import HeroBackgroundMesh from './HeroBackgroundMesh.vue'
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: var(--space-xl);
  position: relative;
  overflow: hidden;
}

.hero-inner {
  display: flex;
  justify-content: center;
  /* Sit above the animated mesh canvas. */
  position: relative;
  z-index: 1;
}

/* Text side — single centered column now that the diagram is gone. */
.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-lg);
  max-width: 680px;
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin: 0;
}

.hero-title-fips {
  font-family: var(--font-mono);
  font-size: 5.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: #f5f7fa;
}

.hero-title-full {
  font-family: var(--font-mono);
  font-size: 1.0625rem;
  font-weight: 400;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
  line-height: 1.4;
  white-space: nowrap;
}

.hero-tagline {
  font-size: 1.25rem;
  line-height: 1.5;
  color: var(--text-primary);
  max-width: 560px;
  margin: 0;
}

/* CTAs — three equal-weight ghost buttons. Each has its own accent colour
 * surfaced through the icon and the bottom-edge underline on hover. */
.hero-ctas {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--space-sm);
}

.cta {
  --accent: var(--text-primary);
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 12px 22px;
  border-radius: 8px;
  border: 1px solid var(--border-medium);
  background-color: rgba(255, 255, 255, 0.02);
  color: var(--text-primary);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.cta svg {
  color: var(--accent);
  transition: transform 0.2s ease;
}

.cta:hover {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: var(--accent);
  color: #fff;
}

.cta:hover svg {
  transform: translateY(-1px);
}

.cta--learn { --accent: var(--color-fmp-border); }
.cta--docs { --accent: var(--accent-gold); }
.cta--discover { --accent: var(--color-app-border); }

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
  .hero-title-fips {
    font-size: 3.5rem;
  }

  .hero-title-full {
    /* Allow the subtitle to wrap on narrow viewports rather than overflowing. */
    white-space: normal;
    font-size: 0.9375rem;
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