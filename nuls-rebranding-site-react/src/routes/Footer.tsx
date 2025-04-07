import React, { PropsWithChildren } from 'react'
import './Footer.scss'
import { StickyAnchor, StickyLink } from '../components/StickyCursor'
import logoImg from '../assets/img/logo-light.svg'
import sociDcImg from '../assets/img/soci-dc.svg'
import sociTgImg from '../assets/img/soci-tg.svg'
import xImg from '../assets/img/soci-x.svg'
import linkedinImg from '../assets/img/soci-linkedin.svg'
import redditImg from '../assets/img/soci-reddit.svg'
import facebookImg from '../assets/img/soci-facebook.svg'
import youtubeImg from '../assets/img/soci-youtube.svg'

interface FooterProps {
  showFooter?: boolean
}

const Anchor: React.FC<PropsWithChildren<{ href: string }>> = ({
  href,
  children,
}) => (
  <StickyAnchor href={href} dark target="_blank">
    {children}
  </StickyAnchor>
)

const Link: React.FC<PropsWithChildren<{ to: string }>> = ({
  to,
  children,
}) => (
  <StickyLink to={to} dark>
    {children}
  </StickyLink>
)

const Index: React.FC<FooterProps> = (props: FooterProps) => {
  return (
    <footer>
      <div className="content">
        <div className="menu">
          <div className="row">
            <Anchor href="https://gateway.pinata.cloud/ipfs/bafybeiel7hghuyued6duyp2tw5em2zttdadfjbhzv3sa5u3peu4y3u3aga">
              White Paper
            </Anchor>
            <Anchor href="https://nuls.medium.com/">Blog</Anchor>
            <Anchor href="https://www.youtube.com/@NULS_AI">Youtube</Anchor>
            <Anchor href="https://forum.nuls.io/">Forum</Anchor>
          </div>
          <div className="row">
            <Link to="/ecosystem?type=Wallets">Wallets</Link>
            <Link to="/ecosystem?type=Staking">Staking</Link>
            <StickyAnchor dark>SCO Platform</StickyAnchor>
            <Anchor href="https://nulscan.io/">NULS Explorer</Anchor>
            <Anchor href="https://evmscan.nuls.io/">ENULS Explorer</Anchor>
          </div>
          <div className="row">
            <Anchor href="https://github.com/nuls-io">GitHub</Anchor>
            <Link to="/brand">Brand Assets</Link>
            <Anchor href="https://docs.nuls.io/">Documentation</Anchor>
          </div>
          <div className="row">
            <Link to="/partners">Partners</Link>
            {/* <StickyAnchor dark>Roadmap</StickyAnchor> */}
            <Link to="/community">Community</Link>
          </div>
        </div>
        <div className="info">
          <div className="logo">
            <img src={logoImg} alt="" />
          </div>

          <div className="links">
            <Anchor href="https://discord.com/invite/aRCwbj47WN">
              <img src={sociDcImg} alt="" />
            </Anchor>
            <Anchor href="https://t.me/Nulsio">
              <img src={sociTgImg} alt="" />
            </Anchor>
            <Anchor href="https://x.com/Nuls">
              <img src={xImg} alt="" />
            </Anchor>
            <Anchor href="https://www.linkedin.com/company/11716524">
              <img src={linkedinImg} alt="" />
            </Anchor>
            <Anchor href="https://www.reddit.com/r/nulsservice">
              <img src={redditImg} alt="" />
            </Anchor>
            <Anchor href="https://www.facebook.com/nulscommunity">
              <img src={facebookImg} alt="" />
            </Anchor>
            <Anchor href="https://www.youtube.com/@NULS_AI">
              <img src={youtubeImg} alt="" />
            </Anchor>
          </div>
        </div>
      </div>
      <div className="rights">
        <div>
          <Link to="/legal">Terms & Conditions & Privacy Policy</Link>
        </div>
        <div>NULS AI © 2017-2025. All rights reserved.</div>
      </div>
    </footer>
  )
}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  return <Index />
}

export default Footer
