<template>
  <!-- "Works with what you have" carousel.
       Big app window anchored at the left, partially clipped on the
       right (overflow:hidden on the demo column) so it reads as a
       full-size app peeking into view. Right column = clickable list
       of clients; auto-cycles every CYCLE_MS. -->
  <div class="works-flow">
    <div class="demo-area">
      <Transition name="demo" mode="out-in">
        <!-- ===== BROWSER ===== -->
        <div
          v-if="active === 'browser'"
          key="browser"
          class="frame frame--browser"
        >
          <div class="chrome chrome--browser">
            <div class="controls">
              <span class="ctrl ctrl-r"></span>
              <span class="ctrl ctrl-y"></span>
              <span class="ctrl ctrl-g"></span>
            </div>
            <div class="nav-buttons">
              <button class="nav-btn"><svg viewBox="0 0 24 24" width="13" height="13"><path d="M15 6 L9 12 L15 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
              <button class="nav-btn nav-btn--dim"><svg viewBox="0 0 24 24" width="13" height="13"><path d="M9 6 L15 12 L9 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
              <button class="nav-btn"><svg viewBox="0 0 24 24" width="13" height="13"><path d="M4 12 a8 8 0 1 1 2.34 5.66" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /><path d="M4 7 V12 H9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg></button>
            </div>
            <div class="tab tab--active">
              <span class="tab-favicon">⬡</span>
              <span class="tab-title">fren.fips</span>
              <span class="tab-close">×</span>
            </div>
            <div class="tab tab--inactive">
              <span class="tab-title">Hacker News</span>
            </div>
            <div class="tab tab--inactive">
              <span class="tab-title">Mail</span>
            </div>
            <div class="new-tab" aria-hidden="true">+</div>
            <div class="chrome-spacer"></div>
            <button class="more-btn"><span></span><span></span><span></span></button>
          </div>

          <div class="urlbar">
            <svg class="urlbar-icon" viewBox="0 0 24 24">
              <polygon points="12,3 21,8 21,16 12,21 3,16 3,8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
              <polygon points="12,7 17,10 17,14 12,17 7,14 7,10" fill="currentColor" opacity="0.55" />
            </svg>
            <span class="urlbar-text">
              <span class="urlbar-proto">http://</span><span class="typing" :style="`--chars: ${HOST.length}`">{{ HOST }}</span><span class="cursor cursor-bar"></span>
            </span>
            <span class="urlbar-chip">→ fd12:ab34::1</span>
            <button class="more-btn"><span></span><span></span><span></span></button>
          </div>

          <div class="page">
            <!-- Tab loading bar — fills while the URL is "resolving",
                 then fades once the page renders. Same blue glow as the
                 FMP layer. -->
            <div class="page-loading-bar"></div>
            <div class="page-block">
              <div class="page-hero">
                <span class="page-hex">⬡</span>
                <span class="page-greeting">Hello from <strong>fren.fips</strong> 👋</span>
              </div>
              <p class="page-text">This page is served straight from a peer on the FIPS mesh.</p>
              <p class="page-text page-text--muted">No DNS provider. No certificate authority. No exit node.</p>
              <a class="page-link" tabindex="-1">View source →</a>
            </div>
          </div>
        </div>

        <!-- ===== MINECRAFT ===== -->
        <div
          v-else-if="active === 'minecraft'"
          key="minecraft"
          class="frame frame--minecraft"
        >
          <div class="chrome chrome--app">
            <div class="controls">
              <span class="ctrl ctrl-r"></span>
              <span class="ctrl ctrl-y"></span>
              <span class="ctrl ctrl-g"></span>
            </div>
            <div class="app-title">Minecraft 1.21.4</div>
          </div>

          <div class="mc-body">
            <h3 class="mc-heading">Direct Connection</h3>
            <p class="mc-sublabel">Server Address</p>
            <div class="mc-input">
              <span class="typing" :style="`--chars: ${(HOST + ':25565').length}`">{{ HOST }}:25565</span><span class="cursor cursor-bar"></span>
            </div>

            <div class="mc-server-card">
              <div class="mc-server-icon">⛏</div>
              <div class="mc-server-meta">
                <div class="mc-server-name">Friend's Survival Realm</div>
                <div class="mc-server-motd">A whitelisted server for friends · 1.21.4</div>
              </div>
              <div class="mc-server-status">
                <div class="mc-bars" aria-label="signal full">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div class="mc-server-players">4 / 16</div>
              </div>
            </div>

            <div class="mc-actions">
              <button class="mc-btn mc-btn--primary">Join Server</button>
              <button class="mc-btn">Cancel</button>
            </div>
          </div>
        </div>

        <!-- ===== QUAKE ===== -->
        <div
          v-else-if="active === 'quake'"
          key="quake"
          class="frame frame--quake"
        >
          <div class="chrome chrome--app">
            <div class="controls">
              <span class="ctrl ctrl-r"></span>
              <span class="ctrl ctrl-y"></span>
              <span class="ctrl ctrl-g"></span>
            </div>
            <div class="app-title">Quake — server browser</div>
          </div>
          <div class="quake-body">
            <div class="quake-line">
              <span class="quake-prompt">]</span><span class="typing" :style="`--chars: ${('connect ' + HOST + ':27500').length}`">connect {{ HOST }}:27500</span><span class="cursor cursor-bar cursor--inline"></span>
            </div>
            <div class="quake-line out" style="--out-delay: 0.2s">resolving {{ HOST }} ...</div>
            <div class="quake-line out" style="--out-delay: 0.4s">connected to fd12:ab34::1</div>
            <div class="quake-line out" style="--out-delay: 0.6s">loading map: <span class="quake-hl">dm6 (Aerowalk)</span></div>
            <div class="quake-line out" style="--out-delay: 0.85s">ping 14ms — type <span class="quake-hl">ready</span> to start</div>
          </div>
        </div>

        <!-- ===== JITSI ===== -->
        <div
          v-else-if="active === 'jitsi'"
          key="jitsi"
          class="frame frame--jitsi"
        >
          <div class="chrome chrome--app">
            <div class="controls">
              <span class="ctrl ctrl-r"></span>
              <span class="ctrl ctrl-y"></span>
              <span class="ctrl ctrl-g"></span>
            </div>
            <div class="app-title">Jitsi · Friend Call</div>
          </div>
          <div class="jitsi-body">
            <div class="jitsi-status">
              <span class="jitsi-status-dot"></span>
              Connected · {{ HOST }} · 28 ms
            </div>
            <div class="jitsi-grid">
              <div class="jitsi-tile jitsi-tile--peer">
                <div class="jitsi-avatar">A</div>
                <div class="jitsi-name">Ada</div>
                <div class="jitsi-mic" aria-label="mic on">
                  <svg viewBox="0 0 24 24" width="11" height="11"><path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M5 11a7 7 0 0 0 14 0 M12 18v3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
                </div>
              </div>
              <div class="jitsi-tile jitsi-tile--self">
                <div class="jitsi-avatar jitsi-avatar--small">Y</div>
                <div class="jitsi-name">You</div>
              </div>
            </div>
            <div class="jitsi-toolbar">
              <button class="jitsi-tool" aria-label="mute">
                <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M5 11a7 7 0 0 0 14 0 M12 18v3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              </button>
              <button class="jitsi-tool" aria-label="video">
                <svg viewBox="0 0 24 24" width="14" height="14"><rect x="3" y="7" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17 11 L21 9 V15 L17 13 Z" fill="currentColor"/></svg>
              </button>
              <button class="jitsi-tool" aria-label="share screen">
                <svg viewBox="0 0 24 24" width="14" height="14"><rect x="3" y="4" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 21 H15 M12 17 V21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              </button>
              <div class="jitsi-tool-spacer"></div>
              <button class="jitsi-tool jitsi-tool--end" aria-label="end call">
                <svg viewBox="0 0 24 24" width="14" height="14"><path d="M2 13c0-3 4-6 10-6s10 3 10 6c0 1-1 2-2 2l-3-1c-1 0-1-1-1-2v-1c-2-1-6-1-8 0v1c0 1 0 2-1 2l-3 1c-1 0-2-1-2-2z" fill="currentColor"/></svg>
                End
              </button>
            </div>
          </div>
        </div>

        <!-- ===== PLEX ===== -->
        <div
          v-else-if="active === 'plex'"
          key="plex"
          class="frame frame--plex"
        >
          <div class="chrome chrome--app">
            <div class="controls">
              <span class="ctrl ctrl-r"></span>
              <span class="ctrl ctrl-y"></span>
              <span class="ctrl ctrl-g"></span>
            </div>
            <div class="app-title">Plex · Add Server</div>
          </div>
          <div class="plex-body">
            <div class="plex-sidebar">
              <div class="plex-logo">
                <svg viewBox="0 0 24 24" width="16" height="16"><polygon points="6,3 18,3 14,12 18,21 6,21 10,12" fill="currentColor"/></svg>
                <span>plex</span>
              </div>
              <div class="plex-side-item">Home</div>
              <div class="plex-side-item plex-side-item--active">Servers</div>
              <div class="plex-side-item">Watchlist</div>
              <div class="plex-side-item">Library</div>
            </div>
            <div class="plex-main">
              <h3 class="plex-heading">Add a Server</h3>
              <p class="plex-sublabel">Server address</p>
              <div class="plex-input">
                <span class="typing" :style="`--chars: ${(HOST + ':32400').length}`">{{ HOST }}:32400</span><span class="cursor cursor-bar"></span>
              </div>
              <div class="plex-found">
                <span class="plex-check">✓</span>
                <div class="plex-found-meta">
                  <div class="plex-found-name">Ada's Library</div>
                  <div class="plex-found-stats">1,247 movies · 48 shows · 4,302 songs</div>
                </div>
                <span class="plex-pill">connected</span>
              </div>
              <div class="plex-actions">
                <button class="plex-btn plex-btn--primary">Connect</button>
                <button class="plex-btn">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ===== SSH ===== -->
        <div
          v-else-if="active === 'ssh'"
          key="ssh"
          class="frame frame--terminal"
        >
          <div class="chrome chrome--app">
            <div class="controls">
              <span class="ctrl ctrl-r"></span>
              <span class="ctrl ctrl-y"></span>
              <span class="ctrl ctrl-g"></span>
            </div>
            <div class="app-title">Terminal — ssh</div>
          </div>
          <div class="terminal-body">
            <div class="terminal-line">
              <span class="prompt">$</span><span class="typing" :style="`--chars: ${('ssh ada@' + HOST).length}`">ssh ada@{{ HOST }}</span><span class="cursor cursor-bar cursor--inline"></span>
            </div>
            <div class="terminal-line out" style="--out-delay: 0.2s">Last login: Wed Apr 27 14:23:18 2026</div>
            <div class="terminal-line out is-blank" style="--out-delay: 0.35s"></div>
            <div class="terminal-line out" style="--out-delay: 0.5s">
              <span class="prompt prompt--remote">ada@fren.fips:~$</span><span class="cursor cursor-block"></span>
            </div>
          </div>
        </div>

        <!-- ===== CURL ===== -->
        <div
          v-else-if="active === 'curl'"
          key="curl"
          class="frame frame--terminal"
        >
          <div class="chrome chrome--app">
            <div class="controls">
              <span class="ctrl ctrl-r"></span>
              <span class="ctrl ctrl-y"></span>
              <span class="ctrl ctrl-g"></span>
            </div>
            <div class="app-title">Terminal — curl</div>
          </div>
          <div class="terminal-body">
            <div class="terminal-line">
              <span class="prompt">$</span><span class="typing" :style="`--chars: ${('curl http://' + HOST + '/').length}`">curl http://{{ HOST }}/</span><span class="cursor cursor-bar cursor--inline"></span>
            </div>
            <div class="terminal-line out" style="--out-delay: 0.2s">HTTP/1.1 200 OK</div>
            <div class="terminal-line out" style="--out-delay: 0.35s">Content-Type: text/plain</div>
            <div class="terminal-line out is-blank" style="--out-delay: 0.5s"></div>
            <div class="terminal-line out" style="--out-delay: 0.65s">Hello from .fips</div>
            <div class="terminal-line out is-blank" style="--out-delay: 0.8s"></div>
            <div class="terminal-line out" style="--out-delay: 0.95s">
              <span class="prompt">$</span><span class="cursor cursor-block"></span>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="options" role="tablist" aria-label="Client examples">
      <button
        v-for="demo in demos"
        :key="demo.id"
        class="option"
        :class="{ 'is-active': active === demo.id }"
        :aria-selected="active === demo.id"
        role="tab"
        @click="setActive(demo.id)"
      >
        <span class="option-dot" aria-hidden="true"></span>
        <span class="option-label">{{ demo.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// One canonical destination across every demo.
const HOST = 'npub1qjk2nice…7pf2vpu.fips'

const demos = [
  { id: 'browser',   label: 'Browser' },
  { id: 'minecraft', label: 'Minecraft' },
  { id: 'quake',     label: 'Quake' },
  { id: 'jitsi',      label: 'Jitsi' },
  { id: 'plex',      label: 'Plex' },
  { id: 'ssh',       label: 'ssh' },
  { id: 'curl',      label: 'curl' },
] as const
type DemoId = typeof demos[number]['id']

const active = ref<DemoId>('browser')

const CYCLE_MS = 6500
let timer: number | null = null

function clearTimer() {
  if (timer !== null) {
    window.clearTimeout(timer)
    timer = null
  }
}

function scheduleNext() {
  clearTimer()
  timer = window.setTimeout(() => {
    const idx = demos.findIndex(d => d.id === active.value)
    active.value = demos[(idx + 1) % demos.length].id
    scheduleNext()
  }, CYCLE_MS)
}

function setActive(id: DemoId) {
  active.value = id
  scheduleNext()
}

onMounted(scheduleNext)
onBeforeUnmount(clearTimer)
</script>

<style scoped>
.works-flow {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 170px;
  gap: var(--space-lg);
  align-items: start;
  font-family: var(--font-mono);
}

/* ============ DEMO AREA + transitions ============
 * The frame inside is sized larger than the column to read as "a full
 * application peeking into view from the left". overflow:hidden clips
 * the right edge cleanly; the wide content (URL bar, server list,
 * console) keeps the relevant action on the visible left. */
.demo-area {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  min-height: 420px;
  /* Soft fade on the right edge so the clipping doesn't feel like a
   * hard chop. */
  -webkit-mask-image: linear-gradient(to right, #000 0%, #000 88%, rgba(0,0,0,0.6) 100%);
          mask-image: linear-gradient(to right, #000 0%, #000 88%, rgba(0,0,0,0.6) 100%);
}

.demo-enter-active,
.demo-leave-active { transition: opacity 0.25s ease, transform 0.3s ease; }
.demo-enter-from   { opacity: 0; transform: translateY(6px); }
.demo-leave-to     { opacity: 0; transform: translateY(-6px); }

/* ============ Common frame ============
 * Every frame is wider than its column so the right side spills off
 * into the mask. Anchor at left. */
.frame {
  width: 124%;
  min-width: 720px;
  border: 1px solid var(--border-medium);
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--bg-surface);
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.7);
  text-align: left;
}

.chrome {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 9px 12px;
  background-color: var(--bg-surface-alt);
  border-bottom: 1px solid var(--border-subtle);
}
.chrome--app .app-title {
  flex: 1;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
  letter-spacing: 0.04em;
}

.controls { display: flex; gap: 6px; flex-shrink: 0; }
.ctrl { width: 12px; height: 12px; border-radius: 50%; }
.ctrl-r { background: #f87171; }
.ctrl-y { background: #f59e0b; }
.ctrl-g { background: var(--color-app-border); }

/* ============ Browser chrome ============ */
.nav-buttons { display: flex; gap: 2px; }
.nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px; height: 24px;
  border-radius: 5px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
}
.nav-btn--dim { color: var(--text-muted); opacity: 0.55; }
.nav-btn:hover { background-color: rgba(255, 255, 255, 0.05); }

.tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 6px 6px 0 0;
  font-size: 0.6875rem;
  max-width: 180px;
}
.tab--active {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-bottom: none;
  color: var(--text-primary);
}
.tab--inactive {
  background-color: rgba(255, 255, 255, 0.03);
  color: var(--text-muted);
  border: 1px solid transparent;
}
.tab-favicon { color: var(--color-fmp-border); }
.tab-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tab-close { color: var(--text-muted); font-size: 0.875rem; line-height: 1; }
.new-tab {
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--text-muted);
}
.chrome-spacer { flex: 1; }

.more-btn {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  width: 24px; height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}
.more-btn span {
  display: block;
  width: 3px; height: 3px;
  border-radius: 50%;
  background-color: var(--text-muted);
}

.urlbar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  font-size: 0.875rem;
}
.urlbar-icon {
  width: 16px; height: 16px;
  flex-shrink: 0;
  color: var(--color-fmp-border);
}
.urlbar-text {
  display: inline-flex;
  align-items: baseline;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  color: var(--text-primary);
}
.urlbar-proto { color: var(--text-muted); }
.urlbar-chip {
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--accent-gold);
  background-color: rgba(208, 160, 64, 0.1);
  border: 1px solid rgba(208, 160, 64, 0.4);
  padding: 2px 8px;
  border-radius: 999px;
  opacity: 0;
  transform: translateX(-6px);
  animation: chip-show 6s ease 1.6s forwards;
}
@keyframes chip-show {
  0%   { opacity: 0; transform: translateX(-6px); }
  20%  { opacity: 1; transform: translateX(0); }
  100% { opacity: 1; transform: translateX(0); }
}

