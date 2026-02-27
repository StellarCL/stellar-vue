<script setup lang="ts">
import { inject, computed } from 'vue'
import { STEPPER_INJECTION_KEY } from './stepper-context'
import type { StepperItemProps } from './stepper.types'
import { cn } from '../../utils'

const props = defineProps<StepperItemProps>()

const context = inject(STEPPER_INJECTION_KEY)

if (!context) {
  throw new Error('StepperItem must be used within a Stepper component')
}

const isLast = computed(() => props.step === context.steps.length)

const classes = computed(() =>
  cn(
    'flex items-center',
    !isLast.value && 'flex-1',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes" :data-step="step">
    <slot />
  </div>
</template>
