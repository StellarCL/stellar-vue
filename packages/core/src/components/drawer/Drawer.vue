<script setup lang="ts">
import { DialogRoot } from 'radix-vue'
import type { DrawerProps } from './drawer.types'

const props = withDefaults(defineProps<DrawerProps>(), {
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DialogRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </DialogRoot>
</template>
