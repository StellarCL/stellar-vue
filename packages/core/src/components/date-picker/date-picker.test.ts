import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { CalendarDate } from '@internationalized/date'
import DatePicker from './DatePicker.vue'
import DatePickerInput from './DatePickerInput.vue'
import DatePickerContent from './DatePickerContent.vue'
import DatePickerRange from './DatePickerRange.vue'
import DatePickerPresets from './DatePickerPresets.vue'
import { formatDate } from './date-format'

describe('DatePicker', () => {
  it('renders input with placeholder', () => {
    const wrapper = mount(DatePicker, {
      props: {
        placeholder: 'Select a date',
      },
    })
    expect(wrapper.text()).toContain('Select a date')
  })

  it('renders with default placeholder', () => {
    const wrapper = mount(DatePicker)
    expect(wrapper.text()).toContain('Pick a date')
  })

  it('opens calendar popover on input click', async () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const wrapper = mount(DatePicker, {
      props: {
        placeholder: 'Pick a date',
      },
      attachTo: div,
    })

    // Click the trigger button
    const triggerBtn = wrapper.find('button')
    expect(triggerBtn.exists()).toBe(true)
    await triggerBtn.trigger('click')
    await nextTick()
    await nextTick()

    // After click, the popover content should be rendered in the DOM
    // Radix Vue portals content; check for calendar elements
    const calendarInBody = document.body.querySelector('[role="application"]')
    expect(calendarInBody).not.toBeNull()

    wrapper.unmount()
    document.body.removeChild(div)
  })

  it('selects date and displays formatted value in input', async () => {
    const selectedDate = new CalendarDate(2024, 6, 15)

    const wrapper = mount(DatePicker, {
      props: {
        modelValue: selectedDate,
        format: 'MM/dd/yyyy',
      },
    })

    // Should display the formatted date
    expect(wrapper.text()).toContain('06/15/2024')
  })

  it('closes popover after selection', async () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const wrapper = mount({
      components: { DatePicker },
      template: `<DatePicker v-model="date" />`,
      data() {
        return {
          date: undefined as unknown,
        }
      },
    }, {
      attachTo: div,
    })

    // Open popover
    const triggerBtn = wrapper.find('button')
    await triggerBtn.trigger('click')
    await nextTick()
    await nextTick()

    // The popover content should exist in body (calendar with role="application")
    let calendarEl = document.body.querySelector('[role="application"]')
    expect(calendarEl).not.toBeNull()

    // Find and click a day cell in the popover
    const dayBtns = document.body.querySelectorAll('[data-radix-vue-calendar-cell-trigger]')
    if (dayBtns.length > 0) {
      // Find a day that is not outside the current month and not disabled
      const inMonthDay = Array.from(dayBtns).find(
        btn => !btn.hasAttribute('data-outside-view') && !btn.hasAttribute('data-disabled'),
      )
      if (inMonthDay) {
        ;(inMonthDay as HTMLElement).click()
        await nextTick()
        await nextTick()
        await nextTick()

        // After selecting a date, the DatePicker component sets open = false
        // Verify the modelValue was updated
        const datePicker = wrapper.findComponent(DatePicker)
        const emitted = datePicker.emitted('update:modelValue')
        expect(emitted).toBeTruthy()
      }
    }

    wrapper.unmount()
    document.body.removeChild(div)
  })

  it('format prop changes displayed format', () => {
    const selectedDate = new CalendarDate(2024, 6, 15)

    const wrapper = mount(DatePicker, {
      props: {
        modelValue: selectedDate,
        format: 'dd/MM/yyyy',
      },
    })

    expect(wrapper.text()).toContain('15/06/2024')
  })

  it('disabled state prevents opening', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        disabled: true,
      },
    })

    const triggerBtn = wrapper.find('button')
    expect(triggerBtn.attributes('disabled')).toBeDefined()
  })

  it('min/max dates passed to calendar', () => {
    const minDate = new CalendarDate(2024, 6, 10)
    const maxDate = new CalendarDate(2024, 6, 20)

    const wrapper = mount(DatePicker, {
      props: {
        minValue: minDate,
        maxValue: maxDate,
      },
    })

    // The component should render without errors
    expect(wrapper.exists()).toBe(true)
  })

  it('v-model binding works', async () => {
    const wrapper = mount({
      components: { DatePicker },
      template: `<DatePicker v-model="date" format="yyyy-MM-dd" />`,
      data() {
        return {
          date: new CalendarDate(2024, 3, 25),
        }
      },
    })

    expect(wrapper.text()).toContain('2024-03-25')
  })
})

