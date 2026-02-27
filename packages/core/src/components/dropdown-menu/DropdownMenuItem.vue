<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuItem as DropdownMenuItemPrimitive } from 'radix-vue'
import type { DropdownMenuItemProps } from './dropdown-menu.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
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
  <DropdownMenuItemPrimitive :disabled="disabled" :class="classes">
    <slot />
  </DropdownMenuItemPrimitive>
</template>
