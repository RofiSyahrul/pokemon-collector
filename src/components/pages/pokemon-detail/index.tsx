import type { FC } from 'react'

import clsx from 'clsx'

import { TabPanel } from '@/components/_shared/tab'
import getPokemonBg from '@/utils/styles/get-pokemon-bg'
import getPokemonColor from '@/utils/styles/get-pokemon-color'

import About from './components/about'
import Attributes from './components/attributes'
import CatchResultPopups from './components/catch-result-popups'
import CatchedPokemonButton from './components/catched-pokemon-button'
import Nicknames from './components/nicknames'
import PokemonImage from './components/pokemon-image'
import PokemonTab from './components/pokemon-tab'
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
          'bg-neutral-dim text-neutral-bright px-2 lg:px-6 pb-2 pt-14'
        )}
      >
        <PokemonImage image={image} pokemonName={pokemonName} />
        <PokemonTab
          pokemonName={name}
          pokemonType={firstType}
          totalMove={totalMove}
        >
          <TabPanel name='about'>
            <About
              ability={ability}
              abilityTitle={abilityTitle}
              height={height}
              weight={weight}
            />
          </TabPanel>
          <TabPanel name='move'>
            {totalMove === 0 ? (
              `${pokemonName} doesn't have any moves.`
            ) : (
              <Attributes data={moves} pokemonType={firstType} variant='move' />
            )}
          </TabPanel>
          <TabPanel name='owned'>
            <div className='relative pb-16 min-h-full'>
              <Nicknames pokemonType={firstType} />
              <CatchedPokemonButton />
            </div>
          </TabPanel>
        </PokemonTab>
        {/* <div className='flex items-center justify-center w-full mt-2 absolute bottom-2'>
        </div> */}
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
