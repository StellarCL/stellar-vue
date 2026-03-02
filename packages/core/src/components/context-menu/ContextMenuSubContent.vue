<script setup lang="ts">
import type { ContextMenuSubContentProps } from './context-menu.types'
import {
  ContextMenuPortal,
  ContextMenuSubContent as ContextMenuSubContentPrimitive,
} from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ContextMenuSubContentProps>()

const classes = computed(() =>
  cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-lg border border-slate-150 bg-white p-1 text-popover-foreground shadow-soft font-inter dark:border-navy-500 dark:bg-navy-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    props.class,
  ),
)
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuSubContentPrimitive :class="classes">
      <slot />
    </ContextMenuSubContentPrimitive>
  </ContextMenuPortal>
</template>
