import Decimal from 'decimal.js-light'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Clipboard from 'clipboard'
import 'moment-timezone'
import App from './App'
// import serverWalletAPI from './apisMarket/ServerWalletAPI'
// import qs from 'qs'
import './assets/fonts/style.css'
import './index.scss'
import './tailwind.css'
import { message } from 'antd'
import './moment'

Decimal.set({ toExpPos: 999, toExpNeg: -999, precision: 64 })
window.clipboard = new Clipboard('.clipboard-target')
window.clipboard.on('success', (e: any) => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  message.success('copied')
  e.clearSelection()
})
window.clipboard.on('error', () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  message.success('something wrong')
})
const $copy = document.createElement('div')
$copy.style.display = 'none'
$copy.classList.add('clipboard-target')
document.body.appendChild($copy)
window.clipboardCall = (text: string) => {
  $copy.setAttribute('data-clipboard-text', text)
  $copy.click()
}

async function start(): Promise<void> {
  // const res = await axios.get('/constants.json', {
  //   params: { _: new Date().getTime() },
  // })
  // ;(window as any).CONSTS = res.data
  const root = createRoot(document.getElementById('SITE_CONTAINER')!)
  root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  )
}

start().catch((e) => console.error(e))
