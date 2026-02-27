<script setup lang="ts">
import { PopoverRoot } from 'radix-vue'
import type { PopoverProps } from './popover.types'

const props = withDefaults(defineProps<PopoverProps>(), {})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <PopoverRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </PopoverRoot>
</template>
