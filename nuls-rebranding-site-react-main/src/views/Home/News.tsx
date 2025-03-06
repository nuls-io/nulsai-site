import React, { useCallback, useEffect, useRef, useState } from 'react'
import useTrans from '../../hooks/useTrans'
import BlackBgTitle from './components/BlackBgTitle'
import MotionScrollSpacer from '../../components/MotionScrollSpacer'
import { motion, useScroll, useTransform } from 'motion/react'
import { StickyDiv } from '../../components/StickyCursor'
import PageState from './state'
import { NewsData } from '../../SystemAPI/types'

const Blog: React.FC<NewsData> = ({ title, imgUrl, pubDate, link }) => {
  return (
    <div className="blog">
      <div className="img">{imgUrl && <img src={imgUrl} alt="" />}</div>
      <StickyDiv className="title">
        <a href={link} target="_blank">
          {title}
        </a>
      </StickyDiv>
      <div className="description">{pubDate}</div>
    </div>
  )
}

const Pad2: React.FC = () => {
  const [news, setNews] = useState<NewsData[]>([])
  const blogsDom = useRef<HTMLDivElement>(null)
  const target = useRef<HTMLDivElement>(null)
  const spacer = useRef(null)
  const [scrollLength, setScrollLength] = useState(0)
  const { getLatestNews } = PageState.useContainer()

  const { scrollYProgress } = useScroll({
    target: spacer,
    offset: ['start 240px', `${scrollLength}px 240px`],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollLength])

  const updateScrollLength = useCallback(() => {
    if (!blogsDom.current) return
    const cw = blogsDom.current.clientWidth
    const sw = blogsDom.current.scrollWidth
    if (sw < cw) {
      setScrollLength(0)
    } else {
      const maxScrollLength = sw - cw
      setScrollLength(maxScrollLength)
    }
  }, [])

  useEffect(() => {
    updateScrollLength()
  }, [news])

  useEffect(() => {
    getLatestNews().then(setNews)
  }, [])

  return (
    <>
      <MotionScrollSpacer ref={spacer} target={target} />
      <div className="pad2">
        <motion.div className="blogs" ref={blogsDom} style={{ x }}>
          {news.map((n, i) => (
            <Blog key={i} {...n} />
          ))}
        </motion.div>
      </div>
      <MotionScrollSpacer spacerHeight={scrollLength} />
    </>
  )
}

const News: React.FC = () => {
  const { t } = useTrans('news')

  return (
    <div id="news">
      <div className="content">
        <BlackBgTitle>{t('title')}</BlackBgTitle>
        <Pad2 />
      </div>
    </div>
  )
}

export default News
