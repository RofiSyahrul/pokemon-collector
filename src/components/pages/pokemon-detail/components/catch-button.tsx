'use client'

import { catchPokemon } from './_store'

interface CatchButtonProps {
  className: string
}

export default function CatchButton({ className }: CatchButtonProps) {
  return (
    <button className={className} onClick={catchPokemon} type='button'>
      Catch me
    </button>
  )
}
