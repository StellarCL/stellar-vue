<script setup lang="ts">
import type { DateRange } from '@stellar-vue-ui/core'
import { DatePicker, DatePickerRange } from '@stellar-vue-ui/core'
import { CalendarDate } from '@internationalized/date'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const basicDate = ref()
const presetDate = ref(new CalendarDate(2026, 2, 28))
const rangeDate = ref<DateRange>({ start: undefined, end: undefined })
const disabledDate = ref()

function formatDateValue(date: any) {
  if (!date) return 'None'
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
}

function formatRange(range: DateRange) {
  if (!range.start && !range.end) return 'None'
  return `${formatDateValue(range.start)} to ${formatDateValue(range.end)}`
}
</script>

<template>
  <div>
    <PageHeader
      title="Date Picker"
      description="A popover-based date picker combining an input trigger with a calendar dropdown. Supports single dates and date ranges."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Date Picker -->
      <DemoSection
        title="Basic Date Picker"
        description="Click to open a calendar popover and select a date."
      >
        <div class="flex flex-col gap-3 max-w-xs">
          <DatePicker v-model="basicDate" placeholder="Pick a date" />
          <p class="text-sm text-muted-foreground">
            Selected:
            <span class="font-medium text-foreground">{{ formatDateValue(basicDate) }}</span>
          </p>
        </div>
      </DemoSection>

      <!-- With Pre-selected Value -->
      <DemoSection
        title="Pre-selected Date"
        description="Initialize the date picker with a default value."
      >
        <div class="flex flex-col gap-3 max-w-xs">
          <DatePicker v-model="presetDate" format="dd/MM/yyyy" />
          <p class="text-sm text-muted-foreground">
            Selected:
            <span class="font-medium text-foreground">{{ formatDateValue(presetDate) }}</span>
          </p>
        </div>
      </DemoSection>

      <!-- Date Range Picker -->
      <DemoSection
        title="Date Range Picker"
        description="Select a start and end date to define a range. Displays two months for easier selection."
      >
        <div class="flex flex-col gap-3 max-w-sm">
          <DatePickerRange v-model="rangeDate" placeholder="Pick a date range" />
          <p class="text-sm text-muted-foreground">
            Range: <span class="font-medium text-foreground">{{ formatRange(rangeDate) }}</span>
          </p>
        </div>
      </DemoSection>

      <!-- Disabled State -->
      <DemoSection
        title="Disabled"
        description="A date picker in a disabled state prevents user interaction."
      >
        <div class="max-w-xs">
          <DatePicker v-model="disabledDate" placeholder="Disabled date picker" :disabled="true" />
        </div>
      </DemoSection>

      <!-- With Min/Max Constraints -->
      <DemoSection
        title="With Date Constraints"
        description="Limit selectable dates to a specific range using minValue and maxValue."
      >
        <div class="flex flex-col gap-3 max-w-xs">
          <DatePicker
            placeholder="Select within March 2026"
            :min-value="new CalendarDate(2026, 3, 1)"
            :max-value="new CalendarDate(2026, 3, 31)"
          />
          <p class="text-xs text-muted-foreground">Only dates in March 2026 can be selected.</p>
        </div>
      </DemoSection>

      <!-- Side by Side -->
      <DemoSection
        title="Side by Side"
        description="Compare single and range date pickers next to each other."
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Start Date</label>
            <DatePicker placeholder="Select start date" />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">End Date</label>
            <DatePicker placeholder="Select end date" />
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
