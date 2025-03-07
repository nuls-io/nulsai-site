import { i18n } from 'i18next'
import { useTranslation, TFunction } from 'react-i18next'

export interface Trans {
  i18n: i18n
  t: TFunction
  tCommon: TFunction
  tRoot: TFunction
}

export default function useTrans(keyPrefix: string): Trans {
  const { t, i18n } = useTranslation('trans', { keyPrefix })
  const { t: tCommon } = useTranslation('trans', { keyPrefix: 'common' })
  const { t: tRoot } = useTranslation('trans')

  return {
    i18n,
    t,
    tCommon,
    tRoot,
  }
}
