<script setup lang="ts">
import { computed } from 'vue'
import type { GridProps, ResponsiveCols } from './grid.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<GridProps>(), {
  cols: 1,
  gap: '4',
})

const classes = computed(() => {
  const colClasses: string[] = []

  if (typeof props.cols === 'number') {
    colClasses.push(`grid-cols-${props.cols}`)
  } else if (props.cols && typeof props.cols === 'object') {
    const responsive = props.cols as ResponsiveCols
    if (responsive.sm !== undefined) colClasses.push(`sm:grid-cols-${responsive.sm}`)
    if (responsive.md !== undefined) colClasses.push(`md:grid-cols-${responsive.md}`)
    if (responsive.lg !== undefined) colClasses.push(`lg:grid-cols-${responsive.lg}`)
    if (responsive.xl !== undefined) colClasses.push(`xl:grid-cols-${responsive.xl}`)
  }

  const rowsClass = props.rows ? `grid-rows-${props.rows}` : undefined
  const gapClass = `gap-${props.gap}`

  return cn(
    'grid',
    ...colClasses,
    gapClass,
    rowsClass,
    props.class,
  )
})
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
