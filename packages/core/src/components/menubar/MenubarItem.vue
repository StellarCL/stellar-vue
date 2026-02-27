<script setup lang="ts">
import { computed } from 'vue'
import { MenubarItem as MenubarItemPrimitive } from 'radix-vue'
import type { MenubarItemProps } from './menubar.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<MenubarItemProps>(), {
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
  <MenubarItemPrimitive :disabled="disabled" :class="classes">
    <slot />
  </MenubarItemPrimitive>
</template>
