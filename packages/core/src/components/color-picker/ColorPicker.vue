<script setup lang="ts">
import type { ColorPickerContext, ColorPickerProps } from './color-picker.types'
import { computed, provide, reactive, ref, watch } from 'vue'
import { cn } from '../../utils'
import { hexToHsb, hsbToHex, isValidHex } from './color-picker.utils'

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: '#000000',
  showAlpha: false,
  presets: () => [],
  format: 'hex',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const initial = hexToHsb(props.modelValue)
const hue = ref(initial.h)
const saturation = ref(initial.s)
const brightness = ref(initial.b)
const alpha = ref(1)

const hexValue = computed(() => hsbToHex(hue.value, saturation.value, brightness.value))

watch(() => props.modelValue, (val) => {
  if (isValidHex(val)) {
    const hsb = hexToHsb(val)
    // Only update if it's a meaningful difference to avoid loops
    if (Math.abs(hsb.h - hue.value) > 1 || Math.abs(hsb.s - saturation.value) > 1 || Math.abs(hsb.b - brightness.value) > 1) {
      hue.value = hsb.h
      saturation.value = hsb.s
      brightness.value = hsb.b
    }
  }
})

watch([hue, saturation, brightness, alpha], () => {
  const hex = hsbToHex(hue.value, saturation.value, brightness.value)
  if (hex !== props.modelValue) {
    emit('update:modelValue', hex)
  }
})

function setHue(h: number) {
  hue.value = Math.max(0, Math.min(360, h))
}
function setSaturation(s: number) {
  saturation.value = Math.max(0, Math.min(100, s))
}
function setBrightness(b: number) {
  brightness.value = Math.max(0, Math.min(100, b))
}
function setAlpha(a: number) {
  alpha.value = Math.max(0, Math.min(1, a))
}
function setFromHex(hex: string) {
  if (isValidHex(hex)) {
    const hsb = hexToHsb(hex)
    hue.value = hsb.h
    saturation.value = hsb.s
    brightness.value = hsb.b
    emit('update:modelValue', hex.startsWith('#') ? hex : `#${hex}`)
  }
}

const context = reactive({
  hue,
  saturation,
  brightness,
  alpha,
  hexValue,
  format: computed(() => props.format),
  showAlpha: computed(() => props.showAlpha),
  presets: computed(() => props.presets),
  setHue,
  setSaturation,
  setBrightness,
  setAlpha,
  setFromHex,
}) as unknown as ColorPickerContext

provide('color-picker-context', context)

const classes = computed(() =>
  cn('inline-flex flex-col gap-3 rounded-lg border bg-popover p-3 shadow-md', props.class),
)
</script>

<template>
  <div :class="classes" role="group" aria-label="Color picker">
    <slot />
  </div>
</template>
