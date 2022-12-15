import type { CSSProperties, FC } from 'react'
import { useMemo } from 'react'

import clsx from 'clsx'

import { TabPanel } from '@/components/_shared/tab'
import pokemonColors from '@/constants/pokemon-colors'
import getPokemonColor from '@/utils/styles/get-pokemon-color'
import pokemonNeutralColorInverses from '@/utils/styles/neutral-inverses'

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

  const style = useMemo(() => {
    const firstGradientColor = pokemonColors[firstType]
    const secondGradientColor =
      pokemonNeutralColorInverses[firstType] === 'black'
        ? 'var(--color-primary-bright)'
        : 'var(--color-primary-dim)'

    return {
      '--tw-gradient-stops': `${firstGradientColor} 100px, ${secondGradientColor} 300px`,
    }
  }, [firstType])

  return (
    <main
      className={clsx(
        'w-full h-[100vh] relative overflow-hidden bg-gradient-to-b',
        getPokemonColor(firstType, 'inversed')
      )}
      style={style as unknown as CSSProperties}
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
        style={{
          background:
            'linear-gradient(to bottom, var(--color-neutral-dim) 100px, var(--color-neutral-dim1) 250px, var(--color-neutral-dim2) 500px)',
        }}
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
