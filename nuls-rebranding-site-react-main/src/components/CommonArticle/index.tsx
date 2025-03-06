import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import classnames from 'classnames'
import './style.scss'

interface ArticleProps {
  className?: string
  title: string
  subTitle?: string
  image?: string
  children: string
}

const CommonArticle: React.FC<ArticleProps> = ({
  className,
  title,
  subTitle,
  image,
  children,
}) => {
  return (
    <div className={classnames('common-article', className)}>
      <div className="article-title">{title}</div>
      {subTitle && <div className="article-sub-title">{subTitle}</div>}
      {image && (
        <div className="article-image">
          <img src={image} alt="" />
        </div>
      )}
      <div className="article-text">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
      </div>
    </div>
  )
}

export default CommonArticle
