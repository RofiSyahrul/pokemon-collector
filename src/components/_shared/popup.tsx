'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { useScrollLock } from '@/hooks/use-scroll-lock'

import styles from './popup.module.css'

interface PopupProps {
  children: ReactNode
  className?: string
  footer?: ReactNode
  isOpen?: boolean
  onClose?(): void
  title?: string
  titleIcon?: ReactNode
}

const popupContainerID = '__POPUP__'

function getContainer(): HTMLElement {
  let container = document.getElementById(popupContainerID)
  if (container) return container

  container = document.createElement('div')
  container.setAttribute('id', popupContainerID)
  document.body.appendChild(container)
  return container
}

const Popup: FC<PopupProps> = ({
  children,
  className,
  footer,
  isOpen = false,
  onClose,
  title,
  titleIcon,
}) => {
  const containerRef = useRef<HTMLElement>()
  const isShownRef = useRef(false)

  const [isShown, setIsShown] = useState(false)
  const [animationType, setAnimationType] = useState<
    AnimationType | undefined
  >()

  useScrollLock(isShown)

  const handleAnimationEnd = useCallback(() => {
    if (animationType !== 'leave') return
    setIsShown(false)
  }, [animationType])

  useEffect(() => {
    if (isOpen === isShownRef.current) return

    if (isOpen) {
      if (!containerRef.current) {
        containerRef.current = getContainer()
      }
      setAnimationType('enter')
      setIsShown(true)
    } else {
      setAnimationType('leave')
    }

    isShownRef.current = isOpen
  }, [isOpen])

  const popupNode = (
    <div
      aria-hidden={!isShown}
      className={clsx(
        styles.popup,
        animationType && styles[`popup_${animationType}`]
      )}
      onAnimationEnd={handleAnimationEnd}
    >
      <div aria-hidden className={styles.popup__mask} onClick={onClose} />
      <dialog className={styles.popup__dialog} open={isShown}>
        {title && (
          <h2 className={styles.popup__title}>
            {titleIcon}
            {title}
          </h2>
        )}
        <div className={clsx(styles.popup__body, className)}>{children}</div>
        {footer && <div className={styles.popup__footer}>{footer}</div>}
      </dialog>
    </div>
  )

  if (!containerRef.current) return null
  return createPortal(popupNode, containerRef.current)
}

export default Popup
