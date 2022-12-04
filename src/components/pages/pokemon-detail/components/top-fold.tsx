import type { FC } from 'react'

import clsx from 'clsx'
import { useRouter } from 'next/router'

import ArrowIcon from '@/icons/arrow'
import getPokemonBg from '@/utils/styles/get-pokemon-bg'
import getPokemonColor from '@/utils/styles/get-pokemon-color'

interface TopFoldProps {
  onClickCatch: () => void
  pokemonFirstType: PokemonType
  pokemonName: string
  pokemonTypes: PokemonType[]
}

const TopFold: FC<TopFoldProps> = ({
  onClickCatch,
  pokemonFirstType,
  pokemonName,
  pokemonTypes,
}) => {
  const router = useRouter()

  return (
    <section className='w-full px-2 py-4 flex gap-2'>
      <button
        className='btn text-inherit w-8 h-8'
        onClick={router.back}
        style={{ padding: 0 }}
        title='Go back'
        type='button'
      >
        <ArrowIcon className='w-8 h-8' />
        <span className='sr-only'>Go back</span>
      </button>
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
      <button
        className={clsx(
          'btn rounded-full bg-opacity-80 h-12 hover:shadow-lg',
          getPokemonBg(pokemonFirstType, 'inversed'),
          getPokemonColor(pokemonFirstType)
        )}
        onClick={onClickCatch}
        type='button'
      >
        Catch me
      </button>
    </section>
  )
}

export default TopFold
