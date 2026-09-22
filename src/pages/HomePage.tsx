import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import {
  AreasServed,
  ClosingCall,
  HoursLocation,
  MakesBoard,
  PhotoSlots,
  ReviewsPanel,
  ServiceBoards,
} from '../components/sections'
import {
  AddressBlock,
  ArrowGlyph,
  CallButton,
  FieldLabel,
  OpenStamp,
  SpanishNote,
} from '../components/sign'
import { business } from '../content/business'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'
import { pathFor } from '../routes'

export default function HomePage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  useDocumentHead(t('seo.home.title'), language)

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      {/* The record's header: who, what trade, where, and the number. */}
      <section className="grid gap-10 sm:grid-cols-5 sm:items-start">
        <div className="sm:col-span-3">
          <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            {business.name}
          </h1>
          <p className="mt-3 font-display text-xl text-slate sm:text-2xl">
            {t('hero.trade')} · {business.address.city}, {business.address.region}
          </p>

          <p className="mt-6 max-w-prose text-lg leading-relaxed sm:text-xl">{t('hero.lede')}</p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-rule py-3 font-form text-xs uppercase tracking-[0.12em] text-slate">
            <li>{t('policies.experience', { years: business.yearsExperience })}</li>
            <li>{t('policies.walkIns')}</li>
            <li>{t('policies.sameDay')}</li>
            <li>{t('policies.freeEstimates')}</li>
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <CallButton size="loud" />
            <SpanishNote />
          </div>

          <div className="mt-4">
            <OpenStamp language={language} />
          </div>
        </div>

        <div className="sm:col-span-2">
          <AddressBlock />

          {/* The photo slot, drawn at its real ratio until the client sends
              images. Replacing it is a content change, not a redesign. */}
          <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-leaf border border-dashed border-rule-strong bg-carbon p-4 text-center">
            <FieldLabel>{t('photos.pending')}</FieldLabel>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('services.title')}</h2>
        <div className="mt-5">
          <ServiceBoards />
        </div>
        <Link
          to={pathFor('services', language)}
          className="group mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-oxblood no-underline"
        >
          {t('nav.services')}
          <ArrowGlyph />
        </Link>
      </section>

      <section className="mt-16 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('about.title')}</h2>
          <p className="mt-3 max-w-prose text-lg leading-relaxed">{t('about.body')}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('mission.title')}</h2>
          <p className="mt-3 max-w-prose text-lg leading-relaxed">{t('mission.body')}</p>
        </div>
      </section>

      <ReviewsPanel />
      <PhotoSlots />
      <MakesBoard />
      <AreasServed />
      <HoursLocation />
      <ClosingCall />
    </div>
  )
}
