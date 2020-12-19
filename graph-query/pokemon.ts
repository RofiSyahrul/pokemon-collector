import { gql } from '@apollo/client'
import * as fragments from './_fragments'

export const POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      status
      message
      count
      results {
        ...PokemonItem
      }
    }
  }
  ${fragments.POKEMON_ITEM}
`

export const POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      abilities {
        ability {
          ...BaseName
        }
      }
      types {
        type {
          ...BaseName
        }
      }
      moves {
        move {
          ...BaseName
        }
      }
    }
  }
  ${fragments.BASE_NAME}
`
