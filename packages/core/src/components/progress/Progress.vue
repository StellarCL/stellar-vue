<script setup lang="ts">
import { computed } from 'vue'
import { ProgressRoot, ProgressIndicator } from 'radix-vue'
import type { ProgressProps } from './progress.types'
import { progressVariants } from './progress.variants'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ProgressProps>(), {
  modelValue: 0,
  max: 100,
  variant: 'default',
})

const indicatorStyle = computed(() => {
  const percentage = (props.modelValue / props.max) * 100
  return { width: `${percentage}%` }
})

const indicatorClasses = computed(() =>
  cn(progressVariants({ variant: props.variant })),
)
</script>

<template>
  <ProgressRoot
    :model-value="props.modelValue"
    :max="props.max"
    :class="cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', props.class)"
  >
    <ProgressIndicator :class="indicatorClasses" :style="indicatorStyle" />
  </ProgressRoot>
</template>
