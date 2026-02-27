import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { usePagination } from './usePagination'

describe('usePagination', () => {
  it('starts on page 1 by default', () => {
    const { page } = usePagination({ total: 100 })
    expect(page.value).toBe(1)
  })

  it('starts on a custom page when provided', () => {
    const { page } = usePagination({ total: 100, page: 3 })
    expect(page.value).toBe(3)
  })

  it('uses a default pageSize of 10', () => {
    const { pageSize } = usePagination({ total: 100 })
    expect(pageSize.value).toBe(10)
  })

  it('accepts a custom pageSize', () => {
    const { pageSize } = usePagination({ total: 100, pageSize: 20 })
    expect(pageSize.value).toBe(20)
  })

  it('calculates totalPages correctly', () => {
    const { totalPages } = usePagination({ total: 100, pageSize: 10 })
    expect(totalPages.value).toBe(10)
  })

  it('rounds totalPages up for a non-divisible total', () => {
    const { totalPages } = usePagination({ total: 95, pageSize: 10 })
    expect(totalPages.value).toBe(10)
  })

  it('totalPages is at least 1 for total of 0', () => {
    const { totalPages } = usePagination({ total: 0, pageSize: 10 })
    expect(totalPages.value).toBe(1)
  })

  it('next() advances the page', () => {
    const { page, next } = usePagination({ total: 100 })
    next()
    expect(page.value).toBe(2)
  })

  it('next() does not advance past totalPages', () => {
    const { page, next } = usePagination({ total: 10, pageSize: 10 })
    next()
    expect(page.value).toBe(1)
  })

  it('prev() goes back one page', () => {
    const { page, prev } = usePagination({ total: 100, page: 3 })
    prev()
    expect(page.value).toBe(2)
  })

  it('prev() does not go below page 1', () => {
    const { page, prev } = usePagination({ total: 100 })
    prev()
    expect(page.value).toBe(1)
  })

  it('goTo() jumps to the specified page', () => {
    const { page, goTo } = usePagination({ total: 100, pageSize: 10 })
    goTo(5)
    expect(page.value).toBe(5)
  })

  it('goTo() ignores a page below 1', () => {
    const { page, goTo } = usePagination({ total: 100 })
    goTo(0)
    expect(page.value).toBe(1)
  })

  it('goTo() ignores a page above totalPages', () => {
    const { page, goTo } = usePagination({ total: 100, pageSize: 10 })
    goTo(11)
    expect(page.value).toBe(1)
  })

  it('range returns the correct start and end for page 1', () => {
    const { range } = usePagination({ total: 100, pageSize: 10 })
    expect(range.value.start).toBe(1)
    expect(range.value.end).toBe(10)
  })

  it('range returns the correct start and end for page 2', () => {
    const { range } = usePagination({ total: 100, pageSize: 10, page: 2 })
    expect(range.value.start).toBe(11)
    expect(range.value.end).toBe(20)
  })

  it('range end does not exceed total on the last partial page', () => {
    const { range } = usePagination({ total: 95, pageSize: 10, page: 10 })
    expect(range.value.start).toBe(91)
    expect(range.value.end).toBe(95)
  })

  it('isFirstPage is true on page 1', () => {
    const { isFirstPage } = usePagination({ total: 100 })
    expect(isFirstPage.value).toBe(true)
  })

  it('isFirstPage is false on page 2', () => {
    const { isFirstPage } = usePagination({ total: 100, page: 2 })
    expect(isFirstPage.value).toBe(false)
  })

  it('isLastPage is true on the last page', () => {
    const { isLastPage } = usePagination({ total: 100, pageSize: 10, page: 10 })
    expect(isLastPage.value).toBe(true)
  })

  it('isLastPage is false on a non-last page', () => {
    const { isLastPage } = usePagination({ total: 100, pageSize: 10 })
    expect(isLastPage.value).toBe(false)
  })

  it('reacts to a reactive total ref', () => {
    const total = ref(50)
    const { totalPages } = usePagination({ total, pageSize: 10 })
    expect(totalPages.value).toBe(5)
    total.value = 100
    expect(totalPages.value).toBe(10)
  })

  it('reacts to a reactive pageSize ref', () => {
    const pageSize = ref(10)
    const { totalPages } = usePagination({ total: 100, pageSize })
    expect(totalPages.value).toBe(10)
    pageSize.value = 20
    expect(totalPages.value).toBe(5)
  })

  it('range updates reactively when page changes', () => {
    const { range, next } = usePagination({ total: 100, pageSize: 10 })
    expect(range.value.start).toBe(1)
    next()
    expect(range.value.start).toBe(11)
  })

  it('totalPages and isLastPage are readonly', () => {
    const { totalPages, isLastPage } = usePagination({ total: 100, pageSize: 10 })
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // @ts-expect-error testing readonly enforcement at runtime
    totalPages.value = 99
    // Vue readonly silently ignores the write and emits a warning
    expect(totalPages.value).toBe(10)
    // @ts-expect-error testing readonly enforcement at runtime
    isLastPage.value = true
    expect(isLastPage.value).toBe(false)
    warnSpy.mockRestore()
  })
})
