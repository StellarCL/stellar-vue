import type { FormFieldConfig } from './form-fields'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { toFormFields } from './form-fields'

describe('toFormFields', () => {
  it('returns empty array for non-schema input', () => {
    expect(toFormFields(null)).toEqual([])
    expect(toFormFields(undefined)).toEqual([])
    expect(toFormFields({})).toEqual([])
  })

  it('extracts string fields as text type', () => {
    const schema = z.object({
      name: z.string(),
    })
    const fields = toFormFields(schema)

    expect(fields).toHaveLength(1)
    expect(fields[0]).toMatchObject({
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    })
  })

  it('converts camelCase field names to Title Case labels', () => {
    const schema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      emailAddress: z.string(),
    })
    const fields = toFormFields(schema)

    expect(fields[0].label).toBe('First Name')
    expect(fields[1].label).toBe('Last Name')
    expect(fields[2].label).toBe('Email Address')
  })

  it('converts snake_case field names to Title Case labels', () => {
    const schema = z.object({
      first_name: z.string(),
      last_name: z.string(),
    })
    const fields = toFormFields(schema)

    expect(fields[0].label).toBe('First Name')
    expect(fields[1].label).toBe('Last Name')
  })

  it('detects email strings', () => {
    const schema = z.object({
      email: z.string().email(),
    })
    const fields = toFormFields(schema)

    expect(fields[0].type).toBe('email')
  })

  it('extracts number fields', () => {
    const schema = z.object({
      age: z.number(),
    })
    const fields = toFormFields(schema)

    expect(fields[0]).toMatchObject({
      name: 'age',
      type: 'number',
      required: true,
    })
  })

  it('extracts boolean fields as checkbox', () => {
    const schema = z.object({
      acceptTerms: z.boolean(),
    })
    const fields = toFormFields(schema)

    expect(fields[0]).toMatchObject({
      name: 'acceptTerms',
      label: 'Accept Terms',
      type: 'checkbox',
      required: true,
    })
  })

  it('extracts enum fields as select with options', () => {
    const schema = z.object({
      role: z.enum(['admin', 'user', 'moderator']),
    })
    const fields = toFormFields(schema)

    expect(fields[0]).toMatchObject({
      name: 'role',
      type: 'select',
      required: true,
    })
    expect(fields[0].options).toEqual([
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
      { label: 'Moderator', value: 'moderator' },
    ])
  })

  it('extracts date fields', () => {
    const schema = z.object({
      birthDate: z.date(),
    })
    const fields = toFormFields(schema)

    expect(fields[0]).toMatchObject({
      name: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      required: true,
    })
  })

  it('marks optional fields as not required', () => {
    const schema = z.object({
      name: z.string(),
      nickname: z.string().optional(),
    })
    const fields = toFormFields(schema)

    expect(fields[0].required).toBe(true)
    expect(fields[1].required).toBe(false)
  })

  it('marks fields with defaults as not required', () => {
    const schema = z.object({
      role: z.string().default('user'),
    })
    const fields = toFormFields(schema)

    expect(fields[0].required).toBe(false)
  })

  it('marks nullable fields as not required', () => {
    const schema = z.object({
      middleName: z.string().nullable(),
    })
    const fields = toFormFields(schema)

    expect(fields[0].required).toBe(false)
  })

  it('extracts min/max rules from strings', () => {
    const schema = z.object({
      username: z.string().min(3).max(20),
    })
    const fields = toFormFields(schema)

    expect(fields[0].rules).toEqual({
      min: 3,
      max: 20,
    })
  })

  it('extracts min/max rules from numbers', () => {
    const schema = z.object({
      age: z.number().min(0).max(150),
    })
    const fields = toFormFields(schema)

    expect(fields[0].rules).toEqual({
      min: 0,
      max: 150,
    })
  })

  it('extracts regex pattern from strings', () => {
    const schema = z.object({
      code: z.string().regex(/^[A-Z]{3}$/),
    })
    const fields = toFormFields(schema)

    expect(fields[0].rules).toMatchObject({
      pattern: '^[A-Z]{3}$',
    })
  })

  it('uses textarea for strings with max > 255', () => {
    const schema = z.object({
      bio: z.string().max(1000),
    })
    const fields = toFormFields(schema)

    expect(fields[0].type).toBe('textarea')
  })

  it('handles complex schemas with mixed field types', () => {
    const schema = z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      age: z.number().min(18).max(120),
      bio: z.string().max(500).optional(),
      role: z.enum(['admin', 'user']),
      acceptTerms: z.boolean(),
    })
    const fields = toFormFields(schema)

    expect(fields).toHaveLength(7)

    const fieldMap = Object.fromEntries(fields.map(f => [f.name, f])) as Record<
      string,
      FormFieldConfig
    >

    expect(fieldMap.firstName.type).toBe('text')
    expect(fieldMap.firstName.required).toBe(true)
    expect(fieldMap.lastName.type).toBe('text')
    expect(fieldMap.email.type).toBe('email')
    expect(fieldMap.age.type).toBe('number')
    expect(fieldMap.bio.type).toBe('textarea')
    expect(fieldMap.bio.required).toBe(false)
    expect(fieldMap.role.type).toBe('select')
    expect(fieldMap.role.options).toHaveLength(2)
    expect(fieldMap.acceptTerms.type).toBe('checkbox')
  })

  it('handles native enums', () => {
    enum Color {
      Red = 'red',
      Green = 'green',
      Blue = 'blue',
    }

    const schema = z.object({
      color: z.nativeEnum(Color),
    })
    const fields = toFormFields(schema)

    expect(fields[0]).toMatchObject({
      name: 'color',
      type: 'select',
    })
    expect(fields[0].options).toBeDefined()
    expect(fields[0].options!.length).toBeGreaterThan(0)
  })

  it('generates placeholder text for text inputs', () => {
    const schema = z.object({
      firstName: z.string(),
    })
    const fields = toFormFields(schema)

    expect(fields[0].placeholder).toBe('Enter first name')
  })

  it('generates placeholder text for number inputs', () => {
    const schema = z.object({
      age: z.number(),
    })
    const fields = toFormFields(schema)

    expect(fields[0].placeholder).toBe('Enter age')
  })

  it('unwraps deeply nested optional/default chains', () => {
    const schema = z.object({
      field: z.string().optional().default('hello'),
    })
    const fields = toFormFields(schema)

    expect(fields[0]).toMatchObject({
      name: 'field',
      type: 'text',
      required: false,
    })
  })
})
