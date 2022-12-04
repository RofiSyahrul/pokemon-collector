import type { FC } from 'react'

import PokemonCard from '@/components/_shared/pokemon-card'
import type { PokemonListAndCache } from '@/lib/pokeomon.server'

interface PokemonListPageProps extends Pick<PokemonListAndCache, 'pokemons'> {
  totalPage: number
  page?: number
}

const TOTAL_PRIORITIZED_IMAGE = 7

const PokemonListPage: FC<PokemonListPageProps> = ({ pokemons }) => {
  return (
    <main className='w-full p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 grid-flow-row'>
      {pokemons.map(({ id, image, name }, index) => (
        <PokemonCard
          href={`/${name}`}
          id={id}
          key={`${id}-${name}`}
          image={image}
          name={name}
          priority={index < TOTAL_PRIORITIZED_IMAGE}
        />
      ))}
    </main>
  )
}

export default PokemonListPage
