<script setup lang="ts">
import type { MenubarMenuProps } from './menubar.types'
import { MenubarMenu as MenubarMenuPrimitive } from 'radix-vue'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps<MenubarMenuProps>()
</script>

<template>
  <MenubarMenuPrimitive :value="value">
    <slot />
  </MenubarMenuPrimitive>
</template>
