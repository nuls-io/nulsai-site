import React, { PropsWithChildren } from 'react'
// 业务层
import System from './system'

const Store: React.FC<PropsWithChildren<any>> = ({ children }) => {
  console.log(`global contexts have been re-rendered at: ${Date.now()}`)

  return <System.Provider>{children}</System.Provider>
}

export default Store
