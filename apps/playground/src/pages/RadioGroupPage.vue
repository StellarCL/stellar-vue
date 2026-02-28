<script setup lang="ts">
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem, Label } from '@stellar-vue-ui/core'
import PageHeader from '../components/PageHeader.vue'
import DemoSection from '../components/DemoSection.vue'

const plan = ref('comfortable')
const notify = ref('all')
</script>

<template>
  <div>
    <PageHeader
      title="Radio Group"
      description="A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic -->
      <DemoSection title="Basic Radio Group">
        <RadioGroup v-model="plan" class="space-y-2">
          <div class="flex items-center gap-2">
            <RadioGroupItem id="default-radio" value="default" />
            <Label for="default-radio">Default</Label>
          </div>
          <div class="flex items-center gap-2">
            <RadioGroupItem id="comfortable-radio" value="comfortable" />
            <Label for="comfortable-radio">Comfortable</Label>
          </div>
          <div class="flex items-center gap-2">
            <RadioGroupItem id="compact-radio" value="compact" />
            <Label for="compact-radio">Compact</Label>
          </div>
        </RadioGroup>
        <p class="mt-2 text-xs text-muted-foreground">Selected: {{ plan }}</p>
      </DemoSection>

      <!-- With descriptions -->
      <DemoSection title="Notification Preferences">
        <RadioGroup v-model="notify" class="grid grid-cols-3 gap-4 max-w-lg">
          <div>
            <RadioGroupItem id="notify-all" value="all" class="peer sr-only" />
            <Label
              for="notify-all"
              class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
            >
              <span class="text-2xl mb-1">🔔</span>
              <span class="font-medium">All</span>
              <span class="text-xs text-muted-foreground text-center mt-1">Everything</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem id="notify-mentions" value="mentions" class="peer sr-only" />
            <Label
              for="notify-mentions"
              class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
            >
              <span class="text-2xl mb-1">💬</span>
              <span class="font-medium">Mentions</span>
              <span class="text-xs text-muted-foreground text-center mt-1">@mentions only</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem id="notify-none" value="none" class="peer sr-only" />
            <Label
              for="notify-none"
              class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary"
            >
              <span class="text-2xl mb-1">🔕</span>
              <span class="font-medium">None</span>
              <span class="text-xs text-muted-foreground text-center mt-1">No alerts</span>
            </Label>
          </div>
        </RadioGroup>
      </DemoSection>

      <!-- Disabled -->
      <DemoSection title="Disabled States">
        <RadioGroup default-value="option-one" class="space-y-2">
          <div class="flex items-center gap-2">
            <RadioGroupItem id="opt-one" value="option-one" />
            <Label for="opt-one">Option One</Label>
          </div>
          <div class="flex items-center gap-2">
            <RadioGroupItem id="opt-two" value="option-two" :disabled="true" />
            <Label for="opt-two" class="opacity-50">Option Two (disabled)</Label>
          </div>
          <div class="flex items-center gap-2">
            <RadioGroupItem id="opt-three" value="option-three" />
            <Label for="opt-three">Option Three</Label>
          </div>
        </RadioGroup>
      </DemoSection>
    </div>
  </div>
</template>
