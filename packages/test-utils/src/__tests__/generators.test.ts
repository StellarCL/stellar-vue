import { describe, it, expect } from 'vitest'
import {
  mockTableData,
  mockFormData,
  mockSelectOptions,
  mockBreadcrumbs,
} from '../mocks/generators'

describe('mockTableData', () => {
  it('generates 5 rows by default', () => {
    const data = mockTableData()
    expect(data).toHaveLength(5)
  })

  it('generates the specified number of rows', () => {
    expect(mockTableData(1)).toHaveLength(1)
    expect(mockTableData(10)).toHaveLength(10)
    expect(mockTableData(0)).toHaveLength(0)
  })

  it('includes an id field on every row', () => {
    const data = mockTableData(3)
    expect(data[0].id).toBe(1)
    expect(data[1].id).toBe(2)
    expect(data[2].id).toBe(3)
  })

  it('includes default columns: name, email, status, role', () => {
    const [row] = mockTableData(1)
    expect(row).toHaveProperty('name')
    expect(row).toHaveProperty('email')
    expect(row).toHaveProperty('status')
    expect(row).toHaveProperty('role')
  })

  it('respects custom column list', () => {
    const [row] = mockTableData(1, ['name', 'email'])
    expect(row).toHaveProperty('name')
    expect(row).toHaveProperty('email')
    expect(row).not.toHaveProperty('status')
    expect(row).not.toHaveProperty('role')
  })

  it('generates string values for name column', () => {
    const data = mockTableData(3, ['name'])
    for (const row of data) {
      expect(typeof row.name).toBe('string')
      expect((row.name as string).length).toBeGreaterThan(0)
    }
  })

  it('generates email-like strings for email column', () => {
    const [row] = mockTableData(1, ['email'])
    expect(typeof row.email).toBe('string')
    expect(row.email as string).toContain('@')
    expect(row.email as string).toContain('.')
  })

  it('generates valid status values', () => {
    const validStatuses = ['active', 'inactive', 'pending']
    const data = mockTableData(6, ['status'])
    for (const row of data) {
      expect(validStatuses).toContain(row.status)
    }
  })

  it('generates valid role values', () => {
    const validRoles = ['admin', 'user', 'moderator', 'viewer']
    const data = mockTableData(8, ['role'])
    for (const row of data) {
      expect(validRoles).toContain(row.role)
    }
  })

  it('generates boolean for active column', () => {
    const [row] = mockTableData(1, ['active'])
    expect(typeof row.active).toBe('boolean')
  })

  it('generates numeric age values', () => {
    const [row] = mockTableData(1, ['age'])
    expect(typeof row.age).toBe('number')
    expect(row.age as number).toBeGreaterThanOrEqual(20)
  })

  it('generates fallback string for unknown columns', () => {
    const [row] = mockTableData(1, ['customField'])
    expect(typeof row.customField).toBe('string')
    expect(row.customField as string).toContain('customField')
  })

  it('returns uniquely typed objects (not same reference)', () => {
    const data = mockTableData(2)
    expect(data[0]).not.toBe(data[1])
  })
})

describe('mockFormData', () => {
  it('returns an object with default fields', () => {
    const data = mockFormData()
    expect(data).toHaveProperty('name')
    expect(data).toHaveProperty('email')
    expect(data).toHaveProperty('password')
    expect(data).toHaveProperty('message')
  })

  it('only includes specified fields', () => {
    const data = mockFormData(['name', 'email'])
    expect(Object.keys(data)).toEqual(['name', 'email'])
  })

  it('returns string values for all fields', () => {
    const data = mockFormData(['name', 'email', 'phone'])
    for (const value of Object.values(data)) {
      expect(typeof value).toBe('string')
      expect(value.length).toBeGreaterThan(0)
    }
  })

  it('returns a sensible default for name', () => {
    const { name } = mockFormData(['name'])
    expect(name).toBe('Jane Doe')
  })

  it('returns a valid email for email field', () => {
    const { email } = mockFormData(['email'])
    expect(email).toContain('@')
    expect(email).toContain('.')
  })

  it('returns a fallback value for unknown fields', () => {
    const data = mockFormData(['unknownCustomField'])
    expect(data.unknownCustomField).toBe('test-unknownCustomField-value')
  })

  it('handles empty field list', () => {
    const data = mockFormData([])
    expect(Object.keys(data)).toHaveLength(0)
  })

  it('includes website, company, and title presets', () => {
    const data = mockFormData(['website', 'company', 'title'])
    expect(data.website).toContain('http')
    expect(typeof data.company).toBe('string')
    expect(typeof data.title).toBe('string')
  })
})

describe('mockSelectOptions', () => {
  it('generates 5 options by default', () => {
    const options = mockSelectOptions()
    expect(options).toHaveLength(5)
  })

  it('generates the specified number of options', () => {
    expect(mockSelectOptions(1)).toHaveLength(1)
    expect(mockSelectOptions(20)).toHaveLength(20)
    expect(mockSelectOptions(0)).toHaveLength(0)
  })

  it('each option has label and value properties', () => {
    const options = mockSelectOptions(3)
    for (const opt of options) {
      expect(opt).toHaveProperty('label')
      expect(opt).toHaveProperty('value')
      expect(typeof opt.label).toBe('string')
      expect(typeof opt.value).toBe('string')
    }
  })

  it('value is derived from label (lowercase, hyphenated)', () => {
    const [first] = mockSelectOptions(1)
    expect(first.value).toBe(first.label.toLowerCase().replace(/\s+/g, '-'))
  })

  it('generates unique values for the first 20 options', () => {
    const options = mockSelectOptions(20)
    const values = options.map((o) => o.value)
    const unique = new Set(values)
    expect(unique.size).toBe(20)
  })

  it('recycles labels for counts > 20', () => {
    const options = mockSelectOptions(21)
    expect(options[0].label).toBe(options[20].label)
  })
})

describe('mockBreadcrumbs', () => {
  it('generates 3 breadcrumbs by default', () => {
    const crumbs = mockBreadcrumbs()
    expect(crumbs).toHaveLength(3)
  })

  it('generates the specified number of breadcrumbs', () => {
    expect(mockBreadcrumbs(1)).toHaveLength(1)
    expect(mockBreadcrumbs(5)).toHaveLength(5)
    expect(mockBreadcrumbs(0)).toHaveLength(0)
  })

  it('each breadcrumb has label and href properties', () => {
    const crumbs = mockBreadcrumbs(4)
    for (const crumb of crumbs) {
      expect(crumb).toHaveProperty('label')
      expect(crumb).toHaveProperty('href')
      expect(typeof crumb.label).toBe('string')
      expect(typeof crumb.href).toBe('string')
    }
  })

  it('first breadcrumb href is "/"', () => {
    const [first] = mockBreadcrumbs(3)
    expect(first.href).toBe('/')
  })

  it('subsequent breadcrumbs have longer hrefs than the first', () => {
    const crumbs = mockBreadcrumbs(3)
    expect(crumbs[1].href.length).toBeGreaterThan(crumbs[0].href.length)
  })

  it('labels are non-empty strings', () => {
    const crumbs = mockBreadcrumbs(3)
    for (const crumb of crumbs) {
      expect(crumb.label.length).toBeGreaterThan(0)
    }
  })

  it('hrefs start with "/"', () => {
    const crumbs = mockBreadcrumbs(4)
    for (const crumb of crumbs) {
      expect(crumb.href.startsWith('/')).toBe(true)
    }
  })
})
