<script setup lang="ts">
import type { ColorPickerContext, ColorPickerSwatchesProps } from './color-picker.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ColorPickerSwatchesProps>()
const context = inject<ColorPickerContext>('color-picker-context')!

const classes = computed(() =>
  cn('flex flex-wrap gap-1.5', props.class),
)
</script>

<template>
  <div v-if="context.presets.length > 0" :class="classes" role="listbox" aria-label="Color presets">
    <button
      v-for="color in context.presets"
      :key="color"
      class="h-6 w-6 rounded-md border border-border shadow-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      :style="{ backgroundColor: color }"
      :aria-label="`Select color ${color}`"
      :aria-selected="context.hexValue === color"
      role="option"
      @click="context.setFromHex(color)"
    />
  </div>
</template>
