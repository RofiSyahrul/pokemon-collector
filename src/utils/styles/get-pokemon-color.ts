import pokemonNeutralColorInverses from './neutral-inverses'

type NeutralColor = 'black' | 'white'

type Variant =
  | 'inversed'
  | 'inversed-with-border'
  | 'normal'
  | 'hover-inversed'
  | 'selected-inversed'

type InverseColor = Partial<
  Record<`${'text' | 'border'}-${NeutralColor}`, boolean>
>

type Result =
  | Record<`text-pokemon-${PokemonType}`, boolean>
  | Record<`hover:text-${NeutralColor}`, boolean>
  | Record<`aria-selected:text-${NeutralColor}`, boolean>
  | InverseColor

export default function getPokemonColor(
  pokemonType: PokemonType,
  variant: Variant = 'normal'
): Result {
  if (variant.includes('inversed')) {
    const isBlack = pokemonNeutralColorInverses[pokemonType] === 'black'
    const isWhite = pokemonNeutralColorInverses[pokemonType] === 'white'

    if (variant === 'hover-inversed') {
      return {
        'hover:text-black': isBlack,
        'hover:text-white': isWhite,
      }
    }

    if (variant === 'selected-inversed') {
      return {
        'aria-selected:text-black': isBlack,
        'aria-selected:text-white': isWhite,
      }
    }

    const result: InverseColor = {
      'text-black': isBlack,
      'text-white': isWhite,
    }

    if (variant === 'inversed-with-border') {
      result['border-black'] = isBlack

      result['border-white'] = isWhite
    }

    return result
  }

  return {
    'text-pokemon-bug': pokemonType === 'bug',
    'text-pokemon-dark': pokemonType === 'dark',
    'text-pokemon-dragon': pokemonType === 'dragon',
    'text-pokemon-electric': pokemonType === 'electric',
    'text-pokemon-fairy': pokemonType === 'fairy',
    'text-pokemon-fighting': pokemonType === 'fighting',
    'text-pokemon-fire': pokemonType === 'fire',
    'text-pokemon-flying': pokemonType === 'flying',
    'text-pokemon-ghost': pokemonType === 'ghost',
    'text-pokemon-grass': pokemonType === 'grass',
    'text-pokemon-ground': pokemonType === 'ground',
    'text-pokemon-ice': pokemonType === 'ice',
    'text-pokemon-normal': pokemonType === 'normal',
    'text-pokemon-poison': pokemonType === 'poison',
    'text-pokemon-psychic': pokemonType === 'psychic',
    'text-pokemon-rock': pokemonType === 'rock',
    'text-pokemon-shadow': pokemonType === 'shadow',
    'text-pokemon-steel': pokemonType === 'steel',
    'text-pokemon-unknown': pokemonType === 'unknown',
    'text-pokemon-water': pokemonType === 'water',
  }
}
