<script setup lang="ts">
import type { LoadingOverlayProps } from './loading.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<LoadingOverlayProps>(), {
  fullscreen: false,
})
</script>

<template>
  <div
    :class="cn(
      'flex items-center justify-center bg-background/80 backdrop-blur-sm z-50',
      props.fullscreen ? 'fixed inset-0' : 'absolute inset-0',
      props.class,
    )"
    role="status"
    aria-label="Loading"
    aria-live="polite"
  >
    <slot />
  </div>
</template>
