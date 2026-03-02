<script setup lang="ts">
import { Stack } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const direction = ref<'vertical' | 'horizontal'>('horizontal')
const gap = ref<string | number>(4)
const align = ref<'start' | 'center' | 'end' | 'stretch'>('stretch')
const justify = ref<'start' | 'center' | 'end' | 'between' | 'around'>('start')
const wrap = ref(false)
</script>

<template>
  <div>
    <PageHeader
      title="Stack"
      description="A layout primitive for arranging elements in vertical or horizontal stacks with consistent spacing."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Interactive Demo -->
      <DemoSection
        title="Interactive Demo"
        description="Configure the stack layout using the controls below."
      >
        <div class="flex flex-col gap-6">
          <div class="min-h-[150px] rounded-md border border-dashed border-border p-4 bg-muted/20">
            <Stack :direction="direction" :gap="gap" :align="align" :justify="justify" :wrap="wrap">
              <div
                class="w-20 h-12 rounded bg-primary/80 text-primary-foreground flex items-center justify-center text-xs font-medium"
              >
                1
              </div>
              <div
                class="w-24 h-16 rounded bg-primary/60 text-primary-foreground flex items-center justify-center text-xs font-medium"
              >
                2
              </div>
              <div
                class="w-16 h-10 rounded bg-primary/80 text-primary-foreground flex items-center justify-center text-xs font-medium"
              >
                3
              </div>
              <div
                class="w-28 h-14 rounded bg-primary/60 text-primary-foreground flex items-center justify-center text-xs font-medium"
              >
                4
              </div>
            </Stack>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-border pt-4 text-sm">
            <div>
              <p class="font-medium mb-2 text-muted-foreground">Direction</p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="d in ['vertical', 'horizontal'] as const"
                  :key="d"
                  class="px-2 py-1 rounded text-xs border transition-colors"
                  :class="
                    direction === d
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-input hover:bg-accent'
                  "
                  @click="direction = d"
                >
                  {{ d }}
                </button>
              </div>
            </div>
            <div>
              <p class="font-medium mb-2 text-muted-foreground">Gap</p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="g in [1, 2, 4, 6, 8]"
                  :key="g"
                  class="px-2 py-1 rounded text-xs border transition-colors"
                  :class="
                    gap === g
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-input hover:bg-accent'
                  "
                  @click="gap = g"
                >
                  {{ g }}
                </button>
              </div>
            </div>
            <div>
              <p class="font-medium mb-2 text-muted-foreground">Align</p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="a in ['start', 'center', 'end', 'stretch'] as const"
                  :key="a"
                  class="px-2 py-1 rounded text-xs border transition-colors"
                  :class="
                    align === a
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-input hover:bg-accent'
                  "
                  @click="align = a"
                >
                  {{ a }}
                </button>
              </div>
            </div>
            <div>
              <p class="font-medium mb-2 text-muted-foreground">Justify</p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="j in ['start', 'center', 'end', 'between', 'around'] as const"
                  :key="j"
                  class="px-2 py-1 rounded text-xs border transition-colors"
                  :class="
                    justify === j
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-input hover:bg-accent'
                  "
                  @click="justify = j"
                >
                  {{ j }}
                </button>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="wrap" type="checkbox" class="rounded" />
                <span>Wrap</span>
              </label>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- Vertical Stack -->
      <DemoSection
        title="Vertical Stack"
        description="Items stacked vertically with default spacing."
      >
        <div class="max-w-xs">
          <Stack direction="vertical" :gap="3">
            <div
              class="h-12 rounded bg-blue-500/20 border border-blue-500/30 flex items-center px-4 text-sm"
            >
              Item 1
            </div>
            <div
              class="h-12 rounded bg-blue-500/20 border border-blue-500/30 flex items-center px-4 text-sm"
            >
              Item 2
            </div>
            <div
              class="h-12 rounded bg-blue-500/20 border border-blue-500/30 flex items-center px-4 text-sm"
            >
              Item 3
            </div>
          </Stack>
        </div>
      </DemoSection>

      <!-- Horizontal Stack -->
      <DemoSection title="Horizontal Stack" description="Items arranged horizontally.">
        <Stack direction="horizontal" :gap="3" align="center">
          <div
            class="h-12 w-24 rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center text-sm"
          >
            A
          </div>
          <div
            class="h-16 w-24 rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center text-sm"
          >
            B
          </div>
          <div
            class="h-10 w-24 rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center text-sm"
          >
            C
          </div>
          <div
            class="h-14 w-24 rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center text-sm"
          >
            D
          </div>
        </Stack>
      </DemoSection>

      <!-- Space Between -->
      <DemoSection title="Justify Between" description="Items distributed with space between them.">
        <Stack direction="horizontal" :gap="4" justify="between" align="center">
          <div
            class="h-12 w-20 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm"
          >
            Left
          </div>
          <div
            class="h-12 w-20 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm"
          >
            Center
          </div>
          <div
            class="h-12 w-20 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm"
          >
            Right
          </div>
        </Stack>
      </DemoSection>

      <!-- Wrapping -->
      <DemoSection
        title="Wrapping"
        description="Items wrap to the next line when the container is too narrow."
      >
        <div class="max-w-sm">
          <Stack direction="horizontal" :gap="2" wrap>
            <div
              v-for="i in 10"
              :key="i"
              class="h-10 w-16 rounded bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs"
            >
              {{ i }}
            </div>
          </Stack>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
