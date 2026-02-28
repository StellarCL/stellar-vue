import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles.css'

// Route definitions
const routes = [
  { path: '/', redirect: '/button' },
  { path: '/button', component: () => import('./pages/ButtonPage.vue') },
  { path: '/input', component: () => import('./pages/InputPage.vue') },
  { path: '/label', component: () => import('./pages/LabelPage.vue') },
  { path: '/card', component: () => import('./pages/CardPage.vue') },
  { path: '/dialog', component: () => import('./pages/DialogPage.vue') },
  { path: '/dropdown-menu', component: () => import('./pages/DropdownMenuPage.vue') },
  { path: '/select', component: () => import('./pages/SelectPage.vue') },
  { path: '/checkbox', component: () => import('./pages/CheckboxPage.vue') },
  { path: '/radio-group', component: () => import('./pages/RadioGroupPage.vue') },
  { path: '/switch', component: () => import('./pages/SwitchPage.vue') },
  { path: '/textarea', component: () => import('./pages/TextareaPage.vue') },
  { path: '/alert', component: () => import('./pages/AlertPage.vue') },
  { path: '/badge', component: () => import('./pages/BadgePage.vue') },
  { path: '/separator', component: () => import('./pages/SeparatorPage.vue') },
  { path: '/skeleton', component: () => import('./pages/SkeletonPage.vue') },
  { path: '/themes', component: () => import('./pages/ThemesPage.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
