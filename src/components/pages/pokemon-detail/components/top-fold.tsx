import type { FC } from 'react'

import clsx from 'clsx'

import getPokemonBg from '@/utils/styles/get-pokemon-bg'
import getPokemonColor from '@/utils/styles/get-pokemon-color'

import BackButton from './back-button'
import CatchButton from './catch-button'

interface TopFoldProps {
  pokemonFirstType: PokemonType
  pokemonName: string
  pokemonTypes: PokemonType[]
}

const TopFold: FC<TopFoldProps> = ({
  pokemonFirstType,
  pokemonName,
  pokemonTypes,
}) => {
  return (
    <section className='w-full px-2 py-4 flex gap-2'>
      <BackButton />
      <div className='flex-1 w-full flex flex-col gap-2'>
        <h1
          className={clsx(
            'text-4xl font-bold break-words',
            getPokemonColor(pokemonFirstType, 'inversed')
          )}
        >
          {pokemonName}
        </h1>
        <div className='flex flex-wrap gap-1'>
          {pokemonTypes.map((pokemonType, index) => (
            <div
              key={`${pokemonType}-${index}`}
              className={clsx(
                'flex items-center w-fit h-6 px-1 rounded-tr-lg rounded-bl-lg text-sm',
                index === 0 && 'border border-solid',
                getPokemonColor(pokemonType, 'inversed-with-border'),
                getPokemonBg(pokemonType)
              )}
            >
              {pokemonType}
            </div>
          ))}
        </div>
      </div>
      <CatchButton
        className={clsx(
          'btn rounded-full bg-opacity-80 h-12 hover:shadow-lg',
          getPokemonBg(pokemonFirstType, 'inversed'),
          getPokemonColor(pokemonFirstType)
        )}
      />
    </section>
  )
}

export default TopFold
