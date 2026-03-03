export interface FormFieldConfig {
  name: string
  label: string
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'date'
  required: boolean
  placeholder?: string
  options?: { label: string, value: string }[]
  rules?: { min?: number, max?: number, pattern?: string }
}

/**
 * Convert a camelCase or snake_case string to Title Case.
 * e.g. "firstName" → "First Name", "last_name" → "Last Name"
 */
function toTitleCase(str: string): string {
  return (
    str
      // Insert space before uppercase letters (camelCase)
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Replace underscores and hyphens with spaces
      .replace(/[_-]/g, ' ')
      // Capitalize first letter of each word
      .replace(/\b\w/g, c => c.toUpperCase())
  )
}

/**
 * Unwrap optional/nullable/default/branded/effects wrappers to get
 * the innermost Zod type definition. Returns { def, isOptional }.
 */
function unwrapDef(def: any): { def: any, isOptional: boolean } {
  let isOptional = false
  let current = def

  // Walk through wrapper types to find the inner type
  while (current) {
    const typeName = current.typeName

    if (typeName === 'ZodOptional' || typeName === 'ZodNullable') {
      isOptional = true
      current = current.innerType?._def
    }
    else if (typeName === 'ZodDefault') {
      // Fields with defaults are technically optional from a user perspective
      isOptional = true
      current = current.innerType?._def
    }
    else if (typeName === 'ZodEffects') {
      // .transform(), .refine(), .superRefine()
      current = current.schema?._def
    }
    else if (typeName === 'ZodBranded') {
      current = current.type?._def
    }
    else if (typeName === 'ZodPipeline') {
      current = current.in?._def
    }
    else {
      break
    }
  }

  return { def: current, isOptional }
}

/**
 * Extract validation rules from a Zod type's checks array.
 */
function extractRules(def: any): FormFieldConfig['rules'] {
  const rules: FormFieldConfig['rules'] = {}
  const checks: any[] = def?.checks || []

  for (const check of checks) {
    if (check.kind === 'min') {
      rules.min = check.value
    }
    else if (check.kind === 'max') {
      rules.max = check.value
    }
    else if (check.kind === 'regex') {
      rules.pattern = check.regex?.source
    }
  }

  return Object.keys(rules).length > 0 ? rules : undefined
}

/**
 * Determine the input type from a Zod string type's checks.
 * Checks for .email(), .url(), etc.
 */
function detectStringSubtype(def: any): FormFieldConfig['type'] {
  const checks: any[] = def?.checks || []

  for (const check of checks) {
    if (check.kind === 'email') {
      return 'email'
    }
    if (check.kind === 'url') {
      return 'text'
    }
  }

  return 'text'
}

/**
 * Introspect a Zod object schema to extract form field configurations.
 * Works by examining schema.shape and each field's type chain.
 *
 * @param schema - A Zod object schema (z.object({ ... }))
 * @returns An array of FormFieldConfig objects describing each field
 */
export function toFormFields(schema: any): FormFieldConfig[] {
  if (!schema || !schema._def) {
    return []
  }

  // Get the shape - could be schema.shape or schema._def.shape()
  let shape: Record<string, any> | undefined

  if (typeof schema.shape === 'object' && schema.shape !== null) {
    shape = schema.shape
  }
  else if (typeof schema._def.shape === 'function') {
    shape = schema._def.shape()
  }
  else if (typeof schema._def.shape === 'object' && schema._def.shape !== null) {
    shape = schema._def.shape
  }

  if (!shape) {
    return []
  }

  const fields: FormFieldConfig[] = []

  for (const [name, fieldSchema] of Object.entries(shape)) {
    const rawDef = (fieldSchema as any)?._def
    if (!rawDef) {
      continue
    }

    const { def, isOptional } = unwrapDef(rawDef)
    if (!def) {
      continue
    }

    const typeName: string = def.typeName || ''
    const config: FormFieldConfig = {
      name,
      label: toTitleCase(name),
      type: 'text',
      required: !isOptional,
    }

    // Determine field type based on Zod type
    switch (typeName) {
      case 'ZodString': {
        config.type = detectStringSubtype(def)
        const rules = extractRules(def)
        if (rules) {
          config.rules = rules
        }

        // Check for long text hints via max length
        const checks: any[] = def.checks || []
        const maxCheck = checks.find((c: any) => c.kind === 'max')
        if (maxCheck && maxCheck.value > 255) {
          config.type = 'textarea'
        }

        config.placeholder = `Enter ${config.label.toLowerCase()}`
        break
      }

      case 'ZodNumber': {
        config.type = 'number'
        const rules = extractRules(def)
        if (rules) {
          config.rules = rules
        }
        config.placeholder = `Enter ${config.label.toLowerCase()}`
        break
      }

      case 'ZodBoolean': {
        config.type = 'checkbox'
        break
      }

      case 'ZodEnum': {
        config.type = 'select'
        const values: string[] = def.values || []
        config.options = values.map((v: string) => ({
          label: toTitleCase(v),
          value: v,
        }))
        break
      }

      case 'ZodNativeEnum': {
        config.type = 'select'
        const nativeEnum = def.values || {}
        // Native enums can have reverse mappings for numeric enums,
        // so filter to only string keys with string values
        const entries = Object.entries(nativeEnum)
        config.options = entries
          .filter(
            ([key, val]) =>
              typeof val === 'string'
              || (typeof val === 'number' && typeof key === 'string' && Number.isNaN(Number(key))),
          )
          .map(([key, val]) => ({
            label: toTitleCase(typeof val === 'string' ? val : key),
            value: String(typeof val === 'string' ? val : val),
          }))
        break
      }

      case 'ZodDate': {
        config.type = 'date'
        break
      }

      default: {
        // Fallback to text for unknown types
        config.type = 'text'
        config.placeholder = `Enter ${config.label.toLowerCase()}`
        break
      }
    }

    fields.push(config)
  }

  return fields
}
