<script setup lang="ts">
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectEmpty,
  MultiSelectItem,
  MultiSelectTag,
  MultiSelectTrigger,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const selectedFruits = ref<string[]>([])
const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Peach', value: 'peach' },
  { label: 'Strawberry', value: 'strawberry' },
]

const selectedColors = ref<string[]>([])
const colorOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Purple', value: 'purple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pink', value: 'pink' },
  { label: 'Teal', value: 'teal' },
]

const selectedLimited = ref<string[]>([])
const selectedDisabled = ref<string[]>(['apple', 'cherry'])
</script>

<template>
  <div>
    <PageHeader
      title="Multi Select"
      description="A select component that allows multiple items to be chosen from a dropdown list."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Multi-Select -->
      <DemoSection
        title="Basic Multi-Select"
        description="Select multiple fruits from the dropdown."
      >
        <div class="space-y-3 max-w-sm">
          <MultiSelect
            v-model="selectedFruits"
            :options="fruitOptions"
            placeholder="Select fruits..."
          >
            <MultiSelectTrigger />
            <MultiSelectContent>
              <MultiSelectEmpty>No fruits found.</MultiSelectEmpty>
              <MultiSelectItem
                v-for="option in fruitOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </MultiSelectContent>
          </MultiSelect>
          <p v-if="selectedFruits.length" class="text-sm text-muted-foreground">
            Selected: {{ selectedFruits.join(', ') }}
          </p>
        </div>
      </DemoSection>

      <!-- Color Options -->
      <DemoSection
        title="Color Selection"
        description="Another multi-select example with color options."
      >
        <div class="space-y-3 max-w-sm">
          <MultiSelect
            v-model="selectedColors"
            :options="colorOptions"
            placeholder="Pick colors..."
          >
            <MultiSelectTrigger>
              <MultiSelectTag
                v-for="color in selectedColors"
                :key="color"
                :value="color"
                :label="colorOptions.find((o) => o.value === color)?.label ?? color"
              />
              <span v-if="!selectedColors.length" class="text-muted-foreground text-sm"
                >Pick colors...</span
              >
            </MultiSelectTrigger>
            <MultiSelectContent>
              <MultiSelectEmpty>No colors found.</MultiSelectEmpty>
              <MultiSelectItem
                v-for="option in colorOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </MultiSelectContent>
          </MultiSelect>
          <p v-if="selectedColors.length" class="text-sm text-muted-foreground">
            Selected: {{ selectedColors.join(', ') }}
          </p>
        </div>
      </DemoSection>

      <!-- Max Selection Limit -->
      <DemoSection
        title="Max Selection (3)"
        description="Limit the number of selectable items using the max prop."
      >
        <div class="space-y-3 max-w-sm">
          <MultiSelect
            v-model="selectedLimited"
            :options="fruitOptions"
            :max="3"
            placeholder="Select up to 3 fruits..."
          >
            <MultiSelectTrigger />
            <MultiSelectContent>
              <MultiSelectEmpty>No fruits found.</MultiSelectEmpty>
              <MultiSelectItem
                v-for="option in fruitOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </MultiSelectContent>
          </MultiSelect>
          <p class="text-sm text-muted-foreground">{{ selectedLimited.length }} / 3 selected</p>
        </div>
      </DemoSection>

      <!-- Disabled State -->
      <DemoSection
        title="Disabled"
        description="A disabled multi-select cannot be interacted with."
      >
        <div class="max-w-sm">
          <MultiSelect
            v-model="selectedDisabled"
            :options="fruitOptions"
            disabled
            placeholder="Disabled select..."
          >
            <MultiSelectTrigger />
            <MultiSelectContent>
              <MultiSelectItem
                v-for="option in fruitOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </MultiSelectContent>
          </MultiSelect>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
