import { describe, expect, it } from 'vitest'
import { validateTheme } from '../validator'
import { themes } from './index'

describe('built-in themes', () => {
  for (const theme of themes) {
    it(`${theme.name} passes WCAG AA contrast validation`, () => {
      const issues = validateTheme(theme)
      if (issues.length > 0) {
        // eslint-disable-next-line no-console
        console.log(`${theme.name} issues:`, issues)
      }
      expect(issues).toHaveLength(0)
    })
  }

  it('all themes have unique names', () => {
    const names = themes.map(t => t.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('exports correct number of themes', () => {
    expect(themes).toHaveLength(6)
  })
})
