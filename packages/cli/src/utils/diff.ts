import { createTwoFilesPatch } from 'diff'
import crypto from 'node:crypto'
import pc from 'picocolors'

/**
 * Generate a colorized diff between two file contents.
 * Returns a unified diff string with ANSI color codes.
 */
export function generateDiff(filename: string, oldContent: string, newContent: string): string {
  const patch = createTwoFilesPatch(
    `a/${filename}`,
    `b/${filename}`,
    oldContent,
    newContent,
    '',
    '',
    { context: 3 },
  )
  return patch
}

/**
 * Compute a SHA-256 hash of the given content.
 * Returns a hex-encoded digest string.
 */
export function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex')
}

/**
 * Display a formatted, colorized diff to the console.
 */
export function displayDiff(filename: string, oldContent: string, newContent: string): void {
  const patch = generateDiff(filename, oldContent, newContent)
  const lines = patch.split('\n')

  for (const line of lines) {
    if (line.startsWith('+') && !line.startsWith('+++')) {
      console.log(pc.green(line))
    } else if (line.startsWith('-') && !line.startsWith('---')) {
      console.log(pc.red(line))
    } else if (line.startsWith('@@')) {
      console.log(pc.cyan(line))
    } else {
      console.log(pc.dim(line))
    }
  }
}
