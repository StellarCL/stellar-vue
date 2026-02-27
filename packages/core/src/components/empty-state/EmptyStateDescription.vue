<script setup lang="ts">
import { computed } from 'vue'
import type { EmptyStateDescriptionProps } from './empty-state.types'
import { cn } from '../../utils'

const props = defineProps<EmptyStateDescriptionProps>()

const classes = computed(() =>
  cn('mb-4 max-w-sm text-sm text-muted-foreground', props.class),
)
</script>

<template>
  <p :class="classes">
    <slot />
  </p>
</template>
