import pokemonNeutralColorInverses from './neutral-inverses'

type Variant =
  | 'inversed'
  | 'normal'
  | 'hover'
  | 'selected'
  | 'group-selected-inverse'

type Result =
  | Record<`bg-pokemon-${PokemonType}`, boolean>
  | Record<'bg-white' | 'bg-black', boolean>
  | Record<`hover:bg-pokemon-${PokemonType}`, boolean>
  | Record<`aria-selected:bg-pokemon-${PokemonType}`, boolean>
  | Record<`group-aria-selected:bg-${'white' | 'black'}`, boolean>

export default function getPokemonBg(
  pokemonType: PokemonType,
  variant: Variant = 'normal'
): Result {
  if (variant === 'inversed') {
    return {
      'bg-black': pokemonNeutralColorInverses[pokemonType] === 'black',
      'bg-white': pokemonNeutralColorInverses[pokemonType] === 'white',
    }
  }

  if (variant === 'group-selected-inverse') {
    return {
      'group-aria-selected:bg-black':
        pokemonNeutralColorInverses[pokemonType] === 'black',
      'group-aria-selected:bg-white':
        pokemonNeutralColorInverses[pokemonType] === 'white',
    }
  }

  if (variant === 'hover') {
    return {
      'hover:bg-pokemon-bug': pokemonType === 'bug',
      'hover:bg-pokemon-dark': pokemonType === 'dark',
      'hover:bg-pokemon-dragon': pokemonType === 'dragon',
      'hover:bg-pokemon-electric': pokemonType === 'electric',
      'hover:bg-pokemon-fairy': pokemonType === 'fairy',
      'hover:bg-pokemon-fighting': pokemonType === 'fighting',
      'hover:bg-pokemon-fire': pokemonType === 'fire',
      'hover:bg-pokemon-flying': pokemonType === 'flying',
      'hover:bg-pokemon-ghost': pokemonType === 'ghost',
      'hover:bg-pokemon-grass': pokemonType === 'grass',
      'hover:bg-pokemon-ground': pokemonType === 'ground',
      'hover:bg-pokemon-ice': pokemonType === 'ice',
      'hover:bg-pokemon-normal': pokemonType === 'normal',
      'hover:bg-pokemon-poison': pokemonType === 'poison',
      'hover:bg-pokemon-psychic': pokemonType === 'psychic',
      'hover:bg-pokemon-rock': pokemonType === 'rock',
      'hover:bg-pokemon-shadow': pokemonType === 'shadow',
      'hover:bg-pokemon-steel': pokemonType === 'steel',
      'hover:bg-pokemon-unknown': pokemonType === 'unknown',
      'hover:bg-pokemon-water': pokemonType === 'water',
    }
  }

  if (variant === 'selected') {
    return {
      'aria-selected:bg-pokemon-bug': pokemonType === 'bug',
      'aria-selected:bg-pokemon-dark': pokemonType === 'dark',
      'aria-selected:bg-pokemon-dragon': pokemonType === 'dragon',
      'aria-selected:bg-pokemon-electric': pokemonType === 'electric',
      'aria-selected:bg-pokemon-fairy': pokemonType === 'fairy',
      'aria-selected:bg-pokemon-fighting': pokemonType === 'fighting',
      'aria-selected:bg-pokemon-fire': pokemonType === 'fire',
      'aria-selected:bg-pokemon-flying': pokemonType === 'flying',
      'aria-selected:bg-pokemon-ghost': pokemonType === 'ghost',
      'aria-selected:bg-pokemon-grass': pokemonType === 'grass',
      'aria-selected:bg-pokemon-ground': pokemonType === 'ground',
      'aria-selected:bg-pokemon-ice': pokemonType === 'ice',
      'aria-selected:bg-pokemon-normal': pokemonType === 'normal',
      'aria-selected:bg-pokemon-poison': pokemonType === 'poison',
      'aria-selected:bg-pokemon-psychic': pokemonType === 'psychic',
      'aria-selected:bg-pokemon-rock': pokemonType === 'rock',
      'aria-selected:bg-pokemon-shadow': pokemonType === 'shadow',
      'aria-selected:bg-pokemon-steel': pokemonType === 'steel',
      'aria-selected:bg-pokemon-unknown': pokemonType === 'unknown',
      'aria-selected:bg-pokemon-water': pokemonType === 'water',
    }
  }

  return {
    'bg-pokemon-bug': pokemonType === 'bug',
    'bg-pokemon-dark': pokemonType === 'dark',
    'bg-pokemon-dragon': pokemonType === 'dragon',
    'bg-pokemon-electric': pokemonType === 'electric',
    'bg-pokemon-fairy': pokemonType === 'fairy',
    'bg-pokemon-fighting': pokemonType === 'fighting',
    'bg-pokemon-fire': pokemonType === 'fire',
    'bg-pokemon-flying': pokemonType === 'flying',
    'bg-pokemon-ghost': pokemonType === 'ghost',
    'bg-pokemon-grass': pokemonType === 'grass',
    'bg-pokemon-ground': pokemonType === 'ground',
    'bg-pokemon-ice': pokemonType === 'ice',
    'bg-pokemon-normal': pokemonType === 'normal',
    'bg-pokemon-poison': pokemonType === 'poison',
    'bg-pokemon-psychic': pokemonType === 'psychic',
    'bg-pokemon-rock': pokemonType === 'rock',
    'bg-pokemon-shadow': pokemonType === 'shadow',
    'bg-pokemon-steel': pokemonType === 'steel',
    'bg-pokemon-unknown': pokemonType === 'unknown',
    'bg-pokemon-water': pokemonType === 'water',
  }
}
