<script setup lang="ts">
import { Alert, AlertTitle, AlertDescription } from '@stellar-vue-ui/core'
import { AlertCircle, CheckCircle, Info, AlertTriangle, Terminal } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Alert"
      description="Displays a callout for user attention."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Variants -->
      <DemoSection title="Variants" description="All available alert variants.">
        <div class="space-y-3 max-w-lg">
          <Alert>
            <Terminal class="h-4 w-4" />
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>
              You can use the CLI to add new components to your project.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle class="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Your session has expired. Please log in again to continue.
            </AlertDescription>
          </Alert>

          <Alert variant="success">
            <CheckCircle class="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your profile has been updated successfully.
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTriangle class="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This action may have unintended side effects. Proceed with caution.
            </AlertDescription>
          </Alert>

          <Alert variant="info">
            <Info class="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              A new version is available. Update to get the latest features.
            </AlertDescription>
          </Alert>
        </div>
      </DemoSection>

      <!-- Without icon -->
      <DemoSection title="Without Icon">
        <div class="space-y-3 max-w-lg">
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies using the CLI.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              There was an error processing your request.
            </AlertDescription>
          </Alert>
        </div>
      </DemoSection>

      <!-- Description only -->
      <DemoSection title="Description Only">
        <div class="space-y-3 max-w-lg">
          <Alert variant="info">
            <AlertDescription>
              Your free trial ends in 3 days. Upgrade to continue using all features.
            </AlertDescription>
          </Alert>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
