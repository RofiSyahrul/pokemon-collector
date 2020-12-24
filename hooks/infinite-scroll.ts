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
      const lastElement = document.querySelector(lastElementSelector)
      const firstElement = document.querySelector(firstElementSelector)
      if (!lastElement || !firstElement) return
      const { offsetTop, clientHeight } = lastElement as HTMLElement
      const { pageYOffset, innerHeight } = window
      const lastElementBottomPos = offsetTop + clientHeight
      const windowScrollPos = pageYOffset + innerHeight
      if (windowScrollPos > lastElementBottomPos) {
        next()
        return
      }
      const { offsetTop: firstElementPos } = firstElement as HTMLElement
      if (pageYOffset < firstElementPos) {
        prev()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [next, prev])
}
