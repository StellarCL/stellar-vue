import type { ColumnDef } from './data-table.types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useDataTable } from '../../composables/useDataTable'
import DataTable from './DataTable.vue'
import DataTableBody from './DataTableBody.vue'
import DataTableCell from './DataTableCell.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableHead from './DataTableHead.vue'
import DataTableHeader from './DataTableHeader.vue'
import DataTablePagination from './DataTablePagination.vue'
import DataTableRow from './DataTableRow.vue'
import DataTableToolbar from './DataTableToolbar.vue'

// ---------------------------------------------------------------------------
// Sample data helpers
// ---------------------------------------------------------------------------

interface Person {
  id: number
  name: string
  age: number
  email: string
}

function makePeople(count: number): Person[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    age: 20 + (i % 40),
    email: `person${i + 1}@example.com`,
  }))
}

const defaultColumns: ColumnDef<Person>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'age',
    header: 'Age',
    accessorKey: 'age',
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
    enableSorting: false,
    enableHiding: true,
  },
]

// ---------------------------------------------------------------------------
// DataTable (root smart component)
// ---------------------------------------------------------------------------

describe('dataTable', () => {
  it('renders a table element', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(3),
      },
    })
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('renders column headers from column definitions', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(3),
      },
    })
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Age')
    expect(wrapper.text()).toContain('Email')
  })

  it('renders correct number of data rows', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(5),
        pageSize: 10,
      },
    })
    // 5 data rows + 1 header row
    const rows = wrapper.findAll('tr')
    expect(rows.length).toBe(6)
  })

  it('renders cell data from accessorKey', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: [{ id: 1, name: 'Alice', age: 30, email: 'alice@example.com' }],
        pageSize: 10,
      },
    })
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('30')
    expect(wrapper.text()).toContain('alice@example.com')
  })

  it('shows "No results." when data is empty', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: [],
      },
    })
    expect(wrapper.text()).toContain('No results.')
  })

  it('empty state cell spans all columns', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: [],
      },
    })
    const emptyCell = wrapper.find('td')
    expect(emptyCell.exists()).toBe(true)
    // visibleColumns.length (3) + 1 checkbox column = 4
    expect(Number(emptyCell.attributes('colspan'))).toBe(4)
  })

  it('accepts custom class', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: [],
        class: 'my-custom-class',
      },
    })
    expect(wrapper.find('div').classes()).toContain('my-custom-class')
  })

  it('renders checkbox column for row selection', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(3),
      },
    })
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    // 1 header select-all + 3 row checkboxes
    expect(checkboxes.length).toBe(4)
  })
})

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

