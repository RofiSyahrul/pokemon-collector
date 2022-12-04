'use client'

import type { FC, HTMLAttributes } from 'react'

import { AccordionContext } from './accordion-context'
import type { AccordionContextValue } from './accordion-context'

interface AccordionGroupProps
  extends AccordionContextValue,
    HTMLAttributes<HTMLDivElement> {}

const AccordionGroup: FC<AccordionGroupProps> = ({
  activeValue,
  children,
  onClickAccordion,
  pokemonType,
  ...props
}) => {
  return (
    <AccordionContext.Provider
      value={{ activeValue, onClickAccordion, pokemonType }}
    >
      <div {...props}>{children}</div>
    </AccordionContext.Provider>
  )
}

export default AccordionGroup
