<script setup lang="ts">
import { MenubarMenu as MenubarMenuPrimitive } from 'radix-vue'
import type { MenubarMenuProps } from './menubar.types'

const props = defineProps<MenubarMenuProps>()
</script>

<template>
  <MenubarMenuPrimitive :value="value">
    <slot />
  </MenubarMenuPrimitive>
</template>