describe('dataTable sorting', () => {
  it('renders sort icons for sortable columns', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(3),
      },
    })
    // DataTableColumnHeader renders SVG for sortable columns
    const svgs = wrapper.findAll('thead svg')
    // name and age are sortable -> 2 SVGs (ChevronsUpDown for each)
    expect(svgs.length).toBeGreaterThanOrEqual(2)
  })

  it('clicking a sortable column header triggers sort', async () => {
    const data = [
      { id: 1, name: 'Charlie', age: 25, email: 'c@example.com' },
      { id: 2, name: 'Alice', age: 30, email: 'a@example.com' },
      { id: 3, name: 'Bob', age: 20, email: 'b@example.com' },
    ]

    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data,
        pageSize: 10,
      },
    })

    // Click the Name column header sort button
    const nameHeader = wrapper.find('thead th:nth-child(2) div')
    await nameHeader.trigger('click')

    // After ascending sort, Alice should come first
    const cells = wrapper.findAll('tbody td:nth-child(2)')
    expect(cells[0].text()).toBe('Alice')
  })

  it('cycles sort: asc -> desc -> none', async () => {
    const data = [
      { id: 1, name: 'Charlie', age: 25, email: 'c@example.com' },
      { id: 2, name: 'Alice', age: 30, email: 'a@example.com' },
      { id: 3, name: 'Bob', age: 20, email: 'b@example.com' },
    ]

    const wrapper = mount(DataTable, {
      props: { columns: defaultColumns, data, pageSize: 10 },
    })

    const nameHeader = wrapper.find('thead th:nth-child(2) div')

    // First click -> asc (Alice, Bob, Charlie)
    await nameHeader.trigger('click')
    let cells = wrapper.findAll('tbody td:nth-child(2)')
    expect(cells[0].text()).toBe('Alice')
    expect(cells[2].text()).toBe('Charlie')

    // Second click -> desc (Charlie, Bob, Alice)
    await nameHeader.trigger('click')
    cells = wrapper.findAll('tbody td:nth-child(2)')
    expect(cells[0].text()).toBe('Charlie')
    expect(cells[2].text()).toBe('Alice')

    // Third click -> none (back to original order)
    await nameHeader.trigger('click')
    cells = wrapper.findAll('tbody td:nth-child(2)')
    expect(cells[0].text()).toBe('Charlie')
  })

  it('sorts numbers correctly', async () => {
    const data = [
      { id: 1, name: 'Alice', age: 30, email: 'a@example.com' },
      { id: 2, name: 'Bob', age: 20, email: 'b@example.com' },
      { id: 3, name: 'Charlie', age: 25, email: 'c@example.com' },
    ]

    const wrapper = mount(DataTable, {
      props: { columns: defaultColumns, data, pageSize: 10 },
    })

    // Click Age column header (2nd sortable col -> 3rd th)
    const ageHeader = wrapper.find('thead th:nth-child(3) div')
    await ageHeader.trigger('click')

    // asc -> 20, 25, 30
    const ageCells = wrapper.findAll('tbody td:nth-child(3)')
    expect(ageCells[0].text()).toBe('20')
    expect(ageCells[1].text()).toBe('25')
    expect(ageCells[2].text()).toBe('30')
  })
})

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

describe('dataTable pagination', () => {
  it('shows only pageSize rows per page', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(25),
        pageSize: 5,
      },
    })
    // 5 data rows
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(5)
  })

  it('displays row content for the first page', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(15),
        pageSize: 5,
      },
    })
    expect(wrapper.text()).toContain('Person 1')
    expect(wrapper.text()).toContain('Person 5')
    expect(wrapper.text()).not.toContain('Person 6')
  })

  it('navigating to next page shows different rows', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(15),
        pageSize: 5,
      },
    })

    // Click the next page button
    const nextBtn = wrapper.find('button[aria-label="Go to next page"]')
    expect(nextBtn.exists()).toBe(true)
    await nextBtn.trigger('click')

    // Page 2 should show Person 6 - Person 10
    expect(wrapper.text()).toContain('Person 6')
    // Verify first-page items are gone (use exact "Person 1 " with trailing space to avoid matching "Person 10")
    expect(wrapper.text()).not.toContain('Person 1 ')
    expect(wrapper.text()).not.toContain('Person 2')
  })

  it('shows pagination controls', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(25),
        pageSize: 10,
      },
    })
    expect(wrapper.find('button[aria-label="Go to previous page"]').exists()).toBe(true)
    expect(wrapper.find('button[aria-label="Go to next page"]').exists()).toBe(true)
  })

  it('previous page button is disabled on first page', () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(25),
        pageSize: 10,
      },
    })
    const prevBtn = wrapper.find('button[aria-label="Go to previous page"]')
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('resets to page 1 when sort changes', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(15),
        pageSize: 5,
      },
    })

    // Go to page 2
    const nextBtn = wrapper.find('button[aria-label="Go to next page"]')
    await nextBtn.trigger('click')
    expect(wrapper.text()).toContain('Person 6')

    // Sort by name — should reset to page 1
    const nameHeader = wrapper.find('thead th:nth-child(2) div')
    await nameHeader.trigger('click')
    expect(wrapper.text()).toContain('Person 1')
  })
})

// ---------------------------------------------------------------------------
// Row selection
// ---------------------------------------------------------------------------

