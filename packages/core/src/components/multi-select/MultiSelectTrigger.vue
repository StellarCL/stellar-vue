<script setup lang="ts">
import type { MultiSelectTriggerProps } from './multi-select.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'

const props = defineProps<MultiSelectTriggerProps>()

const context = inject<any>('multiSelectContext')

const classes = computed(() =>
  cn(
    'flex min-h-10 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
    context?.disabled?.value && 'cursor-not-allowed opacity-50',
    props.class,
  ),
)
</script>

<template>
  <div
    role="combobox"
    :aria-expanded="context?.open?.value"
    :aria-disabled="context?.disabled?.value || undefined"
    :class="classes"
    data-multi-select-trigger
    @click="context?.handleTriggerClick()"
  >
    <slot />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="ml-auto h-4 w-4 shrink-0 opacity-50"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
</template>
