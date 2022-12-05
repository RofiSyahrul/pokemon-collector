import PokemonListPage from '@/components/pages/pokemon-list'
import { fetchPokemons, fetchTotalPokemons } from '@/lib/pokeomon.server'

import type { PageParams } from './types'

export const dynamicParams = false
export const dynamic = 'error'

export async function generateStaticParams(): Promise<PageParams[]> {
  if (process.env.SKIP_STATIC_PAGES === 'true') return []

  const { totalPage } = await fetchTotalPokemons()
  if (totalPage <= 1) return []

  return Array.from({ length: totalPage - 1 }, (_, index) => ({
    page: `${index + 2}`,
  }))
}

export default async function Page({ params }: AppPageProps<PageParams>) {
  const page = parseInt(params?.page?.toString() ?? '1', 10)
  const { totalPage } = await fetchTotalPokemons()
  const { pokemons } = await fetchPokemons(page)

  return (
    <PokemonListPage page={page} pokemons={pokemons} totalPage={totalPage} />
  )
}