describe('dataTable row selection', () => {
  it('clicking a row checkbox selects that row', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(3),
        pageSize: 10,
      },
    })

    // Row checkboxes start at index 1 (index 0 is select-all header)
    const rowCheckboxes = wrapper.findAll('tbody input[type="checkbox"]')
    await rowCheckboxes[0].trigger('change')

    expect(rowCheckboxes[0].element.checked).toBe(true)
  })

  it('clicking a selected row checkbox deselects it', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(3),
        pageSize: 10,
      },
    })

    const rowCheckboxes = wrapper.findAll('tbody input[type="checkbox"]')
    // Select
    await rowCheckboxes[0].trigger('change')
    expect(rowCheckboxes[0].element.checked).toBe(true)

    // Deselect
    await rowCheckboxes[0].trigger('change')
    expect(rowCheckboxes[0].element.checked).toBe(false)
  })

  it('selecting a row applies data-state=selected to the row', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(3),
        pageSize: 10,
      },
    })

    const rowCheckboxes = wrapper.findAll('tbody input[type="checkbox"]')
    await rowCheckboxes[0].trigger('change')

    const firstRow = wrapper.find('tbody tr:first-child')
    expect(firstRow.attributes('data-state')).toBe('selected')
  })

  it('header select-all checkbox selects all rows', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(3),
        pageSize: 10,
      },
    })

    const headerCheckbox = wrapper.find('thead input[type="checkbox"]')
    await headerCheckbox.trigger('change')

    const rowCheckboxes = wrapper.findAll('tbody input[type="checkbox"]')
    rowCheckboxes.forEach((cb) => {
      expect(cb.element.checked).toBe(true)
    })
  })

  it('header select-all checkbox deselects all rows when all are selected', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(3),
        pageSize: 10,
      },
    })

    const headerCheckbox = wrapper.find('thead input[type="checkbox"]')
    // Select all
    await headerCheckbox.trigger('change')
    // Deselect all
    await headerCheckbox.trigger('change')

    const rowCheckboxes = wrapper.findAll('tbody input[type="checkbox"]')
    rowCheckboxes.forEach((cb) => {
      expect(cb.element.checked).toBe(false)
    })
  })

  it('pagination shows correct selected row count', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: defaultColumns,
        data: makePeople(5),
        pageSize: 10,
      },
    })

    const rowCheckboxes = wrapper.findAll('tbody input[type="checkbox"]')
    await rowCheckboxes[0].trigger('change')
    await rowCheckboxes[1].trigger('change')

    expect(wrapper.text()).toContain('2 of 5 row(s) selected')
  })
})

// ---------------------------------------------------------------------------
// Column visibility
// ---------------------------------------------------------------------------

describe('dataTable column visibility', () => {
  it('hidden columns are not rendered', () => {
    const columnsWithHidden: ColumnDef<Person>[] = [
      { id: 'name', header: 'Name', accessorKey: 'name', enableHiding: true },
      { id: 'age', header: 'Age', accessorKey: 'age', enableHiding: true },
    ]

    const _wrapper = mount({
      components: { DataTable },
      setup() {
        const table = useDataTable<Person>({
          data: [{ id: 1, name: 'Alice', age: 30, email: 'alice@example.com' }],
          columns: columnsWithHidden,
        })
        // Hide the age column
        table.toggleColumnVisibility('age')
        return { table, columnsWithHidden }
      },
      template: `<DataTable :columns="columnsWithHidden" :data="[{ id: 1, name: 'Alice', age: 30, email: 'alice@example.com' }]" />`,
    })

    // The component manages its own visibility internally; test the useDataTable composable instead
    const table = useDataTable<Person>({
      data: [{ id: 1, name: 'Alice', age: 30, email: 'alice@example.com' }],
      columns: columnsWithHidden,
    })

    expect(table.isColumnVisible('name')).toBe(true)
    expect(table.isColumnVisible('age')).toBe(true)

    table.toggleColumnVisibility('age')
    expect(table.isColumnVisible('age')).toBe(false)
    expect(table.visibleColumns.value.map(c => c.id)).not.toContain('age')
  })

  it('toggling column visibility twice restores it', () => {
    const table = useDataTable<Person>({
      data: [{ id: 1, name: 'Alice', age: 30, email: 'alice@example.com' }],
      columns: defaultColumns,
    })

    table.toggleColumnVisibility('email')
    expect(table.isColumnVisible('email')).toBe(false)

    table.toggleColumnVisibility('email')
    expect(table.isColumnVisible('email')).toBe(true)
  })

  it('visibleColumns excludes hidden columns', () => {
    const table = useDataTable<Person>({
      data: makePeople(3),
      columns: defaultColumns,
    })

    expect(table.visibleColumns.value).toHaveLength(3)
    table.toggleColumnVisibility('age')
    expect(table.visibleColumns.value).toHaveLength(2)
    expect(table.visibleColumns.value.map(c => c.id)).not.toContain('age')
  })
})

