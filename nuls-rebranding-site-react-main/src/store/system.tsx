import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createContainer } from 'unstated-next'
import useLocalStorage from '../hooks/useLocalStorage'
import SystemAPI from '../SystemAPI'

interface useSystemProps {
  isMobile: boolean
  systemAPI: SystemAPI
  darkTheme: boolean
  setDarkTheme: (value: boolean) => void
  headerOpened: boolean
  headerOpenedContent: string | null
  openHeader: (value: string | null) => void
}

function useSystem(): useSystemProps {
  const [darkTheme, setDarkTheme] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(false)
  const [_headerOpened, setHeaderOpened] = useState(false)
  const [headerOpenedContent, setHeaderOpenedContent] = useState<string | null>(
    'develop'
  )

  const headerOpened = useMemo(() => {
    return _headerOpened && !!headerOpenedContent
  }, [_headerOpened, headerOpenedContent])

  // select chain info
  const systemAPIRef = useRef<SystemAPI>(new SystemAPI())
  ;(window as any).systemAPI = systemAPIRef.current

  const openHeader = useCallback((tag: string | null) => {
    if (tag) {
      setHeaderOpenedContent(tag)
    }
    setHeaderOpened(!!tag)
  }, [])

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setWindowWidth(window.innerWidth)
      },
      false
    )
  }, [])

  useEffect(() => {
    setIsMobile(windowWidth <= 600)
  }, [windowWidth])

  return {
    isMobile,
    systemAPI: systemAPIRef.current,
    darkTheme,
    setDarkTheme,
    headerOpened,
    headerOpenedContent,
    openHeader,
  }
}

const System = createContainer(useSystem)

export default System
