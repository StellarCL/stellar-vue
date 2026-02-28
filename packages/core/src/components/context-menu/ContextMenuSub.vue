<script setup lang="ts">
import type { ContextMenuSubProps } from './context-menu.types'
import { ContextMenuSub as ContextMenuSubPrimitive } from 'radix-vue'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<ContextMenuSubProps>(), {
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <ContextMenuSubPrimitive
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </ContextMenuSubPrimitive>
</template>
