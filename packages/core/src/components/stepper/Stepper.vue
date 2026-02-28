<script setup lang="ts">
import type { StepperProps } from './stepper.types'
import { computed, provide } from 'vue'
import { useSteps } from '../../composables/useSteps'
import { cn } from '../../utils'
import { STEPPER_INJECTION_KEY } from './stepper-context'

const props = withDefaults(defineProps<StepperProps>(), {
  modelValue: 1,
  orientation: 'horizontal',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const { current, goTo: stepsGoTo } = useSteps({
  total: props.steps.length,
  initial: props.modelValue,
})

function goTo(step: number) {
  stepsGoTo(step)
  emit('update:modelValue', step)
}

function isCompleted(step: number): boolean {
  return step < current.value
}

function isActive(step: number): boolean {
  return step === current.value
}

const orientationRef = computed(() => props.orientation)

provide(STEPPER_INJECTION_KEY, {
  activeStep: current,
  orientation: orientationRef,
  steps: props.steps,
  goTo,
  isCompleted,
  isActive,
})

const classes = computed(() =>
  cn(
    props.orientation === 'vertical' ? 'flex flex-col' : 'flex',
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
