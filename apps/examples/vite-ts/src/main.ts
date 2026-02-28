import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Set the active theme attribute so useTheme composable and data-theme selectors
// are aligned from the initial render.
document.documentElement.setAttribute('data-theme', 'stellar')

createApp(App).mount('#app')
