<script setup lang="ts">
import { Button } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const selectedVariant = ref<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>('default')
const selectedSize = ref<'sm' | 'md' | 'lg' | 'icon'>('md')
const isLoading = ref(false)
const isDisabled = ref(false)

const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
const sizes = ['sm', 'md', 'lg', 'icon'] as const
</script>

<template>
  <div>
    <PageHeader
      title="Button"
      description="Triggers an action or event. Supports multiple variants, sizes, and states."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Interactive demo -->
      <DemoSection title="Interactive Demo" description="Configure props using the controls below.">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-center min-h-20">
            <Button
              :variant="selectedVariant"
              :size="selectedSize"
              :loading="isLoading"
              :disabled="isDisabled"
            >
              {{ selectedSize === 'icon' ? '★' : 'Click me' }}
            </Button>
          </div>
          <div class="grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
            <div>
              <p class="font-medium mb-2 text-muted-foreground">
                Variant
              </p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="v in variants"
                  :key="v"
                  class="px-2 py-1 rounded text-xs border transition-colors"
                  :class="selectedVariant === v
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-input hover:bg-accent'"
                  @click="selectedVariant = v"
                >
                  {{ v }}
                </button>
              </div>
            </div>
            <div>
              <p class="font-medium mb-2 text-muted-foreground">
                Size
              </p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="s in sizes"
                  :key="s"
                  class="px-2 py-1 rounded text-xs border transition-colors"
                  :class="selectedSize === s
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-input hover:bg-accent'"
                  @click="selectedSize = s"
                >
                  {{ s }}
                </button>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="isLoading" type="checkbox" class="rounded">
                <span>Loading</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="isDisabled" type="checkbox" class="rounded">
                <span>Disabled</span>
              </label>
            </div>
          </div>
        </div>
      </DemoSection>

      <!-- All Variants -->
      <DemoSection title="Variants" description="All available button style variants.">
        <div class="flex flex-wrap gap-3">
          <Button variant="default">
            Default
          </Button>
          <Button variant="secondary">
            Secondary
          </Button>
          <Button variant="destructive">
            Destructive
          </Button>
          <Button variant="outline">
            Outline
          </Button>
          <Button variant="ghost">
            Ghost
          </Button>
          <Button variant="link">
            Link
          </Button>
        </div>
      </DemoSection>

      <!-- Sizes -->
      <DemoSection title="Sizes" description="Available size options.">
        <div class="flex flex-wrap items-center gap-3">
          <Button size="sm">
            Small
          </Button>
          <Button size="md">
            Medium
          </Button>
          <Button size="lg">
            Large
          </Button>
          <Button size="icon">
            ★
          </Button>
        </div>
      </DemoSection>

      <!-- States -->
      <DemoSection title="States" description="Disabled and loading states.">
        <div class="flex flex-wrap items-center gap-3">
          <Button>Normal</Button>
          <Button :disabled="true">
            Disabled
          </Button>
          <Button :loading="true">
            Loading
          </Button>
          <Button variant="outline" :disabled="true">
            Outline Disabled
          </Button>
          <Button variant="outline" :loading="true">
            Outline Loading
          </Button>
          <Button variant="destructive" :loading="true">
            Destructive Loading
          </Button>
        </div>
      </DemoSection>

      <!-- Dark variants -->
      <DemoSection title="All Variants × Sizes" description="Matrix of all variants and sizes.">
        <div class="space-y-3">
          <div v-for="v in variants" :key="v" class="flex flex-wrap items-center gap-2">
            <span class="w-20 text-xs text-muted-foreground shrink-0">{{ v }}</span>
            <Button v-for="s in ['sm', 'md', 'lg'] as const" :key="s" :variant="v" :size="s">
              {{ s }}
            </Button>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
