import items from './items.json'

export enum TabType {
  All = 'All',
  AI = 'AI',
  Wallets = 'Wallets',
  DeFi = 'DeFi',
  Staking = 'Staking',
  'Infra&Tools' = 'Infra&Tools',
  NFTs = 'NFTs',
  LaunchPad = 'LaunchPad',
  Gaming = 'Gaming',
  Web3 = 'Web3',
  PayFi = 'PayFi',
}

export const tabs = [
  { type: TabType.All, label: 'All' },
  { type: TabType.AI, label: 'AI' },
  { type: TabType.Wallets, label: 'Wallets' },
  { type: TabType.DeFi, label: 'DeFi' },
  { type: TabType.Staking, label: 'Staking' },
  { type: TabType['Infra&Tools'], label: 'Infra & Tools' },
  { type: TabType.NFTs, label: 'NFTs' },
  { type: TabType.LaunchPad, label: 'LaunchPad' },
  { type: TabType.Gaming, label: 'Gaming' },
  { type: TabType.Web3, label: 'Web3' },
  { type: TabType.PayFi, label: 'PayFi' },
]

export interface EcosystemItem {
  src: string
  name: string
  desc: string
  link: string
  type: TabType[]
}

export default items as EcosystemItem[]
