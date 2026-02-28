<script setup lang="ts">
import type { DropdownMenuTriggerProps } from './dropdown-menu.types'
import { DropdownMenuTrigger as DropdownMenuTriggerPrimitive } from 'radix-vue'

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <DropdownMenuTriggerPrimitive :as-child="asChild" :class="props.class">
    <slot />
  </DropdownMenuTriggerPrimitive>
</template>
