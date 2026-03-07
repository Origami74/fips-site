<template>
  <div class="terminal">
    <div class="terminal-bar">
      <div class="terminal-dots" aria-hidden="true">
        <span class="dot dot--red"></span>
        <span class="dot dot--yellow"></span>
        <span class="dot dot--green"></span>
      </div>
      <span v-if="title" class="terminal-title">{{ title }}</span>
    </div>
    <div class="terminal-body">
      <div
        v-for="(line, i) in lines"
        :key="i"
        class="terminal-line"
      >
        <template v-if="line === ''">
          <span class="terminal-blank">&nbsp;</span>
        </template>
        <template v-else-if="isCommand(line)">
          <span class="terminal-prompt" aria-hidden="true">{{ prompt }}</span><span class="terminal-cmd">{{ stripPrompt(line) }}</span>
        </template>
        <template v-else>
          <span class="terminal-out">{{ line }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  lines: string[]
  prompt?: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  prompt: '$ ',
})

function isCommand(line: string): boolean {
  return line.startsWith(props.prompt)
}

function stripPrompt(line: string): string {
  return line.startsWith(props.prompt) ? line.slice(props.prompt.length) : line
}
</script>

<style scoped>
.terminal {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  background-color: #0a0e14;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  width: 100%;
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 8px 12px;
  background-color: #111520;
  border-bottom: 1px solid var(--border-subtle);
}

.terminal-dots {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot--red    { background-color: #ff5f57; }
.dot--yellow { background-color: #febc2e; }
.dot--green  { background-color: #28c840; }

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 0.6875rem;
  color: var(--text-muted);
  letter-spacing: 0.03em;
  /* offset for the dots width to visually center */
  padding-right: 50px;
}

.terminal-body {
  padding: 14px 16px;
  line-height: 1.65;
}

.terminal-line {
  display: block;
}

.terminal-blank {
  display: block;
  height: 0.5em;
}

.terminal-prompt {
  color: #40a060;
  user-select: none;
}

.terminal-cmd {
  color: #e0e0e0;
}

.terminal-out {
  color: #707090;
}
</style>