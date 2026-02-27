export { stellar } from './stellar'
export { sirius } from './sirius'
export { polaris } from './polaris'
export { antares } from './antares'
export { vega } from './vega'
export { aldebaran } from './aldebaran'

import { stellar } from './stellar'
import { sirius } from './sirius'
import { polaris } from './polaris'
import { antares } from './antares'
import { vega } from './vega'
import { aldebaran } from './aldebaran'

export const themes = [stellar, sirius, polaris, antares, vega, aldebaran] as const
export const themeNames = ['stellar', 'sirius', 'polaris', 'antares', 'vega', 'aldebaran'] as const
export type ThemeName = typeof themeNames[number]