.page {
  position: relative;
  padding: var(--space-lg);
  background-color: var(--bg-surface);
  min-height: 220px;
}

/* Loading bar — slim 2px line at the top of the page region. Width
 * ramps from 0→100% over the URL-resolution window, then fades. */
.page-loading-bar {
  position: absolute;
  top: 0; left: 0;
  height: 2px;
  width: 0;
  background-color: var(--color-fmp-border);
  box-shadow: 0 0 8px var(--color-fmp-border);
  animation: page-load 6.5s ease 1.5s forwards;
}
@keyframes page-load {
  0%   { width: 0;    opacity: 1; }
  9%   { width: 60%;  opacity: 1; }
  18%  { width: 92%;  opacity: 1; }
  23%  { width: 100%; opacity: 1; }
  27%  { width: 100%; opacity: 0; }
  100% { width: 100%; opacity: 0; }
}

.page-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  animation: page-fade 0.6s ease 2.4s forwards;
}
@keyframes page-fade { to { opacity: 1; } }

.page-hero {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}
.page-hex {
  font-size: 1.25rem;
  color: var(--color-fmp-border);
}
.page-greeting {
  font-family: var(--font-mono);
  font-size: 1.0625rem;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.page-greeting strong {
  color: var(--color-fmp-border);
  font-weight: 600;
}
.page-text {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--text-secondary);
}
.page-text--muted { color: var(--text-muted); font-size: 0.8125rem; }
.page-link {
  display: inline-block;
  margin-top: 4px;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-fmp-border);
  text-decoration: none;
  border-bottom: 1px dotted var(--color-fmp-border);
  align-self: flex-start;
}

