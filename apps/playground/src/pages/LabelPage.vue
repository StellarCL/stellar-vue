<script setup lang="ts">
import { Checkbox, Input, Label } from '@stellar-vue-ui/core'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Label"
      description="Renders an accessible label associated with a form control."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Default -->
      <DemoSection title="Default">
        <div class="space-y-1.5 max-w-sm">
          <Label for="label-demo">Your name</Label>
          <Input id="label-demo" placeholder="John Doe" />
        </div>
      </DemoSection>

      <!-- With Checkbox -->
      <DemoSection title="With Checkbox">
        <div class="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label for="terms">Accept terms and conditions</Label>
        </div>
      </DemoSection>

      <!-- Required indicator -->
      <DemoSection title="Required Field">
        <div class="space-y-1.5 max-w-sm">
          <Label for="required-demo">
            Email address
            <span class="text-destructive ml-0.5">*</span>
          </Label>
          <Input id="required-demo" type="email" placeholder="you@example.com" required />
        </div>
      </DemoSection>

      <!-- Disabled state (label for disabled input) -->
      <DemoSection title="Disabled Input">
        <div class="space-y-1.5 max-w-sm">
          <Label for="disabled-demo" class="opacity-50">Disabled field</Label>
          <Input id="disabled-demo" placeholder="Can't type here" :disabled="true" />
        </div>
      </DemoSection>
    </div>
  </div>
</template>
