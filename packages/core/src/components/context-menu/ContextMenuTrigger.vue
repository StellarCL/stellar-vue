<script setup lang="ts">
import type { ContextMenuTriggerProps } from './context-menu.types'
import { ContextMenuTrigger as ContextMenuTriggerPrimitive } from 'radix-vue'

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <ContextMenuTriggerPrimitive :as-child="asChild" :class="props.class">
    <slot />
  </ContextMenuTriggerPrimitive>
</template>
