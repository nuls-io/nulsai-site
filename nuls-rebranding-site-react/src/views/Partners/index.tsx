import React, { PropsWithChildren } from 'react'
import './style.scss'
import CommonPage, { CommonPageSubtitle } from '../../components/CommonPage'
import useTrans from '../../hooks/useTrans'
import CommonGrid from '../../components/CommonGrid'
import items from './items.json'
import System from '../../store/system'
import { cdnFile } from '../../utils'

export const List: React.FC<{ icons: string[] }> = ({ icons }) => {
  const { isMobile } = System.useContainer()

  return (
    <CommonGrid
      className="partner-list"
      data={icons}
      renderItemContent={(img: string) => (
        <div className="icon-item">
          <img src={cdnFile(img)} alt="" />
        </div>
      )}
      columes={isMobile ? 3 : 5}
      borderd={false}
    />
  )
}

const { investers, strategic, exchange, crossChain } = items

const Partners: React.FC = () => {
  const { t } = useTrans('partners')

  return (
    <CommonPage id="partners" title={t('title')}>
      <CommonPageSubtitle>{t('investers')}</CommonPageSubtitle>
      <List icons={investers} />
      <CommonPageSubtitle>{t('strategic')}</CommonPageSubtitle>
      <List icons={strategic} />
      <CommonPageSubtitle>{t('exchange')}</CommonPageSubtitle>
      <List icons={exchange} />
      <CommonPageSubtitle>{t('crossChain')}</CommonPageSubtitle>
      <List icons={crossChain} />
    </CommonPage>
  )
}

export default Partners
