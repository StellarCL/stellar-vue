// ─── Types ───────────────────────────────────────────────────────────────────

export interface MockTableRow {
  id: number
  [key: string]: string | number | boolean
}

export interface MockFormData {
  [field: string]: string
}

export interface MockSelectOption {
  label: string
  value: string
}

export interface MockBreadcrumb {
  label: string
  href: string
}

// ─── Generators ──────────────────────────────────────────────────────────────

/**
 * Generates an array of objects suitable for DataTable testing.
 *
 * @param count - Number of rows to generate (default: 5)
 * @param columns - Column names to include (default: ['name', 'email', 'status', 'role'])
 *
 * @example
 * const rows = mockTableData(10, ['name', 'email'])
 */
export function mockTableData(
  count: number = 5,
  columns: string[] = ['name', 'email', 'status', 'role'],
): MockTableRow[] {
  const statuses = ['active', 'inactive', 'pending']
  const roles = ['admin', 'user', 'moderator', 'viewer']
  const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Iris', 'Jack']
  const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson']

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[i % firstNames.length]!
    const lastName = lastNames[i % lastNames.length]!
    const row: MockTableRow = { id: i + 1 }

    for (const col of columns) {
      switch (col) {
        case 'name':
          row[col] = `${firstName} ${lastName}`
          break
        case 'firstName':
          row[col] = firstName!
          break
        case 'lastName':
          row[col] = lastName!
          break
        case 'email':
          row[col] = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i > 0 ? i : ''}@example.com`
          break
        case 'status':
          row[col] = statuses[i % statuses.length]!
          break
        case 'role':
          row[col] = roles[i % roles.length]!
          break
        case 'age':
          row[col] = 20 + (i % 40)
          break
        case 'active':
          row[col] = i % 2 === 0
          break
        default:
          row[col] = `${col}-value-${i + 1}`
      }
    }

    return row
  })
}

/**
 * Generates form field values for form testing.
 *
 * @param fields - Field names to include (default: ['name', 'email', 'password', 'message'])
 *
 * @example
 * const data = mockFormData(['username', 'email'])
 */
export function mockFormData(
  fields: string[] = ['name', 'email', 'password', 'message'],
): MockFormData {
  const defaults: Record<string, string> = {
    name: 'Jane Doe',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    password: 'SecureP@ssw0rd!',
    confirmPassword: 'SecureP@ssw0rd!',
    message: 'This is a test message for form testing purposes.',
    phone: '+1 (555) 123-4567',
    address: '123 Test Street',
    city: 'Testville',
    state: 'CA',
    zip: '90210',
    country: 'US',
    username: 'janedoe',
    bio: 'A short bio for testing.',
    website: 'https://example.com',
    company: 'Acme Corp',
    title: 'Software Engineer',
  }

  return fields.reduce<MockFormData>((acc, field) => {
    acc[field] = defaults[field] ?? `test-${field}-value`
    return acc
  }, {})
}

/**
 * Generates an array of { label, value } option pairs for Select/Combobox testing.
 *
 * @param count - Number of options to generate (default: 5)
 *
 * @example
 * const options = mockSelectOptions(10)
 */
export function mockSelectOptions(count: number = 5): MockSelectOption[] {
  const labels = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
    'Orange',
    'Papaya',
    'Quince',
    'Raspberry',
    'Strawberry',
    'Tangerine',
    'Ugli Fruit',
    'Watermelon',
  ]

  return Array.from({ length: count }, (_, i) => {
    const label = labels[i % labels.length]!
    return {
      label,
      value: label.toLowerCase().replace(/\s+/g, '-'),
    }
  })
}

/**
 * Generates an array of breadcrumb items with label and href.
 *
 * @param count - Number of breadcrumb items to generate (default: 3)
 *
 * @example
 * const crumbs = mockBreadcrumbs(4)
 */
export function mockBreadcrumbs(count: number = 3): MockBreadcrumb[] {
  const segments = ['Home', 'Products', 'Category', 'Item', 'Details', 'Settings', 'Profile']

  return Array.from({ length: count }, (_, i) => {
    const label = segments[i % segments.length]!
    const isFirst = i === 0
    const href = isFirst ? '/' : `/${segments.slice(1, i + 1).map(s => s.toLowerCase()).join('/')}`

    return { label, href }
  })
}
