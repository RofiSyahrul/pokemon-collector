import type { FC } from 'react'

import Header from '@/components/_shared/header'
import Layout from '@/components/_shared/layout'
import PokemonCard from '@/components/_shared/pokemon-card'

import type { HomeProps } from './types'

const TOTAL_PRIORITIZED_IMAGE = 7

const Homepage: FC<HomeProps> = ({ pokemons }) => {
  return (
    <Layout header={<Header activeLink='home' />} isPokemonList>
      {pokemons.map(({ id, image, name }, index) => (
        <PokemonCard
          href={`/${name}`}
          id={id}
          key={`${id}-${name}`}
          image={image}
          name={name}
          priority={index < TOTAL_PRIORITIZED_IMAGE}
        />
      ))}
    </Layout>
  )
}

export default Homepage
