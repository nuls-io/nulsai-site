import React, { useCallback, useEffect, useRef, PropsWithChildren } from 'react'
import { Layout, Breadcrumb, theme, Tag, Space, Button, Divider } from 'antd'
import classnames from 'classnames'
import './style.scss'
import System from '../../store/system'
import AnimeBackground2 from '../AnimeBackground2'

export interface CommonPageProps {
  title?: string
  description?: string
  className?: string
  id?: string
  darkTheme?: boolean
  contentNoLimit?: boolean
}

const CommonPage: React.FC<PropsWithChildren<CommonPageProps>> = ({
  className,
  children,
  title,
  description,
  id,
  darkTheme = true,
  contentNoLimit = false,
}) => {
  const { setDarkTheme } = System.useContainer()

  useEffect(() => {
    setDarkTheme(darkTheme)
  }, [darkTheme, setDarkTheme])

  return (
    <div
      className={classnames('common-page', className, { dark: darkTheme })}
      id={id}
    >
      <div className="common-page-header">
        <AnimeBackground2 />
        <div
          className={classnames('common-page-content', {
            'no-limit': contentNoLimit,
          })}
        >
          {title && <h1 className="common-page-title">{title}</h1>}
          {description && (
            <div className="common-page-description">{description}</div>
          )}
        </div>
      </div>
      <div className="common-page-content">{children}</div>
    </div>
  )
}

export const CommonPageSubtitle: React.FC<
  PropsWithChildren<{ extra?: React.ReactNode }>
> = ({ children, extra }) => {
  return (
    <>
      <div
        className={classnames('common-page-subtitle', { 'has-extra': !!extra })}
      >
        <span className="common-page-subtitle-text">{children}</span>
      </div>
      {extra && <div className="common-page-subtitle-extra">{extra}</div>}
    </>
  )
}

export default CommonPage
