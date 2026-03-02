<script setup lang="ts">
import type { DropdownMenuItemProps } from './dropdown-menu.types'
import { DropdownMenuItem as DropdownMenuItemPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
  inset: false,
  disabled: false,
})

const classes = computed(() =>
  cn(
    'relative flex h-8 cursor-default select-none items-center rounded-sm px-3 text-sm outline-none transition-colors focus:bg-primary/10 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
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
