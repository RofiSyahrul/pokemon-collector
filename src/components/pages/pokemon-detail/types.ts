import { ParsedUrlQuery } from 'querystring'

export interface EnrichedPokemonDetail
  extends Omit<PokemonDetail, 'abilities' | 'height' | 'weight'> {
  ability: string
  abilityTitle: string
  description: string
  firstType: PokemonType
  height: string
  pokemonName: string
  weight: string
}

export interface PokemonDetailPageProps {
  pokemonDetail: EnrichedPokemonDetail
}

export interface PokemonDetailPageParams extends ParsedUrlQuery {
  name: string | string[]
}
