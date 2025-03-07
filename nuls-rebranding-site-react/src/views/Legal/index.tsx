import React from 'react'
import './style.scss'
import CommonPage, { CommonPageSubtitle } from '../../components/CommonPage'
import useTrans from '../../hooks/useTrans'
import System from '../../store/system'

const Legal: React.FC = () => {
  const { isMobile } = System.useContainer()
  const { t } = useTrans('legal')

  return (
    <CommonPage id="legal" title={t('title')}>
      <div className="content">{t('content')}</div>
    </CommonPage>
  )
}

export default Legal
