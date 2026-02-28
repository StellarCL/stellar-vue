<script setup lang="ts">
import type { CommandContext, CommandGroupProps } from './command.types'
import { computed, inject, provide, ref } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CommandGroupProps>(), {})

const context = inject<CommandContext>('command')

// ── Track child item indices registered within this group ────────────────────
const childIndices = ref<Set<number>>(new Set())

function registerGroupItem(index: number): void {
  childIndices.value.add(index)
}

function unregisterGroupItem(index: number): void {
  childIndices.value.delete(index)
}

provide('command:group:registerItem', registerGroupItem)
provide('command:group:unregisterItem', unregisterGroupItem)

// ── Visibility ────────────────────────────────────────────────────────────────
// The group is hidden when all its child items are filtered out.
const isVisible = computed(() => {
  if (!context)
    return true
  if (childIndices.value.size === 0)
    return true
  for (const idx of childIndices.value) {
    if (context.isItemVisible(idx))
      return true
  }
  return false
})

const classes = computed(() =>
  cn('overflow-hidden p-1 text-foreground', props.class),
)
</script>

<template>
  <div v-show="isVisible" :class="classes" role="group">
    <div
      v-if="heading"
      class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
      aria-hidden="true"
    >
      {{ heading }}
    </div>
    <slot />
  </div>
</template>
