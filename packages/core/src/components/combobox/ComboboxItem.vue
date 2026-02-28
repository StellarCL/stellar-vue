<script setup lang="ts">
import type { ComboboxItemProps } from './combobox.types'
import { ComboboxItemIndicator, ComboboxItem as ComboboxItemPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ComboboxItemProps>(), {
  disabled: false,
})

const classes = computed(() =>
  cn(
    'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.class,
  ),
)
</script>

<template>
  <ComboboxItemPrimitive :value="value" :disabled="disabled" :class="classes">
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ComboboxItemIndicator>
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
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </ComboboxItemIndicator>
    </span>
    <slot />
  </ComboboxItemPrimitive>
</template>
