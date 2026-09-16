import { useTranslation } from 'react-i18next'

import {
  AreasServed,
  ClosingCall,
  HoursLocation,
  MakesBoard,
  ServiceBoards,
} from '../components/sections'
import { OpenBadge } from '../components/sign'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'

export default function ServicesPage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  useDocumentHead(t('seo.services.title'), language)

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
      <h1 className="text-4xl sm:text-6xl">
        <span className="block text-sign-yellow [text-shadow:6px_6px_0_var(--color-brush)]">
          {t('services.title')}
        </span>
      </h1>
      <p className="mt-4 max-w-prose text-lg sm:text-xl">{t('servicesPage.intro')}</p>
      <div className="mt-5">
        <OpenBadge language={language} />
      </div>

      <div className="mt-8">
        <ServiceBoards />
      </div>

      <MakesBoard />
      <AreasServed />
      <HoursLocation />
      <ClosingCall />
    </div>
  )
}
