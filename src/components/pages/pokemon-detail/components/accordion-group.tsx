'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'

import Accordion from '@/components/_shared/accordion'

import {
  resetCatchStatus,
  setActiveAccordion,
  useActiveAccordion,
} from './_store'

interface AccordionGroupProps {
  children: ReactNode
  pokemonType: PokemonType
}

export default function AccordionGroup({
  children,
  pokemonType,
}: AccordionGroupProps) {
  const activeAccordion = useActiveAccordion()

  useEffect(() => {
    setActiveAccordion('about')

    return () => {
      resetCatchStatus()
      if (process.env.NODE_ENV === 'production') {
        setActiveAccordion('')
      }
    }
  }, [])

  return (
    <Accordion.Group
      activeValue={activeAccordion}
      className='flex flex-col w-full'
      onClickAccordion={setActiveAccordion}
      pokemonType={pokemonType}
    >
      {children}
    </Accordion.Group>
  )
}
