<script setup lang="ts">
import { ref } from 'vue'
import { Input, Label } from '@stellar-vue-ui/core'
import PageHeader from '../components/PageHeader.vue'
import DemoSection from '../components/DemoSection.vue'

const value = ref('')
const errorValue = ref('')
</script>

<template>
  <div>
    <PageHeader
      title="Input"
      description="Accepts text input from the user. Supports various types and states."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Default -->
      <DemoSection title="Default">
        <div class="max-w-sm space-y-2">
          <Label for="default-input">Email address</Label>
          <Input
            id="default-input"
            v-model="value"
            type="email"
            placeholder="you@example.com"
          />
          <p v-if="value" class="text-xs text-muted-foreground">Value: {{ value }}</p>
        </div>
      </DemoSection>

      <!-- Input Types -->
      <DemoSection title="Input Types" description="Standard HTML input types.">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div class="space-y-1.5">
            <Label>Text</Label>
            <Input type="text" placeholder="Enter text..." />
          </div>
          <div class="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="email@example.com" />
          </div>
          <div class="space-y-1.5">
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div class="space-y-1.5">
            <Label>Number</Label>
            <Input type="number" placeholder="0" />
          </div>
          <div class="space-y-1.5">
            <Label>Search</Label>
            <Input type="search" placeholder="Search..." />
          </div>
          <div class="space-y-1.5">
            <Label>URL</Label>
            <Input type="url" placeholder="https://example.com" />
          </div>
        </div>
      </DemoSection>

      <!-- States -->
      <DemoSection title="States">
        <div class="max-w-sm space-y-4">
          <div class="space-y-1.5">
            <Label>Normal</Label>
            <Input placeholder="Normal input" />
          </div>
          <div class="space-y-1.5">
            <Label>With value</Label>
            <Input model-value="Filled value" />
          </div>
          <div class="space-y-1.5">
            <Label>Disabled</Label>
            <Input placeholder="Disabled input" :disabled="true" />
          </div>
          <div class="space-y-1.5">
            <Label>Error state</Label>
            <Input
              v-model="errorValue"
              :error="true"
              placeholder="Invalid value"
            />
            <p class="text-xs text-destructive">This field is required.</p>
          </div>
          <div class="space-y-1.5">
            <Label>Read only</Label>
            <Input model-value="Read only value" :readonly="true" />
          </div>
        </div>
      </DemoSection>

      <!-- File input -->
      <DemoSection title="File Input">
        <div class="max-w-sm space-y-1.5">
          <Label>Upload file</Label>
          <Input type="file" />
        </div>
      </DemoSection>
    </div>
  </div>
</template>
