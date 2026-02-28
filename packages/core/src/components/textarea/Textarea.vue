<script setup lang="ts">
import type { TextareaProps } from './textarea.types'
import { computed } from 'vue'
import { cn } from '../../utils'
import { textareaVariants } from './textarea.variants'

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false,
  required: false,
  readonly: false,
  error: false,
  rows: 3,
})

const model = defineModel<string>()

const generatedId = `stellar-textarea-${Math.random().toString(36).slice(2, 9)}`
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
