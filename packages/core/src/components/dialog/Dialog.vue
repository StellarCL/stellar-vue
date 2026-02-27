<script setup lang="ts">
import { DialogRoot } from 'radix-vue'
import type { DialogProps } from './dialog.types'

const props = withDefaults(defineProps<DialogProps>(), {
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
