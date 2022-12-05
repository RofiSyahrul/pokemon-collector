'use client'

import type { ReactEventHandler } from 'react'
import { useCallback, useState } from 'react'

import clsx from 'clsx'
import { useIntersection } from 'next/dist/client/use-intersection'
import NextImage from 'next/image'
import type { ImageProps } from 'next/image'

const loader: ImageProps['loader'] = ({ src }) => src

const loadedImages = new Set<ImageProps['src']>()

export default function Img({
  className,
  onError,
  onLoad,
  src,
  ...props
}: ImageProps) {
  const hasBeenLoaded = loadedImages.has(src)
  const [imageSrc, setImageSrc] = useState(src)

  const [setRef, isVisible] = useIntersection({})
  const isLoaded = isVisible || hasBeenLoaded

  const handleLoad = useCallback<ReactEventHandler<HTMLImageElement>>(
    e => {
      if (!loadedImages.has(e.currentTarget.src)) {
        loadedImages.add(e.currentTarget.src)
      }
      if (typeof onLoad === 'function') onLoad(e)
    },
    [onLoad]
  )

  const handleError = useCallback<ReactEventHandler<HTMLImageElement>>(
    e => {
      setImageSrc(IMAGE_FALLBACK)
      if (typeof onError === 'function') onError(e)
    },
    [onError]
  )

  return (
    <NextImage
      className={clsx(!isLoaded && 'animate-pokeball', className)}
      key={`${isLoaded}-${imageSrc}`}
      loader={loader}
      ref={setRef}
      src={isLoaded ? imageSrc : IMAGE_FALLBACK}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  )
}
