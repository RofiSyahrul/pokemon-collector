import type { MouseEvent } from 'react'

export interface TabContextValue {
  activeTab: string
  colorName?: PokemonType
  onChange: (tabName: string, event: MouseEvent<HTMLButtonElement>) => void
  panelHeight?: string
}

export interface TabItem {
  badge?: number
  name: string
  title: string
}

export interface TabListProps {
  tabList: TabItem[]
}
