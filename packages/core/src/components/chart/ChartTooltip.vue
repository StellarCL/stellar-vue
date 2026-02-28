<script setup lang="ts">
import type { ChartTooltipProps } from './chart.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ChartTooltipProps>(), {
  backgroundColor: 'hsl(0 0% 100%)',
  titleColor: 'hsl(222.2 84% 4.9%)',
  bodyColor: 'hsl(215.4 16.3% 46.9%)',
})
</script>

<template>
  <div
    :class="cn(
      'chart-tooltip rounded-md border border-border bg-background px-3 py-2 shadow-md text-sm',
      props.class,
    )"
    data-chart-tooltip
  >
    <slot />
  </div>
</template>
