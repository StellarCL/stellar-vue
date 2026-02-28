import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CodeBlock from './CodeBlock.vue'
import CodeBlockContent from './CodeBlockContent.vue'
import CodeBlockHeader from './CodeBlockHeader.vue'

describe('codeBlock', () => {
  it('renders as a container', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'console.log("hello")' },
      slots: { default: 'content' },
    })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('rounded-lg')
    expect(classes).toContain('border')
  })

  it('merges custom classes', () => {
    const wrapper = mount(CodeBlock, {
      props: { code: 'test', class: 'custom-block' },
      slots: { default: 'content' },
    })
    expect(wrapper.classes()).toContain('custom-block')
  })
})

describe('codeBlockHeader', () => {
  it('renders language indicator', () => {
    const wrapper = mount({
      components: { CodeBlock, CodeBlockHeader },
      template: `
        <CodeBlock code="test" language="javascript">
          <CodeBlockHeader />
        </CodeBlock>
      `,
    })
    expect(wrapper.text()).toContain('javascript')
  })

  it('renders copy button', () => {
    const wrapper = mount({
      components: { CodeBlock, CodeBlockHeader },
      template: `
        <CodeBlock code="test">
          <CodeBlockHeader />
        </CodeBlock>
      `,
    })
    const copyButton = wrapper.find('[aria-label="Copy code"]')
    expect(copyButton.exists()).toBe(true)
    expect(wrapper.text()).toContain('Copy')
  })

  it('copy button shows Copy text', () => {
    const wrapper = mount({
      components: { CodeBlock, CodeBlockHeader },
      template: `
        <CodeBlock code="some code">
          <CodeBlockHeader />
        </CodeBlock>
      `,
    })
    const copyButton = wrapper.find('[aria-label="Copy code"]')
    expect(copyButton.text()).toContain('Copy')
  })

  it('renders SVG icon in copy button', () => {
    const wrapper = mount({
      components: { CodeBlock, CodeBlockHeader },
      template: `
        <CodeBlock code="test">
          <CodeBlockHeader />
        </CodeBlock>
      `,
    })
    const copyButton = wrapper.find('[aria-label="Copy code"]')
    expect(copyButton.find('svg').exists()).toBe(true)
  })
})

describe('codeBlockContent', () => {
  it('renders code text', () => {
    const wrapper = mount({
      components: { CodeBlock, CodeBlockContent },
      template: `
        <CodeBlock code="const x = 1;">
          <CodeBlockContent />
        </CodeBlock>
      `,
    })
    expect(wrapper.text()).toContain('const x = 1;')
  })

  it('renders line numbers by default', () => {
    const wrapper = mount({
      components: { CodeBlock, CodeBlockContent },
      template: `
        <CodeBlock code="line1\nline2\nline3">
          <CodeBlockContent />
        </CodeBlock>
      `,
    })
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
  })

  it('hides line numbers when showLineNumbers is false', () => {
    const wrapper = mount({
      components: { CodeBlock, CodeBlockContent },
      template: `
        <CodeBlock code="line1\nline2" :show-line-numbers="false">
          <CodeBlockContent />
        </CodeBlock>
      `,
    })
    // The text-zinc-500 class is used for line number cells
    const lineNumberCells = wrapper.findAll('.text-zinc-500')
    expect(lineNumberCells.length).toBe(0)
  })

  it('renders pre and code elements', () => {
    const wrapper = mount({
      components: { CodeBlock, CodeBlockContent },
      template: `
        <CodeBlock code="test">
          <CodeBlockContent />
        </CodeBlock>
      `,
    })
    expect(wrapper.find('pre').exists()).toBe(true)
    expect(wrapper.find('code').exists()).toBe(true)
  })

  it('renders multiline code correctly', () => {
    const code = 'function hello() {\n  return "world";\n}'
    const wrapper = mount({
      components: { CodeBlock, CodeBlockContent },
      template: `
        <CodeBlock :code="code">
          <CodeBlockContent />
        </CodeBlock>
      `,
      data() {
        return { code }
      },
    })
    expect(wrapper.text()).toContain('function hello()')
    expect(wrapper.text()).toContain('return "world"')
  })
})

describe('codeBlock composition', () => {
  it('renders full code block with header and content', () => {
    const code = 'const greeting = "Hello, World!";\nconsole.log(greeting);'
    const wrapper = mount({
      components: { CodeBlock, CodeBlockHeader, CodeBlockContent },
      template: `
        <CodeBlock :code="code" language="typescript">
          <CodeBlockHeader />
          <CodeBlockContent />
        </CodeBlock>
      `,
      data() {
        return { code }
      },
    })

    expect(wrapper.text()).toContain('typescript')
    expect(wrapper.text()).toContain('const greeting')
    expect(wrapper.text()).toContain('console.log')
    expect(wrapper.find('[aria-label="Copy code"]').exists()).toBe(true)
    expect(wrapper.find('pre').exists()).toBe(true)
    expect(wrapper.find('code').exists()).toBe(true)
  })
})
