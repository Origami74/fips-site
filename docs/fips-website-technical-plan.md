# FIPS Website — Technical Plan

**Companion to**: [fips-website-functional-plan.md](fips-website-functional-plan.md)  
**Stack**: Vue 3 + TypeScript, static site generation via Vite SSG  
**Output**: Static HTML/CSS/JS deployed to fips.network

---

## Project Structure

```
website/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   ├── favicon.svg
│   └── diagrams/                    # SVGs copied/adapted from docs/design/diagrams/
│       ├── fips-node-architecture.svg
│       ├── fips-mesh-topology.svg
│       ├── fips-protocol-stack.svg
│       ├── fips-architecture-overview.svg
│       └── fips-identity-derivation.svg
├── src/
│   ├── main.ts                      # App entry point
│   ├── App.vue                      # Root component, section layout
│   ├── style/
│   │   ├── variables.css            # Design tokens (colors, spacing, fonts)
│   │   ├── base.css                 # Reset, typography, global styles
│   │   └── utilities.css            # Responsive helpers
│   ├── components/
│   │   ├── SiteHeader.vue           # Sticky nav with section anchors + external links
│   │   ├── HeroSection.vue          # Hero: title, tagline, node architecture diagram, CTAs
│   │   ├── FeatureBlocks.vue        # "What It Does" — three feature cards
│   │   ├── ArchitectureSection.vue  # "How It Works" — protocol stack + overview diagram
│   │   ├── IdentitySection.vue      # Identity model + derivation diagram
│   │   ├── GetInvolved.vue          # Run it / Break it / Read the specs / Talk about it
│   │   ├── SiteFooter.vue           # License, links, attribution
│   │   ├── DiagramViewer.vue        # SVG display component with responsive scaling
│   │   └── TerminalBlock.vue        # Styled terminal/code snippet component
│   └── composables/
│       └── useScrollSpy.ts          # Active section tracking for nav highlighting
└── env.d.ts                         # Vite client type declarations
```

---

## Dependencies

### Runtime

| Package | Purpose | Version Strategy |
|---------|---------|-----------------|
| `vue` | UI framework | `^3.5` |

No other runtime dependencies. No UI component library. No CSS framework. The site is simple enough that custom CSS is cleaner and lighter.

### Dev / Build

| Package | Purpose |
|---------|---------|
| `vite` | Build tool |
| `@vitejs/plugin-vue` | Vue SFC support |
| `typescript` | Type checking |
| `vue-tsc` | Vue template type checking |
| `vite-ssg` | Static site generation (pre-renders to HTML at build time) |

### Explicitly NOT included

- No Tailwind / UnoCSS — the design system is small enough for hand-written CSS
- No router — single page with anchor navigation
- No state management — no app state to manage
- No analytics — no tracking
- No icon library — minimal iconography, inline SVG where needed

---

## Design Token System

All visual constants defined in CSS custom properties, derived from the existing SVG diagram palette:

```css
/* src/style/variables.css */

:root {
  /* Backgrounds */
  --bg-page: #0d1117;
  --bg-surface: #151525;
  --bg-surface-alt: #151520;

  /* Layer colors (from protocol diagrams) */
  --color-app: #1a3a2a;
  --color-app-border: #40a060;
  --color-tun: #1a2a3a;
  --color-tun-border: #4080c0;
  --color-fsp: #2a2040;
  --color-fsp-border: #8060c0;
  --color-fmp: #2e3a5e;
  --color-fmp-border: #5080c0;
  --color-transport: #2a1a1a;
  --color-transport-border: #c06040;

  /* Text */
  --text-primary: #e0e0e0;
  --text-secondary: #909090;
  --text-muted: #606080;

  /* Borders */
  --border-subtle: #404060;
  --border-medium: #505070;

  /* Accent */
  --accent-gold: #d0a040;

  /* Typography */
  --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;

  /* Layout */
  --content-max-width: 960px;
  --content-wide-max-width: 1200px;
}
```

---

## Component Specifications

### `SiteHeader.vue`

Sticky top navigation bar.

**Structure:**
- Left: FIPS wordmark (text, not image)
- Center/Right: Section anchor links — What It Does | How It Works | Identity | Get Involved
- Far right: GitHub icon link, Docs link

**Behavior:**
- Uses `useScrollSpy` composable to highlight the active section
- Collapses to hamburger on mobile (simple CSS-only toggle, no JS library)
- Background becomes semi-transparent with backdrop blur on scroll

**Props:** None (static content)

### `HeroSection.vue`

