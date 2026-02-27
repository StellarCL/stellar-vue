<script setup lang="ts">
import { TooltipProvider } from 'radix-vue'
import type { TooltipProviderProps } from './tooltip.types'

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
