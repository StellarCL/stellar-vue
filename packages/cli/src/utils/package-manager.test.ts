import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { detectPackageManager } from './package-manager'

describe('detectPackageManager', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-pm-test-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  it('detects pnpm from pnpm-lock.yaml', () => {
    fs.writeFileSync(path.join(tmpDir, 'pnpm-lock.yaml'), '', 'utf-8')
    expect(detectPackageManager(tmpDir)).toBe('pnpm')
  })

  it('detects yarn from yarn.lock', () => {
    fs.writeFileSync(path.join(tmpDir, 'yarn.lock'), '', 'utf-8')
    expect(detectPackageManager(tmpDir)).toBe('yarn')
  })

  it('detects bun from bun.lockb', () => {
    fs.writeFileSync(path.join(tmpDir, 'bun.lockb'), '', 'utf-8')
    expect(detectPackageManager(tmpDir)).toBe('bun')
  })

  it('detects npm from package-lock.json', () => {
    fs.writeFileSync(path.join(tmpDir, 'package-lock.json'), '{}', 'utf-8')
    expect(detectPackageManager(tmpDir)).toBe('npm')
  })

  it('detects from packageManager field in package.json', () => {
    fs.writeFileSync(
      path.join(tmpDir, 'package.json'),
      JSON.stringify({ packageManager: 'pnpm@9.0.0' }),
      'utf-8',
    )
    expect(detectPackageManager(tmpDir)).toBe('pnpm')
  })

  it('searches parent directories', () => {
    fs.writeFileSync(path.join(tmpDir, 'yarn.lock'), '', 'utf-8')
    const subDir = path.join(tmpDir, 'deep', 'nested')
    fs.mkdirSync(subDir, { recursive: true })
    expect(detectPackageManager(subDir)).toBe('yarn')
  })

  it('defaults to npm when nothing found', () => {
    expect(detectPackageManager(tmpDir)).toBe('npm')
  })
})
