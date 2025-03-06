import { useEffect, useState } from 'react'

export default function useDetectMobile(): [boolean] {
  const [isMobile, setMobile] = useState(window.innerWidth <= 600)
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setMobile(window.innerWidth <= 600)
      },
      false
    )
  }, [])
  return [isMobile]
}
