import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import {
  AreasServed,
  ClosingCall,
  HoursLocation,
  MakesBoard,
  PhotoPanels,
  ReviewsPanel,
  ServiceBoards,
} from '../components/sections'
import { AddressPlate, CallButton, OpenBadge, PaintedArrow, SpanishLine } from '../components/sign'
import { business } from '../content/business'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'
import { pathFor } from '../routes'

export default function HomePage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  useDocumentHead(t('seo.home.title'), language)

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
      {/* The sign itself: name, trade, where, and the number, in that order. */}
      <section className="grid gap-8 sm:grid-cols-5 sm:items-start">
        <div className="sm:col-span-3">
          <h1 className="text-5xl leading-[0.95] sm:text-7xl">
            <span className="block text-enamel [text-shadow:6px_6px_0_var(--color-brush)]">JK</span>
            <span className="block text-sign-yellow [text-shadow:6px_6px_0_var(--color-brush)]">
              Auto Repair
            </span>
            <span className="mt-3 block font-display text-xl uppercase tracking-wide text-enamel sm:text-3xl">
              {t('hero.trade')} · {business.address.city}, {business.address.region}
            </span>
          </h1>

          <SpanishLine className="-mt-1 text-4xl sm:text-5xl" />

          <p className="mt-5 max-w-prose text-lg sm:text-xl">{t('hero.lede')}</p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-display text-sm text-sign-yellow">
            <li>{t('policies.experience', { years: business.yearsExperience })}</li>
            <li>{t('policies.walkIns')}</li>
            <li>{t('policies.sameDay')}</li>
            <li>{t('policies.freeEstimates')}</li>
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <CallButton size="loud" />
            <OpenBadge language={language} />
          </div>
        </div>

        <div className="sm:col-span-2">
          <AddressPlate tone="deep" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl">{t('services.title')}</h2>
        <div className="mt-5">
          <ServiceBoards />
        </div>
        <Link
          to={pathFor('services', language)}
          className="group mt-5 inline-flex items-center gap-2 font-display text-sign-yellow"
        >
          {t('nav.services')}
          <PaintedArrow />
        </Link>
      </section>

      <section className="mt-14 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-3xl">{t('about.title')}</h2>
          <p className="mt-3 max-w-prose text-lg">{t('about.body')}</p>
        </div>
        <div>
          <h2 className="text-3xl">{t('mission.title')}</h2>
          <p className="mt-3 max-w-prose text-lg">{t('mission.body')}</p>
        </div>
      </section>

      <ReviewsPanel />
      <PhotoPanels />
      <MakesBoard />
      <AreasServed />
      <HoursLocation />
      <ClosingCall />
    </div>
  )
}
