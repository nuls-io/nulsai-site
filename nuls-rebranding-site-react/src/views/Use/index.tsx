import React from 'react'
import './style.scss'
import CommonPage, { CommonPageSubtitle } from '../../components/CommonPage'
import useTrans from '../../hooks/useTrans'
import CommonGrid from '../../components/CommonGrid'
import { StickyAnchor, StickyLink } from '../../components/StickyCursor'
import CommonButton from '../../components/CommonButton'
import { Space } from 'antd'
import System from '../../store/system'
import { cdnFile } from '../../utils'

interface NetworkItem {
  name: string
  type: string
  rpcs: string[]
  chainId: string
  symbol: string
  explorer: string
  explorerUrl: string
  faucet?: string
  chainlist?: string
}

const networks: NetworkItem[] = [
  {
    name: 'NULS Mainnet',
    type: 'NULS',
    rpcs: [
      'api.nuls.io/jsonrpc',
      'sg.api.nuls.io/jsonrpc',
      'api.nuls.info/jsonrpc',
    ],
    chainId: '1',
    symbol: 'NULS',
    explorer: 'nulscan.io',
    explorerUrl: 'https://nulscan.io/',
  },
  {
    name: 'NULS Testnet',
    type: 'NULS',
    rpcs: ['beta.api.nuls.io/jsonrpc'],
    chainId: '2',
    symbol: 'tNULS',
    explorer: 'beta.nulscan.io',
    explorerUrl: 'https://beta.nulscan.io',
  },
  {
    name: 'ENULS Mainnet',
    type: 'Ethereum',
    rpcs: ['evmapi.nuls.io', 'evmapi2.nuls.io'],
    chainId: '119',
    symbol: 'NULS',
    explorer: 'evmscan.nuls.io',
    explorerUrl: 'https://evmscan.nuls.io',
    chainlist: 'https://chainlist.org/?search=enuls',
  },
  {
    name: 'ENULS Testnet',
    type: 'Ethereum',
    rpcs: ['beta.evmapi.nuls.io'],
    chainId: '120',
    symbol: 'NULS',
    explorer: 'beta.evmscan.nuls.io',
    explorerUrl: 'https://beta.evmscan.nuls.io',
    chainlist: 'https://chainlist.org/?search=enuls',
    faucet: 'https://faucet.nuls.io/',
  },
]

interface SCOItem {
  name: string
  desc: string
  link: string
  button: string
}

const scos: SCOItem[] = [
  {
    name: 'sco.stakers',
    desc: 'sco.stakersdesc',
    link: 'https://pocm.nuls.io/pocm',
    button: 'sco.stakersbtn',
  },
  {
    name: 'sco.projects',
    desc: 'sco.projectsdesc',
    link: 'https://pocm.nuls.io/pocm/Token/NewToken',
    button: 'sco.projectsbtn',
  },
]

interface WalletItem {
  image: string
  title: string
  link: string
}

const wallets: WalletItem[] = [
  {
    title: 'NULS AI Desktop Wallet',
    link: 'https://github.com/nuls-io/nuls-v2/releases',
    image: cdnFile('/ecosystem_files/NULS.webp'),
  },
  {
    title: 'Nabox Wallet',
    link: 'https://nabox.io/',
    image: cdnFile('/ecosystem_files/Nabox.svg'),
  },
  {
    title: 'More Wallets',
    link: '/ecosystem?type=Wallets',
    image: cdnFile('/ecosystem_files/NULS.webp'),
  },
]

interface EarnItem {
  title: string
  desc: string
  link: string
}

const earns: EarnItem[] = [
  {
    title: 'earn.consensus',
    desc: 'earn.consensusdesc',
    link: 'https://stake.nuls.io/',
  },
  {
    title: 'earn.sco',
    desc: 'earn.scodesc',
    link: 'https://pocm.nuls.io/pocm',
  },
  {
    title: 'earn.3rd',
    desc: 'earn.3rddesc',
    link: '/ecosystem?type=Staking',
  },
]

