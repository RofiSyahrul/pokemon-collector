'use client'

import clsx from 'clsx'
import Image from 'next/legacy/image'

import type { EnrichedPokemonDetail } from '../types'
import { catchPokemon, useCatchStatus } from './_store'

const IMAGE_SIZE = 192
const IMAGE_FALLBACK_SIZE = 100

type PokemonImageProps = Pick<EnrichedPokemonDetail, 'image' | 'pokemonName'>

export default function PokemonImage({
  image,
  pokemonName,
}: PokemonImageProps) {
  const isCatching = useCatchStatus() === 'catching'

  return (
    <button
      className={clsx(
        'w-36 h-36 lg:w-48 lg:h-48 absolute bottom-full left-1/2',
        '-translate-x-1/2 translate-y-[40%] bg-transparent z-10 btn btn-text'
      )}
      onClick={catchPokemon}
      title={`Catch ${pokemonName}`}
      type='button'
    >
      <Image
        key={`${isCatching}`}
        alt={pokemonName}
        className={clsx(
          'w-full h-full transition-transform',
          isCatching ? 'animate-pokeball' : 'hover:scale-150'
        )}
        height={isCatching ? IMAGE_FALLBACK_SIZE : IMAGE_SIZE}
        layout='intrinsic'
        loading='eager'
        objectFit='contain'
        priority
        src={isCatching ? IMAGE_FALLBACK : image}
        width={isCatching ? IMAGE_FALLBACK_SIZE : IMAGE_SIZE}
      />
      <span className='sr-only'>{`Catch ${pokemonName}`}</span>
    </button>
  )
}
