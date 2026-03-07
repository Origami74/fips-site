<template>
  <figure class="diagram-viewer" :style="{ maxWidth: maxWidth }">
    <div v-if="inline" class="diagram-inline" v-html="svgContent"></div>
    <img
      v-else
      :src="src"
      :alt="alt"
      :loading="loading"
      class="diagram-img"
    />
    <figcaption v-if="caption" class="diagram-caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  src: string
  alt: string
  maxWidth?: string
  caption?: string
  inline?: boolean
  loading?: 'lazy' | 'eager'
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '100%',
  inline: false,
  loading: 'lazy',
})

const svgContent = ref('')

onMounted(async () => {
  if (props.inline) {
    try {
      const response = await fetch(props.src)
      svgContent.value = await response.text()
    } catch (error) {
      console.error('Failed to load SVG:', error)
    }
  }
})
</script>

<style scoped>
.diagram-viewer {
  margin: var(--space-lg) 0;
}

.diagram-img,
.diagram-inline {
  display: block;
  width: 100%;
  height: auto;
}

.diagram-inline :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
}

.diagram-caption {
  margin-top: var(--space-sm);
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-muted);
  font-style: italic;
}

@media (max-width: 768px) {
  .diagram-viewer {
    overflow-x: auto;
  }

  .diagram-img,
  .diagram-inline {
    min-width: 600px;
  }
}
</style>