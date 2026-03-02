<script setup lang="ts">
import { Checkbox, Label } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const checked = ref<boolean | 'indeterminate'>(false)
const agreed = ref(false)
const selectedItems = ref<string[]>([])

const items = [
  { id: 'recents', label: 'Recents' },
  { id: 'home', label: 'Home' },
  { id: 'applications', label: 'Applications' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'documents', label: 'Documents' },
]
</script>

<template>
  <div>
    <PageHeader
      title="Checkbox"
      description="A control that allows the user to toggle between checked and not checked."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic -->
      <DemoSection title="Basic Checkbox">
        <div class="flex items-center gap-2">
          <Checkbox id="basic-checkbox" v-model="checked" />
          <Label for="basic-checkbox">Accept terms and conditions</Label>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">State: {{ checked }}</p>
      </DemoSection>

      <!-- States -->
      <DemoSection title="States">
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <Checkbox id="cb-unchecked" />
            <Label for="cb-unchecked">Unchecked</Label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="cb-checked" :model-value="true" />
            <Label for="cb-checked">Checked (default)</Label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="cb-indeterminate" :model-value="'indeterminate'" />
            <Label for="cb-indeterminate">Indeterminate</Label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="cb-disabled" :disabled="true" />
            <Label for="cb-disabled" class="opacity-50">Disabled unchecked</Label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="cb-disabled-checked" :disabled="true" :model-value="true" />
            <Label for="cb-disabled-checked" class="opacity-50">Disabled checked</Label>
          </div>
        </div>
      </DemoSection>

      <!-- Multi-select list -->
      <DemoSection title="Multi-select List" description="Select multiple items from a list.">
        <div class="space-y-2">
          <div v-for="item in items" :key="item.id" class="flex items-center gap-2">
            <Checkbox
              :id="item.id"
              :model-value="selectedItems.includes(item.id)"
              @update:model-value="
                (val: boolean | 'indeterminate') => {
                  if (val === true) selectedItems.push(item.id)
                  else selectedItems = selectedItems.filter((i) => i !== item.id)
                }
              "
            />
            <Label :for="item.id">{{ item.label }}</Label>
          </div>
        </div>
        <p class="mt-3 text-xs text-muted-foreground">
          Selected: {{ selectedItems.length ? selectedItems.join(', ') : 'none' }}
        </p>
      </DemoSection>
    </div>
  </div>
</template>
