'use client'

import { usePathname } from 'next/navigation'

import Header from '@/components/_shared/header'

export default function PokemonListHeader() {
  const pathname = usePathname()

  return (
    <Header activeLink={pathname === '/my-pokemons' ? 'my-pokemons' : 'home'} />
  )
}
