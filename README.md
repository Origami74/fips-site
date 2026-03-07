# FIPS Website

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The landing page for the Free Internetworking Peering System (FIPS) — a self-organizing encrypted mesh network.

## Stack

- **Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite with vite-ssg for static site generation
- **Styling**: Hand-written CSS (no framework)
- **Deployment**: Static HTML/CSS/JS

## Project Structure

```
website/
├── index.html              # Entry HTML with SEO meta tags
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite + SSG configuration
├── public/
│   ├── favicon.svg         # Site favicon
│   └── diagrams/           # SVG diagrams (copy from docs/design/diagrams/)
├── src/
│   ├── main.ts             # App entry point for SSG
│   ├── App.vue             # Root component
│   ├── style/              # CSS files
│   │   ├── variables.css   # Design tokens (colors, spacing, fonts)
│   │   ├── base.css        # Reset and base styles
│   │   └── utilities.css   # Helper classes
│   ├── composables/
│   │   └── useScrollSpy.ts # Active section tracking for nav
│   └── components/
│       ├── SiteHeader.vue      # Sticky navigation
│       ├── SiteFooter.vue      # Footer with links
│       ├── HeroSection.vue     # Hero with CTA
│       ├── FeatureBlocks.vue   # "What It Does" section
│       ├── ArchitectureSection.vue  # "How It Works" section
│       ├── IdentitySection.vue      # Identity explanation
│       ├── GetInvolved.vue          # Call-to-action cards
│       ├── TerminalBlock.vue        # Terminal snippet component
│       └── DiagramViewer.vue        # SVG display component
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npm run type-check

# Build static site (output to dist/)
npm run build

# Preview production build
npm run preview
```

## Design System

Colors and typography are derived from the existing SVG diagram palette:

- **Background**: `#0d1117` (page), `#151525` (surface)
- **Layer accents**: Green (app), Blue (IPv6/adapter), Purple (FSP), Blue (FMP), Orange (transport)
- **Text**: `#e0e0e0` (primary), `#909090` (secondary)
- **Typography**: JetBrains Mono (headings, code), Inter (body)

## Deployment

The `dist/` directory contains a fully static site that can be deployed to any static hosting service (GitHub Pages, Cloudflare Pages, Netlify, etc.).