<script setup lang="ts">
import { DropdownMenuRoot } from 'radix-vue'
import type { DropdownMenuProps } from './dropdown-menu.types'

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