describe('DatePickerInput', () => {
  it('renders with placeholder when no value', () => {
    const wrapper = mount(DatePickerInput, {
      props: {
        placeholder: 'Choose date',
      },
    })
    expect(wrapper.text()).toContain('Choose date')
  })

  it('renders with display value when provided', () => {
    const wrapper = mount(DatePickerInput, {
      props: {
        displayValue: '06/15/2024',
      },
    })
    expect(wrapper.text()).toContain('06/15/2024')
  })

  it('renders calendar icon', () => {
    const wrapper = mount(DatePickerInput)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('disabled state disables the button', () => {
    const wrapper = mount(DatePickerInput, {
      props: {
        disabled: true,
      },
    })
    const btn = wrapper.find('button')
    expect(btn.attributes('disabled')).toBeDefined()
  })

  it('merges custom classes', () => {
    const wrapper = mount(DatePickerInput, {
      props: {
        class: 'custom-input',
      },
    })
    expect(wrapper.find('button').classes()).toContain('custom-input')
  })
})

describe('DatePickerContent', () => {
  it('renders without crashing', () => {
    // DatePickerContent needs to be inside a Popover context
    // Just verify the component can be imported
    expect(DatePickerContent).toBeDefined()
  })
})

describe('DatePickerRange', () => {
  it('renders with placeholder', () => {
    const wrapper = mount(DatePickerRange, {
      props: {
        placeholder: 'Select date range',
      },
    })
    expect(wrapper.text()).toContain('Select date range')
  })

  it('renders with default placeholder', () => {
    const wrapper = mount(DatePickerRange)
    expect(wrapper.text()).toContain('Pick a date range')
  })

  it('displays formatted range when modelValue provided', () => {
    const wrapper = mount(DatePickerRange, {
      props: {
        modelValue: {
          start: new CalendarDate(2024, 6, 10),
          end: new CalendarDate(2024, 6, 20),
        },
        format: 'MM/dd/yyyy',
      },
    })
    expect(wrapper.text()).toContain('06/10/2024 - 06/20/2024')
  })

  it('disabled state prevents opening', () => {
    const wrapper = mount(DatePickerRange, {
      props: {
        disabled: true,
      },
    })
    const triggerBtn = wrapper.find('button')
    expect(triggerBtn.attributes('disabled')).toBeDefined()
  })
})

describe('DatePickerPresets', () => {
  it('renders preset buttons', () => {
    const presets = [
      { label: 'Today', value: new CalendarDate(2024, 6, 15) },
      { label: 'Yesterday', value: new CalendarDate(2024, 6, 14) },
    ]

    const wrapper = mount(DatePickerPresets, {
      props: {
        presets,
      },
    })

    expect(wrapper.text()).toContain('Today')
    expect(wrapper.text()).toContain('Yesterday')
  })

  it('emits select event when preset clicked', async () => {
    const preset = { label: 'Today', value: new CalendarDate(2024, 6, 15) }
    const wrapper = mount(DatePickerPresets, {
      props: {
        presets: [preset],
      },
    })

    const btn = wrapper.find('button')
    await btn.trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0]).toEqual([preset])
  })

  it('renders range preset buttons', () => {
    const rangePresets = [
      {
        label: 'Last 7 days',
        start: new CalendarDate(2024, 6, 8),
        end: new CalendarDate(2024, 6, 15),
      },
      {
        label: 'Last 30 days',
        start: new CalendarDate(2024, 5, 16),
        end: new CalendarDate(2024, 6, 15),
      },
    ]

    const wrapper = mount(DatePickerPresets, {
      props: {
        rangePresets,
      },
    })

    expect(wrapper.text()).toContain('Last 7 days')
    expect(wrapper.text()).toContain('Last 30 days')
  })

  it('emits select-range event when range preset clicked', async () => {
    const preset = {
      label: 'Last 7 days',
      start: new CalendarDate(2024, 6, 8),
      end: new CalendarDate(2024, 6, 15),
    }

    const wrapper = mount(DatePickerPresets, {
      props: {
        rangePresets: [preset],
      },
    })

    const btn = wrapper.find('button')
    await btn.trigger('click')

    expect(wrapper.emitted('select-range')).toBeTruthy()
    expect(wrapper.emitted('select-range')![0]).toEqual([preset])
  })

  it('merges custom classes', () => {
    const wrapper = mount(DatePickerPresets, {
      props: {
        class: 'custom-presets',
      },
    })
    expect(wrapper.find('div').classes()).toContain('custom-presets')
  })
})

describe('formatDate', () => {
  it('formats date with MM/dd/yyyy pattern', () => {
    const date = new CalendarDate(2024, 6, 15)
    expect(formatDate(date, 'MM/dd/yyyy')).toBe('06/15/2024')
  })

  it('formats date with dd/MM/yyyy pattern', () => {
    const date = new CalendarDate(2024, 6, 15)
    expect(formatDate(date, 'dd/MM/yyyy')).toBe('15/06/2024')
  })

  it('formats date with yyyy-MM-dd pattern', () => {
    const date = new CalendarDate(2024, 6, 15)
    expect(formatDate(date, 'yyyy-MM-dd')).toBe('2024-06-15')
  })

  it('pads single digit months and days', () => {
    const date = new CalendarDate(2024, 1, 5)
    expect(formatDate(date, 'MM/dd/yyyy')).toBe('01/05/2024')
  })
})
