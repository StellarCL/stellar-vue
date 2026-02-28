<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="border-b border-border bg-background px-8 py-6">
    <h1 class="text-2xl font-bold tracking-tight text-foreground">
      {{ title }}
    </h1>
    <p class="mt-1 text-sm text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>
