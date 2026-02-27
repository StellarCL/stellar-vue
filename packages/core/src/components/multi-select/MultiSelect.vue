<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import type { MultiSelectProps, MultiSelectOption } from './multi-select.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<MultiSelectProps>(), {
  modelValue: () => [],
  options: () => [],
  disabled: false,
  placeholder: 'Select items...',
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const open = ref(false)
const search = ref('')

const selectedValues = computed(() => props.modelValue)

const filteredOptions = computed(() => {
  const term = search.value.toLowerCase()
  if (!term) return props.options
  return props.options.filter((opt: MultiSelectOption) =>
    opt.label.toLowerCase().includes(term),
  )
})

const selectedOptions = computed(() =>
  props.options.filter((opt: MultiSelectOption) => selectedValues.value.includes(opt.value)),
)

function toggleOption(value: string) {
  if (props.disabled) return
  const current = [...selectedValues.value]
  const index = current.indexOf(value)
  if (index === -1) {
    if (props.max !== undefined && current.length >= props.max) return
    current.push(value)
  } else {
    current.splice(index, 1)
  }
  emit('update:modelValue', current)
}

function removeValue(value: string) {
  if (props.disabled) return
  const current = selectedValues.value.filter((v: string) => v !== value)
  emit('update:modelValue', current)
}

function clearAll() {
  if (props.disabled) return
  emit('update:modelValue', [])
}

function handleTriggerClick() {
  if (props.disabled) return
  open.value = !open.value
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('[data-multi-select-root]')) {
    open.value = false
  }
}

// Close on outside click
watch(open, (isOpen) => {
  if (isOpen) {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
  } else {
    document.removeEventListener('click', handleClickOutside)
    search.value = ''
  }
})

const containerClasses = computed(() =>
  cn(
    'relative w-full',
    props.class,
  ),
)

provide('multiSelectContext', {
  open,
  search,
  selectedValues,
  selectedOptions,
  filteredOptions,
  disabled: computed(() => props.disabled),
  placeholder: computed(() => props.placeholder),
  max: computed(() => props.max),
  toggleOption,
  removeValue,
  clearAll,
  handleTriggerClick,
})
</script>

<template>
  <div :class="containerClasses" data-multi-select-root>
    <slot />
  </div>
</template>
