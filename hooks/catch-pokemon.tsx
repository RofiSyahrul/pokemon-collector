import { memo, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Input, useFeedback } from 'goods-ui'
import { Box, Icon } from 'goods-core'
import isEqual from 'react-fast-compare'
import Image from 'next/image'
import { useAppDispatch, useAppState } from 'context/app.context'
import { submitOnEnter } from 'lib/helpers'

interface CatchPokemonHookProps {
  pokemonId: number
  pokemonImage: string
}

type Status = 'idle' | 'failed' | 'success'

interface CatchPokemonHookReturn {
  isCatching: boolean
  status: Status
  setCatching: React.Dispatch<React.SetStateAction<boolean>>
}

interface NicknameInputProps extends CatchPokemonHookProps {
  pokemonName: string
  setStatus: React.Dispatch<React.SetStateAction<Status>>
}

function randomizeSuccessCatch(delay = 500): Promise<boolean> {
  return new Promise(res => {
    setTimeout(() => {
      res(Math.random() > 0.5)
    }, delay)
  })
}

const NicknameInput = memo<NicknameInputProps>(
  ({ pokemonImage, pokemonId, pokemonName, setStatus }) => {
    const [value, setValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useAppDispatch()
    const { myPokemonNames } = useAppState()

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        const lowerCase = val.toLowerCase()
        setValue(val)
        setErrorMessage(
          myPokemonNames.some(name => name.toLowerCase() === lowerCase)
            ? `${val} already exists`
            : ''
        )
      },
      [myPokemonNames]
    )

    const onSubmit = useCallback(() => {
      if (!value || errorMessage) return

      dispatch({
        type: 'ADD_MY_POKEMON',
        payload: {
          pokemon: {
            id: pokemonId,
            name: pokemonName,
            image: pokemonImage,
            nickname: value,
          },
        },
      })
      setStatus('idle')
    }, [value, pokemonImage, pokemonId, pokemonName, errorMessage])

    return (
      <Box w fAlign='center'>
        <Box s='144px' posi='relative'>
          <Image
            alt='Pokemon image'
            src={pokemonImage}
            layout='fill'
            objectFit='contain'
          />
        </Box>
        <Input
          label='Give a nickname to this pokemon'
          placeholder='e.g. "Pika pika lumba lumba"'
          name='nickname'
          autoComplete='off'
          value={value}
          onChange={onChange}
          onKeyDown={submitOnEnter(onSubmit)}
          supText={errorMessage}
          isError={!!errorMessage}
          containerProps={{ w: true }}
        />
        <Button
          bg='green50'
          c='white'
          disabled={!value || !!errorMessage}
          onClick={onSubmit}
          px='xs'
        >
          Submit
        </Button>
      </Box>
    )
  },
  isEqual
)

export function useCatchPokemon({
  pokemonId,
  pokemonImage,
}: CatchPokemonHookProps): CatchPokemonHookReturn {
  const { query } = useRouter()
  const { name } = query
  const [status, setStatus] = useState<Status>('idle')
  const [isCatching, setCatching] = useState(false)
  const { openFeedback, closeFeedback } = useFeedback()

  useEffect(() => {
    if (isCatching) {
      randomizeSuccessCatch(500).then(result => {
        setStatus(result ? 'success' : 'failed')
        setCatching(false)
      })
    }
  }, [isCatching])

  useEffect(() => {
    if (status === 'failed' && !isCatching) {
      openFeedback({
        title: 'Failed',
        closeIcon: false,
        body: `
          <span>
            You are not successful to catch <strong>${name}</strong>
          </span>
        `,
        prefix: <Icon name='rejected' c='red60' />,
        actions: [
          {
            text: 'Try again',
            bg: 'white',
            b: '1px solid',
            bC: 'green50',
            c: 'green50',
            px: 'xs',
            mr: 'xxs',
            onClick() {
              setCatching(true)
            },
          },
          {
            text: 'Close',
            bg: 'green50',
            c: 'white',
            px: 'xs',
            onClick() {
              setStatus('idle')
            },
          },
        ],
      })
    } else if (status === 'success' && !isCatching) {
      openFeedback({
        title: 'You catched it!',
        closeIcon: false,
        prefix: <Icon name='approved' c='green50' />,
        body: (
          <NicknameInput
            pokemonId={pokemonId}
            pokemonImage={pokemonImage}
            pokemonName={name as string}
            setStatus={setStatus}
          />
        ),
        actions: [],
      })
    } else {
      closeFeedback()
    }
  }, [status, name, isCatching, pokemonId, pokemonImage])

  return { isCatching, status, setCatching }
}
