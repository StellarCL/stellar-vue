<script setup lang="ts">
import { computed, ref } from 'vue'
import { PopoverRoot, PopoverTrigger, PopoverPortal, PopoverContent } from 'radix-vue'
import {
  RangeCalendarRoot,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarGrid,
  RangeCalendarGridHead,
  RangeCalendarGridBody,
  RangeCalendarGridRow,
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarHeadCell,
  RangeCalendarNext,
  RangeCalendarPrev,
} from 'radix-vue'
import type { DatePickerRangeProps, DateRange } from './date-picker.types'
import { formatDate } from './date-format'
import { cn } from '../../utils'

const props = withDefaults(defineProps<DatePickerRangeProps>(), {
  placeholder: 'Pick a date range',
  format: 'MM/dd/yyyy',
  disabled: false,
  locale: 'en-US',
  weekStartsOn: 0,
})

const emit = defineEmits<{
  'update:modelValue': [range: DateRange]
}>()

const open = ref(false)

const displayValue = computed(() => {
  if (!props.modelValue?.start || !props.modelValue?.end) return ''
  return `${formatDate(props.modelValue.start, props.format)} - ${formatDate(props.modelValue.end, props.format)}`
})

function onRangeSelect(range: DateRange) {
  emit('update:modelValue', range)
  if (range.start && range.end) {
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
        <RangeCalendarRoot
          v-slot="{ grid, weekDays }"
          :model-value="props.modelValue"
          :min-value="props.minValue"
          :max-value="props.maxValue"
          :locale="props.locale"
          :week-starts-on="props.weekStartsOn"
          :number-of-months="2"
          class="p-3"
          initial-focus
          @update:model-value="onRangeSelect"
        >
          <RangeCalendarHeader class="relative flex w-full items-center justify-between pt-1">
            <RangeCalendarPrev
              class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </RangeCalendarPrev>
            <RangeCalendarHeading class="text-sm font-medium" />
            <RangeCalendarNext
              class="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </RangeCalendarNext>
          </RangeCalendarHeader>

          <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
            <RangeCalendarGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="w-full border-collapse space-y-1"
            >
              <RangeCalendarGridHead>
                <RangeCalendarGridRow class="flex">
                  <RangeCalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
                  >
                    {{ day }}
                  </RangeCalendarHeadCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridHead>
              <RangeCalendarGridBody>
                <RangeCalendarGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="flex mt-2 w-full"
                >
                  <RangeCalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                    class="relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20"
                  >
                    <RangeCalendarCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      :class="cn(
                        'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-normal ring-offset-background transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        'data-[selected]:bg-primary data-[selected]:text-primary-foreground',
                        'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
                        'data-[today]:bg-accent data-[today]:text-accent-foreground',
                        'data-[selected]:data-[today]:bg-primary data-[selected]:data-[today]:text-primary-foreground',
                        'data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50',
                        'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
                        'data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground',
                        'data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground',
                        'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
                      )"
                    />
                  </RangeCalendarCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridBody>
            </RangeCalendarGrid>
          </div>
        </RangeCalendarRoot>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
