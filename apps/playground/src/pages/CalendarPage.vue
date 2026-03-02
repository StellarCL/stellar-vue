<script setup lang="ts">
import {
  Calendar,
  CalendarCell,
  CalendarDay,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
} from '@stellar-vue-ui/core'
import { CalendarDate } from '@internationalized/date'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const selectedDate = ref(new CalendarDate(2026, 2, 28))
const multiMonthDate = ref()

function formatDateValue(date: any) {
  if (!date) return 'None'
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`
}
</script>

<template>
  <div>
    <PageHeader
      title="Calendar"
      description="An interactive date calendar component for selecting single dates. Built on Radix Vue Calendar primitives."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Calendar -->
      <DemoSection
        title="Basic Calendar"
        description="A calendar with a pre-selected date. Click any day to change the selection."
      >
        <div class="flex flex-col items-start gap-4">
          <Calendar v-slot="{ grid, weekDays }" v-model="selectedDate">
            <CalendarHeader>
              <CalendarPrevButton />
              <CalendarHeading />
              <CalendarNextButton />
            </CalendarHeader>

            <div class="mt-4">
              <CalendarGrid v-for="month in grid" :key="month.value.toString()">
                <CalendarGridHead>
                  <CalendarGridRow>
                    <CalendarHeadCell v-for="day in weekDays" :key="day">
                      {{ day }}
                    </CalendarHeadCell>
                  </CalendarGridRow>
                </CalendarGridHead>
                <CalendarGridBody>
                  <CalendarGridRow
                    v-for="(weekDates, index) in month.rows"
                    :key="`week-${index}`"
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
          <p class="text-sm text-muted-foreground">
            Selected:
            <span class="font-medium text-foreground">{{ formatDateValue(selectedDate) }}</span>
          </p>
        </div>
      </DemoSection>

      <!-- Fixed Weeks Calendar -->
      <DemoSection
        title="Fixed Weeks"
        description="Always displays 6 weeks in the grid for consistent height."
      >
        <Calendar v-slot="{ grid, weekDays }" :fixed-weeks="true">
          <CalendarHeader>
            <CalendarPrevButton />
            <CalendarHeading />
            <CalendarNextButton />
          </CalendarHeader>

          <div class="mt-4">
            <CalendarGrid v-for="month in grid" :key="month.value.toString()">
              <CalendarGridHead>
                <CalendarGridRow>
                  <CalendarHeadCell v-for="day in weekDays" :key="day">
                    {{ day }}
                  </CalendarHeadCell>
                </CalendarGridRow>
              </CalendarGridHead>
              <CalendarGridBody>
                <CalendarGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`week-${index}`"
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
      </DemoSection>

      <!-- Multiple Months -->
      <DemoSection
        title="Multiple Months"
        description="Display two months side-by-side for easier range navigation."
      >
        <div class="flex flex-col items-start gap-4">
          <Calendar v-slot="{ grid, weekDays }" v-model="multiMonthDate" :number-of-months="2">
            <CalendarHeader>
              <CalendarPrevButton />
              <CalendarHeading />
              <CalendarNextButton />
            </CalendarHeader>

            <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
              <CalendarGrid v-for="month in grid" :key="month.value.toString()">
                <CalendarGridHead>
                  <CalendarGridRow>
                    <CalendarHeadCell v-for="day in weekDays" :key="day">
                      {{ day }}
                    </CalendarHeadCell>
                  </CalendarGridRow>
                </CalendarGridHead>
                <CalendarGridBody>
                  <CalendarGridRow
                    v-for="(weekDates, index) in month.rows"
                    :key="`week-${index}`"
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
          <p class="text-sm text-muted-foreground">
            Selected:
            <span class="font-medium text-foreground">{{ formatDateValue(multiMonthDate) }}</span>
          </p>
        </div>
      </DemoSection>

      <!-- Disabled Calendar -->
      <DemoSection
        title="Disabled"
        description="Calendar in a disabled state prevents all interaction."
      >
        <Calendar v-slot="{ grid, weekDays }" :disabled="true">
          <CalendarHeader>
            <CalendarPrevButton />
            <CalendarHeading />
            <CalendarNextButton />
          </CalendarHeader>

          <div class="mt-4">
            <CalendarGrid v-for="month in grid" :key="month.value.toString()">
              <CalendarGridHead>
                <CalendarGridRow>
                  <CalendarHeadCell v-for="day in weekDays" :key="day">
                    {{ day }}
                  </CalendarHeadCell>
                </CalendarGridRow>
              </CalendarGridHead>
              <CalendarGridBody>
                <CalendarGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`week-${index}`"
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
      </DemoSection>
    </div>
  </div>
</template>
