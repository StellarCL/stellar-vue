import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Tabs from './Tabs.vue'
import TabsContent from './TabsContent.vue'
import TabsList from './TabsList.vue'
import TabsTrigger from './TabsTrigger.vue'

describe('tabsList', () => {
  it('renders TabsList with triggers', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger },
      template: `
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      `,
    })
    expect(wrapper.text()).toContain('Tab 1')
    expect(wrapper.text()).toContain('Tab 2')
  })

  it('has correct base classes', () => {
    const wrapper = mount({
      components: { Tabs, TabsList },
      template: `
        <Tabs default-value="tab1">
          <TabsList>content</TabsList>
        </Tabs>
      `,
    })
    const list = wrapper.find('[role="tablist"]')
    const classes = list.classes().join(' ')
    expect(classes).toContain('inline-flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('border-b')
    expect(classes).toContain('border-border')
  })

  it('merges custom classes', () => {
    const wrapper = mount({
      components: { Tabs, TabsList },
      template: `
        <Tabs default-value="tab1">
          <TabsList class="custom-list">content</TabsList>
        </Tabs>
      `,
    })
    const list = wrapper.find('[role="tablist"]')
    expect(list.classes()).toContain('custom-list')
  })
})

describe('tabsTrigger', () => {
  it('has correct base classes', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger },
      template: `
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      `,
    })
    const trigger = wrapper.find('[role="tab"]')
    const classes = trigger.classes().join(' ')
    expect(classes).toContain('inline-flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('justify-center')
    expect(classes).toContain('whitespace-nowrap')
    expect(classes).toContain('border-b-2')
    expect(classes).toContain('border-transparent')
    expect(classes).toContain('px-4')
    expect(classes).toContain('py-2')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('font-medium')
    expect(classes).toContain('tracking-wide')
    expect(classes).toContain('text-muted-foreground')
  })

  it('merges custom classes on TabsTrigger', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger },
      template: `
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1" class="custom-trigger">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      `,
    })
    const trigger = wrapper.find('[role="tab"]')
    expect(trigger.classes()).toContain('custom-trigger')
  })

  it('renders slot content', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger },
      template: `
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">My Tab Label</TabsTrigger>
          </TabsList>
        </Tabs>
      `,
    })
    expect(wrapper.text()).toContain('My Tab Label')
  })
})

describe('tabsContent', () => {
  it('renders slot content', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      template: `
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p>Tab 1 content panel</p>
          </TabsContent>
        </Tabs>
      `,
    })
    expect(wrapper.text()).toContain('Tab 1 content panel')
  })

  it('has correct base classes', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      template: `
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      `,
    })
    const content = wrapper.find('[role="tabpanel"]')
    const classes = content.classes().join(' ')
    expect(classes).toContain('mt-2')
    expect(classes).toContain('ring-offset-background')
  })

  it('merges custom classes on TabsContent', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      template: `
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" class="custom-content">Content</TabsContent>
        </Tabs>
      `,
    })
    const content = wrapper.find('[role="tabpanel"]')
    expect(content.classes()).toContain('custom-content')
  })
})

describe('tabs active state', () => {
  it('active trigger has data-[state=active] attribute', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger },
      template: `
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      `,
    })
    const triggers = wrapper.findAll('[role="tab"]')
    // First trigger should be active (data-state="active") since defaultValue="tab1"
    const activeTrigger = triggers.find(t => t.attributes('data-state') === 'active')
    expect(activeTrigger).toBeDefined()
    expect(activeTrigger!.attributes('data-state')).toBe('active')
  })

  it('inactive trigger has data-[state=inactive] attribute', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger },
      template: `
        <Tabs default-value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      `,
    })
    const triggers = wrapper.findAll('[role="tab"]')
    const inactiveTrigger = triggers.find(t => t.attributes('data-state') === 'inactive')
    expect(inactiveTrigger).toBeDefined()
    expect(inactiveTrigger!.attributes('data-state')).toBe('inactive')
  })
})

describe('tabs composition', () => {
  it('full Tabs composition renders list, triggers, and content panels', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      template: `
        <Tabs default-value="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p>Account settings content</p>
          </TabsContent>
          <TabsContent value="password">
            <p>Password settings content</p>
          </TabsContent>
        </Tabs>
      `,
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Account')
    expect(wrapper.text()).toContain('Password')
    // Active tab content is visible
    expect(wrapper.text()).toContain('Account settings content')
    // TabsList renders
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    // Triggers render
    const triggers = wrapper.findAll('[role="tab"]')
    expect(triggers.length).toBe(2)
  })

  it('renders Tabs root without crashing', () => {
    const wrapper = mount(Tabs, {
      props: { defaultValue: 'tab1' },
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('supports v-model binding', () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      template: `
        <Tabs v-model="activeTab">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      `,
      data() {
        return { activeTab: 'tab1' }
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Content 1')
  })
})
