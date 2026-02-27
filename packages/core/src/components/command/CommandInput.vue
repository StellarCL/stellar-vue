<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CommandInputProps, CommandContext } from './command.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CommandInputProps>(), {
  placeholder: 'Search...',
  modelValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const context = inject<CommandContext>('command')
const onSearchChange = inject<(value: string) => void>('command:onSearchChange')

function handleInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  onSearchChange?.(value)
}

const inputClasses = computed(() =>
  cn(
    'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    props.class,
  ),
)
</script>

<template>
  <div class="flex items-center border-b px-3" data-cmdk-input-wrapper="">
    <!-- Magnifying glass icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="mr-2 h-4 w-4 shrink-0 opacity-50"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input
      :class="inputClasses"
      :placeholder="placeholder"
      :value="modelValue"
      type="text"
      role="searchbox"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      aria-autocomplete="list"
      @input="handleInput"
    />
  </div>
</template>
