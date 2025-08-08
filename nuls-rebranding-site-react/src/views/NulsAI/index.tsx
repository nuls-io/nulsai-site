import React, { PropsWithChildren } from 'react'
import './style.scss'
import CommonPage, { CommonPageSubtitle } from '../../components/CommonPage'
import useTrans from '../../hooks/useTrans'
import { StickyAnchor } from '../../components/StickyCursor'
import CommonButton from '../../components/CommonButton'
import framworkImg from '../../assets/img/nulsai.svg'
import CommonGrid from '../../components/CommonGrid'
import System from '../../store/system'

const AI: React.FC = () => {
  const { isMobile } = System.useContainer()
  const { t } = useTrans('nulsai')

  return (
    <>
      <CommonPageSubtitle>{t('everything')}</CommonPageSubtitle>
      <CommonGrid
        className="ai-block"
        data={[1, 2, 3]}
        renderItemContent={(_: any, i: number) => (
          <div className="content">
            <div className="name">{t(`ai.${i}.title`)}</div>
            <div className="sub">{t(`ai.${i}.subtitle`)}</div>
            <div className="desc">{t(`ai.${i}.desc`)}</div>
            <div className="btn">
              {i < 2 ? (
                <StickyAnchor target="_blank" dark href={t(`ai.${i}.linkUrl`)}>
                  <CommonButton dark>{t(`ai.${i}.link`)}</CommonButton>
                </StickyAnchor>
              ) : (
                <StickyAnchor target="_blank" dark>
                  <CommonButton dark disabled>
                    {t('coming')}
                  </CommonButton>
                </StickyAnchor>
              )}
            </div>
          </div>
        )}
        columes={isMobile ? 1 : 3}
      />
    </>
  )
}

const Chain: React.FC = () => {
  const { isMobile } = System.useContainer()
  const { t } = useTrans('nulsai')

  return (
    <>
      <CommonPageSubtitle>{t('build.title')}</CommonPageSubtitle>
      <CommonGrid
        className="build-block"
        data={[1, 2]}
        renderItemContent={(_: any, i: number) => (
          <div className="content">
            <div className="name">{t(`build.${i}.title`)}</div>
            <div className="sub">{t(`build.${i}.subtitle`)}</div>
            <div className="desc">{t(`build.${i}.desc`)}</div>
            <div className="btn">
              {t(`build.${i}.linkUrl`) ? (
                <StickyAnchor
                  target="_blank"
                  dark
                  href={t(`build.${i}.linkUrl`)}
                >
                  <CommonButton dark>{t(`build.${i}.link`)}</CommonButton>
                </StickyAnchor>
              ) : (
                <StickyAnchor target="_blank" dark>
                  <CommonButton dark disabled>
                    {t('coming')}
                  </CommonButton>
                </StickyAnchor>
              )}
            </div>
          </div>
        )}
        columes={isMobile ? 1 : 2}
      />
    </>
  )
}

const CrossChain: React.FC = () => {
  const { isMobile } = System.useContainer()
  const { t } = useTrans('nulsai')

  return (
    <>
      <CommonPageSubtitle>{t('cross.title')}</CommonPageSubtitle>
      <CommonGrid
        className="cross-block"
        data={[1, 2, 3]}
        renderItemContent={(_: any, i: number) => (
          <div className="content">
            <div className="name">{t(`cross.${i}.title`)}</div>
            <div className="sub">{t(`cross.${i}.subtitle`)}</div>
            <div className="desc">{t(`cross.${i}.desc`)}</div>
            <div className="btn">
              {t(`cross.${i}.linkUrl`) ? (
                <StickyAnchor
                  target="_blank"
                  dark
                  href={t(`cross.${i}.linkUrl`)}
                >
                  <CommonButton dark>{t(`cross.${i}.link`)}</CommonButton>
                </StickyAnchor>
              ) : (
                <StickyAnchor target="_blank" dark>
                  <CommonButton dark disabled>
                    {t('coming')}
                  </CommonButton>
                </StickyAnchor>
              )}
            </div>
          </div>
        )}
        columes={isMobile ? 1 : 3}
      />
    </>
  )
}

const NulsAI: React.FC = () => {
  const { t } = useTrans('nulsai')

  return (
    <CommonPage id="nulsai" title={t('title')}>
      <AI />
      <Chain />
      <CrossChain />
    </CommonPage>
  )
}

export default NulsAI
