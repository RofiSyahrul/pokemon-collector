import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from 'components/layout'
import PokemonCard from 'components/pokemon-card'
import { usePagination } from 'hooks/pagination'
import { useInfiniteScroll } from 'hooks/infinite-scroll'
import {
  fetchAllPokemons,
  getAllPokemons,
  PokemonListAndCache,
  saveAllPokemons,
} from 'lib/pokemons'
import { useMemo } from 'react'

type HomeProps = Omit<PokemonListAndCache, 'isError'>

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const {
    initialApolloState,
    allPokemonList,
    isError,
  } = await fetchAllPokemons()

  return {
    props: { initialApolloState, allPokemonList },
    revalidate: isError ? 1 : 10,
    notFound: isError,
  }
}

const pokemonListContainer = '#pokemon-list-container'
const pokemonCard = 'a.pokemon-card'

const Home: React.FC<HomeProps> = ({ allPokemonList = [] }) => {
  const isBrowser = typeof window !== 'undefined'

  const pokemons = useMemo<PokemonOverview[]>(() => {
    if (!isBrowser) return []

    const pokemonListFromStorage = getAllPokemons()
    const { id } = pokemonListFromStorage[0] || { id: 0 }
    if (id === 1) return pokemonListFromStorage

    const { id: idFromSource } = allPokemonList[0] || { id: 0 }
    if (idFromSource === 1) {
      saveAllPokemons(allPokemonList)
    }
    return allPokemonList
  }, [isBrowser])

  const { currentData: pokemonList, next, prev } = usePagination(pokemons)

  useInfiniteScroll({
    firstElementSelector: `${pokemonListContainer} > ${pokemonCard}:first-child`,
    lastElementSelector: `${pokemonListContainer} > ${pokemonCard}:last-child`,
    next,
    prev,
  })

  return (
    <Layout isPokemonList>
      {pokemonList.map(({ id, name, image }) => (
        <Link key={`${id}-${name}`} href={`/${name}`} passHref>
          <PokemonCard id={id} name={name} image={image} />
        </Link>
      ))}
    </Layout>
  )
}

export default Home
