import type {
  ColumnDef,
  SortDirection,
  SortingState,
} from '../components/data-table/data-table.types'
import { computed, isRef, ref, type Ref, unref, watch } from 'vue'

export interface UseDataTableOptions<T> {
  data: Ref<T[]> | T[]
  columns: ColumnDef<T>[]
  pageSize?: number
}

export function useDataTable<T>(options: UseDataTableOptions<T>) {
  const rawData = isRef(options.data) ? options.data : (ref(options.data) as Ref<T[]>)

  // Sorting state: array of { id, desc }
  const sorting = ref<SortingState[]>([])

  // Pagination state
  const page = ref(1)
  const pageSize = ref(options.pageSize ?? 10)

  // Row selection: Set of row indices (in the full sorted dataset)
  const selectedRows = ref<Set<number>>(new Set())

  // Column visibility: map of columnId -> visible
  const columnVisibility = ref<Record<string, boolean>>(
    Object.fromEntries(options.columns.map(col => [col.id, true])),
  )

  // Filter state: map of columnId -> filter string
  const filter = ref<Record<string, string>>({})

  // Sorted data (client-side)
  const sortedData = computed<T[]>(() => {
    const data = unref(rawData)
    if (sorting.value.length === 0)
      return [...data]

    const { id, desc } = sorting.value[0]
    const col = options.columns.find(c => c.id === id)
    if (!col)
      return [...data]

    return [...data].sort((a, b) => {
      let aVal: any
      let bVal: any

      if (col.accessorFn) {
        aVal = col.accessorFn(a)
        bVal = col.accessorFn(b)
      }
      else if (col.accessorKey) {
        aVal = (a as any)[col.accessorKey]
        bVal = (b as any)[col.accessorKey]
      }
      else {
        return 0
      }

      // Null/undefined handling
      if (aVal == null && bVal == null)
        return 0
      if (aVal == null)
        return desc ? -1 : 1
      if (bVal == null)
        return desc ? 1 : -1

      let result: number
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal
      }
      else {
        result = String(aVal).localeCompare(String(bVal))
      }

      return desc ? -result : result
    })
  })

  // Filtered data: applies filters AFTER sort, BEFORE pagination
  const filteredData = computed<T[]>(() => {
    const data = sortedData.value
    const activeFilters = Object.entries(filter.value).filter(([_, v]) => v.length > 0)

    if (activeFilters.length === 0)
      return data

    return data.filter((row) => {
      return activeFilters.every(([columnId, filterValue]) => {
        const col = options.columns.find(c => c.id === columnId)
        if (!col)
          return true

        let cellValue: any
        if (col.accessorFn) {
          cellValue = col.accessorFn(row)
        }
        else if (col.accessorKey) {
          cellValue = (row as any)[col.accessorKey]
        }
        else {
          return true
        }

        if (cellValue == null)
          return false

        return String(cellValue).toLowerCase().includes(filterValue.toLowerCase())
      })
    })
  })

  // Reset to page 1 when filters change
  watch(
    filter,
    () => {
      page.value = 1
    },
    { deep: true },
  )

  // Total pages based on filtered data length
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredData.value.length / pageSize.value)),
  )

  // Paginated rows (slice of filtered data)
  const rows = computed<T[]>(() => {
    const start = (page.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredData.value.slice(start, end)
  })

  // Toggle sort: asc -> desc -> none (remove)
  function toggleSort(columnId: string): void {
    const existing = sorting.value.find(s => s.id === columnId)

    if (!existing) {
      // No sort -> asc
      sorting.value = [{ id: columnId, desc: false }]
    }
    else if (!existing.desc) {
      // asc -> desc
      sorting.value = [{ id: columnId, desc: true }]
    }
    else {
      // desc -> none
      sorting.value = []
    }

    // Reset to page 1 when sort changes
    page.value = 1
  }

  function getSortDirection(columnId: string): SortDirection {
    const existing = sorting.value.find(s => s.id === columnId)
    if (!existing)
      return false
    return existing.desc ? 'desc' : 'asc'
  }

  // Filter helpers
  function setFilter(columnId: string, value: string): void {
    filter.value = {
      ...filter.value,
      [columnId]: value,
    }
  }

  function clearFilters(): void {
    filter.value = {}
  }

  const isAllSelected = computed<boolean>(() => {
    if (filteredData.value.length === 0)
      return false
    return filteredData.value.every((_, i) => selectedRows.value.has(i))
  })

  const isIndeterminate = computed<boolean>(() => {
    return selectedRows.value.size > 0 && !isAllSelected.value
  })

  // Row selection helpers (indices into the full filtered dataset)
  function toggleRowSelection(index: number): void {
    const newSet = new Set(selectedRows.value)
    if (newSet.has(index)) {
      newSet.delete(index)
    }
    else {
      newSet.add(index)
    }
    selectedRows.value = newSet
  }

  function toggleAllRows(): void {
    if (isAllSelected.value) {
      selectedRows.value = new Set()
    }
    else {
      selectedRows.value = new Set(filteredData.value.map((_, i) => i))
    }
  }

  function isRowSelected(index: number): boolean {
    return selectedRows.value.has(index)
  }

  // Column visibility helpers
  function toggleColumnVisibility(columnId: string): void {
    columnVisibility.value = {
      ...columnVisibility.value,
      [columnId]: !columnVisibility.value[columnId],
    }
  }

  function isColumnVisible(columnId: string): boolean {
    return columnVisibility.value[columnId] !== false
  }

  const visibleColumns = computed<ColumnDef<T>[]>(() =>
    options.columns.filter(col => isColumnVisible(col.id)),
  )

  return {
    // Data
    rows,
    sortedData,
    filteredData,
    // Sorting
    sorting,
    toggleSort,
    getSortDirection,
    // Pagination
    page,
    pageSize,
    totalPages,
    // Row selection
    selectedRows,
    toggleRowSelection,
    toggleAllRows,
    isRowSelected,
    isAllSelected,
    isIndeterminate,
    // Column visibility
    columnVisibility,
    toggleColumnVisibility,
    isColumnVisible,
    visibleColumns,
    // Filters
    filter,
    setFilter,
    clearFilters,
  }
}