**Structure:**
```
┌─────────────────────────────────────────────┐
│                    FIPS                       │
│    Free Internetworking Peering System        │
│                                               │
│  A self-organizing encrypted mesh that works  │
│  over anything you can send packets through.  │
│                                               │
│  [Read the docs]    [Get started]             │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │     fips-node-architecture.svg          │  │
│  │     (interactive hover states           │  │
│  │      on transport categories)           │  │
│  └─────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**Diagram interaction:** On desktop, hovering over a transport category (Overlay / Shared Medium / Point-to-Point) subtly highlights that group. Pure CSS — no JS interaction needed. Achieved by embedding the SVG inline and targeting the `.cat` rect groups with CSS `:hover`.

**CTAs:**
- "Read the docs" → links to the design docs on GitHub (`docs/design/README.md`)
- "Get started" → links to the repo README or install guide

### `FeatureBlocks.vue`

Three cards in a row (stacked on mobile).

Each card:
```
┌──────────────────────┐
│  [visual/icon]        │
│                       │
│  Transport Agnostic   │
│                       │
│  2-3 sentence desc    │
│  from functional plan │
└──────────────────────┘
```

**Card 1 — Transport Agnostic**
- Visual: Extracted transport row from node architecture SVG (the three category groups)
- Border accent: `--color-transport-border` (#c06040)

**Card 2 — Works With What You Have**
- Visual: `TerminalBlock` component showing:
  ```
  $ ping npub1qjk...a4f.fips
  PING npub1qjk...a4f.fips (fd12:ab34::1): 56 data bytes
  64 bytes: seq=0 ttl=64 time=12.3 ms
  64 bytes: seq=1 ttl=64 time=11.8 ms
  ```
- Border accent: `--color-tun-border` (#4080c0)

**Card 3 — Self-Organizing Mesh**
- Visual: Simplified mesh topology diagram (adapted from `fips-mesh-topology.svg`, possibly a smaller version showing 5-6 nodes)
- Border accent: `--color-fmp-border` (#5080c0)

### `ArchitectureSection.vue`

**Layout:** Two sub-sections stacked vertically.

**Sub-section A: Protocol Stack**

Vertical stack of layer cards, each with:
- Layer color accent (left border matching the protocol layer color)
- Layer name + one-line description
- "Read spec →" link to the relevant design doc

Inspired by `fips-protocol-stack.svg` but rendered as HTML for interactivity and accessibility.

```
┌─ Application Interface ──────────────────────────┐
│  Native API (npub datagrams) or IPv6 TUN adapter  │
│                                          Read spec → │
├─ FSP (Session Protocol) ─────────────────────────┤
│  End-to-end Noise XK encryption                    │
│                                          Read spec → │
├─ FMP (Mesh Protocol) ────────────────────────────┤
│  Hop-by-hop encryption, spanning tree, routing     │
│                                          Read spec → │
├─ Transport ──────────────────────────────────────┤
│  Pluggable: UDP, Ethernet, WiFi, BT, Tor, Serial  │
│                                          Read spec → │
└──────────────────────────────────────────────────┘
```

**Sub-section B: Packet Flow**

The `fips-architecture-overview.svg` diagram showing a packet traversing nodes A→B→C→D across different transports. Displayed at full width with a brief caption explaining the dual-layer encryption.

### `IdentitySection.vue`

**Layout:** Two-column on desktop (text left, diagram right), stacked on mobile.

- Left: 3-4 short paragraphs explaining the identity model (from functional plan Section 4)
- Right: `fips-identity-derivation.svg` diagram

### `GetInvolved.vue`

**Layout:** 2×2 grid of action cards (stacked on mobile).

| Card | Content |
|------|---------|
| **Run it** | Install instructions summary, links to GitHub releases, tarball, OpenWRT packages, Docker test mesh |
| **Break it** | "Test it. Find bugs. Stress the protocol." Link to issue tracker |
| **Read the specs** | Link to design docs with reading order. Mention the 10+ specification documents |
| **Talk about it** | Nostr npubs of contributors, link to Citadel Dispatch episode |

Each card has a subtle border accent and a primary action link.

### `TerminalBlock.vue`

Reusable component for displaying terminal/code snippets.

**Props:**
```typescript
interface Props {
  lines: string[]        // Lines of terminal output
  prompt?: string        // Default: '$ '
  title?: string         // Optional window title bar text
}
```

**Styling:**
- Dark background (`--bg-surface`)
- Monospace font
- Optional fake window chrome (three dots) for visual context
- Subtle green tint on prompt character
- No syntax highlighting library — just CSS classes for prompt vs output

### `DiagramViewer.vue`

Wrapper for SVG diagrams with responsive behavior.

**Props:**
```typescript
interface Props {
  src: string            // Path to SVG in public/diagrams/
  alt: string            // Accessible description
  maxWidth?: string      // CSS max-width (default: '100%')
  caption?: string       // Optional caption below diagram
}
```

**Behavior:**
- Loads SVG via `<img>` tag for simple cases
- For interactive diagrams (hero), uses inline SVG via `v-html` with the SVG content imported as a string
- On mobile: horizontally scrollable container if the diagram exceeds viewport width
- Lazy loading via `loading="lazy"` attribute

### `useScrollSpy.ts`

Composable for tracking which section is currently in view.

**Interface:**
```typescript
function useScrollSpy(sectionIds: string[]): {
  activeSection: Ref<string>
}
```

**Implementation:**
- Uses `IntersectionObserver` with a threshold
- Updates `activeSection` ref as sections enter/leave the viewport
- Header nav highlights the corresponding anchor

---

## SVG Handling Strategy

The existing diagrams in `docs/design/diagrams/` are well-crafted SVGs with consistent styling. Strategy for the website:

1. **Copy, don't modify originals.** Diagrams are copied to `website/public/diagrams/`. Any website-specific adaptations are made on the copies.

2. **Hero diagram (node architecture):** Inline SVG for CSS hover interactivity. Import the SVG as a raw string and render with `v-html`. Add CSS rules targeting the existing SVG class names (`.cat`, `.layer`, `.xport`) for hover effects.

3. **All other diagrams:** Standard `<img>` tags pointing to `public/diagrams/`. This keeps the DOM light and allows browser caching.

4. **Responsive scaling:** SVGs use `viewBox` attributes (already present), so they scale naturally. The `DiagramViewer` component constrains max-width and provides horizontal scroll on mobile for very wide diagrams.

5. **Dark theme compatibility:** All existing SVGs already use the dark color palette (`#0d1117` backgrounds). No theme adaptation needed.

