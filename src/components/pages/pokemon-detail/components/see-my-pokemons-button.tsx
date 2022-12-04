'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { useActiveAccordion } from './_store'

interface SeeMyPokemonsButtonProps {
  className: string
}

export default function SeeMyPokemonsButton({
  className,
}: SeeMyPokemonsButtonProps) {
  const activeAccordion = useActiveAccordion()

  return (
    <Link
      href='/my-pokemons'
      className={clsx(
        className,
        activeAccordion ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      See my pokemons
    </Link>
  )
}
