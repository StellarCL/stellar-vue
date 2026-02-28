<script setup lang="ts">
import type { StackProps } from './stack.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<StackProps>(), {
  direction: 'vertical',
  gap: '4',
  wrap: false,
  as: 'div',
})

const classes = computed(() => {
  const directionClass = props.direction === 'horizontal' ? 'flex-row' : 'flex-col'
  const gapClass = `gap-${props.gap}`
  const alignClass = props.align ? `items-${props.align}` : undefined
  const justifyClass = props.justify ? `justify-${props.justify}` : undefined
  const wrapClass = props.wrap ? 'flex-wrap' : undefined

  return cn(
    'flex',
    directionClass,
    gapClass,
    alignClass,
    justifyClass,
    wrapClass,
    props.class,
  )
})
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
