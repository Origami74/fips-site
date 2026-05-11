# fips-site

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The landing page at **[fips.network](https://fips.network)** — the entry door to the [Free Internetworking Peering System](https://github.com/jmcorgan/fips), a self-organizing encrypted mesh that runs over any medium that can transfer packets.

## The site family

`fips-site` is one of four sibling sites; each lives in its own repo and deploys independently as an [nsite](https://github.com/hzrd149/nsite).

| Site | URL | Repo | Role |
|---|---|---|---|
| **fips-site** | [fips.network](https://fips.network) | [Origami74/fips-site](https://github.com/Origami74/fips-site) | Marketing / landing |
| **join-fips-site** | [join.fips.network](https://join.fips.network) | [Origami74/fips-join-site](https://github.com/Origami74/fips-join-site) | Live peer-discovery view of the FIPS overlay |
| **learn-fips** | [learn.fips.network](https://learn.fips.network) | [dergigi/learn-fips](https://github.com/dergigi/learn-fips) | Tutorials & guides |
| **awesome-fips-site** | [awesome.fips.network](https://awesome.fips.network) | [gitworkshop / awesome-fips](https://gitworkshop.dev/npub1hw6amg8p24ne08c9gdq8hhpqx0t0pwanpae9z25crn7m9uy7yarse465gr/relay.ngit.dev/awesome-fips) | Curated projects, talks, and posts |

## Stack

- **Vue 3** + **TypeScript**, single-page sections in `src/components/`
- **Vite** + **vite-ssg** — pre-renders to static HTML at build time so the page is interactive on first paint with no client-side hydration of the marketing content
- **Hand-written CSS** with design tokens in `src/style/variables.css` (no Tailwind, no UI kit)
- **No third-party requests** — fonts use system fallbacks (Inter / JetBrains Mono if installed locally, otherwise platform sans / monospace)

## Layout

```
fips-site/
├── index.html                      # Shell + OG meta tags
├── public/
│   ├── favicon.svg
│   ├── fips_banner.png             # og:image
│   └── diagrams/                   # SVGs adapted from the fips repo's docs/design/diagrams/
└── src/
    ├── main.ts                     # ViteSSG entry
    ├── App.vue                     # Top-level composition
    ├── style/
    │   ├── variables.css           # Design tokens (colors, type scale, spacing)
    │   ├── base.css
    │   └── utilities.css
    ├── composables/
    │   └── useScrollSpy.ts         # Drives the in-page nav highlight
    └── components/
        ├── SiteHeader.vue          # Sticky nav with section anchors
        ├── SiteFooter.vue
        ├── HeroSection.vue         # Hero copy + CTAs
        ├── HeroBackgroundMesh.vue  # Animated mesh canvas behind the hero
        ├── FeatureBlocks.vue       # "What it does"
        ├── WorksFlow.vue           # "How it works" walkthrough
        ├── TransportFlow.vue       # Transport-layer animation
        ├── SelfOrganizingFlow.vue  # Mesh-formation animation
        ├── WhyIdentity.vue         # Nostr-identity rationale
        ├── OrgBeacon.vue,
        │ OrgBloom.vue,
        │ OrgMerge.vue,
        │ OrgQuality.vue,
        │ OrgRootElect.vue          # Self-organization vignettes
        ├── LearnDiscover.vue       # Outbound links to docs / source / discussion
        ├── DiagramViewer.vue       # Inline SVG wrapper
        └── TerminalBlock.vue       # Faux-terminal code snippet
```

## Develop

```bash
npm install
npm run dev          # Vite dev server with HMR
npm run type-check   # vue-tsc --noEmit
npm run build        # Pre-renders to dist/ via vite-ssg
npm run preview      # Serve dist/ locally
```

## Design tokens

Palette mirrors the layered colors in the [fips/docs/design diagrams](https://github.com/jmcorgan/fips/tree/master/docs/design/diagrams) so the site, the diagrams, and the spec all read as one system.

| Token | Use |
|---|---|
| `#0d1117` | Page background |
| `#151525` | Card / surface |
| `#e0e0e0` / `#909090` | Primary / secondary text |
| Green / Blue / Purple / Orange | App · IPv6/adapter · FSP/FMP · Transport |

Headings & code: **JetBrains Mono**. Body: **Inter**.

## Deploy

`npm run build` produces a fully static `dist/`. The production target is an nsite (deployed via the sibling `deploy-nsite-to-pages` tooling), but the output is plain HTML/CSS/JS and runs on any static host — Cloudflare Pages, Netlify, GitHub Pages, S3, a USB stick.
