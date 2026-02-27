import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('merges basic classes', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('handles conditional classes with falsy values', () => {
    expect(cn('px-4', false && 'py-2', null, undefined, 'mt-2')).toBe('px-4 mt-2')
  })

  it('resolves Tailwind conflicts', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })

  it('resolves complex Tailwind conflicts', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
  })

  it('handles undefined and null values', () => {
    expect(cn(undefined, null)).toBe('')
  })

  it('handles arrays of classes', () => {
    expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2')
  })

  it('handles objects for conditional classes', () => {
    expect(cn({ 'px-4': true, 'py-2': false, 'mt-2': true })).toBe('px-4 mt-2')
  })

  it('merges custom classes with variant classes', () => {
    const variantClasses = 'bg-primary text-primary-foreground'
    const customClasses = 'bg-red-500'
    expect(cn(variantClasses, customClasses)).toBe('text-primary-foreground bg-red-500')
  })
})
