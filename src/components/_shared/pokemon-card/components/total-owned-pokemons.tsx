'use client'

import type { ReactNode } from 'react'

import { useAppIsReady, useOwnedPokemon } from '@/store/app.store'

import styles from '../_styles.module.css'

interface Props {
  loadingPlaceholder: ReactNode
  name: string
}

export default function TotalOwnedPokemons({
  loadingPlaceholder,
  name,
}: Props) {
  const isReady = useAppIsReady()
  const owned = useOwnedPokemon(name)

  return (
    <>
      {isReady ? (
        <div className={styles.card__label}>{`Owned: ${owned}`}</div>
      ) : (
        loadingPlaceholder
      )}
    </>
  )
}
