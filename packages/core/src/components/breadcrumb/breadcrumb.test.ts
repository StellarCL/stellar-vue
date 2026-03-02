import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '.'

describe('breadcrumb', () => {
  it('renders a nav element', () => {
    const wrapper = mount(Breadcrumb)
    expect(wrapper.element.tagName).toBe('NAV')
  })

  it('renders nav with default aria-label="Breadcrumb"', () => {
    const wrapper = mount(Breadcrumb)
    expect(wrapper.attributes('aria-label')).toBe('Breadcrumb')
  })

  it('renders nav with custom aria-label', () => {
    const wrapper = mount(Breadcrumb, {
      props: { ariaLabel: 'Site navigation' },
    })
    expect(wrapper.attributes('aria-label')).toBe('Site navigation')
  })

  it('renders slot content', () => {
    const wrapper = mount(Breadcrumb, {
      slots: { default: '<span>breadcrumb content</span>' },
    })
    expect(wrapper.text()).toBe('breadcrumb content')
  })

  it('accepts custom class', () => {
    const wrapper = mount(Breadcrumb, {
      props: { class: 'custom-breadcrumb' },
    })
    expect(wrapper.classes()).toContain('custom-breadcrumb')
  })
})

describe('breadcrumbList', () => {
  it('renders an ol element', () => {
    const wrapper = mount(BreadcrumbList)
    expect(wrapper.element.tagName).toBe('OL')
  })

  it('applies correct base classes', () => {
    const wrapper = mount(BreadcrumbList)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('flex')
    expect(classes).toContain('flex-wrap')
    expect(classes).toContain('items-center')
    expect(classes).toContain('gap-1.5')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('text-muted-foreground')
  })

  it('accepts custom class', () => {
    const wrapper = mount(BreadcrumbList, {
      props: { class: 'custom-list' },
    })
    expect(wrapper.classes()).toContain('custom-list')
  })
})

