import { useEffect } from 'react'

interface InfiniteScrolProps {
  lastElementSelector?: string
  next?(): void
}

export function useInfiniteScroll({
  lastElementSelector = '',
  next = () => {},
}: InfiniteScrolProps = {}): void {
  useEffect(() => {
    function handleScroll() {
      const lastElement: HTMLElement = document.querySelector(
        lastElementSelector
      )
      if (!lastElement) return
      const { offsetTop, clientHeight } = lastElement
      const lastElementBottomPos = offsetTop + clientHeight
      const windowScrollPos = window.pageYOffset + window.innerHeight
      if (windowScrollPos > lastElementBottomPos) {
        next()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
