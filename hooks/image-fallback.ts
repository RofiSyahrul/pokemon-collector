import { useEffect, useState } from 'react'
import { useIntersection } from 'next/dist/client/use-intersection'

interface ImageFallbackReturn<T extends Element> {
  setRef(el: T | null): void
  isVisible: boolean
  src: string
}

const placeholder = '/pokeball.png'

export function useImageFallback<T extends Element = Element>(
  src: string
): ImageFallbackReturn<T> {
  const [setRef, isVisible] = useIntersection({})
  const [imageSrc, setImageSrc] = useState(placeholder)

  useEffect(() => {
    if (isVisible) {
      const img = new Image()
      img.onload = () => setImageSrc(src)
      img.onerror = () => setImageSrc(placeholder)
      img.src = src
    }
  }, [isVisible])

  return { setRef, isVisible, src: imageSrc }
}
