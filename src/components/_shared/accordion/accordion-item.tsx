import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FC, HTMLAttributes, MouseEventHandler } from 'react'

import clsx from 'clsx'

import ChevronIcon from '@/icons/chevron'
import NoteIcon from '@/icons/note'
import getPokemonBg from '@/utils/styles/get-pokemon-bg'
import getPokemonBorder from '@/utils/styles/get-pokemon-border'
import getPokemonColor from '@/utils/styles/get-pokemon-color'
import getPokemonScrollbar from '@/utils/styles/get-pokemon-scrollbar'

import { useAccordionContext } from './accordion-context'

interface AccordionItemProps extends HTMLAttributes<HTMLDetailsElement> {
  title: string
  value: string
}

const AccordionItem: FC<AccordionItemProps> = ({
  children,
  title,
  value,
  ...props
}) => {
  const [isShown, setIsShown] = useState(false)
  const [animationType, setAnimationType] = useState<
    AnimationType | undefined
  >()

  const { activeValue, onClickAccordion, pokemonType } = useAccordionContext()
  const isOpen = activeValue === value

  const summaryClasses = useMemo(() => {
    if (!pokemonType) {
      const commonClassName = 'hover:bg-primary-bright hover:text-neutral-dim'
      if (isOpen) {
        return `${commonClassName} bg-primary-bright text-neutral-dim`
      }
      return `${commonClassName} hover:rounded-full`
    }

    let classes: Record<string, unknown> = {
      ...getPokemonBg(pokemonType, 'hover'),
      ...getPokemonColor(pokemonType, 'hover-inversed'),
    }

    if (isOpen) {
      classes = {
        ...classes,
        ...getPokemonBg(pokemonType),
        ...getPokemonColor(pokemonType, 'inversed'),
      }
    } else {
      classes['hover:rounded-full'] = true
    }

    return classes
  }, [isOpen, pokemonType])

  const contentClasses = useMemo(() => {
    if (!pokemonType) {
      return 'details-open:scrollbar-thumb-neutral-bright2 details-open:border-primary-bright'
    }

    if (!isOpen) return ''

    return {
      ...getPokemonBorder(pokemonType),
      ...getPokemonScrollbar(pokemonType),
    }
  }, [isOpen, pokemonType])

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    e => {
      e.preventDefault()
      e.stopPropagation()
      onClickAccordion(isOpen ? '' : value, e)
    },
    [isOpen, onClickAccordion, value]
  )

  const handleAnimationEnd = useCallback(() => {
    if (animationType !== 'leave') return
    setIsShown(false)
  }, [animationType])

  useEffect(() => {
    if (isOpen) {
      setAnimationType('enter')
      setIsShown(true)
    } else {
      setAnimationType('leave')
    }
  }, [isOpen])

  return (
    <details open={isOpen && isShown} {...props}>
      <summary
        className={clsx(
          'marker:hidden flex items-center justify-between gap-2 w-full p-2',
          'border border-neutral-dim hover:border-solid hover:border-neutral-bright',
          'text-base cursor-pointer details-open:font-bold details-open:border-none',
          'rounded-tl-lg rounded-tr-lg',
          summaryClasses
        )}
        onClick={handleClick}
      >
        <span className='inline-flex items-center gap-1'>
          <NoteIcon className='w-6 h-6' />
          {title}
        </span>
        <ChevronIcon className='w-6 h-6 -rotate-90 details-open:rotate-90' />
      </summary>
      <div
        className={clsx(
          'bg-neutral-dim text-neutral-bright transition-[max-height]',
          'max-h-[calc(100vh-400px)] p-3',
          'border border-solid',
          'overflow-auto scrollbar-thin scrollbar-track-neutral-dim1',
          animationType === 'enter' && 'animate-slide-down-accordion',
          animationType === 'leave' && 'animate-slide-up-accordion',
          contentClasses
        )}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    </details>
  )
}

export default AccordionItem
