<script setup lang="ts">
import type { StepperSeparatorProps } from './stepper.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'
import { STEPPER_INJECTION_KEY } from './stepper-context'

const props = defineProps<StepperSeparatorProps>()

const context = inject(STEPPER_INJECTION_KEY)

if (!context) {
  throw new Error('StepperSeparator must be used within a Stepper component')
}

const isCompleted = computed(() => context.isCompleted(props.step))
const isVertical = computed(() => context.orientation.value === 'vertical')

const classes = computed(() =>
  cn(
    isVertical.value ? 'w-0.5 min-h-[2rem] bg-border' : 'flex-1 h-0.5 bg-border',
    isCompleted.value && 'bg-primary',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" role="separator" aria-hidden="true" />
</template>