/* ============ Minecraft ============ */
.frame--minecraft .mc-body {
  padding: var(--space-lg);
  background:
    repeating-linear-gradient(0deg, transparent 0 14px, rgba(255,255,255,0.015) 14px 28px),
    linear-gradient(180deg, #2a2a2a, #1c1c1c);
  min-height: 320px;
  font-family: 'JetBrains Mono', monospace;
  color: #e0e0e0;
}
.mc-heading {
  margin: 0 0 var(--space-md);
  font-size: 1.125rem;
  letter-spacing: 0.04em;
  color: #fff;
}
.mc-sublabel {
  margin: 0 0 6px;
  font-size: 0.75rem;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.mc-input {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #0d0d0d;
  border: 2px solid #4f4f4f;
  border-radius: 0;
  font-size: 0.9375rem;
  margin-bottom: var(--space-md);
}
.mc-input .typing { color: #fff; }

.mc-server-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background-color: rgba(255,255,255,0.04);
  border: 2px solid var(--color-app-border);
  margin-bottom: var(--space-md);
  opacity: 0;
  animation: page-fade 6s ease 2.5s forwards;
}
.mc-server-icon {
  font-size: 1.5rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4a3520;
  border: 2px solid #2d1f10;
  flex-shrink: 0;
}
.mc-server-meta { flex: 1; min-width: 0; }
.mc-server-name { font-size: 0.875rem; color: #fff; }
.mc-server-motd { font-size: 0.75rem; color: #b0b0b0; margin-top: 2px; }
.mc-server-status { text-align: right; flex-shrink: 0; }
.mc-bars { display: flex; gap: 1px; justify-content: flex-end; height: 12px; align-items: flex-end; }
.mc-bars span {
  display: block;
  width: 3px;
  background-color: var(--color-app-border);
}
.mc-bars span:nth-child(1) { height: 30%; }
.mc-bars span:nth-child(2) { height: 50%; }
.mc-bars span:nth-child(3) { height: 70%; }
.mc-bars span:nth-child(4) { height: 85%; }
.mc-bars span:nth-child(5) { height: 100%; }
.mc-server-players { font-size: 0.75rem; color: #b0b0b0; margin-top: 4px; }

.mc-actions { display: flex; gap: var(--space-sm); }
.mc-btn {
  padding: 8px 22px;
  background-color: #4f4f4f;
  color: #fff;
  border: 2px solid #2d2d2d;
  border-bottom-width: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
}
.mc-btn--primary {
  background-color: var(--color-app-border);
  border-color: #1f5030;
}

/* ============ Jitsi ============ */
.frame--jitsi .jitsi-body {
  position: relative;
  background: linear-gradient(180deg, #1a1d24, #0f1116);
  min-height: 320px;
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.jitsi-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  font-size: 0.75rem;
  color: #b6c4d8;
  background-color: rgba(45, 140, 255, 0.12);
  border: 1px solid rgba(45, 140, 255, 0.4);
  padding: 4px 10px;
  border-radius: 999px;
}
.jitsi-status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background-color: var(--color-app-border);
  box-shadow: 0 0 6px var(--color-app-border);
}
.jitsi-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
  flex: 1;
  min-height: 200px;
}
.jitsi-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
  background:
    radial-gradient(circle at 30% 30%, rgba(45, 140, 255, 0.18), transparent 60%),
    linear-gradient(135deg, #2a2f3a, #1a1d24);
  border: 1px solid rgba(255, 255, 255, 0.06);
  opacity: 0;
  animation: jitsi-tile-fade 5s ease 0.4s forwards;
}
.jitsi-tile--self {
  position: absolute;
  top: 8px; right: 8px;
  width: 130px; height: 80px;
  z-index: 2;
  background: linear-gradient(135deg, #3a3f4a, #232631);
  animation-delay: 0.7s;
}
@keyframes jitsi-tile-fade { to { opacity: 1; } }

.jitsi-avatar {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2d8cff, #6a4cff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}
.jitsi-avatar--small { width: 28px; height: 28px; font-size: 0.75rem; margin-bottom: 4px; }
.jitsi-name {
  font-size: 0.75rem;
  color: #cbd5e1;
}
.jitsi-mic {
  position: absolute;
  bottom: 6px; right: 8px;
  color: var(--color-app-border);
}

.jitsi-toolbar {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background-color: #0a0c10;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.jitsi-tool {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.06);
  color: #d1d5db;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.75rem;
}
.jitsi-tool-spacer { flex: 1; }
.jitsi-tool--end {
  background: #ef4444;
  color: #fff;
  border-color: #b91c1c;
}

/* ============ Plex ============ */
.frame--plex .plex-body {
  display: flex;
  background-color: #1a1a1a;
  min-height: 320px;
}
.plex-sidebar {
  width: 130px;
  background-color: #0c0c0c;
  border-right: 1px solid #2a2a2a;
  padding: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.plex-logo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  margin-bottom: 8px;
  color: var(--accent-gold);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: lowercase;
}
.plex-side-item {
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #9ca3af;
}
.plex-side-item--active {
  background-color: rgba(229, 160, 13, 0.12);
  color: var(--accent-gold);
}

.plex-main {
  flex: 1;
  padding: var(--space-lg);
  min-width: 0;
}
.plex-heading {
  margin: 0 0 var(--space-md);
  font-size: 1.125rem;
  color: #f5f5f5;
  font-weight: 600;
}
.plex-sublabel {
  margin: 0 0 6px;
  font-size: 0.6875rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.plex-input {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  background-color: #0c0c0c;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #f5f5f5;
  margin-bottom: var(--space-md);
}
.plex-found {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background-color: rgba(229, 160, 13, 0.08);
  border: 1px solid rgba(229, 160, 13, 0.5);
  border-radius: 4px;
  margin-bottom: var(--space-md);
  opacity: 0;
  animation: page-fade 6s ease 2.4s forwards;
}
.plex-check {
  width: 22px; height: 22px;
  border-radius: 50%;
  background-color: var(--color-app-border);
  color: #0a1a10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  flex-shrink: 0;
}
.plex-found-meta { flex: 1; min-width: 0; }
.plex-found-name { font-size: 0.875rem; color: #f5f5f5; }
.plex-found-stats { font-size: 0.75rem; color: #9ca3af; margin-top: 2px; }
.plex-pill {
  font-size: 0.6875rem;
  color: var(--accent-gold);
  background-color: rgba(229, 160, 13, 0.15);
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid rgba(229, 160, 13, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  flex-shrink: 0;
}

.plex-actions { display: flex; gap: 8px; }
.plex-btn {
  padding: 8px 18px;
  background-color: transparent;
  color: #d1d5db;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.8125rem;
}
.plex-btn--primary {
  background-color: var(--accent-gold);
  color: #1a1a1a;
  border-color: var(--accent-gold);
  font-weight: 600;
}

/* ============ Quake ============ */
.frame--quake .quake-body {
  padding: var(--space-md) var(--space-lg);
  background-color: #0a0a0a;
  min-height: 260px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.65;
  color: #b8b07a;
}
.quake-prompt {
  color: #d4c870;
  margin-right: 6px;
}
.quake-hl { color: #ffce5c; }
.quake-line { display: flex; flex-wrap: nowrap; align-items: baseline; gap: 4px; white-space: pre; }

/* ============ Terminal demos ============ */
.frame--terminal .terminal-body {
  padding: var(--space-md) var(--space-lg);
  background-color: #0a0a0a;
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--text-primary);
  min-height: 260px;
}
.terminal-line { display: flex; align-items: baseline; gap: 8px; white-space: pre; }
.terminal-line.is-blank { min-height: 0.7em; }
.prompt { color: var(--color-app-border); flex-shrink: 0; }
.prompt--remote { color: var(--color-fmp-border); }

/* Output lines for terminal + Quake share the staggered fade-in.
 * The animation-delay must live in the same rule as the `animation:`
 * shorthand or the shorthand resets it back to 0. */
.terminal-line.out, .quake-line.out {
  opacity: 0;
  animation: out-fade 0.4s ease calc(1.7s + var(--out-delay, 0s)) forwards;
}
.terminal-line.out { color: var(--text-secondary); }
@keyframes out-fade { to { opacity: 1; } }

/* ============ Typing animation (universal) ============
 * white-space:nowrap is essential — without it the inner text can wrap
 * onto a second line as max-width grows, then snap back to a single
 * line once max-width exceeds the natural width. */
.typing {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: bottom;
  max-width: 0;
  animation: type 1.5s linear 0.3s forwards;
}
@keyframes type {
  to { max-width: calc(var(--chars, 30) * 1ch); }
}

/* Cursors */
.cursor {
  display: inline-block;
  background-color: currentColor;
  animation: cursor-blink 1s steps(2, end) infinite;
}
.cursor-bar { width: 1px; height: 1em; margin-left: 1px; vertical-align: middle; }
.cursor-block {
  width: 0.55em; height: 1em; margin-left: 1px; vertical-align: middle;
  background-color: var(--text-primary);
}
.cursor--inline {
  opacity: 0;
  animation: cursor-show 0s linear 1.85s forwards, cursor-blink 1s steps(2, end) 1.85s infinite;
}
@keyframes cursor-show { to { opacity: 1; } }
@keyframes cursor-blink { to { opacity: 0; } }

/* ============ Right-hand options column ============ */
.options {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 4px;
}
.option {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  cursor: pointer;
  text-align: left;
  transition: color 0.15s, border-color 0.15s, background-color 0.15s;
}
.option:hover {
  color: var(--text-primary);
  border-color: var(--border-medium);
  background-color: rgba(255, 255, 255, 0.03);
}
.option-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background-color: var(--text-muted);
  flex-shrink: 0;
  transition: background-color 0.15s, box-shadow 0.15s;
}
.option.is-active {
  color: var(--color-fmp-border);
  border-color: var(--color-fmp-border);
  background-color: rgba(80, 128, 192, 0.08);
}
.option.is-active .option-dot {
  background-color: var(--color-fmp-border);
  box-shadow: 0 0 6px var(--color-fmp-border);
}

/* ============ Mobile: stack ============ */
@media (max-width: 720px) {
  .works-flow { grid-template-columns: 1fr; }
  .demo-area { -webkit-mask-image: none; mask-image: none; min-height: 360px; }
  .frame { width: 100%; min-width: 0; }
  .options { flex-direction: row; flex-wrap: wrap; }
  .option { flex: 1 1 auto; min-width: 80px; justify-content: center; }
}

/* ============ Reduced motion ============ */
@media (prefers-reduced-motion: reduce) {
  .typing { max-width: calc(var(--chars, 30) * 1ch); animation: none; }
  .urlbar-chip, .page-block, .terminal-line.out, .quake-line.out, .mc-server-card {
    opacity: 1; transform: none; animation: none;
  }
  .cursor, .cursor--inline { animation: none; }
  .demo-enter-active, .demo-leave-active { transition: none; }
}
</style>
