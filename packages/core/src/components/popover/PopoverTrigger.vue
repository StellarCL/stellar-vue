<script setup lang="ts">
import type { PopoverTriggerProps } from './popover.types'
import { PopoverTrigger } from 'radix-vue'

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <PopoverTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </PopoverTrigger>
</template>
