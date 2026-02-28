<script setup lang="ts">
import type { CarouselContext, CarouselItemProps } from './carousel.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CarouselItemProps>()
const context = inject<CarouselContext>('carousel-context')!

const slideIndex = context.registerSlide()

const classes = computed(() =>
  cn('min-w-0 shrink-0 grow-0 basis-full', props.class),
)
</script>

<template>
  <div
    :class="classes"
    role="group"
    aria-roledescription="slide"
    :aria-label="`Slide ${slideIndex + 1} of ${context.totalSlides}`"
  >
    <slot />
  </div>
</template>
