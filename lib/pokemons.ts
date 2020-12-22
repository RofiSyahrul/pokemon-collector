import { initializeApollo } from 'lib/apollo-client'
import { cast } from 'lib/helpers'
import { POKEMONS } from 'graph-query/pokemon'
import { pokemons, pokemonsVariables } from 'types/pokemons'

export interface PokemonListAndCache extends PageProps {
  allPokemonList: PokemonOverview[]
  isError?: boolean
}

export async function fetchAllPokemons(): Promise<PokemonListAndCache> {
  const client = initializeApollo()
  try {
    let { data } = await client.query<pokemons, pokemonsVariables>({
      query: POKEMONS,
      variables: { limit: 1, offset: 0 },
    })
    const count = data?.pokemons?.count || 1
    if (count > 1) {
      ;({ data } = await client.query<pokemons, pokemonsVariables>({
        query: POKEMONS,
        variables: { limit: count, offset: 0 },
      }))
    }
    const { results } = data?.pokemons || {}
    return {
      initialApolloState: client.cache.extract(),
      allPokemonList: (results || []) as PokemonOverview[],
      isError: false,
    }
  } catch {
    return {
      initialApolloState: client.cache.extract(),
      allPokemonList: [],
      isError: true,
    }
  }
}

export function saveAllPokemons(list: PokemonOverview[]): void {
  localStorage.setItem('all-pokemons', JSON.stringify(list))
}

export function saveMyPokemons(list: MyPokemon[]): void {
  localStorage.setItem('my-pokemons', JSON.stringify(list))
}

function getListFromStorage<T = unknown>(key: StorageKey): T[] {
  const list = cast(localStorage.getItem(key) || '[]')
  if (Array.isArray(list)) return list
  return []
}

export function getAllPokemons(): PokemonOverview[] {
  return getListFromStorage('all-pokemons')
}

export function getMyPokemons(): MyPokemon[] {
  return getListFromStorage('my-pokemons')
}
