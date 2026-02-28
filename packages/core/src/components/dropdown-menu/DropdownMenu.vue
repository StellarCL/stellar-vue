<script setup lang="ts">
import type { DropdownMenuProps } from './dropdown-menu.types'
import { DropdownMenuRoot } from 'radix-vue'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<DropdownMenuProps>(), {
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DropdownMenuRoot
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </DropdownMenuRoot>
</template>
