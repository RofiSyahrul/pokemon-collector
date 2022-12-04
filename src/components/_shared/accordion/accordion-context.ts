import { createContext, useContext } from 'react'
import type { MouseEvent } from 'react'

export interface AccordionContextValue {
  activeValue?: string
  onClickAccordion: (value: string, event: MouseEvent<HTMLElement>) => void
  pokemonType?: PokemonType
}

export const AccordionContext = createContext<AccordionContextValue>({
  onClickAccordion: () => {},
})

export function useAccordionContext(): AccordionContextValue {
  return useContext(AccordionContext)
}
