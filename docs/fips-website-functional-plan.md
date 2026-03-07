# FIPS Website — Functional Plan

**Domain**: fips.network  
**Purpose**: Landing page for the FIPS mesh project  
**Audience**: Tech-savvy users who would run/test FIPS, with a clear path for those who want to dig into the technical details

---

## Design Philosophy

- **Let the tech speak.** No sales language, no hype, no "revolutionary" adjectives. Present what FIPS does and how it works. People who care about this will recognize the value immediately.
- **Respect the reader's intelligence.** The audience knows what IP is, what encryption means, what a mesh network is. Don't over-explain basics — explain what's *different* about FIPS.
- **Progressive disclosure.** The landing page gives you the picture in 60 seconds. Every section has a path deeper — into docs, specs, or the repo.
- **Dark, technical aesthetic.** Match the existing diagram style (dark backgrounds, monospace, muted color palette from the SVGs). The site should feel like documentation, not marketing.

---

## Key Messages (in priority order)

1. **Transport agnostic** — FIPS doesn't care how your packets get there. WiFi, Ethernet, Bluetooth, UDP overlay, serial, satellite. Same protocol, same mesh.
2. **Works with what you already have** — Existing applications (ping, curl, SSH, Browsers, Nostr clients) work unmodified through the IPv6 adapter. No app rewrites. No new APIs to learn unless you want them.
3. **Self-organizing** — Connect to one peer, reach the entire mesh. No configuration servers, no address assignment, no central authority.
4. **Nostr-native identity** — Your keypair is your address. No DNS registrars, no certificate authorities, no IP allocation bureaucracy.
5. **Encrypted by default** — Every hop encrypted. Every session end-to-end encrypted. No opt-in required.

---

## Site Structure

The site is a single-page application with defined sections. No multi-page navigation — scroll or jump to sections. A persistent top nav provides section anchors and external links (GitHub, docs).

### Section 1: Hero

**Content:**
- Project name: **FIPS** — Free Internetworking Peering System
- One-line description: *A self-organizing encrypted mesh that works over anything you can send packets through.*
- The node architecture diagram (adapted from `fips-node-architecture.svg`) as the hero visual — it immediately communicates the layered architecture and transport diversity
- Two CTAs: "Read the docs" → design docs | "Get started" → GitHub README / install guide

**Tone:** Factual. No superlatives.

### Section 2: What It Does (The Pitch in 30 Seconds)

Three short blocks, each with an icon/small visual and 2-3 sentences:

**Transport Agnostic**
> FIPS runs over WiFi, Ethernet, Bluetooth, UDP overlays, serial links, satellite uplinks, or Tor circuits. The protocol doesn't know or care what carries the packets. A single node can bridge between transports — peers on WiFi and peers on Ethernet join the same mesh automatically.

Visual: Transport category row from the node architecture diagram (the Overlay / Shared Medium / Point-to-Point grouping).

**Works With What You Have**
> Existing applications work unmodified. The IPv6 adapter gives every FIPS node a `fd00::/8` address and a `.fips` DNS name. `ping npub1xxx.fips` just works. `curl`, SSH, Nostr relays — anything that speaks IPv6 runs over the mesh without code changes.

Visual: A simple terminal snippet showing `ping npub1...fips` with a response, or `curl http://npub1...fips` — something concrete and immediately recognizable.

**Self-Organizing Mesh**
> Connect to one peer and you can reach the entire network. Nodes discover each other, build a spanning tree, exchange bloom filters, and route traffic — all without central coordination. The network heals around failures and adapts to topology changes automatically.

Visual: Adapted from `fips-mesh-topology.svg` — the mesh with spanning tree highlighted.

### Section 3: How It Works (Architecture at a Glance)

A more detailed but still concise breakdown of the protocol stack. This section bridges the landing page and the full docs.

**Layout:** Vertical stack mirroring the protocol layers, inspired by `fips-protocol-stack.svg`. Each layer is a clickable card that expands or links to the relevant design doc.

| Layer | One-liner | Links to |
|-------|-----------|----------|
| **Application Interface** | Native API (npub-addressed datagrams) or IPv6 TUN adapter for legacy apps | `fips-ipv6-adapter.md` |
| **FSP (Session Protocol)** | End-to-end Noise XK encryption between any two nodes | `fips-session-layer.md` |
| **FMP (Mesh Protocol)** | Hop-by-hop Noise IK encryption, spanning tree, bloom filters, routing | `fips-mesh-layer.md` |
| **Transport** | Pluggable: UDP, Ethernet, WiFi, Bluetooth, Tor, Serial, ... | `fips-transport-layer.md` |

Below the stack: the architecture overview diagram (`fips-architecture-overview.svg`) showing a packet traversing Node A → B → C → D across different transports with dual-layer encryption annotated.

