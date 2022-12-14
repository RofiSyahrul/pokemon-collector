'use client'

import { usePokemonNicknames } from './_store'
import Attributes from './attributes'

interface NicknamesProps {
  pokemonType: PokemonType
}

export default function Nicknames({ pokemonType }: NicknamesProps) {
  const nicknames = usePokemonNicknames()
  const isEmpty = nicknames.length === 0

  if (isEmpty) {
    return (
      <>
        {"You haven't catch me. Let's click "}
        <strong>Catch Button</strong>
        {' or my image above.'}
      </>
    )
  }

  return (
    <Attributes data={nicknames} pokemonType={pokemonType} variant='nickname' />
  )
}
