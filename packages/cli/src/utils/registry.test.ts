import { describe, it, expect } from 'vitest'
import {
  getRegistry,
  getComponent,
  getComponentsByCategory,
  searchComponents,
  resolveDependencies,
} from './registry'

const ALL_COMPONENT_NAMES = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'card',
  'checkbox',
  'command',
  'context-menu',
  'data-table',
  'dialog',
  'dropdown-menu',
  'form',
  'input',
  'label',
  'menubar',
  'navigation-menu',
  'pagination',
  'popover',
  'progress',
  'radio-group',
  'select',
  'separator',
  'skeleton',
  'slider',
  'stepper',
  'switch',
  'tabs',
  'textarea',
  'tooltip',
  'wizard',
]

describe('registry utils', () => {
  describe('getRegistry', () => {
    it('returns array of all components', () => {
      const registry = getRegistry()
      expect(Array.isArray(registry)).toBe(true)
      expect(registry.length).toBeGreaterThan(0)
    })

    it('includes all 32 component families', () => {
      const registry = getRegistry()
      const names = registry.map(c => c.name).sort()

      for (const name of ALL_COMPONENT_NAMES) {
        expect(names).toContain(name)
      }

      expect(registry.length).toBe(32)
    })
  })

  describe('getComponent', () => {
    it('returns entry for known component', () => {
      const button = getComponent('button')
      expect(button).not.toBeNull()
      expect(button!.name).toBe('button')
      expect(button!.category).toBe('forms')
    })

    it('returns null for unknown component', () => {
      const result = getComponent('nonexistent-component')
      expect(result).toBeNull()
    })
  })

  describe('getComponentsByCategory', () => {
    it('filters correctly by layout category', () => {
      const layout = getComponentsByCategory('layout')
      expect(layout.length).toBeGreaterThan(0)
      expect(layout.every(c => c.category === 'layout')).toBe(true)
    })

    it('filters correctly by forms category', () => {
      const forms = getComponentsByCategory('forms')
      expect(forms.length).toBeGreaterThan(0)
      expect(forms.every(c => c.category === 'forms')).toBe(true)
    })

    it('filters correctly by overlay category', () => {
      const overlay = getComponentsByCategory('overlay')
      expect(overlay.length).toBeGreaterThan(0)
      expect(overlay.every(c => c.category === 'overlay')).toBe(true)
    })

    it('returns empty array for unknown category', () => {
      const result = getComponentsByCategory('nonexistent')
      expect(result).toEqual([])
    })
  })

  describe('searchComponents', () => {
    it('finds partial matches by name', () => {
      const results = searchComponents('but')
      expect(results.length).toBeGreaterThan(0)
      expect(results.some(c => c.name === 'button')).toBe(true)
    })

    it('finds matches by description', () => {
      const results = searchComponents('modal')
      expect(results.length).toBeGreaterThan(0)
      expect(results.some(c => c.name === 'dialog')).toBe(true)
    })

    it('is case insensitive', () => {
      const results = searchComponents('BUTTON')
      expect(results.some(c => c.name === 'button')).toBe(true)
    })

    it('returns empty array for no matches', () => {
      const results = searchComponents('xyznonexistent123')
      expect(results).toEqual([])
    })
  })

  describe('resolveDependencies', () => {
    it('returns dependency chain for component with dependencies', () => {
      // data-table depends on button, input, select, pagination
      const deps = resolveDependencies('data-table')
      expect(deps).toContain('button')
      expect(deps).toContain('input')
      expect(deps).toContain('select')
      expect(deps).toContain('pagination')
    })

    it('returns empty array for component with no dependencies', () => {
      const deps = resolveDependencies('card')
      expect(deps).toEqual([])
    })

    it('resolves transitive dependencies', () => {
      // form depends on label and button; label has no further deps
      const deps = resolveDependencies('form')
      expect(deps).toContain('label')
      expect(deps).toContain('button')
    })

    it('does not include the component itself', () => {
      const deps = resolveDependencies('data-table')
      expect(deps).not.toContain('data-table')
    })

    it('returns empty array for unknown component', () => {
      const deps = resolveDependencies('nonexistent')
      expect(deps).toEqual([])
    })
  })

  describe('registry entry validation', () => {
    it('every registry entry has required fields', () => {
      const registry = getRegistry()

      for (const entry of registry) {
        expect(entry).toHaveProperty('name')
        expect(entry).toHaveProperty('description')
        expect(entry).toHaveProperty('category')
        expect(entry).toHaveProperty('version')
        expect(entry).toHaveProperty('files')
        expect(entry).toHaveProperty('dependencies')
        expect(entry).toHaveProperty('peerDependencies')

        expect(typeof entry.name).toBe('string')
        expect(entry.name.length).toBeGreaterThan(0)
        expect(typeof entry.description).toBe('string')
        expect(entry.description.length).toBeGreaterThan(0)
        expect(typeof entry.category).toBe('string')
        expect(typeof entry.version).toBe('string')
        expect(Array.isArray(entry.files)).toBe(true)
        expect(entry.files.length).toBeGreaterThan(0)
        expect(typeof entry.dependencies).toBe('object')
        expect(Array.isArray(entry.peerDependencies)).toBe(true)
      }
    })
  })
})
