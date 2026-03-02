<script setup lang="ts">
import { Rating } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const rating1 = ref(3)
const ratingHalf = ref(3.5)
const ratingReadonly = ref(4)
const ratingSm = ref(2)
const ratingMd = ref(3)
const ratingLg = ref(4)
const ratingMax10 = ref(7)
</script>

<template>
  <div>
    <PageHeader
      title="Rating"
      description="An interactive star rating component for collecting or displaying scores."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Interactive Rating -->
      <DemoSection
        title="Interactive Rating"
        description="Click on a star to set the rating value."
      >
        <div class="space-y-3">
          <Rating v-model="rating1" />
          <p class="text-sm text-muted-foreground">Current rating: {{ rating1 }} / 5</p>
        </div>
      </DemoSection>

      <!-- Half Stars -->
      <DemoSection
        title="Half Stars"
        description="Enable half-star precision for more granular ratings."
      >
        <div class="space-y-3">
          <Rating v-model="ratingHalf" half-stars />
          <p class="text-sm text-muted-foreground">Current rating: {{ ratingHalf }} / 5</p>
        </div>
      </DemoSection>

      <!-- Readonly -->
      <DemoSection
        title="Readonly"
        description="A non-interactive rating display, useful for showing existing scores."
      >
        <div class="flex flex-wrap items-center gap-6">
          <div class="flex items-center gap-2">
            <Rating :model-value="5" readonly />
            <span class="text-sm text-muted-foreground">5.0</span>
          </div>
          <div class="flex items-center gap-2">
            <Rating :model-value="4" readonly />
            <span class="text-sm text-muted-foreground">4.0</span>
          </div>
          <div class="flex items-center gap-2">
            <Rating :model-value="3" readonly />
            <span class="text-sm text-muted-foreground">3.0</span>
          </div>
          <div class="flex items-center gap-2">
            <Rating :model-value="2" readonly />
            <span class="text-sm text-muted-foreground">2.0</span>
          </div>
          <div class="flex items-center gap-2">
            <Rating :model-value="1" readonly />
            <span class="text-sm text-muted-foreground">1.0</span>
          </div>
        </div>
      </DemoSection>

      <!-- Sizes -->
      <DemoSection title="Sizes" description="Rating component in small, medium, and large sizes.">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <Rating v-model="ratingSm" size="sm" />
            <span class="text-xs text-muted-foreground">sm ({{ ratingSm }})</span>
          </div>
          <div class="flex items-center gap-3">
            <Rating v-model="ratingMd" size="md" />
            <span class="text-sm text-muted-foreground">md ({{ ratingMd }})</span>
          </div>
          <div class="flex items-center gap-3">
            <Rating v-model="ratingLg" size="lg" />
            <span class="text-base text-muted-foreground">lg ({{ ratingLg }})</span>
          </div>
        </div>
      </DemoSection>

      <!-- Custom Max (10 Stars) -->
      <DemoSection
        title="Custom Max (10 Stars)"
        description="Override the default max of 5 to display 10 stars."
      >
        <div class="space-y-3">
          <Rating v-model="ratingMax10" :max="10" />
          <p class="text-sm text-muted-foreground">Current rating: {{ ratingMax10 }} / 10</p>
        </div>
      </DemoSection>

      <!-- Product Review Example -->
      <DemoSection
        title="Product Review Example"
        description="A realistic usage pattern showing ratings in a product review context."
      >
        <div class="max-w-sm space-y-4 rounded-lg border border-border p-4">
          <div>
            <h4 class="text-sm font-medium text-foreground">Overall Quality</h4>
            <div class="flex items-center gap-2 mt-1">
              <Rating :model-value="4.5" half-stars readonly size="sm" />
              <span class="text-sm text-muted-foreground">4.5 out of 5</span>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-foreground">Value for Money</h4>
            <div class="flex items-center gap-2 mt-1">
              <Rating :model-value="3.5" half-stars readonly size="sm" />
              <span class="text-sm text-muted-foreground">3.5 out of 5</span>
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium text-foreground">Ease of Use</h4>
            <div class="flex items-center gap-2 mt-1">
              <Rating :model-value="5" readonly size="sm" />
              <span class="text-sm text-muted-foreground">5.0 out of 5</span>
            </div>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
