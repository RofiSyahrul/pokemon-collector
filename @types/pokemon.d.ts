/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pokemon
// ====================================================

export interface pokemon_pokemon_abilities_ability {
  name: string | null;
}

export interface pokemon_pokemon_abilities {
  ability: pokemon_pokemon_abilities_ability | null;
}

export interface pokemon_pokemon_types_type {
  name: string | null;
}

export interface pokemon_pokemon_types {
  type: pokemon_pokemon_types_type | null;
}

export interface pokemon_pokemon_moves_move {
  name: string | null;
}

export interface pokemon_pokemon_moves {
  move: pokemon_pokemon_moves_move | null;
}

export interface pokemon_pokemon {
  id: number | null;
  name: string | null;
  height: number | null;
  weight: number | null;
  abilities: (pokemon_pokemon_abilities | null)[] | null;
  types: (pokemon_pokemon_types | null)[] | null;
  moves: (pokemon_pokemon_moves | null)[] | null;
}

export interface pokemon {
  pokemon: pokemon_pokemon | null;
}

export interface pokemonVariables {
  name: string;
}
