<script setup lang="ts">
import { computed } from 'vue'
import type { FileUploadProgressProps } from './file-upload.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<FileUploadProgressProps>(), {
  progress: 0,
})

const clampedProgress = computed(() => Math.min(100, Math.max(0, props.progress)))
const widthStyle = computed(() => ({ width: `${clampedProgress.value}%` }))
</script>

<template>
  <div
    :class="cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', props.class)"
    role="progressbar"
    :aria-valuenow="clampedProgress"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      class="h-full bg-primary transition-[width] duration-300 ease-in-out"
      :style="widthStyle"
    />
  </div>
</template>
