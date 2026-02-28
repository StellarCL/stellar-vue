<script setup lang="ts">
import { computed } from 'vue'
import type { FilterGroupProps, FilterGroup, FilterCondition, FilterRule } from './filter-builder.types'
import { isFilterGroup } from './filter-builder.types'
import { cn } from '../../utils'
import FilterRow from './FilterRow.vue'

const props = withDefaults(defineProps<FilterGroupProps>(), {
  depth: 0,
  maxDepth: 3,
})

const emit = defineEmits<{
  'update:group': [group: FilterGroup]
  'remove': []
}>()

const classes = computed(() =>
  cn(
    'rounded-lg border border-border p-3 space-y-2',
    props.depth > 0 && 'ml-4 border-dashed',
    props.class,
  ),
)

function toggleLogic() {
  emit('update:group', {
    ...props.group,
    logic: props.group.logic === 'and' ? 'or' : 'and',
  })
}

function addRule() {
  const defaultField = props.fields[0]?.key ?? ''
  const fieldType = props.fields[0]?.type ?? 'string'
  const operators = props.operators[fieldType] ?? []
  const newRule: FilterCondition = {
    field: defaultField,
    operator: operators[0] ?? '',
    value: null,
  }
  emit('update:group', {
    ...props.group,
    rules: [...props.group.rules, newRule],
  })
}

function addGroup() {
  const defaultField = props.fields[0]?.key ?? ''
  const fieldType = props.fields[0]?.type ?? 'string'
  const operators = props.operators[fieldType] ?? []
  const newGroup: FilterGroup = {
    logic: 'and',
    rules: [{
      field: defaultField,
      operator: operators[0] ?? '',
      value: null,
    }],
  }
  emit('update:group', {
    ...props.group,
    rules: [...props.group.rules, newGroup],
  })
}

function removeRule(index: number) {
  const newRules = [...props.group.rules]
  newRules.splice(index, 1)
  emit('update:group', {
    ...props.group,
    rules: newRules,
  })
}

function updateRule(index: number, updatedRule: FilterCondition) {
  const newRules = [...props.group.rules]
  newRules[index] = updatedRule
  emit('update:group', {
    ...props.group,
    rules: newRules,
  })
}

function updateNestedGroup(index: number, updatedGroup: FilterGroup) {
  const newRules = [...props.group.rules]
  newRules[index] = updatedGroup
  emit('update:group', {
    ...props.group,
    rules: newRules,
  })
}

const canAddGroup = computed(() => props.depth < props.maxDepth - 1)
</script>

<template>
  <div :class="classes" data-testid="filter-group">
    <div class="flex items-center gap-2 mb-2">
      <button
        type="button"
        class="inline-flex h-7 items-center justify-center rounded-md px-3 text-xs font-medium uppercase tracking-wider"
        :class="[
          group.logic === 'and'
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground',
        ]"
        data-testid="logic-toggle"
        @click="toggleLogic"
      >
        {{ group.logic }}
      </button>

      <div class="flex-1" />

      <button
        type="button"
        class="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
        data-testid="add-rule-button"
        @click="addRule"
      >
        + Rule
      </button>

      <button
        v-if="canAddGroup"
        type="button"
        class="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
        data-testid="add-group-button"
        @click="addGroup"
      >
        + Group
      </button>

      <button
        v-if="depth > 0"
        type="button"
        class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background text-xs font-medium text-destructive hover:bg-destructive/10"
        aria-label="Remove group"
        @click="emit('remove')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>

    <template v-for="(rule, index) in group.rules" :key="index">
      <!-- Nested group -->
      <FilterGroup
        v-if="isFilterGroup(rule)"
        :group="(rule as FilterGroup)"
        :fields="fields"
        :operators="operators"
        :depth="depth + 1"
        :max-depth="maxDepth"
        @update:group="updateNestedGroup(index, $event)"
        @remove="removeRule(index)"
      />

      <!-- Single condition row -->
      <FilterRow
        v-else
        :rule="(rule as FilterCondition)"
        :fields="fields"
        :operators="operators"
        :index="index"
        @update:rule="updateRule(index, $event)"
        @remove="removeRule(index)"
      />
    </template>
  </div>
</template>
