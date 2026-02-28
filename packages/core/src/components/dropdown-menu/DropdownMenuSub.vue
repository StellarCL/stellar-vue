<script setup lang="ts">
import type { DropdownMenuSubProps } from './dropdown-menu.types'
import { DropdownMenuSub as DropdownMenuSubPrimitive } from 'radix-vue'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<DropdownMenuSubProps>(), {
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DropdownMenuSubPrimitive
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </DropdownMenuSubPrimitive>
</template>
