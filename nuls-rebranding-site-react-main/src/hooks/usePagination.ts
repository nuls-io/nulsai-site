import { useMemo } from 'react'

interface paginationProps<T> {
  current: T[]
  total: number
  totalPage: number
  count: number
  currentIndex: number
}

function usePagination<T>(
  list: T[],
  currentIndex: number,
  count: number
): paginationProps<T> {
  const total = useMemo(() => {
    return list.length
  }, [list])
  const totalPage = useMemo(() => {
    return Math.ceil(total / count)
  }, [total, count])
  const current = useMemo(() => {
    const start = (currentIndex - 1) * count
    return list.slice(start, start + count)
  }, [list, currentIndex, count])

  return {
    current,
    total,
    totalPage,
    count,
    currentIndex,
  }
}

export default usePagination
