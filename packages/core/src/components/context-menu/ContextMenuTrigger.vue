<script setup lang="ts">
import { ContextMenuTrigger as ContextMenuTriggerPrimitive } from 'radix-vue'
import type { ContextMenuTriggerProps } from './context-menu.types'

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <ContextMenuTriggerPrimitive :as-child="asChild" :class="props.class">
    <slot />
  </ContextMenuTriggerPrimitive>
</template>
