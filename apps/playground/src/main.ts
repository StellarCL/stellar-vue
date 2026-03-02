import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles.css'

// Route definitions
const routes = [
  { path: '/', redirect: '/button' },

  // General
  { path: '/button', component: () => import('./pages/ButtonPage.vue') },
  { path: '/badge', component: () => import('./pages/BadgePage.vue') },
  { path: '/separator', component: () => import('./pages/SeparatorPage.vue') },
  { path: '/skeleton', component: () => import('./pages/SkeletonPage.vue') },
  { path: '/avatar', component: () => import('./pages/AvatarPage.vue') },
  { path: '/empty-state', component: () => import('./pages/EmptyStatePage.vue') },
  { path: '/loading', component: () => import('./pages/LoadingPage.vue') },

  // Layout
  { path: '/card', component: () => import('./pages/CardPage.vue') },
  { path: '/alert', component: () => import('./pages/AlertPage.vue') },
  { path: '/grid', component: () => import('./pages/GridPage.vue') },
  { path: '/stack', component: () => import('./pages/StackPage.vue') },
  { path: '/shell', component: () => import('./pages/ShellPage.vue') },
  { path: '/sidebar', component: () => import('./pages/SidebarPage.vue') },

  // Form
  { path: '/input', component: () => import('./pages/InputPage.vue') },
  { path: '/label', component: () => import('./pages/LabelPage.vue') },
  { path: '/textarea', component: () => import('./pages/TextareaPage.vue') },
  { path: '/checkbox', component: () => import('./pages/CheckboxPage.vue') },
  { path: '/radio-group', component: () => import('./pages/RadioGroupPage.vue') },
  { path: '/switch', component: () => import('./pages/SwitchPage.vue') },
  { path: '/select', component: () => import('./pages/SelectPage.vue') },
  { path: '/combobox', component: () => import('./pages/ComboboxPage.vue') },
  { path: '/multi-select', component: () => import('./pages/MultiSelectPage.vue') },
  { path: '/slider', component: () => import('./pages/SliderPage.vue') },
  { path: '/color-picker', component: () => import('./pages/ColorPickerPage.vue') },
  { path: '/date-picker', component: () => import('./pages/DatePickerPage.vue') },
  { path: '/calendar', component: () => import('./pages/CalendarPage.vue') },
  { path: '/file-upload', component: () => import('./pages/FileUploadPage.vue') },
  { path: '/rating', component: () => import('./pages/RatingPage.vue') },
  { path: '/filter-builder', component: () => import('./pages/FilterBuilderPage.vue') },
  { path: '/form', component: () => import('./pages/FormPage.vue') },

  // Navigation
  { path: '/tabs', component: () => import('./pages/TabsPage.vue') },
  { path: '/accordion', component: () => import('./pages/AccordionPage.vue') },
  { path: '/breadcrumb', component: () => import('./pages/BreadcrumbPage.vue') },
  { path: '/menubar', component: () => import('./pages/MenubarPage.vue') },
  { path: '/navigation-menu', component: () => import('./pages/NavigationMenuPage.vue') },
  { path: '/pagination', component: () => import('./pages/PaginationPage.vue') },
  { path: '/stepper', component: () => import('./pages/StepperPage.vue') },

  // Overlay
  { path: '/dialog', component: () => import('./pages/DialogPage.vue') },
  { path: '/dropdown-menu', component: () => import('./pages/DropdownMenuPage.vue') },
  { path: '/popover', component: () => import('./pages/PopoverPage.vue') },
  { path: '/tooltip', component: () => import('./pages/TooltipPage.vue') },
  { path: '/command', component: () => import('./pages/CommandPage.vue') },
  { path: '/context-menu', component: () => import('./pages/ContextMenuPage.vue') },
  { path: '/drawer', component: () => import('./pages/DrawerPage.vue') },
  { path: '/sheet', component: () => import('./pages/SheetPage.vue') },
  { path: '/toast', component: () => import('./pages/ToastPage.vue') },

  // Data Display
  { path: '/progress', component: () => import('./pages/ProgressPage.vue') },
  { path: '/data-table', component: () => import('./pages/DataTablePage.vue') },
  { path: '/code-block', component: () => import('./pages/CodeBlockPage.vue') },
  { path: '/chart', component: () => import('./pages/ChartPage.vue') },
  { path: '/timeline', component: () => import('./pages/TimelinePage.vue') },
  { path: '/tree-view', component: () => import('./pages/TreeViewPage.vue') },
  { path: '/notification-center', component: () => import('./pages/NotificationCenterPage.vue') },
  { path: '/carousel', component: () => import('./pages/CarouselPage.vue') },

  // Composite
  { path: '/wizard', component: () => import('./pages/WizardPage.vue') },
  { path: '/rich-text-editor', component: () => import('./pages/RichTextEditorPage.vue') },

  // Overview
  { path: '/themes', component: () => import('./pages/ThemesPage.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
