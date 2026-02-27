<script setup lang="ts">
const { theme, isDark, setTheme, toggleDark } = useServerTheme()
</script>

<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold">
      Stellar Vue UI - Nuxt Playground
    </h1>

    <div class="flex items-center gap-4">
      <p>
        Current theme: <strong>{{ theme }}</strong>
      </p>
      <p>
        Dark mode: <strong>{{ isDark ? 'On' : 'Off' }}</strong>
      </p>
      <UIButton @click="toggleDark">
        Toggle Dark Mode
      </UIButton>
    </div>

    <UICard class="max-w-md">
      <UICardHeader>
        <UICardTitle>Welcome to Stellar</UICardTitle>
        <UICardDescription>
          This playground demonstrates auto-imported Stellar UI components.
        </UICardDescription>
      </UICardHeader>
      <UICardContent>
        <div class="space-y-4">
          <UIInput placeholder="Type something..." />
          <div class="flex gap-2">
            <UIButton variant="default">
              Primary
            </UIButton>
            <UIButton variant="outline">
              Outline
            </UIButton>
            <UIButton variant="ghost">
              Ghost
            </UIButton>
          </div>
        </div>
      </UICardContent>
    </UICard>

    <div class="flex gap-2">
      <UIButton
        v-for="t in ['stellar', 'sirius', 'polaris', 'antares', 'vega', 'aldebaran']"
        :key="t"
        :variant="theme === t ? 'default' : 'outline'"
        size="sm"
        @click="setTheme(t)"
      >
        {{ t }}
      </UIButton>
    </div>
  </div>
</template>
