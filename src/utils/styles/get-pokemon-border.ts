export default function getPokemonBorder(
  pokemonType: PokemonType
): Record<`border-pokemon-${PokemonType}`, boolean> {
  return {
    'border-pokemon-bug': pokemonType === 'bug',
    'border-pokemon-dark': pokemonType === 'dark',
    'border-pokemon-dragon': pokemonType === 'dragon',
    'border-pokemon-electric': pokemonType === 'electric',
    'border-pokemon-fairy': pokemonType === 'fairy',
    'border-pokemon-fighting': pokemonType === 'fighting',
    'border-pokemon-fire': pokemonType === 'fire',
    'border-pokemon-flying': pokemonType === 'flying',
    'border-pokemon-ghost': pokemonType === 'ghost',
    'border-pokemon-grass': pokemonType === 'grass',
    'border-pokemon-ground': pokemonType === 'ground',
    'border-pokemon-ice': pokemonType === 'ice',
    'border-pokemon-normal': pokemonType === 'normal',
    'border-pokemon-poison': pokemonType === 'poison',
    'border-pokemon-psychic': pokemonType === 'psychic',
    'border-pokemon-rock': pokemonType === 'rock',
    'border-pokemon-shadow': pokemonType === 'shadow',
    'border-pokemon-steel': pokemonType === 'steel',
    'border-pokemon-unknown': pokemonType === 'unknown',
    'border-pokemon-water': pokemonType === 'water',
  }
}
