<script setup lang="ts">
import { Stepper, StepperItem, StepperSeparator, StepperTrigger } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const currentStep = ref(1)

const steps = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Set up your profile' },
  { title: 'Complete', description: 'Review and finish' },
]
</script>
<template>
  <Stepper v-model="currentStep" :steps="steps" class="w-full max-w-md">
    <StepperItem v-for="(step, index) in steps" :key="index" :step="index + 1">
      <StepperTrigger :step="index + 1" />
      <StepperSeparator v-if="index < steps.length - 1" :step="index + 1" />
    </StepperItem>
  </Stepper>
</template>
