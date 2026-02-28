<script setup lang="ts">
// useTheme is auto-imported by the Stellar Nuxt module — no import statement needed.
// UIButton, UICard, UIInput, etc. are also auto-imported with the "UI" prefix.

const { theme, isDark, toggleDark, themes, setTheme } = useTheme()

// Page title
useHead({
  title: 'Stellar Vue UI — Nuxt Example',
})
</script>

<template>
  <div class="min-h-screen p-6 md:p-12">
    <header class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">
          Stellar Vue UI
        </h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Nuxt 4 module example — auto-imports active
        </p>
      </div>
      <div class="flex items-center gap-3">
        <!-- UIBadge is auto-imported, no import statement needed -->
        <UIBadge variant="secondary">
          {{ theme }}
        </UIBadge>
        <UIButton size="sm" variant="outline" @click="toggleDark">
          {{ isDark ? 'Light' : 'Dark' }}
        </UIButton>
      </div>
    </header>

    <!-- Theme switcher -->
    <section class="mb-8">
      <h2 class="mb-3 text-lg font-semibold">
        Switch Theme
      </h2>
      <div class="flex flex-wrap gap-2">
        <UIButton
          v-for="t in themes"
          :key="t"
          :variant="theme === t ? 'default' : 'outline'"
          size="sm"
          @click="setTheme(t)"
        >
          {{ t }}
        </UIButton>
      </div>
    </section>

    <UISeparator class="mb-8" />

    <!-- Contact form example -->
    <NuxtPage />
  </div>
</template>
