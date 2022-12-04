import type { GetStaticPaths, GetStaticProps } from 'next'

import pokemonColors from '@/constants/pokemon-colors'
import { fetchAllPokemonNames, fetchPokemonDetail } from '@/lib/pokeomon.server'
import type { PokemonDetailResponse } from '@/lib/pokeomon.server'
import capitalize from '@/utils/capitalize'
import enumerate from '@/utils/enumerate'
import formatNumber from '@/utils/formatNumber'

import type {
  EnrichedPokemonDetail,
  PokemonDetailPageParams,
  PokemonDetailPageProps,
} from './types'

const pokemonTypes = Object.keys(pokemonColors)

function transformAbilities(
  pokemonAbilites?: PokemonDetailResponse['abilities']
): Pick<EnrichedPokemonDetail, 'ability' | 'abilityTitle'> {
  const abilities: string[] = []
  pokemonAbilites?.forEach(item => {
    if (item?.ability?.name) {
      abilities.push(item.ability.name)
    }
  })

  const ability = enumerate(...abilities)
  const abilityTitle = `Abilit${abilities.length > 1 ? 'ies' : 'y'}`
  return {
    ability,
    abilityTitle,
  }
}

function transformTypes(
  types?: PokemonDetailResponse['types']
): Pick<EnrichedPokemonDetail, 'firstType' | 'types'> {
  const transformedTypes = (types ?? [])
    .map(item => item?.type?.name || 'unknown')
    .filter((typeName): typeName is PokemonType => {
      return pokemonTypes.includes(typeName)
    })

  const [firstType = 'unknown'] = transformedTypes
  return {
    firstType,
    types: transformedTypes,
  }
}

function formatBasicInfo(
  pokemonHeight: number,
  pokemonWeight: number
): Pick<EnrichedPokemonDetail, 'height' | 'weight'> {
  return {
    height: `${formatNumber(pokemonHeight / 10)} kg`,
    weight: `${formatNumber(pokemonWeight / 10)} m`,
  }
}

export const getStaticPaths: GetStaticPaths<
  PokemonDetailPageParams
> = async () => {
  const pokemonNames = await fetchAllPokemonNames()
  return {
    fallback: false,
    paths: pokemonNames.map(name => ({ params: { name } })),
  }
}

export const getStaticProps: GetStaticProps<
  PokemonDetailPageProps,
  PokemonDetailPageParams
> = async ({ params }) => {
  const name = params?.name?.toString()
  if (!name) {
    return { notFound: true }
  }

  const { abilities, height, id, moves, types, weight } =
    await fetchPokemonDetail(name)

  if (typeof id !== 'number' || id < 1) {
    return { notFound: true }
  }

  const { ability, abilityTitle } = transformAbilities(abilities)
  const basicInfo = formatBasicInfo(height ?? 0, weight ?? 0)
  const description = `Weight: ${basicInfo.weight}. Height: ${basicInfo.weight}. ${abilityTitle}: ${ability}`
  const pokemonName = capitalize(name)

  return {
    props: {
      pokemonDetail: {
        ability,
        abilityTitle,
        description,
        height: basicInfo.height,
        id,
        image: `${BASE_IMAGE_URL}/${id}.png`,
        moves: (moves ?? [])
          .map(item => item?.move?.name ?? '')
          .filter(Boolean),
        name,
        nicknames: [],
        pokemonName,
        weight: basicInfo.weight,
        ...transformTypes(types),
      },
    },
  }
}