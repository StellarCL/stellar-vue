<script lang="ts">
let idCounter = 0
const generateId = () => `stellar-input-${idCounter++}`
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputProps } from './input.types'
import { inputVariants } from './input.variants'
import { cn } from '../../utils'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  required: false,
  readonly: false,
  error: false,
})

const model = defineModel<string | number>()

const generatedId = generateId()
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
  />
</template>
