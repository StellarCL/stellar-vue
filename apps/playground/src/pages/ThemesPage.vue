<script setup lang="ts">
import { CheckCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'

const themes = [
  {
    name: 'stellar',
    label: 'Stellar',
    description: 'The default cosmic purple theme. Vibrant and energetic.',
    primaryHue: '285',
    color: '#7c3aed',
    swatch: 'oklch(55% 0.187 285)',
  },
  {
    name: 'sirius',
    label: 'Sirius',
    description: 'Cool sky blue theme. Professional and trustworthy.',
    primaryHue: '220',
    color: '#2563eb',
    swatch: 'oklch(50% 0.2 242)',
  },
  {
    name: 'polaris',
    label: 'Polaris',
    description: 'Serene cyan/teal theme. Clean and modern.',
    primaryHue: '195',
    color: '#0891b2',
    swatch: 'oklch(60% 0.15 200)',
  },
  {
    name: 'antares',
    label: 'Antares',
    description: 'Bold red/orange theme. Passionate and energetic.',
    primaryHue: '27',
    color: '#dc2626',
    swatch: 'oklch(55% 0.2 27)',
  },
  {
    name: 'vega',
    label: 'Vega',
    description: 'Fresh green theme. Natural and grounded.',
    primaryHue: '145',
    color: '#16a34a',
    swatch: 'oklch(52% 0.18 145)',
  },
  {
    name: 'aldebaran',
    label: 'Aldebaran',
    description: 'Warm amber/gold theme. Radiant and inviting.',
    primaryHue: '80',
    color: '#d97706',
    swatch: 'oklch(72% 0.17 80)',
  },
]

const previewDark = ref<Record<string, boolean>>({})

function togglePreviewDark(themeName: string) {
  previewDark.value[themeName] = !previewDark.value[themeName]
}
</script>

<template>
  <div>
    <PageHeader
      title="Theme Preview"
      description="All 6 Stellar Vue UI themes displayed side by side with sample components."
    />

    <div class="px-8 py-8">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="theme in themes"
          :key="theme.name"
          class="rounded-xl border border-border overflow-hidden"
        >
          <!-- Theme header -->
          <div
            class="px-4 py-3 flex items-center justify-between border-b border-border"
            :style="{ background: `${theme.swatch}20` }"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 rounded-full border-2 border-white/50 shadow-sm"
                :style="{ background: theme.swatch }"
              />
              <div>
                <p class="text-sm font-semibold">
                  {{ theme.label }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ theme.description }}
                </p>
              </div>
            </div>
            <button
              class="text-xs text-muted-foreground hover:text-foreground border border-border rounded px-2 py-1 bg-background/80 transition-colors"
              @click="togglePreviewDark(theme.name)"
            >
              {{ previewDark[theme.name] ? 'Light' : 'Dark' }}
            </button>
          </div>

          <!-- Theme preview sandbox -->
          <div
            :data-theme="theme.name"
            class="p-5 space-y-4" :class="[
              previewDark[theme.name] ? 'dark bg-[oklch(9%_0.03_285.82)]' : 'bg-background',
            ]"
          >
            <!-- Buttons row -->
            <div class="flex flex-wrap gap-2">
              <button
                class="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
                :style="{ background: theme.swatch }"
              >
                Primary
              </button>
              <button
                class="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
                :class="previewDark[theme.name]
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'"
              >
                Outline
              </button>
              <span
                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                :style="{ background: theme.swatch }"
              >
                Badge
              </span>
            </div>

            <!-- Input -->
            <div class="space-y-1">
              <label
                class="text-xs font-medium"
                :class="previewDark[theme.name] ? 'text-gray-300' : 'text-gray-700'"
              >
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                class="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors"
                :class="previewDark[theme.name]
                  ? 'border-white/20 bg-white/10 text-white placeholder:text-white/40'
                  : 'border-gray-200 bg-white text-gray-900 placeholder:text-gray-400'"
              >
            </div>

            <!-- Status badges -->
            <div class="flex flex-wrap gap-1.5">
              <span
                class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                :class="previewDark[theme.name]
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-green-100 text-green-700'"
              >
                <CheckCircle class="h-3 w-3" />
                Active
              </span>
              <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                :class="previewDark[theme.name]
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-yellow-100 text-yellow-700'"
              >
                Pending
              </span>
              <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border"
                :class="previewDark[theme.name]
                  ? 'border-white/20 text-gray-300'
                  : 'border-gray-200 text-gray-600'"
              >
                Draft
              </span>
            </div>

            <!-- Mini card -->
            <div
              class="rounded-lg border p-3 text-sm"
              :class="previewDark[theme.name]
                ? 'border-white/10 bg-white/5'
                : 'border-gray-100 bg-gray-50'"
            >
              <p
                class="font-medium"
                :class="previewDark[theme.name] ? 'text-white' : 'text-gray-900'"
              >
                Component Card
              </p>
              <p
                class="text-xs mt-0.5"
                :class="previewDark[theme.name] ? 'text-gray-400' : 'text-gray-500'"
              >
                Demonstrating {{ theme.label }} theme colors
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Theme color swatches table -->
      <div class="mt-12">
        <h2 class="text-lg font-semibold mb-4">
          Theme Color Swatches
        </h2>
        <div class="grid grid-cols-6 gap-3">
          <div
            v-for="theme in themes"
            :key="theme.name"
            class="text-center"
          >
            <div
              class="w-full aspect-square rounded-xl shadow-md border border-white/20 mb-2"
              :style="{ background: theme.swatch }"
            />
            <p class="text-xs font-medium">
              {{ theme.label }}
            </p>
            <p class="text-xs text-muted-foreground">
              hue {{ theme.primaryHue }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
