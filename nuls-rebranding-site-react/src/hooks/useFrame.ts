import { useRef, useEffect } from 'react'

export default function useFrame(
  callback: (dtTime: number, startTime: number) => void,
  dependencies: any[]
): void {
  const startTime = useRef(0)
  const savedCallback = useRef<(dtTime: number, startTime: number) => void>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    startTime.current = new Date().getTime()
  }, dependencies)

  useEffect(() => {
    const tick = (): void => {
      const dtTime = new Date().getTime() - startTime.current
      if (savedCallback.current) {
        savedCallback.current(dtTime, startTime.current)
      }
      requestAnimationFrame(tick)
    }
    tick()

    return () => {
      savedCallback.current = () => {}
    }
  }, [])
}
