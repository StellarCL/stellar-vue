<script setup lang="ts">
import type { TooltipTriggerProps } from './tooltip.types'
import { TooltipTrigger } from 'radix-vue'

const props = withDefaults(defineProps<TooltipTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <TooltipTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </TooltipTrigger>
</template>
