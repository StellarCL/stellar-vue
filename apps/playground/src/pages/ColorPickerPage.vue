<script setup lang="ts">
import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerPreview,
  ColorPickerSwatches,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const basicColor = ref('#3b82f6')
const alphaColor = ref('#8b5cf6')
const presetColor = ref('#ef4444')
const formatColor = ref('#22c55e')

const presetSwatches = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#22c55e',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#14b8a6',
  '#84cc16',
]
</script>

<template>
  <div>
    <PageHeader
      title="Color Picker"
      description="An interactive color selection component with a saturation/brightness area, hue slider, optional alpha, and preset swatches."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Color Picker -->
      <DemoSection title="Basic Color Picker">
        <div class="flex flex-wrap items-start gap-6">
          <ColorPicker v-model="basicColor">
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerInput />
            <ColorPickerPreview />
          </ColorPicker>
          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">Selected color:</p>
            <div class="flex items-center gap-3">
              <div
                class="h-10 w-10 rounded-md border border-border"
                :style="{ backgroundColor: basicColor }"
              />
              <code class="text-sm font-mono">{{ basicColor }}</code>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- With Alpha Slider -->
      <DemoSection
        title="With Alpha Slider"
        description="Enable the alpha channel slider for transparency control."
      >
        <div class="flex flex-wrap items-start gap-6">
          <ColorPicker v-model="alphaColor" :show-alpha="true">
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerAlphaSlider />
            <ColorPickerInput />
            <ColorPickerPreview />
          </ColorPicker>
          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">Selected color:</p>
            <div class="flex items-center gap-3">
              <div
                class="h-10 w-10 rounded-md border border-border"
                :style="{ backgroundColor: alphaColor }"
              />
              <code class="text-sm font-mono">{{ alphaColor }}</code>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- With Preset Swatches -->
      <DemoSection
        title="With Preset Swatches"
        description="Provide a set of preset colors for quick selection."
      >
        <div class="flex flex-wrap items-start gap-6">
          <ColorPicker v-model="presetColor" :presets="presetSwatches">
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerSwatches />
            <ColorPickerInput />
            <ColorPickerPreview />
          </ColorPicker>
          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">Selected color:</p>
            <div class="flex items-center gap-3">
              <div
                class="h-10 w-10 rounded-md border border-border"
                :style="{ backgroundColor: presetColor }"
              />
              <code class="text-sm font-mono">{{ presetColor }}</code>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- Minimal (Input Only) -->
      <DemoSection
        title="Minimal"
        description="A compact color picker with just the area, hue slider, and preview."
      >
        <div class="flex flex-wrap items-start gap-6">
          <ColorPicker v-model="formatColor" format="hex">
            <ColorPickerArea />
            <ColorPickerHueSlider />
            <ColorPickerPreview />
          </ColorPicker>
          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">Selected color:</p>
            <div class="flex items-center gap-3">
              <div
                class="h-10 w-10 rounded-md border border-border"
                :style="{ backgroundColor: formatColor }"
              />
              <code class="text-sm font-mono">{{ formatColor }}</code>
            </div>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
