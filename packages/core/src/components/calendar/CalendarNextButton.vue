<script setup lang="ts">
import { computed } from 'vue'
import { CalendarNext } from 'radix-vue'
import type { CalendarNextButtonProps } from './calendar.types'
import { cn } from '../../utils'

const props = defineProps<CalendarNextButtonProps>()

const classes = computed(() =>
  cn(
    'inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium ring-offset-background transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    props.class,
  ),
)
</script>

<template>
  <CalendarNext :class="classes">
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
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </slot>
  </CalendarNext>
</template>
