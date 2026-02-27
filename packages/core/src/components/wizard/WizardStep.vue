<script setup lang="ts">
import { inject, computed, onMounted } from 'vue'
import { WIZARD_INJECTION_KEY } from './wizard-context'
import type { WizardStepProps } from './wizard.types'
import { cn } from '../../utils'

const props = defineProps<WizardStepProps>()

const context = inject(WIZARD_INJECTION_KEY)

if (!context) {
  throw new Error('WizardStep must be used within a Wizard component')
}

// Register this step's validate function with the parent Wizard
onMounted(() => {
  context.registerStep(props.step, props.validate)
})

const isActive = computed(() => context.current.value === props.step)

const classes = computed(() => cn('w-full', props.class))
</script>

<template>
  <div v-if="isActive" :class="classes" :data-step="step">
    <slot />
  </div>
</template>
