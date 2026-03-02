<script setup lang="ts">
import type { DropdownMenuContentProps } from './dropdown-menu.types'
import { DropdownMenuContent as DropdownMenuContentPrimitive, DropdownMenuPortal } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
  sideOffset: 4,
})

const classes = computed(() =>
  cn(
    'z-50 min-w-[8rem] overflow-hidden rounded-lg border border-slate-150 bg-white p-1 text-popover-foreground shadow-soft font-inter dark:border-navy-500 dark:bg-navy-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    props.class,
  ),
)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContentPrimitive :side-offset="sideOffset" :class="classes">
      <slot />
    </DropdownMenuContentPrimitive>
  </DropdownMenuPortal>
</template>
