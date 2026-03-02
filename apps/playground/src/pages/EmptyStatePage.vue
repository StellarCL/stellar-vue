<script setup lang="ts">
import {
  Button,
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from '@stellar-vue-ui/core'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Empty State"
      description="Placeholder content shown when there is no data to display. Communicates context and provides a call to action."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- No Results -->
      <DemoSection title="No Search Results">
        <EmptyState>
          <EmptyStateIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </EmptyStateIcon>
          <EmptyStateTitle>No results found</EmptyStateTitle>
          <EmptyStateDescription>
            We couldn't find anything matching your search. Try adjusting your filters or search
            terms.
          </EmptyStateDescription>
          <EmptyStateAction>
            <Button variant="outline">Clear Filters</Button>
          </EmptyStateAction>
        </EmptyState>
      </DemoSection>

      <!-- No Data -->
      <DemoSection title="No Data" description="Shown when a section has no content yet.">
        <EmptyState>
          <EmptyStateIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </EmptyStateIcon>
          <EmptyStateTitle>No documents yet</EmptyStateTitle>
          <EmptyStateDescription>
            Get started by creating your first document. You can upload files or create from
            scratch.
          </EmptyStateDescription>
          <EmptyStateAction>
            <Button>Create Document</Button>
            <Button variant="outline">Upload File</Button>
          </EmptyStateAction>
        </EmptyState>
      </DemoSection>

      <!-- Error State -->
      <DemoSection title="Error State" description="Displayed when content fails to load.">
        <EmptyState>
          <EmptyStateIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </EmptyStateIcon>
          <EmptyStateTitle>Something went wrong</EmptyStateTitle>
          <EmptyStateDescription>
            We encountered an error while loading your data. Please try again or contact support if
            the problem persists.
          </EmptyStateDescription>
          <EmptyStateAction>
            <Button variant="destructive">Retry</Button>
            <Button variant="outline">Contact Support</Button>
          </EmptyStateAction>
        </EmptyState>
      </DemoSection>

      <!-- Minimal -->
      <DemoSection
        title="Minimal"
        description="A simple empty state with just a title and description."
      >
        <EmptyState>
          <EmptyStateTitle>Nothing here</EmptyStateTitle>
          <EmptyStateDescription>
            This section is empty. Content will appear here once available.
          </EmptyStateDescription>
        </EmptyState>
      </DemoSection>
    </div>
  </div>
</template>
