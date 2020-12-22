import { useCallback, useMemo, useState } from 'react'

interface PaginationHookReturn<T = {}> {
  currentData: T[]
  currentPage: number
  totalPage: number
  next(): void
  prev(): void
}

const itemsPerPage = 24

export function usePagination<T = {}>(data: T[] = []): PaginationHookReturn<T> {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPage = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage)
  }, [data])

  const currentData = useMemo(() => {
    const start = Math.max(currentPage - 2, 0) * itemsPerPage
    const end = currentPage * itemsPerPage
    return data.slice(start, end)
  }, [currentPage, data])

  const next = useCallback(() => {
    setCurrentPage(curr => Math.min(curr + 1, totalPage))
  }, [totalPage])

  const prev = useCallback(() => {
    setCurrentPage(curr => Math.max(curr - 1, 1))
  }, [])

  return { currentData, currentPage, next, totalPage, prev }
}
