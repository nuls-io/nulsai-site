/* eslint-disable @typescript-eslint/ban-types */
export interface RespData<T> {
  success: boolean
  data: T
  error?: {
    message: string
    code: string | number
  }
}

export interface PaginationOptions {
  page: number
  count: number
}

export interface PaginationData<T> extends PaginationOptions {
  data: T[]
  total: number
}

export const emptyPaginationData: PaginationData<any> = {
  data: [],
  total: 0,
  page: 1,
  count: 20,
}

export type PaginationRespData<T> = RespData<PaginationData<T>>

// normal data
export interface NewsData {
  title: string
  link: string
  pubDate: string
  imgUrl: string
}

export interface StatsData {
  totalCount: number
  nodeCount: number
  blockData: {
    networkHeight: number
  }
  scanData: {
    totalAssets: number
    business: number
    circulation: number
    dailyReward: number
    trades: number
    deposit: number
    destroy: number
    team: number
    community: number
    unmapped: number
    consensusNodes: number
    totalNodes: number
  }
}
