<script setup lang="ts">
import { PopoverTrigger } from 'radix-vue'
import type { PopoverTriggerProps } from './popover.types'

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <PopoverTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </PopoverTrigger>
</template>
