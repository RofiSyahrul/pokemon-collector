/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pokemons
// ====================================================

export interface pokemons_pokemons_results {
  name: string | null;
  image: string | null;
  id: number | null;
}

export interface pokemons_pokemons {
  status: boolean | null;
  message: string | null;
  count: number | null;
  results: (pokemons_pokemons_results | null)[] | null;
}

export interface pokemons {
  pokemons: pokemons_pokemons | null;
}

export interface pokemonsVariables {
  limit?: number | null;
  offset?: number | null;
}
