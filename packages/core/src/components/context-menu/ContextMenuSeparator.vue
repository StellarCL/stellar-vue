<script setup lang="ts">
import { computed } from 'vue'
import { ContextMenuSeparator as ContextMenuSeparatorPrimitive } from 'radix-vue'
import type { ContextMenuSeparatorProps } from './context-menu.types'
import { cn } from '../../utils'

const props = defineProps<ContextMenuSeparatorProps>()

const classes = computed(() => cn('-mx-1 my-1 h-px bg-muted', props.class))
</script>

<template>
  <ContextMenuSeparatorPrimitive :class="classes" />
</template>
