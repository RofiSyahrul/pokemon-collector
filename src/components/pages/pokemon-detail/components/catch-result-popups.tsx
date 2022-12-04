'use client'

import { lazy, Suspense } from 'react'

import Popup from '@/components/_shared/popup'
import ApprovedIcon from '@/icons/approved'
import RejectedIcon from '@/icons/rejected'

import type { EnrichedPokemonDetail } from '../types'
import { catchPokemon, resetCatchStatus, useCatchStatus } from './_store'

const NicknameForm = lazy(() => import('./nickname-form'))

type CatchResultPopupsProps = Pick<
  EnrichedPokemonDetail,
  'id' | 'name' | 'image' | 'pokemonName'
>

export default function CatchResultPopups({
  id,
  image,
  name,
  pokemonName,
}: CatchResultPopupsProps) {
  const catchStatus = useCatchStatus()
  const isSuccess = catchStatus === 'success'

  return (
    <>
      <Popup
        isOpen={isSuccess}
        title={`You catched ${pokemonName}!`}
        titleIcon={<ApprovedIcon className='text-primary-bright w-6 h-6' />}
      >
        <Suspense>
          <NicknameForm
            autoFocus={isSuccess}
            pokemonID={id}
            pokemonImage={image}
            pokemonName={name}
          />
        </Suspense>
      </Popup>
      <Popup
        isOpen={catchStatus === 'failed'}
        title='Failed'
        titleIcon={<RejectedIcon className='text-danger-bright w-6 h-6' />}
        footer={
          <>
            <button
              className='btn btn-outline btn-primary w-full h-12 flex-1'
              onClick={catchPokemon}
              type='button'
            >
              Try again
            </button>
            <button
              className='btn btn-solid btn-danger w-full h-12 flex-1'
              onClick={resetCatchStatus}
              type='button'
            >
              Close
            </button>
          </>
        }
      >
        {'Failed to catch '}
        <strong>{pokemonName}</strong>
      </Popup>
    </>
  )
}
