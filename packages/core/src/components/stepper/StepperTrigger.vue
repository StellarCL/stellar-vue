<script setup lang="ts">
import type { StepperTriggerProps } from './stepper.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'
import { STEPPER_INJECTION_KEY } from './stepper-context'

const props = defineProps<StepperTriggerProps>()

const context = inject(STEPPER_INJECTION_KEY)!

if (!context) {
  throw new Error('StepperTrigger must be used within a Stepper component')
}

const isActive = computed(() => context.isActive(props.step))
const isCompleted = computed(() => context.isCompleted(props.step))
const stepConfig = computed(() => context.steps[props.step - 1])

const circleClasses = computed(() =>
  cn(
    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-inter tracking-wide',
    isActive.value && 'border-primary bg-primary text-primary-foreground',
    isCompleted.value && 'border-primary bg-primary text-primary-foreground',
    !isActive.value && !isCompleted.value && 'border-border',
  ),
)

const triggerClasses = computed(() =>
  cn('flex flex-col items-center gap-1 cursor-pointer', props.class),
)

function handleClick() {
  context.goTo(props.step)
}
</script>

<template>
  <button type="button" :class="triggerClasses" @click="handleClick">
    <span :class="circleClasses">
      <!-- Completed: check icon -->
      <svg
        v-if="isCompleted"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <!-- Custom icon or step number -->
      <component :is="stepConfig?.icon" v-else-if="stepConfig?.icon" />
      <span v-else class="text-sm font-semibold">{{ step }}</span>
    </span>
    <span class="text-xs font-medium text-center font-inter tracking-wide">{{
      stepConfig?.title
    }}</span>
    <span
      v-if="stepConfig?.description"
      class="text-xs text-muted-foreground text-center font-inter tracking-wide"
    >
      {{ stepConfig.description }}
    </span>
  </button>
</template>
