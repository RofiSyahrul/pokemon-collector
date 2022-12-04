export default function getPokemonScrollbar(
  pokemonType: PokemonType
): Record<`scrollbar-thumb-pokemon-${PokemonType}`, boolean> {
  return {
    'scrollbar-thumb-pokemon-bug': pokemonType === 'bug',
    'scrollbar-thumb-pokemon-dark': pokemonType === 'dark',
    'scrollbar-thumb-pokemon-dragon': pokemonType === 'dragon',
    'scrollbar-thumb-pokemon-electric': pokemonType === 'electric',
    'scrollbar-thumb-pokemon-fairy': pokemonType === 'fairy',
    'scrollbar-thumb-pokemon-fighting': pokemonType === 'fighting',
    'scrollbar-thumb-pokemon-fire': pokemonType === 'fire',
    'scrollbar-thumb-pokemon-flying': pokemonType === 'flying',
    'scrollbar-thumb-pokemon-ghost': pokemonType === 'ghost',
    'scrollbar-thumb-pokemon-grass': pokemonType === 'grass',
    'scrollbar-thumb-pokemon-ground': pokemonType === 'ground',
    'scrollbar-thumb-pokemon-ice': pokemonType === 'ice',
    'scrollbar-thumb-pokemon-normal': pokemonType === 'normal',
    'scrollbar-thumb-pokemon-poison': pokemonType === 'poison',
    'scrollbar-thumb-pokemon-psychic': pokemonType === 'psychic',
    'scrollbar-thumb-pokemon-rock': pokemonType === 'rock',
    'scrollbar-thumb-pokemon-shadow': pokemonType === 'shadow',
    'scrollbar-thumb-pokemon-steel': pokemonType === 'steel',
    'scrollbar-thumb-pokemon-unknown': pokemonType === 'unknown',
    'scrollbar-thumb-pokemon-water': pokemonType === 'water',
  }
}
