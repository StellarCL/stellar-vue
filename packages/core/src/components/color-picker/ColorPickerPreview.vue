<script setup lang="ts">
import type { ColorPickerContext, ColorPickerPreviewProps } from './color-picker.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'

const props = defineProps<ColorPickerPreviewProps>()
const context = inject<ColorPickerContext>('color-picker-context')!

const classes = computed(() =>
  cn('h-8 w-8 rounded-full border border-border shadow-sm', props.class),
)
</script>

<template>
  <div
    :class="classes"
    :style="{ backgroundColor: context.hexValue }"
    role="img"
    :aria-label="`Selected color: ${context.hexValue}`"
  />
</template>
