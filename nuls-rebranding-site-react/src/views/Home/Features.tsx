import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import System from '../../store/system'
import BlackBgTitle from './components/BlackBgTitle'
import useTrans from '../../hooks/useTrans'

const Pad1Block: React.FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div className="pad1-block aurora-bg">
      <div className="title">{title}</div>
      <div className="content">{children}</div>
    </div>
  )
}

const Pad1: React.FC = () => {
  const { t } = useTrans('features')

  return (
    <div className="pad1">
      <div className="blocks">
        <Pad1Block title={t('pad1.b1.title')}>
          {t('pad1.b1.description')}
        </Pad1Block>
        <Pad1Block title={t('pad1.b2.title')}>
          {t('pad1.b2.description')}
        </Pad1Block>
        <Pad1Block title={t('pad1.b3.title')}>
          {t('pad1.b3.description')}
        </Pad1Block>
        <Pad1Block title={t('pad1.b4.title')}>
          {t('pad1.b4.description')}
        </Pad1Block>
      </div>
    </div>
  )
}

const Pad2: React.FC = () => {
  return (
    <div className="pad2">
      <div className="score">
        <div className="num">29.7M</div>
        <div className="title">Active Users</div>
      </div>
      <div className="score">
        <div className="num">340M+</div>
        <div className="title">Total Transactions</div>
      </div>
      <div className="score">
        <div className="num">$0.00064</div>
        <div className="title">Cost Per Transaction</div>
      </div>
    </div>
  )
}

const Features: React.FC = () => {
  const { t } = useTrans('features')

  return (
    <div id="features">
      <div className="content">
        <BlackBgTitle>{t('pad1.title')}</BlackBgTitle>
        <Pad1 />
      </div>
    </div>
  )
}

export default Features
