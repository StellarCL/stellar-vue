import type { HTMLAttributes } from 'vue'

export type FieldType = 'string' | 'number' | 'date' | 'enum'

export interface FieldOption {
  label: string
  value: string
}

export interface FieldConfig {
  /** Unique key for the field */
  key: string
  /** Display label */
  label: string
  /** Field data type */
  type: FieldType
  /** Options for enum fields */
  options?: FieldOption[]
}

export interface FilterCondition {
  /** Field key */
  field: string
  /** Operator for comparison */
  operator: string
  /** Value to compare against */
  value: string | number | null
}

export interface FilterGroup {
  /** Logical operator for combining rules */
  logic: 'and' | 'or'
  /** Child rules or nested groups */
  rules: FilterRule[]
}

export type FilterRule = FilterCondition | FilterGroup

export function isFilterGroup(rule: FilterRule): rule is FilterGroup {
  return 'logic' in rule && 'rules' in rule
}

export function isFilterCondition(rule: FilterRule): rule is FilterCondition {
  return 'field' in rule && 'operator' in rule
}

export type OperatorMap = Record<FieldType, string[]>

export const defaultOperators: OperatorMap = {
  string: ['equals', 'not_equals', 'contains', 'starts_with', 'ends_with'],
  number: ['equals', 'not_equals', 'greater_than', 'less_than', 'greater_or_equal', 'less_or_equal'],
  date: ['equals', 'not_equals', 'before', 'after'],
  enum: ['equals', 'not_equals'],
}

export const operatorLabels: Record<string, string> = {
  equals: 'equals',
  not_equals: 'not equals',
  contains: 'contains',
  starts_with: 'starts with',
  ends_with: 'ends with',
  greater_than: 'greater than',
  less_than: 'less than',
  greater_or_equal: 'greater or equal',
  less_or_equal: 'less or equal',
  before: 'before',
  after: 'after',
}

export interface FilterBuilderProps {
  /** Filter rules (v-model) — accepts a FilterGroup or an array of FilterRule[] */
  modelValue?: FilterRule[] | FilterGroup
  /** Available fields for filtering */
  fields: FieldConfig[]
  /** Map of operators per field type */
  operators?: OperatorMap
  /** Maximum nesting depth for groups */
  maxDepth?: number
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FilterRowProps {
  /** The filter condition to display */
  rule: FilterCondition
  /** Available fields */
  fields: FieldConfig[]
  /** Map of operators per field type */
  operators: OperatorMap
  /** Index of this rule in its parent array */
  index: number
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FilterGroupProps {
  /** The filter group to display */
  group: FilterGroup
  /** Available fields */
  fields: FieldConfig[]
  /** Map of operators per field type */
  operators: OperatorMap
  /** Current nesting depth */
  depth?: number
  /** Maximum nesting depth */
  maxDepth?: number
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FilterFieldProps {
  /** Currently selected field key */
  modelValue: string
  /** Available fields */
  fields: FieldConfig[]
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FilterOperatorProps {
  /** Currently selected operator */
  modelValue: string
  /** Available operators for the selected field type */
  operators: string[]
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FilterValueProps {
  /** Current value */
  modelValue: string | number | null
  /** Field type for adapter rendering */
  fieldType: FieldType
  /** Options for enum fields */
  options?: FieldOption[]
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
