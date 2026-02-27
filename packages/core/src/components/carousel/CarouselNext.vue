<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CarouselNextProps, CarouselContext } from './carousel.types'
import { cn } from '../../utils'

const props = defineProps<CarouselNextProps>()
const context = inject<CarouselContext>('carousel-context')!

const classes = computed(() =>
  cn(
    'absolute right-2 top-1/2 z-10 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50',
    context.orientation === 'vertical' ? 'bottom-2 left-1/2 right-auto top-auto -translate-x-1/2 translate-y-0 rotate-90' : '',
    props.class,
  ),
)
</script>

<template>
  <button
    :class="classes"
    :disabled="!context.canScrollNext"
    aria-label="Next slide"
    @click="context.scrollNext()"
  >
    <slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </slot>
  </button>
</template>
