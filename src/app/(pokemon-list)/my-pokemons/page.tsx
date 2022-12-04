import Loading from '@/components/_shared/loading'
import MyPokemonsPage from '@/components/pages/my-pokemons'

export const dynamic = 'error'

export default function Page() {
  return <MyPokemonsPage loadingPlaceholder={<Loading withContainer />} />
}
