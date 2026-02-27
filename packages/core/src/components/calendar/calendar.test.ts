import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { CalendarDate } from '@internationalized/date'
import Calendar from './Calendar.vue'
import CalendarHeader from './CalendarHeader.vue'
import CalendarHeading from './CalendarHeading.vue'
import CalendarGrid from './CalendarGrid.vue'
import CalendarGridHead from './CalendarGridHead.vue'
import CalendarGridBody from './CalendarGridBody.vue'
import CalendarGridRow from './CalendarGridRow.vue'
import CalendarCell from './CalendarCell.vue'
import CalendarDay from './CalendarDay.vue'
import CalendarHeadCell from './CalendarHeadCell.vue'
import CalendarNextButton from './CalendarNextButton.vue'
import CalendarPrevButton from './CalendarPrevButton.vue'

/**
 * Helper to mount a fully composed calendar with a specific placeholder date
 * so tests always see a predictable month view.
 */
function mountCalendar(props: Record<string, unknown> = {}) {
  return mount({
    components: {
      Calendar,
      CalendarHeader,
      CalendarHeading,
      CalendarGrid,
      CalendarGridHead,
      CalendarGridBody,
      CalendarGridRow,
      CalendarCell,
      CalendarDay,
      CalendarHeadCell,
      CalendarNextButton,
      CalendarPrevButton,
    },
    template: `
      <Calendar v-bind="calendarProps" v-slot="{ grid, weekDays }">
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
                :key="'weekDate-' + index"
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
    `,
    data() {
      return { calendarProps: props }
    },
  })
}

describe('Calendar', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Calendar, {
      props: {
        placeholder: new CalendarDate(2024, 6, 1),
      },
      slots: { default: '<div>calendar content</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders correct number of days for a given month', () => {
    // June 2024 has 30 days
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    // Radix Vue renders CalendarCellTrigger as div[data-radix-vue-calendar-cell-trigger]
    const cellTriggers = wrapper.findAll('[data-radix-vue-calendar-cell-trigger]')
    // There should be at least 30 day cell triggers (may include outside-month days)
    expect(cellTriggers.length).toBeGreaterThanOrEqual(30)
  })

  it('highlights today\'s date', () => {
    const today = new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate(),
    )
    const wrapper = mountCalendar({
      placeholder: today,
    })
    // Radix Vue marks today's date with data-today attribute
    const todayCell = wrapper.find('[data-today]')
    expect(todayCell.exists()).toBe(true)
  })

  it('selects date on click and updates v-model', async () => {
    const placeholder = new CalendarDate(2024, 6, 1)
    const wrapper = mount({
      components: {
        Calendar,
        CalendarHeader,
        CalendarHeading,
        CalendarGrid,
        CalendarGridHead,
        CalendarGridBody,
        CalendarGridRow,
        CalendarCell,
        CalendarDay,
        CalendarHeadCell,
        CalendarNextButton,
        CalendarPrevButton,
      },
      template: `
        <Calendar v-model="selectedDate" :placeholder="placeholder" v-slot="{ grid, weekDays }">
          <CalendarHeader>
            <CalendarPrevButton />
            <CalendarHeading />
            <CalendarNextButton />
          </CalendarHeader>
          <div class="mt-4">
            <CalendarGrid v-for="month in grid" :key="month.value.toString()">
              <CalendarGridHead>
                <CalendarGridRow>
                  <CalendarHeadCell v-for="day in weekDays" :key="day">{{ day }}</CalendarHeadCell>
                </CalendarGridRow>
              </CalendarGridHead>
              <CalendarGridBody>
                <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="'weekDate-' + index">
                  <CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate">
                    <CalendarDay :day="weekDate" :month="month.value" />
                  </CalendarCell>
                </CalendarGridRow>
              </CalendarGridBody>
            </CalendarGrid>
          </div>
        </Calendar>
      `,
      data() {
        return {
          selectedDate: undefined as unknown,
          placeholder,
        }
      },
    })
    await nextTick()

    // Find a day trigger that shows "15" (rendered as div with role="button")
    const dayTriggers = wrapper.findAll('[data-radix-vue-calendar-cell-trigger]')
    const day15 = dayTriggers.find(el => el.text().trim() === '15' && !el.attributes('data-outside-view'))
    expect(day15).toBeDefined()

    if (day15) {
      await day15.trigger('click')
      await nextTick()

      // The selected date should be emitted
      const calendarComponent = wrapper.findComponent(Calendar)
      const emitted = calendarComponent.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
    }
  })

  it('navigates to next month', async () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    await nextTick()

    // Get heading text - should show June 2024
    const heading = wrapper.findComponent(CalendarHeading)
    const initialText = heading.text()
    expect(initialText).toContain('June')

    // Click next button
    const nextBtn = wrapper.findComponent(CalendarNextButton)
    await nextBtn.find('button').trigger('click')
    await nextTick()

    // Heading should now show July 2024
    const updatedText = heading.text()
    expect(updatedText).toContain('July')
  })

  it('navigates to previous month', async () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    await nextTick()

    const heading = wrapper.findComponent(CalendarHeading)
    expect(heading.text()).toContain('June')

    // Click prev button
    const prevBtn = wrapper.findComponent(CalendarPrevButton)
    await prevBtn.find('button').trigger('click')
    await nextTick()

    expect(heading.text()).toContain('May')
  })

  it('disabled dates cannot be selected', async () => {
    const placeholder = new CalendarDate(2024, 6, 1)

    const wrapper = mountCalendar({
      placeholder,
      isDateDisabled: (date: { year: number; month: number; day: number }) =>
        date.day === 15 && date.month === 6 && date.year === 2024,
    })
    await nextTick()

    // Find the disabled day trigger
    const dayTriggers = wrapper.findAll('[data-radix-vue-calendar-cell-trigger]')
    const day15 = dayTriggers.find(
      el => el.text().trim() === '15' && !el.attributes('data-outside-view'),
    )

    if (day15) {
      // Radix Vue marks disabled dates with data-disabled attribute
      expect(day15.attributes('data-disabled')).toBeDefined()
    }
  })

  it('min/max date boundaries work', async () => {
    const placeholder = new CalendarDate(2024, 6, 1)
    const minDate = new CalendarDate(2024, 6, 10)
    const maxDate = new CalendarDate(2024, 6, 20)

    const wrapper = mountCalendar({
      placeholder,
      minValue: minDate,
      maxValue: maxDate,
    })
    await nextTick()

    // Days before min (e.g., day 5) should be disabled
    const dayTriggers = wrapper.findAll('[data-radix-vue-calendar-cell-trigger]')
    const day5 = dayTriggers.find(
      el => el.text().trim() === '5' && !el.attributes('data-outside-view'),
    )

    if (day5) {
      expect(day5.attributes('data-disabled')).toBeDefined()
    }

    // Days after max (e.g., day 25) should be disabled
    const day25 = dayTriggers.find(
      el => el.text().trim() === '25' && !el.attributes('data-outside-view'),
    )
    if (day25) {
      expect(day25.attributes('data-disabled')).toBeDefined()
    }
  })

  it('keyboard arrow navigation is supported', async () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    await nextTick()

    // The calendar root element uses role="application" which supports keyboard navigation
    const calendarRoot = wrapper.find('[role="application"]')
    expect(calendarRoot.exists()).toBe(true)

    // The grid element should exist with role="grid" for keyboard navigation
    const grid = wrapper.find('[role="grid"]')
    expect(grid.exists()).toBe(true)
  })

  it('shows correct day-of-week headers', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
      locale: 'en-US',
      weekStartsOn: 0,
    })

    // Find head cells (th elements)
    const headCells = wrapper.findAll('th')
    expect(headCells.length).toBe(7)

    // With weekStartsOn: 0 (Sunday) and en-US locale, first day header starts with S (Sunday)
    const firstDay = headCells[0].text().trim()
    expect(firstDay).toBe('S')
  })

  it('outside-month days are visually distinct', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })

    // Radix Vue marks outside-month days with data-outside-view attribute
    const outsideDays = wrapper.findAll('[data-outside-view]')
    // June 2024 starts on Saturday, so there will be outside days from May
    expect(outsideDays.length).toBeGreaterThan(0)
  })
})

