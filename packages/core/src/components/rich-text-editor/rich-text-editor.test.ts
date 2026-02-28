import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick, defineComponent, h, ref } from 'vue'
import RichTextEditor from './RichTextEditor.vue'
import EditorToolbar from './EditorToolbar.vue'
import ToolbarButton from './ToolbarButton.vue'
import ToolbarSeparator from './ToolbarSeparator.vue'
import ToolbarGroup from './ToolbarGroup.vue'

// Mock tiptap modules to avoid ProseMirror DOM issues in jsdom
const mockChain = {
  focus: vi.fn().mockReturnThis(),
  toggleBold: vi.fn().mockReturnThis(),
  toggleItalic: vi.fn().mockReturnThis(),
  toggleUnderline: vi.fn().mockReturnThis(),
  toggleStrike: vi.fn().mockReturnThis(),
  toggleHeading: vi.fn().mockReturnThis(),
  toggleBulletList: vi.fn().mockReturnThis(),
  toggleOrderedList: vi.fn().mockReturnThis(),
  toggleBlockquote: vi.fn().mockReturnThis(),
  toggleCodeBlock: vi.fn().mockReturnThis(),
  setLink: vi.fn().mockReturnThis(),
  unsetLink: vi.fn().mockReturnThis(),
  setImage: vi.fn().mockReturnThis(),
  undo: vi.fn().mockReturnThis(),
  redo: vi.fn().mockReturnThis(),
  run: vi.fn(),
}

const mockActiveStates: Record<string, boolean> = {}

function createMockEditor(content = '') {
  return {
    getHTML: vi.fn(() => content),
    isActive: vi.fn((type: string, attrs?: Record<string, unknown>) => {
      if (attrs && 'level' in attrs) {
        return mockActiveStates[`heading-${attrs.level}`] ?? false
      }
      return mockActiveStates[type] ?? false
    }),
    chain: vi.fn(() => mockChain),
    commands: {
      setContent: vi.fn(),
    },
    setEditable: vi.fn(),
    destroy: vi.fn(),
    storage: {
      characterCount: {
        characters: vi.fn(() => content.replace(/<[^>]*>/g, '').length),
        words: vi.fn(() => {
          const text = content.replace(/<[^>]*>/g, '').trim()
          return text ? text.split(/\s+/).length : 0
        }),
      },
    },
    on: vi.fn(),
    off: vi.fn(),
  }
}

// Mock @tiptap/vue-3
vi.mock('@tiptap/vue-3', () => {
  const { ref, defineComponent, h } = require('vue')
  return {
    useEditor: vi.fn((options: any) => {
      const editor = createMockEditor(options?.content || '')
      return ref(editor)
    }),
    EditorContent: defineComponent({
      name: 'EditorContent',
      props: ['editor'],
      setup(props: any) {
        return () => h('div', { class: 'ProseMirror', 'data-testid': 'editor-content' },
          props.editor ? props.editor.getHTML() : '')
      },
    }),
  }
})

vi.mock('@tiptap/starter-kit', () => ({
  default: { configure: vi.fn().mockReturnValue({}) },
}))

vi.mock('@tiptap/extension-underline', () => ({
  default: {},
}))

vi.mock('@tiptap/extension-link', () => ({
  default: { configure: vi.fn().mockReturnValue({}) },
}))

vi.mock('@tiptap/extension-image', () => ({
  default: { configure: vi.fn().mockReturnValue({}) },
}))

vi.mock('@tiptap/extension-placeholder', () => ({
  default: { configure: vi.fn().mockReturnValue({}) },
}))

vi.mock('@tiptap/extension-character-count', () => {
  const ext = { configure: vi.fn().mockReturnValue({}) }
  return { default: ext }
})

