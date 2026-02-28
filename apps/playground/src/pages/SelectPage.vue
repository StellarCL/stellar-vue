<script setup lang="ts">
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const fruit = ref('')
const timezone = ref('')
</script>

<template>
  <div>
    <PageHeader
      title="Select"
      description="Displays a list of options for the user to pick from—triggered by a button."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Select -->
      <DemoSection title="Basic Select">
        <div class="space-y-1.5 max-w-xs">
          <Label>Fruit</Label>
          <Select v-model="fruit">
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">
                Apple
              </SelectItem>
              <SelectItem value="banana">
                Banana
              </SelectItem>
              <SelectItem value="cherry">
                Cherry
              </SelectItem>
              <SelectItem value="grape">
                Grape
              </SelectItem>
              <SelectItem value="mango">
                Mango
              </SelectItem>
            </SelectContent>
          </Select>
          <p v-if="fruit" class="text-xs text-muted-foreground">
            Selected: {{ fruit }}
          </p>
        </div>
      </DemoSection>

      <!-- Grouped Select -->
      <DemoSection title="Grouped Items">
        <div class="space-y-1.5 max-w-xs">
          <Label>Timezone</Label>
          <Select v-model="timezone">
            <SelectTrigger>
              <SelectValue placeholder="Select timezone..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="est">
                  Eastern Standard Time (EST)
                </SelectItem>
                <SelectItem value="cst">
                  Central Standard Time (CST)
                </SelectItem>
                <SelectItem value="mst">
                  Mountain Standard Time (MST)
                </SelectItem>
                <SelectItem value="pst">
                  Pacific Standard Time (PST)
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="gmt">
                  Greenwich Mean Time (GMT)
                </SelectItem>
                <SelectItem value="cet">
                  Central European Time (CET)
                </SelectItem>
                <SelectItem value="eet">
                  Eastern European Time (EET)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </DemoSection>

      <!-- Disabled -->
      <DemoSection title="States">
        <div class="flex flex-wrap gap-4">
          <div class="space-y-1.5 w-48">
            <Label>Disabled</Label>
            <Select :disabled="true">
              <SelectTrigger>
                <SelectValue placeholder="Disabled..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">
                  Option A
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-1.5 w-48">
            <Label>Disabled Item</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Pick an option..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">
                  Available
                </SelectItem>
                <SelectItem value="disabled" :disabled="true">
                  Unavailable
                </SelectItem>
                <SelectItem value="other">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