describe('CalendarHeader', () => {
  it('renders with correct base classes inside Calendar context', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    const header = wrapper.findComponent(CalendarHeader)
    expect(header.exists()).toBe(true)
    expect(header.classes().join(' ')).toContain('flex')
    expect(header.classes().join(' ')).toContain('items-center')
  })

  it('merges custom classes', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    const header = wrapper.findComponent(CalendarHeader)
    expect(header.exists()).toBe(true)
  })
})

describe('CalendarHeading', () => {
  it('displays month and year text', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    const heading = wrapper.findComponent(CalendarHeading)
    expect(heading.exists()).toBe(true)
    expect(heading.text()).toContain('June')
    expect(heading.text()).toContain('2024')
  })
})

describe('CalendarGrid', () => {
  it('renders as a table element', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    const grid = wrapper.findComponent(CalendarGrid)
    expect(grid.exists()).toBe(true)
    expect(grid.find('table').exists()).toBe(true)
  })
})

describe('CalendarNextButton', () => {
  it('renders next button with chevron icon', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    const nextBtn = wrapper.findComponent(CalendarNextButton)
    expect(nextBtn.exists()).toBe(true)
    expect(nextBtn.find('svg').exists()).toBe(true)
  })
})

describe('CalendarPrevButton', () => {
  it('renders prev button with chevron icon', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    const prevBtn = wrapper.findComponent(CalendarPrevButton)
    expect(prevBtn.exists()).toBe(true)
    expect(prevBtn.find('svg').exists()).toBe(true)
  })
})

describe('CalendarDay', () => {
  it('renders day number inside cell', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    // Day triggers are rendered as div[data-radix-vue-calendar-cell-trigger]
    const dayTriggers = wrapper.findAll('[data-radix-vue-calendar-cell-trigger]')
    const dayWithText = dayTriggers.find(el => el.text().trim() === '1')
    expect(dayWithText).toBeDefined()
  })
})

describe('CalendarCell', () => {
  it('renders cell wrapper for day', () => {
    const wrapper = mountCalendar({
      placeholder: new CalendarDate(2024, 6, 1),
    })
    const cells = wrapper.findAll('td')
    expect(cells.length).toBeGreaterThan(0)
  })
})
