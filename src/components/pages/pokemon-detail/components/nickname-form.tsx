'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEventHandler, FC, FormEventHandler } from 'react'

import Img from '@/components/_shared/image'
import Input from '@/components/_shared/input'
import { addMyPokemon, useMyPokemonNames } from '@/store/app.store'
import capitalize from '@/utils/capitalize'

import { resetCatchStatus, setActiveAccordion } from './_store'

interface NicknameFormProps {
  autoFocus: boolean
  pokemonID: number
  pokemonImage: string
  pokemonName: string
}

const NicknameForm: FC<NicknameFormProps> = ({
  autoFocus,
  pokemonID,
  pokemonImage,
  pokemonName,
}) => {
  const capitalizedPokemonName = capitalize(pokemonName)

  const myPokemonNames = useMyPokemonNames()
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      const { value } = e.target
      const lowerCasedValue = value.toLowerCase()
      setErrorMessage(
        myPokemonNames.some(name => name.toLowerCase() === lowerCasedValue)
          ? `${value} already exists`
          : ''
      )
    },
    [myPokemonNames]
  )

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const nickname = formData.get('nickname')
      if (typeof nickname !== 'string' || !nickname) return

      addMyPokemon({
        id: pokemonID,
        image: pokemonImage,
        name: pokemonName,
        nickname,
      })

      e.currentTarget.reset()

      resetCatchStatus()
      setActiveAccordion('nickname')
    },
    [pokemonID, pokemonImage, pokemonName]
  )

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <form
      className='w-full flex flex-col gap-4 items-center'
      onSubmit={handleSubmit}
    >
      <Img
        alt={capitalizedPokemonName}
        height={144}
        src={pokemonImage}
        width={144}
        style={{ objectFit: 'contain' }}
      />
      <Input
        autoComplete='off'
        autoFocus={autoFocus}
        containerStyle={{ minHeight: 82 }}
        ref={inputRef}
        hasError={!!errorMessage}
        label={`Give a nickname for ${capitalizedPokemonName}`}
        name='nickname'
        onChange={handleChange}
        placeholder='e.g. "Pika pika lumba lumba"'
        required
        suffixNode={
          <button
            className='btn btn-solid btn-primary h-8 w-fit'
            disabled={!!errorMessage}
            type='submit'
          >
            Save
          </button>
        }
        supportText={errorMessage}
      />
    </form>
  )
}

export default NicknameForm