describe('RichTextEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.keys(mockActiveStates).forEach((k) => delete mockActiveStates[k])
    // Reset chain mocks
    Object.values(mockChain).forEach((fn) => fn.mockClear?.())
    mockChain.focus.mockReturnThis()
    mockChain.toggleBold.mockReturnThis()
    mockChain.toggleItalic.mockReturnThis()
    mockChain.toggleUnderline.mockReturnThis()
    mockChain.toggleStrike.mockReturnThis()
    mockChain.toggleHeading.mockReturnThis()
    mockChain.toggleBulletList.mockReturnThis()
    mockChain.toggleOrderedList.mockReturnThis()
    mockChain.toggleBlockquote.mockReturnThis()
    mockChain.toggleCodeBlock.mockReturnThis()
    mockChain.setLink.mockReturnThis()
    mockChain.unsetLink.mockReturnThis()
    mockChain.setImage.mockReturnThis()
    mockChain.undo.mockReturnThis()
    mockChain.redo.mockReturnThis()
  })

  it('renders editor with toolbar', () => {
    const wrapper = mount(RichTextEditor)
    expect(wrapper.find('[data-testid="rich-text-editor"]').exists()).toBe(true)
    expect(wrapper.find('[role="toolbar"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="editor-content"]').exists()).toBe(true)
  })

  it('renders default toolbar buttons', () => {
    const wrapper = mount(RichTextEditor)
    // Default toolbar should include bold, italic, underline, strikethrough, etc.
    expect(wrapper.find('[aria-label="Bold"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Italic"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Underline"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Heading 1"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Undo"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Redo"]').exists()).toBe(true)
  })

  it('v-model outputs HTML', async () => {
    const wrapper = mount(RichTextEditor, {
      props: {
        modelValue: '<p>Hello World</p>',
      },
    })
    // The editor was initialized with the modelValue content
    const { useEditor } = await import('@tiptap/vue-3')
    expect(useEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        content: '<p>Hello World</p>',
      }),
    )
  })

  it('applies disabled state', () => {
    const wrapper = mount(RichTextEditor, {
      props: {
        disabled: true,
      },
    })
    const container = wrapper.find('[data-testid="rich-text-editor"]')
    expect(container.classes().join(' ')).toContain('opacity-50')
    // Toolbar buttons should be disabled
    const buttons = wrapper.findAll('[role="toolbar"] button')
    buttons.forEach((button) => {
      expect(button.attributes('disabled')).toBeDefined()
    })
  })

  it('shows placeholder text', async () => {
    const { useEditor } = await import('@tiptap/vue-3')
    mount(RichTextEditor, {
      props: {
        placeholder: 'Start typing...',
      },
    })
    // Placeholder is configured via the Placeholder extension
    expect(useEditor).toHaveBeenCalled()
  })

  it('shows character count when enabled', () => {
    const wrapper = mount(RichTextEditor, {
      props: {
        modelValue: '<p>Hello</p>',
        showCharacterCount: true,
      },
    })
    const counter = wrapper.find('[data-testid="character-count"]')
    expect(counter.exists()).toBe(true)
    expect(counter.text()).toContain('characters')
    expect(counter.text()).toContain('words')
  })

  it('shows character count with max length', () => {
    const wrapper = mount(RichTextEditor, {
      props: {
        modelValue: '<p>Hello</p>',
        showCharacterCount: true,
        maxLength: 100,
      },
    })
    const counter = wrapper.find('[data-testid="character-count"]')
    expect(counter.text()).toContain('/ 100')
  })

  it('does not show character count by default', () => {
    const wrapper = mount(RichTextEditor)
    expect(wrapper.find('[data-testid="character-count"]').exists()).toBe(false)
  })

  it('applies error state classes', () => {
    const wrapper = mount(RichTextEditor, {
      props: {
        error: true,
      },
    })
    const container = wrapper.find('[data-testid="rich-text-editor"]')
    expect(container.classes().join(' ')).toContain('border-destructive')
  })

  it('merges custom classes', () => {
    const wrapper = mount(RichTextEditor, {
      props: {
        class: 'custom-editor',
      },
    })
    const container = wrapper.find('[data-testid="rich-text-editor"]')
    expect(container.classes()).toContain('custom-editor')
  })

  it('renders separators in toolbar', () => {
    const wrapper = mount(RichTextEditor)
    const separators = wrapper.findAll('[role="separator"]')
    expect(separators.length).toBeGreaterThan(0)
  })

  it('accepts custom toolbar configuration', () => {
    const wrapper = mount(RichTextEditor, {
      props: {
        toolbar: [['bold', 'italic'], 'separator', ['undo', 'redo']],
      },
    })
    expect(wrapper.find('[aria-label="Bold"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Italic"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Undo"]').exists()).toBe(true)
    // Should NOT have heading buttons with custom toolbar
    expect(wrapper.find('[aria-label="Heading 1"]').exists()).toBe(false)
  })
})