describe('breadcrumbItem', () => {
  it('renders a li element', () => {
    const wrapper = mount(BreadcrumbItem)
    expect(wrapper.element.tagName).toBe('LI')
  })

  it('applies correct base classes', () => {
    const wrapper = mount(BreadcrumbItem)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('inline-flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('gap-1.5')
  })

  it('accepts custom class', () => {
    const wrapper = mount(BreadcrumbItem, {
      props: { class: 'custom-item' },
    })
    expect(wrapper.classes()).toContain('custom-item')
  })
})

describe('breadcrumbLink', () => {
  it('renders as an anchor element by default', () => {
    const wrapper = mount(BreadcrumbLink)
    expect(wrapper.element.tagName).toBe('A')
  })

  it('renders with href attribute', () => {
    const wrapper = mount(BreadcrumbLink, {
      props: { href: '/home' },
    })
    expect(wrapper.attributes('href')).toBe('/home')
  })

  it('renders as a span when asChild is true', () => {
    const wrapper = mount(BreadcrumbLink, {
      props: { asChild: true },
    })
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('does not render href when asChild is true', () => {
    const wrapper = mount(BreadcrumbLink, {
      props: { asChild: true, href: '/home' },
    })
    expect(wrapper.attributes('href')).toBeUndefined()
  })

  it('applies transition-colors class', () => {
    const wrapper = mount(BreadcrumbLink)
    expect(wrapper.classes()).toContain('transition-colors')
  })

  it('applies hover:text-primary class', () => {
    const wrapper = mount(BreadcrumbLink)
    expect(wrapper.classes()).toContain('hover:text-primary')
  })

  it('accepts custom class', () => {
    const wrapper = mount(BreadcrumbLink, {
      props: { class: 'custom-link' },
    })
    expect(wrapper.classes()).toContain('custom-link')
  })

  it('renders slot content', () => {
    const wrapper = mount(BreadcrumbLink, {
      slots: { default: 'Home' },
    })
    expect(wrapper.text()).toBe('Home')
  })
})

describe('breadcrumbPage', () => {
  it('renders as a span element', () => {
    const wrapper = mount(BreadcrumbPage)
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('has aria-current="page"', () => {
    const wrapper = mount(BreadcrumbPage)
    expect(wrapper.attributes('aria-current')).toBe('page')
  })

  it('has aria-disabled="true"', () => {
    const wrapper = mount(BreadcrumbPage)
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('has role="link"', () => {
    const wrapper = mount(BreadcrumbPage)
    expect(wrapper.attributes('role')).toBe('link')
  })

  it('applies font-normal and text-foreground classes', () => {
    const wrapper = mount(BreadcrumbPage)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('font-normal')
    expect(classes).toContain('text-foreground')
  })

  it('accepts custom class', () => {
    const wrapper = mount(BreadcrumbPage, {
      props: { class: 'custom-page' },
    })
    expect(wrapper.classes()).toContain('custom-page')
  })

  it('renders slot content', () => {
    const wrapper = mount(BreadcrumbPage, {
      slots: { default: 'Current Page' },
    })
    expect(wrapper.text()).toBe('Current Page')
  })
})

describe('breadcrumbSeparator', () => {
  it('renders a li element', () => {
    const wrapper = mount(BreadcrumbSeparator)
    expect(wrapper.element.tagName).toBe('LI')
  })

  it('has role="presentation"', () => {
    const wrapper = mount(BreadcrumbSeparator)
    expect(wrapper.attributes('role')).toBe('presentation')
  })

  it('has aria-hidden="true"', () => {
    const wrapper = mount(BreadcrumbSeparator)
    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })

  it('renders default "/" separator', () => {
    const wrapper = mount(BreadcrumbSeparator)
    expect(wrapper.text()).toBe('/')
  })

  it('renders custom separator via slot', () => {
    const wrapper = mount(BreadcrumbSeparator, {
      slots: { default: '>' },
    })
    expect(wrapper.text()).toBe('>')
  })

  it('accepts custom class', () => {
    const wrapper = mount(BreadcrumbSeparator, {
      props: { class: 'custom-separator' },
    })
    expect(wrapper.classes()).toContain('custom-separator')
  })
})

describe('breadcrumbEllipsis', () => {
  it('renders a span element', () => {
    const wrapper = mount(BreadcrumbEllipsis)
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('has role="presentation"', () => {
    const wrapper = mount(BreadcrumbEllipsis)
    expect(wrapper.attributes('role')).toBe('presentation')
  })

  it('has aria-hidden="true"', () => {
    const wrapper = mount(BreadcrumbEllipsis)
    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })

  it('renders sr-only "More" text', () => {
    const wrapper = mount(BreadcrumbEllipsis)
    const srOnly = wrapper.find('.sr-only')
    expect(srOnly.exists()).toBe(true)
    expect(srOnly.text()).toBe('More')
  })

  it('applies flex h-9 w-9 items-center justify-center classes', () => {
    const wrapper = mount(BreadcrumbEllipsis)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('flex')
    expect(classes).toContain('h-9')
    expect(classes).toContain('w-9')
    expect(classes).toContain('items-center')
    expect(classes).toContain('justify-center')
  })

  it('accepts custom class', () => {
    const wrapper = mount(BreadcrumbEllipsis, {
      props: { class: 'custom-ellipsis' },
    })
    expect(wrapper.classes()).toContain('custom-ellipsis')
  })
})

describe('breadcrumb composition', () => {
  it('renders full breadcrumb with items and separators', () => {
    const wrapper = mount({
      components: {
        Breadcrumb,
        BreadcrumbList,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbSeparator,
        BreadcrumbPage,
      },
      template: `
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      `,
    })

    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Breadcrumb')
    expect(wrapper.find('ol').exists()).toBe(true)
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Docs')
    expect(wrapper.text()).toContain('Components')

    const links = wrapper.findAll('a')
    expect(links.length).toBe(2)
    expect(links[0].attributes('href')).toBe('/')
    expect(links[1].attributes('href')).toBe('/docs')

    const page = wrapper.find('[aria-current="page"]')
    expect(page.exists()).toBe(true)
    expect(page.text()).toBe('Components')

    const separators = wrapper.findAll('li[role="presentation"]')
    expect(separators.length).toBe(2)
  })

  it('renders with custom separator slot', () => {
    const wrapper = mount({
      components: {
        Breadcrumb,
        BreadcrumbList,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbSeparator,
      },
      template: `
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <span>›</span>
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/about">About</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      `,
    })

    const separator = wrapper.find('li[role="presentation"]')
    expect(separator.text()).toBe('›')
  })

  it('renders with ellipsis for long paths', () => {
    const wrapper = mount({
      components: {
        Breadcrumb,
        BreadcrumbList,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbSeparator,
        BreadcrumbEllipsis,
        BreadcrumbPage,
      },
      template: `
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      `,
    })

    const ellipsis = wrapper.find('span[role="presentation"]')
    expect(ellipsis.exists()).toBe(true)
    expect(wrapper.find('.sr-only').text()).toBe('More')
  })
})
