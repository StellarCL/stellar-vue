<script setup lang="ts">
import type { LoadingProps } from './loading.types'
import { computed } from 'vue'
import { cn } from '../../utils'
import { Skeleton } from '../skeleton'
import { loadingWrapperVariants } from './loading.variants'
import LoadingBar from './LoadingBar.vue'
import LoadingDots from './LoadingDots.vue'
import LoadingOverlay from './LoadingOverlay.vue'
import LoadingSpinner from './LoadingSpinner.vue'

const props = withDefaults(defineProps<LoadingProps>(), {
  variant: 'spinner',
  size: 'md',
  overlay: false,
  fullscreen: false,
})

const wrapperClass = computed(() =>
  cn(loadingWrapperVariants({ size: props.size }), props.class),
)

const textSizeClass = computed(() => {
  if (props.size === 'sm')
    return 'text-xs text-muted-foreground'
  if (props.size === 'lg')
    return 'text-base text-muted-foreground'
  return 'text-sm text-muted-foreground'
})
</script>

<template>
  <!-- Bar variant: renders as a top-fixed bar, not in the overlay pattern -->
  <LoadingBar
    v-if="variant === 'bar'"
    :progress="progress"
    :class="props.class"
  />

  <!-- Overlay wrapping mode -->
  <LoadingOverlay
    v-else-if="overlay || fullscreen"
    :fullscreen="fullscreen"
    :class="props.class"
  >
    <div :class="wrapperClass">
      <LoadingSpinner v-if="variant === 'spinner'" :size="size" />
      <LoadingDots v-else-if="variant === 'dots'" :size="size" />
      <div
        v-else-if="variant === 'skeleton'"
        class="w-48 space-y-2"
      >
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-3/4" />
        <Skeleton class="h-4 w-1/2" />
      </div>
      <span v-if="text" :class="textSizeClass">{{ text }}</span>
    </div>
  </LoadingOverlay>

  <!-- Inline mode -->
  <div
    v-else
    :class="wrapperClass"
    role="status"
    aria-label="Loading"
    aria-live="polite"
  >
    <LoadingSpinner v-if="variant === 'spinner'" :size="size" />
    <LoadingDots v-else-if="variant === 'dots'" :size="size" />
    <div
      v-else-if="variant === 'skeleton'"
      class="w-48 space-y-2"
    >
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-3/4" />
      <Skeleton class="h-4 w-1/2" />
    </div>
    <span v-if="text" :class="textSizeClass">{{ text }}</span>
  </div>
</template>
