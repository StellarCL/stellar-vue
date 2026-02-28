<script setup lang="ts">
import { computed } from 'vue'
import type { FilterFieldProps } from './filter-builder.types'
import { cn } from '../../utils'

const props = defineProps<FilterFieldProps>()

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
    aria-label="Select field"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option value="" disabled>Select field...</option>
    <option
      v-for="field in fields"
      :key="field.key"
      :value="field.key"
    >
      {{ field.label }}
    </option>
  </select>
</template>
