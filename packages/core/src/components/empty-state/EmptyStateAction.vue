<script setup lang="ts">
import type { EmptyStateActionProps } from './empty-state.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<EmptyStateActionProps>()

const classes = computed(() =>
  cn('flex gap-2', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
