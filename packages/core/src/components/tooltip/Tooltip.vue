<script setup lang="ts">
import type { TooltipProps } from './tooltip.types'
import { TooltipRoot } from 'radix-vue'

const props = withDefaults(defineProps<TooltipProps>(), {})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <TooltipRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </TooltipRoot>
</template>
