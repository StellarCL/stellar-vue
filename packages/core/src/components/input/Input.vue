<script setup lang="ts">
import type { InputProps } from './input.types'
import { computed } from 'vue'
import { cn } from '../../utils'
import { inputVariants } from './input.variants'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  required: false,
  readonly: false,
  error: false,
})

const model = defineModel<string | number>()

const generatedId = `stellar-input-${Math.random().toString(36).slice(2, 9)}`
const inputId = computed(() => props.id ?? generatedId)

const classes = computed(() =>
  cn(
    inputVariants({ error: props.error }),
    props.class,
  ),
)
</script>

<template>
  <input
    :id="inputId"
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
    :class="classes"
  >
</template>
