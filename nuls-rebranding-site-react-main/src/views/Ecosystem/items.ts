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
]

export interface EcosystemItem {
  src: string
  name: string
  desc: string
  link: string
  type: TabType[]
}

export default items as EcosystemItem[]
