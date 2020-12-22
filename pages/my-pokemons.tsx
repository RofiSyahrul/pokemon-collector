import Layout from 'components/layout'
import PokemonCard from 'components/pokemon-card'
import { useAppState } from 'context/app.context'
import { Text } from 'goods-core'

const MyPokemonsPage: React.FC = () => {
  const { myPokemonList } = useAppState()

  if (myPokemonList.length === 0) {
    return (
      <Layout
        title='My Catched Pokemons'
        h={{ xs: 'calc(100vh - 64px)', lg: 'calc(100vh - 80px)' }}
        w
        fJustify='center'
        fAlign='center'
        header
      >
        <Text as='h1' rule='title' weight='bold'>
          You haven&apos;t catch any pokemons
        </Text>
      </Layout>
    )
  }

  return (
    <Layout title='My Catched Pokemons' isPokemonList>
      {myPokemonList.map(({ id, name, image, nickname }) => (
        <PokemonCard
          key={`${nickname}-${id}`}
          id={id}
          name={name}
          image={image}
          nickname={nickname}
        />
      ))}
    </Layout>
  )
}

export default MyPokemonsPage
