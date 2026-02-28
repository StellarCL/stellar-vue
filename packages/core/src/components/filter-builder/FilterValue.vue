<script setup lang="ts">
import type { FilterValueProps } from './filter-builder.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<FilterValueProps>(), {
  modelValue: null,
  options: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
}>()

const inputClasses = computed(() =>
  cn(
    'h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring',
    props.class,
  ),
)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (props.fieldType === 'number') {
    const num = target.value === '' ? null : Number(target.value)
    emit('update:modelValue', num)
  }
  else {
    emit('update:modelValue', target.value)
  }
}

function handleSelectChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <!-- Enum field: render select -->
  <select
    v-if="fieldType === 'enum'"
    :value="modelValue ?? ''"
    :class="inputClasses"
    aria-label="Filter value"
    @change="handleSelectChange"
  >
    <option value="" disabled>
      Select value...
    </option>
    <option
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>

  <!-- Date field: render date input -->
  <input
    v-else-if="fieldType === 'date'"
    type="date"
    :value="modelValue ?? ''"
    :class="inputClasses"
    aria-label="Filter value"
    @input="handleInput"
  >

  <!-- Number field: render number input -->
  <input
    v-else-if="fieldType === 'number'"
    type="number"
    :value="modelValue ?? ''"
    :class="inputClasses"
    aria-label="Filter value"
    @input="handleInput"
  >

  <!-- String field (default): render text input -->
  <input
    v-else
    type="text"
    :value="modelValue ?? ''"
    :class="inputClasses"
    placeholder="Enter value..."
    aria-label="Filter value"
    @input="handleInput"
  >
</template>
