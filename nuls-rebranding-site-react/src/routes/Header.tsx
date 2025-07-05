import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
// import i18n from '../i18n'
// import { TranslationOutlined } from '@ant-design/icons'
import './Header.scss'
import classnames from 'classnames'
import logoImg from '../assets/img/logo.svg'
import logoLightImg from '../assets/img/logo-light.svg'
import useTrans from '../hooks/useTrans'
import { Space } from 'antd'
import System from '../store/system'
import { StickyAnchor, StickyLink } from '../components/StickyCursor'
import LogoSVG from '../components/LogoSvg'
import { Link, useLocation } from 'react-router-dom'
import CommonButton from '../components/CommonButton'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'

interface HeaderExpendContentCardProps {
  // percentage as number
  widthPercentage?: number
}

const HeaderExpendContentCard: React.FC<
  PropsWithChildren<HeaderExpendContentCardProps>
> = ({ children, widthPercentage }) => {
  return (
    <div
      className="header-expend-content-card"
      style={{ width: widthPercentage ? `${widthPercentage}%` : undefined }}
    >
      {children}
    </div>
  )
}

const Develop: React.FC = () => {
  const { darkTheme, isMobile } = System.useContainer()
  const { t } = useTrans('header.develop')

  return (
    <>
      <HeaderExpendContentCard widthPercentage={isMobile ? undefined : 30}>
        <div className="card-title">{t('runnode')}</div>
        <div className="card-desc">{t('runnodedesc')}</div>
        <div className="card-opt">
          <Space>
            <StickyAnchor
              href="https://docs.nuls.io/Guide/g_create_node.html"
              target="_blank"
            >
              <CommonButton dark={darkTheme} size="small" solid={false}>
                {t('doc')}
              </CommonButton>
            </StickyAnchor>
          </Space>
        </div>
      </HeaderExpendContentCard>
      <HeaderExpendContentCard widthPercentage={isMobile ? undefined : 40}>
        <div className="card-title">{t('nuls')}</div>
        <div className="card-desc">{t('nulsdesc')}</div>
        <div className="card-opt">
          <Space>
            <StickyAnchor href="https://docs.nuls.io/" target="_blank">
              <CommonButton dark={darkTheme} size="small" solid={false}>
                {t('doc')}
              </CommonButton>
            </StickyAnchor>
          </Space>
        </div>
      </HeaderExpendContentCard>
      {/* <HeaderExpendContentCard widthPercentage={isMobile ? undefined : 40}>
        <div className="card-title">{t('enuls')}</div>
        <div className="card-desc">{t('enulsdesc')}</div>
        <div className="card-opt">
          <Space>
            <StickyAnchor href="https://docs.nuls.io/ENULS/" target="_blank">
              <CommonButton dark={darkTheme} size="small" solid={false}>
                {t('doc')}
              </CommonButton>
            </StickyAnchor>
          </Space>
        </div>
      </HeaderExpendContentCard> */}
      <HeaderExpendContentCard widthPercentage={isMobile ? undefined : 30}>
        <div className="card-title">{t('doccenter')}</div>
        <div className="card-desc">{t('doccenterdesc')}</div>
        <div className="card-opt">
          <Space>
            <StickyAnchor href="https://docs.nuls.io/" target="_blank">
              <CommonButton dark={darkTheme} size="small" solid={false}>
                {t('doc')}
              </CommonButton>
            </StickyAnchor>
          </Space>
        </div>
      </HeaderExpendContentCard>
    </>
  )
}

const MobileMenu: React.FC = () => {
  const { darkTheme, headerOpened, headerOpenedContent, openHeader } =
    System.useContainer()
  const { t } = useTrans('header')

  const developActive = useMemo(() => {
    return headerOpened && headerOpenedContent === 'develop'
  }, [headerOpened, headerOpenedContent])

  const handleDevelopClick = useCallback(() => {
    if (headerOpenedContent === 'develop') {
      openHeader('mobileMenu')
    } else {
      openHeader('develop')
    }
  }, [headerOpenedContent, openHeader])

  return (
    <div className="mobile-menu">
      <div className="row">
        <StickyLink to="/nulsai" dark={darkTheme}>
          {t('menu.ai')}
        </StickyLink>
      </div>
      <div className="row">
        <StickyLink to="/use" dark={darkTheme}>
          {t('menu.use')}
        </StickyLink>
      </div>
      <div className="row">
        <StickyLink to="/ecosystem" dark={darkTheme}>
          {t('menu.eco')}
        </StickyLink>
      </div>
      <div className="row">
        <StickyAnchor
          target="_blank"
          dark={darkTheme}
          onClick={handleDevelopClick}
        >
          {t('menu.develop')}
        </StickyAnchor>
        {developActive && <Develop />}
      </div>
      <div className="row">
        <StickyLink to="/community" dark={darkTheme}>
          {t('menu.community')}
        </StickyLink>
      </div>
    </div>
  )
}

const LOGO_LARGE_WIDTH = 920

