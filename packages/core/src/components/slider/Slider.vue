<script setup lang="ts">
import type { SliderProps } from './slider.types'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: () => [0],
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  orientation: 'horizontal',
})

// eslint-disable-next-line unused-imports/no-unused-vars
const emit = defineEmits<{
  'update:modelValue': [value: number[]]
}>()
</script>

<template>
  <SliderRoot
    :model-value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :orientation="orientation"
    :class="
      cn(
        'relative flex w-full touch-none select-none items-center',
        orientation === 'vertical' && 'flex-col h-full w-auto',
        props.class,
      )
    "
    @update:model-value="$emit('update:modelValue', $event as number[])"
  >
    <SliderTrack
      class="relative grow overflow-hidden rounded-full bg-muted"
      :class="orientation === 'vertical' ? 'w-2 h-full' : 'h-2 w-full'"
    >
      <SliderRange
        class="absolute rounded-full bg-primary"
        :class="orientation === 'vertical' ? 'w-full' : 'h-full'"
      />
    </SliderTrack>
    <SliderThumb
      v-for="(_, index) in modelValue"
      :key="index"
      class="block h-5 w-5 rounded-full border-2 border-primary bg-background transition-colors focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    />
  </SliderRoot>
</template>
