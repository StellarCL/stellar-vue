<script setup lang="ts">
import type { ContextMenuProps } from './context-menu.types'
import { ContextMenuRoot } from 'radix-vue'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<ContextMenuProps>(), {
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <ContextMenuRoot
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </ContextMenuRoot>
</template>
