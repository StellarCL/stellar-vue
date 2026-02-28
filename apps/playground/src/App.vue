<script setup lang="ts">
import { ChevronDown, Moon, Sun } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Theme management
const themes = ['stellar', 'sirius', 'polaris', 'antares', 'vega', 'aldebaran'] as const
type ThemeName = typeof themes[number]

const currentTheme = ref<ThemeName>('stellar')
const isDark = ref(false)
const themeDropdownOpen = ref(false)

function setTheme(name: ThemeName) {
  currentTheme.value = name
  document.documentElement.setAttribute('data-theme', name)
  localStorage.setItem('stellar-playground-theme', name)
  themeDropdownOpen.value = false
}

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('stellar-playground-dark', String(isDark.value))
}

onMounted(() => {
  const savedTheme = localStorage.getItem('stellar-playground-theme') as ThemeName | null
  if (savedTheme && themes.includes(savedTheme)) {
    currentTheme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
  else {
    document.documentElement.setAttribute('data-theme', 'stellar')
  }

  const savedDark = localStorage.getItem('stellar-playground-dark')
  if (savedDark !== null) {
    isDark.value = savedDark === 'true'
  }
  else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  document.documentElement.classList.toggle('dark', isDark.value)
})

// Navigation structure
const navGroups = [
  {
    label: 'Overview',
    items: [
      { label: 'Theme Preview', path: '/themes' },
    ],
  },
  {
    label: 'Tier 1 — Core',
    items: [
      { label: 'Button', path: '/button' },
      { label: 'Input', path: '/input' },
      { label: 'Label', path: '/label' },
      { label: 'Card', path: '/card' },
      { label: 'Dialog', path: '/dialog' },
      { label: 'Dropdown Menu', path: '/dropdown-menu' },
      { label: 'Select', path: '/select' },
      { label: 'Checkbox', path: '/checkbox' },
      { label: 'Radio Group', path: '/radio-group' },
      { label: 'Switch', path: '/switch' },
      { label: 'Textarea', path: '/textarea' },
      { label: 'Alert', path: '/alert' },
      { label: 'Badge', path: '/badge' },
      { label: 'Separator', path: '/separator' },
      { label: 'Skeleton', path: '/skeleton' },
    ],
  },
]

const themeLabels: Record<ThemeName, string> = {
  stellar: 'Stellar',
  sirius: 'Sirius',
  polaris: 'Polaris',
  antares: 'Antares',
  vega: 'Vega',
  aldebaran: 'Aldebaran',
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background text-foreground">
    <!-- Sidebar -->
    <aside class="w-60 shrink-0 border-r border-border bg-card flex flex-col overflow-y-auto">
      <div class="px-4 py-5 border-b border-border">
        <span class="text-lg font-semibold tracking-tight text-foreground">Stellar UI</span>
        <span class="ml-2 text-xs font-medium text-muted-foreground">Playground</span>
      </div>
      <nav class="flex-1 px-2 py-4 space-y-6">
        <div v-for="group in navGroups" :key="group.label">
          <p class="px-3 mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {{ group.label }}
          </p>
          <ul class="space-y-0.5">
            <li v-for="item in group.items" :key="item.path">
              <RouterLink
                :to="item.path"
                class="flex items-center px-3 py-1.5 rounded-md text-sm transition-colors text-foreground/70 hover:text-foreground hover:bg-accent"
                active-class="bg-primary/10 text-primary font-medium"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Main area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="h-14 shrink-0 border-b border-border bg-card flex items-center justify-between px-6">
        <h1 class="text-sm font-medium text-muted-foreground">
          Component Playground
        </h1>
        <div class="flex items-center gap-3">
          <!-- Theme Switcher -->
          <div class="relative">
            <button
              class="flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              @click="themeDropdownOpen = !themeDropdownOpen"
            >
              <span class="w-2 h-2 rounded-full bg-primary inline-block" />
              {{ themeLabels[currentTheme] }}
              <ChevronDown class="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            <!-- Dropdown -->
            <div
              v-if="themeDropdownOpen"
              class="absolute right-0 top-full mt-1 w-40 rounded-md border border-border bg-popover shadow-lg z-50 py-1"
            >
              <button
                v-for="theme in themes"
                :key="theme"
                class="flex w-full items-center gap-2 px-3 py-1.5 text-sm hover:bg-accent transition-colors"
                :class="{ 'text-primary font-medium': currentTheme === theme }"
                @click="setTheme(theme)"
              >
                <span
                  class="w-2 h-2 rounded-full inline-block shrink-0"
                  :class="{
                    'bg-violet-500': theme === 'stellar',
                    'bg-sky-500': theme === 'sirius',
                    'bg-cyan-500': theme === 'polaris',
                    'bg-orange-500': theme === 'antares',
                    'bg-emerald-500': theme === 'vega',
                    'bg-amber-400': theme === 'aldebaran',
                  }"
                />
                {{ themeLabels[theme] }}
              </button>
            </div>
          </div>

          <!-- Dark mode toggle -->
          <button
            class="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background transition-colors hover:bg-accent hover:text-accent-foreground"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleDark"
          >
            <Sun v-if="isDark" class="h-4 w-4" />
            <Moon v-else class="h-4 w-4" />
          </button>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>

    <!-- Overlay for closing theme dropdown -->
    <div
      v-if="themeDropdownOpen"
      class="fixed inset-0 z-40"
      @click="themeDropdownOpen = false"
    />
  </div>
</template>
