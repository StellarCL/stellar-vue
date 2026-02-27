<script setup lang="ts">
import { computed } from 'vue'
import type { EmptyStateActionProps } from './empty-state.types'
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
