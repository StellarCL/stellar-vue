<script setup lang="ts">
import { inject, computed } from 'vue'
import { STEPPER_INJECTION_KEY } from './stepper-context'
import type { StepperSeparatorProps } from './stepper.types'
import { cn } from '../../utils'

const props = defineProps<StepperSeparatorProps>()

const context = inject(STEPPER_INJECTION_KEY)

if (!context) {
  throw new Error('StepperSeparator must be used within a Stepper component')
}

const isCompleted = computed(() => context.isCompleted(props.step))
const isVertical = computed(() => context.orientation.value === 'vertical')

const classes = computed(() =>
  cn(
    isVertical.value
      ? 'w-0.5 min-h-[2rem] bg-muted-foreground/25'
      : 'flex-1 h-0.5 bg-muted-foreground/25',
    isCompleted.value && 'bg-primary',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" role="separator" aria-hidden="true" />
</template>
