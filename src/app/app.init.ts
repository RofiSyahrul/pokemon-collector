'use client'

import { useEffect } from 'react'

import { initiateMyPokemons } from '@/store/app.store'

export default function AppInit() {
  useEffect(() => {
    localStorage.removeItem('all-pokemons')
    localStorage.removeItem('all-pokemons-page')
    initiateMyPokemons()
  }, [])

  return null
}
