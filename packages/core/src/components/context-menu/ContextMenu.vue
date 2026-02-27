<script setup lang="ts">
import { ContextMenuRoot } from 'radix-vue'
import type { ContextMenuProps } from './context-menu.types'

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