const Header: React.FC = () => {
  const { darkTheme, headerOpened, headerOpenedContent, openHeader } =
    System.useContainer()
  const { t } = useTrans('header')
  const [small, setSmall] = useState(false)
  const location = useLocation()

  const largeLogoVisible = useMemo(() => {
    return !small && location.pathname === '/'
  }, [small, location.pathname])

  const logoLeft = useMemo(() => {
    if (!largeLogoVisible) return 20
    const containerWidth = Math.min(1440, window.innerWidth)
    return (containerWidth - LOGO_LARGE_WIDTH) / 2
  }, [largeLogoVisible])

  const logoTop = useMemo(() => {
    if (!largeLogoVisible) return '14px'
    return `24vh`
  }, [largeLogoVisible])

  const logoWidth = useMemo(() => {
    if (!largeLogoVisible) return 140
    return LOGO_LARGE_WIDTH
  }, [largeLogoVisible])

  const logoHeight = useMemo(() => {
    return logoWidth / 6.322769681548308
  }, [logoWidth])

  useEffect(() => {
    const handleScroll = () => {
      setSmall(window.scrollY > 50)
    }

    document.addEventListener('scroll', handleScroll, false)
    handleScroll()
    return () => {
      document.removeEventListener('scroll', handleScroll, false)
    }
  }, [])

  return (
    <>
      <header
        id="header"
        className={classnames(
          { small, dark: darkTheme, open: headerOpened },
          headerOpened && `open-${headerOpenedContent}`
        )}
      >
        <Link
          className="home-link"
          to="/"
          style={{
            left: logoLeft,
            top: logoTop,
            width: logoWidth,
            height: logoHeight,
          }}
        >
          <LogoSVG small={!largeLogoVisible} />
          {/* <img src={darkTheme ? logoLightImg : logoImg} alt="" /> */}
        </Link>
        <div className="header-menu-container">
          <div className="bar">
            <div className="left"></div>
            <div className="menu">
              <Space size={32}>
                <StickyLink to="/nulsai" dark={darkTheme}>
                  {t('menu.ai')}
                </StickyLink>
                <StickyLink to="/use" dark={darkTheme}>
                  {t('menu.use')}
                </StickyLink>
                <StickyLink to="/ecosystem" dark={darkTheme}>
                  {t('menu.eco')}
                </StickyLink>
                <StickyAnchor
                  target="_blank"
                  dark={darkTheme}
                  onClick={() => openHeader('develop')}
                  className={classnames({
                    active: headerOpened && headerOpenedContent === 'develop',
                  })}
                >
                  {t('menu.develop')}
                </StickyAnchor>
                <StickyLink to="/community" dark={darkTheme}>
                  {t('menu.community')}
                </StickyLink>
              </Space>
            </div>
          </div>
          <div className="header-expand-content">
            {headerOpenedContent === 'develop' && <Develop />}
          </div>
        </div>
      </header>
      <div
        id="headerMask"
        className={classnames({ show: headerOpened })}
        onClick={() => openHeader(null)}
      ></div>
    </>
  )
}

const MobileHeader: React.FC = () => {
  const { darkTheme, headerOpened, headerOpenedContent, openHeader } =
    System.useContainer()
  const [small, setSmall] = useState(false)

  const handleMenuIconClick = useCallback(() => {
    if (headerOpened) {
      openHeader(null)
    } else {
      openHeader('mobileMenu')
    }
  }, [headerOpened, openHeader])

  useEffect(() => {
    const handleScroll = () => {
      setSmall(window.scrollY > 50)
    }

    document.addEventListener('scroll', handleScroll, false)
    handleScroll()
    return () => {
      document.removeEventListener('scroll', handleScroll, false)
    }
  }, [])

  return (
    <>
      <header
        id="header"
        className={classnames(
          { small, dark: darkTheme, open: headerOpened },
          headerOpened && `open-${headerOpenedContent}`
        )}
      >
        <Link to="/" className="home-link">
          <LogoSVG small noVideo />
          {/* <img src={darkTheme ? logoLightImg : logoImg} alt="" /> */}
        </Link>
        <div className="header-menu-container">
          <div className="bar">
            <div className="left"></div>
            <div className="menu">
              <StickyAnchor
                style={{ fontSize: 20 }}
                onClick={handleMenuIconClick}
              >
                {headerOpened ? <CloseOutlined /> : <MenuOutlined />}
              </StickyAnchor>
            </div>
          </div>
          <div className="header-expand-content">
            {(headerOpenedContent === 'mobileMenu' ||
              headerOpenedContent === 'develop') && <MobileMenu />}
          </div>
        </div>
      </header>
      <div
        id="headerMask"
        className={classnames({ show: headerOpened })}
        onClick={() => openHeader(null)}
      ></div>
    </>
  )
}

const WrappedHeader: React.FC = () => {
  const { isMobile, headerOpened, openHeader } = System.useContainer()
  const location = useLocation()

  useEffect(() => {
    if (headerOpened) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = 'unset'
    }
  }, [headerOpened])

  useEffect(() => {
    openHeader(null)
  }, [location, openHeader])

  if (isMobile) return <MobileHeader />
  return <Header />
}

export default WrappedHeader
