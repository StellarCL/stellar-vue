<script setup lang="ts">
import { Skeleton, Card, CardHeader, CardContent, CardFooter } from '@stellar-vue-ui/core'
import PageHeader from '../components/PageHeader.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Skeleton"
      description="Used to show a placeholder while content is loading."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic shapes -->
      <DemoSection title="Basic Shapes">
        <div class="space-y-3 max-w-sm">
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-4/5" />
          <Skeleton class="h-4 w-3/5" />
        </div>
      </DemoSection>

      <!-- Avatar with text -->
      <DemoSection title="Avatar + Text">
        <div class="flex items-center gap-4 max-w-sm">
          <Skeleton class="h-12 w-12 rounded-full" />
          <div class="flex-1 space-y-2">
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-4 w-1/2" />
          </div>
        </div>
      </DemoSection>

      <!-- Card skeleton -->
      <DemoSection title="Card Skeleton">
        <Card class="max-w-sm">
          <CardHeader>
            <div class="flex items-center gap-3">
              <Skeleton class="h-10 w-10 rounded-full" />
              <div class="flex-1 space-y-1.5">
                <Skeleton class="h-4 w-3/4" />
                <Skeleton class="h-3 w-1/2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton class="h-40 w-full rounded-md" />
            <div class="mt-4 space-y-2">
              <Skeleton class="h-3.5 w-full" />
              <Skeleton class="h-3.5 w-5/6" />
              <Skeleton class="h-3.5 w-4/6" />
            </div>
          </CardContent>
          <CardFooter class="gap-2">
            <Skeleton class="h-9 w-20 rounded-md" />
            <Skeleton class="h-9 w-20 rounded-md" />
          </CardFooter>
        </Card>
      </DemoSection>

      <!-- Table skeleton -->
      <DemoSection title="Table Skeleton">
        <div class="max-w-lg space-y-2">
          <!-- Header -->
          <div class="flex gap-4 pb-2 border-b border-border">
            <Skeleton class="h-4 w-32" />
            <Skeleton class="h-4 w-24" />
            <Skeleton class="h-4 w-28" />
            <Skeleton class="h-4 w-16 ml-auto" />
          </div>
          <!-- Rows -->
          <div v-for="i in 5" :key="i" class="flex gap-4 py-2">
            <Skeleton class="h-4 w-32" />
            <Skeleton class="h-4 w-24" />
            <Skeleton class="h-4 w-28" />
            <Skeleton class="h-4 w-16 ml-auto" />
          </div>
        </div>
      </DemoSection>

      <!-- Grid of cards -->
      <DemoSection title="Card Grid Skeleton">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="i in 3" :key="i" class="space-y-3 rounded-lg border border-border p-4">
            <Skeleton class="h-32 w-full rounded" />
            <Skeleton class="h-4 w-3/4" />
            <Skeleton class="h-3.5 w-full" />
            <Skeleton class="h-3.5 w-5/6" />
            <Skeleton class="h-8 w-1/2" />
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
