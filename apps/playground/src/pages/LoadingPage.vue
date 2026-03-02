<script setup lang="ts">
import {
  Loading,
  LoadingBar,
  LoadingDots,
  LoadingOverlay,
  LoadingSpinner,
} from '@stellar-vue-ui/core'
import { ref, watch } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const progress = ref(45)
const showOverlay = ref(false)

watch(showOverlay, (val) => {
  if (val) {
    setTimeout(() => {
      showOverlay.value = false
    }, 2000)
  }
})
</script>

<template>
  <div>
    <PageHeader
      title="Loading"
      description="Visual indicators to communicate that content is being loaded or processed."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- All Variants -->
      <DemoSection
        title="Variants"
        description="Loading supports spinner, dots, bar, and skeleton variants."
      >
        <div class="flex flex-wrap items-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <Loading variant="spinner" />
            <span class="text-xs text-muted-foreground">Spinner</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Loading variant="dots" />
            <span class="text-xs text-muted-foreground">Dots</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="relative h-1 w-32 overflow-hidden rounded">
              <Loading variant="bar" class="!static !z-auto" />
            </div>
            <span class="text-xs text-muted-foreground">Bar</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Loading variant="skeleton" />
            <span class="text-xs text-muted-foreground">Skeleton</span>
          </div>
        </div>
      </DemoSection>

      <!-- Sizes -->
      <DemoSection title="Sizes" description="All size variants for spinner and dots.">
        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-foreground mb-3">Spinner sizes</p>
            <div class="flex items-center gap-8">
              <div class="flex flex-col items-center gap-2">
                <LoadingSpinner size="sm" />
                <span class="text-xs text-muted-foreground">sm</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <LoadingSpinner size="md" />
                <span class="text-xs text-muted-foreground">md</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <LoadingSpinner size="lg" />
                <span class="text-xs text-muted-foreground">lg</span>
              </div>
            </div>
          </div>
          <div>
            <p class="text-sm font-medium text-foreground mb-3">Dot sizes</p>
            <div class="flex items-center gap-8">
              <div class="flex flex-col items-center gap-2">
                <LoadingDots size="sm" />
                <span class="text-xs text-muted-foreground">sm</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <LoadingDots size="md" />
                <span class="text-xs text-muted-foreground">md</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <LoadingDots size="lg" />
                <span class="text-xs text-muted-foreground">lg</span>
              </div>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- With Text -->
      <DemoSection title="With Text" description="Loading indicators can display a text message.">
        <div class="flex flex-wrap items-start gap-8">
          <Loading variant="spinner" text="Loading..." />
          <Loading variant="dots" text="Please wait..." />
          <Loading variant="skeleton" text="Fetching data..." />
        </div>
      </DemoSection>

      <!-- Progress Bar -->
      <DemoSection
        title="Progress Bar"
        description="Determinate progress bar with a controllable value."
      >
        <div class="space-y-4 max-w-md">
          <div class="relative h-2 overflow-hidden rounded">
            <LoadingBar :progress="progress" class="!static !z-auto !rounded" />
          </div>
          <div class="flex items-center gap-4">
            <input v-model.number="progress" type="range" min="0" max="100" class="flex-1" />
            <span class="text-sm font-medium text-foreground w-12 text-right">{{ progress }}%</span>
          </div>
        </div>
      </DemoSection>

      <!-- Indeterminate Bar -->
      <DemoSection
        title="Indeterminate Bar"
        description="A bar without a progress value animates continuously."
      >
        <div class="max-w-md">
          <div class="relative h-2 overflow-hidden rounded">
            <LoadingBar class="!static !z-auto !rounded" />
          </div>
        </div>
      </DemoSection>

      <!-- Overlay -->
      <DemoSection
        title="Overlay"
        description="Loading overlay covers a container or the entire screen."
      >
        <div class="space-y-4">
          <button
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            @click="showOverlay = true"
          >
            Show Overlay (2 seconds)
          </button>
          <div
            class="relative h-40 rounded-lg border border-border bg-muted/30 flex items-center justify-center"
          >
            <p class="text-sm text-muted-foreground">Content behind the overlay</p>
            <LoadingOverlay v-if="showOverlay">
              <Loading variant="spinner" text="Loading content..." />
            </LoadingOverlay>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
