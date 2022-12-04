import { notFound } from 'next/navigation'

import PokemonDetailPage from '@/components/pages/pokemon-detail'
import fetcher from '@/components/pages/pokemon-detail/fetcher'
import type { PokemonDetailPageParams } from '@/components/pages/pokemon-detail/types'
import { fetchAllPokemonNames } from '@/lib/pokeomon.server'

export const dynamicParams = false

export async function generateStaticParams(): Promise<
  PokemonDetailPageParams[]
> {
  if (process.env.SKIP_STATIC_PAGES === 'true') {
    return []
  }

  const pokemonNames = await fetchAllPokemonNames()
  return pokemonNames.map(name => ({ name }))
}

export default async function Page({
  params,
}: AppPageProps<PokemonDetailPageParams>) {
  const pokemonDetail = await fetcher(params)
  if (!pokemonDetail) {
    notFound()
  }

  return <PokemonDetailPage pokemonDetail={pokemonDetail} />
}
