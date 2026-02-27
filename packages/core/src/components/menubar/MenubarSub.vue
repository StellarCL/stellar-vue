<script setup lang="ts">
import { MenubarSub as MenubarSubPrimitive } from 'radix-vue'
import type { MenubarSubProps } from './menubar.types'

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
