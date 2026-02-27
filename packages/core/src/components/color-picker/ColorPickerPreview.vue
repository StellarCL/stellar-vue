<script setup lang="ts">
import { computed, inject } from 'vue'
import type { ColorPickerPreviewProps, ColorPickerContext } from './color-picker.types'
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
