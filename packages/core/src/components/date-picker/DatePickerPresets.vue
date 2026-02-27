<script setup lang="ts">
import { computed } from 'vue'
import type { DatePickerPresetsProps, PresetItem, PresetRangeItem } from './date-picker.types'
import { cn } from '../../utils'

const props = defineProps<DatePickerPresetsProps & {
  /** List of preset items to display */
  presets?: PresetItem[]
  /** List of preset range items to display */
  rangePresets?: PresetRangeItem[]
}>()

const emit = defineEmits<{
  'select': [value: PresetItem]
  'select-range': [value: PresetRangeItem]
}>()

const classes = computed(() =>
  cn('flex flex-col gap-1 p-2', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot>
      <template v-if="presets">
        <button
          v-for="preset in presets"
          :key="preset.label"
          type="button"
          :class="cn(
            'inline-flex items-center justify-start rounded-md px-3 py-1.5 text-sm font-normal',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          )"
          @click="emit('select', preset)"
        >
          {{ preset.label }}
        </button>
      </template>
      <template v-if="rangePresets">
        <button
          v-for="preset in rangePresets"
          :key="preset.label"
          type="button"
          :class="cn(
            'inline-flex items-center justify-start rounded-md px-3 py-1.5 text-sm font-normal',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          )"
          @click="emit('select-range', preset)"
        >
          {{ preset.label }}
        </button>
      </template>
    </slot>
  </div>
</template>
