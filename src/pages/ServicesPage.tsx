import { useTranslation } from 'react-i18next'

import {
  AreasBand,
  ClosingBand,
  HoursLocationBand,
  MakesBand,
  ServiceBands,
} from '../components/sections'
import { Band, OpenStatus } from '../components/sign'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'

export default function ServicesPage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  useDocumentHead(t('seo.services.title'), language)

  return (
    <>
      <section className="flex min-h-[55svh] flex-col items-center justify-center bg-ink px-6 py-28 text-center text-canvas">
        <h1 className="text-4xl font-light sm:text-6xl">{t('services.title')}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-fog">{t('servicesPage.intro')}</p>
        <div className="mt-8">
          <OpenStatus language={language} tone="dark" />
        </div>
      </section>

      <Band>
        <ServiceBands />
      </Band>

      <Band muted>
        <div className="text-center">
          <MakesBand />
        </div>
      </Band>

      <Band>
        <div className="text-center">
          <AreasBand />
        </div>
      </Band>

      <Band muted>
        <HoursLocationBand />
      </Band>

      <Band tone="dark">
        <ClosingBand />
      </Band>
    </>
  )
}
