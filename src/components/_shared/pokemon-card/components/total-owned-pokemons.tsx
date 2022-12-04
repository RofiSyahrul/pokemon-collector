'use client'

import type { ReactNode } from 'react'

import { useAppState } from '@/context/app.context'

import styles from '../_styles.module.css'

interface Props {
  loadingPlaceholder: ReactNode
  name: string
}

export default function TotalOwnedPokemons({
  loadingPlaceholder,
  name,
}: Props) {
  const { isReady, ownedPokemon } = useAppState()

  return (
    <>
      {isReady ? (
        <div className={styles.card__label}>{`Owned: ${
          ownedPokemon[name] ?? 0
        }`}</div>
      ) : (
        loadingPlaceholder
      )}
    </>
  )
}
