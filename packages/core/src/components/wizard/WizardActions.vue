<script setup lang="ts">
import type { WizardActionsProps } from './wizard.types'
import { inject } from 'vue'
import { cn } from '../../utils'
import { WIZARD_INJECTION_KEY } from './wizard-context'

const props = withDefaults(defineProps<WizardActionsProps>(), {
  previousLabel: 'Previous',
  nextLabel: 'Next',
  submitLabel: 'Submit',
})

const emit = defineEmits<{
  submit: []
}>()

const context = inject(WIZARD_INJECTION_KEY)!

if (!context) {
  throw new Error('WizardActions must be used within a Wizard component')
}

async function handleNext() {
  await context.next()
}

function handlePrev() {
  context.prev()
}

function handleSubmit() {
  emit('submit')
}
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <button
      type="button"
      :disabled="context.isFirst.value"
      :class="cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
      )"
      @click="handlePrev"
    >
      {{ previousLabel }}
    </button>

    <button
      v-if="!context.isLast.value"
      type="button"
      :class="cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      )"
      @click="handleNext"
    >
      {{ nextLabel }}
    </button>

    <button
      v-if="context.isLast.value"
      type="button"
      :class="cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      )"
      @click="handleSubmit"
    >
      {{ submitLabel }}
    </button>
  </div>
</template>
