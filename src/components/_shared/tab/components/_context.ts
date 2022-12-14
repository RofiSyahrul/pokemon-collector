import { useContext, createContext } from 'react'

import type { TabContextValue } from './_types'

export const TabContext = createContext<TabContextValue>({
  activeTab: '',
  onChange() {},
})

export function useTabContext() {
  return useContext(TabContext)
}
