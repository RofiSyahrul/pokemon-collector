import { useEffect, useState } from 'react'
import { useIntersection } from 'next/dist/client/use-intersection'
import { checkImageAvailability } from 'lib/helpers'

interface ImageFallbackReturn<T extends Element> {
  setRef(el: T | null): void
  isVisible: boolean
  src: string
}

export function useImageFallback<T extends Element = Element>(
  src: string
): ImageFallbackReturn<T> {
  const [setRef, isVisible] = useIntersection({})
  const [imageSrc, setImageSrc] = useState(IMAGE_FALLBACK)

  useEffect(() => {
    if (isVisible) {
      checkImageAvailability(src).then(isAvailable => {
        if (isAvailable) setImageSrc(src)
      })
    }
  }, [isVisible, src])

  return { setRef, isVisible, src: imageSrc }
}