### Section 4: Identity

Short section on the identity model. This is where the Nostr connection is made explicit.

**Content:**
- Your node identity is a Nostr keypair (secp256k1)
- From that keypair, three things are deterministically derived: the npub (application-layer identity), the node_addr (routing identifier, SHA-256 hash — opaque to the mesh), and the fd00::/8 IPv6 address (for legacy app compatibility)
- No registration, no authority, no coordination. Generate a key, join the mesh.
- Identity derivation diagram (`fips-identity-derivation.svg`)

**Tone:** Matter-of-fact. This is how addressing works. It's simple.

### Section 5: Get Involved

**Content:**
- **Run it**: Link to GitHub repo, install instructions, packaging (tarball, OpenWRT). Mention Docker test meshes for quick experimentation.
- **Break it**: Explicit invitation to test, find bugs, stress the protocol. Link to issue tracker.
- **Read the specs**: Link to the design docs (`docs/design/README.md`) with the recommended reading order.
- **Talk about it**: Link to Nostr profiles of contributors, relevant Nostr discussion threads.

**Tone:** Direct. "Here's the code. Here's how to run it. Tell us what breaks."

### Section 6: Footer

- Project license (from repo)
- GitHub link
- Link to Citadel Dispatch episode (the transcript source — good context for newcomers)
- "Built with Nostr" or similar minimal attribution
- No newsletter signup, no email capture, no analytics pitch

---

## What the Site Does NOT Have

- No pricing page
- No "features vs competitors" table
- No testimonials or social proof
- No newsletter/email signup
- No cookie banners (no tracking)
- No animations that serve no informational purpose
- No "join our Discord/Telegram" — Nostr is the communication layer

---

## Visual Direction

### Color Palette (from existing SVG diagrams)

| Role | Color | Usage |
|------|-------|-------|
| Background | `#0d1117` | Page background |
| Surface | `#151525` / `#151520` | Cards, sections |
| Application layer | `#1a3a2a` / `#40a060` | Green accent — app interface elements |
| IPv6 adapter | `#1a2a3a` / `#4080c0` | Blue accent — compatibility elements |
| FSP (session) | `#2a2040` / `#8060c0` | Purple accent — session/encryption |
| FMP (mesh) | `#2e3a5e` / `#5080c0` | Blue accent — mesh/routing |
| Transport | `#2a1a1a` / `#c06040` | Orange/rust accent — transport layer |
| Text primary | `#e0e0e0` | Body text |
| Text secondary | `#909090` | Subtitles, descriptions |
| Borders | `#505070` / `#404060` | Subtle borders |

### Typography

- Monospace for headings and technical content (matching diagrams)
- Clean sans-serif for body text (readability)
- Code blocks styled consistently with the dark theme

### Diagrams

The existing SVGs are already well-designed with consistent styling. They should be used directly or adapted (not redrawn in a different style). Key diagrams for the site:

| Diagram | Section | Purpose |
|---------|---------|---------|
| `fips-node-architecture.svg` | Hero | Primary visual — shows the full stack at a glance |
| `fips-mesh-topology.svg` | What It Does | Shows mesh with spanning tree, multi-transport |
| `fips-protocol-stack.svg` | How It Works | Layer breakdown with descriptions |
| `fips-architecture-overview.svg` | How It Works | Packet flow across heterogeneous transports |
| `fips-identity-derivation.svg` | Identity | Keypair → npub / node_addr / IPv6 derivation |

---

## Content Tone Guidelines

- **Do**: "FIPS routes traffic across WiFi, Ethernet, and Bluetooth transparently."
- **Don't**: "FIPS revolutionizes networking with its groundbreaking transport-agnostic architecture."
- **Do**: "Existing applications work without modification."
- **Don't**: "Seamlessly integrate with your existing workflow."
- **Do**: "The network self-organizes. Connect to one peer, reach the mesh."
- **Don't**: "Experience the future of decentralized connectivity."

Write like you're explaining it to a peer at a conference. Technical, precise, no filler.

---

## Responsive Behavior

- Desktop: Full-width sections, diagrams at comfortable reading size
- Tablet: Stacked layout, diagrams scale down
- Mobile: Single column, diagrams become scrollable/zoomable, terminal snippets remain readable
- The node architecture diagram should remain legible at all breakpoints — it's the anchor visual

---

## Success Criteria

The site works if:
1. A technical user understands what FIPS is within 60 seconds of landing
2. They can find the GitHub repo and install instructions within 2 clicks
3. They can reach the full design docs within 2 clicks
4. The site loads fast (static, no external dependencies beyond fonts if any)
5. Nothing on the site feels like it's trying to sell them something