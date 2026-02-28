<script setup lang="ts">
import type { ContextMenuItemProps } from './context-menu.types'
import { ContextMenuItem as ContextMenuItemPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ContextMenuItemProps>(), {
  inset: false,
  disabled: false,
})

const classes = computed(() =>
  cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.inset && 'pl-8',
    props.class,
  ),
)
</script>

<template>
  <ContextMenuItemPrimitive :disabled="disabled" :class="classes">
    <slot />
  </ContextMenuItemPrimitive>
</template>
