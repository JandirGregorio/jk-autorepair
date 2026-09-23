import { useTranslation } from 'react-i18next'

import {
  AreasBand,
  ClosingBand,
  HoursLocationBand,
  MakesBand,
  ServiceBands,
} from '../components/sections'
import { Band, HeroImage, OpenStatus } from '../components/sign'
import { heroPhoto } from '../content/photos'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'

export default function ServicesPage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  useDocumentHead(t('seo.services.title'), language)

  return (
    <>
      {/* The same graded photograph as the home page, so arriving here reads as
          the same shop rather than a different site. Shorter, because the
          headline and the list under it are what this page is for. */}
      <section className="relative flex min-h-[55svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-28 text-center text-canvas">
        {heroPhoto && <HeroImage photo={heroPhoto} />}
        <div className="relative flex flex-col items-center">
          <h1 className="text-4xl font-light sm:text-6xl">{t('services.title')}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-fog">{t('servicesPage.intro')}</p>
          <div className="mt-8">
            <OpenStatus language={language} tone="dark" />
          </div>
        </div>
      </section>

      {/* No section heading above these, so the groups carry h2 themselves. */}
      <Band>
        <ServiceBands level={2} />
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
