<script setup lang="ts">
import type { PaginationLastProps } from './pagination.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<PaginationLastProps>(), {
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
    'h-10 w-10',
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
    aria-label="Go to last page"
    @click="handleClick"
  >
    <slot>
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
        <path d="m6 17 5-5-5-5" />
        <path d="m13 17 5-5-5-5" />
      </svg>
    </slot>
  </button>
</template>
