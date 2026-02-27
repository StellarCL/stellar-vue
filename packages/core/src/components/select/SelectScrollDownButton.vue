<script setup lang="ts">
import { computed } from 'vue'
import { SelectScrollDownButton as SelectScrollDownButtonPrimitive } from 'radix-vue'
import type { SelectScrollDownButtonProps } from './select.types'
import { cn } from '../../utils'

const props = defineProps<SelectScrollDownButtonProps>()

const classes = computed(() =>
  cn('flex cursor-default items-center justify-center py-1', props.class),
)
</script>

<template>
  <SelectScrollDownButtonPrimitive :class="classes">
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
      class="h-4 w-4"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </SelectScrollDownButtonPrimitive>
</template>
