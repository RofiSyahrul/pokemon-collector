'use client'

import type { FC, ReactNode } from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'

import { TabContext } from './components/_context'
import type { TabContextValue, TabListProps } from './components/_types'
import TabList from './components/tab-list'

export { default as TabPanel } from './components/tab-panel'
export * from './components/_types'

interface TabProps extends Partial<TabContextValue>, TabListProps {
  children: ReactNode
}

const Tab: FC<TabProps> = ({
  activeTab: activeTabProp,
  children,
  colorName,
  onChange,
  panelHeight,
  tabList,
}) => {
  const [activeTab, setActiveTab] = useState(activeTabProp || tabList[0]?.name)
  const activeTabRef = useRef(activeTab)

  const handleChange = useCallback<TabContextValue['onChange']>(
    (tabName, event) => {
      setActiveTab(tabName)
      activeTabRef.current = tabName
      if (typeof onChange === 'function') {
        onChange(tabName, event)
      }
    },
    [onChange]
  )

  useEffect(() => {
    if (activeTabProp && activeTabProp !== activeTabRef.current) {
      setActiveTab(activeTabProp)
      activeTabRef.current = activeTabProp
    }
  }, [activeTabProp])

  return (
    <TabContext.Provider
      value={{ activeTab, onChange: handleChange, colorName, panelHeight }}
    >
      <div className='relative'>
        <TabList tabList={tabList} />
        {children}
      </div>
    </TabContext.Provider>
  )
}

export default Tab
