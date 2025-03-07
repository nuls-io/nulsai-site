import React, { PropsWithChildren, useState } from 'react'
import useTrans from '../../hooks/useTrans'
import AnimeBackground2 from '../../components/AnimeBackground2'
import CommonButton from '../../components/CommonButton'
import { StickyAnchor } from '../../components/StickyCursor'

const Contact: React.FC = () => {
  const { t } = useTrans('contact')

  return (
    <div id="contact">
      <AnimeBackground2 />
      <div className="content">
        <div className="desc">{t('description')}</div>
        <div className="input">
          <StickyAnchor
            href="https://nuls.medium.com/subscribe"
            target="_blank"
          >
            <CommonButton dark round={false} size="large">
              {t('signup')}
            </CommonButton>
          </StickyAnchor>
        </div>
      </div>
    </div>
  )
}

export default Contact
