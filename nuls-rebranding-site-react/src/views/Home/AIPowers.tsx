import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import useTrans from '../../hooks/useTrans'
import { motion, useTransform, useScroll } from 'motion/react'
import MotionScrollSpacer from '../../components/MotionScrollSpacer'

import {
  FiberObject1,
  FiberObject2,
  FiberObject3,
  FiberObject4,
  FiberObjectState,
} from './FiberObjects'

interface CardProps {
  title: string
  description: string
  image: string
  objectId?: '1' | '2' | '3' | '4'
  last?: boolean
}

const Card: React.FC<CardProps> = (props) => {
  const [shouldRenderBg, setShouldRenderBg] = useState(false)
  const { title, description, image, objectId, last } = props
  const target = useRef<HTMLDivElement>(null)
  const spacer = useRef(null)
  const { scrollYProgress } = useScroll({
    target: spacer,
    offset: ['start end', 'end start'],
  })

  const progress = [0, 0.15, 0.33, 0.66, 1]

  const opacity = useTransform(scrollYProgress, progress, [1, 1, 1, 1, 0])
  const scale = useTransform(scrollYProgress, progress, [1, 1, 1, 1, 0.8])

  scrollYProgress.on('change', (p) => setShouldRenderBg(p > 0 && p < 0.96))
  let object = <></>

  if (objectId === '1') {
    object = <FiberObject1 rendering={shouldRenderBg} />
  }
  if (objectId === '2') {
    object = <FiberObject2 rendering={shouldRenderBg} />
  }
  if (objectId === '3') {
    object = <FiberObject3 rendering={shouldRenderBg} />
  }
  if (objectId === '4') {
    object = <FiberObject4 rendering={shouldRenderBg} />
  }

  return (
    <>
      <MotionScrollSpacer
        ref={spacer}
        target={target}
        id={last ? 'aipowerLastCard' : ''}
      />
      <div className="card" ref={target}>
        <motion.div className="content" style={{ opacity, scale }}>
          {object}
          <div className="inner">
            <div className="info">
              <div className="title">{title}</div>
              <div className="description">{description}</div>
            </div>
            {/* <div className="image">
              <video src={image} muted autoPlay loop></video>
            </div> */}
          </div>
        </motion.div>
      </div>
    </>
  )
}

const Title: React.FC = () => {
  const { t } = useTrans('aipower')
  const target = useRef<HTMLDivElement>(null)
  const spacer = useRef(null)
  const { scrollYProgress } = useScroll({
    target: spacer,
    offset: ['start end', 'end start'],
  })

  const progress = [0, 0.15, 0.33, 0.66, 1]

  const opacity = useTransform(scrollYProgress, progress, [0, 1, 1, 1, 0])
  const scale = useTransform(scrollYProgress, progress, [1, 1, 1, 1, 0.8])

  return (
    <>
      <MotionScrollSpacer ref={spacer} target={target} />
      <div className="title" ref={target}>
        <motion.div style={{ opacity, scale }}>
          <div>{t('line1')}</div>
          <div className="line2">{t('line2')}</div>
        </motion.div>
      </div>
    </>
  )
}

const AIPowers: React.FC = () => {
  const { t } = useTrans('aipower')
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <FiberObjectState.Provider>
      <div id="aipowers" ref={containerRef}>
        <Title />
        <Card
          title={t('card1.title')}
          description={t('card1.description')}
          image=""
          objectId="1"
        />
        <Card
          title={t('card2.title')}
          description={t('card2.description')}
          image=""
          objectId="2"
        />
        <Card
          title={t('card3.title')}
          description={t('card3.description')}
          image=""
          objectId="3"
        />
        <Card
          title={t('card4.title')}
          description={t('card4.description')}
          image=""
          objectId="4"
          last
        />
      </div>
    </FiberObjectState.Provider>
  )
}

export default AIPowers
