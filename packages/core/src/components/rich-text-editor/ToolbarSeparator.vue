<script setup lang="ts">
import type { ToolbarSeparatorProps } from './rich-text-editor.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ToolbarSeparatorProps>()

const classes = computed(() =>
  cn(
    'mx-1 h-6 w-px bg-border',
    props.class,
  ),
)
</script>

<template>
  <div
    role="separator"
    aria-orientation="vertical"
    :class="classes"
  />
</template>
