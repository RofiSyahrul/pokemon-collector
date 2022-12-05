import type { FC } from 'react'

import Pagination from '@/components/_shared/pagination'
import PokemonCard from '@/components/_shared/pokemon-card'
import type { PokemonListAndCache } from '@/lib/pokeomon.server'

interface PokemonListPageProps extends Pick<PokemonListAndCache, 'pokemons'> {
  totalPage: number
  page?: number
}

function buildHref(page: number): string {
  if (page === 1) return '/'
  return `/page/${page}`
}

const PokemonListPage: FC<PokemonListPageProps> = ({
  page = 1,
  pokemons,
  totalPage,
}) => {
  const mainNode = (
    <main className='w-full p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 grid-flow-row'>
      {pokemons.map(({ id, image, name }) => (
        <PokemonCard
          href={`/${name}`}
          id={id}
          key={`${id}-${name}`}
          image={image}
          name={name}
        />
      ))}
    </main>
  )

  return (
    <>
      {mainNode}
      <Pagination
        activePage={page}
        buildHref={buildHref}
        totalPage={totalPage}
      />
    </>
  )
}

export default PokemonListPage
