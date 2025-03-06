import React, { useEffect } from 'react'
import {
  SpringOptions,
  motion,
  animate,
  transform,
  useMotionValue,
  useSpring,
} from 'motion/react'
import './style.scss'
import System from '../../store/system'
export * from './elements'
import classnames from 'classnames'

const SPRING_OPTIONS: SpringOptions = {
  damping: 20,
  stiffness: 300,
  mass: 0.5,
}

const UNSTICK_THRESHOLD_DISTANCE = 60

const SHADOW_SIZE = 20
const SHADOW_SIZE_ON_HOVER = 50

const getDistanceFromRect = (rect: DOMRect, x: number, y: number) => {
  const { top, left, width, height } = rect
  const right = left + width
  const bottom = top + height
  const nearestX = Math.max(left, Math.min(x, right))
  const nearestY = Math.max(top, Math.min(y, bottom))
  const dx = x - nearestX
  const dy = y - nearestY

  return Math.sqrt(dx * dx + dy * dy)
}

const StickyCursor: React.FC = () => {
  const { darkTheme } = System.useContainer()
  const [isHovered, setIsHovered] = React.useState(false)
  const hoveredElementRef = React.useRef<HTMLElement | null>(null)

  useEffect(() => {
    const calculate = (x: number, y: number) => {
      // animate pointer
      mouse.x.set(x)
      mouse.y.set(y)

      if (hoveredElementRef.current) {
        // 防止直接穿越到其他元素，不进行回弹
        animate(hoveredElementRef.current, { x: 0, y: 0 }, { duration: 0 })
      }

      // animate pointerShadow
      if (isHovered && hoveredElementRef.current) {
        const { top, left, width, height } =
          hoveredElementRef.current.getBoundingClientRect()
        const center = { x: left + width / 2, y: top + height / 2 }
        const r = { x: x - center.x, y: y - center.y }

        const distance = getDistanceFromRect(
          hoveredElementRef.current.getBoundingClientRect(),
          x,
          y
        )

        const newScaleX = transform(
          distance,
          [0, UNSTICK_THRESHOLD_DISTANCE],
          [1, 1.2]
        )
        const newScaleY = transform(
          distance,
          [0, UNSTICK_THRESHOLD_DISTANCE],
          [1, 0.8]
        )
        pointerShadowScale.x.set(newScaleX)
        pointerShadowScale.y.set(newScaleY)

        pointerShadowAngle.set(`${Math.atan2(r.y, r.x)}rad`)

        pointerShadow.x.set(center.x + r.x * 0.12)
        pointerShadow.y.set(center.y + r.y * 0.12)

        animate(
          hoveredElementRef.current,
          { x: r.x * 0.1, y: r.y * 0.1 },
          { duration: 0 }
        )

        if (distance > UNSTICK_THRESHOLD_DISTANCE) {
          setIsHovered(false)
          animate(
            hoveredElementRef.current,
            { x: 0, y: 0 },
            { type: 'spring', stiffness: 300, damping: 10, mass: 1 }
          )
          hoveredElementRef.current = null
        }
      } else {
        pointerShadow.x.set(x)
        pointerShadow.y.set(y)
        pointerShadowScale.x.set(1)
        pointerShadowScale.y.set(1)
      }
    }

    const manageMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      calculate(clientX, clientY)
    }
    const manageMouseOver = (e: MouseEvent) => {
      setIsHovered(true)
      hoveredElementRef.current = e.target as HTMLElement
    }
    const manageWindowScroll = (e: Event) => {
      // console.log(e.pageX)
      if (isHovered && hoveredElementRef.current) {
        setIsHovered(false)
        animate(
          hoveredElementRef.current,
          { x: 0, y: 0 },
          { type: 'spring', stiffness: 300, damping: 10, mass: 1 }
        )
        hoveredElementRef.current = null

        pointerShadow.x.set(mouse.x.get())
        pointerShadow.y.set(mouse.y.get())
        pointerShadowScale.x.set(1)
        pointerShadowScale.y.set(1)
      }

      // const x = mouse.x.get()
      // const y = mouse.y.get()
      // calculate(x, y)
    }

    window.addEventListener('mousemove', manageMouseMove)
    window.addEventListener('scroll', manageWindowScroll)

    const eventDelegateManageMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const v = target.hasAttribute('data-sticky')
      if (v) {
        manageMouseOver(e)
      }
      // console.log(target, v)
    }

    document.body.addEventListener(
      'mouseenter',
      eventDelegateManageMouseOver,
      true
    )

    document.body.style.setProperty('cursor', 'none')

    return () => {
      window.removeEventListener('mousemove', manageMouseMove)
      document.body.removeEventListener(
        'mouseenter',
        eventDelegateManageMouseOver,
        true
      )
      document.body.style.setProperty('cursor', null)
    }
  }, [isHovered])

  useEffect(() => {
    if (darkTheme) {
      document.body.setAttribute('data-sticky-dark', '')
    } else {
      document.body.removeAttribute('data-sticky-dark')
    }
  }, [darkTheme])

  const mouse = { x: useMotionValue(0), y: useMotionValue(0) }
  const pointerShadow = { x: useMotionValue(0), y: useMotionValue(0) }
  const pointerShadowScale = { x: useMotionValue(1), y: useMotionValue(1) }
  const smoothPointerShadow = {
    x: useSpring(pointerShadow.x, SPRING_OPTIONS),
    y: useSpring(pointerShadow.y, SPRING_OPTIONS),
  }
  const pointerShadowAngle = useMotionValue(`0rad`)

  const cursorSize = isHovered ? SHADOW_SIZE_ON_HOVER : SHADOW_SIZE

  return (
    <>
      <motion.div
        transformTemplate={({
          translateX,
          translateY,
          rotate,
          scaleX,
          scaleY,
        }) =>
          `translateX(${translateX}) translateY(${translateY}) rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`
        }
        style={{
          left: smoothPointerShadow.x,
          top: smoothPointerShadow.y,
          translateX: '-50%',
          translateY: '-50%',
          scaleX: pointerShadowScale.x,
          scaleY: pointerShadowScale.y,
          rotate: pointerShadowAngle,
        }}
        className={classnames(
          'w-5 h-5 fixed bg-black rounded-full pointer-events-none',
          'sticky-cursor',
          'large-point'
        )}
        animate={{
          width: cursorSize,
          height: cursorSize,
        }}
      />

      <motion.div
        style={{ left: mouse.x, top: mouse.y }}
        className={classnames(
          'w-2 h-2 fixed bg-white border-black -translate-x-1/2 -translate-y-1/2 border rounded-full pointer-events-none',
          'sticky-cursor',
          'small-point'
        )}
      />
    </>
  )
}

const WrappedStickyCursor: React.FC = () => {
  const { isMobile } = System.useContainer()

  if (isMobile) return null
  return <StickyCursor />
}

export default WrappedStickyCursor
