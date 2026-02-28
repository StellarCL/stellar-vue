<script setup lang="ts">
import type { ChartLegendProps } from './chart.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ChartLegendProps>(), {
  position: 'bottom',
  items: () => [],
})
</script>

<template>
  <div
    :class="cn(
      'chart-legend flex flex-wrap gap-3 text-sm text-muted-foreground',
      props.position === 'top' && 'mb-3',
      props.position === 'bottom' && 'mt-3',
      props.position === 'left' && 'flex-col mr-3',
      props.position === 'right' && 'flex-col ml-3',
      props.class,
    )"
    data-chart-legend
  >
    <div
      v-for="item in items"
      :key="item.label"
      class="flex items-center gap-1.5"
    >
      <span
        class="inline-block h-3 w-3 rounded-full flex-shrink-0"
        :style="{ backgroundColor: item.color }"
      />
      <span>{{ item.label }}</span>
    </div>
    <slot />
  </div>
</template>
