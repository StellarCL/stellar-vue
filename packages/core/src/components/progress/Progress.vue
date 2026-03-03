<script setup lang="ts">
import type { ProgressProps } from './progress.types'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'
import { progressVariants } from './progress.variants'

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: 0,
  max: 100,
  variant: 'default',
})

const indicatorStyle = computed(() => {
  const percentage = (props.modelValue / props.max) * 100
  return { width: `${percentage}%` }
})

const indicatorClasses = computed(() => cn(progressVariants({ variant: props.variant })))
</script>

<template>
  <ProgressRoot
    :model-value="props.modelValue"
    :max="props.max"
    :class="cn('relative h-2 w-full overflow-hidden rounded-full bg-muted', props.class)"
  >
    <ProgressIndicator :class="indicatorClasses" :style="indicatorStyle" />
  </ProgressRoot>
</template>
