<script setup lang="ts">
import type { ToolbarGroupProps } from './rich-text-editor.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ToolbarGroupProps>()

const classes = computed(() =>
  cn(
    'flex items-center gap-0.5',
    props.class,
  ),
)
</script>

<template>
  <div role="group" :class="classes">
    <slot />
  </div>
</template>
