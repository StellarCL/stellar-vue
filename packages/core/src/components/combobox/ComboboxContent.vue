<script setup lang="ts">
import type { ComboboxContentProps } from './combobox.types'
import {
  ComboboxContent as ComboboxContentPrimitive,
  ComboboxPortal,
  ComboboxViewport,
} from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ComboboxContentProps>(), {
  position: 'popper',
  side: 'bottom',
  sideOffset: 4,
})

const classes = computed(() =>
  cn(
    'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    props.position === 'popper'
    && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
    props.class,
  ),
)

const viewportClasses = computed(() =>
  cn(
    'p-1',
    props.position === 'popper'
    && 'w-full min-w-[var(--radix-combobox-trigger-width)]',
  ),
)
</script>

<template>
  <ComboboxPortal>
    <ComboboxContentPrimitive
      :position="position"
      :side="side"
      :side-offset="sideOffset"
      :class="classes"
    >
      <ComboboxViewport :class="viewportClasses">
        <slot />
      </ComboboxViewport>
    </ComboboxContentPrimitive>
  </ComboboxPortal>
</template>
