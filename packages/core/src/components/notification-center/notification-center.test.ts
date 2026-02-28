import type { Notification } from './notification-center.types'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { useNotifications } from '../../composables/useNotifications'
import NotificationCenter from './NotificationCenter.vue'
import NotificationEmpty from './NotificationEmpty.vue'
import NotificationGroup from './NotificationGroup.vue'
import NotificationItem from './NotificationItem.vue'
import NotificationList from './NotificationList.vue'

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

function makeNotification(overrides: Partial<Notification> = {}): Notification {
  return {
    id: `notif-${Math.random().toString(36).slice(2, 9)}`,
    title: 'Test notification',
    description: 'This is a test notification',
    timestamp: new Date(),
    read: false,
    type: 'info',
    ...overrides,
  }
}

function makeTodayNotification(overrides: Partial<Notification> = {}): Notification {
  return makeNotification({
    timestamp: new Date(),
    ...overrides,
  })
}

function makeYesterdayNotification(overrides: Partial<Notification> = {}): Notification {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return makeNotification({
    timestamp: yesterday,
    ...overrides,
  })
}

function makeOlderNotification(overrides: Partial<Notification> = {}): Notification {
  const older = new Date()
  older.setDate(older.getDate() - 5)
  return makeNotification({
    timestamp: older,
    ...overrides,
  })
}

// ---------------------------------------------------------------------------
// NotificationEmpty
// ---------------------------------------------------------------------------

