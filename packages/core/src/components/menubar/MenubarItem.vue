<script setup lang="ts">
import type { MenubarItemProps } from './menubar.types'
import { MenubarItem as MenubarItemPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<MenubarItemProps>(), {
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
  <MenubarItemPrimitive :disabled="disabled" :class="classes">
    <slot />
  </MenubarItemPrimitive>
</template>
