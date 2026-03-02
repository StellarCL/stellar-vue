<script setup lang="ts">
import { Timeline, TimelineContent, TimelineItem } from '@stellar-vue-ui/core'
import { ref } from 'vue'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const layout = ref<'left' | 'right' | 'alternating'>('left')
</script>

<template>
  <div>
    <PageHeader
      title="Timeline"
      description="A chronological display of events arranged along a vertical line with connectors."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Left Layout -->
      <DemoSection
        title="Left Layout"
        description="Default layout with content on the left side of the timeline."
      >
        <div class="max-w-lg">
          <Timeline layout="left">
            <TimelineItem date="Jan 2026" variant="success">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Project Launched</h4>
                <p class="text-sm text-muted-foreground">
                  The first version of the project was released to the public.
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="Feb 2026">
              <TimelineContent>
                <h4 class="text-sm font-semibold">New Features Added</h4>
                <p class="text-sm text-muted-foreground">
                  Dark mode, accessibility improvements, and new components were added.
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="Mar 2026" variant="warning">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Performance Review</h4>
                <p class="text-sm text-muted-foreground">
                  Identified areas for bundle size optimization and rendering improvements.
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="Apr 2026">
              <TimelineContent>
                <h4 class="text-sm font-semibold">v1.0 Stable Release</h4>
                <p class="text-sm text-muted-foreground">
                  The stable version with full API documentation and migration guides.
                </p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </DemoSection>

      <!-- Alternating Layout -->
      <DemoSection
        title="Alternating Layout"
        description="Content alternates between left and right sides."
      >
        <div class="max-w-2xl">
          <Timeline layout="alternating">
            <TimelineItem date="9:00 AM" variant="success">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Morning Standup</h4>
                <p class="text-sm text-muted-foreground">
                  Team sync meeting to discuss progress and blockers.
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="10:30 AM">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Code Review</h4>
                <p class="text-sm text-muted-foreground">
                  Reviewed pull requests from team members.
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="1:00 PM" variant="warning">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Design Meeting</h4>
                <p class="text-sm text-muted-foreground">
                  Discussed UI changes for the upcoming release.
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="3:00 PM" variant="destructive">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Bug Report</h4>
                <p class="text-sm text-muted-foreground">
                  Critical bug found in production, hotfix deployed.
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="5:00 PM" variant="success">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Deployment</h4>
                <p class="text-sm text-muted-foreground">
                  Successfully deployed the latest changes to production.
                </p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </DemoSection>

      <!-- Variant Colors -->
      <DemoSection
        title="Variant Colors"
        description="Timeline items can use different color variants to convey status."
      >
        <div class="max-w-lg">
          <Timeline layout="left">
            <TimelineItem date="Step 1" variant="default">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Default</h4>
                <p class="text-sm text-muted-foreground">Neutral state for general events.</p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="Step 2" variant="success">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Success</h4>
                <p class="text-sm text-muted-foreground">
                  Indicates a successful or completed event.
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="Step 3" variant="warning">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Warning</h4>
                <p class="text-sm text-muted-foreground">
                  Indicates something that needs attention.
                </p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem date="Step 4" variant="destructive">
              <TimelineContent>
                <h4 class="text-sm font-semibold">Destructive</h4>
                <p class="text-sm text-muted-foreground">Indicates an error or critical event.</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </DemoSection>

      <!-- Interactive Layout Toggle -->
      <DemoSection
        title="Layout Toggle"
        description="Switch between left, right, and alternating layouts."
      >
        <div class="space-y-4">
          <div class="flex gap-1.5">
            <button
              v-for="l in ['left', 'right', 'alternating'] as const"
              :key="l"
              class="px-3 py-1.5 rounded text-xs border transition-colors"
              :class="
                layout === l
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-input hover:bg-accent'
              "
              @click="layout = l"
            >
              {{ l }}
            </button>
          </div>
          <div :class="layout === 'alternating' ? 'max-w-2xl' : 'max-w-lg'">
            <Timeline :layout="layout">
              <TimelineItem date="2024" variant="success">
                <TimelineContent>
                  <h4 class="text-sm font-semibold">Foundation</h4>
                  <p class="text-sm text-muted-foreground">
                    Initial project setup and architecture decisions.
                  </p>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem date="2025">
                <TimelineContent>
                  <h4 class="text-sm font-semibold">Development</h4>
                  <p class="text-sm text-muted-foreground">
                    Core component development and testing phase.
                  </p>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem date="2026" variant="success">
                <TimelineContent>
                  <h4 class="text-sm font-semibold">Release</h4>
                  <p class="text-sm text-muted-foreground">
                    Public release with full documentation.
                  </p>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
