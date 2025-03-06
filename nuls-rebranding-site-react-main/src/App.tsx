import React, { useMemo } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ConfigProvider, App, ThemeConfig } from 'antd'
import { Routers } from './routes'
import './assets/fonts/style.css'
import './antd.custom.scss'

// const antdToken: Partial<AliasToken> = {
//   colorPrimary: '#0f000e',
//   colorPrimaryText: '#0f000e',
//   colorLink: '#0f000e',
//   borderRadius: 27,
//   borderRadiusSM: 8,
//   colorText: '#0f000e',
//   colorBgBase: '#161A16',
//   colorBgContainerDisabled: '#515151',
//   colorTextPlaceholder: '#666',
//   colorBgContainer: '#292929',
//   colorBorder: '5F5EDE',
//   colorTextDisabled: '#515151',
//   colorError: '#FD1C2C',
//   colorErrorText: 'green',
//   // boxShadow: 'none',
//   wireframe: false,
//   fontFamily: `"PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
// }

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#6fdf36',
    colorInfo: '#6fdf36',
    borderRadius: 3,
    wireframe: false,
  },
  components: {
    Notification: {
      borderRadiusLG: 8,
    },
  },
  // components: {
  //   Menu: {
  //     algorithm: true,
  //     itemSelectedColor: 'rgb(255, 255, 255)',
  //     darkItemBg: 'rgb(38, 38, 38)',
  //     darkItemSelectedBg: 'rgb(153, 153, 153)',
  //   },
  //   Select: {
  //     optionSelectedColor: 'rgba(255, 255, 255, 0.88)',
  //   },
  //   Layout: {
  //     headerBg: 'rgb(38, 38, 38)',
  //   },
  //   Alert: {
  //     colorInfoBg: 'rgb(236, 235, 235)',
  //   },
  //   Button: {
  //     primaryShadow: '0 2px 0 rgba(0, 0, 0, 0.2)',
  //   },
  // },
}

const Application: React.FC = () => {
  const queryClient = useMemo(() => {
    return new QueryClient()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeConfig}>
        <App>
          <Routers />
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default Application
