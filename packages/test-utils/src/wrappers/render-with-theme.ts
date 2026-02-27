import { mount, type MountingOptions } from '@vue/test-utils'
import { type Component, type ComponentPublicInstance } from 'vue'

export type ThemeName = 'stellar' | 'sirius' | 'polaris' | 'antares' | 'vega' | 'aldebaran'

export interface RenderWithThemeOptions<Props> extends MountingOptions<Props> {
  /**
   * The theme name to apply. Defaults to 'stellar'.
   */
  theme?: ThemeName
  /**
   * Whether to enable dark mode. Defaults to false.
   */
  dark?: boolean
}

/**
 * Wraps @vue/test-utils mount() with theme provider context.
 * Sets the data-theme attribute and dark class on document.documentElement,
 * then returns the standard VTU wrapper.
 *
 * @example
 * const wrapper = renderWithTheme(Button, { props: { variant: 'default' }, theme: 'sirius', dark: true })
 */
export function renderWithTheme<
  T extends Component,
  Props = T extends new (...args: any[]) => ComponentPublicInstance<infer P, any, any, any, any> ? P : Record<string, unknown>,
>(
  component: T,
  options: RenderWithThemeOptions<Props> = {},
): ReturnType<typeof mount<T>> {
  const { theme = 'stellar', dark = false, ...mountOptions } = options

  // Apply theme attribute to document root
  document.documentElement.setAttribute('data-theme', theme)

  // Apply dark mode class
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  return mount<T>(component, mountOptions as MountingOptions<Props>)
}
