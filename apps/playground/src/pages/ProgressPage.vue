<script setup lang="ts">
import { Button, Progress } from '@stellar-vue-ui/core'
import { onUnmounted, ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const variants = ['default', 'success', 'warning', 'destructive'] as const
const selectedVariant = ref<'default' | 'success' | 'warning' | 'destructive'>('default')
const interactiveValue = ref(45)

const animatedValue = ref(0)
let animationInterval: ReturnType<typeof setInterval> | null = null

function startAnimation() {
  stopAnimation()
  animatedValue.value = 0
  animationInterval = setInterval(() => {
    animatedValue.value += 2
    if (animatedValue.value >= 100) {
      animatedValue.value = 100
      stopAnimation()
    }
  }, 80)
}

function stopAnimation() {
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
}

function resetAnimation() {
  stopAnimation()
  animatedValue.value = 0
}

onUnmounted(() => {
  stopAnimation()
})

const downloadProgress = ref(0)
let downloadInterval: ReturnType<typeof setInterval> | null = null
const isDownloading = ref(false)

function simulateDownload() {
  if (downloadInterval) {
    clearInterval(downloadInterval)
  }
  downloadProgress.value = 0
  isDownloading.value = true
  downloadInterval = setInterval(() => {
    const increment = Math.random() * 8 + 1
    downloadProgress.value = Math.min(100, downloadProgress.value + increment)
    if (downloadProgress.value >= 100) {
      downloadProgress.value = 100
      isDownloading.value = false
      clearInterval(downloadInterval!)
      downloadInterval = null
    }
  }, 200)
}

onUnmounted(() => {
  if (downloadInterval) clearInterval(downloadInterval)
})
</script>

<template>
  <div>
    <PageHeader
      title="Progress"
      description="Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Interactive demo -->
      <DemoSection
        title="Interactive Demo"
        description="Adjust the value and variant using the controls."
      >
        <div class="flex flex-col gap-6">
          <div class="max-w-md space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Progress</span>
              <span class="font-medium text-foreground">{{ interactiveValue }}%</span>
            </div>
            <Progress :model-value="interactiveValue" :variant="selectedVariant" />
          </div>
          <div class="grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
            <div>
              <p class="font-medium mb-2 text-muted-foreground">Value</p>
              <input
                v-model.number="interactiveValue"
                type="range"
                min="0"
                max="100"
                class="w-full"
              />
            </div>
            <div>
              <p class="font-medium mb-2 text-muted-foreground">Variant</p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="v in variants"
                  :key="v"
                  class="px-2 py-1 rounded text-xs border transition-colors"
                  :class="
                    selectedVariant === v
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-input hover:bg-accent'
                  "
                  @click="selectedVariant = v"
                >
                  {{ v }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- All variants -->
      <DemoSection
        title="Variants"
        description="Progress bars are available in four visual styles."
      >
        <div class="max-w-md space-y-4">
          <div v-for="v in variants" :key="v" class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground capitalize">{{ v }}</span>
              <span class="text-xs text-muted-foreground">65%</span>
            </div>
            <Progress :model-value="65" :variant="v" />
          </div>
        </div>
      </DemoSection>

      <!-- Different values -->
      <DemoSection
        title="Different Values"
        description="Progress bars at various completion levels."
      >
        <div class="max-w-md space-y-4">
          <div v-for="value in [0, 25, 50, 75, 100]" :key="value" class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">{{ value }}%</span>
            </div>
            <Progress :model-value="value" />
          </div>
        </div>
      </DemoSection>

      <!-- Animated progress -->
      <DemoSection
        title="Animated Progress"
        description="Smooth animated progress bar with play controls."
      >
        <div class="max-w-md space-y-4">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Loading...</span>
              <span class="font-medium text-foreground">{{ Math.round(animatedValue) }}%</span>
            </div>
            <Progress
              :model-value="animatedValue"
              :variant="animatedValue >= 100 ? 'success' : 'default'"
            />
          </div>
          <div class="flex gap-2">
            <Button size="sm" variant="outline" @click="startAnimation"> Start </Button>
            <Button size="sm" variant="outline" @click="stopAnimation"> Pause </Button>
            <Button size="sm" variant="outline" @click="resetAnimation"> Reset </Button>
          </div>
        </div>
      </DemoSection>

      <!-- Download simulation -->
      <DemoSection
        title="Download Simulation"
        description="A realistic file download progress simulation."
      >
        <div class="max-w-md space-y-4">
          <div class="rounded-md border border-border p-4 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-foreground">stellar-vue-ui-v1.0.0.tar.gz</p>
                <p class="text-xs text-muted-foreground">24.3 MB</p>
              </div>
              <Button
                size="sm"
                :variant="isDownloading ? 'secondary' : 'default'"
                :disabled="isDownloading"
                @click="simulateDownload"
              >
                {{
                  isDownloading
                    ? 'Downloading...'
                    : downloadProgress >= 100
                      ? 'Download Again'
                      : 'Download'
                }}
              </Button>
            </div>
            <div v-if="downloadProgress > 0" class="space-y-1.5">
              <Progress
                :model-value="downloadProgress"
                :variant="downloadProgress >= 100 ? 'success' : 'default'"
              />
              <p class="text-xs text-muted-foreground text-right">
                {{ downloadProgress >= 100 ? 'Complete!' : `${Math.round(downloadProgress)}%` }}
              </p>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- Custom max -->
      <DemoSection title="Custom Max" description="Progress bars can use a custom maximum value.">
        <div class="max-w-md space-y-4">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Steps completed</span>
              <span class="text-xs text-muted-foreground">3 of 5</span>
            </div>
            <Progress :model-value="3" :max="5" />
          </div>
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">XP Progress</span>
              <span class="text-xs text-muted-foreground">750 / 1000</span>
            </div>
            <Progress :model-value="750" :max="1000" variant="success" />
          </div>
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Storage used</span>
              <span class="text-xs text-muted-foreground">8.5 / 10 GB</span>
            </div>
            <Progress :model-value="85" :max="100" variant="warning" />
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
