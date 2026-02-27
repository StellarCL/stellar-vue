<script setup lang="ts">
import { computed } from 'vue'
import { MenubarGroup as MenubarGroupPrimitive } from 'radix-vue'
import type { MenubarGroupProps } from './menubar.types'
import { cn } from '../../utils'

const props = defineProps<MenubarGroupProps>()

const classes = computed(() => cn(props.class))
</script>

<template>
  <MenubarGroupPrimitive :class="classes">
    <slot />
  </MenubarGroupPrimitive>
</template>
