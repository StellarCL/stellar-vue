<script setup lang="ts">
import { computed, provide, ref, readonly } from 'vue'
import type { CommandProps, CommandContext } from './command.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CommandProps>(), {})

// ── Search state ────────────────────────────────────────────────────────────
const search = ref('')

// ── Item registry ────────────────────────────────────────────────────────────
// Each registered item stores the value string used for filtering.
// The item's index in this array is its stable identity for the lifetime
// of the component. null means the slot is free (item was unregistered or
// not yet mounted).
const items = ref<Array<string | null>>([])

function registerItem(value: string): number {
  // Reuse a null slot if available, otherwise append
  const freeSlot = items.value.indexOf(null)
  if (freeSlot !== -1) {
    items.value[freeSlot] = value
    return freeSlot
  }
  items.value.push(value)
  return items.value.length - 1
}

function unregisterItem(index: number): void {
  // Replace the entry with null so other indices remain stable.
  if (index >= 0 && index < items.value.length) {
    items.value[index] = null
  }
}

function isItemVisible(index: number): boolean {
  if (index < 0 || index >= items.value.length) return false
  const item = items.value[index]
  if (item === null) return false
  if (!search.value) return true
  return item.toLowerCase().includes(search.value.toLowerCase())
}

// ── Keyboard navigation ──────────────────────────────────────────────────────
const selectedIndex = ref(-1)

/** Returns the flat list of valid visible indices in registration order */
function getVisibleIndices(): number[] {
  return items.value
    .map((_, i) => i)
    .filter((i) => items.value[i] !== null && isItemVisible(i))
}

function moveSelection(direction: 1 | -1): void {
  const visible = getVisibleIndices()
  if (visible.length === 0) {
    selectedIndex.value = -1
    return
  }
  const currentPos = visible.indexOf(selectedIndex.value)
  if (currentPos === -1) {
    selectedIndex.value = direction === 1 ? visible[0] : visible[visible.length - 1]
  } else {
    const next = currentPos + direction
    if (next < 0) {
      selectedIndex.value = visible[visible.length - 1]
    } else if (next >= visible.length) {
      selectedIndex.value = visible[0]
    } else {
      selectedIndex.value = visible[next]
    }
  }
}

function selectItem(index: number): void {
  selectedIndex.value = index
}

// Reset selectedIndex whenever the search changes so navigation starts fresh
function handleSearchChange(value: string): void {
  search.value = value
  selectedIndex.value = -1
}

function handleKeydown(event: KeyboardEvent): void {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      moveSelection(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveSelection(-1)
      break
    case 'Enter':
      event.preventDefault()
      // The active CommandItem listens for this through context — nothing extra
      // needed here; items watch selectedIndex and handle their own click.
      break
    default:
      break
  }
}

// ── Expose context for Enter key triggering ──────────────────────────────────
const enterCallbacks = ref<Map<number, () => void>>(new Map())

function registerEnterCallback(index: number, callback: () => void): void {
  enterCallbacks.value.set(index, callback)
}

function unregisterEnterCallback(index: number): void {
  enterCallbacks.value.delete(index)
}

function triggerSelectedEnter(): void {
  const cb = enterCallbacks.value.get(selectedIndex.value)
  if (cb) cb()
}

// Augment keydown to fire the enter callback
function handleKeydownWithEnter(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    event.preventDefault()
    triggerSelectedEnter()
    return
  }
  handleKeydown(event)
}

// ── Provide context ──────────────────────────────────────────────────────────
const itemCount = computed(() => items.value.filter((v) => v !== null).length)

provide<CommandContext>('command', {
  search: search as unknown as { value: string },
  selectedIndex: selectedIndex as unknown as { value: number },
  itemCount: itemCount as unknown as { value: number },
  registerItem,
  unregisterItem,
  isItemVisible,
  selectItem,
})

// Provide extra enter-callback registration separately
provide('command:registerEnter', registerEnterCallback)
provide('command:unregisterEnter', unregisterEnterCallback)
provide('command:onSearchChange', handleSearchChange)

// ── Classes ──────────────────────────────────────────────────────────────────
const classes = computed(() =>
  cn(
    'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" role="combobox" aria-haspopup="listbox" @keydown="handleKeydownWithEnter">
    <slot />
  </div>
</template>
