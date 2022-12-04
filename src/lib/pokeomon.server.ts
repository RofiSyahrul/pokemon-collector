import { POKEMON, POKEMONS } from '@/graph-query/pokemon'
import type {
  pokemon_pokemon as PokemonDetailResponse,
  pokemon as Pokemon,
  pokemonVariables as PokemonVariables,
} from '@/types/pokemon'
import type {
  pokemons as Pokemons,
  pokemonsVariables as PokemonsVariables,
} from '@/types/pokemons'
import getDefaultID from '@/utils/get-default-id'

import { initializeApollo } from './apollo-client'

export interface PokemonListAndCache extends PageProps {
  pokemons: PokemonOverview[]
  isError: boolean
}

const PAGE_SIZE = 24
const DEFAULT_ID_OFFSET = 10_000

export async function fetchTotalPokemons(): Promise<{
  total: number
  totalPage: number
}> {
  const client = initializeApollo()
  try {
    const { data } = await client.query<Pokemons, PokemonsVariables>({
      query: POKEMONS,
      variables: { limit: 1, offset: 0 },
    })
    const count = data.pokemons?.count ?? 0
    return { total: count, totalPage: Math.ceil(count / PAGE_SIZE) }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      `Failed to fetch total pokemon pages. Error: ${(error as Error).message}`
    )
    return { total: 0, totalPage: 0 }
  }
}

export async function fetchPokemons(page = 1): Promise<PokemonListAndCache> {
  const client = initializeApollo()
  const offset = (page - 1) * PAGE_SIZE
  try {
    const { data } = await client.query<Pokemons, PokemonsVariables>({
      query: POKEMONS,
      variables: { limit: PAGE_SIZE, offset },
    })

    const pokemons = (data.pokemons?.results ?? []).map<PokemonOverview>(
      pokemon => ({
        id: pokemon?.id ?? getDefaultID(DEFAULT_ID_OFFSET),
        image: pokemon?.image ?? '',
        name: pokemon?.name ?? '',
      })
    )

    return {
      initialApolloState: client.cache.extract(),
      isError: false,
      pokemons,
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      `Failed to fetch pokemons at page ${page}. Error: ${
        (error as Error).message
      }`
    )
    return {
      initialApolloState: client.cache.extract(),
      isError: true,
      pokemons: [],
    }
  }
}

export async function fetchAllPokemonNames(): Promise<string[]> {
  const client = initializeApollo()
  try {
    const { total } = await fetchTotalPokemons()
    const { data } = await client.query<Pokemons, PokemonsVariables>({
      query: POKEMONS,
      variables: { limit: total, offset: 0 },
    })
    return (data.pokemons?.results ?? []).map(pokemon => pokemon?.name ?? '')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      `Failed to fetch total pokemon names. Error: ${(error as Error).message}`
    )
    return []
  }
}

const defaultPokemonDetailResponse: PokemonDetailResponse = {
  abilities: null,
  height: null,
  id: null,
  moves: null,
  name: null,
  types: null,
  weight: null,
}

export async function fetchPokemonDetail(
  name: string
): Promise<PokemonDetailResponse> {
  const client = initializeApollo()
  try {
    const { data } = await client.query<Pokemon, PokemonVariables>({
      query: POKEMON,
      variables: { name },
    })

    return data?.pokemon ?? defaultPokemonDetailResponse
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      `Failed to fetch total pokemon detail with name ${name}. Error: ${
        (error as Error).message
      }`
    )
    return defaultPokemonDetailResponse
  }
}

export type { PokemonDetailResponse }
