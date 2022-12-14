'use client'

import clsx from 'clsx'

import Img from '@/components/_shared/image'

import type { EnrichedPokemonDetail } from '../types'
import { catchPokemon, useCatchStatus } from './_store'
import styles from './_styles.module.css'

const IMAGE_SIZE = 192

type PokemonImageProps = Pick<EnrichedPokemonDetail, 'image' | 'pokemonName'>

export default function PokemonImage({
  image,
  pokemonName,
}: PokemonImageProps) {
  const isCatching = useCatchStatus() === 'catching'

  return (
    <button
      className={clsx(styles['pokemon-button'], {
        [styles['pokemon-button_catching']]: isCatching,
      })}
      onClick={catchPokemon}
      title={`Catch ${pokemonName}`}
      type='button'
    >
      <div className={styles['pokemon-button__ball']}>
        <div className={styles['pokemon-button__ball__shadow']} />
      </div>
      <Img
        key={`${isCatching}`}
        alt={pokemonName}
        className='w-full h-full transition-transform'
        height={IMAGE_SIZE}
        loading='eager'
        priority
        src={isCatching ? IMAGE_FALLBACK : image}
        style={{ height: 'auto', maxWidth: '100%', objectFit: 'contain' }}
        width={IMAGE_SIZE}
      />
      <span className='sr-only'>{`Catch ${pokemonName}`}</span>
    </button>
  )
}
