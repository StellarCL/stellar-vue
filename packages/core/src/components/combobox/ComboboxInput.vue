<script setup lang="ts">
import { computed } from 'vue'
import { ComboboxInput as ComboboxInputPrimitive } from 'radix-vue'
import type { ComboboxInputProps } from './combobox.types'
import { cn } from '../../utils'

const props = defineProps<ComboboxInputProps>()

const classes = computed(() =>
  cn(
    'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    props.class,
  ),
)
</script>

<template>
  <ComboboxInputPrimitive
    :placeholder="placeholder"
    :class="classes"
    auto-focus
  />
</template>
