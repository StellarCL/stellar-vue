<script setup lang="ts">
import { computed } from 'vue'
import {
  TooltipPortal,
  TooltipContent as TooltipContentPrimitive,
} from 'radix-vue'
import type { TooltipContentProps } from './tooltip.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<TooltipContentProps>(), {
  side: 'top',
  align: 'center',
  sideOffset: 4,
})

const classes = computed(() =>
  cn(
    'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    props.class,
  ),
)
</script>

<template>
  <TooltipPortal>
    <TooltipContentPrimitive
      :side="props.side"
      :align="props.align"
      :side-offset="props.sideOffset"
      :class="classes"
    >
      <slot />
    </TooltipContentPrimitive>
  </TooltipPortal>
</template>
