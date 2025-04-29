import React, {
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
  useRef,
} from 'react'
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Switch,
  useLocation,
} from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
import Store from '../store'
import Home from '../views/Home'
import Ecosystem from '../views/Ecosystem'
import Community from '../views/Community'
import NulsAI from '../views/NulsAI'
import Partners from '../views/Partners'
import Legal from '../views/Legal'
import Brand from '../views/Brand'
import Use from '../views/Use'
import { Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'
import './style.scss'
import AnimeBackground from '../components/AnimeBackground'
// import StickyCursor from '../components/StickyCursor'
import ScrollToTop from './ScrollTop'
import { ReactLenis, useLenis } from 'lenis/react'
import System from '../store/system'

const { Content } = Layout

export enum RoutePath {
  Home = '/',
  Ecosystem = '/ecosystem',
  Community = '/community',
  NulsAI = '/nulsai',
  Use = '/use',
  Partners = '/partners',
  Legal = '/legal',
  Brand = '/brand',
}

export const RouterContext = React.createContext({
  to: '',
  from: '',
})

export interface Routes {
  from: string
  to: string
}

export const useRoute = (): Routes => {
  return useContext(RouterContext)
}

const RouterProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const location = useLocation()
  const [route, setRoute] = useState<Routes>({
    to: location.pathname,
    from: location.pathname,
  })

  useEffect(() => {
    setRoute((prev) => ({ to: location.pathname, from: prev.to }))
  }, [location])

  return (
    <RouterContext.Provider value={route}>{children}</RouterContext.Provider>
  )
}

interface MibaoRouterProps extends RouteProps {
  key: string
  params?: string
  path: string
}

const routes: MibaoRouterProps[] = [
  {
    component: Home,
    exact: true,
    key: 'Home',
    path: RoutePath.Home,
  },
  {
    component: Ecosystem,
    exact: true,
    key: 'Ecosystem',
    path: RoutePath.Ecosystem,
  },
  {
    component: Community,
    exact: true,
    key: 'Community',
    path: RoutePath.Community,
  },
  {
    component: NulsAI,
    exact: true,
    key: 'NulsAI',
    path: RoutePath.NulsAI,
  },
  {
    component: Use,
    exact: true,
    key: 'Use',
    path: RoutePath.Use,
  },
  {
    component: Partners,
    exact: true,
    key: 'Partners',
    path: RoutePath.Partners,
  },
  {
    component: Legal,
    exact: true,
    key: 'Legal',
    path: RoutePath.Legal,
  },
  {
    component: Brand,
    exact: true,
    key: 'Brand',
    path: RoutePath.Brand,
  },
]

const MainContent: React.FC = () => {
  return (
    <>
      {/* <StickyCursor /> */}
      <Layout id="mainFramework">
        <Layout>
          <Header />
          <Content id="mainContent">
            <Switch>
              {routes.map((route) => (
                <Route
                  {...route}
                  key={route.key}
                  path={`${route.path}${route.params ?? ''}`}
                />
              ))}
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  )
}

const Lenis: React.FC<PropsWithChildren> = ({ children }) => {
  const preventRef = useRef(false)
  const { headerOpened } = System.useContainer()

  useEffect(() => {
    preventRef.current = headerOpened
  }, [headerOpened])

  return (
    <ReactLenis
      root
      options={{
        prevent: () => preventRef.current,
      }}
    >
      {children}
    </ReactLenis>
  )
}

export const Routers: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ScrollToTop />
        <RouterProvider>
          <Store>
            <Lenis>
              <MainContent />
            </Lenis>
          </Store>
        </RouterProvider>
      </Router>
    </I18nextProvider>
  )
}
