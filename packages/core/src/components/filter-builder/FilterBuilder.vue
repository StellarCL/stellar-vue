<script setup lang="ts">
import { computed } from 'vue'
import type { FilterBuilderProps, FilterGroup } from './filter-builder.types'
import { defaultOperators } from './filter-builder.types'
import { cn } from '../../utils'
import FilterGroupComponent from './FilterGroup.vue'

const props = withDefaults(defineProps<FilterBuilderProps>(), {
  modelValue: () => [],
  maxDepth: 3,
  operators: () => defaultOperators,
})

const emit = defineEmits<{
  'update:modelValue': [value: FilterGroup]
}>()

const classes = computed(() =>
  cn('space-y-2', props.class),
)

/**
 * The root FilterBuilder wraps its rules in a single FilterGroup.
 * If the modelValue is already a FilterGroup, use it directly.
 * Otherwise, wrap the array of rules in an AND group.
 */
const rootGroup = computed<FilterGroup>(() => {
  const mv = props.modelValue as any
  if (mv && 'logic' in mv && 'rules' in mv) {
    return mv as FilterGroup
  }
  return {
    logic: 'and',
    rules: Array.isArray(mv) ? mv : [],
  }
})

function handleGroupUpdate(group: FilterGroup) {
  emit('update:modelValue', group)
}
</script>

<template>
  <div :class="classes" data-testid="filter-builder">
    <FilterGroupComponent
      :group="rootGroup"
      :fields="fields"
      :operators="operators"
      :depth="0"
      :max-depth="maxDepth"
      @update:group="handleGroupUpdate"
    />
  </div>
</template>
