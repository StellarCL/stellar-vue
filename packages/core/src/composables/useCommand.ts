import type { Component, InjectionKey, Ref } from 'vue'
import { inject, onMounted, onUnmounted, provide, ref, shallowRef } from 'vue'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface CommandAction {
  /** Unique identifier for this action */
  id: string
  /** Display label shown in the command palette */
  label: string
  /** Optional description shown below the label */
  description?: string
  /** Optional icon component rendered before the label */
  icon?: Component
  /** Keyboard shortcut keys, e.g. ['meta', 'k'] */
  shortcut?: string[]
  /** Group name for categorizing actions */
  group?: string
  /** Handler invoked when the action is executed */
  handler: () => void | Promise<void>
}

export interface UseCommandReturn {
  /** All currently registered actions */
  actions: Ref<CommandAction[]>
  /** Register one or more actions */
  register: (action: CommandAction | CommandAction[]) => void
  /** Unregister an action by its id */
  unregister: (id: string) => void
  /** Search actions by query string (fuzzy word matching) */
  search: (query: string) => CommandAction[]
  /** List of recently executed action ids (most recent first) */
  recent: Ref<string[]>
  /** Execute an action by id */
  execute: (id: string) => Promise<void>
  /** Whether the command palette is currently open */
  isOpen: Ref<boolean>
  /** Open the command palette */
  open: () => void
  /** Close the command palette */
  close: () => void
}

// ── Injection key ──────────────────────────────────────────────────────────────

const COMMAND_KEY: InjectionKey<UseCommandReturn> = Symbol('stellar-command')

// ── Constants ──────────────────────────────────────────────────────────────────

const RECENT_STORAGE_KEY = 'stellar-ui:command-recent'
const MAX_RECENT = 10

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Fuzzy word search. Splits query into words and checks that each word
 * appears as a substring in the label or description (case-insensitive).
 */
function matchesQuery(action: CommandAction, query: string): boolean {
  if (!query.trim()) {
    return true
  }

  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const haystack = `${action.label} ${action.description ?? ''}`.toLowerCase()

  return words.every(word => haystack.includes(word))
}

/**
 * Load recent action ids from localStorage.
 */
function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed
          .filter((item): item is string => typeof item === 'string')
          .slice(0, MAX_RECENT)
      }
    }
  }
  catch {
    // Silently ignore localStorage errors (SSR, quota, etc.)
  }
  return []
}

/**
 * Persist recent action ids to localStorage.
 */
function saveRecent(ids: string[]): void {
  try {
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_RECENT)))
  }
  catch {
    // Silently ignore localStorage errors
  }
}

/**
 * Parse a shortcut definition (e.g. ['meta', 'shift', 'p']) and check
 * whether a KeyboardEvent matches it.
 */
function matchesShortcut(event: KeyboardEvent, shortcut: string[]): boolean {
  if (shortcut.length === 0) {
    return false
  }

  let requireMeta = false
  let requireCtrl = false
  let requireShift = false
  let requireAlt = false
  let targetKey = ''

  for (const part of shortcut) {
    const lower = part.toLowerCase()
    switch (lower) {
      case 'meta':
      case 'cmd':
      case 'command':
        requireMeta = true
        break
      case 'ctrl':
      case 'control':
        requireCtrl = true
        break
      case 'shift':
        requireShift = true
        break
      case 'alt':
      case 'option':
        requireAlt = true
        break
      default:
        targetKey = lower
    }
  }

  // meta or ctrl either can satisfy a 'meta' requirement (cross-platform)
  const metaSatisfied = !requireMeta || event.metaKey || event.ctrlKey
  const ctrlSatisfied = !requireCtrl || event.ctrlKey
  const shiftSatisfied = !requireShift === !event.shiftKey
  const altSatisfied = !requireAlt === !event.altKey
  const keySatisfied = event.key.toLowerCase() === targetKey

  return metaSatisfied && ctrlSatisfied && shiftSatisfied && altSatisfied && keySatisfied
}

// ── createCommandProvider ──────────────────────────────────────────────────────

/**
 * Creates the root command palette provider. Call this once at the top level
 * of your application (e.g. in App.vue setup). Returns the full command
 * palette API which is also provided to all descendant components.
 */
export function createCommandProvider(): UseCommandReturn {
  const actions = shallowRef<CommandAction[]>([])
  const recent = ref<string[]>(loadRecent())
  const isOpen = ref(false)

  // ── Action registry ────────────────────────────────────────────────────

  function register(action: CommandAction | CommandAction[]): void {
    const toAdd = Array.isArray(action) ? action : [action]
    const existingIds = new Set(actions.value.map(a => a.id))
    const newActions = toAdd.filter(a => !existingIds.has(a.id))

    if (newActions.length > 0) {
      actions.value = [...actions.value, ...newActions]
    }
  }

  function unregister(id: string): void {
    const filtered = actions.value.filter(a => a.id !== id)
    if (filtered.length !== actions.value.length) {
      actions.value = filtered
    }
  }

  // ── Search ─────────────────────────────────────────────────────────────

  function search(query: string): CommandAction[] {
    return actions.value.filter(action => matchesQuery(action, query))
  }

  // ── Execute ────────────────────────────────────────────────────────────

  async function execute(id: string): Promise<void> {
    const action = actions.value.find(a => a.id === id)
    if (!action) {
      return
    }

    // Update recent history
    const updatedRecent = [id, ...recent.value.filter(r => r !== id)].slice(0, MAX_RECENT)
    recent.value = updatedRecent
    saveRecent(updatedRecent)

    // Close the palette before executing
    isOpen.value = false

    await action.handler()
  }

  // ── Open / Close ───────────────────────────────────────────────────────

  function open(): void {
    isOpen.value = true
  }

  function close(): void {
    isOpen.value = false
  }

  // ── Global keyboard shortcut (Cmd+K / Ctrl+K) ─────────────────────────

  function handleGlobalKeydown(event: KeyboardEvent): void {
    // Toggle palette with Cmd+K / Ctrl+K
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      isOpen.value = !isOpen.value
      return
    }

    // Check per-action shortcuts (only when palette is closed)
    if (!isOpen.value) {
      for (const action of actions.value) {
        if (
          action.shortcut
          && action.shortcut.length > 0
          && matchesShortcut(event, action.shortcut)
        ) {
          event.preventDefault()
          execute(action.id)
          return
        }
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleGlobalKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalKeydown)
  })

  // ── Provide & return ───────────────────────────────────────────────────

  const commandReturn: UseCommandReturn = {
    actions,
    register,
    unregister,
    search,
    recent,
    execute,
    isOpen,
    open,
    close,
  }

  provide(COMMAND_KEY, commandReturn)

  return commandReturn
}

// ── useCommand ─────────────────────────────────────────────────────────────────

/**
 * Inject the command palette API from a descendant component. The root
 * provider must have called `createCommandProvider()` first.
 *
 * Returns the full command palette API for registering actions, executing
 * commands, and controlling the palette open/close state.
 */
export function useCommand(): UseCommandReturn {
  const injected = inject(COMMAND_KEY)

  if (!injected) {
    throw new Error(
      '[Stellar] useCommand() was called without a provider. '
      + 'Call createCommandProvider() in a parent component first.',
    )
  }

  return injected
}
