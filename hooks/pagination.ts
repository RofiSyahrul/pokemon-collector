import { useCallback, useEffect, useMemo, useState } from 'react'

interface PaginationHookReturn<T = {}> {
  currentData: T[]
  currentPage: number
  totalPage: number
  next(): void
}

const itemsPerPage = 32

export function usePagination<T = {}>(
  data: T[] = [],
  key: StorageKey = ''
): PaginationHookReturn<T> {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPage = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage)
  }, [data])

  const currentData = useMemo(() => {
    return data.slice(0, currentPage * itemsPerPage)
  }, [currentPage, data])

  const next = useCallback(() => {
    setCurrentPage(prev => {
      const nextPage = Math.min(prev + 1, totalPage)
      localStorage.setItem(key, `${nextPage}`)
      return nextPage
    })
  }, [totalPage])

  useEffect(() => {
    const savedPage = Number(localStorage.getItem(key) || 1)
    if (savedPage > 1) setCurrentPage(savedPage)
  }, [])

  return { currentData, currentPage, next, totalPage }
}
