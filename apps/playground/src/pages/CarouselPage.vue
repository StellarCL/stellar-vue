<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const autoPlayEnabled = ref(true)
const loopEnabled = ref(true)

const slideColors = [
  { bg: 'bg-red-500/15', text: 'text-red-700 dark:text-red-300', label: 'Slide 1' },
  { bg: 'bg-blue-500/15', text: 'text-blue-700 dark:text-blue-300', label: 'Slide 2' },
  { bg: 'bg-green-500/15', text: 'text-green-700 dark:text-green-300', label: 'Slide 3' },
  { bg: 'bg-amber-500/15', text: 'text-amber-700 dark:text-amber-300', label: 'Slide 4' },
  { bg: 'bg-purple-500/15', text: 'text-purple-700 dark:text-purple-300', label: 'Slide 5' },
]
</script>

<template>
  <div>
    <PageHeader
      title="Carousel"
      description="A slideshow component for cycling through content with next/previous controls and optional auto-play."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Carousel -->
      <DemoSection
        title="Basic Carousel"
        description="Navigate slides with the previous and next buttons."
      >
        <div class="mx-auto max-w-lg">
          <Carousel>
            <CarouselContent>
              <CarouselItem v-for="(slide, index) in slideColors" :key="index">
                <div
                  :class="[slide.bg, slide.text]"
                  class="flex items-center justify-center rounded-lg h-48 text-xl font-semibold"
                >
                  {{ slide.label }}
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DemoSection>

      <!-- Auto-Play Carousel -->
      <DemoSection
        title="Auto-Play"
        description="Slides advance automatically every 3 seconds. Toggle the behavior with the control below."
      >
        <div class="flex flex-col gap-4">
          <label class="flex items-center gap-2 text-sm text-foreground">
            <input v-model="autoPlayEnabled" type="checkbox" class="h-4 w-4 rounded border-input" />
            Enable auto-play
          </label>
          <div class="mx-auto max-w-lg">
            <Carousel :auto-play="autoPlayEnabled" :auto-play-interval="3000" :loop="true">
              <CarouselContent>
                <CarouselItem v-for="i in 5" :key="i">
                  <div
                    class="flex items-center justify-center rounded-lg bg-primary/10 text-primary h-48 text-xl font-semibold"
                  >
                    Auto Slide {{ i }}
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </DemoSection>

      <!-- Loop Mode -->
      <DemoSection
        title="Loop Mode"
        description="When loop is enabled, the carousel wraps around from the last slide back to the first."
      >
        <div class="flex flex-col gap-4">
          <label class="flex items-center gap-2 text-sm text-foreground">
            <input v-model="loopEnabled" type="checkbox" class="h-4 w-4 rounded border-input" />
            Enable loop
          </label>
          <div class="mx-auto max-w-lg">
            <Carousel :loop="loopEnabled">
              <CarouselContent>
                <CarouselItem v-for="i in 3" :key="i">
                  <div
                    class="flex items-center justify-center rounded-lg bg-accent text-accent-foreground h-48 text-xl font-semibold"
                  >
                    Card {{ i }} of 3
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </DemoSection>

      <!-- Vertical Orientation -->
      <DemoSection
        title="Vertical Orientation"
        description="Carousel slides can stack vertically instead of horizontally."
      >
        <div class="mx-auto max-w-lg">
          <Carousel orientation="vertical" class="h-64">
            <CarouselContent>
              <CarouselItem v-for="(slide, index) in slideColors" :key="index">
                <div
                  :class="[slide.bg, slide.text]"
                  class="flex items-center justify-center rounded-lg h-48 text-xl font-semibold"
                >
                  {{ slide.label }} (Vertical)
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DemoSection>

      <!-- Content Cards -->
      <DemoSection
        title="Card Content"
        description="Carousels work well for showcasing card-based content."
      >
        <div class="mx-auto max-w-lg">
          <Carousel :loop="true">
            <CarouselContent>
              <CarouselItem v-for="i in 4" :key="i">
                <div class="rounded-lg border border-border bg-card p-6">
                  <h3 class="text-lg font-semibold text-card-foreground">Feature {{ i }}</h3>
                  <p class="mt-2 text-sm text-muted-foreground">
                    This is a description for feature {{ i }}. Carousels are a great way to present
                    a series of related items in a compact space.
                  </p>
                  <div class="mt-4 flex gap-2">
                    <span
                      class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      Tag A
                    </span>
                    <span
                      class="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      Tag B
                    </span>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
