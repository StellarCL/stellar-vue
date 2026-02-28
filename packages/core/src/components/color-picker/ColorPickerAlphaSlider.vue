<script setup lang="ts">
import type { ColorPickerAlphaSliderProps, ColorPickerContext } from './color-picker.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ColorPickerAlphaSliderProps>()
const context = inject<ColorPickerContext>('color-picker-context')!

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  context.setAlpha(Number(target.value) / 100)
}

const alphaBackground = computed(() =>
  `linear-gradient(to right, transparent, ${context.hexValue})`,
)

const classes = computed(() =>
  cn('color-picker-alpha-slider h-3 w-full cursor-pointer appearance-none rounded-full', props.class),
)
</script>

<template>
  <input
    type="range"
    min="0"
    max="100"
    :value="Math.round(context.alpha * 100)"
    :class="classes"
    :style="{ background: alphaBackground }"
    aria-label="Alpha"
    @input="handleInput"
  >
</template>
