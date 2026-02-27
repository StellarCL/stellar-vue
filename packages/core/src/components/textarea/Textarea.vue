<script lang="ts">
let idCounter = 0
const generateId = () => `stellar-textarea-${idCounter++}`
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { TextareaProps } from './textarea.types'
import { textareaVariants } from './textarea.variants'
import { cn } from '../../utils'

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  required: false,
  readonly: false,
  error: false,
  rows: 3,
})

const model = defineModel<string>()

const generatedId = generateId()
const textareaId = computed(() => props.id ?? generatedId)

const classes = computed(() =>
  cn(
    textareaVariants({ error: props.error }),
    props.class,
  ),
)
</script>

<template>
  <textarea
    :id="textareaId"
    v-model="model"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
    :rows="rows"
    :class="classes"
  />
</template>