describe('notificationEmpty', () => {
  it('renders default empty message', () => {
    const wrapper = mount(NotificationEmpty)
    expect(wrapper.text()).toContain('No notifications')
  })

  it('renders custom message', () => {
    const wrapper = mount(NotificationEmpty, {
      props: { message: 'All caught up!' },
    })
    expect(wrapper.text()).toContain('All caught up!')
  })

  it('renders slot content', () => {
    const wrapper = mount(NotificationEmpty, {
      slots: { default: '<button>Refresh</button>' },
    })
    expect(wrapper.find('button').text()).toBe('Refresh')
  })

  it('renders bell icon', () => {
    const wrapper = mount(NotificationEmpty)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('accepts custom class', () => {
    const wrapper = mount(NotificationEmpty, {
      props: { class: 'custom-empty' },
    })
    expect(wrapper.find('[data-testid="notification-empty"]').classes()).toContain('custom-empty')
  })
})

// ---------------------------------------------------------------------------
// NotificationItem
// ---------------------------------------------------------------------------

describe('notificationItem', () => {
  it('renders notification title', () => {
    const notification = makeNotification({ title: 'New message' })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    expect(wrapper.text()).toContain('New message')
  })

  it('renders notification description', () => {
    const notification = makeNotification({ description: 'You have a new message' })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    expect(wrapper.text()).toContain('You have a new message')
  })

  it('shows unread indicator for unread notifications', () => {
    const notification = makeNotification({ read: false })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    expect(wrapper.find('[data-testid="unread-indicator"]').exists()).toBe(true)
  })

  it('does not show unread indicator for read notifications', () => {
    const notification = makeNotification({ read: true })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    expect(wrapper.find('[data-testid="unread-indicator"]').exists()).toBe(false)
  })

  it('has data-read attribute', () => {
    const notification = makeNotification({ read: true })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    expect(wrapper.find('[data-testid="notification-item"]').attributes('data-read')).toBe('true')
  })

  it('emits mark-read when unread item is clicked', async () => {
    const notification = makeNotification({ id: 'test-1', read: false })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    await wrapper.find('[data-testid="notification-item"]').trigger('click')
    expect(wrapper.emitted('markRead')?.[0]).toEqual(['test-1'])
  })

  it('does not emit mark-read when read item is clicked', async () => {
    const notification = makeNotification({ id: 'test-1', read: true })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    await wrapper.find('[data-testid="notification-item"]').trigger('click')
    expect(wrapper.emitted('markRead')).toBeFalsy()
  })

  it('emits dismiss when dismiss button is clicked', async () => {
    const notification = makeNotification({ id: 'test-1' })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    await wrapper.find('button[aria-label="Dismiss notification"]').trigger('click')
    expect(wrapper.emitted('dismiss')?.[0]).toEqual(['test-1'])
  })

  it('renders action button when notification has action', () => {
    const notification = makeNotification({
      action: { label: 'View', onClick: vi.fn() },
    })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    expect(wrapper.text()).toContain('View')
  })

  it('calls action onClick when action button is clicked', async () => {
    const onClick = vi.fn()
    const notification = makeNotification({
      id: 'test-action',
      action: { label: 'View', onClick },
    })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    const actionBtn = wrapper.findAll('button').find(b => b.text() === 'View')
    expect(actionBtn).toBeTruthy()
    await actionBtn!.trigger('click')
    expect(onClick).toHaveBeenCalled()
    expect(wrapper.emitted('action')?.[0]).toEqual(['test-action'])
  })

  it('renders avatar text when avatar is not a URL', () => {
    const notification = makeNotification({ avatar: 'JD' })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    expect(wrapper.text()).toContain('JD')
  })

  it('renders avatar image when avatar is a URL', () => {
    const notification = makeNotification({ avatar: 'https://example.com/avatar.png' })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/avatar.png')
  })

  it('applies bold title for unread notifications', () => {
    const notification = makeNotification({ read: false })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    const title = wrapper.find('p.text-sm')
    expect(title.classes()).toContain('font-semibold')
  })

  it('applies normal title for read notifications', () => {
    const notification = makeNotification({ read: true })
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    const title = wrapper.find('p.text-sm')
    expect(title.classes()).toContain('font-normal')
  })

  it('has article role for accessibility', () => {
    const notification = makeNotification()
    const wrapper = mount(NotificationItem, {
      props: { notification },
    })
    expect(wrapper.find('[role="article"]').exists()).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// NotificationGroup
// ---------------------------------------------------------------------------

describe('notificationGroup', () => {
  it('renders group label', () => {
    const wrapper = mount(NotificationGroup, {
      props: {
        label: 'Today',
        notifications: [makeNotification()],
      },
    })
    expect(wrapper.text()).toContain('Today')
  })

  it('renders notifications within the group', () => {
    const notifications = [
      makeNotification({ title: 'First' }),
      makeNotification({ title: 'Second' }),
    ]
    const wrapper = mount(NotificationGroup, {
      props: { label: 'Today', notifications },
    })
    expect(wrapper.text()).toContain('First')
    expect(wrapper.text()).toContain('Second')
  })

  it('forwards mark-read events', async () => {
    const notification = makeNotification({ id: 'test-1', read: false })
    const wrapper = mount(NotificationGroup, {
      props: { label: 'Today', notifications: [notification] },
    })
    await wrapper.find('[data-testid="notification-item"]').trigger('click')
    expect(wrapper.emitted('markRead')?.[0]).toEqual(['test-1'])
  })

  it('forwards dismiss events', async () => {
    const notification = makeNotification({ id: 'test-1' })
    const wrapper = mount(NotificationGroup, {
      props: { label: 'Today', notifications: [notification] },
    })
    await wrapper.find('button[aria-label="Dismiss notification"]').trigger('click')
    expect(wrapper.emitted('dismiss')?.[0]).toEqual(['test-1'])
  })
})

// ---------------------------------------------------------------------------
// NotificationList
// ---------------------------------------------------------------------------

describe('notificationList', () => {
  it('displays notifications list', () => {
    const notifications = [
      makeTodayNotification({ title: 'Notification 1' }),
      makeTodayNotification({ title: 'Notification 2' }),
    ]
    const wrapper = mount(NotificationList, {
      props: { notifications },
    })
    expect(wrapper.text()).toContain('Notification 1')
    expect(wrapper.text()).toContain('Notification 2')
  })

  it('shows empty state when no notifications', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: [] },
    })
    expect(wrapper.find('[data-testid="notification-empty"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('No notifications')
  })

  it('groups by date: Today, Yesterday, Older', () => {
    const notifications = [
      makeTodayNotification({ title: 'Today notif' }),
      makeYesterdayNotification({ title: 'Yesterday notif' }),
      makeOlderNotification({ title: 'Older notif' }),
    ]
    const wrapper = mount(NotificationList, {
      props: { notifications },
    })
    const groups = wrapper.findAll('[data-testid="notification-group"]')
    expect(groups.length).toBe(3)
    expect(wrapper.text()).toContain('Today')
    expect(wrapper.text()).toContain('Yesterday')
    expect(wrapper.text()).toContain('Older')
  })

  it('shows mark all as read button when there are unread notifications', () => {
    const notifications = [makeTodayNotification({ read: false })]
    const wrapper = mount(NotificationList, {
      props: { notifications },
    })
    expect(wrapper.find('[data-testid="mark-all-read-button"]').exists()).toBe(true)
  })

  it('does not show mark all as read when all are read', () => {
    const notifications = [makeTodayNotification({ read: true })]
    const wrapper = mount(NotificationList, {
      props: { notifications },
    })
    expect(wrapper.find('[data-testid="mark-all-read-button"]').exists()).toBe(false)
  })

  it('emits mark-all-read when button is clicked', async () => {
    const notifications = [makeTodayNotification({ read: false })]
    const wrapper = mount(NotificationList, {
      props: { notifications },
    })
    await wrapper.find('[data-testid="mark-all-read-button"]').trigger('click')
    expect(wrapper.emitted('markAllRead')).toBeTruthy()
  })

  it('emits mark-read event', async () => {
    const notification = makeTodayNotification({ id: 'test-1', read: false })
    const wrapper = mount(NotificationList, {
      props: { notifications: [notification] },
    })
    await wrapper.find('[data-testid="notification-item"]').trigger('click')
    expect(wrapper.emitted('markRead')?.[0]).toEqual(['test-1'])
  })

  it('emits dismiss event', async () => {
    const notification = makeTodayNotification({ id: 'test-1' })
    const wrapper = mount(NotificationList, {
      props: { notifications: [notification] },
    })
    await wrapper.find('button[aria-label="Dismiss notification"]').trigger('click')
    expect(wrapper.emitted('dismiss')?.[0]).toEqual(['test-1'])
  })

  it('has a header with title', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: [] },
    })
    expect(wrapper.text()).toContain('Notifications')
  })

  it('accepts custom class', () => {
    const wrapper = mount(NotificationList, {
      props: { notifications: [], class: 'custom-list' },
    })
    expect(wrapper.find('[data-testid="notification-list"]').classes()).toContain('custom-list')
  })
})

