import React, { PropsWithChildren } from 'react'
import sloganImg from '../../assets/img/slogan.svg'
import iconImg1 from '../../assets/img/supporters/Binance.svg'
import iconImg2 from '../../assets/img/supporters/OK.svg'
import iconImg3 from '../../assets/img/supporters/gate.svg'
import iconImg4 from '../../assets/img/supporters/bitmart.svg'
import iconImg5 from '../../assets/img/supporters/mexc.svg'
import useTrans from '../../hooks/useTrans'
import { Space } from 'antd'
import { StickyCommonButton, StickyLink } from '../../components/StickyCursor'
import CommonButton from '../../components/CommonButton'
import System from '../../store/system'
import LogoSVG from '../../components/LogoSvg'

// const logos = [iconImg2, iconImg3, iconImg5]
const logos = [iconImg5]

const Hero: React.FC = () => {
  const { openHeader, isMobile } = System.useContainer()
  const { t } = useTrans('hero')

  return (
    <div id="homeHero2">
      <div className="content">
        {isMobile && (
          <div className="moblielogo">
            <LogoSVG noVideo />
          </div>
        )}
        <div className="t1">
          {t('t1')}
          {/* <span></span> */}
        </div>
        <div className="t2">
          {t('t2')}
          {/* <span></span> */}
        </div>
        <div className="links">
          <Space size={isMobile ? 24 : 32}>
            <StickyCommonButton
              size={isMobile ? 'small' : 'large'}
              onClick={() => openHeader('develop')}
            >
              {t('bt1')}
            </StickyCommonButton>
            <StickyLink to="/ecosystem">
              <CommonButton size={isMobile ? 'small' : 'large'}>
                {t('bt2')}
              </CommonButton>
            </StickyLink>
          </Space>
        </div>
      </div>
      <div className="exs">
        <div className="available">{t('available')}</div>
        <div className="icons">
          <Space size={isMobile ? 16 : 32} wrap={isMobile}>
            {logos.map((icon, index) => (
              <img src={icon} key={index} alt="" />
            ))}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default Hero
