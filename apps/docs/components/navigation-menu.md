# Navigation Menu

A collection of links for navigating a website. Supports dropdown content panels with animated transitions for complex navigation structures. Built on Radix Vue's NavigationMenu primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add navigation-menu
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@stellar-vue-ui/core'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href="/docs">
          Documentation
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/components">
          Components
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/examples">
          Examples
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

## Examples

### With Dropdown Content

Use `NavigationMenuTrigger` and `NavigationMenuContent` for dropdown navigation panels:

```vue
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@stellar-vue-ui/core'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li>
              <NavigationMenuLink href="/docs/introduction">
                <div class="text-sm font-medium">
                  Introduction
                </div>
                <p class="text-sm text-muted-foreground">
                  Learn about the library.
                </p>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="/docs/installation">
                <div class="text-sm font-medium">
                  Installation
                </div>
                <p class="text-sm text-muted-foreground">
                  How to install and set up.
                </p>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[400px] gap-3 p-4 md:grid-cols-2">
            <li>
              <NavigationMenuLink href="/components/button">
                Button
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="/components/card">
                Card
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="/components/dialog">
                Dialog
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink href="/docs">
          Documentation
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

### Active Link

Mark the currently active link with the `active` prop:

```vue
<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href="/" active>
          Home
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/about">
          About
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

## API Reference

### NavigationMenu Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### NavigationMenuTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Prevents interaction |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### NavigationMenuLink Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `false` | Whether this is the active page link |
| `href` | `string` | `undefined` | URL the link points to |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuViewport, NavigationMenuIndicator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

This component does not emit any custom events.

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `NavigationMenu` | `default` | NavigationMenuList. A viewport is automatically appended. |
| `NavigationMenuList` | `default` | NavigationMenuItem elements |
| `NavigationMenuItem` | `default` | Trigger + Content, or a standalone Link |
| `NavigationMenuTrigger` | `default` | Trigger text |
| `NavigationMenuContent` | `default` | Dropdown panel content |
| `NavigationMenuLink` | `default` | Link content |

## Accessibility

### Keyboard Interaction

| Key | Action |
|-----|--------|
| `Tab` | Moves focus between top-level items |
| `Enter` / `Space` | Opens a trigger's content panel |
| `ArrowDown` | Moves focus into the content panel |
| `ArrowRight` / `ArrowLeft` | Moves focus between top-level items |
| `Escape` | Closes the open content panel |

### ARIA Attributes

- Root renders with `role="navigation"` semantics
- Triggers have `aria-expanded` and `aria-haspopup` attributes
- Content panels are associated with their triggers
- Active links have `aria-current="page"` when the `active` prop is set
- The viewport animates content transitions smoothly

## Related

- [Breadcrumb](/components/breadcrumb) -- For hierarchical location navigation
- [Tabs](/components/tabs) -- For content panel switching
- [Menubar](/components/menubar) -- For application-style menu bars
- [Dropdown Menu](/components/dropdown-menu) -- For action menus
