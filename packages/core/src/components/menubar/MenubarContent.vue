<script setup lang="ts">
import type { MenubarContentProps } from './menubar.types'
import { MenubarContent as MenubarContentPrimitive, MenubarPortal } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<MenubarContentProps>(), {
  align: 'start',
  sideOffset: 8,
  alignOffset: -4,
})

const classes = computed(() =>
  cn(
    'z-50 min-w-[12rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-soft font-inter data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    props.class,
  ),
)
</script>

<template>
  <MenubarPortal>
    <MenubarContentPrimitive
      :align="align"
      :side-offset="sideOffset"
      :align-offset="alignOffset"
      :class="classes"
    >
      <slot />
    </MenubarContentPrimitive>
  </MenubarPortal>
</template>
