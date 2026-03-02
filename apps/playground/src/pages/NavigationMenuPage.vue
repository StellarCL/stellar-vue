<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@stellar-vue-ui/core'
import DemoSection from '../components/DemoSection.vue'
import PageHeader from '../components/PageHeader.vue'

const components = [
  {
    title: 'Alert Dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    description: 'Displays an indicator showing the completion progress of a task.',
  },
  {
    title: 'Scroll Area',
    description: 'Augments native scroll functionality for custom, cross-browser styling.',
  },
  {
    title: 'Tabs',
    description: 'A set of layered sections of content, known as tab panels.',
  },
  {
    title: 'Tooltip',
    description: 'A popup that displays information related to an element when hovered.',
  },
]
</script>

<template>
  <div>
    <PageHeader
      title="Navigation Menu"
      description="A collection of links for navigating websites, with support for trigger-content panels like mega-menus."
    />

    <div class="px-8 py-8 space-y-10">
      <!-- Basic Navigation Menu -->
      <DemoSection
        title="Navigation Menu"
        description="A navigation menu with trigger-content panels and standalone links."
      >
        <NavigationMenu>
          <NavigationMenuList>
            <!-- Getting Started -->
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div class="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-[.75fr_1fr]">
                  <div
                    class="row-span-3 rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 flex flex-col justify-end"
                  >
                    <div class="mb-2 text-lg font-medium text-foreground">Stellar UI</div>
                    <p class="text-sm text-muted-foreground leading-tight">
                      Beautifully designed components built with Radix Vue and Tailwind CSS.
                    </p>
                  </div>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium text-foreground leading-none mb-1">
                      Introduction
                    </div>
                    <p class="text-sm text-muted-foreground line-clamp-2">
                      Re-usable components built using Radix Vue and Tailwind CSS.
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium text-foreground leading-none mb-1">
                      Installation
                    </div>
                    <p class="text-sm text-muted-foreground line-clamp-2">
                      How to install dependencies and structure your app.
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#">
                    <div class="text-sm font-medium text-foreground leading-none mb-1">
                      Typography
                    </div>
                    <p class="text-sm text-muted-foreground line-clamp-2">
                      Styles for headings, paragraphs, lists, and more.
                    </p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <!-- Components -->
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li v-for="comp in components" :key="comp.title">
                    <NavigationMenuLink href="#">
                      <div class="text-sm font-medium text-foreground leading-none mb-1">
                        {{ comp.title }}
                      </div>
                      <p class="text-sm text-muted-foreground line-clamp-2">
                        {{ comp.description }}
                      </p>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <!-- Standalone Link -->
            <NavigationMenuItem>
              <NavigationMenuLink href="#" :active="false"> Documentation </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuIndicator />
        </NavigationMenu>
      </DemoSection>

      <!-- Simple Link Navigation -->
      <DemoSection
        title="Link-Only Navigation"
        description="A simpler navigation menu with only link items and no dropdown content."
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" :active="true"> Home </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#"> About </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#"> Products </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#"> Contact </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </DemoSection>
    </div>
  </div>
</template>
