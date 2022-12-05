import PokemonListPage from '@/components/pages/pokemon-list'
import { fetchPokemons, fetchTotalPokemons } from '@/lib/pokeomon.server'

export const dynamic = 'error'

export default async function Page() {
  const { totalPage } = await fetchTotalPokemons()
  const { pokemons } = await fetchPokemons()

  return <PokemonListPage page={1} pokemons={pokemons} totalPage={totalPage} />
}
