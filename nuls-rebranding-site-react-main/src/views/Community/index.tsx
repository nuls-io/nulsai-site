import React, { PropsWithChildren, useMemo, useState } from 'react'
import CommonPage, { CommonPageSubtitle } from '../../components/CommonPage'
import useTrans from '../../hooks/useTrans'
import classnames from 'classnames'
import { StickyAnchor, StickyCommonButton } from '../../components/StickyCursor'
import CommonButton from '../../components/CommonButton'
import Councillors from './Councillors'
import './style.scss'

const CouncillorsContainer: React.FC = () => {
  const { t } = useTrans('community')

  return (
    <>
      <CommonPageSubtitle>{t('councillors')}</CommonPageSubtitle>
      {/* <div className="great">{t('councillorsdesc')}</div> */}
      <Councillors />
    </>
  )
}

const Features: React.FC = () => {
  const { t } = useTrans('community')
  return (
    <div className="features">
      <div className="feature">
        <div className="title">{t('feature1.title')}</div>
        <div className="desc">{t('feature1.desc')}</div>
        <div className="opt">
          <StickyAnchor
            href="https://docs.nuls.io/Guide/g_governance.html"
            target="_blank"
          >
            <CommonButton dark>{t('feature1.button')}</CommonButton>
          </StickyAnchor>
        </div>
      </div>
      <div className="feature">
        <div className="title">{t('feature2.title')}</div>
        <div className="desc">{t('feature2.desc')}</div>
        <div className="opt">
          <StickyAnchor
            href="https://forum.nuls.io/c/governance/24"
            target="_blank"
          >
            <CommonButton dark>{t('feature2.button')}</CommonButton>
          </StickyAnchor>
        </div>
      </div>
      <div className="feature">
        <div className="title">{t('feature3.title')}</div>
        <div className="desc">{t('feature3.desc')}</div>
        <div className="opt">
          <StickyAnchor href="https://gov.nuls.io/gov/proposal" target="_blank">
            <CommonButton dark>{t('feature3.button')}</CommonButton>
          </StickyAnchor>
        </div>
      </div>
    </div>
  )
}

const Governance: React.FC = () => {
  const { t } = useTrans('community')

  return (
    <div className="gov">
      <div className="link">
        <StickyAnchor href="https://gov.nuls.io/" target="_blank">
          <CommonButton dark size="large">
            {t('governance')}
          </CommonButton>
        </StickyAnchor>
      </div>
      <div className="desc">
        <p>{t('desc')}</p>
      </div>
    </div>
  )
}

const Ecosystem: React.FC = () => {
  const { t } = useTrans('community')

  return (
    <CommonPage id="community" title={t('title')}>
      <Governance />
      <CommonPageSubtitle>{t('whatgreat')}</CommonPageSubtitle>
      <div className="great">{t('great')}</div>
      <Features />
      <CouncillorsContainer />
    </CommonPage>
  )
}

export default Ecosystem
