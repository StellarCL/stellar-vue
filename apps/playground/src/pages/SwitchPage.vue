<script setup lang="ts">
import { ref } from 'vue'
import { Switch, Label } from '@stellar-vue-ui/core'
import PageHeader from '../components/PageHeader.vue'
import DemoSection from '../components/DemoSection.vue'

const airplane = ref(false)
const wifi = ref(true)
const bluetooth = ref(false)

const sizes = ['sm', 'md', 'lg'] as const
const sizeChecked = ref({ sm: false, md: true, lg: false })
</script>

<template>
  <div>
    <PageHeader
      title="Switch"
      description="A control that allows the user to toggle between checked and not checked states."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic -->
      <DemoSection title="Basic Switch">
        <div class="flex items-center gap-3">
          <Switch id="airplane-mode" v-model:checked="airplane" />
          <Label for="airplane-mode">Airplane Mode</Label>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">Airplane mode: {{ airplane ? 'On' : 'Off' }}</p>
      </DemoSection>

      <!-- Sizes -->
      <DemoSection title="Sizes">
        <div class="space-y-3">
          <div v-for="size in sizes" :key="size" class="flex items-center gap-3">
            <Switch
              :id="`switch-${size}`"
              :size="size"
              v-model:checked="sizeChecked[size]"
            />
            <Label :for="`switch-${size}`">{{ size.toUpperCase() }}</Label>
          </div>
        </div>
      </DemoSection>

      <!-- Settings panel -->
      <DemoSection title="Settings Panel" description="Common use case: a list of toggle settings.">
        <div class="max-w-sm space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">Wi-Fi</p>
              <p class="text-xs text-muted-foreground">Connect to wireless networks</p>
            </div>
            <Switch v-model:checked="wifi" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium">Bluetooth</p>
              <p class="text-xs text-muted-foreground">Connect to Bluetooth devices</p>
            </div>
            <Switch v-model:checked="bluetooth" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium opacity-50">Location Services</p>
              <p class="text-xs text-muted-foreground">Disabled by administrator</p>
            </div>
            <Switch :disabled="true" />
          </div>
        </div>
      </DemoSection>

      <!-- Disabled states -->
      <DemoSection title="Disabled States">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <Switch :disabled="true" />
            <Label class="opacity-50">Disabled unchecked</Label>
          </div>
          <div class="flex items-center gap-3">
            <Switch :disabled="true" :default-checked="true" />
            <Label class="opacity-50">Disabled checked</Label>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
