<script setup lang="ts">
import type { MenubarProps } from './menubar.types'
import { MenubarRoot } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<MenubarProps>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const classes = computed(() =>
  cn(
    'flex h-10 items-center space-x-1 rounded-md border bg-background p-1',
    props.class,
  ),
)
</script>

<template>
  <MenubarRoot
    :model-value="modelValue"
    :default-value="defaultValue"
    :class="classes"
    @update:model-value="emit('update:modelValue', String($event))"
  >
    <slot />
  </MenubarRoot>
</template>
