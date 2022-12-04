import PokemonListHeader from './header'

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <PokemonListHeader />
      {children}
    </>
  )
}