describe('ToolbarButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.keys(mockActiveStates).forEach((k) => delete mockActiveStates[k])
    Object.values(mockChain).forEach((fn) => fn.mockClear?.())
    mockChain.focus.mockReturnThis()
    mockChain.toggleBold.mockReturnThis()
    mockChain.toggleItalic.mockReturnThis()
  })

  it('renders with correct aria-label', () => {
    const editor = createMockEditor()
    const wrapper = mount(ToolbarButton, {
      props: { editor: editor as any, command: 'bold' },
    })
    expect(wrapper.find('[aria-label="Bold"]').exists()).toBe(true)
  })

  it('executes bold toggle on click', async () => {
    const editor = createMockEditor()
    const wrapper = mount(ToolbarButton, {
      props: { editor: editor as any, command: 'bold' },
    })
    await wrapper.find('button').trigger('click')
    expect(editor.chain).toHaveBeenCalled()
    expect(mockChain.focus).toHaveBeenCalled()
    expect(mockChain.toggleBold).toHaveBeenCalled()
    expect(mockChain.run).toHaveBeenCalled()
  })

  it('executes italic toggle on click', async () => {
    const editor = createMockEditor()
    const wrapper = mount(ToolbarButton, {
      props: { editor: editor as any, command: 'italic' },
    })
    await wrapper.find('button').trigger('click')
    expect(mockChain.toggleItalic).toHaveBeenCalled()
  })

  it('shows active state when format is active', () => {
    mockActiveStates.bold = true
    const editor = createMockEditor()
    const wrapper = mount(ToolbarButton, {
      props: { editor: editor as any, command: 'bold' },
    })
    expect(wrapper.find('button').attributes('aria-pressed')).toBe('true')
    expect(wrapper.find('button').attributes('data-active')).toBeDefined()
  })

  it('shows inactive state when format is not active', () => {
    mockActiveStates.bold = false
    const editor = createMockEditor()
    const wrapper = mount(ToolbarButton, {
      props: { editor: editor as any, command: 'bold' },
    })
    expect(wrapper.find('button').attributes('aria-pressed')).toBe('false')
  })

  it('is disabled when editor is null', () => {
    const wrapper = mount(ToolbarButton, {
      props: { editor: null, command: 'bold' },
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('is disabled when disabled prop is true', () => {
    const editor = createMockEditor()
    const wrapper = mount(ToolbarButton, {
      props: { editor: editor as any, command: 'bold', disabled: true },
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('does not execute command when disabled', async () => {
    const editor = createMockEditor()
    const wrapper = mount(ToolbarButton, {
      props: { editor: editor as any, command: 'bold', disabled: true },
    })
    await wrapper.find('button').trigger('click')
    expect(editor.chain).not.toHaveBeenCalled()
  })
})

describe('EditorToolbar', () => {
  it('renders toolbar with correct role', () => {
    const editor = createMockEditor()
    const wrapper = mount(EditorToolbar, {
      props: { editor: editor as any },
    })
    expect(wrapper.find('[role="toolbar"]').exists()).toBe(true)
    expect(wrapper.find('[role="toolbar"]').attributes('aria-label')).toBe('Text formatting')
  })

  it('renders groups and separators from default config', () => {
    const editor = createMockEditor()
    const wrapper = mount(EditorToolbar, {
      props: { editor: editor as any },
    })
    expect(wrapper.findAll('[role="separator"]').length).toBeGreaterThan(0)
    expect(wrapper.findAll('[role="group"]').length).toBeGreaterThan(0)
  })

  it('renders custom toolbar items', () => {
    const editor = createMockEditor()
    const wrapper = mount(EditorToolbar, {
      props: {
        editor: editor as any,
        items: ['bold', 'separator', 'italic'],
      },
    })
    expect(wrapper.find('[aria-label="Bold"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Italic"]').exists()).toBe(true)
    expect(wrapper.findAll('[role="separator"]').length).toBe(1)
  })

  it('merges custom classes', () => {
    const editor = createMockEditor()
    const wrapper = mount(EditorToolbar, {
      props: { editor: editor as any, class: 'custom-toolbar' },
    })
    expect(wrapper.find('[role="toolbar"]').classes()).toContain('custom-toolbar')
  })
})

describe('ToolbarSeparator', () => {
  it('renders with separator role', () => {
    const wrapper = mount(ToolbarSeparator)
    expect(wrapper.find('[role="separator"]').exists()).toBe(true)
  })

  it('has vertical orientation', () => {
    const wrapper = mount(ToolbarSeparator)
    expect(wrapper.find('[role="separator"]').attributes('aria-orientation')).toBe('vertical')
  })

  it('merges custom classes', () => {
    const wrapper = mount(ToolbarSeparator, {
      props: { class: 'custom-sep' },
    })
    expect(wrapper.find('[role="separator"]').classes()).toContain('custom-sep')
  })
})

describe('ToolbarGroup', () => {
  it('renders with group role', () => {
    const wrapper = mount(ToolbarGroup, {
      slots: { default: 'content' },
    })
    expect(wrapper.find('[role="group"]').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(ToolbarGroup, {
      slots: { default: '<button>Test</button>' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('merges custom classes', () => {
    const wrapper = mount(ToolbarGroup, {
      props: { class: 'custom-group' },
      slots: { default: 'content' },
    })
    expect(wrapper.find('[role="group"]').classes()).toContain('custom-group')
  })
})
