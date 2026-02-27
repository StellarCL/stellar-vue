import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/button', component: () => import('./pages/ButtonPage.vue') },
    { path: '/dialog', component: () => import('./pages/DialogPage.vue') },
    { path: '/form-inputs', component: () => import('./pages/FormInputsPage.vue') },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
