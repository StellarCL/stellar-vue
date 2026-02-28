<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="space-y-3">
    <div>
      <h3 class="text-sm font-semibold text-foreground">
        {{ title }}
      </h3>
      <p v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>
    <div class="rounded-lg border border-border bg-card p-6">
      <slot />
    </div>
  </section>
</template>
