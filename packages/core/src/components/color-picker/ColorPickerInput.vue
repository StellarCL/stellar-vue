<script setup lang="ts">
import type { ColorPickerContext, ColorPickerInputProps } from './color-picker.types'
import { computed, inject, ref, watch } from 'vue'
import { cn } from '../../utils'
import { hexToHslString, hexToRgbString } from './color-picker.utils'

const props = defineProps<ColorPickerInputProps>()
const context = inject<ColorPickerContext>('color-picker-context')!

const inputValue = ref(context.hexValue)

watch(() => context.hexValue, (val) => {
  if (context.format === 'hex') {
    inputValue.value = val
  }
  else if (context.format === 'rgb') {
    inputValue.value = hexToRgbString(val)
  }
  else if (context.format === 'hsl') {
    inputValue.value = hexToHslString(val)
  }
})

// Initialize
if (context.format === 'rgb') {
  inputValue.value = hexToRgbString(context.hexValue)
}
else if (context.format === 'hsl') {
  inputValue.value = hexToHslString(context.hexValue)
}
else {
  inputValue.value = context.hexValue
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value.trim()
  if (context.format === 'hex') {
    const hex = value.startsWith('#') ? value : `#${value}`
    context.setFromHex(hex)
  }
}

const classes = computed(() =>
  cn(
    'flex h-8 w-full rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    props.class,
  ),
)
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      :value="inputValue"
      :class="classes"
      :aria-label="`Color value in ${context.format} format`"
      @change="handleChange"
    >
    <span class="text-xs uppercase text-muted-foreground">{{ context.format }}</span>
  </div>
</template>
