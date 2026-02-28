<script setup lang="ts">
import { computed } from 'vue'
import type { FilterRowProps, FilterCondition, FieldConfig } from './filter-builder.types'
import { cn } from '../../utils'
import FilterField from './FilterField.vue'
import FilterOperator from './FilterOperator.vue'
import FilterValue from './FilterValue.vue'

const props = defineProps<FilterRowProps>()

const emit = defineEmits<{
  'update:rule': [rule: FilterCondition]
  'remove': []
}>()

const classes = computed(() =>
  cn(
    'flex items-center gap-2',
    props.class,
  ),
)

const selectedField = computed<FieldConfig | undefined>(() =>
  props.fields.find((f) => f.key === props.rule.field),
)

const availableOperators = computed(() => {
  const fieldType = selectedField.value?.type ?? 'string'
  return props.operators[fieldType] ?? []
})

function handleFieldChange(field: string) {
  const fieldConfig = props.fields.find((f) => f.key === field)
  const fieldType = fieldConfig?.type ?? 'string'
  const operators = props.operators[fieldType] ?? []
  emit('update:rule', {
    field,
    operator: operators[0] ?? '',
    value: null,
  })
}

function handleOperatorChange(operator: string) {
  emit('update:rule', {
    ...props.rule,
    operator,
  })
}

function handleValueChange(value: string | number | null) {
  emit('update:rule', {
    ...props.rule,
    value,
  })
}
</script>

<template>
  <div :class="classes" data-testid="filter-row">
    <FilterField
      :model-value="rule.field"
      :fields="fields"
      @update:model-value="handleFieldChange"
    />

    <FilterOperator
      :model-value="rule.operator"
      :operators="availableOperators"
      @update:model-value="handleOperatorChange"
    />

    <FilterValue
      :model-value="rule.value"
      :field-type="selectedField?.type ?? 'string'"
      :options="selectedField?.options"
      @update:model-value="handleValueChange"
    />

    <button
      type="button"
      class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-input bg-background text-sm font-medium text-destructive hover:bg-destructive/10"
      aria-label="Remove rule"
      @click="emit('remove')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  </div>
</template>
