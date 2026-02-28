<script setup lang="ts">
import type { ColorPickerAreaProps, ColorPickerContext } from './color-picker.types'
import { computed, inject, ref } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ColorPickerAreaProps>()
const context = inject<ColorPickerContext>('color-picker-context')!
const areaRef = ref<HTMLDivElement>()
const isDragging = ref(false)

const hueColor = computed(() => `hsl(${context.hue}, 100%, 50%)`)

const pointerStyle = computed(() => ({
  left: `${context.saturation}%`,
  top: `${100 - context.brightness}%`,
}))

function handlePointerEvent(event: MouseEvent | PointerEvent) {
  if (!areaRef.value)
    return
  const rect = areaRef.value.getBoundingClientRect()
  const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width))
  const y = Math.max(0, Math.min(event.clientY - rect.top, rect.height))
  context.setSaturation(Math.round((x / rect.width) * 100))
  context.setBrightness(Math.round(100 - (y / rect.height) * 100))
}

function handlePointerDown(event: PointerEvent) {
  isDragging.value = true
  handlePointerEvent(event)
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function handlePointerMove(event: PointerEvent) {
  if (isDragging.value)
    handlePointerEvent(event)
}

function handlePointerUp() {
  isDragging.value = false
}

const classes = computed(() =>
  cn('relative h-40 w-full cursor-crosshair rounded', props.class),
)
</script>

<template>
  <div
    ref="areaRef"
    :class="classes"
    :style="{
      background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`,
    }"
    role="slider"
    aria-label="Color saturation and brightness"
    :aria-valuetext="`Saturation ${context.saturation}%, Brightness ${context.brightness}%`"
    tabindex="0"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
  >
    <div
      class="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
      :style="pointerStyle"
    />
  </div>
</template>
