'use client'

import type { MouseEventHandler } from 'react'
import { useRef, useMemo, useCallback } from 'react'

import type { ClassValue } from 'clsx'
import clsx from 'clsx'

import getPokemonBg from '@/utils/styles/get-pokemon-bg'
import getPokemonColor from '@/utils/styles/get-pokemon-color'

import { useTabContext } from './_context'
import styles from './_styles.module.css'
import type { TabItem, TabListProps } from './_types'

interface TabButtonProps extends TabItem {
  classes: {
    badge: ClassValue
    container: ClassValue
    selector: ClassValue
  }
}

function TabButton({ badge, classes, name, title }: TabButtonProps) {
  const { activeTab, onChange } = useTabContext()
  const isActive = activeTab === name

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    event => {
      onChange(name, event)
    },
    [name, onChange]
  )

  return (
    <button
      aria-controls={`tabpanel-${name}`}
      aria-selected={isActive}
      className={clsx(styles['tab-list__item'], 'group', classes.container)}
      id={`tab-${name}`}
      onClick={handleClick}
      role='tab'
      tabIndex={isActive ? 0 : -1}
    >
      <div
        className={clsx(
          styles['tab-list__item__selector'],
          'oval-3d',
          classes.selector
        )}
      />
      {title}
      {typeof badge === 'number' && badge >= 0 && (
        <div
          className={clsx(
            styles['tab-list__item__badge'],
            'oval-3d',
            classes.badge
          )}
        >
          <span className={styles['tab-list__item__text']}>{badge}</span>
        </div>
      )}
    </button>
  )
}

export default function TabList({ tabList }: TabListProps) {
  const { colorName } = useTabContext()
  const containerRef = useRef<HTMLDivElement>(null)

  const buttonClasses = useMemo<TabButtonProps['classes']>(() => {
    if (colorName) {
      return {
        badge: 'bg-primary-bright',
        container: getPokemonColor(colorName, 'selected-inversed'),
        selector: getPokemonBg(colorName),
      }
    }

    return {
      badge: 'bg-secondary-bright group-aria-selected:bg-primary-dim',
      container: 'aria-selected:text-neutral-dim',
      selector: 'bg-primary-bright',
    }
  }, [colorName])

  return (
    <div className={styles['tab-list']} ref={containerRef} role='tablist'>
      {tabList.map(item => (
        <TabButton key={item.name} {...item} classes={buttonClasses} />
      ))}
    </div>
  )
}
