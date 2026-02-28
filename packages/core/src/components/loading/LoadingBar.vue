<script setup lang="ts">
import type { LoadingBarProps } from './loading.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<LoadingBarProps>(), {
  progress: undefined,
})

const isDeterminate = computed(() => props.progress !== undefined)

const barStyle = computed(() => {
  if (isDeterminate.value) {
    return { width: `${Math.min(100, Math.max(0, props.progress ?? 0))}%` }
  }
  return {}
})

const barClass = computed(() =>
  cn(
    'h-full bg-primary transition-all duration-300',
    !isDeterminate.value && 'loading-bar-indeterminate',
  ),
)
</script>

<template>
  <div
    :class="cn('fixed top-0 left-0 right-0 z-50 h-1 w-full bg-primary/20', props.class)"
    role="progressbar"
    :aria-valuenow="isDeterminate ? progress : undefined"
    :aria-valuemin="isDeterminate ? 0 : undefined"
    :aria-valuemax="isDeterminate ? 100 : undefined"
    aria-label="Loading"
  >
    <div :class="barClass" :style="barStyle" />
  </div>
</template>

<style scoped>
@keyframes loading-bar-slide {
  0% {
    transform: translateX(-100%);
    width: 40%;
  }
  50% {
    transform: translateX(100%);
    width: 60%;
  }
  100% {
    transform: translateX(300%);
    width: 40%;
  }
}

.loading-bar-indeterminate {
  width: 40%;
  animation: loading-bar-slide 1.5s ease-in-out infinite;
}
</style>
