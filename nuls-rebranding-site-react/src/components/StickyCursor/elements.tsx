import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import classnames from 'classnames'
import CommonButton, { CommonButtonProps } from '../CommonButton'
import System from '../../store/system'

interface StickyElementProps {
  dark?: boolean
}

const StickyAnchor = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & StickyElementProps
>((props, ref) => {
  const { isMobile } = System.useContainer()
  const { dark, ...rest } = props

  return (
    <a
      ref={ref}
      {...rest}
      data-sticky={!isMobile ? true : undefined}
      data-sticky-dark={dark && !isMobile ? true : undefined}
    ></a>
  )
})

const StickyLink = React.forwardRef<
  HTMLAnchorElement,
  LinkProps & React.RefAttributes<HTMLAnchorElement> & StickyElementProps
>((props, ref) => {
  const { isMobile } = System.useContainer()
  const { dark, ...rest } = props

  return (
    <Link
      ref={ref}
      {...rest}
      data-sticky={!isMobile ? true : undefined}
      data-sticky-dark={dark && !isMobile ? true : undefined}
    ></Link>
  )
})

const StickyCommonButton: React.FC<CommonButtonProps & StickyElementProps> = (
  props
) => {
  const { isMobile } = System.useContainer()
  const { dark, ...rest } = props

  return (
    <CommonButton
      {...rest}
      // data-sticky={!isMobile ? true : undefined}
      // data-sticky-dark={dark && !isMobile ? true : undefined}
    ></CommonButton>
  )
}

const StickyDiv = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & StickyElementProps
>((props, ref) => {
  const { isMobile } = System.useContainer()
  const { dark, ...rest } = props

  return (
    <div
      ref={ref}
      {...rest}
      data-sticky={!isMobile ? true : undefined}
      data-sticky-dark={dark && !isMobile ? true : undefined}
    ></div>
  )
})

export { StickyAnchor, StickyLink, StickyCommonButton, StickyDiv }
