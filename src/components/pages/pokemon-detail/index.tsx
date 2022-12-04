import { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'

import clsx from 'clsx'
import dynamic from 'next/dynamic'
import Image from 'next/legacy/image'
import Link from 'next/link'

import Accordion from '@/components/_shared/accordion'
import Layout from '@/components/_shared/layout'
import Popup from '@/components/_shared/popup'
import { useAppState } from '@/context/app.context'
import ApprovedIcon from '@/icons/approved'
import RejectedIcon from '@/icons/rejected'
import getPokemonBg from '@/utils/styles/get-pokemon-bg'
import getPokemonColor from '@/utils/styles/get-pokemon-color'

import About from './components/about'
import Attributes from './components/attributes'
import TopFold from './components/top-fold'
import useCatchPokemon from './hooks/use-catch-pokemon'
import type { PokemonDetailPageProps } from './types'

const NicknameForm = dynamic(() => import('./components/nickname-form'), {
  ssr: false,
})

const IMAGE_SIZE = 192
const IMAGE_FALLBACK_SIZE = 100

const PokemonDetailPage: FC<PokemonDetailPageProps> = ({ pokemonDetail }) => {
  const {
    ability,
    abilityTitle,
    description,
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

  const { myPokemonList } = useAppState()
  const { catchPokemon, catchStatus, isCatching, resetCatchStatus } =
    useCatchPokemon()

  const isNicknameFormPopupVisible = !isCatching && catchStatus === 'success'

  const [activeAccordion, setActiveAccordion] = useState('about')
  const [nicknames, setNicknames] = useState<string[]>(pokemonDetail.nicknames)

  const totalMove = moves.length
  const moveTitle = `Move${totalMove > 1 ? 's' : ''} (${totalMove})`

  const totalNickname = nicknames.length
  const nicknameTitle = `Nickname${
    totalNickname > 1 ? 's' : ''
  } (${totalNickname})`

  const handleClickAccordion = useCallback((value: string) => {
    setActiveAccordion(value)
  }, [])

  const handleSubmitNicknameFinished = useCallback(() => {
    resetCatchStatus()
    setActiveAccordion('nickname')
  }, [])

  useEffect(() => {
    if (name) {
      setNicknames(
        myPokemonList
          .filter(item => item.name === name)
          .map(item => item.nickname)
      )
    }
  }, [myPokemonList, name])

  return (
    <Layout
      colorName={firstType}
      description={description}
      image={image}
      title={pokemonName}
      className={clsx(
        'w-full h-[100vh] relative overflow-hidden',
        getPokemonBg(firstType),
        getPokemonColor(firstType, 'inversed')
      )}
    >
      <TopFold
        onClickCatch={catchPokemon}
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
        <button
          className={clsx(
            'w-36 h-36 lg:w-48 lg:h-48 absolute bottom-full left-1/2',
            '-translate-x-1/2 translate-y-[40%] bg-transparent z-10 btn btn-text'
          )}
          onClick={catchPokemon}
          title={`Catch ${pokemonName}`}
          type='button'
        >
          <Image
            key={`${isCatching}`}
            alt={pokemonName}
            className={clsx(
              'w-full h-full transition-transform',
              isCatching ? 'animate-pokeball' : 'hover:scale-150'
            )}
            height={isCatching ? IMAGE_FALLBACK_SIZE : IMAGE_SIZE}
            layout='intrinsic'
            loading='eager'
            objectFit='contain'
            priority
            src={isCatching ? IMAGE_FALLBACK : image}
            width={isCatching ? IMAGE_FALLBACK_SIZE : IMAGE_SIZE}
          />
          <span className='sr-only'>{`Catch ${pokemonName}`}</span>
        </button>
        <Accordion.Group
          activeValue={activeAccordion}
          className='flex flex-col w-full'
          onClickAccordion={handleClickAccordion}
          pokemonType={firstType}
        >
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
          <Accordion.Item title={nicknameTitle} value='nickname'>
            {totalNickname === 0 ? (
              <>
                {"You haven't catch me. Let's click "}
                <strong>Catch Button</strong>
                {' or my image above.'}
              </>
            ) : (
              <Attributes
                data={nicknames}
                pokemonType={firstType}
                variant='nickname'
              />
            )}
          </Accordion.Item>
        </Accordion.Group>
        <div className='flex items-center justify-center w-full mt-4'>
          <Link
            href='/my-pokemons'
            className={clsx(
              'flex items-center justify-center transition-opacity',
              'w-full max-w-xs min-h-[3rem] hover:brightness-75',
              'px-2 text-inherit cursor-pointer rounded-lg text-base font-bold',
              getPokemonBg(firstType),
              getPokemonColor(firstType, 'inversed'),
              activeAccordion ? 'opacity-0 pointer-events-none' : 'opacity-100'
            )}
          >
            See my pokemons
          </Link>
        </div>
      </section>
      <Popup
        isOpen={isNicknameFormPopupVisible}
        titleIcon={<ApprovedIcon className='text-primary-bright w-6 h-6' />}
        title={`You catched ${pokemonName.toUpperCase()}!`}
      >
        <NicknameForm
          autoFocus={isNicknameFormPopupVisible}
          onSubmitFinished={handleSubmitNicknameFinished}
          pokemonID={id}
          pokemonImage={image}
          pokemonName={name}
        />
      </Popup>
      <Popup
        isOpen={!isCatching && catchStatus === 'failed'}
        titleIcon={<RejectedIcon className='text-danger-bright w-6 h-6' />}
        title='Failed'
        footer={
          <>
            <button
              className='btn btn-outline btn-primary w-full h-12 flex-1'
              onClick={catchPokemon}
              type='button'
            >
              Try again
            </button>
            <button
              className='btn btn-solid btn-danger w-full h-12 flex-1'
              onClick={resetCatchStatus}
              type='button'
            >
              Close
            </button>
          </>
        }
      >
        {'Failed to catch '}
        <strong>{pokemonName}</strong>
      </Popup>
    </Layout>
  )
}

export default PokemonDetailPage
