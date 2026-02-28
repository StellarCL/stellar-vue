<script setup lang="ts">
import type { EmptyStateProps } from './empty-state.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<EmptyStateProps>()

const classes = computed(() =>
  cn(
    'flex flex-col items-center justify-center px-4 py-12 text-center',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