const Use: React.FC = () => {
  const { isMobile } = System.useContainer()
  const { t } = useTrans('use')

  return (
    <CommonPage id="use" title={t('title')}>
      <CommonPageSubtitle extra={t('wallet.desc')}>
        {t('wallet.title')}
      </CommonPageSubtitle>
      <CommonGrid
        className="wallets"
        data={wallets}
        renderItemContent={(wallet: WalletItem, i) => {
          return (
            <div className="content">
              <div className="title">
                <img src={wallet.image} alt="" />
                <span>{wallet.title}</span>
              </div>
              <div className="btn">
                {wallet.link.startsWith('http') ? (
                  <StickyAnchor href={wallet.link} target="_blank" dark>
                    <CommonButton dark>{t('wallet.try')}</CommonButton>
                  </StickyAnchor>
                ) : (
                  <StickyLink to={wallet.link} dark>
                    <CommonButton dark>{t('wallet.try')}</CommonButton>
                  </StickyLink>
                )}
              </div>
            </div>
          )
        }}
        columes={isMobile ? 1 : 3}
      />
      <CommonPageSubtitle extra={t('sco.desc')}>
        {t('sco.title')}
      </CommonPageSubtitle>
      <CommonGrid
        className="scos"
        data={scos}
        renderItemContent={(sco: SCOItem) => (
          <div className="content">
            <div className="name">{t(sco.name)}</div>
            <div className="desc">{t(sco.desc)}</div>
            <div className="btn">
              <StickyAnchor href={sco.link} target="_blank" dark>
                <CommonButton dark>{t(sco.button)}</CommonButton>
              </StickyAnchor>
            </div>
          </div>
        )}
        columes={isMobile ? 1 : 2}
      />
      <CommonPageSubtitle extra={t('earn.desc')}>
        {t('earn.title')}
      </CommonPageSubtitle>
      <CommonGrid
        className="earns"
        data={earns}
        renderItemContent={(earn: EarnItem, i) => {
          return (
            <div className="content">
              <div className="title">
                <span>{t(earn.title)}</span>
              </div>
              <div className="desc">
                <span>{t(earn.desc)}</span>
              </div>
              <div className="btn">
                {earn.link.startsWith('http') ? (
                  <StickyAnchor href={earn.link} target="_blank" dark>
                    <CommonButton dark>{t('earn.visit')}</CommonButton>
                  </StickyAnchor>
                ) : (
                  <StickyLink to={earn.link} dark>
                    <CommonButton dark>{t('earn.visit')}</CommonButton>
                  </StickyLink>
                )}
              </div>
            </div>
          )
        }}
        columes={isMobile ? 1 : 3}
      />
      <CommonPageSubtitle>{t('networks.title')}</CommonPageSubtitle>
      <CommonGrid
        className="networks"
        data={networks}
        renderItemContent={(network: NetworkItem) => (
          <div className="content">
            <div className="status">{t('networks.active')}</div>
            <div className="name">{network.name}</div>
            <div className="kvs">
              <div className="kv">
                <div className="k">{t('networks.type')}</div>
                <div className="v">{network.type}</div>
              </div>
              <div className="kv">
                <div className="k">{t('networks.chainid')}</div>
                <div className="v">{network.chainId}</div>
              </div>
              <div className="kv">
                <div className="k">{t('networks.symbol')}</div>
                <div className="v">{network.symbol}</div>
              </div>
              <div className="kv">
                <div className="k">{t('networks.rpc')}</div>
                <div className="v">
                  {network.rpcs.map((rpc, i) => (
                    <div key={i}>{rpc}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="btns">
              <Space>
                <StickyAnchor href={network.explorerUrl}>
                  <CommonButton dark size="small">
                    {t('networks.explorer')}
                  </CommonButton>
                </StickyAnchor>
                {network.chainlist && (
                  <StickyAnchor href={network.chainlist}>
                    <CommonButton dark size="small">
                      {t('networks.chainlist')}
                    </CommonButton>
                  </StickyAnchor>
                )}
                {network.faucet && (
                  <StickyAnchor href={network.faucet}>
                    <CommonButton dark size="small">
                      {t('networks.faucet')}
                    </CommonButton>
                  </StickyAnchor>
                )}
              </Space>
            </div>
          </div>
        )}
        columes={isMobile ? 1 : 2}
      />
    </CommonPage>
  )
}

export default Use
