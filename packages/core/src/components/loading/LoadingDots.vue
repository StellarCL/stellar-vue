<script setup lang="ts">
import type { LoadingDotsProps } from './loading.types'
import { computed } from 'vue'
import { cn } from '../../utils'
import { loadingDotVariants } from './loading.variants'

const props = withDefaults(defineProps<LoadingDotsProps>(), {
  size: 'md',
})

const dotClass = computed(() => loadingDotVariants({ size: props.size }))
</script>

<template>
  <div
    :class="cn('flex items-center gap-1', props.class)"
    role="status"
    aria-label="Loading"
  >
    <span :class="dotClass" style="animation-delay: 0ms" />
    <span :class="dotClass" style="animation-delay: 150ms" />
    <span :class="dotClass" style="animation-delay: 300ms" />
  </div>
</template>
