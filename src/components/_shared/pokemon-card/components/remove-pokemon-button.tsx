'use client'

import type { MouseEventHandler } from 'react'
import { useCallback } from 'react'

import clsx from 'clsx'

import { removeMyPokemon } from '@/store/app.store'

interface RemovePokemonButtonProps {
  className?: string
  nickname: string
}

export default function RemovePokemonButton({
  className,
  nickname,
}: RemovePokemonButtonProps) {
  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(e => {
    e.stopPropagation()
    const { dataset } = e.currentTarget
    removeMyPokemon(dataset.nickname ?? '')
  }, [])

  return (
    <button
      className={clsx('btn btn-solid btn-danger min-h-fit', className)}
      data-nickname={nickname}
      onClick={handleClick}
      type='button'
    >
      Remove
    </button>
  )
}
