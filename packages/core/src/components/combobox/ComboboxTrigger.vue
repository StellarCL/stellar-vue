<script setup lang="ts">
import type { ComboboxTriggerProps } from './combobox.types'
import { ComboboxTrigger as ComboboxTriggerPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ComboboxTriggerProps>()

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center shrink-0',
    props.class,
  ),
)
</script>

<template>
  <ComboboxTriggerPrimitive :class="classes">
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
        class="h-4 w-4 shrink-0 opacity-50"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </slot>
  </ComboboxTriggerPrimitive>
</template>
