import React, { PropsWithChildren } from 'react'
import useTrans from '../../hooks/useTrans'

const WhatIs: React.FC = () => {
  const { t } = useTrans('whatis')

  return (
    <div id="whatis">
      <div className="title">What is NULS AI</div>
      <div className="desc">{t('desc')}</div>
    </div>
  )
}

export default WhatIs
