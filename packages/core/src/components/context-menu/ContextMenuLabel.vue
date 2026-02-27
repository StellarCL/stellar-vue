<script setup lang="ts">
import { computed } from 'vue'
import { ContextMenuLabel as ContextMenuLabelPrimitive } from 'radix-vue'
import type { ContextMenuLabelProps } from './context-menu.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ContextMenuLabelProps>(), {
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
  <ContextMenuLabelPrimitive :class="classes">
    <slot />
  </ContextMenuLabelPrimitive>
</template>
