import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Stellar Vue UI',
  description: 'A modern, accessible, and themeable component library for Vue 3',

  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Components', link: '/components/button' },
      { text: 'Composables', link: '/composables/' },
      {
        text: 'GitHub',
        link: 'https://github.com/StellarCL/stellar-vue',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quickstart' },
          ],
        },
        {
          text: 'Essentials',
          items: [
            { text: 'Theming', link: '/guide/theming' },
            { text: 'Dark Mode', link: '/guide/dark-mode' },
            { text: 'Accessibility', link: '/guide/accessibility' },
            { text: 'CLI', link: '/guide/cli' },
          ],
        },
      ],

      '/components/': [
        {
          text: 'General',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Separator', link: '/components/separator' },
            { text: 'Skeleton', link: '/components/skeleton' },
          ],
        },
        {
          text: 'Layout',
          items: [
            { text: 'Card', link: '/components/card' },
            { text: 'Alert', link: '/components/alert' },
          ],
        },
        {
          text: 'Form',
          items: [
            { text: 'Input', link: '/components/input' },
            { text: 'Textarea', link: '/components/textarea' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Radio Group', link: '/components/radio-group' },
            { text: 'Switch', link: '/components/switch' },
            { text: 'Select', link: '/components/select' },
            { text: 'Slider', link: '/components/slider' },
            { text: 'Label', link: '/components/label' },
            { text: 'Form', link: '/components/form' },
          ],
        },
        {
          text: 'Overlay',
          items: [
            { text: 'Dialog', link: '/components/dialog' },
            { text: 'Popover', link: '/components/popover' },
            { text: 'Tooltip', link: '/components/tooltip' },
            { text: 'Dropdown Menu', link: '/components/dropdown-menu' },
            { text: 'Context Menu', link: '/components/context-menu' },
            { text: 'Command', link: '/components/command' },
          ],
        },
        {
          text: 'Navigation',
          items: [
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Accordion', link: '/components/accordion' },
            { text: 'Breadcrumb', link: '/components/breadcrumb' },
            { text: 'Menubar', link: '/components/menubar' },
            { text: 'Navigation Menu', link: '/components/navigation-menu' },
            { text: 'Pagination', link: '/components/pagination' },
            { text: 'Stepper', link: '/components/stepper' },
          ],
        },
        {
          text: 'Data Display',
          items: [
            { text: 'Avatar', link: '/components/avatar' },
            { text: 'Progress', link: '/components/progress' },
            { text: 'Data Table', link: '/components/data-table' },
          ],
        },
        {
          text: 'Composite',
          items: [
            { text: 'Wizard', link: '/components/wizard' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/StellarCL/stellar-vue' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright 2026 Terry McCann',
    },
  },
})
