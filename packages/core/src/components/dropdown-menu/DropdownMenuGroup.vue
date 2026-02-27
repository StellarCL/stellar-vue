<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuGroup as DropdownMenuGroupPrimitive } from 'radix-vue'
import type { DropdownMenuGroupProps } from './dropdown-menu.types'
import { cn } from '../../utils'

const props = defineProps<DropdownMenuGroupProps>()

const classes = computed(() => cn(props.class))
</script>

<template>
  <DropdownMenuGroupPrimitive :class="classes">
    <slot />
  </DropdownMenuGroupPrimitive>
</template>
