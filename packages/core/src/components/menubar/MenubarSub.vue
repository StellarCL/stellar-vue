<script setup lang="ts">
import type { MenubarSubProps } from './menubar.types'
import { MenubarSub as MenubarSubPrimitive } from 'radix-vue'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = withDefaults(defineProps<MenubarSubProps>(), {
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <MenubarSubPrimitive
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </MenubarSubPrimitive>
</template>
