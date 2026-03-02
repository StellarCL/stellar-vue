<script setup lang="ts">
import { Grid, GridItem } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const cols = ref(3)
const gap = ref('4')

const colors = [
  'bg-blue-500/20 border-blue-500/40 text-blue-700 dark:text-blue-300',
  'bg-purple-500/20 border-purple-500/40 text-purple-700 dark:text-purple-300',
  'bg-green-500/20 border-green-500/40 text-green-700 dark:text-green-300',
  'bg-amber-500/20 border-amber-500/40 text-amber-700 dark:text-amber-300',
  'bg-rose-500/20 border-rose-500/40 text-rose-700 dark:text-rose-300',
  'bg-cyan-500/20 border-cyan-500/40 text-cyan-700 dark:text-cyan-300',
]
</script>

<template>
  <div>
    <PageHeader
      title="Grid"
      description="A CSS Grid layout component with responsive column configuration, gap control, and item spanning."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic 3-Column Grid -->
      <DemoSection title="Basic Grid (3 Columns)">
        <Grid :cols="3" gap="4">
          <div
            v-for="i in 6"
            :key="i"
            :class="[
              'flex h-20 items-center justify-center rounded-lg border text-sm font-medium',
              colors[(i - 1) % colors.length],
            ]"
          >
            Item {{ i }}
          </div>
        </Grid>
      </DemoSection>

      <!-- Interactive Columns -->
      <DemoSection
        title="Interactive Columns"
        description="Adjust the number of columns and gap size."
      >
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-foreground">Columns</label>
              <div class="flex gap-1">
                <button
                  v-for="n in [1, 2, 3, 4, 5, 6]"
                  :key="n"
                  class="rounded-md border px-3 py-1.5 text-sm transition-colors"
                  :class="
                    cols === n
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input bg-background hover:bg-accent'
                  "
                  @click="cols = n"
                >
                  {{ n }}
                </button>
              </div>
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-foreground">Gap</label>
              <div class="flex gap-1">
                <button
                  v-for="g in ['2', '4', '6', '8']"
                  :key="g"
                  class="rounded-md border px-3 py-1.5 text-sm transition-colors"
                  :class="
                    gap === g
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input bg-background hover:bg-accent'
                  "
                  @click="gap = g"
                >
                  {{ g }}
                </button>
              </div>
            </div>
          </div>
          <Grid :cols="cols" :gap="gap">
            <div
              v-for="i in 12"
              :key="i"
              :class="[
                'flex h-16 items-center justify-center rounded-lg border text-sm font-medium',
                colors[(i - 1) % colors.length],
              ]"
            >
              {{ i }}
            </div>
          </Grid>
        </div>
      </DemoSection>

      <!-- Responsive Grid -->
      <DemoSection
        title="Responsive Grid"
        description="Grid that adapts from 1 column on small screens to 4 on extra-large."
      >
        <Grid :cols="{ sm: 1, md: 2, lg: 3, xl: 4 }" gap="4">
          <div
            v-for="i in 8"
            :key="i"
            :class="[
              'flex h-20 items-center justify-center rounded-lg border text-sm font-medium',
              colors[(i - 1) % colors.length],
            ]"
          >
            Item {{ i }}
          </div>
        </Grid>
      </DemoSection>

      <!-- Spanning Items -->
      <DemoSection
        title="Spanning Items"
        description="GridItem supports colSpan and rowSpan for complex layouts."
      >
        <Grid :cols="3" gap="4">
          <GridItem :col-span="2">
            <div
              class="flex h-20 items-center justify-center rounded-lg border bg-blue-500/20 border-blue-500/40 text-blue-700 dark:text-blue-300 text-sm font-medium"
            >
              Spans 2 columns
            </div>
          </GridItem>
          <GridItem>
            <div
              class="flex h-20 items-center justify-center rounded-lg border bg-purple-500/20 border-purple-500/40 text-purple-700 dark:text-purple-300 text-sm font-medium"
            >
              1 col
            </div>
          </GridItem>
          <GridItem>
            <div
              class="flex h-20 items-center justify-center rounded-lg border bg-green-500/20 border-green-500/40 text-green-700 dark:text-green-300 text-sm font-medium"
            >
              1 col
            </div>
          </GridItem>
          <GridItem :col-span="2" :row-span="2">
            <div
              class="flex h-full min-h-[10rem] items-center justify-center rounded-lg border bg-amber-500/20 border-amber-500/40 text-amber-700 dark:text-amber-300 text-sm font-medium"
            >
              Spans 2 cols + 2 rows
            </div>
          </GridItem>
          <GridItem>
            <div
              class="flex h-20 items-center justify-center rounded-lg border bg-rose-500/20 border-rose-500/40 text-rose-700 dark:text-rose-300 text-sm font-medium"
            >
              1 col
            </div>
          </GridItem>
          <GridItem>
            <div
              class="flex h-20 items-center justify-center rounded-lg border bg-cyan-500/20 border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-sm font-medium"
            >
              1 col
            </div>
          </GridItem>
        </Grid>
      </DemoSection>

      <!-- Single Column -->
      <DemoSection title="Single Column" description="A single-column layout for stacked content.">
        <div class="max-w-sm">
          <Grid :cols="1" gap="3">
            <div
              v-for="i in 4"
              :key="i"
              :class="[
                'flex h-14 items-center justify-center rounded-lg border text-sm font-medium',
                colors[(i - 1) % colors.length],
              ]"
            >
              Row {{ i }}
            </div>
          </Grid>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
