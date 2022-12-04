import type { GetStaticPaths, GetStaticProps } from 'next'

import { fetchPokemons, fetchTotalPokemons } from '@/lib/pokeomon.server'

import type { HomepageParams, HomeProps } from './types'

export const getStaticPaths: GetStaticPaths<HomepageParams> = async () => {
  const { totalPage } = await fetchTotalPokemons()
  if (totalPage <= 0) {
    return { fallback: false, paths: [] }
  }

  return {
    fallback: false,
    paths: Array.from({ length: totalPage - 1 }, (_, index) => ({
      params: { page: `${index + 2}` },
    })),
  }
}

export const getStaticProps: GetStaticProps<
  HomeProps,
  HomepageParams
> = async ({ params }) => {
  const page = params?.page?.toString() ?? '1'
  let pageNumber = parseInt(page, 10)
  if (Number.isNaN(pageNumber) || pageNumber <= 0) {
    pageNumber = 1
  }

  const { totalPage } = await fetchTotalPokemons()
  const { isError, pokemons } = await fetchPokemons(pageNumber)

  return {
    props: { pokemons, totalPage },
    revalidate: isError ? 30 : false,
    notFound: isError,
  }
}
