import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ComponentPreview from '../components/ComponentPreview.vue'
import './stellar.css'
import './custom.css'

const demos = import.meta.glob('../components/demos/*.vue', { eager: true })

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ComponentPreview', ComponentPreview)
    for (const path in demos) {
      const name = path.match(/\/([^/]+)\.vue$/)?.[1]
      if (name) {
        app.component(name, (demos[path] as any).default)
      }
    }
  },
} satisfies Theme
