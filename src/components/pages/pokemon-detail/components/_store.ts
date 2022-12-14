import { useEffect } from 'react'

import create from 'zustand'

import { useMyPokemonList } from '@/store/app.store'
import { delay } from '@/utils/delay'

type CatchStatus = 'idle' | 'failed' | 'success' | 'catching'

type State = {
  activeTab: string
  catchStatus: CatchStatus
  pokemonNicknames: string[]
}

type Action = {
  catchPokemon(): void
  resetCatchStatus(): void
  setActiveTab(tabName: string): void
  setPokemonNicknames(nicknames: string[]): void
}

const CATCH_DELAY = 500
const SUCCESS_PROBABILITY = 0.5

const useStore = create<State & Action>(set => ({
  activeTab: 'about',
  catchStatus: 'idle',
  pokemonNicknames: [],
  catchPokemon() {
    set({ catchStatus: 'catching' })
    delay(CATCH_DELAY).then(() => {
      const isSuccess = Math.random() < SUCCESS_PROBABILITY
      set({ catchStatus: isSuccess ? 'success' : 'failed' })
    })
  },
  resetCatchStatus() {
    set({ catchStatus: 'idle' })
  },
  setActiveTab(tabName) {
    set({ activeTab: tabName })
  },
  setPokemonNicknames(nicknames) {
    set({ pokemonNicknames: nicknames })
  },
}))

const { catchPokemon, resetCatchStatus, setActiveTab, setPokemonNicknames } =
  useStore.getState()

export { catchPokemon, resetCatchStatus, setActiveTab }

export const useCatchStatus = () => useStore(store => store.catchStatus)

export const useActiveTab = () => useStore(store => store.activeTab)

export const usePokemonNicknames = () =>
  useStore(store => store.pokemonNicknames)

export function useInitMyPokemons(pokemonName: string) {
  const myPokemonList = useMyPokemonList()

  useEffect(() => {
    const pokemonNicknames = myPokemonList
      .filter(item => item.name === pokemonName)
      .map(item => item.nickname)
    setPokemonNicknames(pokemonNicknames)
  }, [myPokemonList, pokemonName])
}
