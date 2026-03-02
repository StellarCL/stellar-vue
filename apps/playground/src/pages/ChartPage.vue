<script setup lang="ts">
import { ChartContainer, ChartLegend, ChartTooltip } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const legendPosition = ref<'top' | 'bottom' | 'left' | 'right'>('bottom')

const salesItems = [
  { label: 'Revenue', color: '#3b82f6' },
  { label: 'Expenses', color: '#ef4444' },
  { label: 'Profit', color: '#22c55e' },
]

const trafficItems = [
  { label: 'Direct', color: '#8b5cf6' },
  { label: 'Organic', color: '#06b6d4' },
  { label: 'Referral', color: '#f59e0b' },
  { label: 'Social', color: '#ec4899' },
]
</script>

<template>
  <div>
    <PageHeader
      title="Chart"
      description="Wrapper components for chart visualizations. Provides a responsive container, themed tooltip, and configurable legend."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Chart Container with Legend -->
      <DemoSection
        title="Chart Container with Legend"
        description="ChartContainer provides a responsive wrapper. ChartLegend renders labeled color indicators."
      >
        <ChartContainer :responsive="true">
          <div
            class="flex h-48 items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/20 text-sm text-muted-foreground"
          >
            Chart.js canvas would render here
          </div>
          <ChartLegend :items="salesItems" position="bottom" />
        </ChartContainer>
      </DemoSection>

      <!-- Legend Positions -->
      <DemoSection
        title="Legend Positions"
        description="The legend can be placed at the top, bottom, left, or right of the chart."
      >
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="pos in ['top', 'bottom', 'left', 'right'] as const"
              :key="pos"
              class="rounded-md border px-3 py-1.5 text-sm transition-colors"
              :class="
                legendPosition === pos
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-input bg-background hover:bg-accent'
              "
              @click="legendPosition = pos"
            >
              {{ pos }}
            </button>
          </div>
          <ChartContainer>
            <div
              class="flex items-center"
              :class="
                legendPosition === 'left' || legendPosition === 'right'
                  ? 'flex-row gap-4'
                  : 'flex-col'
              "
            >
              <ChartLegend
                v-if="legendPosition === 'top' || legendPosition === 'left'"
                :items="trafficItems"
                :position="legendPosition"
              />
              <div
                class="flex h-40 flex-1 items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/20 text-sm text-muted-foreground w-full"
              >
                Chart area
              </div>
              <ChartLegend
                v-if="legendPosition === 'bottom' || legendPosition === 'right'"
                :items="trafficItems"
                :position="legendPosition"
              />
            </div>
          </ChartContainer>
        </div>
      </DemoSection>

      <!-- Chart Tooltip -->
      <DemoSection
        title="Chart Tooltip"
        description="ChartTooltip provides a styled tooltip container for hover data display."
      >
        <ChartContainer>
          <div
            class="flex h-48 items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/20 text-sm text-muted-foreground"
          >
            Hover over data points to show tooltips
          </div>
          <div class="mt-4 flex gap-4">
            <ChartTooltip>
              <p class="font-medium text-foreground">January</p>
              <p class="text-muted-foreground">Revenue: $12,400</p>
            </ChartTooltip>
            <ChartTooltip>
              <p class="font-medium text-foreground">February</p>
              <p class="text-muted-foreground">Revenue: $15,800</p>
            </ChartTooltip>
          </div>
        </ChartContainer>
      </DemoSection>

      <!-- Non-Responsive Container -->
      <DemoSection
        title="Non-Responsive Container"
        description="Set responsive to false for a fixed-width chart container."
      >
        <ChartContainer :responsive="false" class="w-80">
          <div
            class="flex h-32 items-center justify-center rounded-md border border-dashed border-muted-foreground/25 bg-muted/20 text-sm text-muted-foreground"
          >
            Fixed width (320px)
          </div>
          <ChartLegend :items="salesItems.slice(0, 2)" position="bottom" />
        </ChartContainer>
      </DemoSection>
    </div>
  </div>
</template>
