import { useRef, useEffect } from 'react'

function useIsFirstRender(): boolean {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}
export default useIsFirstRender
