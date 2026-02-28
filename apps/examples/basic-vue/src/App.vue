<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Label,
  Badge,
  Separator,
} from '@stellar-vue-ui/core'
import { useTheme } from '@stellar-vue-ui/core'

const { theme, isDark, setTheme, toggleDark, themes } = useTheme({ defaultTheme: 'stellar' })

const name = ref('')
const email = ref('')
const submitted = ref(false)

function handleSubmit() {
  if (name.value && email.value) {
    submitted.value = true
  }
}

function reset() {
  name.value = ''
  email.value = ''
  submitted.value = false
}
</script>

<template>
  <div class="min-h-screen p-6 md:p-12">
    <!-- Header -->
    <header class="mb-10 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Stellar Vue UI</h1>
        <p class="text-muted-foreground mt-1 text-sm">Basic Vite + Vue 3 example</p>
      </div>
      <div class="flex items-center gap-3">
        <Badge variant="secondary">{{ theme }}</Badge>
        <Button size="sm" variant="outline" @click="toggleDark">
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </Button>
      </div>
    </header>

    <Separator class="mb-10" />

    <!-- Theme switcher -->
    <section class="mb-10">
      <h2 class="mb-4 text-xl font-semibold">Themes</h2>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="t in themes"
          :key="t"
          :variant="theme === t ? 'default' : 'outline'"
          size="sm"
          @click="setTheme(t)"
        >
          {{ t }}
        </Button>
      </div>
    </section>

    <!-- Main content grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Button showcase -->
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>All button variants and sizes</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </CardContent>
        <CardFooter>
          <div class="flex gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardFooter>
      </Card>

      <!-- Badge showcase -->
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Status indicators and labels</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </CardContent>
      </Card>

      <!-- Form card -->
      <Card class="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>A simple form demonstrating Input components</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="submitted" class="space-y-2">
            <p class="text-green-600 font-medium">Submitted successfully!</p>
            <p class="text-muted-foreground text-sm">
              Name: <strong>{{ name }}</strong><br />
              Email: <strong>{{ email }}</strong>
            </p>
          </div>
          <form v-else class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <Label for="name">Full Name</Label>
              <Input
                id="name"
                v-model="name"
                placeholder="Jane Smith"
                required
              />
            </div>
            <div class="space-y-2">
              <Label for="email">Email Address</Label>
              <Input
                id="email"
                v-model="email"
                type="email"
                placeholder="jane@example.com"
                required
              />
            </div>
            <Button type="submit" class="w-full">Submit</Button>
          </form>
        </CardContent>
        <CardFooter v-if="submitted">
          <Button variant="outline" class="w-full" @click="reset">Reset</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