// ---------------------------------------------------------------------------
// NotificationCenter (root with popover/dropdown)
// ---------------------------------------------------------------------------

describe('notificationCenter', () => {
  it('renders trigger button', () => {
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [] },
    })
    expect(wrapper.find('[data-testid="notification-trigger"]').exists()).toBe(true)
  })

  it('shows unread badge count', () => {
    const notifications = [
      makeNotification({ read: false }),
      makeNotification({ read: false }),
      makeNotification({ read: true }),
    ]
    const wrapper = mount(NotificationCenter, {
      props: { notifications },
    })
    const badge = wrapper.find('[data-testid="notification-badge"]')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toBe('2')
  })

  it('does not show badge when no unread notifications', () => {
    const notifications = [makeNotification({ read: true })]
    const wrapper = mount(NotificationCenter, {
      props: { notifications },
    })
    expect(wrapper.find('[data-testid="notification-badge"]').exists()).toBe(false)
  })

  it('shows 99+ when unread count exceeds 99', () => {
    const notifications = Array.from({ length: 100 }, () => makeNotification({ read: false }))
    const wrapper = mount(NotificationCenter, {
      props: { notifications },
    })
    const badge = wrapper.find('[data-testid="notification-badge"]')
    expect(badge.text()).toBe('99+')
  })

  it('dropdown is closed by default', () => {
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [] },
    })
    expect(wrapper.find('[data-testid="notification-dropdown"]').exists()).toBe(false)
  })

  it('clicking trigger opens dropdown', async () => {
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [makeNotification()] },
    })
    await wrapper.find('[data-testid="notification-trigger"]').trigger('click')
    expect(wrapper.find('[data-testid="notification-dropdown"]').exists()).toBe(true)
  })

  it('clicking trigger again closes dropdown', async () => {
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [makeNotification()] },
    })
    const trigger = wrapper.find('[data-testid="notification-trigger"]')
    await trigger.trigger('click')
    expect(wrapper.find('[data-testid="notification-dropdown"]').exists()).toBe(true)
    await trigger.trigger('click')
    expect(wrapper.find('[data-testid="notification-dropdown"]').exists()).toBe(false)
  })

  it('displays notifications list in dropdown', async () => {
    const notifications = [makeNotification({ title: 'Hello World' })]
    const wrapper = mount(NotificationCenter, {
      props: { notifications },
    })
    await wrapper.find('[data-testid="notification-trigger"]').trigger('click')
    expect(wrapper.text()).toContain('Hello World')
  })

  it('emits mark-read event', async () => {
    const notification = makeNotification({ id: 'test-1', read: false })
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [notification] },
    })
    await wrapper.find('[data-testid="notification-trigger"]').trigger('click')
    await wrapper.find('[data-testid="notification-item"]').trigger('click')
    expect(wrapper.emitted('markRead')?.[0]).toEqual(['test-1'])
  })

  it('emits mark-all-read event', async () => {
    const notification = makeNotification({ read: false })
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [notification] },
    })
    await wrapper.find('[data-testid="notification-trigger"]').trigger('click')
    await wrapper.find('[data-testid="mark-all-read-button"]').trigger('click')
    expect(wrapper.emitted('markAllRead')).toBeTruthy()
  })

  it('emits dismiss event', async () => {
    const notification = makeNotification({ id: 'test-1' })
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [notification] },
    })
    await wrapper.find('[data-testid="notification-trigger"]').trigger('click')
    await wrapper.find('button[aria-label="Dismiss notification"]').trigger('click')
    expect(wrapper.emitted('dismiss')?.[0]).toEqual(['test-1'])
  })

  it('has aria-label on trigger button', () => {
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [] },
    })
    expect(wrapper.find('[data-testid="notification-trigger"]').attributes('aria-label')).toBe('Notifications')
  })

  it('emits update:open when toggled', async () => {
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [] },
    })
    await wrapper.find('[data-testid="notification-trigger"]').trigger('click')
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
  })

  it('respects controlled open prop', () => {
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [makeNotification()], open: true },
    })
    expect(wrapper.find('[data-testid="notification-dropdown"]').exists()).toBe(true)
  })

  it('accepts custom class', () => {
    const wrapper = mount(NotificationCenter, {
      props: { notifications: [], class: 'custom-center' },
    })
    expect(wrapper.find('[data-testid="notification-center"]').classes()).toContain('custom-center')
  })
})

