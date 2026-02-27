import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { generateDiff, computeHash, displayDiff } from './diff'

describe('diff utils', () => {
  describe('generateDiff', () => {
    it('returns a unified diff string', () => {
      const oldContent = 'line 1\nline 2\nline 3\n'
      const newContent = 'line 1\nline 2 modified\nline 3\n'

      const diff = generateDiff('test.vue', oldContent, newContent)

      expect(typeof diff).toBe('string')
      expect(diff).toContain('a/test.vue')
      expect(diff).toContain('b/test.vue')
      expect(diff).toContain('@@')
    })

    it('shows additions and removals', () => {
      const oldContent = 'hello\nworld\n'
      const newContent = 'hello\nuniverse\n'

      const diff = generateDiff('file.ts', oldContent, newContent)

      expect(diff).toContain('-world')
      expect(diff).toContain('+universe')
    })

    it('returns empty-ish result for identical files', () => {
      const content = 'same content\n'

      const diff = generateDiff('file.ts', content, content)

      // The diff should not contain any addition/removal markers (lines starting with +/- that aren't the header)
      const lines = diff.split('\n')
      const changeLines = lines.filter(
        l => (l.startsWith('+') && !l.startsWith('+++')) || (l.startsWith('-') && !l.startsWith('---')),
      )
      expect(changeLines.length).toBe(0)
    })
  })

  describe('computeHash', () => {
    it('returns consistent hash for same content', () => {
      const content = 'hello world'
      const hash1 = computeHash(content)
      const hash2 = computeHash(content)

      expect(hash1).toBe(hash2)
    })

    it('returns different hash for different content', () => {
      const hash1 = computeHash('hello')
      const hash2 = computeHash('world')

      expect(hash1).not.toBe(hash2)
    })

    it('returns a hex string', () => {
      const hash = computeHash('test content')

      // SHA-256 hex digest is 64 characters
      expect(hash).toMatch(/^[0-9a-f]{64}$/)
    })
  })

  describe('displayDiff', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
      consoleSpy.mockRestore()
    })

    it('outputs diff lines to console', () => {
      const oldContent = 'old line\n'
      const newContent = 'new line\n'

      displayDiff('test.vue', oldContent, newContent)

      expect(consoleSpy).toHaveBeenCalled()
    })
  })
})