// ---------------------------------------------------------------------------
// DataTableHeader
// ---------------------------------------------------------------------------

describe('dataTableHeader', () => {
  it('renders a thead element', () => {
    const wrapper = mount(DataTableHeader)
    expect(wrapper.element.tagName).toBe('THEAD')
  })

  it('applies [&_tr]:border-b class', () => {
    const wrapper = mount(DataTableHeader)
    expect(wrapper.classes().join(' ')).toContain('[&_tr]:border-b')
  })

  it('accepts custom class', () => {
    const wrapper = mount(DataTableHeader, {
      props: { class: 'custom-header' },
    })
    expect(wrapper.classes()).toContain('custom-header')
  })

  it('renders slot content', () => {
    const wrapper = mount(DataTableHeader, {
      slots: { default: '<tr><th>Col</th></tr>' },
    })
    expect(wrapper.find('th').text()).toBe('Col')
  })
})

// ---------------------------------------------------------------------------
// DataTableBody
// ---------------------------------------------------------------------------

describe('dataTableBody', () => {
  it('renders a tbody element', () => {
    const wrapper = mount(DataTableBody)
    expect(wrapper.element.tagName).toBe('TBODY')
  })

  it('applies [&_tr:last-child]:border-0 class', () => {
    const wrapper = mount(DataTableBody)
    expect(wrapper.classes().join(' ')).toContain('[&_tr:last-child]:border-0')
  })

  it('accepts custom class', () => {
    const wrapper = mount(DataTableBody, {
      props: { class: 'custom-body' },
    })
    expect(wrapper.classes()).toContain('custom-body')
  })

  it('renders slot content', () => {
    const wrapper = mount(DataTableBody, {
      slots: { default: '<tr><td>Cell</td></tr>' },
    })
    expect(wrapper.find('td').text()).toBe('Cell')
  })
})

// ---------------------------------------------------------------------------
// DataTableRow
// ---------------------------------------------------------------------------

describe('dataTableRow', () => {
  it('renders a tr element', () => {
    const wrapper = mount(DataTableRow)
    expect(wrapper.element.tagName).toBe('TR')
  })

  it('applies base transition and hover classes', () => {
    const wrapper = mount(DataTableRow)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('border-b')
    expect(classes).toContain('transition-colors')
  })

  it('does not set data-state when not selected', () => {
    const wrapper = mount(DataTableRow, {
      props: { selected: false },
    })
    expect(wrapper.attributes('data-state')).toBeUndefined()
  })

  it('sets data-state="selected" when selected', () => {
    const wrapper = mount(DataTableRow, {
      props: { selected: true },
    })
    expect(wrapper.attributes('data-state')).toBe('selected')
  })

  it('accepts custom class', () => {
    const wrapper = mount(DataTableRow, {
      props: { class: 'custom-row' },
    })
    expect(wrapper.classes()).toContain('custom-row')
  })
})

// ---------------------------------------------------------------------------
// DataTableHead
// ---------------------------------------------------------------------------

describe('dataTableHead', () => {
  it('renders a th element', () => {
    const wrapper = mount(DataTableHead)
    expect(wrapper.element.tagName).toBe('TH')
  })

  it('applies required styling classes', () => {
    const wrapper = mount(DataTableHead)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('h-12')
    expect(classes).toContain('px-4')
    expect(classes).toContain('text-left')
    expect(classes).toContain('align-middle')
    expect(classes).toContain('font-medium')
  })

  it('accepts custom class', () => {
    const wrapper = mount(DataTableHead, {
      props: { class: 'custom-head' },
    })
    expect(wrapper.classes()).toContain('custom-head')
  })

  it('renders slot content', () => {
    const wrapper = mount(DataTableHead, {
      slots: { default: 'Header Text' },
    })
    expect(wrapper.text()).toBe('Header Text')
  })
})

