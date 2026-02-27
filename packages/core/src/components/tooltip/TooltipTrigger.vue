<script setup lang="ts">
import { TooltipTrigger } from 'radix-vue'
import type { TooltipTriggerProps } from './tooltip.types'

const props = withDefaults(defineProps<TooltipTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <TooltipTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </TooltipTrigger>
</template>
