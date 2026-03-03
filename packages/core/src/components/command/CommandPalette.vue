<script setup lang="ts">
import type { CommandAction } from '../../composables/useCommand'
import type { CommandPaletteProps } from './command.types'
import { computed } from 'vue'
import { useCommand } from '../../composables/useCommand'
import CommandDialog from './CommandDialog.vue'
import CommandEmpty from './CommandEmpty.vue'
import CommandGroup from './CommandGroup.vue'
import CommandInput from './CommandInput.vue'
import CommandItem from './CommandItem.vue'
import CommandList from './CommandList.vue'
import CommandSeparator from './CommandSeparator.vue'
import CommandShortcut from './CommandShortcut.vue'

const props = withDefaults(defineProps<CommandPaletteProps>(), {
  placeholder: 'Type a command or search...',
})

const { actions, recent, execute, isOpen } = useCommand()

// ── Recent actions ─────────────────────────────────────────────────────────────
// Resolve recent action ids to actual action objects, preserving order.
const recentActions = computed<CommandAction[]>(() => {
  const actionMap = new Map(actions.value.map(a => [a.id, a]))
  return recent.value
    .map(id => actionMap.get(id))
    .filter((a): a is CommandAction => a !== undefined)
})

// ── Grouped actions ────────────────────────────────────────────────────────────
// Group all actions by their `group` property. Actions without a group go
// into an "Actions" fallback group.
interface ActionGroup {
  name: string
  actions: CommandAction[]
}

const groupedActions = computed<ActionGroup[]>(() => {
  const groups = new Map<string, CommandAction[]>()

  for (const action of actions.value) {
    const groupName = action.group ?? 'Actions'
    const existing = groups.get(groupName)
    if (existing) {
      existing.push(action)
    }
    else {
      groups.set(groupName, [action])
    }
  }

  return Array.from(groups.entries()).map(([name, acts]) => ({
    name,
    actions: acts,
  }))
})

// ── Shortcut formatting ────────────────────────────────────────────────────────
function formatShortcut(shortcut: string[]): string {
  const keyMap: Record<string, string> = {
    meta: '\u2318',
    cmd: '\u2318',
    command: '\u2318',
    ctrl: 'Ctrl',
    control: 'Ctrl',
    shift: '\u21E7',
    alt: '\u2325',
    option: '\u2325',
    enter: '\u21B5',
    backspace: '\u232B',
    delete: '\u2326',
    escape: 'Esc',
    tab: '\u21E5',
    up: '\u2191',
    down: '\u2193',
    left: '\u2190',
    right: '\u2192',
  }

  return shortcut.map(key => keyMap[key.toLowerCase()] ?? key.toUpperCase()).join('')
}
</script>

<template>
  <CommandDialog v-model:open="isOpen" :class="props.class">
    <CommandInput :placeholder="placeholder" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>

      <!-- Recent actions group -->
      <CommandGroup v-if="recentActions.length > 0" heading="Recent">
        <CommandItem
          v-for="action in recentActions"
          :key="`recent-${action.id}`"
          :value="action.label"
          @select="execute(action.id)"
        >
          <component :is="action.icon" v-if="action.icon" class="mr-2 h-4 w-4" />
          <span>{{ action.label }}</span>
          <CommandShortcut v-if="action.shortcut">
            {{ formatShortcut(action.shortcut) }}
          </CommandShortcut>
        </CommandItem>
      </CommandGroup>

      <CommandSeparator v-if="recentActions.length > 0" />

      <!-- Grouped actions -->
      <CommandGroup v-for="group in groupedActions" :key="group.name" :heading="group.name">
        <CommandItem
          v-for="action in group.actions"
          :key="action.id"
          :value="action.label"
          @select="execute(action.id)"
        >
          <component :is="action.icon" v-if="action.icon" class="mr-2 h-4 w-4" />
          <span>{{ action.label }}</span>
          <CommandShortcut v-if="action.shortcut">
            {{ formatShortcut(action.shortcut) }}
          </CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
