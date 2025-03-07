import Decimal from 'decimal.js-light'
import moment, { MomentInput } from 'moment'
import { customAlphabet } from 'nanoid'
import { CDN_URL } from '../constants'

export const sleep = async (ms: number): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => NodeJS.Timeout {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
    return timer
  }
}

export function label2key(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-bA-b0-9 ]/gi, '')
    .replace(/ +/gi, '_')
}

export function formatEthHash(
  addr: string,
  afterRemain = 4,
  beforeRemain = 4
): string {
  if (addr.length <= afterRemain + beforeRemain) return addr
  return `${addr.slice(0, beforeRemain)}...${addr.slice(-afterRemain)}`
}

export function formatAddress(
  addr: string,
  afterRemain = 4,
  beforeRemain = 4
): string {
  return formatEthHash(addr, afterRemain, beforeRemain)
}

const ethAddressReg = /^0x[a-fA-F0-9]{40}$/
export function isEthAddress(addr: string): boolean {
  return ethAddressReg.test(addr)
}

export function tokenHumanAmount(
  realAmount: string,
  decimals = 18,
  fixed?: number
): string {
  const bn = new Decimal(realAmount)
  const de = new Decimal(10).pow(decimals)
  const ret = bn.div(de)
  if (fixed) {
    return ret.toFixed(fixed, 3).toString()
  }
  return ret.toString()
}

export function btcHumanAmount(realAmount: string, fixed?: number): string {
  return tokenHumanAmount(realAmount, 8, fixed)
}

export function tokenRealAmount(
  humanAmount: string,
  decimals = 18,
  isInt = true
): string {
  const bn = new Decimal(humanAmount)
  const de = new Decimal(10).pow(decimals)
  const v = bn.mul(de).toString()
  if (isInt) {
    return v.split('.')[0]
  }
  return v
}

export function btcRealAmount(humanAmount: string): string {
  return tokenRealAmount(humanAmount, 8)
}

export function gwei(wei: string): string {
  return tokenHumanAmount(wei, 9)
}

export function eth(wei: string): string {
  return tokenHumanAmount(wei, 18)
}

export function lamports(sol: string): string {
  return tokenRealAmount(sol, 9)
}

export function sol(lamports: string): string {
  return tokenHumanAmount(lamports, 9)
}

export function formatNumberString(numStr: string, precision = 2): string {
  const num = parseFloat(numStr)
  if (isNaN(num)) return 'NaN'
  const [p1, p2] = numStr.split('.')
  return `${p1}.${(
    (p2 || '').slice(0, precision) + '0'.repeat(precision)
  ).slice(0, precision)}`
}

const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString())

export const timenumberPad = pad

export function formatSecondsHMS(secs: number, separator = ':'): string {
  const h = Math.floor(secs / 3600)
  const m = Math.floor(secs / 60) - h * 60
  const s = Math.floor(secs - h * 3600 - m * 60)

  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

const ds = 3600 * 24
export function formatSecondsDHMS(secs: number, separator = ':'): string {
  const { d, h, m, s } = getSecondsDHMS(secs)

  return [d, h, m, s].map((n) => pad(n)).join(separator)
}

interface DHMS {
  d: number
  h: number
  m: number
  s: number
}

export function getSecondsDHMS(secs: number): DHMS {
  const d = Math.floor(secs / ds)
  const h = Math.floor((secs - d * ds) / 3600)
  const m = Math.floor((secs - d * ds - h * 3600) / 60)
  const s = Math.floor(secs - d * ds - h * 3600 - m * 60)

  return { d, h, m, s }
}

const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']

export function abbreviateNumber(n: number, fixed = 1): string {
  // what tier? (determines SI symbol)
  const tier = (Math.log10(Math.abs(n)) / 3) | 0

  // if zero, we don't need a suffix
  if (tier === 0) return n.toFixed(fixed).toString()

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  // scale the number
  const scaled = n / scale

  // format number and add suffix
  return scaled.toFixed(fixed) + suffix
}

export function isTargetFitFilter(
  target: HTMLElement,
  container: HTMLElement,
  filter: (current: HTMLElement) => boolean,
  maxTry = 10
): boolean {
  let tryCount = 0
  let current = target
  while (tryCount < maxTry) {
    tryCount += 1
    if (filter(current)) return true
    if (current === container) return false
    if (current.parentElement === null) return false
    current = current.parentElement
  }
  return false
}

const nanoid = customAlphabet('1234567890abcdef', 8)
export function uuid(length = 8): string {
  return nanoid(length)
}

export function formatMomentInput(
  date: MomentInput,
  formatter: string,
  timezone?: string
): string {
  const n = moment(date)
  if (timezone && (n as any).tz) {
    return (n as any).tz(timezone).format(formatter)
  }
  return n.format(formatter)
}

export function formatNFTId(id: number, width = 4): string {
  return '#' + id.toString().padStart(width, '0')
}

export function btcToSats(btc: string): string {
  const v = tokenRealAmount(btc, 8)
  return v
}

export function satsToBtc(sats: string): string {
  const v = tokenHumanAmount(sats, 8)
  return v
}

export function getPageRefCode(): string | null {
  const search = location.search
  const params = new URLSearchParams(search)
  return params.get('ref')
}

const cdnBaseUrl = CDN_URL.endsWith('/') ? CDN_URL.slice(0, -1) : CDN_URL

export function cdnFile(path: string): string {
  const p = path.startsWith('/') ? path.slice(1) : path
  return `${cdnBaseUrl}/${p}`
}
