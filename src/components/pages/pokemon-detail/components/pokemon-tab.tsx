'use client'

import type { ReactNode } from 'react'
import { useCallback, useMemo } from 'react'

import type { TabItem } from '@/components/_shared/tab'
import Tab from '@/components/_shared/tab'

import {
  setActiveTab,
  useActiveTab,
  useInitMyPokemons,
  usePokemonNicknames,
} from './_store'

interface PokemonTabProps {
  children: ReactNode
  pokemonName: string
  pokemonType: PokemonType
  totalMove: number
}

export default function PokemonTab({
  children,
  pokemonName,
  pokemonType,
  totalMove,
}: PokemonTabProps) {
  useInitMyPokemons(pokemonName)

  const activeTab = useActiveTab()
  const nicknames = usePokemonNicknames()
  const totalNickname = nicknames.length

  const tabList = useMemo<TabItem[]>(() => {
    return [
      { name: 'about', title: 'About' },
      {
        badge: totalMove,
        name: 'move',
        title: `Move${totalMove > 1 ? 's' : ''}`,
      },
      {
        badge: totalNickname,
        name: 'owned',
        title: 'Owned',
      },
    ]
  }, [totalMove, totalNickname])

  const handleChangeTab = useCallback((tabName: string) => {
    setActiveTab(tabName)
  }, [])

  return (
    <Tab
      activeTab={activeTab}
      colorName={pokemonType}
      onChange={handleChangeTab}
      panelHeight='calc(100vh - 340px)'
      tabList={tabList}
    >
      {children}
    </Tab>
  )
}
