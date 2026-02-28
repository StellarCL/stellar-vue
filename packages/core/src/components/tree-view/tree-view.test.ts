import type { TreeNode } from './tree-view.types'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TreeView from './TreeView.vue'

const sampleData: TreeNode[] = [
  {
    key: 'root-1',
    label: 'Documents',
    children: [
      { key: 'doc-1', label: 'Resume.pdf' },
      { key: 'doc-2', label: 'Cover Letter.pdf' },
      {
        key: 'projects',
        label: 'Projects',
        children: [
          { key: 'proj-1', label: 'Project A' },
          { key: 'proj-2', label: 'Project B' },
        ],
      },
    ],
  },
  {
    key: 'root-2',
    label: 'Pictures',
    children: [
      { key: 'pic-1', label: 'photo.jpg' },
    ],
  },
  { key: 'root-3', label: 'readme.txt' },
]

describe('treeView', () => {
  it('renders tree role', () => {
    const wrapper = mount(TreeView, {
      props: { data: sampleData },
    })
    expect(wrapper.find('[role="tree"]').exists()).toBe(true)
  })

  it('renders root nodes', () => {
    const wrapper = mount(TreeView, {
      props: { data: sampleData },
    })
    expect(wrapper.text()).toContain('Documents')
    expect(wrapper.text()).toContain('Pictures')
    expect(wrapper.text()).toContain('readme.txt')
  })

  it('does not show children when collapsed', () => {
    const wrapper = mount(TreeView, {
      props: { data: sampleData },
    })
    expect(wrapper.text()).not.toContain('Resume.pdf')
  })

  it('shows children when expanded', () => {
    const wrapper = mount(TreeView, {
      props: {
        data: sampleData,
        expandedKeys: ['root-1'],
      },
    })
    expect(wrapper.text()).toContain('Resume.pdf')
    expect(wrapper.text()).toContain('Cover Letter.pdf')
    expect(wrapper.text()).toContain('Projects')
  })

  it('shows nested children when parent chain is expanded', () => {
    const wrapper = mount(TreeView, {
      props: {
        data: sampleData,
        expandedKeys: ['root-1', 'projects'],
      },
    })
    expect(wrapper.text()).toContain('Project A')
    expect(wrapper.text()).toContain('Project B')
  })

  it('does not show nested children when only leaf is expanded', () => {
    const wrapper = mount(TreeView, {
      props: {
        data: sampleData,
        expandedKeys: ['projects'],
      },
    })
    // Projects is inside root-1 which is collapsed
    expect(wrapper.text()).not.toContain('Project A')
  })

  it('toggles expand on click', async () => {
    const wrapper = mount(TreeView, {
      props: { data: sampleData },
    })
    // Click on Documents to expand
    const items = wrapper.findAll('[role="treeitem"]')
    const docsItem = items[0]
    await docsItem.find('[tabindex]').trigger('click')
    expect(wrapper.emitted('update:expandedKeys')).toBeTruthy()
    expect(wrapper.emitted('update:expandedKeys')![0][0]).toContain('root-1')
  })

  it('renders chevron for nodes with children', () => {
    const wrapper = mount(TreeView, {
      props: { data: sampleData },
    })
    const svgs = wrapper.findAll('svg')
    // Documents and Pictures have children, so they should have chevrons
    expect(svgs.length).toBeGreaterThanOrEqual(2)
  })

  it('does not render chevron for leaf nodes', () => {
    const wrapper = mount(TreeView, {
      props: { data: [{ key: 'leaf', label: 'Leaf Node' }] },
    })
    const svgs = wrapper.findAll('svg')
    expect(svgs.length).toBe(0)
  })

  it('emits update:selectedKeys on selection in single mode', async () => {
    const wrapper = mount(TreeView, {
      props: {
        data: [{ key: 'item-1', label: 'Item 1' }],
        selectionMode: 'single',
      },
    })
    const item = wrapper.find('[tabindex="0"]')
    await item.trigger('click')
    expect(wrapper.emitted('update:selectedKeys')).toBeTruthy()
    expect(wrapper.emitted('update:selectedKeys')![0][0]).toContain('item-1')
  })

  it('applies selected styling', () => {
    const wrapper = mount(TreeView, {
      props: {
        data: [{ key: 'item-1', label: 'Item 1' }],
        selectionMode: 'single',
        selectedKeys: ['item-1'],
      },
    })
    const item = wrapper.find('[tabindex="0"]')
    expect(item.classes().join(' ')).toContain('bg-accent')
  })

  it('supports keyboard expand with ArrowRight', async () => {
    const wrapper = mount(TreeView, {
      props: { data: sampleData },
    })
    const item = wrapper.find('[tabindex="0"]')
    await item.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:expandedKeys')).toBeTruthy()
  })

  it('supports keyboard collapse with ArrowLeft', async () => {
    const wrapper = mount(TreeView, {
      props: {
        data: sampleData,
        expandedKeys: ['root-1'],
      },
    })
    const item = wrapper.find('[tabindex="0"]')
    await item.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:expandedKeys')).toBeTruthy()
  })

  it('merges custom classes', () => {
    const wrapper = mount(TreeView, {
      props: { data: sampleData, class: 'custom-tree' },
    })
    expect(wrapper.find('[role="tree"]').classes()).toContain('custom-tree')
  })

  it('handles disabled nodes', () => {
    const wrapper = mount(TreeView, {
      props: {
        data: [{ key: 'disabled-1', label: 'Disabled', disabled: true }],
        selectionMode: 'single',
      },
    })
    const item = wrapper.find('[tabindex="-1"]')
    expect(item.exists()).toBe(true)
    expect(item.classes().join(' ')).toContain('opacity-50')
  })
})
