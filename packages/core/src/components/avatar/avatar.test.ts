import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Avatar from './Avatar.vue'
import AvatarFallback from './AvatarFallback.vue'
import AvatarImage from './AvatarImage.vue'

describe('avatar', () => {
  it('renders with default size classes (h-10 w-10)', () => {
    const wrapper = mount(Avatar)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('h-10')
    expect(classes).toContain('w-10')
  })

  it('applies sm size (h-8 w-8)', () => {
    const wrapper = mount(Avatar, { props: { size: 'sm' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('h-8')
    expect(classes).toContain('w-8')
  })

  it('applies lg size (h-12 w-12)', () => {
    const wrapper = mount(Avatar, { props: { size: 'lg' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('h-12')
    expect(classes).toContain('w-12')
  })

  it('applies xl size (h-16 w-16)', () => {
    const wrapper = mount(Avatar, { props: { size: 'xl' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('h-16')
    expect(classes).toContain('w-16')
  })

  it('has rounded-full and overflow-hidden', () => {
    const wrapper = mount(Avatar)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('rounded-full')
    expect(classes).toContain('overflow-hidden')
  })

  it('merges custom classes on Avatar', () => {
    const wrapper = mount(Avatar, { props: { class: 'custom-avatar' } })
    expect(wrapper.classes()).toContain('custom-avatar')
  })
})

describe('avatarImage', () => {
  it('renders with src and alt', () => {
    const wrapper = mount({
      components: { Avatar, AvatarImage },
      template: `
        <Avatar>
          <AvatarImage src="https://example.com/image.jpg" alt="Test image" />
        </Avatar>
      `,
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    expect(img.attributes('alt')).toBe('Test image')
  })

  it('has object-cover class', () => {
    const wrapper = mount({
      components: { Avatar, AvatarImage },
      template: `
        <Avatar>
          <AvatarImage src="https://example.com/image.jpg" alt="Test image" />
        </Avatar>
      `,
    })
    const img = wrapper.find('img')
    expect(img.classes().join(' ')).toContain('object-cover')
  })

  it('merges custom classes on AvatarImage', () => {
    const wrapper = mount({
      components: { Avatar, AvatarImage },
      template: `
        <Avatar>
          <AvatarImage src="https://example.com/image.jpg" alt="Test image" class="custom-image" />
        </Avatar>
      `,
    })
    const img = wrapper.find('img')
    expect(img.classes()).toContain('custom-image')
  })
})

describe('avatarFallback', () => {
  it('renders slot content (initials text)', () => {
    const wrapper = mount({
      components: { Avatar, AvatarFallback },
      template: `
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      `,
    })
    expect(wrapper.text()).toBe('JD')
  })

  it('has bg-muted class', () => {
    const wrapper = mount({
      components: { Avatar, AvatarFallback },
      template: `
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      `,
    })
    // AvatarFallback renders as a span inside the Avatar span
    const fallback = wrapper.find('span > span')
    expect(fallback.classes().join(' ')).toContain('bg-muted')
  })

  it('merges custom classes on AvatarFallback', () => {
    const wrapper = mount({
      components: { Avatar, AvatarFallback },
      template: `
        <Avatar>
          <AvatarFallback class="custom-fallback">JD</AvatarFallback>
        </Avatar>
      `,
    })
    const fallback = wrapper.find('span > span')
    expect(fallback.classes()).toContain('custom-fallback')
  })
})

describe('avatar composition', () => {
  it('composes Avatar with AvatarImage and AvatarFallback', () => {
    const wrapper = mount({
      components: { Avatar, AvatarImage, AvatarFallback },
      template: `
        <Avatar>
          <AvatarImage src="https://example.com/image.jpg" alt="User avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      `,
    })

    // Avatar root should exist with rounded-full
    const avatarClasses = wrapper.find('span').classes().join(' ')
    expect(avatarClasses).toContain('rounded-full')

    // AvatarFallback text should be rendered
    expect(wrapper.text()).toContain('JD')
  })
})
