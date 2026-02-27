<script setup lang="ts">
import { DropdownMenuTrigger as DropdownMenuTriggerPrimitive } from 'radix-vue'
import type { DropdownMenuTriggerProps } from './dropdown-menu.types'

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <DropdownMenuTriggerPrimitive :as-child="asChild" :class="props.class">
    <slot />
  </DropdownMenuTriggerPrimitive>
</template>
