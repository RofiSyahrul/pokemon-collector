import clsx from 'clsx'
import Image from 'next/image'

interface LoadingProps {
  size?: number
  withContainer?: boolean
}

export default function Loading({ size = 128, withContainer }: LoadingProps) {
  const node = (
    <Image
      aria-busy
      alt='Loading...'
      className='animate-loading-globe object-contain'
      src={IMAGE_FALLBACK}
      height={size}
      width={size}
    />
  )

  if (!withContainer) return node

  return (
    <main
      className={clsx(
        'w-full h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)]',
        'flex flex-col items-center justify-center'
      )}
    >
      {node}
    </main>
  )
}
