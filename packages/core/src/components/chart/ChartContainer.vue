<script setup lang="ts">
import type { ChartContainerProps } from './chart.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ChartContainerProps>(), {
  responsive: true,
})
</script>

<template>
  <div
    :class="cn(
      'chart-container relative',
      props.responsive ? 'w-full' : 'inline-block',
      props.class,
    )"
    data-chart-container
  >
    <slot />
  </div>
</template>
