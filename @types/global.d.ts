import { NormalizedCacheObject } from '@apollo/client'

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

  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_BASE_IMAGE_URL: string
    }
  }

  type StorageKey =
    | 'my-pokemons'
    | 'pokemons-page'
    | 'my-pokemons-page'
    | (string & {})

  interface Storage {
    getItem(key: StorageKey): string | null
    removeItem(key: StorageKey): void
    setItem(key: StorageKey, value: string): void
  }

  interface PageProps {
    initialApolloState?: NormalizedCacheObject | null
  }
}
