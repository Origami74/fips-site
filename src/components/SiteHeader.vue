<template>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="header-inner container--wide container">
      <a href="#" class="logo" aria-label="FIPS home">
        <span class="logo-text">FIPS</span>
        <span class="logo-sub">fips.network</span>
      </a>

      <nav class="main-nav" :class="{ 'is-open': mobileMenuOpen }" aria-label="Site sections">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="nav-link"
          :class="{ 'is-active': activeSection === section.id }"
          :aria-current="activeSection === section.id ? 'true' : undefined"
          @click="mobileMenuOpen = false"
        >{{ section.label }}</a>
      </nav>

      <div class="header-actions">
        <a
          href="https://github.com/jmcorgan/fips"
          target="_blank"
          rel="noopener noreferrer"
          class="action-link action-link--github"
          aria-label="GitHub repository"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
        <a
          href="https://github.com/jmcorgan/fips/tree/master/docs/design"
          target="_blank"
          rel="noopener noreferrer"
          class="action-link action-link--docs"
        >Docs</a>

        <button
          class="mobile-toggle"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="toggle-bar"></span>
          <span class="toggle-bar"></span>
          <span class="toggle-bar"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollSpy } from '../composables/useScrollSpy'

const sections = [
  { id: 'what-it-does', label: 'What It Does' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'identity', label: 'Identity' },
  { id: 'get-involved', label: 'Get Involved' },
]

const { activeSection } = useScrollSpy(sections.map(s => s.id))
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: var(--space-md) 0;
  transition: background-color 0.25s ease, border-color 0.25s ease;
  border-bottom: 1px solid transparent;
}

.site-header.is-scrolled {
  background-color: rgba(13, 17, 23, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--border-subtle);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

/* Logo */
.logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
  flex-shrink: 0;
}

.logo-text {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  transition: color 0.2s;
}

.logo:hover .logo-text {
  color: var(--color-app-border);
}

.logo-sub {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-top: 1px;
}

/* Nav */
.main-nav {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  flex: 1;
  justify-content: center;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-muted);
  transition: color 0.2s;
  white-space: nowrap;
  position: relative;
  padding-bottom: 2px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--color-app-border);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.is-active {
  color: var(--text-primary);
}

.nav-link.is-active::after {
  transform: scaleX(1);
}

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-secondary);
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.action-link--github:hover {
  color: var(--text-primary);
  background-color: rgba(255,255,255,0.05);
  border-color: var(--border-subtle);
}

.action-link--docs {
  border-color: var(--border-subtle);
  color: var(--text-secondary);
}

.action-link--docs:hover {
  color: var(--text-primary);
  border-color: var(--border-medium);
  background-color: rgba(255,255,255,0.04);
}

/* Mobile toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.toggle-bar {
  display: block;
  width: 100%;
  height: 1.5px;
  background-color: var(--text-secondary);
  border-radius: 1px;
  transition: transform 0.2s, opacity 0.2s;
}

@media (max-width: 768px) {
  .main-nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    background-color: var(--bg-page);
    border-bottom: 1px solid var(--border-subtle);
    padding: var(--space-sm) var(--space-lg);
    pointer-events: none;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.2s, transform 0.2s;
  }

  .main-nav.is-open {
    pointer-events: auto;
    opacity: 1;
    transform: translateY(0);
  }

  .nav-link {
    padding: var(--space-sm) 0;
    width: 100%;
    border-bottom: 1px solid var(--border-subtle);
    font-size: 0.9375rem;
  }

  .nav-link:last-child {
    border-bottom: none;
  }

  .nav-link::after {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }

  .action-link span {
    display: none;
  }
}
</style>