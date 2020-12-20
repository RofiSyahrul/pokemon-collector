import { GetStaticProps } from 'next'
import Link from 'next/link'
import { initializeApollo } from 'lib/apollo-client'
import { POKEMONS } from 'graph-query/pokemon'
import { pokemons, pokemonsVariables } from 'types/pokemons'
import Layout from 'components/layout'
import PokemonCard from 'components/pokemon-card'
import { usePagination } from 'hooks/pagination'
import { useInfiniteScroll } from 'hooks/infinite-scroll'

interface HomeProps extends PageProps {
  allPokemonList: pokemons['pokemons']['results']
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const client = initializeApollo()

  try {
    let { data } = await client.query<pokemons, pokemonsVariables>({
      query: POKEMONS,
      variables: { limit: 1, offset: 0 },
    })
    const { count = 1 } = data?.pokemons || {}

    if (count > 1) {
      ;({ data } = await client.query<pokemons, pokemonsVariables>({
        query: POKEMONS,
        variables: { limit: count, offset: 0 },
      }))
    }
    return {
      props: {
        initialApolloState: client.cache.extract(),
        allPokemonList: data?.pokemons?.results || [],
      },
      revalidate: 10,
    }
  } catch {
    return {
      props: {
        initialApolloState: client.cache.extract(),
        allPokemonList: [],
      },
      revalidate: 1,
      notFound: true,
    }
  }
}

const Home: React.FC<HomeProps> = ({ allPokemonList = [] }) => {
  const { currentData: pokemonList, next } = usePagination(
    allPokemonList,
    'pokemons-page'
  )

  useInfiniteScroll({
    lastElementSelector: '#pokemon-list-container > a.pokemon-card:last-child',
    next,
  })

  return (
    <Layout isPokemonList>
      {pokemonList.map(({ id, name, image }) => (
        <Link key={`${id}-${name}`} href={`/${name}`} passHref>
          <PokemonCard name={name} imageSrc={image} owned={0} />
        </Link>
      ))}
    </Layout>
  )
}

export default Home
