import { useTranslation } from 'react-i18next'

import {
  AreasServed,
  ClosingCall,
  HoursLocation,
  MakesBoard,
  ServiceBoards,
} from '../components/sections'
import { OpenStamp } from '../components/sign'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'

export default function ServicesPage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  useDocumentHead(t('seo.services.title'), language)

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
        {t('services.title')}
      </h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed sm:text-xl">
        {t('servicesPage.intro')}
      </p>
      <div className="mt-5">
        <OpenStamp language={language} />
      </div>

      <div className="mt-10">
        <ServiceBoards />
      </div>

      <MakesBoard />
      <AreasServed />
      <HoursLocation />
      <ClosingCall />
    </div>
  )
}
