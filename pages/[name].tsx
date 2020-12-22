import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, Icon, mergeClass, Text } from 'goods-core'
import {
  Accordion,
  AccordionGroup,
  AccordionProps,
  Button,
  FeedbackProvider,
} from 'goods-ui'
import { fetchAllPokemons } from 'lib/pokemons'
import { initializeApollo } from 'lib/apollo-client'
import { pokemon, pokemonVariables } from 'types/pokemon'
import { POKEMON } from 'graph-query/pokemon'
import Layout from 'components/layout'
import { capitalize, formatNumber } from 'lib/helpers'
import { useImageFallback } from 'hooks/image-fallback'
import About from 'components/about'
import Attributes from 'components/attributes'
import { useAppState } from 'context/app.context'
import { useCatchPokemon } from 'hooks/catch-pokemon'
import Link from 'next/link'

type ParsedQuery = {
  name: string
}

interface PokemonDetailProps extends PageProps {
  pokemonDetail: PokemonDetail
}

const defaultPokemonDetail: PokemonDetail = {
  id: 0,
  name: '',
  image: IMAGE_FALLBACK,
  height: 0,
  weight: 0,
  nicknames: [],
  abilities: [],
  types: [],
  moves: [],
}

export const getStaticPaths: GetStaticPaths<ParsedQuery> = async () => {
  const { allPokemonList } = await fetchAllPokemons()

  return {
    paths: allPokemonList.map(({ name }) => ({ params: { name: name || '' } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<
  PokemonDetailProps,
  ParsedQuery
> = async ({ params }) => {
  const { name = '' } = params || {}
  const client = initializeApollo()
  try {
    const { data } = await client.query<pokemon, pokemonVariables>({
      query: POKEMON,
      variables: { name },
    })
    const { id, height, weight, abilities, types, moves } = data?.pokemon || {}
    if (typeof id !== 'number' || id < 1) {
      throw new Error('Not found')
    }
    return {
      props: {
        initialApolloState: client.cache.extract(),
        pokemonDetail: {
          name,
          id,
          image: `${BASE_IMAGE_URL}/${id}.png`,
          height: height || 0,
          weight: weight || 0,
          abilities: (abilities || []).map(item => item?.ability?.name || ''),
          types: (types || []).map(
            item => (item?.type?.name || 'unknown') as PokemonType
          ),
          moves: (moves || []).map(item => item?.move?.name || ''),
          nicknames: [],
        },
      },
      revalidate: 1,
    }
  } catch {
    return {
      props: {
        initialApolloState: client.cache.extract(),
        pokemonDetail: defaultPokemonDetail,
      },
      notFound: true,
    }
  }
}

const customAccordionPrefix: AccordionProps['prefixComponent'] = ({ c }) => {
  return <Icon name='noteOff' c={c} mr='xxs' />
}

const customAccordionSuffix: AccordionProps['prefixComponent'] = ({
  c,
  isOpen,
}) => (
  <Icon
    name='chevron'
    c={c}
    rotate={isOpen ? 'right' : 'left'}
    transition='transform 0.6s ease'
  />
)

interface HeaderProps extends Pick<PokemonDetail, 'name' | 'types'> {
  setCatching: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = memo<HeaderProps>(({ name, types, setCatching }) => {
  const totalType = types.length
  const router = useRouter()

  const onClick = useCallback(() => {
    setCatching(true)
  }, [])

  return (
    <Box
      as='header'
      w='calc(100% + 64px)'
      mx='-32px'
      px='xxs'
      py='s'
      d='grid'
      gTempCol='32px 1fr 96px'
      gap='8px'
      fAlign='flex-start'
    >
      <Icon
        name='arrow'
        c='currentcolor'
        size='large'
        cursor='pointer'
        onClick={router.back}
      />
      <Box as='section' w>
        <h1>{name}</h1>
        <Box
          w
          my='xxs'
          d='grid'
          gTempCol={`repeat(${totalType}, max-content)`}
          gap='4px'
          gAutoFlow='row'
        >
          {types.map((type, i) => (
            <Box
              key={`${type}-${i}`}
              id={`${type}-item-container`}
              w='fit-content'
              h='32px'
              px='xxs'
              fJustify='center'
              radius='full'
            >
              <span>{type}</span>
            </Box>
          ))}
        </Box>
      </Box>
      <Button
        id='catch-btn-top'
        onClick={onClick}
        px='xxs'
        radius='full'
        w='fit-content'
      >
        Catch me
      </Button>
    </Box>
  )
})

const PokemonDetail: React.FC<Partial<PokemonDetailProps>> = ({
  pokemonDetail,
}) => {
  const { name, image, weight, height, abilities, types, moves, id } =
    pokemonDetail || defaultPokemonDetail

  const { myPokemonList } = useAppState()

  const [openedAccordion, setOpenedAccordion] = useState<number | undefined>(0)
  const [nicknames, setNicknames] = useState(pokemonDetail?.nicknames || [])

  const { setRef, isVisible, src } = useImageFallback(image)
  const pokemonName = capitalize(name)
  const [firstType = 'unknown'] = types
  const totalMove = moves.length
  const moveTitle = `Move${totalMove > 1 ? 's' : ''} (${totalMove})`
  const totalNickname = nicknames.length
  const nicknameTitle = `Nickname${
    totalNickname > 1 ? 's' : ''
  } (${totalNickname})`

  const { status, isCatching, setCatching } = useCatchPokemon({
    pokemonImage: image,
    pokemonId: id,
  })

  const {
    description,
    pokemonHeight,
    pokemonWeight,
    ability,
    abilityTitle,
  } = useMemo(() => {
    const w = `${formatNumber(weight / 10)} kg`
    const h = `${formatNumber(height / 10)} m`
    const pokemonAbility = abilities.join(', ')
    const totalAbility = abilities.length
    const pokemonAbilityTitle = `Abilit${totalAbility > 1 ? 'ies' : 'y'}`
    const basic = `Weight: ${w}. Height: ${h}`
    return {
      description: `${basic}. ${pokemonAbilityTitle}: ${pokemonAbility}`,
      pokemonWeight: w,
      pokemonHeight: h,
      ability: pokemonAbility,
      abilityTitle: pokemonAbilityTitle,
    }
  }, [weight, height, abilities])

  const onClickAccordion = useCallback((idx: number) => {
    setOpenedAccordion(prev => (prev === idx ? undefined : idx))
  }, [])

  const getClassName = useCallback(
    (idx: number, container = false, empty = false) => {
      return mergeClass(
        `pokemon-accordion${container ? '-container' : ''}`,
        openedAccordion === idx ? `open${container ? '' : ' scroll'}` : '',
        empty ? 'empty' : ''
      )
    },
    [openedAccordion]
  )

  useEffect(() => {
    if (name) {
      setNicknames(
        myPokemonList
          .filter(item => item.name === name)
          .map(item => item.nickname)
      )
    }
  }, [myPokemonList, name])

  useEffect(() => {
    if (status === 'success') {
      setOpenedAccordion(2)
    }
  }, [status])

  return (
    <Layout
      title={pokemonName}
      image={src}
      description={description}
      id={`${firstType}-container`}
      px='l'
      colorName={firstType}
      posi='relative'
      h='100vh'
      w
      overflow='hidden'
    >
      <Header name={pokemonName} types={types} setCatching={setCatching} />
      <Box
        as='section'
        posi='absolute'
        shadow='high'
        w
        h='calc(100% - 200px)'
        bottom='0px'
        left='0px'
        bTopLeftRad='32px'
        bTopRightRad='32px'
        bg='white'
        px={{ xs: 'xs', lg: 'm' }}
        pt='xl'
        pb='xxs'
      >
        <Box
          ref={setRef}
          s={{ xs: '144px', lg: '200px' }}
          posi='absolute'
          bottom='100%'
          left='50%'
          transform='translate(-50%, 40%)'
          bg='transparent'
          z={10}
        >
          <Image
            src={isCatching ? IMAGE_FALLBACK : src}
            alt={`Image of ${pokemonName}`}
            layout='fill'
            objectFit='contain'
            className={mergeClass(
              'pokemon-img',
              isVisible ? 'visible' : 'not-visible',
              isCatching ? 'catching' : ''
            )}
          />
        </Box>
        <AccordionGroup
          w
          id='pokemon-accordion-group'
          activeIndex={openedAccordion}
          onClickAccordion={onClickAccordion}
          cOpen='currentcolor'
        >
          <Accordion
            index={0}
            title='About'
            className={getClassName(0)}
            containerProps={{ className: getClassName(0, true) }}
            prefixComponent={customAccordionPrefix}
            suffixComponent={customAccordionSuffix}
          >
            <About
              weight={pokemonWeight}
              height={pokemonHeight}
              ability={ability}
              abilityTitle={abilityTitle}
            />
          </Accordion>
          <Accordion
            index={1}
            title={moveTitle}
            className={getClassName(1, false, totalMove === 0)}
            containerProps={{ className: getClassName(1, true) }}
            prefixComponent={customAccordionPrefix}
            suffixComponent={customAccordionSuffix}
          >
            {totalMove === 0 ? (
              `${pokemonName} doesn't have any moves.`
            ) : (
              <Attributes data={moves} bgItem={firstType} cItem='inherit' />
            )}
          </Accordion>
          <Accordion
            index={2}
            title={nicknameTitle}
            className={getClassName(2, false, totalNickname === 0)}
            containerProps={{ className: getClassName(2, true) }}
            prefixComponent={customAccordionPrefix}
            suffixComponent={customAccordionSuffix}
          >
            {totalNickname === 0 ? (
              "You haven't catched me"
            ) : (
              <Attributes data={nicknames} bgItem={firstType} cItem='inherit' />
            )}
          </Accordion>
        </AccordionGroup>
        <Link href='/my-pokemons' passHref>
          <Box
            as='a'
            bg={firstType}
            px='xxs'
            posi='absolute'
            bottom='8px'
            left='50%'
            transform='translateX(-50%)'
            w
            maxW='250px'
            radius='l'
            c='inherit'
            cursor='pointer'
            minH='48px'
            fJustify='center'
            fAlign='center'
            opacity={typeof openedAccordion === 'number' ? 0 : 1}
            transition='opacity 400ms ease-in'
          >
            <Text
              as='span'
              rule='body'
              weight='bold'
              textAlign='center'
              c='inherit'
            >
              See my pokemons
            </Text>
          </Box>
        </Link>
      </Box>
    </Layout>
  )
}

const PokemonDetailPage: React.FC<PokemonDetailProps> = props => {
  return (
    <FeedbackProvider>
      <PokemonDetail {...props} />
    </FeedbackProvider>
  )
}

export default PokemonDetailPage
