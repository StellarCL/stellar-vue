import { aldebaran } from './aldebaran'
import { antares } from './antares'
import { polaris } from './polaris'
import { sirius } from './sirius'
import { stellar } from './stellar'
import { vega } from './vega'

export { aldebaran } from './aldebaran'
export { antares } from './antares'
export { polaris } from './polaris'
export { sirius } from './sirius'
export { stellar } from './stellar'
export { vega } from './vega'

export const themes = [stellar, sirius, polaris, antares, vega, aldebaran] as const
export const themeNames = ['stellar', 'sirius', 'polaris', 'antares', 'vega', 'aldebaran'] as const
export type ThemeName = typeof themeNames[number]
