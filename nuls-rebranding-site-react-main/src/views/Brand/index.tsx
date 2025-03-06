import React from 'react'
import './style.scss'
import CommonPage, { CommonPageSubtitle } from '../../components/CommonPage'
import useTrans from '../../hooks/useTrans'
import System from '../../store/system'
import { StickyAnchor } from '../../components/StickyCursor'
import CommonButton from '../../components/CommonButton'
import { cdnFile } from '../../utils'

const url = cdnFile(`/resources/NULS_AI_Brand_Guidelines.pdf`)

const Brand: React.FC = () => {
  const { isMobile } = System.useContainer()
  const { t } = useTrans('brand')

  return (
    <CommonPage id="brand" title={t('title')}>
      <CommonPageSubtitle extra={t('guide.desc')}>
        {t('guide.title')}
      </CommonPageSubtitle>
      <div className="content">
        <StickyAnchor href={url} target="_blank">
          <CommonButton dark size="large">
            {t('guide.button')}
          </CommonButton>
        </StickyAnchor>
      </div>
    </CommonPage>
  )
}

export default Brand