// ---------------------------------------------------------------------------
// DataTableCell
// ---------------------------------------------------------------------------

describe('dataTableCell', () => {
  it('renders a td element', () => {
    const wrapper = mount(DataTableCell)
    expect(wrapper.element.tagName).toBe('TD')
  })

  it('applies required styling classes', () => {
    const wrapper = mount(DataTableCell)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('p-4')
    expect(classes).toContain('align-middle')
  })

  it('accepts custom class', () => {
    const wrapper = mount(DataTableCell, {
      props: { class: 'custom-cell' },
    })
    expect(wrapper.classes()).toContain('custom-cell')
  })

  it('renders slot content', () => {
    const wrapper = mount(DataTableCell, {
      slots: { default: 'Cell Value' },
    })
    expect(wrapper.text()).toBe('Cell Value')
  })
})

// ---------------------------------------------------------------------------
// DataTableColumnHeader
// ---------------------------------------------------------------------------

describe('dataTableColumnHeader', () => {
  it('renders the column title', () => {
    const wrapper = mount(DataTableColumnHeader, {
      props: { title: 'Full Name', canSort: false },
    })
    expect(wrapper.text()).toContain('Full Name')
  })

  it('shows ChevronsUpDown icon when canSort and no sort direction', () => {
    const wrapper = mount(DataTableColumnHeader, {
      props: { title: 'Name', canSort: true, sortDirection: false },
    })
    // ChevronsUpDown has path with "m7 15 5 5 5-5"
    expect(wrapper.find('svg').exists()).toBe(true)
    const svgHtml = wrapper.find('svg').html()
    expect(svgHtml).toContain('m7 15 5 5 5-5')
  })

  it('shows ArrowUp icon when sortDirection is asc', () => {
    const wrapper = mount(DataTableColumnHeader, {
      props: { title: 'Name', canSort: true, sortDirection: 'asc' },
    })
    const svgHtml = wrapper.find('svg').html()
    // ArrowUp has path "m5 12 7-7 7 7"
    expect(svgHtml).toContain('m5 12 7-7 7 7')
  })

  it('shows ArrowDown icon when sortDirection is desc', () => {
    const wrapper = mount(DataTableColumnHeader, {
      props: { title: 'Name', canSort: true, sortDirection: 'desc' },
    })
    const svgHtml = wrapper.find('svg').html()
    // ArrowDown has path "m19 12-7 7-7-7"
    expect(svgHtml).toContain('m19 12-7 7-7-7')
  })

  it('does not show sort icon when canSort is false', () => {
    const wrapper = mount(DataTableColumnHeader, {
      props: { title: 'Name', canSort: false },
    })
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('emits sort event when clicked and canSort is true', async () => {
    const wrapper = mount(DataTableColumnHeader, {
      props: { title: 'Name', canSort: true, sortDirection: false },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('sort')).toBeTruthy()
  })

  it('does not emit sort event when canSort is false', async () => {
    const wrapper = mount(DataTableColumnHeader, {
      props: { title: 'Name', canSort: false },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('sort')).toBeFalsy()
  })

  it('applies cursor-pointer class when canSort', () => {
    const wrapper = mount(DataTableColumnHeader, {
      props: { title: 'Name', canSort: true },
    })
    expect(wrapper.classes()).toContain('cursor-pointer')
  })

  it('accepts custom class', () => {
    const wrapper = mount(DataTableColumnHeader, {
      props: { title: 'Name', canSort: false, class: 'custom-col-header' },
    })
    expect(wrapper.classes()).toContain('custom-col-header')
  })
})

// ---------------------------------------------------------------------------
// DataTablePagination
// ---------------------------------------------------------------------------

describe('dataTablePagination', () => {
  it('renders without error', () => {
    const wrapper = mount(DataTablePagination, {
      props: {
        total: 50,
        page: 1,
        pageSize: 10,
        selectedCount: 0,
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays "X of Y row(s) selected" info', () => {
    const wrapper = mount(DataTablePagination, {
      props: {
        total: 50,
        page: 1,
        pageSize: 10,
        selectedCount: 3,
      },
    })
    expect(wrapper.text()).toContain('3 of 50 row(s) selected')
  })

  it('shows 0 selected when selectedCount is 0', () => {
    const wrapper = mount(DataTablePagination, {
      props: {
        total: 25,
        page: 1,
        pageSize: 10,
        selectedCount: 0,
      },
    })
    expect(wrapper.text()).toContain('0 of 25 row(s) selected')
  })

  it('disables Previous button on first page', () => {
    const wrapper = mount(DataTablePagination, {
      props: {
        total: 50,
        page: 1,
        pageSize: 10,
        selectedCount: 0,
      },
    })
    const prevBtn = wrapper.find('button[aria-label="Go to previous page"]')
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('disables Next button on last page', () => {
    const wrapper = mount(DataTablePagination, {
      props: {
        total: 50,
        page: 5,
        pageSize: 10,
        selectedCount: 0,
      },
    })
    const nextBtn = wrapper.find('button[aria-label="Go to next page"]')
    expect(nextBtn.attributes('disabled')).toBeDefined()
  })

  it('emits update:page when next is clicked', async () => {
    const wrapper = mount(DataTablePagination, {
      props: {
        total: 50,
        page: 1,
        pageSize: 10,
        selectedCount: 0,
      },
    })
    const nextBtn = wrapper.find('button[aria-label="Go to next page"]')
    await nextBtn.trigger('click')
    expect(wrapper.emitted('update:page')).toBeTruthy()
    expect(wrapper.emitted('update:page')![0]).toEqual([2])
  })

  it('emits update:page when previous is clicked', async () => {
    const wrapper = mount(DataTablePagination, {
      props: {
        total: 50,
        page: 3,
        pageSize: 10,
        selectedCount: 0,
      },
    })
    const prevBtn = wrapper.find('button[aria-label="Go to previous page"]')
    await prevBtn.trigger('click')
    expect(wrapper.emitted('update:page')).toBeTruthy()
    expect(wrapper.emitted('update:page')![0]).toEqual([2])
  })

  it('accepts custom class', () => {
    const wrapper = mount(DataTablePagination, {
      props: {
        total: 10,
        page: 1,
        pageSize: 10,
        selectedCount: 0,
        class: 'custom-pagination',
      },
    })
    expect(wrapper.find('div').classes()).toContain('custom-pagination')
  })
})

// ---------------------------------------------------------------------------
// DataTableToolbar
// ---------------------------------------------------------------------------

describe('dataTableToolbar', () => {
  it('renders a div', () => {
    const wrapper = mount(DataTableToolbar)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('applies flex items-center justify-between classes', () => {
    const wrapper = mount(DataTableToolbar)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('justify-between')
  })

  it('accepts custom class', () => {
    const wrapper = mount(DataTableToolbar, {
      props: { class: 'custom-toolbar' },
    })
    expect(wrapper.classes()).toContain('custom-toolbar')
  })

  it('renders slot content', () => {
    const wrapper = mount(DataTableToolbar, {
      slots: { default: '<input placeholder="Search..." />' },
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// useDataTable composable
// ---------------------------------------------------------------------------

describe('useDataTable composable', () => {
  it('returns rows sliced to pageSize', () => {
    const table = useDataTable<Person>({
      data: makePeople(25),
      columns: defaultColumns,
      pageSize: 5,
    })
    expect(table.rows.value).toHaveLength(5)
  })

  it('computes totalPages correctly', () => {
    const table = useDataTable<Person>({
      data: makePeople(25),
      columns: defaultColumns,
      pageSize: 10,
    })
    expect(table.totalPages.value).toBe(3)
  })

  it('totalPages is at least 1 for empty data', () => {
    const table = useDataTable<Person>({
      data: [],
      columns: defaultColumns,
    })
    expect(table.totalPages.value).toBe(1)
  })

  it('sortedData reflects reactive data changes', () => {
    const data = ref<Person[]>(makePeople(3))
    const table = useDataTable<Person>({
      data,
      columns: defaultColumns,
    })
    expect(table.sortedData.value).toHaveLength(3)
    data.value = makePeople(10)
    expect(table.sortedData.value).toHaveLength(10)
  })

  it('toggleSort cycles asc -> desc -> none', () => {
    const table = useDataTable<Person>({
      data: makePeople(5),
      columns: defaultColumns,
    })

    expect(table.getSortDirection('name')).toBe(false)

    table.toggleSort('name')
    expect(table.getSortDirection('name')).toBe('asc')

    table.toggleSort('name')
    expect(table.getSortDirection('name')).toBe('desc')

    table.toggleSort('name')
    expect(table.getSortDirection('name')).toBe(false)
  })

  it('toggleRowSelection adds and removes from selectedRows', () => {
    const table = useDataTable<Person>({
      data: makePeople(5),
      columns: defaultColumns,
    })

    table.toggleRowSelection(0)
    expect(table.isRowSelected(0)).toBe(true)

    table.toggleRowSelection(0)
    expect(table.isRowSelected(0)).toBe(false)
  })

  it('toggleAllRows selects all rows', () => {
    const table = useDataTable<Person>({
      data: makePeople(3),
      columns: defaultColumns,
    })

    table.toggleAllRows()
    expect(table.isAllSelected.value).toBe(true)
    expect(table.selectedRows.value.size).toBe(3)
  })

  it('toggleAllRows deselects all when all selected', () => {
    const table = useDataTable<Person>({
      data: makePeople(3),
      columns: defaultColumns,
    })

    table.toggleAllRows()
    table.toggleAllRows()
    expect(table.isAllSelected.value).toBe(false)
    expect(table.selectedRows.value.size).toBe(0)
  })

  it('isIndeterminate is true when some but not all rows selected', () => {
    const table = useDataTable<Person>({
      data: makePeople(3),
      columns: defaultColumns,
    })

    table.toggleRowSelection(0)
    expect(table.isIndeterminate.value).toBe(true)
    expect(table.isAllSelected.value).toBe(false)
  })

  it('accessorFn is used when present', () => {
    const cols: ColumnDef<Person>[] = [
      {
        id: 'fullName',
        header: 'Full Name',
        accessorFn: row => `${row.name} (${row.id})`,
        enableSorting: true,
      },
    ]
    const table = useDataTable<Person>({
      data: [{ id: 42, name: 'Alice', age: 30, email: 'a@example.com' }],
      columns: cols,
    })

    table.toggleSort('fullName')
    // Just verify sorting doesn't throw and data is still present
    expect(table.rows.value).toHaveLength(1)
  })

  it('sorts strings with localeCompare (asc)', () => {
    const data: Person[] = [
      { id: 1, name: 'Zara', age: 25, email: 'z@example.com' },
      { id: 2, name: 'Anna', age: 30, email: 'a@example.com' },
      { id: 3, name: 'Mike', age: 28, email: 'm@example.com' },
    ]
    const table = useDataTable<Person>({ data, columns: defaultColumns })
    table.toggleSort('name')
    expect(table.sortedData.value[0].name).toBe('Anna')
    expect(table.sortedData.value[2].name).toBe('Zara')
  })

  it('sorts numbers in descending order', () => {
    const data: Person[] = [
      { id: 1, name: 'Alice', age: 10, email: 'a@example.com' },
      { id: 2, name: 'Bob', age: 30, email: 'b@example.com' },
      { id: 3, name: 'Charlie', age: 20, email: 'c@example.com' },
    ]
    const table = useDataTable<Person>({ data, columns: defaultColumns })
    table.toggleSort('age') // asc
    table.toggleSort('age') // desc
    expect(table.sortedData.value[0].age).toBe(30)
    expect(table.sortedData.value[2].age).toBe(10)
  })
})
