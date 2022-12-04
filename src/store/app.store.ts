import create from 'zustand'

import { getMyPokemons, saveMyPokemons } from '@/lib/pokemons-storage'

type OwnedPokemon = Record<string, number>

type State = {
  isReady: boolean
  myPokemonList: MyPokemon[]
  myPokemonNames: string[]
  ownedPokemon: OwnedPokemon
}

type Action = {
  addMyPokemon(pokemon: MyPokemon): void
  initiateMyPokemons(): void
  removeMyPokemon(nickname: string): void
}

const useAppStore = create<State & Action>((set, get) => ({
  isReady: false,
  myPokemonList: [],
  myPokemonNames: [],
  ownedPokemon: {},
  addMyPokemon(pokemon) {
    const { name, nickname } = pokemon
    const { myPokemonList, myPokemonNames, ownedPokemon } = get()
    myPokemonList.unshift(pokemon)
    saveMyPokemons(myPokemonList)
    myPokemonNames.unshift(nickname)
    ownedPokemon[name] = (ownedPokemon[name] ?? 0) + 1
    set({
      myPokemonList: [...myPokemonList],
      myPokemonNames: [...myPokemonNames],
      ownedPokemon: { ...ownedPokemon },
    })
  },

  initiateMyPokemons() {
    const myPokemonList = getMyPokemons()
    const myPokemonNames = myPokemonList.map(item => item.nickname)
    const ownedPokemon = myPokemonList.reduce((obj: OwnedPokemon, item) => {
      const { name } = item
      obj[name] = (obj[name] ?? 0) + 1
      return obj
    }, {})
    set({ isReady: true, myPokemonList, myPokemonNames, ownedPokemon })
  },

  removeMyPokemon(nickname) {
    if (!nickname) return

    const { myPokemonList, ownedPokemon } = get()
    const myNewPokemonList: MyPokemon[] = []
    const myNewPokemonNames: string[] = []
    let pokemonName = ''

    for (const pokemon of myPokemonList) {
      if (pokemon.nickname === nickname && !pokemonName) {
        pokemonName = pokemon.name
      } else {
        myNewPokemonList.push(pokemon)
        myNewPokemonNames.push(pokemon.nickname)
      }
    }

    const owned = ownedPokemon[pokemonName]
    if (owned > 0) {
      ownedPokemon[pokemonName] = owned - 1
    }

    saveMyPokemons(myNewPokemonList)
    set({
      myPokemonList: myNewPokemonList,
      myPokemonNames: myNewPokemonNames,
      ownedPokemon: { ...ownedPokemon },
    })
  },
}))

export const { addMyPokemon, initiateMyPokemons, removeMyPokemon } =
  useAppStore.getState()

export const useAppIsReady = () => useAppStore(store => store.isReady)
export const useMyPokemonList = () => useAppStore(store => store.myPokemonList)

export const useOwnedPokemon = (name: string) =>
  useAppStore(store => store.ownedPokemon[name] ?? 0)

export const useMyPokemonNames = () =>
  useAppStore(store => store.myPokemonNames)
