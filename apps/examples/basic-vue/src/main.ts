import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Set the active theme attribute on the root element so data-theme-aware
// CSS selectors and the useTheme composable are aligned from the start.
document.documentElement.setAttribute('data-theme', 'stellar')

createApp(App).mount('#app')
