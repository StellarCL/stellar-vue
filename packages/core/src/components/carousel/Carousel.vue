<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, reactive, ref, watch } from 'vue'
import type { CarouselProps, CarouselContext } from './carousel.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CarouselProps>(), {
  autoPlay: false,
  autoPlayInterval: 5000,
  loop: false,
  orientation: 'horizontal',
})

const currentIndex = ref(0)
const totalSlides = ref(0)
let slideCounter = 0
let autoPlayTimer: ReturnType<typeof setInterval> | null = null

const canScrollPrev = computed(() =>
  props.loop ? true : currentIndex.value > 0,
)

const canScrollNext = computed(() =>
  props.loop ? true : currentIndex.value < totalSlides.value - 1,
)

function scrollPrev() {
  if (totalSlides.value === 0) return
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else if (props.loop) {
    currentIndex.value = totalSlides.value - 1
  }
}

function scrollNext() {
  if (totalSlides.value === 0) return
  if (currentIndex.value < totalSlides.value - 1) {
    currentIndex.value++
  } else if (props.loop) {
    currentIndex.value = 0
  }
}

function scrollTo(index: number) {
  if (index >= 0 && index < totalSlides.value) {
    currentIndex.value = index
  }
}

function registerSlide(): number {
  const index = slideCounter++
  totalSlides.value = slideCounter
  return index
}

function startAutoPlay() {
  if (props.autoPlay && !autoPlayTimer) {
    autoPlayTimer = setInterval(() => {
      scrollNext()
    }, props.autoPlayInterval)
  }
}

function stopAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

watch(() => props.autoPlay, (val) => {
  if (val) startAutoPlay()
  else stopAutoPlay()
})

onMounted(() => {
  if (props.autoPlay) startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})

const context = reactive({
  currentIndex,
  totalSlides,
  orientation: computed(() => props.orientation),
  canScrollPrev,
  canScrollNext,
  scrollPrev,
  scrollNext,
  scrollTo,
  registerSlide,
}) as unknown as CarouselContext

provide('carousel-context', context)

const classes = computed(() =>
  cn('relative overflow-hidden', props.class),
)
</script>

<template>
  <div
    :class="classes"
    role="region"
    aria-roledescription="carousel"
    @mouseenter="stopAutoPlay"
    @mouseleave="autoPlay ? startAutoPlay() : undefined"
  >
    <slot />
    <div
      v-if="totalSlides > 1"
      class="flex justify-center gap-1.5 pt-2"
      role="tablist"
    >
      <button
        v-for="i in totalSlides"
        :key="i"
        :class="cn(
          'h-2 w-2 rounded-full transition-colors',
          currentIndex === i - 1 ? 'bg-primary' : 'bg-muted-foreground/30',
        )"
        role="tab"
        :aria-selected="currentIndex === i - 1"
        :aria-label="`Go to slide ${i}`"
        @click="scrollTo(i - 1)"
      />
    </div>
  </div>
</template>
