<script setup lang="ts">
import { ref } from 'vue'
import { Textarea, Label, Button } from '@stellar-vue-ui/core'
import PageHeader from '../components/PageHeader.vue'
import DemoSection from '../components/DemoSection.vue'

const message = ref('')
const MAX_CHARS = 160
</script>

<template>
  <div>
    <PageHeader
      title="Textarea"
      description="A multi-line plain-text editing control, used when users need to enter a substantial amount of text."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic -->
      <DemoSection title="Default">
        <div class="max-w-sm space-y-1.5">
          <Label for="message">Message</Label>
          <Textarea id="message" placeholder="Type your message here..." />
        </div>
      </DemoSection>

      <!-- With character count -->
      <DemoSection title="With Character Count">
        <div class="max-w-sm space-y-1.5">
          <Label for="bio">Bio</Label>
          <Textarea
            id="bio"
            v-model="message"
            :maxlength="MAX_CHARS"
            placeholder="Tell us about yourself..."
          />
          <p class="text-xs text-muted-foreground text-right">
            {{ message.length }}/{{ MAX_CHARS }}
          </p>
        </div>
      </DemoSection>

      <!-- States -->
      <DemoSection title="States">
        <div class="space-y-4 max-w-sm">
          <div class="space-y-1.5">
            <Label>Normal</Label>
            <Textarea placeholder="Normal textarea..." />
          </div>
          <div class="space-y-1.5">
            <Label>With value</Label>
            <Textarea model-value="This textarea has some pre-filled content that shows how it looks when populated." />
          </div>
          <div class="space-y-1.5">
            <Label>Error</Label>
            <Textarea :error="true" placeholder="Error state textarea..." />
            <p class="text-xs text-destructive">This field has an error.</p>
          </div>
          <div class="space-y-1.5">
            <Label class="opacity-50">Disabled</Label>
            <Textarea placeholder="Disabled textarea..." :disabled="true" />
          </div>
        </div>
      </DemoSection>

      <!-- Row sizes -->
      <DemoSection title="Row Sizes">
        <div class="space-y-4 max-w-sm">
          <div class="space-y-1.5">
            <Label>3 rows (default)</Label>
            <Textarea :rows="3" placeholder="3-row textarea..." />
          </div>
          <div class="space-y-1.5">
            <Label>6 rows</Label>
            <Textarea :rows="6" placeholder="6-row textarea..." />
          </div>
          <div class="space-y-1.5">
            <Label>No resize (CSS override)</Label>
            <Textarea class="resize-none" :rows="4" placeholder="Fixed height, no resize handle..." />
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
