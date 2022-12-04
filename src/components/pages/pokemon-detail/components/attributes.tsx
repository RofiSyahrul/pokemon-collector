import type { FC } from 'react'

import clsx from 'clsx'

import getPokemonBg from '@/utils/styles/get-pokemon-bg'
import getPokemonColor from '@/utils/styles/get-pokemon-color'

interface AttributesProps {
  data: string[]
  pokemonType: PokemonType
  variant: 'move' | 'nickname'
}

const Attributes: FC<AttributesProps> = ({ data, pokemonType, variant }) => {
  return (
    <div className='flex flex-wrap w-full gap-2'>
      {data.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className={clsx(
            'w-fit h-fit p-2 rounded-tl-lg rounded-br-lg max-w-full',
            'border border-solid border-neutral-bright text-inherit',
            getPokemonBg(pokemonType),
            getPokemonColor(pokemonType, 'inversed'),
            {
              'break-words [word-break:break-word]': variant === 'nickname',
            }
          )}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export default Attributes
