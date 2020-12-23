import { useCallback, useEffect, useMemo, useState } from 'react'

interface PaginationHookReturn<T = {}> {
  currentData: T[]
  currentPage: number
  totalPage: number
  next(): void
  prev(): void
}

const itemsPerPage = 24

export function usePagination<T = {}>(
  data: T[] = [],
  key: StorageKey = 'all-pokemons-page'
): PaginationHookReturn<T> {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPage = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage)
  }, [])

  const currentData = useMemo(() => {
    const start = Math.max(currentPage - 2, 0) * itemsPerPage
    const end = currentPage * itemsPerPage
    return data.slice(start, end)
  }, [currentPage])

  const next = useCallback(() => {
    setCurrentPage(curr => {
      const newPage = Math.min(curr + 1, totalPage)
      localStorage.setItem(key, `${newPage}`)
      return newPage
    })
  }, [totalPage])

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
  }, [])

  return { currentData, currentPage, next, totalPage, prev }
}
