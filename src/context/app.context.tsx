import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

import produce, { Immutable } from 'immer'

import { getMyPokemons, saveMyPokemons } from '@/lib/pokemons-storage'

type OwnedPokemon = Record<string, number>

type State = {
  myPokemonList: MyPokemon[]
  myPokemonNames: string[]
  ownedPokemon: OwnedPokemon
  isReady: boolean
}

type Action = {
  type: 'INITIATE_MY_POKEMONS' | 'ADD_MY_POKEMON' | 'REMOVE_MY_POKEMON'
  payload?: Partial<{
    pokemon?: MyPokemon
    pokemonList?: MyPokemon[]
  }>
}

type Dispatch = React.Dispatch<Action>

const initialState: State = {
  myPokemonList: [],
  myPokemonNames: [],
  ownedPokemon: {},
  isReady: false,
}

const reducer = produce((draft: State, action: Action) => {
  const { type, payload = {} } = action
  const { pokemon, pokemonList } = payload
  switch (type) {
    case 'INITIATE_MY_POKEMONS':
      if (Array.isArray(pokemonList)) {
        draft.myPokemonList = pokemonList
        draft.myPokemonNames = pokemonList.map(item => item.nickname)
        draft.ownedPokemon = pokemonList.reduce((store: OwnedPokemon, item) => {
          const { name } = item
          store[name] = (store[name] || 0) + 1
          return store
        }, {})
      }
      draft.isReady = true
      return
    case 'ADD_MY_POKEMON':
      if (pokemon) {
        const { ownedPokemon } = draft
        const { name, nickname } = pokemon
        draft.myPokemonList.unshift(pokemon)
        saveMyPokemons(draft.myPokemonList)
        draft.myPokemonNames.unshift(nickname)
        draft.ownedPokemon[name] = (ownedPokemon[name] || 0) + 1
      }
      return
    case 'REMOVE_MY_POKEMON':
      if (pokemon && pokemon.nickname) {
        const { myPokemonList, myPokemonNames, ownedPokemon } = draft
        const { nickname } = pokemon
        const idxList = myPokemonList.findIndex(
          item => item.nickname === nickname
        )
        const idxName = myPokemonNames.indexOf(nickname)
        if (idxList < 0 || idxName < 0) return
        const { name } = myPokemonList[idxList] || {}
        draft.myPokemonList.splice(idxList, 1)
        draft.myPokemonNames.splice(idxName, 1)
        const owned = ownedPokemon[name]
        if (owned > 0) {
          draft.ownedPokemon[name] = owned - 1
        }
        saveMyPokemons(draft.myPokemonList)
      }
      return
    default:
      throw new Error('Unknown action types')
  }
})

const AppStateContext = createContext(initialState as Immutable<State>)

const AppDispatchContext = createContext<Dispatch>(() => {})

export function useAppState(): Immutable<State> {
  return useContext(AppStateContext)
}

export function useAppDispatch(): Dispatch {
  return useContext(AppDispatchContext)
}

function useApp() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const contextValue = useMemo(() => ({ state, dispatch }), [state])

  useEffect(() => {
    const myPokemonListFromStorage = getMyPokemons()
    localStorage.removeItem('all-pokemons')
    localStorage.removeItem('all-pokemons-page')
    dispatch({
      type: 'INITIATE_MY_POKEMONS',
      payload: { pokemonList: myPokemonListFromStorage },
    })
  }, [])

  return contextValue
}

export const AppProvider: React.FC = ({ children }) => {
  const { state, dispatch } = useApp()
  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  )
}
