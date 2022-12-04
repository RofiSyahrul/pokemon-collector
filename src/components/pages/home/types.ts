import type { ParsedUrlQuery } from 'querystring'

import type { PokemonListAndCache } from '@/lib/pokeomon.server'

export type HomeProps = Pick<PokemonListAndCache, 'pokemons'> & {
  totalPage: number
}

export interface HomepageParams extends ParsedUrlQuery {
  page: string | string[]
}
