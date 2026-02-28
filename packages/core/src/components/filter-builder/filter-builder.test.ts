import type {
  FieldConfig,
  FilterCondition,
  FilterGroup as FilterGroupType,
  FilterRule,
} from './filter-builder.types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  defaultOperators,
  isFilterCondition,
  isFilterGroup,
} from './filter-builder.types'
import FilterBuilder from './FilterBuilder.vue'
import FilterField from './FilterField.vue'
import FilterGroup from './FilterGroup.vue'
import FilterOperator from './FilterOperator.vue'
import FilterRow from './FilterRow.vue'
import FilterValue from './FilterValue.vue'

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

const testFields: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'created', label: 'Created Date', type: 'date' },
  {
    key: 'status',
    label: 'Status',
    type: 'enum',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Pending', value: 'pending' },
    ],
  },
]

function makeCondition(overrides: Partial<FilterCondition> = {}): FilterCondition {
  return {
    field: 'name',
    operator: 'equals',
    value: 'John',
    ...overrides,
  }
}

function makeGroup(overrides: Partial<FilterGroupType> = {}): FilterGroupType {
  return {
    logic: 'and',
    rules: [makeCondition()],
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// Type guard utilities
// ---------------------------------------------------------------------------

describe('filter-builder type guards', () => {
  it('isFilterGroup identifies groups', () => {
    const group: FilterGroupType = { logic: 'and', rules: [] }
    expect(isFilterGroup(group)).toBe(true)
  })

  it('isFilterGroup rejects conditions', () => {
    const condition: FilterCondition = { field: 'name', operator: 'equals', value: 'test' }
    expect(isFilterGroup(condition)).toBe(false)
  })

  it('isFilterCondition identifies conditions', () => {
    const condition: FilterCondition = { field: 'name', operator: 'equals', value: 'test' }
    expect(isFilterCondition(condition)).toBe(true)
  })

  it('isFilterCondition rejects groups', () => {
    const group: FilterGroupType = { logic: 'and', rules: [] }
    expect(isFilterCondition(group)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// FilterField
// ---------------------------------------------------------------------------

describe('filterField', () => {
  it('renders a select with field options', () => {
    const wrapper = mount(FilterField, {
      props: {
        modelValue: 'name',
        fields: testFields,
      },
    })
    const options = wrapper.findAll('option')
    // 1 disabled placeholder + 4 fields
    expect(options.length).toBe(5)
    expect(options[1].text()).toBe('Name')
    expect(options[2].text()).toBe('Age')
  })

  it('emits update:modelValue when changed', async () => {
    const wrapper = mount(FilterField, {
      props: {
        modelValue: 'name',
        fields: testFields,
      },
    })
    await wrapper.find('select').setValue('age')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['age'])
  })

  it('has aria-label', () => {
    const wrapper = mount(FilterField, {
      props: { modelValue: 'name', fields: testFields },
    })
    expect(wrapper.find('select').attributes('aria-label')).toBe('Select field')
  })
})

// ---------------------------------------------------------------------------
// FilterOperator
// ---------------------------------------------------------------------------

describe('filterOperator', () => {
  it('renders operators for string field type', () => {
    const wrapper = mount(FilterOperator, {
      props: {
        modelValue: 'equals',
        operators: defaultOperators.string,
      },
    })
    const options = wrapper.findAll('option')
    // 1 placeholder + 5 string operators
    expect(options.length).toBe(6)
    expect(options[1].text()).toBe('equals')
    expect(options[2].text()).toBe('not equals')
  })

  it('emits update:modelValue when changed', async () => {
    const wrapper = mount(FilterOperator, {
      props: {
        modelValue: 'equals',
        operators: defaultOperators.string,
      },
    })
    await wrapper.find('select').setValue('contains')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['contains'])
  })

  it('has aria-label', () => {
    const wrapper = mount(FilterOperator, {
      props: { modelValue: 'equals', operators: defaultOperators.string },
    })
    expect(wrapper.find('select').attributes('aria-label')).toBe('Select operator')
  })
})

// ---------------------------------------------------------------------------
// FilterValue
// ---------------------------------------------------------------------------

describe('filterValue', () => {
  it('renders text input for string field type', () => {
    const wrapper = mount(FilterValue, {
      props: { modelValue: '', fieldType: 'string' },
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')
  })

  it('renders number input for number field type', () => {
    const wrapper = mount(FilterValue, {
      props: { modelValue: null, fieldType: 'number' },
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('number')
  })

  it('renders date input for date field type', () => {
    const wrapper = mount(FilterValue, {
      props: { modelValue: null, fieldType: 'date' },
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('date')
  })

  it('renders select for enum field type', () => {
    const wrapper = mount(FilterValue, {
      props: {
        modelValue: '',
        fieldType: 'enum',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
      },
    })
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
    const options = wrapper.findAll('option')
    // 1 placeholder + 2 options
    expect(options.length).toBe(3)
  })

  it('emits update:modelValue for text input', async () => {
    const wrapper = mount(FilterValue, {
      props: { modelValue: '', fieldType: 'string' },
    })
    const input = wrapper.find('input')
    // Simulate input event
    Object.defineProperty(input.element, 'value', { value: 'hello', writable: true })
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('emits numeric value for number input', async () => {
    const wrapper = mount(FilterValue, {
      props: { modelValue: null, fieldType: 'number' },
    })
    const input = wrapper.find('input')
    Object.defineProperty(input.element, 'value', { value: '42', writable: true })
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([42])
  })

  it('emits null for empty number input', async () => {
    const wrapper = mount(FilterValue, {
      props: { modelValue: 42, fieldType: 'number' },
    })
    const input = wrapper.find('input')
    Object.defineProperty(input.element, 'value', { value: '', writable: true })
    await input.trigger('input')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null])
  })
})

// ---------------------------------------------------------------------------
// FilterRow
// ---------------------------------------------------------------------------

describe('filterRow', () => {
  it('renders field, operator, and value controls', () => {
    const wrapper = mount(FilterRow, {
      props: {
        rule: makeCondition(),
        fields: testFields,
        operators: defaultOperators,
        index: 0,
      },
    })
    // Two selects (field + operator) and one input (value)
    expect(wrapper.findAll('select').length).toBe(2)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders a remove button', () => {
    const wrapper = mount(FilterRow, {
      props: {
        rule: makeCondition(),
        fields: testFields,
        operators: defaultOperators,
        index: 0,
      },
    })
    const removeBtn = wrapper.find('button[aria-label="Remove rule"]')
    expect(removeBtn.exists()).toBe(true)
  })

  it('emits remove when remove button is clicked', async () => {
    const wrapper = mount(FilterRow, {
      props: {
        rule: makeCondition(),
        fields: testFields,
        operators: defaultOperators,
        index: 0,
      },
    })
    await wrapper.find('button[aria-label="Remove rule"]').trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
  })

  it('emits update:rule when field changes', async () => {
    const wrapper = mount(FilterRow, {
      props: {
        rule: makeCondition(),
        fields: testFields,
        operators: defaultOperators,
        index: 0,
      },
    })
    const selects = wrapper.findAll('select')
    // First select is field selector
    await selects[0].setValue('age')
    const emitted = wrapper.emitted('update:rule')
    expect(emitted).toBeTruthy()
    const updatedRule = emitted![0][0] as FilterCondition
    expect(updatedRule.field).toBe('age')
    // Should reset operator to first available for number type
    expect(updatedRule.operator).toBe(defaultOperators.number[0])
    // Should reset value
    expect(updatedRule.value).toBeNull()
  })

  it('field selector changes available operators', async () => {
    const wrapper = mount(FilterRow, {
      props: {
        rule: makeCondition(),
        fields: testFields,
        operators: defaultOperators,
        index: 0,
      },
    })

    // Initially string operators: 5 operators + 1 placeholder = 6
    const operatorSelect = wrapper.findAll('select')[1]
    expect(operatorSelect.findAll('option').length).toBe(6)

    // Change field to age (number)
    await wrapper.findAll('select')[0].setValue('age')

    // After field change, emits update:rule which parent would handle
    // In isolation, we verify the emitted value has the right operator
    const emitted = wrapper.emitted('update:rule')
    expect(emitted).toBeTruthy()
    const updatedRule = emitted![0][0] as FilterCondition
    expect(updatedRule.field).toBe('age')
    expect(defaultOperators.number).toContain(updatedRule.operator)
  })

  it('value input adapts to field type - renders number input for number field', () => {
    const wrapper = mount(FilterRow, {
      props: {
        rule: makeCondition({ field: 'age', operator: 'equals', value: 25 }),
        fields: testFields,
        operators: defaultOperators,
        index: 0,
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('number')
  })

  it('value input adapts to field type - renders select for enum field', () => {
    const wrapper = mount(FilterRow, {
      props: {
        rule: makeCondition({ field: 'status', operator: 'equals', value: 'active' }),
        fields: testFields,
        operators: defaultOperators,
        index: 0,
      },
    })
    // 3 selects: field, operator, value (enum renders a select)
    expect(wrapper.findAll('select').length).toBe(3)
  })

  it('value input adapts to field type - renders date input for date field', () => {
    const wrapper = mount(FilterRow, {
      props: {
        rule: makeCondition({ field: 'created', operator: 'equals', value: '2024-01-01' }),
        fields: testFields,
        operators: defaultOperators,
        index: 0,
      },
    })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('date')
  })
})

// ---------------------------------------------------------------------------
// FilterGroup
// ---------------------------------------------------------------------------

describe('filterGroup', () => {
  it('renders with AND/OR toggle', () => {
    const wrapper = mount(FilterGroup, {
      props: {
        group: makeGroup(),
        fields: testFields,
        operators: defaultOperators,
      },
    })
    const toggleBtn = wrapper.find('[data-testid="logic-toggle"]')
    expect(toggleBtn.exists()).toBe(true)
    expect(toggleBtn.text()).toBe('and')
  })

  it('toggles AND to OR when logic button is clicked', async () => {
    const wrapper = mount(FilterGroup, {
      props: {
        group: makeGroup({ logic: 'and' }),
        fields: testFields,
        operators: defaultOperators,
      },
    })
    await wrapper.find('[data-testid="logic-toggle"]').trigger('click')
    const emitted = wrapper.emitted('update:group')
    expect(emitted).toBeTruthy()
    expect((emitted![0][0] as FilterGroupType).logic).toBe('or')
  })

  it('toggles OR to AND when logic button is clicked', async () => {
    const wrapper = mount(FilterGroup, {
      props: {
        group: makeGroup({ logic: 'or' }),
        fields: testFields,
        operators: defaultOperators,
      },
    })
    await wrapper.find('[data-testid="logic-toggle"]').trigger('click')
    const emitted = wrapper.emitted('update:group')
    expect(emitted).toBeTruthy()
    expect((emitted![0][0] as FilterGroupType).logic).toBe('and')
  })

  it('has add rule button', () => {
    const wrapper = mount(FilterGroup, {
      props: {
        group: makeGroup(),
        fields: testFields,
        operators: defaultOperators,
      },
    })
    expect(wrapper.find('[data-testid="add-rule-button"]').exists()).toBe(true)
  })

  it('add rule button adds a new rule', async () => {
    const wrapper = mount(FilterGroup, {
      props: {
        group: makeGroup({ rules: [makeCondition()] }),
        fields: testFields,
        operators: defaultOperators,
      },
    })
    await wrapper.find('[data-testid="add-rule-button"]').trigger('click')
    const emitted = wrapper.emitted('update:group')
    expect(emitted).toBeTruthy()
    const updatedGroup = emitted![0][0] as FilterGroupType
    expect(updatedGroup.rules.length).toBe(2)
  })

  it('has add group button when below max depth', () => {
    const wrapper = mount(FilterGroup, {
      props: {
        group: makeGroup(),
        fields: testFields,
        operators: defaultOperators,
        depth: 0,
        maxDepth: 3,
      },
    })
    expect(wrapper.find('[data-testid="add-group-button"]').exists()).toBe(true)
  })

  it('does not show add group button at max depth', () => {
    const wrapper = mount(FilterGroup, {
      props: {
        group: makeGroup(),
        fields: testFields,
        operators: defaultOperators,
        depth: 2,
        maxDepth: 3,
      },
    })
    expect(wrapper.find('[data-testid="add-group-button"]').exists()).toBe(false)
  })

  it('remove rule removes it from the group', async () => {
    const group = makeGroup({
      rules: [
        makeCondition({ field: 'name', value: 'John' }),
        makeCondition({ field: 'age', value: 30 }),
      ],
    })
    const wrapper = mount(FilterGroup, {
      props: {
        group,
        fields: testFields,
        operators: defaultOperators,
      },
    })
    // Click the first remove button
    const removeButtons = wrapper.findAll('button[aria-label="Remove rule"]')
    expect(removeButtons.length).toBe(2)
    await removeButtons[0].trigger('click')

    const emitted = wrapper.emitted('update:group')
    expect(emitted).toBeTruthy()
    const updatedGroup = emitted![0][0] as FilterGroupType
    expect(updatedGroup.rules.length).toBe(1)
  })

  it('renders nested groups with indentation', () => {
    const nestedGroup: FilterGroupType = {
      logic: 'and',
      rules: [
        makeCondition(),
        {
          logic: 'or',
          rules: [makeCondition({ field: 'age', operator: 'greater_than', value: 18 })],
        },
      ],
    }
    const wrapper = mount(FilterGroup, {
      props: {
        group: nestedGroup,
        fields: testFields,
        operators: defaultOperators,
        depth: 0,
        maxDepth: 3,
      },
    })
    const groups = wrapper.findAll('[data-testid="filter-group"]')
    // Root group + nested group
    expect(groups.length).toBe(2)
  })

  it('shows remove group button for nested groups (depth > 0)', () => {
    const wrapper = mount(FilterGroup, {
      props: {
        group: makeGroup(),
        fields: testFields,
        operators: defaultOperators,
        depth: 1,
        maxDepth: 3,
      },
    })
    expect(wrapper.find('button[aria-label="Remove group"]').exists()).toBe(true)
  })

  it('does not show remove group button for root group (depth === 0)', () => {
    const wrapper = mount(FilterGroup, {
      props: {
        group: makeGroup(),
        fields: testFields,
        operators: defaultOperators,
        depth: 0,
        maxDepth: 3,
      },
    })
    expect(wrapper.find('button[aria-label="Remove group"]').exists()).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// FilterBuilder (root component)
// ---------------------------------------------------------------------------

describe('filterBuilder', () => {
  it('renders with initial rules', () => {
    const initialGroup: FilterGroupType = {
      logic: 'and',
      rules: [
        makeCondition({ field: 'name', operator: 'equals', value: 'John' }),
        makeCondition({ field: 'age', operator: 'greater_than', value: 25 }),
      ],
    }
    const wrapper = mount(FilterBuilder, {
      props: {
        modelValue: initialGroup,
        fields: testFields,
      },
    })
    expect(wrapper.find('[data-testid="filter-builder"]').exists()).toBe(true)
    const rows = wrapper.findAll('[data-testid="filter-row"]')
    expect(rows.length).toBe(2)
  })

  it('renders with empty rules', () => {
    const wrapper = mount(FilterBuilder, {
      props: {
        modelValue: { logic: 'and' as const, rules: [] },
        fields: testFields,
      },
    })
    expect(wrapper.find('[data-testid="filter-builder"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-testid="filter-row"]').length).toBe(0)
  })

  it('add rule button adds new rule', async () => {
    const wrapper = mount(FilterBuilder, {
      props: {
        modelValue: { logic: 'and' as const, rules: [] },
        fields: testFields,
      },
    })
    await wrapper.find('[data-testid="add-rule-button"]').trigger('click')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    const updatedGroup = emitted![0][0] as FilterGroupType
    expect(updatedGroup.rules.length).toBe(1)
  })

  it('remove rule removes it', async () => {
    const initialGroup: FilterGroupType = {
      logic: 'and',
      rules: [
        makeCondition({ field: 'name', operator: 'equals', value: 'John' }),
        makeCondition({ field: 'age', operator: 'greater_than', value: 25 }),
      ],
    }
    const wrapper = mount(FilterBuilder, {
      props: {
        modelValue: initialGroup,
        fields: testFields,
      },
    })
    const removeButtons = wrapper.findAll('button[aria-label="Remove rule"]')
    expect(removeButtons.length).toBe(2)
    await removeButtons[0].trigger('click')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    const updatedGroup = emitted![0][0] as FilterGroupType
    expect(updatedGroup.rules.length).toBe(1)
  })

  it('nested group with AND/OR toggle works', async () => {
    const nestedGroup: FilterGroupType = {
      logic: 'and',
      rules: [
        makeCondition(),
        {
          logic: 'or',
          rules: [makeCondition({ field: 'age', operator: 'greater_than', value: 18 })],
        },
      ],
    }
    const wrapper = mount(FilterBuilder, {
      props: {
        modelValue: nestedGroup,
        fields: testFields,
      },
    })
    const logicToggles = wrapper.findAll('[data-testid="logic-toggle"]')
    // Root group toggle + nested group toggle
    expect(logicToggles.length).toBe(2)
    expect(logicToggles[0].text()).toBe('and')
    expect(logicToggles[1].text()).toBe('or')
  })

  it('v-model updates on rule changes', async () => {
    const initialGroup: FilterGroupType = {
      logic: 'and',
      rules: [makeCondition({ field: 'name', operator: 'equals', value: 'John' })],
    }
    const wrapper = mount(FilterBuilder, {
      props: {
        modelValue: initialGroup,
        fields: testFields,
      },
    })

    // Change the field in the first row
    const fieldSelect = wrapper.findAll('select')[0]
    await fieldSelect.setValue('age')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
  })

  it('accepts custom class', () => {
    const wrapper = mount(FilterBuilder, {
      props: {
        modelValue: { logic: 'and' as const, rules: [] },
        fields: testFields,
        class: 'custom-filter',
      },
    })
    expect(wrapper.find('[data-testid="filter-builder"]').classes()).toContain('custom-filter')
  })

  it('accepts custom operators map', () => {
    const customOperators = {
      string: ['equals', 'contains'],
      number: ['equals', 'greater_than'],
      date: ['equals'],
      enum: ['equals'],
    }
    const wrapper = mount(FilterBuilder, {
      props: {
        modelValue: {
          logic: 'and' as const,
          rules: [makeCondition({ field: 'name', operator: 'equals', value: 'test' })],
        },
        fields: testFields,
        operators: customOperators,
      },
    })
    // Operator select should show only 2 options + placeholder = 3
    const operatorSelect = wrapper.findAll('select')[1]
    expect(operatorSelect.findAll('option').length).toBe(3)
  })

  it('wraps array modelValue in an AND group', () => {
    const rules: FilterRule[] = [
      makeCondition({ field: 'name', operator: 'equals', value: 'John' }),
    ]
    const wrapper = mount(FilterBuilder, {
      props: {
        modelValue: rules as any,
        fields: testFields,
      },
    })
    // Should still render properly
    expect(wrapper.find('[data-testid="filter-builder"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-testid="filter-row"]').length).toBe(1)
  })
})
