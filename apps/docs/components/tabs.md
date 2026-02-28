# Tabs

A set of layered panels of content, each associated with a tab trigger. Only one panel is displayed at a time. Built on Radix Vue's Tabs primitives with animated transitions.

## Installation

::: code-group

```bash [CLI]
npx stellar add tabs
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@stellar-vue-ui/core'
</script>

<template>
  <Tabs default-value="account">
    <TabsList>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <p>Make changes to your account here.</p>
    </TabsContent>
    <TabsContent value="password">
      <p>Change your password here.</p>
    </TabsContent>
  </Tabs>
</template>
```

## Examples

### Controlled

Use `v-model` to control the active tab programmatically:

```vue
<script setup lang="ts">
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const activeTab = ref('overview')
</script>

<template>
  <Button @click="activeTab = 'settings'">
    Go to Settings
  </Button>

  <Tabs v-model="activeTab">
    <TabsList>
      <TabsTrigger value="overview">
        Overview
      </TabsTrigger>
      <TabsTrigger value="analytics">
        Analytics
      </TabsTrigger>
      <TabsTrigger value="settings">
        Settings
      </TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      Overview content.
    </TabsContent>
    <TabsContent value="analytics">
      Analytics content.
    </TabsContent>
    <TabsContent value="settings">
      Settings content.
    </TabsContent>
  </Tabs>
</template>
```

### Disabled Tab

```vue
<template>
  <Tabs default-value="active">
    <TabsList>
      <TabsTrigger value="active">
        Active
      </TabsTrigger>
      <TabsTrigger value="disabled" disabled>
        Disabled
      </TabsTrigger>
      <TabsTrigger value="other">
        Other
      </TabsTrigger>
    </TabsList>
    <TabsContent value="active">
      Active tab content.
    </TabsContent>
    <TabsContent value="disabled">
      This panel cannot be reached.
    </TabsContent>
    <TabsContent value="other">
      Other tab content.
    </TabsContent>
  </Tabs>
</template>
```

### With Cards

Combine tabs with card components for a structured layout:

```vue
<script setup lang="ts">
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from '@stellar-vue-ui/core'
</script>

<template>
  <Tabs default-value="account" class="w-[400px]">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Make changes to your account.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="name">Name</Label>
            <Input id="name" value="John Doe" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password.</CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div class="space-y-1">
            <Label for="new">New password</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</template>
```

## API Reference

### Tabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `undefined` | Controlled active tab value (v-model) |
| `defaultValue` | `string` | `undefined` | Active tab when initially rendered (uncontrolled) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation; affects arrow key navigation |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### TabsList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### TabsTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | *required* | Value associating this trigger with a content panel |
| `disabled` | `boolean` | `false` | Prevents interaction with this tab |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### TabsContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | *required* | Value associating this content with a trigger |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when the active tab changes |

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `Tabs` | `default` | TabsList and TabsContent elements |
| `TabsList` | `default` | TabsTrigger elements |
| `TabsTrigger` | `default` | Trigger label text |
| `TabsContent` | `default` | Panel content |

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus into the tabs list, then to the active panel |
| `ArrowRight` | Moves focus and activates the next tab (horizontal) |
| `ArrowLeft` | Moves focus and activates the previous tab (horizontal) |
| `ArrowDown` | Moves focus and activates the next tab (vertical) |
| `ArrowUp` | Moves focus and activates the previous tab (vertical) |
| `Home` | Moves focus to the first tab |
| `End` | Moves focus to the last tab |

### ARIA Attributes

- `TabsList` has `role="tablist"` with `aria-orientation`
- Each `TabsTrigger` has `role="tab"` with `aria-selected` and `aria-controls`
- Each `TabsContent` has `role="tabpanel"` with `aria-labelledby`
- Disabled tabs have `aria-disabled="true"` and are skipped in keyboard navigation
- Active tab has `data-state="active"` with shadow styling

## Related

- [Accordion](/components/accordion) -- For vertically stacked collapsible content
- [Card](/components/card) -- Often combined with tabs for structured layouts
- [Navigation Menu](/components/navigation-menu) -- For top-level page navigation
