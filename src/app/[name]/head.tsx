import MetaHead from '@/components/_shared/meta-head'
import fetcher from '@/components/pages/pokemon-detail/fetcher'
import type { PokemonDetailPageParams } from '@/components/pages/pokemon-detail/types'

export default async function Head({
  params,
}: AppPageProps<PokemonDetailPageParams>) {
  const pokemonDetail = await fetcher(params)
  if (!pokemonDetail) return null

  const { firstType, description, image, name, pokemonName } = pokemonDetail

  return (
    <MetaHead
      colorName={firstType}
      description={description}
      image={image}
      pathname={`/${name}`}
      title={pokemonName}
    />
  )
}
