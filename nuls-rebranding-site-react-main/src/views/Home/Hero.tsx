import React, { PropsWithChildren } from 'react'
import sloganImg from '../../assets/img/slogan.svg'
import iconImg1 from '../../assets/img/supporters/Binance.svg'
import iconImg2 from '../../assets/img/supporters/OK.svg'
import iconImg3 from '../../assets/img/supporters/Chainlink.svg'
import iconImg4 from '../../assets/img/supporters/Certik.svg'
import iconImg5 from '../../assets/img/supporters/DWF.svg'
import iconImg6 from '../../assets/img/supporters/Bitmain.svg'
import iconImg7 from '../../assets/img/supporters/Suisse.svg'
import iconImg8 from '../../assets/img/supporters/waterdrip.png'
import useTrans from '../../hooks/useTrans'
import { Space } from 'antd'
import { StickyCommonButton, StickyLink } from '../../components/StickyCursor'
import CommonButton from '../../components/CommonButton'
import System from '../../store/system'

const logos = [
  iconImg1,
  iconImg2,
  iconImg3,
  iconImg4,
  iconImg5,
  iconImg6,
  iconImg7,
  iconImg8,
]

const Hero: React.FC = () => {
  const { openHeader, isMobile } = System.useContainer()
  const { t } = useTrans('hero')

  return (
    <div id="homeHero">
      <div className="content">
        <img src={sloganImg} alt="" />
        <div className="links">
          <Space size={32}>
            <StickyCommonButton
              size="large"
              onClick={() => openHeader('develop')}
            >
              {t('bt1')}
            </StickyCommonButton>
            <StickyLink to="/ecosystem">
              <CommonButton size="large">{t('bt2')}</CommonButton>
            </StickyLink>
          </Space>
        </div>
      </div>
      <div className="icons">
        <Space size={isMobile ? 16 : 32} wrap={isMobile}>
          {logos.map((icon, index) => (
            <img src={icon} key={index} alt="" />
          ))}
        </Space>
      </div>
    </div>
  )
}

export default Hero
