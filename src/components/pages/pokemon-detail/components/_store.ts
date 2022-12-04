import create from 'zustand'

import { delay } from '@/utils/delay'

type CatchStatus = 'idle' | 'failed' | 'success' | 'catching'

type State = {
  activeAccordion: string
  catchStatus: CatchStatus
}

type Action = {
  catchPokemon(): void
  resetCatchStatus(): void
  setActiveAccordion(value: string): void
}

const CATCH_DELAY = 500
const SUCCESS_PROBABILITY = 0.5

const useStore = create<State & Action>(set => ({
  activeAccordion: 'about',
  catchStatus: 'idle',
  catchPokemon() {
    set({ catchStatus: 'catching' })
    delay(CATCH_DELAY).then(() => {
      const isSuccess = Math.random() < SUCCESS_PROBABILITY
      set({ catchStatus: isSuccess ? 'success' : 'failed' })
    })
  },
  resetCatchStatus() {
    set({ catchStatus: 'idle' })
  },
  setActiveAccordion(value) {
    set({ activeAccordion: value })
  },
}))

export const { catchPokemon, resetCatchStatus, setActiveAccordion } =
  useStore.getState()

export const useCatchStatus = () => useStore(store => store.catchStatus)

export const useActiveAccordion = () => useStore(store => store.activeAccordion)
