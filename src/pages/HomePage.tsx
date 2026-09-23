import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import {
  AreasBand,
  ClosingBand,
  HoursLocationBand,
  MakesBand,
  PhotoBand,
  ReviewsBand,
  ServiceBands,
} from '../components/sections'
import {
  Band,
  CallButton,
  DirectionsButton,
  HeroImage,
  Kicker,
  OpenStatus,
} from '../components/sign'
import { business } from '../content/business'
import { heroPhoto } from '../content/photos'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'
import { pathFor } from '../routes'

export default function HomePage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  useDocumentHead(t('seo.home.title'), language)

  return (
    <>
      {/* The opening band: name, trade, and the two things a stranger does.
          With a photograph it becomes the graded hero; without one it stays a
          black field rather than borrowing somebody else's picture. */}
      <section className="relative flex min-h-[85svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 py-32 text-center text-canvas">
        {heroPhoto && <HeroImage photo={heroPhoto} />}
        <div className="relative flex flex-col items-center">
        <h1 className="text-5xl font-light sm:text-7xl">{business.name}</h1>
        <p className="mt-6 text-lg text-fog sm:text-xl">
          {t('hero.trade')} · {business.address.city}, {business.address.region}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CallButton tone="dark" />
          <DirectionsButton tone="dark" />
        </div>

        <div className="mt-8">
          <OpenStatus language={language} tone="dark" />
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-fog">
          <li>{t('policies.experience', { years: business.yearsExperience })}</li>
          <li>{t('contact.spanishSpoken')}</li>
          <li>{t('policies.walkIns')}</li>
          <li>{t('policies.freeEstimates')}</li>
        </ul>
        </div>
      </section>

      <Band>
        <div className="text-center">
          <h2 className="text-3xl font-light sm:text-4xl">{t('hero.lede')}</h2>
        </div>
      </Band>

      <Band muted>
        <h2 className="text-3xl font-light sm:text-4xl">{t('services.title')}</h2>
        <div className="mt-12">
          <ServiceBands />
        </div>
        <Link
          to={pathFor('services', language)}
          className="mt-12 inline-flex items-center justify-center rounded-pill border border-line px-8 py-3.5 text-sm font-medium no-underline transition-colors duration-200 hover:border-ink"
        >
          {t('nav.services')}
        </Link>
      </Band>

      <Band>
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <Kicker>{t('about.title')}</Kicker>
            <p className="mt-4 text-xl font-light leading-relaxed">{t('about.body')}</p>
          </div>
          <div>
            <Kicker>{t('mission.title')}</Kicker>
            <p className="mt-4 text-xl font-light leading-relaxed">{t('mission.body')}</p>
          </div>
        </div>
      </Band>

      {/* Photographs carry this grammar, so the frames are large and honest
          about being empty until the client sends real images. */}
      <Band muted>
        <PhotoBand />
      </Band>

      <Band tone="dark">
        <ReviewsBand />
      </Band>

      <Band>
        <div className="text-center">
          <MakesBand />
        </div>
      </Band>

      <Band muted>
        <div className="text-center">
          <AreasBand />
        </div>
      </Band>

      <Band>
        <HoursLocationBand />
      </Band>

      <Band tone="dark">
        <ClosingBand />
      </Band>
    </>
  )
}
