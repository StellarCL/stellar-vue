<script setup lang="ts">
import { computed } from 'vue'
import { ContextMenuGroup as ContextMenuGroupPrimitive } from 'radix-vue'
import type { ContextMenuGroupProps } from './context-menu.types'
import { cn } from '../../utils'

const props = defineProps<ContextMenuGroupProps>()

const classes = computed(() => cn(props.class))
</script>

<template>
  <ContextMenuGroupPrimitive :class="classes">
    <slot />
  </ContextMenuGroupPrimitive>
</template>
