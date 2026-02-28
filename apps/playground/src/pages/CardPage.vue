<script setup lang="ts">
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@stellar-vue-ui/core'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Card"
      description="A container for related content and actions."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Card -->
      <DemoSection title="Basic Card">
        <Card class="max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here, providing more context.</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              This is the card content area. You can put any content here.
            </p>
          </CardContent>
          <CardFooter class="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </DemoSection>

      <!-- Card with Badge -->
      <DemoSection title="Card with Badge">
        <Card class="max-w-sm">
          <CardHeader>
            <div class="flex items-start justify-between">
              <CardTitle>Notification</CardTitle>
              <Badge>New</Badge>
            </div>
            <CardDescription>You have a new message from the team.</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-muted-foreground">
              Alice has mentioned you in a comment on the design review.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" class="w-full">
              View message
            </Button>
          </CardFooter>
        </Card>
      </DemoSection>

      <!-- Card Grid -->
      <DemoSection title="Card Grid">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card v-for="i in 3" :key="i">
            <CardHeader>
              <CardTitle class="text-base">
                Project {{ i }}
              </CardTitle>
              <CardDescription>Last updated 2 days ago</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="h-20 rounded bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">
                Preview area
              </div>
            </CardContent>
            <CardFooter class="flex justify-between items-center">
              <Badge variant="secondary">
                Active
              </Badge>
              <Button variant="ghost" size="sm">
                Open
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DemoSection>

      <!-- Content-only Card -->
      <DemoSection title="Content Only">
        <Card class="max-w-sm">
          <CardContent class="pt-6">
            <p class="text-sm">
              A simple card with only a content area — no header or footer required.
            </p>
          </CardContent>
        </Card>
      </DemoSection>

      <!-- Card Variants -->
      <DemoSection title="Variants" description="Cards support outline and filled variants.">
        <div class="flex flex-wrap gap-4">
          <Card class="w-48">
            <CardHeader>
              <CardTitle class="text-sm">
                Default
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-xs text-muted-foreground">
                Default card style
              </p>
            </CardContent>
          </Card>
          <Card variant="bordered" class="w-48">
            <CardHeader>
              <CardTitle class="text-sm">
                Bordered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-xs text-muted-foreground">
                Bordered card style
              </p>
            </CardContent>
          </Card>
          <Card variant="elevated" class="w-48">
            <CardHeader>
              <CardTitle class="text-sm">
                Elevated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-xs text-muted-foreground">
                Elevated card style
              </p>
            </CardContent>
          </Card>
        </div>
      </DemoSection>
    </div>
  </div>
</template>
