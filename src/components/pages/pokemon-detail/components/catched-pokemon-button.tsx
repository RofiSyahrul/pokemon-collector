'use client'

import Link from 'next/link'

import { useAppIsReady, useMyPokemonNames } from '@/store/app.store'

import styles from './_styles.module.css'

export default function CatchedPokemonButton() {
  const isReady = useAppIsReady()
  const myPokemonNames = useMyPokemonNames()
  const totalMyPokemon =
    myPokemonNames.length > 99 ? '99+' : myPokemonNames.length

  return (
    <Link href='/my-pokemons' className={styles['catched-pokemon-btn']}>
      <div className={styles['catched-pokemon-btn__badge']}>
        {isReady ? totalMyPokemon : ''}
      </div>
      Owned Pokemons
    </Link>
  )
}
