<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title?: string
}>()

const isDark = ref(false)
const showCode = ref(false)
</script>

<template>
  <div class="component-preview">
    <div v-if="title" class="preview-header">
      <span>{{ title }}</span>
      <div class="preview-actions">
        <button class="preview-toggle" @click="isDark = !isDark">
          {{ isDark ? 'Light' : 'Dark' }}
        </button>
        <button class="preview-toggle" @click="showCode = !showCode">
          {{ showCode ? 'Hide' : 'Show' }} Code
        </button>
      </div>
    </div>
    <div class="preview-area" :class="{ dark: isDark }">
      <slot />
    </div>
    <div v-if="showCode" class="preview-code">
      <slot name="code" />
    </div>
  </div>
</template>

<style scoped>
.component-preview {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  font-size: 14px;
  font-weight: 500;
}

.preview-actions {
  display: flex;
  gap: 8px;
}

.preview-toggle {
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.preview-toggle:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.preview-area {
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-bg);
  min-height: 80px;
}

.preview-area.dark {
  background-color: var(--color-background);
  color: var(--color-foreground);
}

.preview-code {
  border-top: 1px solid var(--vp-c-divider);
}

.preview-code :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
  border: none;
}
</style>
