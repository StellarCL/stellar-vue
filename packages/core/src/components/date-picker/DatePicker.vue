<script setup lang="ts">
import { computed, ref } from 'vue'
import { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent } from 'radix-vue'
import type { DateValue } from '@internationalized/date'
import type { DatePickerProps } from './date-picker.types'
import { formatDate } from './date-format'
import { cn } from '../../utils'

import Calendar from '../calendar/Calendar.vue'
import CalendarHeader from '../calendar/CalendarHeader.vue'
import CalendarHeading from '../calendar/CalendarHeading.vue'
import CalendarGrid from '../calendar/CalendarGrid.vue'
import CalendarGridHead from '../calendar/CalendarGridHead.vue'
import CalendarGridBody from '../calendar/CalendarGridBody.vue'
import CalendarGridRow from '../calendar/CalendarGridRow.vue'
import CalendarCell from '../calendar/CalendarCell.vue'
import CalendarDay from '../calendar/CalendarDay.vue'
import CalendarHeadCell from '../calendar/CalendarHeadCell.vue'
import CalendarNextButton from '../calendar/CalendarNextButton.vue'
import CalendarPrevButton from '../calendar/CalendarPrevButton.vue'

const props = withDefaults(defineProps<DatePickerProps>(), {
  placeholder: 'Pick a date',
  format: 'MM/dd/yyyy',
  disabled: false,
  locale: 'en-US',
  weekStartsOn: 0,
})

const emit = defineEmits<{
  'update:modelValue': [date: DateValue | undefined]
}>()

const open = ref(false)

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  return formatDate(props.modelValue, props.format)
})

function onDateSelect(date: DateValue | undefined) {
  emit('update:modelValue', date)
  if (date) {
    open.value = false
  }
}

const containerClasses = computed(() =>
  cn('', props.class),
)
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child :disabled="props.disabled">
      <button
        type="button"
        :disabled="props.disabled"
        :class="cn(
          'flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !displayValue && 'text-muted-foreground',
          containerClasses,
        )"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2 h-4 w-4"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
        <span>{{ displayValue || props.placeholder }}</span>
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        align="start"
        :side-offset="4"
        class="z-50 w-auto rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      >
        <Calendar
          v-slot="{ grid, weekDays }"
          :model-value="props.modelValue"
          :min-value="props.minValue"
          :max-value="props.maxValue"
          :locale="props.locale"
          :week-starts-on="props.weekStartsOn"
          initial-focus
          @update:model-value="onDateSelect"
        >
          <CalendarHeader>
            <CalendarPrevButton />
            <CalendarHeading />
            <CalendarNextButton />
          </CalendarHeader>

          <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
            <CalendarGrid v-for="month in grid" :key="month.value.toString()">
              <CalendarGridHead>
                <CalendarGridRow>
                  <CalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                  >
                    {{ day }}
                  </CalendarHeadCell>
                </CalendarGridRow>
              </CalendarGridHead>
              <CalendarGridBody>
                <CalendarGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="mt-2 w-full"
                >
                  <CalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <CalendarDay :day="weekDate" :month="month.value" />
                  </CalendarCell>
                </CalendarGridRow>
              </CalendarGridBody>
            </CalendarGrid>
          </div>
        </Calendar>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
