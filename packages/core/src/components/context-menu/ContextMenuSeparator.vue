<script setup lang="ts">
import type { ContextMenuSeparatorProps } from './context-menu.types'
import { ContextMenuSeparator as ContextMenuSeparatorPrimitive } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ContextMenuSeparatorProps>()

const classes = computed(() => cn('-mx-1 my-1 h-px bg-slate-150 dark:bg-navy-500', props.class))
</script>

<template>
  <ContextMenuSeparatorPrimitive :class="classes" />
</template>
