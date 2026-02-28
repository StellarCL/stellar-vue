<script setup lang="ts">
import type { CarouselContentProps, CarouselContext } from './carousel.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CarouselContentProps>()
const context = inject<CarouselContext>('carousel-context')!

const transformStyle = computed(() => {
  const offset = context.currentIndex * -100
  if (context.orientation === 'vertical') {
    return { transform: `translateY(${offset}%)` }
  }
  return { transform: `translateX(${offset}%)` }
})

const classes = computed(() =>
  cn(
    'flex transition-transform duration-300 ease-in-out',
    context.orientation === 'vertical' ? 'flex-col' : '',
    props.class,
  ),
)
</script>

<template>
  <div class="overflow-hidden">
    <div :class="classes" :style="transformStyle">
      <slot />
    </div>
  </div>
</template>
