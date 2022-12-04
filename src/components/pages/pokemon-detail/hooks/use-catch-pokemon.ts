import { useCallback, useState } from 'react'

import { delay } from '@/utils/delay'

type CatchStatus = 'idle' | 'failed' | 'success'

interface UseCatchPokemonReturn {
  catchPokemon(): Promise<void>
  catchStatus: CatchStatus
  isCatching: boolean
  resetCatchStatus(): void
}

const SUCCESS_PROBABILITY = 0.5

export default function useCatchPokemon(): UseCatchPokemonReturn {
  const [catchStatus, setCatchStatus] = useState<CatchStatus>('idle')
  const [isCatching, setIsCatching] = useState(false)

  const catchPokemon = useCallback(async () => {
    setIsCatching(true)
    await delay(500)
    const isSuccess = Math.random() > SUCCESS_PROBABILITY
    setCatchStatus(isSuccess ? 'success' : 'failed')
    setIsCatching(false)
  }, [])

  const resetCatchStatus = useCallback(() => {
    setCatchStatus('idle')
  }, [])

  return { catchPokemon, catchStatus, isCatching, resetCatchStatus }
}
