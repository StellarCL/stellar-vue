<script setup lang="ts">
import type { PaginationPreviousProps } from './pagination.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<PaginationPreviousProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  click: []
}>()

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:bg-accent hover:text-accent-foreground',
    'h-10 px-4 py-2',
    props.class,
  ),
)

function handleClick() {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <button
    type="button"
    :class="classes"
    :disabled="props.disabled"
    aria-label="Go to previous page"
    @click="handleClick"
  >
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
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
    <span>Previous</span>
  </button>
</template>
