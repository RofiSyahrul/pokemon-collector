import clsx from 'clsx'

import Header from '@/components/_shared/header'
import Layout from '@/components/_shared/layout'
import PokemonCard from '@/components/_shared/pokemon-card'
import { useAppState } from '@/context/app.context'

const title = 'My Catched Pokemons'
const header = <Header activeLink='my-pokemons' />

const MyPokemonsPage: React.FC = () => {
  const { myPokemonList } = useAppState()

  if (myPokemonList.length === 0) {
    return (
      <Layout
        className={clsx(
          'h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)]',
          'w-full flex flex-col justify-center items-center'
        )}
        header={header}
        title={title}
      >
        <h1 className='text-4xl font-bold'>
          You haven&apos;t catch any pokemons
        </h1>
      </Layout>
    )
  }

  return (
    <Layout header={header} isPokemonList title={title}>
      {myPokemonList.map(({ id, image, name, nickname }) => (
        <PokemonCard
          href={`/${name}`}
          id={id}
          key={`${nickname}-${id}`}
          image={image}
          name={name}
          nickname={nickname}
          variant='my-pokemon'
        />
      ))}
    </Layout>
  )
}

export default MyPokemonsPage