// ---------------------------------------------------------------------------
// useNotifications composable
// ---------------------------------------------------------------------------

describe('useNotifications', () => {
  it('starts with empty notifications', () => {
    const { notifications, unreadCount } = useNotifications()
    expect(notifications.value).toHaveLength(0)
    expect(unreadCount.value).toBe(0)
  })

  it('starts with initial notifications', () => {
    const initial = [makeNotification(), makeNotification()]
    const { notifications } = useNotifications({ initial })
    expect(notifications.value).toHaveLength(2)
  })

  it('add() adds a notification', () => {
    const { notifications, add } = useNotifications()
    add({
      title: 'New notification',
      timestamp: new Date(),
      read: false,
    })
    expect(notifications.value).toHaveLength(1)
    expect(notifications.value[0].title).toBe('New notification')
  })

  it('add() returns the notification id', () => {
    const { add } = useNotifications()
    const id = add({
      title: 'Test',
      timestamp: new Date(),
      read: false,
    })
    expect(typeof id).toBe('string')
  })

  it('add() uses provided id when given', () => {
    const { notifications, add } = useNotifications()
    add({
      id: 'custom-id',
      title: 'Test',
      timestamp: new Date(),
      read: false,
    })
    expect(notifications.value[0].id).toBe('custom-id')
  })

  it('add() prepends notification to the beginning', () => {
    const { notifications, add } = useNotifications()
    add({ title: 'First', timestamp: new Date(), read: false })
    add({ title: 'Second', timestamp: new Date(), read: false })
    expect(notifications.value[0].title).toBe('Second')
    expect(notifications.value[1].title).toBe('First')
  })

  it('unreadCount computes correctly', () => {
    const { unreadCount, add } = useNotifications()
    add({ title: 'Unread 1', timestamp: new Date(), read: false })
    add({ title: 'Read 1', timestamp: new Date(), read: true })
    add({ title: 'Unread 2', timestamp: new Date(), read: false })
    expect(unreadCount.value).toBe(2)
  })

  it('markAsRead marks a notification as read', () => {
    const { notifications, unreadCount, add, markAsRead } = useNotifications()
    add({ id: 'n1', title: 'Test', timestamp: new Date(), read: false })
    expect(unreadCount.value).toBe(1)
    markAsRead('n1')
    expect(unreadCount.value).toBe(0)
    expect(notifications.value[0].read).toBe(true)
  })

  it('markAsRead with non-existent id does nothing', () => {
    const { notifications, add, markAsRead } = useNotifications()
    add({ id: 'n1', title: 'Test', timestamp: new Date(), read: false })
    markAsRead('non-existent')
    expect(notifications.value[0].read).toBe(false)
  })

  it('markAllAsRead marks all as read', () => {
    const { notifications, unreadCount, add, markAllAsRead } = useNotifications()
    add({ title: 'A', timestamp: new Date(), read: false })
    add({ title: 'B', timestamp: new Date(), read: false })
    add({ title: 'C', timestamp: new Date(), read: false })
    expect(unreadCount.value).toBe(3)
    markAllAsRead()
    expect(unreadCount.value).toBe(0)
    notifications.value.forEach((n) => {
      expect(n.read).toBe(true)
    })
  })

  it('dismiss removes a notification', () => {
    const { notifications, add, dismiss } = useNotifications()
    add({ id: 'n1', title: 'Test', timestamp: new Date(), read: false })
    add({ id: 'n2', title: 'Test 2', timestamp: new Date(), read: false })
    expect(notifications.value).toHaveLength(2)
    dismiss('n1')
    expect(notifications.value).toHaveLength(1)
    expect(notifications.value[0].id).toBe('n2')
  })

  it('dismiss with non-existent id does nothing', () => {
    const { notifications, add, dismiss } = useNotifications()
    add({ id: 'n1', title: 'Test', timestamp: new Date(), read: false })
    dismiss('non-existent')
    expect(notifications.value).toHaveLength(1)
  })

  it('does not mutate initial array', () => {
    const initial = [makeNotification({ id: 'orig' })]
    const { add } = useNotifications({ initial })
    add({ title: 'New', timestamp: new Date(), read: false })
    expect(initial).toHaveLength(1)
  })
})
