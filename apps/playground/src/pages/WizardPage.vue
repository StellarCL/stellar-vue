<script setup lang="ts">
import { Wizard, WizardActions, WizardStep } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const wizardStep = ref(1)

const simpleStep = ref(1)

const accountName = ref('John Doe')
const accountEmail = ref('john@example.com')
const preferTheme = ref('dark')
const preferNotifications = ref(true)

function handleSubmit() {
  // eslint-disable-next-line no-alert
  alert('Wizard complete! In a real app, this would submit data to the server.')
  wizardStep.value = 1
}

function handleSimpleSubmit() {
  // eslint-disable-next-line no-alert
  alert('Simple wizard submitted!')
  simpleStep.value = 1
}
</script>

<template>
  <div>
    <PageHeader
      title="Wizard"
      description="A multi-step form wizard for guiding users through complex workflows with navigation and validation."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- 3-Step Wizard -->
      <DemoSection
        title="Account Setup Wizard"
        description="A 3-step wizard: Account Info, Preferences, and Review."
      >
        <div class="max-w-lg">
          <div class="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Step {{ wizardStep }} of 3</span>
            <span class="text-xs">&mdash;</span>
            <span class="font-medium text-foreground">
              {{ wizardStep === 1 ? 'Account Info' : wizardStep === 2 ? 'Preferences' : 'Review' }}
            </span>
          </div>
          <Wizard v-model="wizardStep" :total="3">
            <WizardStep :step="1" title="Account Info">
              <div class="space-y-4">
                <div>
                  <label class="text-sm font-medium">Full Name</label>
                  <input
                    v-model="accountName"
                    type="text"
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label class="text-sm font-medium">Email</label>
                  <input
                    v-model="accountEmail"
                    type="email"
                    class="mt-1 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </WizardStep>

            <WizardStep :step="2" title="Preferences">
              <div class="space-y-4">
                <div>
                  <label class="text-sm font-medium">Theme</label>
                  <div class="mt-2 flex gap-2">
                    <button
                      v-for="theme in ['light', 'dark', 'system']"
                      :key="theme"
                      class="px-3 py-1.5 rounded text-xs border transition-colors capitalize"
                      :class="
                        preferTheme === theme
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-input hover:bg-accent'
                      "
                      @click="preferTheme = theme"
                    >
                      {{ theme }}
                    </button>
                  </div>
                </div>
                <div>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input v-model="preferNotifications" type="checkbox" class="rounded" />
                    <span class="text-sm">Enable email notifications</span>
                  </label>
                </div>
              </div>
            </WizardStep>

            <WizardStep :step="3" title="Review">
              <div class="space-y-3">
                <h4 class="text-sm font-semibold">Review Your Settings</h4>
                <div class="rounded-md border border-border divide-y divide-border text-sm">
                  <div class="flex justify-between px-4 py-2">
                    <span class="text-muted-foreground">Name</span>
                    <span class="font-medium">{{ accountName }}</span>
                  </div>
                  <div class="flex justify-between px-4 py-2">
                    <span class="text-muted-foreground">Email</span>
                    <span class="font-medium">{{ accountEmail }}</span>
                  </div>
                  <div class="flex justify-between px-4 py-2">
                    <span class="text-muted-foreground">Theme</span>
                    <span class="font-medium capitalize">{{ preferTheme }}</span>
                  </div>
                  <div class="flex justify-between px-4 py-2">
                    <span class="text-muted-foreground">Notifications</span>
                    <span class="font-medium">{{
                      preferNotifications ? 'Enabled' : 'Disabled'
                    }}</span>
                  </div>
                </div>
              </div>
            </WizardStep>

            <WizardActions
              previous-label="Back"
              next-label="Continue"
              submit-label="Create Account"
              @submit="handleSubmit"
            />
          </Wizard>
        </div>
      </DemoSection>

      <!-- Simple Wizard -->
      <DemoSection title="Simple Wizard" description="A minimal 2-step wizard with default labels.">
        <div class="max-w-md">
          <Wizard v-model="simpleStep" :total="2">
            <WizardStep :step="1" title="Step One">
              <p class="text-sm text-muted-foreground">
                This is the first step. Fill in the required information and click Next to proceed.
              </p>
            </WizardStep>

            <WizardStep :step="2" title="Step Two">
              <p class="text-sm text-muted-foreground">
                This is the second and final step. Review your information and click Submit.
              </p>
            </WizardStep>

            <WizardActions @submit="handleSimpleSubmit" />
          </Wizard>
        </div>
      </DemoSection>

      <!-- Step Indicator -->
      <DemoSection
        title="Step Indicator"
        description="Use the modelValue to show step progress outside the wizard."
      >
        <div class="max-w-md space-y-4">
          <div class="flex gap-1">
            <div
              v-for="s in 3"
              :key="s"
              class="h-1.5 flex-1 rounded-full transition-colors"
              :class="s <= wizardStep ? 'bg-primary' : 'bg-muted'"
            />
          </div>
          <p class="text-sm text-muted-foreground">
            The progress bar above reflects the current step of the Account Setup wizard (step
            {{ wizardStep }} of 3).
          </p>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
