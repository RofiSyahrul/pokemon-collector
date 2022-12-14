'use client'

import type { CSSProperties, MouseEventHandler } from 'react'
import { useEffect, useState, useRef, useMemo, useCallback } from 'react'

import type { ClassValue } from 'clsx'
import clsx from 'clsx'

import { delay } from '@/utils/delay'
import getPokemonBg from '@/utils/styles/get-pokemon-bg'
import getPokemonColor from '@/utils/styles/get-pokemon-color'

import { useTabContext } from './_context'
import styles from './_styles.module.css'
import type { TabItem, TabListProps } from './_types'

interface TabButtonProps extends TabItem {
  badgeClassName?: ClassValue
  className?: ClassValue
  color?: string
}

function TabButton({
  badge,
  badgeClassName,
  className,
  color,
  name,
  title,
}: TabButtonProps) {
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
      className={clsx(styles['tab-list__item'], 'group', className)}
      id={`tab-${name}`}
      onClick={handleClick}
      role='tab'
      style={{ color }}
      tabIndex={isActive ? 0 : -1}
    >
      {title}
      {typeof badge === 'number' && badge >= 0 && (
        <div className={clsx(styles['tab-list__item__badge'], badgeClassName)}>
          <span className={styles['tab-list__item__text']}>{badge}</span>
        </div>
      )}
    </button>
  )
}

export default function TabList({ tabList }: TabListProps) {
  const { activeTab, colorName } = useTabContext()
  const containerRef = useRef<HTMLDivElement>(null)
  const [gliderStyle, setGliderStyle] = useState<CSSProperties>({
    display: 'none',
  })

  const { badgeClassName, buttonClassName, gliderClassName } = useMemo(() => {
    if (colorName) {
      return {
        badgeClassName: {
          'bg-primary-bright': true,
          ...getPokemonBg(colorName, 'group-selected-inverse'),
        },
        buttonClassName: {
          ...getPokemonColor(colorName, 'selected-inversed'),
        },
        gliderClassName: getPokemonBg(colorName),
      }
    }

    return {
      badgeClassName: 'bg-secondary-bright group-aria-selected:bg-primary-dim',
      buttonClassName: 'aria-selected:text-neutral-dim',
      gliderClassName: 'bg-primary-bright',
    }
  }, [colorName])

  useEffect(() => {
    async function adjustGliderStyle() {
      if (!activeTab || !containerRef.current) return

      const container = containerRef.current
      const activeTabButton = container.querySelector(
        `button[aria-selected="true"]`
      )

      if (!activeTabButton) return

      await delay(10)
      const { left: containerLeft } = container.getBoundingClientRect()
      const { left } = activeTabButton.getBoundingClientRect()
      setGliderStyle({
        transform: `translateX(${left - containerLeft - 1}px)`,
        width: activeTabButton.clientWidth,
      })
    }

    adjustGliderStyle()
    window.addEventListener('resize', adjustGliderStyle)

    return () => {
      window.removeEventListener('resize', adjustGliderStyle)
    }
  }, [activeTab])

  return (
    <div className={styles['tab-list']} ref={containerRef} role='tablist'>
      {tabList.map(item => (
        <TabButton
          key={item.name}
          {...item}
          badgeClassName={badgeClassName}
          className={buttonClassName}
          color={
            gliderStyle.display === 'none'
              ? 'var(--color-neutral-bright)'
              : undefined
          }
        />
      ))}
      <div
        className={clsx(styles['tab-list__glider'], gliderClassName)}
        style={gliderStyle}
      />
    </div>
  )
}
