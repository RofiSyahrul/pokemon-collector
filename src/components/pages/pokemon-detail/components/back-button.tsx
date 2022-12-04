'use client'

import { useRouter } from 'next/navigation'

import ArrowIcon from '@/icons/arrow'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      className='btn text-inherit w-8 h-8'
      onClick={router.back}
      style={{ padding: 0 }}
      title='Go back'
      type='button'
    >
      <ArrowIcon className='w-8 h-8' />
      <span className='sr-only'>Go back</span>
    </button>
  )
}