---

## Build & Deploy

### Build Pipeline

```bash
# Install
npm install

# Dev server
npm run dev

# Type check
npm run type-check

# Build static site
npm run build
# Output: dist/
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,  // Don't inline SVGs as base64
  },
})
```

If using `vite-ssg` for pre-rendering:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
```

### Static Site Generation

Since this is a single-page site, SSG is straightforward:
- `vite-ssg` pre-renders the single route (`/`) to `dist/index.html`
- All SVGs and assets are copied to `dist/` as static files
- The output is a fully static site — no server-side runtime needed

### Deployment

The `dist/` directory can be deployed to any static hosting:
- GitHub Pages
- Cloudflare Pages
- Netlify
- Any web server serving static files

No server-side rendering, no API endpoints, no dynamic content.

---

## Font Strategy

Two fonts, both loaded from local files (no Google Fonts CDN — consistent with the no-tracking philosophy):

1. **JetBrains Mono** — headings, code, technical content. Matches the monospace in the SVG diagrams.
2. **Inter** — body text. Clean, highly legible sans-serif.

Both are open source (OFL). Include only the weights needed:
- JetBrains Mono: Regular (400), Bold (700)
- Inter: Regular (400), Medium (500), Semi-Bold (600)

Subset to Latin characters to minimize file size. Use `font-display: swap` for fast initial render.

```css
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
/* ... additional weights ... */
```

---

## Performance Budget

| Metric | Target |
|--------|--------|
| Total page weight (gzipped) | < 200 KB |
| Largest Contentful Paint | < 1.5s |
| Time to Interactive | < 2.0s |
| SVG diagrams (total) | < 100 KB |
| JavaScript bundle | < 50 KB gzipped |
| CSS | < 15 KB gzipped |
| Fonts | < 80 KB (subsetted woff2) |

The site should score 95+ on Lighthouse for Performance, Accessibility, Best Practices, and SEO.

---

## Accessibility

- All SVG diagrams have `alt` text descriptions
- Color contrast ratios meet WCAG AA (the existing palette needs verification — `#909090` on `#0d1117` is ~5.5:1, which passes AA)
- Keyboard navigation for all interactive elements
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `aria-current` on active nav item
- Reduced motion: respect `prefers-reduced-motion` for any transitions
- No content hidden behind interactions — all information is visible without hovering/clicking

---

## SEO

Minimal but correct:

```html
<head>
  <title>FIPS — Free Internetworking Peering System</title>
  <meta name="description" content="A self-organizing encrypted mesh network that works over any transport. Built on Nostr identities. Compatible with existing applications.">
  <meta property="og:title" content="FIPS — Free Internetworking Peering System">
  <meta property="og:description" content="A self-organizing encrypted mesh that works over anything you can send packets through.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://fips.network">
  <meta property="og:image" content="https://fips.network/og-image.png">
  <link rel="canonical" href="https://fips.network">
</head>
```

The OG image should be a rendered version of the node architecture diagram or a simplified version of it, sized for social sharing (1200×630).

---

## Development Workflow

1. **Scaffold** the Vite + Vue + TypeScript project
2. **Set up design tokens** in CSS variables
3. **Build components bottom-up**: TerminalBlock → DiagramViewer → individual sections → App.vue
4. **Copy and adapt SVG diagrams** from `docs/design/diagrams/`
5. **Wire up scroll spy** and navigation
6. **Responsive testing** across breakpoints
7. **Lighthouse audit** and performance optimization
8. **Deploy** to static hosting

---

## Open Questions

1. **Domain hosting**: Where will fips.network be hosted? GitHub Pages is simplest. Cloudflare Pages gives better global CDN.
2. **OG image**: Should we auto-generate from the SVG or create a separate asset?
3. **Docs hosting**: Will the design docs be served from the same domain (fips.network/docs) or remain on GitHub? This affects link targets.
4. **Versioning**: Should the site reflect a specific protocol version, or track main branch?