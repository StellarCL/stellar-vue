<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
import type { DataTableProps } from './data-table.types'
import { computed, provide, type VNode } from 'vue'
import { useDataTable } from '../../composables/useDataTable'
import { cn } from '../../utils'
import DataTableBody from './DataTableBody.vue'
import DataTableCell from './DataTableCell.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableHead from './DataTableHead.vue'
import DataTableHeader from './DataTableHeader.vue'
import DataTablePagination from './DataTablePagination.vue'
import DataTableRow from './DataTableRow.vue'

const props = withDefaults(defineProps<DataTableProps<T>>(), {
  pageSize: 10,
})

const table = useDataTable<T>({
  data: computed(() => props.data),
  columns: props.columns,
  pageSize: props.pageSize,
})

// Provide table state to descendant components
provide('dataTable', table)

const wrapperClasses = computed(() =>
  cn('w-full overflow-auto rounded-lg border border-border', props.class),
)

// Helper: get cell value for a row using column definition
function getCellValue(row: T, colIndex: number): any {
  const col = table.visibleColumns.value[colIndex]
  if (!col)
    return ''
  if (col.accessorFn)
    return col.accessorFn(row)
  if (col.accessorKey)
    return (row as any)[col.accessorKey]
  return ''
}

// Helper: render a cell — either via custom cell renderer or raw value
function renderCell(row: T, colIndex: number): string | VNode {
  const col = table.visibleColumns.value[colIndex]
  if (!col)
    return ''

  const getValue = () => getCellValue(row, colIndex)

  if (col.cell) {
    return col.cell({ row, getValue })
  }

  const val = getValue()
  return val == null ? '' : String(val)
}

// Checkbox indeterminate state for header select-all
// eslint-disable-next-line unused-imports/no-unused-vars
const selectAllChecked = computed<boolean | 'indeterminate'>(() => {
  if (table.isAllSelected.value)
    return true
  if (table.isIndeterminate.value)
    return 'indeterminate'
  return false
})

function handlePageChange(newPage: number) {
  table.page.value = newPage
}
</script>

<template>
  <div :class="wrapperClasses">
    <table class="w-full caption-bottom text-sm">
      <DataTableHeader>
        <DataTableRow>
          <!-- Select-all checkbox column -->
          <DataTableHead>
            <input
              type="checkbox"
              role="checkbox"
              :checked="table.isAllSelected.value"
              :indeterminate="table.isIndeterminate.value"
              :aria-label="table.isAllSelected.value ? 'Deselect all rows' : 'Select all rows'"
              class="h-4 w-4 cursor-pointer rounded-sm border border-primary"
              @change="table.toggleAllRows()"
            >
          </DataTableHead>

          <!-- Column headers -->
          <DataTableHead v-for="col in table.visibleColumns.value" :key="col.id">
            <DataTableColumnHeader
              v-if="col.enableSorting"
              :title="typeof col.header === 'string' ? col.header : col.id"
              :can-sort="true"
              :sort-direction="table.getSortDirection(col.id)"
              @sort="table.toggleSort(col.id)"
            />
            <template v-else>
              {{ typeof col.header === 'string' ? col.header : col.id }}
            </template>
          </DataTableHead>
        </DataTableRow>
      </DataTableHeader>

      <DataTableBody>
        <!-- Empty state -->
        <DataTableRow v-if="table.rows.value.length === 0">
          <DataTableCell :colspan="table.visibleColumns.value.length + 1" class="h-24 text-center">
            No results.
          </DataTableCell>
        </DataTableRow>

        <!-- Data rows -->
        <template v-else>
          <DataTableRow
            v-for="(row, pageRowIndex) in table.rows.value"
            :key="pageRowIndex"
            :selected="
              table.isRowSelected((table.page.value - 1) * table.pageSize.value + pageRowIndex)
            "
          >
            <!-- Row selection checkbox -->
            <DataTableCell>
              <input
                type="checkbox"
                role="checkbox"
                :checked="
                  table.isRowSelected((table.page.value - 1) * table.pageSize.value + pageRowIndex)
                "
                :aria-label="`Select row ${pageRowIndex + 1}`"
                class="h-4 w-4 cursor-pointer rounded-sm border border-primary"
                @change="
                  table.toggleRowSelection(
                    (table.page.value - 1) * table.pageSize.value + pageRowIndex,
                  )
                "
              >
            </DataTableCell>

            <!-- Data cells -->
            <DataTableCell v-for="(col, colIndex) in table.visibleColumns.value" :key="col.id">
              <component
                :is="
                  typeof renderCell(row, colIndex) === 'string' ? 'span' : renderCell(row, colIndex)
                "
                v-if="typeof renderCell(row, colIndex) !== 'string'"
              />
              <template v-else>
                {{ renderCell(row, colIndex) }}
              </template>
            </DataTableCell>
          </DataTableRow>
        </template>
      </DataTableBody>
    </table>

    <!-- Pagination -->
    <DataTablePagination
      :total="table.filteredData.value.length"
      :page="table.page.value"
      :page-size="table.pageSize.value"
      :selected-count="table.selectedRows.value.size"
      @update:page="handlePageChange"
    />
  </div>
</template>
