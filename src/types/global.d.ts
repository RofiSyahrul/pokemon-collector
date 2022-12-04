import type { NormalizedCacheObject } from '@apollo/client'

import type pokemonColors from '@/constants/pokemon-colors'

declare module '*.woff' {
  declare const url: string
  export default url
}

declare module '*.woff2' {
  declare const url: string
  export default url
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare const __DEV__: boolean
  declare const BASE_URL: string
  declare const BASE_IMAGE_URL: string
  declare const IMAGE_FALLBACK: string
  declare const GITHUB_URL: string

  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_BASE_IMAGE_URL: string
      NEXT_PUBLIC_IMAGE_FALLBACK: string
    }
  }

  type StorageKey =
    | 'my-pokemons'
    | 'all-pokemons'
    | 'all-pokemons-page'
    | (string & {})

  type AnimationType = 'enter' | 'leave'

  interface Storage {
    getItem(key: StorageKey): string | null
    removeItem(key: StorageKey): void
    setItem(key: StorageKey, value: string): void
  }

  interface PageProps {
    initialApolloState?: NormalizedCacheObject | null
  }

  type PokemonType = keyof typeof pokemonColors

  interface PokemonOverview {
    id: number
    name: string
    image: string
  }

  interface PokemonDetail extends PokemonOverview {
    height: number
    weight: number
    nicknames: string[]
    abilities: string[]
    types: PokemonType[]
    moves: string[]
  }

  interface MyPokemon {
    id: number
    name: string
    nickname: string
    image: string
  }
}
