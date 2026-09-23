/**
 * Full-bleed bands, in the grammar the large service brands use: alternating
 * near-black and white, centered headlines at light weights, short supporting
 * lines in gray, and pill actions. No cards, no borders, no color.
 */

import { useTranslation } from 'react-i18next'

import { business, cityLine, fullAddress, streetLine } from '../content/business'
import { formatRange, saturdayRange, weekdayRange } from '../content/hours'
import { useRouteInfo } from '../hooks/useRoute'
import { AddressBlock, CallButton, DirectionsButton, Kicker, PhotoFrame } from './sign'

export function ServiceBands() {
  const { t } = useTranslation()

  return (
    <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
      {business.services.map((group) => (
        <div key={group.id}>
          <h3 className="text-2xl font-light">{t(`services.${group.id}.label`)}</h3>
          <ul className="mt-5 space-y-2 text-smoke">
            {group.items.map((item) => (
              <li key={item}>{t(`services.${group.id}.items.${item}`)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function MakesBand() {
  const { t } = useTranslation()
  return (
    <>
      <h2 className="text-3xl font-light sm:text-4xl">{t('makes.title')}</h2>
      <p className="mt-4 text-lg text-smoke">{t('makes.allMakes')}</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-smoke">
        {business.makes.map((make) => (
          <li key={make}>{make}</li>
        ))}
      </ul>
    </>
  )
}

export function AreasBand() {
  const { t } = useTranslation()
  return (
    <>
      <Kicker>{t('areas.title')}</Kicker>
      <p className="mt-4 text-xl font-light">{business.areasServed.join(' · ')}</p>
    </>
  )
}

/**
 * Reviews, with no number attached.
 *
 * The shop has six reviews and no testimonials on file. Nothing here invents a
 * rating, a count, or a quote: the real ones live on the Google profile.
 */
export function ReviewsBand() {
  const { t } = useTranslation()
  return (
    <div className="text-center">
      <h2 className="text-3xl font-light sm:text-4xl">{t('reviews.title')}</h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-fog">{t('reviews.body')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href={business.links.readReviews}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-pill bg-canvas px-8 py-3.5 text-sm font-medium text-ink no-underline transition-colors duration-200 hover:bg-fog"
        >
          {t('actions.readReviews')}
        </a>
        <a
          href={business.links.leaveReview}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-pill border border-line-dark px-8 py-3.5 text-sm font-medium text-canvas no-underline transition-colors duration-200 hover:border-canvas"
        >
          {t('actions.leaveReview')}
        </a>
      </div>
    </div>
  )
}

export function HoursLocationBand() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()

  return (
    <>
      <h2 className="text-3xl font-light sm:text-4xl">{t('contact.title')}</h2>

      <div className="mt-12 grid gap-12 sm:grid-cols-2">
        <div>
          <AddressBlock />
          <div className="mt-6 flex flex-wrap gap-4">
            <CallButton />
            <DirectionsButton />
          </div>
        </div>

        <div>
          <Kicker>{t('hours.title')}</Kicker>
          <dl className="mt-4 text-base tabular-nums">
            <div className="flex justify-between gap-6 border-b border-line py-3">
              <dt className="text-smoke">{t('hours.weekdays')}</dt>
              <dd>{formatRange(weekdayRange(), language)}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line py-3">
              <dt className="text-smoke">{t('hours.saturday')}</dt>
              <dd>{formatRange(saturdayRange(), language)}</dd>
            </div>
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-smoke">{t('hours.sunday')}</dt>
              <dd>{t('hours.closed')}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-12">
        <iframe
          src={business.links.mapEmbed}
          title={t('contact.mapTitle', { address: fullAddress() })}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-80 w-full sm:h-[28rem]"
        />
      </div>
    </>
  )
}

export function PhotoBand() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <PhotoFrame />
      <PhotoFrame />
    </div>
  )
}

export function ClosingBand() {
  const { t } = useTranslation()
  return (
    <div className="text-center">
      <h2 className="text-3xl font-light sm:text-4xl">{streetLine()}</h2>
      <p className="mt-2 text-lg tabular-nums text-fog">{cityLine()}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <CallButton tone="dark" />
        <DirectionsButton tone="dark" />
      </div>
      <p className="mt-6 text-sm text-fog">{t('policies.walkIns')}</p>
    </div>
  )
}
