<script setup lang="ts">
import type { CommandContext, CommandItemProps } from './command.types'
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CommandItemProps>(), {
  disabled: false,
})

const emit = defineEmits<{
  /** Fired when the item is selected via click or keyboard Enter */
  select: [value: string]
}>()

const context = inject<CommandContext>('command')
const registerEnter = inject<(index: number, cb: () => void) => void>('command:registerEnter')
const unregisterEnter = inject<(index: number) => void>('command:unregisterEnter')

// Group-level registration so CommandGroup can track visibility
const groupRegister = inject<((index: number) => void) | undefined>('command:group:registerItem', undefined)
const groupUnregister = inject<((index: number) => void) | undefined>('command:group:unregisterItem', undefined)

const itemEl = ref<HTMLDivElement | null>(null)
// Use a ref so that computed properties re-evaluate once the item is registered
const myIndex = ref(-1)

onMounted(() => {
  if (!context)
    return

  // Derive the filter value from the explicit prop or the element's text content
  const filterValue
    = props.value ?? itemEl.value?.textContent?.trim() ?? ''

  myIndex.value = context.registerItem(filterValue)
  groupRegister?.(myIndex.value)

  registerEnter?.(myIndex.value, handleSelect)
})

onUnmounted(() => {
  if (!context || myIndex.value === -1)
    return
  context.unregisterItem(myIndex.value)
  groupUnregister?.(myIndex.value)
  unregisterEnter?.(myIndex.value)
})

const isSelected = computed(
  () => context !== undefined && context.selectedIndex.value === myIndex.value,
)

const isVisible = computed(
  () => context === undefined || context.isItemVisible(myIndex.value),
)

function handleSelect(): void {
  if (props.disabled)
    return
  context?.selectItem(myIndex.value)
  emit('select', props.value ?? itemEl.value?.textContent?.trim() ?? '')
}

const classes = computed(() =>
  cn(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.class,
  ),
)
</script>

<template>
  <div
    v-show="isVisible"
    ref="itemEl"
    :class="classes"
    :aria-selected="isSelected || undefined"
    :data-disabled="disabled || undefined"
    role="option"
    @click="handleSelect"
  >
    <slot />
  </div>
</template>
