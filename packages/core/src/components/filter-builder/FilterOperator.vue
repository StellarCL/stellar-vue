<script setup lang="ts">
import { computed } from 'vue'
import type { FilterOperatorProps } from './filter-builder.types'
import { operatorLabels } from './filter-builder.types'
import { cn } from '../../utils'

const props = defineProps<FilterOperatorProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const classes = computed(() =>
  cn(
    'h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring',
    props.class,
  ),
)
</script>

<template>
  <select
    :value="modelValue"
    :class="classes"
    aria-label="Select operator"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option value="" disabled>Select operator...</option>
    <option
      v-for="op in operators"
      :key="op"
      :value="op"
    >
      {{ operatorLabels[op] ?? op }}
    </option>
  </select>
</template>
