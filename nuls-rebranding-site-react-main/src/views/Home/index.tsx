import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Layout,
  Breadcrumb,
  theme,
  Tag,
  Space,
  Button,
  Skeleton,
  Modal,
  Input,
  ModalProps,
} from 'antd'
import PageState from './state'
import './style.scss'
import CommonPage from '../../components/CommonPage'
// import Hero from './Hero'
import Hero2 from './Hero2'
import AIPowers from './AIPowers'
import Features from './Features'
import Roadmap from './Roadmap'
import Backers from './Backers'
import News from './News'
import Contact from './Contact'
import WhatIs from './WhatIs'
import Stats from './Stats'
import AnimeBackground from '../../components/AnimeBackground'
import System from '../../store/system'

function inBox(box: DOMRect, noEnd = false): boolean {
  if (box.top > 0) return false
  if (noEnd) return true
  return box.bottom > 0
}

const useChangeTheme = () => {
  const { setDarkTheme } = System.useContainer()
  const statsEl = useRef<HTMLDivElement | null>(null)
  const featuresEl = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const scroll = () => {
      if (!statsEl.current) {
        statsEl.current = document.getElementById('stats') as HTMLDivElement
      }
      if (!featuresEl.current) {
        featuresEl.current = document.getElementById(
          'features'
        ) as HTMLDivElement
      }
      if (!statsEl.current || !featuresEl.current) return

      const statsBox = statsEl.current.getBoundingClientRect()
      const featuresBox = featuresEl.current.getBoundingClientRect()

      if (inBox(statsBox)) {
        setDarkTheme(true)
        return
      }
      if (inBox(featuresBox, true)) {
        setDarkTheme(true)
        return
      }

      setDarkTheme(false)
    }
    window.addEventListener('scroll', scroll)
    scroll()
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [setDarkTheme])
}

const Index: React.FC = () => {
  useChangeTheme()

  return (
    <div id="home">
      <Hero2 />
      <Stats />
      <WhatIs />
      <AIPowers />
      <Features />
      <Roadmap />
      <Backers />
      <News />
      <Contact />
    </div>
  )
}

const WrappedIndex: React.FC = () => {
  return (
    <>
      <AnimeBackground />
      <PageState.Provider>
        <Index />
      </PageState.Provider>
    </>
  )
}

export default WrappedIndex
