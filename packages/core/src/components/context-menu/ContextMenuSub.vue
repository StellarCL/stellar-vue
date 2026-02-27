<script setup lang="ts">
import { ContextMenuSub as ContextMenuSubPrimitive } from 'radix-vue'
import type { ContextMenuSubProps } from './context-menu.types'

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
