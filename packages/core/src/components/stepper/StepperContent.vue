<script setup lang="ts">
import type { StepperContentProps } from './stepper.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'
import { STEPPER_INJECTION_KEY } from './stepper-context'

const props = defineProps<StepperContentProps>()

const context = inject(STEPPER_INJECTION_KEY)

if (!context) {
  throw new Error('StepperContent must be used within a Stepper component')
}

const isActive = computed(() => context.isActive(props.step))

const classes = computed(() => cn('mt-4', props.class))
</script>

<template>
  <Transition
    name="stepper-content"
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-1"
  >
    <div v-if="isActive" :class="classes">
      <slot />
    </div>
  </Transition>
</template>
