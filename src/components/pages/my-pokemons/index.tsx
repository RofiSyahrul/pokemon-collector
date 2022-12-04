'use client'

import type { ReactNode } from 'react'

import clsx from 'clsx'

import PokemonCard from '@/components/_shared/pokemon-card'
import { useAppIsReady, useMyPokemonList } from '@/store/app.store'

interface MyPokemonPageProps {
  loadingPlaceholder: ReactNode
}

export default function MyPokemonsPage({
  loadingPlaceholder,
}: MyPokemonPageProps) {
  const isReady = useAppIsReady()
  const myPokemonList = useMyPokemonList()

  if (!isReady) return <>{loadingPlaceholder}</>

  if (myPokemonList.length === 0) {
    return (
      <main
        className={clsx(
          'h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)]',
          'w-full flex flex-col justify-center items-center'
        )}
      >
        <h1 className='text-4xl font-bold'>
          You haven&apos;t catch any pokemons
        </h1>
      </main>
    )
  }

  return (
    <main className='w-full p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 grid-flow-row'>
      {myPokemonList.map(({ id, image, name, nickname }) => (
        <PokemonCard
          href={`/${name}`}
          id={id}
          key={`${nickname}-${id}`}
          image={image}
          name={name}
          nickname={nickname}
          variant='my-pokemon'
        />
      ))}
    </main>
  )
}
