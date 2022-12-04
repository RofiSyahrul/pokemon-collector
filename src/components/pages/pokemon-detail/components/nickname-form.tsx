import { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEventHandler, FC, FormEventHandler } from 'react'

import Image from 'next/legacy/image'

import Input from '@/components/_shared/input'
import { useAppDispatch, useAppState } from '@/context/app.context'
import capitalize from '@/utils/capitalize'

interface NicknameFormProps {
  autoFocus: boolean
  onSubmitFinished(): void
  pokemonID: number
  pokemonImage: string
  pokemonName: string
}

const NicknameForm: FC<NicknameFormProps> = ({
  autoFocus,
  onSubmitFinished,
  pokemonID,
  pokemonImage,
  pokemonName,
}) => {
  const capitalizedPokemonName = capitalize(pokemonName)

  const dispatch = useAppDispatch()
  const { myPokemonNames } = useAppState()
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

      dispatch({
        type: 'ADD_MY_POKEMON',
        payload: {
          pokemon: {
            id: pokemonID,
            image: pokemonImage,
            name: pokemonName,
            nickname,
          },
        },
      })

      e.currentTarget.reset()
      onSubmitFinished()
    },
    [onSubmitFinished, pokemonID, pokemonImage, pokemonName]
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
      <Image
        alt={capitalizedPokemonName}
        height={144}
        objectFit='contain'
        src={pokemonImage}
        width={144}
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
