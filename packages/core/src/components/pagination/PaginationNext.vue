<script setup lang="ts">
import type { PaginationNextProps } from './pagination.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<PaginationNextProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  click: []
}>()

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium font-inter transition-colors',
    'focus:outline-none focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:bg-accent hover:text-accent-foreground',
    'h-8 px-3 py-1.5',
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
    aria-label="Go to next page"
    @click="handleClick"
  >
    <span>Next</span>
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  </button>
</template>
