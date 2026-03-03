<script setup lang="ts">
import type { SelectContentProps } from './select.types'
import { SelectContent as SelectContentPrimitive, SelectPortal, SelectViewport } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<SelectContentProps>(), {
  position: 'popper',
})

const classes = computed(() =>
  cn(
    'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground font-inter shadow-soft data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    props.position === 'popper'
    && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
    props.class,
  ),
)

const viewportClasses = computed(() =>
  cn(
    'p-1',
    props.position === 'popper'
    && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
  ),
)
</script>

<template>
  <SelectPortal>
    <SelectContentPrimitive :position="position" :class="classes">
      <SelectViewport :class="viewportClasses">
        <slot />
      </SelectViewport>
    </SelectContentPrimitive>
  </SelectPortal>
</template>
