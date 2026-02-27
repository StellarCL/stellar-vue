<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CommandEmptyProps, CommandContext } from './command.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CommandEmptyProps>(), {})

const context = inject<CommandContext>('command')

/**
 * CommandEmpty is visible only when:
 *   - there is an active search query, AND
 *   - there are registered items, AND
 *   - none of those items match the current search.
 */
const isVisible = computed(() => {
  if (!context) return false
  // Require an active search — without a query nothing is filtered
  if (!context.search.value) return false
  const count = context.itemCount.value
  if (count === 0) return false
  // Scan enough slots to cover all registered items (items can have gaps from
  // unregistered slots, but the total length is at most 2× the count for
  // normal usage patterns).
  const scanLimit = Math.max(count * 2, count + 20)
  for (let i = 0; i < scanLimit; i++) {
    if (context.isItemVisible(i)) return false
  }
  return true
})

const classes = computed(() =>
  cn('py-6 text-center text-sm', props.class),
)
</script>

<template>
  <div v-if="isVisible" :class="classes" role="presentation">
    <slot>No results found.</slot>
  </div>
</template>
