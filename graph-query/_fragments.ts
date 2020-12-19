import { gql } from '@apollo/client'

export const BASE_NAME = gql`
  fragment BaseName on BaseName {
    name
  }
`

export const POKEMON_ITEM = gql`
  fragment PokemonItem on PokemonItem {
    name
    image
    id
  }
`
