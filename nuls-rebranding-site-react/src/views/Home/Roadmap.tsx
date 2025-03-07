import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import useTrans from '../../hooks/useTrans'
import BlackBgTitle from './components/BlackBgTitle'
import MotionScrollSpacer from '../../components/MotionScrollSpacer'
import { motion, useScroll, useTransform } from 'motion/react'

interface RoadNodeProps {
  texts: string[]
  time: string
}

const RoadNode: React.FC<RoadNodeProps> = ({ texts, time }) => {
  return (
    <div className="node aurora-bg">
      <div className="title">
        {texts.map((text, i) => (
          <div key={i} className="text">
            {text}
          </div>
        ))}
      </div>
      <div className="time">{time}</div>
    </div>
  )
}

const testNodes: RoadNodeProps[] = [
  {
    texts: [
      'NULS Brand update to NULS AI',
      'Launch new official website',
      'New version of White Paper release',
      'NAI Identity product launch',
      'Partners and Ecosystems Support NULS to NAI',
      'Exchanges Swap NULS to NAI',
    ],
    time: '2025 Q1',
  },
  {
    texts: [
      'NULS AI Node Staking launch',
      'NAIStake AI product launch',
      'Support  AI Agent platform launch',
      'Support AI social product launch',
    ],
    time: '2025 Q2',
  },
  {
    texts: [
      'NAINFT AI product launch',
      'Support NaboxID / Nabox Wallet integration NAI identity',
      'Support the development of AI Agent ecological projects',
      'Integration and training with AI model companies',
    ],
    time: '2025 Q3',
  },
  {
    texts: [
      'Develop ecosystem projects on NULS AI',
      'Extend NULS Parachains Use Scenarios through ChainBox ',
      'Develop 5 SCO projects every month',
      'Support DeFi, GameFi, and more Ecosystem DApps',
    ],
    time: '2025 Q4',
  },
]

const Map: React.FC = () => {
  const blogsDom = useRef<HTMLDivElement>(null)
  const target = useRef<HTMLDivElement>(null)
  const spacer = useRef(null)
  const [scrollLength, setScrollLength] = useState(0)

  const { scrollYProgress } = useScroll({
    target: spacer,
    offset: ['start 240px', `${scrollLength}px 240px`],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollLength])

  useEffect(() => {
    if (!blogsDom.current) return
    const cw = blogsDom.current.clientWidth
    const sw = blogsDom.current.scrollWidth
    if (sw < cw) {
      setScrollLength(0)
    } else {
      const maxScrollLength = sw - cw
      setScrollLength(maxScrollLength)
    }
  }, [testNodes])

  return (
    <>
      <MotionScrollSpacer ref={spacer} target={target} />
      <div className="map">
        <motion.div className="nodes" ref={blogsDom} style={{ x }}>
          {testNodes.map((blog, i) => (
            <RoadNode key={i} {...blog} />
          ))}
        </motion.div>
      </div>
      <MotionScrollSpacer spacerHeight={scrollLength} />
    </>
  )
}

const Roadmap: React.FC = () => {
  const { t } = useTrans('roadmap')

  return (
    <div id="roadmap">
      <div className="content">
        <BlackBgTitle>{t('title')}</BlackBgTitle>
        <Map />
      </div>
    </div>
  )
}

export default Roadmap
