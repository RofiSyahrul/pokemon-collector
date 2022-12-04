'use client'

import { useMemo } from 'react'

import Accordion from '@/components/_shared/accordion'
import { useMyPokemonList } from '@/store/app.store'

import Attributes from './attributes'

interface NicknamesProps {
  pokemonName: string
  pokemonType: PokemonType
}

export default function Nicknames({
  pokemonName,
  pokemonType,
}: NicknamesProps) {
  const myPokemonList = useMyPokemonList()

  const { isEmpty, nicknames, title } = useMemo(() => {
    const pokemonNicknames = myPokemonList
      .filter(item => item.name === pokemonName)
      .map(item => item.name)

    const totalNickname = pokemonNicknames.length
    return {
      isEmpty: totalNickname === 0,
      nicknames: pokemonNicknames,
      title: `Nickname${totalNickname > 1 ? 's' : ''} (${totalNickname})`,
    }
  }, [myPokemonList, pokemonName])

  return (
    <Accordion.Item title={title} value='nickname'>
      {isEmpty ? (
        <>
          {"You haven't catch me. Let's click "}
          <strong>Catch Button</strong>
          {' or my image above.'}
        </>
      ) : (
        <Attributes
          data={nicknames}
          pokemonType={pokemonType}
          variant='nickname'
        />
      )}
    </Accordion.Item>
  )
}
