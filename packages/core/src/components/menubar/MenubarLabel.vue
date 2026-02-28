<script setup lang="ts">
import type { MenubarLabelProps } from './menubar.types'
import { MenubarLabel as MenubarLabelPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<MenubarLabelProps>(), {
  inset: false,
})

const classes = computed(() =>
  cn(
    'px-2 py-1.5 text-sm font-semibold',
    props.inset && 'pl-8',
    props.class,
  ),
)
</script>

<template>
  <MenubarLabelPrimitive :class="classes">
    <slot />
  </MenubarLabelPrimitive>
</template>
