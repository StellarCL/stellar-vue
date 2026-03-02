<script setup lang="ts">
import { Label, Slider } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const basicValue = ref([50])
const rangeValue = ref([25, 75])
const stepValue = ref([50])
const volumeValue = ref([80])
const temperatureValue = ref([22])
const priceRange = ref([200, 800])
</script>

<template>
  <div>
    <PageHeader
      title="Slider"
      description="An input where the user selects a value from within a given range."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic slider -->
      <DemoSection title="Basic Slider" description="A simple slider with a single thumb.">
        <div class="max-w-md space-y-4">
          <Slider v-model="basicValue" :max="100" :step="1" />
          <p class="text-sm text-muted-foreground">
            Value:
            <code class="bg-muted px-1.5 py-0.5 rounded text-foreground">{{ basicValue[0] }}</code>
          </p>
        </div>
      </DemoSection>

      <!-- Range slider -->
      <DemoSection title="Range Slider" description="A slider with two thumbs to define a range.">
        <div class="max-w-md space-y-4">
          <Slider v-model="rangeValue" :max="100" :step="1" />
          <p class="text-sm text-muted-foreground">
            Range:
            <code class="bg-muted px-1.5 py-0.5 rounded text-foreground">{{ rangeValue[0] }}</code>
            &ndash;
            <code class="bg-muted px-1.5 py-0.5 rounded text-foreground">{{ rangeValue[1] }}</code>
          </p>
        </div>
      </DemoSection>

      <!-- Custom step -->
      <DemoSection title="Custom Step" description="Slider with different step increments.">
        <div class="max-w-md space-y-6">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <Label>Step: 10</Label>
              <span class="text-sm text-muted-foreground">{{ stepValue[0] }}</span>
            </div>
            <Slider v-model="stepValue" :max="100" :step="10" />
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <Label>Step: 25</Label>
              <span class="text-sm text-muted-foreground">{{
                [0, 25, 50, 75, 100].includes(stepValue[0]) ? stepValue[0] : '—'
              }}</span>
            </div>
            <Slider :model-value="[50]" :max="100" :step="25" />
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <Label>Step: 0.1 (min: 0, max: 1)</Label>
            </div>
            <Slider :model-value="[0.5]" :max="1" :min="0" :step="0.1" />
          </div>
        </div>
      </DemoSection>

      <!-- Min/max range -->
      <DemoSection
        title="Custom Min and Max"
        description="Slider bounds can be customized for different scales."
      >
        <div class="max-w-md space-y-6">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <Label>Temperature (0-40 C)</Label>
              <span class="text-sm font-medium text-foreground">{{ temperatureValue[0] }}°C</span>
            </div>
            <Slider v-model="temperatureValue" :min="0" :max="40" :step="1" />
          </div>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <Label>Price range ($0 - $1000)</Label>
              <span class="text-sm font-medium text-foreground"
                >${{ priceRange[0] }} - ${{ priceRange[1] }}</span
              >
            </div>
            <Slider v-model="priceRange" :min="0" :max="1000" :step="50" />
          </div>
        </div>
      </DemoSection>

      <!-- Vertical slider -->
      <DemoSection title="Vertical Slider" description="Sliders can be oriented vertically.">
        <div class="flex items-end gap-8 h-48">
          <div class="flex flex-col items-center gap-2">
            <Slider v-model="volumeValue" :max="100" :step="1" orientation="vertical" />
            <span class="text-xs text-muted-foreground">Volume: {{ volumeValue[0] }}</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Slider :model-value="[60]" :max="100" :step="1" orientation="vertical" />
            <span class="text-xs text-muted-foreground">Bass: 60</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Slider :model-value="[40]" :max="100" :step="1" orientation="vertical" />
            <span class="text-xs text-muted-foreground">Treble: 40</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Slider :model-value="[75]" :max="100" :step="1" orientation="vertical" />
            <span class="text-xs text-muted-foreground">Mid: 75</span>
          </div>
        </div>
      </DemoSection>

      <!-- Disabled state -->
      <DemoSection title="Disabled" description="Disabled sliders prevent user interaction.">
        <div class="max-w-md space-y-4">
          <div class="space-y-2">
            <Label class="text-muted-foreground">Disabled single thumb</Label>
            <Slider :model-value="[40]" :max="100" disabled />
          </div>
          <div class="space-y-2">
            <Label class="text-muted-foreground">Disabled range</Label>
            <Slider :model-value="[20, 60]" :max="100" disabled />
          </div>
        </div>
      </DemoSection>

      <!-- Practical example -->
      <DemoSection title="Practical Example" description="A volume control with visual feedback.">
        <div class="max-w-md space-y-4">
          <div class="rounded-md border border-border p-4 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-lg">{{
                  volumeValue[0] === 0
                    ? '🔇'
                    : volumeValue[0] < 30
                      ? '🔈'
                      : volumeValue[0] < 70
                        ? '🔉'
                        : '🔊'
                }}</span>
                <div>
                  <p class="text-sm font-medium text-foreground">System Volume</p>
                  <p class="text-xs text-muted-foreground">Adjust the master volume level</p>
                </div>
              </div>
              <span class="text-sm font-mono text-foreground tabular-nums w-8 text-right">{{
                volumeValue[0]
              }}</span>
            </div>
            <Slider v-model="volumeValue" :max="100" :step="1" />
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
