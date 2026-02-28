<script setup lang="ts">
import type { ColorPickerContext, ColorPickerHueSliderProps } from './color-picker.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ColorPickerHueSliderProps>()
const context = inject<ColorPickerContext>('color-picker-context')!

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  context.setHue(Number(target.value))
}

const classes = computed(() =>
  cn('color-picker-hue-slider h-3 w-full cursor-pointer appearance-none rounded-full', props.class),
)
</script>

<template>
  <input
    type="range"
    min="0"
    max="360"
    :value="context.hue"
    :class="classes"
    :style="{
      background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
    }"
    aria-label="Hue"
    @input="handleInput"
  >
</template>
