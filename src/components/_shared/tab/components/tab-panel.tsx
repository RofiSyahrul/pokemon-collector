'use client'

import type { ReactNode } from 'react'

import { useTabContext } from './_context'
import styles from './_styles.module.css'

interface TabPanelProps {
  children: ReactNode
  name: string
}

export default function TabPanel({ children, name }: TabPanelProps) {
  const { activeTab, panelHeight } = useTabContext()
  const isActive = name === activeTab

  return (
    <div
      aria-labelledby={`tab-${name}`}
      className={styles['tab-panel']}
      hidden={!isActive}
      id={`tabpanel-${name}`}
      role='tabpanel'
      tabIndex={0}
      style={{ height: panelHeight }}
    >
      {children}
    </div>
  )
}
