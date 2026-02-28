<script setup lang="ts">
import type { DatePickerInputProps } from './date-picker.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DatePickerInputProps>(), {
  placeholder: 'Pick a date',
  disabled: false,
})

const classes = computed(() =>
  cn(
    'flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    !props.displayValue && 'text-muted-foreground',
    props.class,
  ),
)
</script>

<template>
  <button
    type="button"
    :disabled="props.disabled"
    :class="classes"
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
      class="mr-2 h-4 w-4"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
    <span>{{ props.displayValue || props.placeholder }}</span>
  </button>
</template>
