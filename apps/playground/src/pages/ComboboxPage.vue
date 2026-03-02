<script setup lang="ts">
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxTrigger,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const framework = ref('')
const language = ref('')

const frameworks = [
  { value: 'vue', label: 'Vue' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'next', label: 'Next.js' },
]

const frontendGroup = [
  { value: 'vue', label: 'Vue' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
]

const backendGroup = [
  { value: 'node', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
]
</script>

<template>
  <div>
    <PageHeader
      title="Combobox"
      description="An autocomplete input with a filterable dropdown list. Combines text input with a popover selection."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Combobox -->
      <DemoSection title="Basic Combobox">
        <div class="max-w-xs space-y-1.5">
          <Combobox v-model="framework">
            <div
              class="relative flex items-center rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
            >
              <ComboboxInput class="w-full px-3" placeholder="Search frameworks..." />
              <ComboboxTrigger class="absolute inset-y-0 right-0 flex items-center pr-2" />
            </div>
            <ComboboxContent>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
              <ComboboxItem v-for="item in frameworks" :key="item.value" :value="item.value">
                {{ item.label }}
              </ComboboxItem>
            </ComboboxContent>
          </Combobox>
          <p v-if="framework" class="text-xs text-muted-foreground">Selected: {{ framework }}</p>
        </div>
      </DemoSection>

      <!-- Grouped Items -->
      <DemoSection title="Grouped Items" description="Items organized into labeled groups.">
        <div class="max-w-xs space-y-1.5">
          <Combobox v-model="language">
            <div
              class="relative flex items-center rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
            >
              <ComboboxInput class="w-full px-3" placeholder="Search languages..." />
              <ComboboxTrigger class="absolute inset-y-0 right-0 flex items-center pr-2" />
            </div>
            <ComboboxContent>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
              <ComboboxGroup>
                <ComboboxLabel>Frontend</ComboboxLabel>
                <ComboboxItem v-for="item in frontendGroup" :key="item.value" :value="item.value">
                  {{ item.label }}
                </ComboboxItem>
              </ComboboxGroup>
              <ComboboxGroup>
                <ComboboxLabel>Backend</ComboboxLabel>
                <ComboboxItem v-for="item in backendGroup" :key="item.value" :value="item.value">
                  {{ item.label }}
                </ComboboxItem>
              </ComboboxGroup>
            </ComboboxContent>
          </Combobox>
          <p v-if="language" class="text-xs text-muted-foreground">Selected: {{ language }}</p>
        </div>
      </DemoSection>

      <!-- Disabled State -->
      <DemoSection title="Disabled State">
        <div class="max-w-xs">
          <Combobox :disabled="true">
            <div
              class="relative flex items-center rounded-md border border-input bg-background opacity-50 cursor-not-allowed"
            >
              <ComboboxInput class="w-full" placeholder="Disabled combobox..." />
              <ComboboxTrigger class="absolute inset-y-0 right-0 flex items-center pr-2" />
            </div>
            <ComboboxContent>
              <ComboboxItem value="a">Option A</ComboboxItem>
            </ComboboxContent>
          </Combobox>
        </div>
      </DemoSection>

      <!-- Disabled Items -->
      <DemoSection
        title="Disabled Items"
        description="Individual items can be disabled within the list."
      >
        <div class="max-w-xs">
          <Combobox>
            <div
              class="relative flex items-center rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
            >
              <ComboboxInput class="w-full" placeholder="Search..." />
              <ComboboxTrigger class="absolute inset-y-0 right-0 flex items-center pr-2" />
            </div>
            <ComboboxContent>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
              <ComboboxItem value="available">Available</ComboboxItem>
              <ComboboxItem value="also-available">Also Available</ComboboxItem>
              <ComboboxItem value="unavailable" :disabled="true"
                >Unavailable (disabled)</ComboboxItem
              >
              <ComboboxItem value="another">Another Option</ComboboxItem>
            </ComboboxContent>
          </Combobox>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
