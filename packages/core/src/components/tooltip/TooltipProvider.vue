<script setup lang="ts">
import type { TooltipProviderProps } from './tooltip.types'
import { TooltipProvider } from 'radix-vue'

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 200,
  skipDelayDuration: 300,
})
</script>

<template>
  <TooltipProvider
    :delay-duration="props.delayDuration"
    :skip-delay-duration="props.skipDelayDuration"
  >
    <slot />
  </TooltipProvider>
</template>
