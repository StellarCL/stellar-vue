<script setup lang="ts">
import { FilterBuilder } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const fields = [
  { key: 'name', label: 'Name', type: 'string' as const },
  { key: 'age', label: 'Age', type: 'number' as const },
  {
    key: 'status',
    label: 'Status',
    type: 'enum' as const,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
]

const basicRules = ref({
  logic: 'and' as const,
  rules: [{ field: 'name', operator: 'contains', value: 'John' }],
})

const complexFields = [
  { key: 'name', label: 'Name', type: 'string' as const },
  { key: 'age', label: 'Age', type: 'number' as const },
  { key: 'email', label: 'Email', type: 'string' as const },
  {
    key: 'status',
    label: 'Status',
    type: 'enum' as const,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Pending', value: 'pending' },
    ],
  },
  { key: 'created', label: 'Created Date', type: 'date' as const },
]

const complexRules = ref({
  logic: 'and' as const,
  rules: [
    { field: 'name', operator: 'starts_with', value: 'A' },
    { field: 'age', operator: 'greater_than', value: 18 },
    { field: 'status', operator: 'equals', value: 'active' },
  ],
})

const emptyRules = ref({
  logic: 'and' as const,
  rules: [] as any[],
})
</script>

<template>
  <div>
    <PageHeader
      title="Filter Builder"
      description="A visual query builder for creating complex filter conditions with support for nested groups, multiple field types, and logical operators."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Filter -->
      <DemoSection
        title="Basic Filter"
        description="A simple filter with name, age, and status fields."
      >
        <div class="space-y-4">
          <FilterBuilder v-model="basicRules" :fields="fields" />
          <div class="rounded-md bg-muted p-3">
            <p class="text-xs font-medium text-muted-foreground mb-1">Current filter state:</p>
            <pre class="text-xs text-foreground overflow-x-auto">{{
              JSON.stringify(basicRules, null, 2)
            }}</pre>
          </div>
        </div>
      </DemoSection>

      <!-- Complex Filter -->
      <DemoSection
        title="Multiple Conditions"
        description="Filter with several pre-populated conditions across different field types."
      >
        <div class="space-y-4">
          <FilterBuilder v-model="complexRules" :fields="complexFields" :max-depth="2" />
          <div class="rounded-md bg-muted p-3">
            <p class="text-xs font-medium text-muted-foreground mb-1">Current filter state:</p>
            <pre class="text-xs text-foreground overflow-x-auto">{{
              JSON.stringify(complexRules, null, 2)
            }}</pre>
          </div>
        </div>
      </DemoSection>

      <!-- Empty Filter -->
      <DemoSection
        title="Empty Filter"
        description="Start with no conditions and add rules interactively."
      >
        <div class="space-y-4">
          <FilterBuilder v-model="emptyRules" :fields="fields" :max-depth="3" />
          <div class="rounded-md bg-muted p-3">
            <p class="text-xs font-medium text-muted-foreground mb-1">Current filter state:</p>
            <pre class="text-xs text-foreground overflow-x-auto">{{
              JSON.stringify(emptyRules, null, 2)
            }}</pre>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
