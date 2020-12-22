import { ThemeType } from 'goods-core'

export type AdditionalColors = {
  normal: string
  fire: string
  water: string
  electric: string
  grass: string
  ice: string
  fighting: string
  poison: string
  ground: string
  flying: string
  psychic: string
  bug: string
  rock: string
  ghost: string
  dragon: string
  dark: string
  steel: string
  fairy: string
  unknown: string
  shadow: string
}

declare module 'styled-components' {
  interface DefaultTheme {
    colors: ThemeType['colors'] & AdditionalColors
  }
}
