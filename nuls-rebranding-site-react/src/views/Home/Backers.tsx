import useTrans from '../../hooks/useTrans'
import BlackBgTitle from './components/BlackBgTitle'
import { List } from '../Partners'
import items from '../Partners/items.json'
import { StickyAnchor, StickyLink } from '../../components/StickyCursor'
import CommonButton from '../../components/CommonButton'
import { Space } from 'antd'

const { home_exchange, home_support } = items

const Backers: React.FC = () => {
  const { t } = useTrans('backers')

  return (
    <div id="backers">
      <div className="content">
        <BlackBgTitle>{t('listed')}</BlackBgTitle>
        <List icons={home_exchange} />
        <div className="backers-opt">
          <StickyAnchor
            href="https://naipump.fun/token/2/NULSd6HgmXExhDHAAFmN2AzSc4oAvKLRuULby"
            target="_blank"
          >
            <CommonButton size="large" dark>
              {t('buy')}
            </CommonButton>
          </StickyAnchor>
          <StickyAnchor href="/ecosystem?type=Staking" target="_blank">
            <CommonButton size="large" dark>
              {t('stake')}
            </CommonButton>
          </StickyAnchor>
        </div>
        <BlackBgTitle>{t('support')}</BlackBgTitle>
        <List icons={home_support} />
        <div className="backers-opt">
          <StickyLink to="/partners">
            <CommonButton size="large" dark>
              {t('more')}
            </CommonButton>
          </StickyLink>
        </div>
      </div>
    </div>
  )
}

export default Backers
