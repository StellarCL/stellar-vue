<script setup lang="ts">
import type { GridItemProps } from './grid.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<GridItemProps>()

const classes = computed(() => {
  const colSpanClass = props.colSpan ? `col-span-${props.colSpan}` : undefined
  const rowSpanClass = props.rowSpan ? `row-span-${props.rowSpan}` : undefined

  return cn(
    colSpanClass,
    rowSpanClass,
    props.class,
  )
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
