<template>
  <!-- Six small SVG animations, one per self-organizing claim. The active
       diagram swaps via <component :is>; tabs auto-cycle until clicked,
       same pattern as WorksFlow but with the tab strip placed below the
       stage instead of beside it. -->
  <div class="org-flow">
    <div class="stage">
      <component
        :is="current.component"
        :key="current.id"
        class="org-diagram"
      />
    </div>

    <p class="caption">{{ current.caption }}</p>

    <div class="tabs" role="tablist" aria-label="Self-organizing properties">
      <button
        v-for="(t, i) in tabs"
        :key="t.id"
        class="tab"
        :class="{ 'is-active': active === t.id }"
        :aria-selected="active === t.id"
        role="tab"
        @click="setActive(t.id)"
      >
        <span class="tab-num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="tab-label">{{ t.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, markRaw, onBeforeUnmount, onMounted, ref } from 'vue'
import OrgRootElect from './OrgRootElect.vue'
import OrgMerge from './OrgMerge.vue'
import OrgQuality from './OrgQuality.vue'
import MeshHealFlow from './MeshHealFlow.vue'
import TreeConvergeFlow from './TreeConvergeFlow.vue'
import OrgBeacon from './OrgBeacon.vue'

const tabs = [
  {
    id: 'elect',
    label: 'Root election',
    caption: 'Lowest address wins. Nodes converge on the same root with zero coordination.',
    component: markRaw(OrgRootElect),
  },
  {
    id: 'merge',
    label: 'Merge on contact',
    caption: 'Two islands meet over any transport. The trees collapse into one.',
    component: markRaw(OrgMerge),
  },
  {
    id: 'quality',
    label: 'Quality-routed',
    caption: 'Live link metrics steer parent selection. Traffic drifts off a degrading link on its own.',
    component: markRaw(OrgQuality),
  },
  {
    id: 'heal',
    label: 'Self-heal',
    caption: 'A hub dies. The spanning tree reconverges around the gap.',
    component: markRaw(MeshHealFlow),
  },
  {
    id: 'gossip',
    label: 'Viral discovery',
    caption: 'Bloom-filter reachability propagates through tree edges. New peers spread by gossip.',
    component: markRaw(TreeConvergeFlow),
  },
  {
    id: 'beacon',
    label: 'Zero-touch peering',
    caption: 'A new node beacons on shared media. Neighbors auto-peer and absorb it into the tree.',
    component: markRaw(OrgBeacon),
  },
] as const
type TabId = typeof tabs[number]['id']

const active = ref<TabId>('elect')
const current = computed(() => tabs.find(t => t.id === active.value)!)

const CYCLE_MS = 14000
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
    const idx = tabs.findIndex(t => t.id === active.value)
    active.value = tabs[(idx + 1) % tabs.length].id
    scheduleNext()
  }, CYCLE_MS)
}

function setActive(id: TabId) {
  active.value = id
  scheduleNext()
}

onMounted(scheduleNext)
onBeforeUnmount(clearTimer)
</script>

<style scoped>
.org-flow {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  font-family: var(--font-mono);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.stage {
  width: 100%;
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.org-diagram {
  width: 100%;
  margin-top: 0 !important;
  animation: org-fade-in 0.28s ease;
}

@keyframes org-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.caption {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: center;
  max-width: 720px;
  margin: 0;
  min-height: 1.5em;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
  margin-top: var(--space-sm);
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s, background-color 0.15s;
}
.tab:hover {
  color: var(--text-primary);
  border-color: var(--border-medium);
  background-color: rgba(255, 255, 255, 0.03);
}
.tab.is-active {
  color: var(--color-fmp-border);
  border-color: var(--color-fmp-border);
  background-color: rgba(80, 128, 192, 0.08);
}

.tab-num {
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}
.tab.is-active .tab-num {
  color: var(--color-fmp-border);
}

@media (max-width: 720px) {
  .stage { min-height: 300px; }
  .tab { padding: 7px 10px; font-size: 0.75rem; }
  .tab-num { display: none; }
}
</style>
