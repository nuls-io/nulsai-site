import React, { PropsWithChildren, useEffect, useRef } from 'react'
import BlackBgTitle from './components/BlackBgTitle'
import useTrans from '../../hooks/useTrans'
import PageState from './state'
import { abbreviateNumber } from '../../utils'
import System from '../../store/system'

const Stats: React.FC = () => {
  const { stats } = PageState.useContainer()
  const { t } = useTrans('stats')

  const { setDarkTheme } = System.useContainer()
  const el = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const scroll = () => {
  //     if (!el.current) return
  //     const dom = el.current
  //     const top = dom.getBoundingClientRect().top
  //     setDarkTheme(top < 0)
  //   }
  //   window.addEventListener('scroll', scroll)
  //   scroll()
  //   return () => {
  //     window.removeEventListener('scroll', scroll)
  //   }
  // }, [setDarkTheme])

  return (
    <div id="stats" ref={el}>
      <div className="content">
        <BlackBgTitle>{t('title')}</BlackBgTitle>
        <div className="row">
          {/* <div className="score">
            <div className="num">
              {stats?.totalCount && abbreviateNumber(stats.totalCount, 1)}
            </div>
            <div className="title">Active Users</div>
          </div> */}
          <div className="score">
            <div className="num">
              {stats?.scanData.trades &&
                abbreviateNumber(stats.scanData.trades, 1) + '+'}
            </div>
            <div className="title">Total Transactions</div>
          </div>
          <div className="score">
            <div className="num">{stats?.nodeCount}</div>
            <div className="title">Running Nodes</div>
          </div>
          <div className="score">
            <div className="num">
              {stats?.scanData &&
                abbreviateNumber(stats.scanData.totalAssets, 1)}
            </div>
            <div className="title">Total Supply</div>
          </div>
        </div>
        <div className="row">
          <div className="score">
            <div className="num">
              {stats?.scanData && abbreviateNumber(stats.scanData.deposit, 1)}
            </div>
            <div className="title">Total Staked</div>
          </div>
          <div className="score">
            <div className="num">
              {stats?.scanData &&
                abbreviateNumber(stats.scanData.circulation, 1)}
            </div>
            <div className="title">Circulating Supply</div>
          </div>
          <div className="score">
            <div className="num">
              {stats?.scanData && abbreviateNumber(stats.scanData.destroy, 1)}
            </div>
            <div className="title">Burned</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
