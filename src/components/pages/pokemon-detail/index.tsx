import type { FC } from 'react'

import clsx from 'clsx'

import Accordion from '@/components/_shared/accordion'
import getPokemonBg from '@/utils/styles/get-pokemon-bg'
import getPokemonColor from '@/utils/styles/get-pokemon-color'

import About from './components/about'
import AccordionGroup from './components/accordion-group'
import Attributes from './components/attributes'
import CatchResultPopups from './components/catch-result-popups'
import Nicknames from './components/nicknames'
import PokemonImage from './components/pokemon-image'
import SeeMyPokemonsButton from './components/see-my-pokemons-button'
import TopFold from './components/top-fold'
import type { PokemonDetailPageProps } from './types'

const PokemonDetailPage: FC<PokemonDetailPageProps> = ({ pokemonDetail }) => {
  const {
    ability,
    abilityTitle,
    firstType,
    height,
    id,
    image,
    moves,
    name,
    pokemonName,
    types,
    weight,
  } = pokemonDetail

  const totalMove = moves.length
  const moveTitle = `Move${totalMove > 1 ? 's' : ''} (${totalMove})`

  return (
    <main
      className={clsx(
        'w-full h-[100vh] relative overflow-hidden',
        getPokemonBg(firstType),
        getPokemonColor(firstType, 'inversed')
      )}
    >
      <TopFold
        pokemonFirstType={firstType}
        pokemonName={pokemonName}
        pokemonTypes={types}
      />
      <section
        className={clsx(
          'absolute bottom-0 left-0 shadow-2xl shadow-neutral-dim0',
          'w-full h-[calc(100%-200px)] rounded-tl-[2rem] rounded-tr-[2rem]',
          'bg-neutral-dim text-neutral-bright px-2 lg:px-6 pb-2 pt-10'
        )}
      >
        <PokemonImage image={image} pokemonName={pokemonName} />
        <AccordionGroup pokemonType={firstType}>
          <Accordion.Item title='About' value='about'>
            <About
              ability={ability}
              abilityTitle={abilityTitle}
              height={height}
              weight={weight}
            />
          </Accordion.Item>
          <Accordion.Item title={moveTitle} value='move'>
            {totalMove === 0 ? (
              `${pokemonName} doesn't have any moves.`
            ) : (
              <Attributes data={moves} pokemonType={firstType} variant='move' />
            )}
          </Accordion.Item>
          <Nicknames pokemonName={name} pokemonType={firstType} />
        </AccordionGroup>
        <div className='flex items-center justify-center w-full mt-4'>
          <SeeMyPokemonsButton
            className={clsx(
              'flex items-center justify-center transition-opacity',
              'w-full max-w-xs min-h-[3rem] hover:brightness-75',
              'px-2 text-inherit cursor-pointer rounded-lg text-base font-bold',
              getPokemonBg(firstType),
              getPokemonColor(firstType, 'inversed')
            )}
          />
        </div>
      </section>
      <CatchResultPopups
        id={id}
        image={image}
        name={name}
        pokemonName={pokemonName}
      />
    </main>
  )
}

export default PokemonDetailPage
