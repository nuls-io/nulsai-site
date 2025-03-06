import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createContainer } from 'unstated-next'
import System from '../../../store/system'

export interface FiberObjectSize {
  width: number
  height: number
}

interface useFiberObjectStateProps {
  size: FiberObjectSize
}

function useFiberObjectState(): useFiberObjectStateProps {
  const { isMobile } = System.useContainer()
  const [size, setSize] = useState<FiberObjectSize>({ width: 0, height: 0 })

  const updateSize = useCallback(() => {
    const dom = document.querySelector('.card')

    if (dom) {
      const width = dom.clientWidth
      const height = dom.clientHeight
      setSize({ width, height })
      return
    }

    if (isMobile) {
      const width = window.innerWidth - 40
      const height = window.innerHeight * 0.8
      setSize({ width, height })
    } else {
      const width = Math.min(window.innerWidth - 40, 1400)
      const height = window.innerHeight * 0.8
      setSize({ width, height })
    }
  }, [isMobile])

  useEffect(() => {
    const handleResize = () => updateSize()
    window.addEventListener('resize', handleResize, false)
    updateSize()
    return () => {
      window.removeEventListener('resize', handleResize, false)
    }
  }, [])

  return {
    size,
  }
}

const FiberObjectState = createContainer(useFiberObjectState)

export default FiberObjectState
