<script setup lang="ts">
import type { WizardProps } from './wizard.types'
import { provide, ref } from 'vue'
import { useSteps } from '../../composables/useSteps'
import { cn } from '../../utils'
import { WIZARD_INJECTION_KEY } from './wizard-context'

const props = withDefaults(defineProps<WizardProps>(), {
  modelValue: 1,
  validateOnNext: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const { current, isFirst, isLast, next: stepsNext, prev: stepsPrev, goTo: stepsGoTo } = useSteps({
  total: props.total,
  initial: props.modelValue,
})

// Registry of step validation functions keyed by step number
const stepValidators = ref<Map<number, () => Promise<boolean>>>(new Map())

function registerStep(step: number, validate: (() => Promise<boolean>) | undefined) {
  if (validate) {
    stepValidators.value.set(step, validate)
  }
}

async function next() {
  if (isLast.value)
    return

  if (props.validateOnNext) {
    const validator = stepValidators.value.get(current.value)
    if (validator) {
      const valid = await validator()
      if (!valid)
        return
    }
  }

  stepsNext()
  emit('update:modelValue', current.value)
}

function prev() {
  stepsPrev()
  emit('update:modelValue', current.value)
}

function goTo(step: number) {
  stepsGoTo(step)
  emit('update:modelValue', step)
}

provide(WIZARD_INJECTION_KEY, {
  current,
  total: props.total,
  isFirst,
  isLast,
  next,
  prev,
  goTo,
  registerStep,
})
</script>

<template>
  <div :class="cn('flex flex-col gap-4', props.class)">
    <slot />
  </div>
</template>
