import React, { PropsWithChildren } from 'react'
import classnames from 'classnames'
import './style.scss'

interface CommonGridProps<T = any> {
  data: T[]
  renderItemContent: (item: T, index: number) => React.ReactNode
  className?: string
  columes?: number
  borderd?: boolean
}

const CommonGrid: React.FC<CommonGridProps> = ({
  data,
  renderItemContent,
  className,
  columes = 3,
  borderd = true,
}) => {
  return (
    <div
      className={classnames('common-grid', className, `c${columes}`, {
        borderd,
      })}
    >
      {data.map((item, i) => (
        <div className="common-grid-item" key={i}>
          {renderItemContent(item, i)}
        </div>
      ))}
    </div>
  )
}

export default CommonGrid
