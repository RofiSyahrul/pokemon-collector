import type { FC } from 'react'

import Link from 'next/link'

import Layout from '@/components/_shared/layout'
import Header from '@/components/_shared/header'
import PokemonCard from '@/components/_shared/pokemon-card'

import type { HomeProps } from './types'

const Homepage: FC<HomeProps> = ({ pokemons }) => {
  return (
    <Layout header={<Header activeLink='home' />} isPokemonList>
      {pokemons.map(({ id, image, name }) => (
        <Link key={`${id}-${name}`} href={`/${name}`} passHref>
          <PokemonCard id={id} image={image} name={name} />
        </Link>
      ))}
    </Layout>
  )
}

export default Homepage
