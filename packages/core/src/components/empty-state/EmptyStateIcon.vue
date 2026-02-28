<script setup lang="ts">
import type { EmptyStateIconProps } from './empty-state.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<EmptyStateIconProps>()

const classes = computed(() =>
  cn(
    'mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:h-6 [&_svg]:w-6',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
