import type { InjectionKey, Ref } from 'vue'

export interface SidebarContext {
  collapsed: Ref<boolean>
  collapsible: boolean
  width: string
  collapsedWidth: string
  toggle: () => void
}

export const SIDEBAR_INJECTION_KEY: InjectionKey<SidebarContext> = Symbol('sidebar')
