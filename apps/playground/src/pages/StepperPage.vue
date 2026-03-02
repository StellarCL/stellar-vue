<script setup lang="ts">
import {
  Stepper,
  StepperContent,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const horizontalStep = ref(1)
const verticalStep = ref(1)
const interactiveStep = ref(1)

const horizontalSteps = [{ title: 'Account' }, { title: 'Profile' }, { title: 'Review' }]

const verticalSteps = [
  { title: 'Create Account', description: 'Enter your email and password' },
  { title: 'Personal Info', description: 'Tell us about yourself' },
  { title: 'Preferences', description: 'Set your preferences' },
  { title: 'Complete', description: 'Review and finish' },
]

const interactiveSteps = [
  { title: 'Shipping', description: 'Enter shipping details' },
  { title: 'Payment', description: 'Add payment method' },
  { title: 'Confirm', description: 'Review your order' },
]
</script>

<template>
  <div>
    <PageHeader
      title="Stepper"
      description="A multi-step progress indicator for guiding users through sequential tasks."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Horizontal Stepper -->
      <DemoSection title="Horizontal Stepper" description="Steps displayed in a horizontal layout.">
        <div class="max-w-xl">
          <Stepper v-model="horizontalStep" :steps="horizontalSteps" orientation="horizontal">
            <div class="flex items-center gap-4">
              <template v-for="(step, index) in horizontalSteps" :key="index">
                <StepperItem :step="index + 1">
                  <StepperTrigger :step="index + 1" />
                </StepperItem>
                <StepperSeparator
                  v-if="index < horizontalSteps.length - 1"
                  :step="index + 1"
                  class="flex-1"
                />
              </template>
            </div>
            <div class="mt-6">
              <StepperContent :step="1">
                <p class="text-sm text-muted-foreground">
                  Enter your account information to get started.
                </p>
              </StepperContent>
              <StepperContent :step="2">
                <p class="text-sm text-muted-foreground">
                  Set up your profile with a display name and avatar.
                </p>
              </StepperContent>
              <StepperContent :step="3">
                <p class="text-sm text-muted-foreground">
                  Review your information before submitting.
                </p>
              </StepperContent>
            </div>
          </Stepper>
          <div class="flex gap-2 mt-4">
            <button
              class="px-3 py-1.5 rounded text-xs border transition-colors"
              :class="
                horizontalStep <= 1
                  ? 'opacity-50 cursor-not-allowed border-input'
                  : 'bg-background border-input hover:bg-accent'
              "
              :disabled="horizontalStep <= 1"
              @click="horizontalStep--"
            >
              Previous
            </button>
            <button
              class="px-3 py-1.5 rounded text-xs border transition-colors"
              :class="
                horizontalStep >= horizontalSteps.length
                  ? 'opacity-50 cursor-not-allowed border-input'
                  : 'bg-primary text-primary-foreground border-primary'
              "
              :disabled="horizontalStep >= horizontalSteps.length"
              @click="horizontalStep++"
            >
              Next
            </button>
          </div>
        </div>
      </DemoSection>

      <!-- Vertical Stepper -->
      <DemoSection
        title="Vertical Stepper"
        description="Steps displayed in a vertical layout with descriptions."
      >
        <div class="max-w-md">
          <Stepper v-model="verticalStep" :steps="verticalSteps" orientation="vertical">
            <template v-for="(step, index) in verticalSteps" :key="index">
              <StepperItem :step="index + 1">
                <StepperTrigger :step="index + 1" />
              </StepperItem>
              <StepperContent :step="index + 1">
                <p class="text-sm text-muted-foreground">{{ step.description }}</p>
              </StepperContent>
              <StepperSeparator v-if="index < verticalSteps.length - 1" :step="index + 1" />
            </template>
          </Stepper>
          <div class="flex gap-2 mt-4">
            <button
              class="px-3 py-1.5 rounded text-xs border transition-colors"
              :class="
                verticalStep <= 1
                  ? 'opacity-50 cursor-not-allowed border-input'
                  : 'bg-background border-input hover:bg-accent'
              "
              :disabled="verticalStep <= 1"
              @click="verticalStep--"
            >
              Previous
            </button>
            <button
              class="px-3 py-1.5 rounded text-xs border transition-colors"
              :class="
                verticalStep >= verticalSteps.length
                  ? 'opacity-50 cursor-not-allowed border-input'
                  : 'bg-primary text-primary-foreground border-primary'
              "
              :disabled="verticalStep >= verticalSteps.length"
              @click="verticalStep++"
            >
              Next
            </button>
          </div>
        </div>
      </DemoSection>

      <!-- Interactive Stepper -->
      <DemoSection
        title="Interactive Step-Through"
        description="Navigate through steps with next/prev buttons and form-like content."
      >
        <div class="max-w-xl">
          <Stepper v-model="interactiveStep" :steps="interactiveSteps" orientation="horizontal">
            <div class="flex items-center gap-4">
              <template v-for="(step, index) in interactiveSteps" :key="index">
                <StepperItem :step="index + 1">
                  <StepperTrigger :step="index + 1" />
                </StepperItem>
                <StepperSeparator
                  v-if="index < interactiveSteps.length - 1"
                  :step="index + 1"
                  class="flex-1"
                />
              </template>
            </div>
            <div class="mt-6 rounded-lg border border-border p-6">
              <StepperContent :step="1">
                <h4 class="font-semibold mb-2">Shipping Details</h4>
                <div class="space-y-3">
                  <div>
                    <label class="text-xs text-muted-foreground">Full Name</label>
                    <div
                      class="mt-1 h-9 rounded border border-input bg-background px-3 flex items-center text-sm text-muted-foreground"
                    >
                      John Doe
                    </div>
                  </div>
                  <div>
                    <label class="text-xs text-muted-foreground">Address</label>
                    <div
                      class="mt-1 h-9 rounded border border-input bg-background px-3 flex items-center text-sm text-muted-foreground"
                    >
                      123 Main St
                    </div>
                  </div>
                </div>
              </StepperContent>
              <StepperContent :step="2">
                <h4 class="font-semibold mb-2">Payment Method</h4>
                <div class="space-y-3">
                  <div>
                    <label class="text-xs text-muted-foreground">Card Number</label>
                    <div
                      class="mt-1 h-9 rounded border border-input bg-background px-3 flex items-center text-sm text-muted-foreground"
                    >
                      **** **** **** 4242
                    </div>
                  </div>
                  <div>
                    <label class="text-xs text-muted-foreground">Expiry</label>
                    <div
                      class="mt-1 h-9 rounded border border-input bg-background px-3 flex items-center text-sm text-muted-foreground"
                    >
                      12/28
                    </div>
                  </div>
                </div>
              </StepperContent>
              <StepperContent :step="3">
                <h4 class="font-semibold mb-2">Order Summary</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Shipping to</span>
                    <span>John Doe, 123 Main St</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Payment</span>
                    <span>**** 4242</span>
                  </div>
                  <div class="flex justify-between border-t border-border pt-2 font-semibold">
                    <span>Total</span>
                    <span>$99.00</span>
                  </div>
                </div>
              </StepperContent>
            </div>
          </Stepper>
          <div class="flex justify-between mt-4">
            <button
              class="px-4 py-2 rounded text-sm border transition-colors"
              :class="
                interactiveStep <= 1
                  ? 'opacity-50 cursor-not-allowed border-input'
                  : 'bg-background border-input hover:bg-accent'
              "
              :disabled="interactiveStep <= 1"
              @click="interactiveStep--"
            >
              Previous
            </button>
            <button
              class="px-4 py-2 rounded text-sm border transition-colors bg-primary text-primary-foreground border-primary"
              @click="interactiveStep < interactiveSteps.length ? interactiveStep++ : null"
            >
              {{ interactiveStep >= interactiveSteps.length ? 'Place Order' : 'Next' }}
            </button>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
