import axios from 'axios'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createContainer } from 'unstated-next'
import System from '../../store/system'
import { NewsData, StatsData } from '../../SystemAPI/types'

interface usePageStateProps {
  stats: StatsData | null
  getLatestNews: () => Promise<NewsData[]>
}

function usePageState(): usePageStateProps {
  const { systemAPI } = System.useContainer()
  const [stats, setStats] = useState<StatsData | null>(null)

  const getLatestNews = useCallback(async () => {
    return await systemAPI.getLatestNews()
  }, [systemAPI])

  const updateStats = useCallback(async () => {
    const stats = await systemAPI.getStats()
    setStats(stats)
  }, [systemAPI])

  useEffect(() => {
    updateStats()
  }, [])

  return {
    getLatestNews,
    stats,
  }
}

const PageState = createContainer(usePageState)

export default PageState
