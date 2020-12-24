import { useCallback, useEffect, useMemo, useState } from 'react'

interface PaginationHookReturn<T = {}> {
  currentData: T[]
  currentPage: number
  totalPage: number
  next(): void
  prev(): void
}

export function usePagination<T = {}>(
  data: T[] = [],
  key: StorageKey = 'all-pokemons-page'
): PaginationHookReturn<T> {
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPage = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage)
  }, [itemsPerPage])

  const currentData = useMemo(() => {
    const start = Math.max(currentPage - 2, 0) * itemsPerPage
    const end = currentPage * itemsPerPage
    return data.slice(start, end)
  }, [currentPage, itemsPerPage])

  const next = useCallback(() => {
    setCurrentPage(curr => {
      const newPage = Math.min(curr + 1, totalPage)
      localStorage.setItem(key, `${newPage}`)
      return newPage
    })
  }, [totalPage, itemsPerPage])

  const prev = useCallback(() => {
    setCurrentPage(curr => {
      const newPage = Math.max(curr - 1, 1)
      localStorage.setItem(key, `${newPage}`)
      return newPage
    })
  }, [])

  useEffect(() => {
    const savedPage = Number(localStorage.getItem(key) || '1')
    if (!Number.isNaN(savedPage) && savedPage !== 1) {
      setCurrentPage(savedPage)
    }
    if (window.innerHeight > 800) {
      setItemsPerPage(Math.ceil((window.innerHeight - 64) / 116) * 4 + 4)
    }
  }, [])

  return { currentData, currentPage, next, totalPage, prev }
}
