import React, { PropsWithChildren, useMemo, useState } from 'react'
import CommonPage from '../../components/CommonPage'
import useTrans from '../../hooks/useTrans'
import items, { EcosystemItem, tabs, TabType } from './items'
import classnames from 'classnames'
import { StickyAnchor, StickyCommonButton } from '../../components/StickyCursor'
import './style.scss'
import CommonButton from '../../components/CommonButton'
import CommonGrid from '../../components/CommonGrid'
import { useLocation } from 'react-router-dom'
import qs from 'qs'
import System from '../../store/system'
import { cdnFile } from '../../utils'

const Ecosystem: React.FC = () => {
  const { isMobile } = System.useContainer()
  const { t } = useTrans('ecosystem')
  const location = useLocation()
  const initType = useMemo(() => {
    const search = location.search.slice(1)
    const querys = qs.parse(search)
    if (querys.type) return querys.type as TabType
    return TabType.All
  }, [location])
  const [tabType, setTabType] = useState<TabType>(initType)

  const filteredItems = useMemo(() => {
    if (tabType === TabType.All) return items

    return items.filter((item) => item.type.includes(tabType))
  }, [tabType])

  return (
    <CommonPage id="ecosystem" title={t('title')}>
      <div className="tabs">
        {tabs.map((tab) => (
          <StickyAnchor
            className={classnames('tab', { active: tab.type === tabType })}
            dark
            onClick={() => setTabType(tab.type)}
            key={tab.type}
          >
            {tab.label}
          </StickyAnchor>
        ))}
      </div>
      <CommonGrid
        data={filteredItems}
        renderItemContent={(item: EcosystemItem) => (
          <div className="content">
            <div className="name">
              <img className="logo" src={cdnFile(item.src)} alt="" />
              <span>{item.name}</span>
            </div>
            <div className="desc">{item.desc}</div>
            <div className="btn">
              <StickyAnchor href={item.link} target="_blank" dark>
                <CommonButton dark>{t('learn')}</CommonButton>
              </StickyAnchor>
            </div>
          </div>
        )}
        columes={isMobile ? 1 : 3}
      />
    </CommonPage>
  )
}

export default Ecosystem
