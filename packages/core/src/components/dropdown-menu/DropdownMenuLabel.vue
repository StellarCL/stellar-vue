<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuLabel as DropdownMenuLabelPrimitive } from 'radix-vue'
import type { DropdownMenuLabelProps } from './dropdown-menu.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DropdownMenuLabelProps>(), {
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
  <DropdownMenuLabelPrimitive :class="classes">
    <slot />
  </DropdownMenuLabelPrimitive>
</template>
