import { useEffect } from 'react'

interface InfiniteScrolProps {
  firstElementSelector?: string
  lastElementSelector?: string
  next?(): void
  prev?(): void
}

export function useInfiniteScroll({
  firstElementSelector = '',
  lastElementSelector = '',
  next = () => {},
  prev = () => {},
}: InfiniteScrolProps = {}): void {
  useEffect(() => {
    function handleScroll() {
      const lastElement: HTMLElement = document.querySelector(
        lastElementSelector
      )
      const firstElement: HTMLElement = document.querySelector(
        firstElementSelector
      )
      if (!lastElement || !firstElement) return
      const { offsetTop, clientHeight } = lastElement
      const { pageYOffset, innerHeight } = window
      const lastElementBottomPos = offsetTop + clientHeight
      const windowScrollPos = pageYOffset + innerHeight
      if (windowScrollPos > lastElementBottomPos) {
        next()
        return
      }
      const { offsetTop: firstElementPos } = firstElement
      if (pageYOffset < firstElementPos) {
        prev()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
