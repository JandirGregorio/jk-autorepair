/**
 * The page's sections.
 *
 * The arrangement is the one a customer expects from an auto shop site, which
 * is what the client asked for. The materials are the service record's: ruled
 * rows, tabular figures, one accent, no ornament.
 */

import { useTranslation } from 'react-i18next'

import { business, cityLine, fullAddress, streetLine } from '../content/business'
import { formatRange, saturdayRange, weekdayRange } from '../content/hours'
import { useRouteInfo } from '../hooks/useRoute'
import { AddressBlock, ArrowGlyph, CallButton, FieldLabel, RecordLeaf } from './sign'

export function ServiceBoards() {
  const { t } = useTranslation()

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {business.services.map((group) => (
        <RecordLeaf key={group.id} className="p-6">
          <h3 className="font-display text-xl font-semibold">{t(`services.${group.id}.label`)}</h3>
          <ul className="mt-4">
            {group.items.map((item) => (
              <li
                key={item}
                className="border-b border-rule py-2 text-[0.95rem] last:border-b-0 last:pb-0"
              >
                {t(`services.${group.id}.items.${item}`)}
              </li>
            ))}
          </ul>
        </RecordLeaf>
      ))}
    </div>
  )
}

export function MakesBoard() {
  const { t } = useTranslation()
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('makes.title')}</h2>
      <p className="mt-2 text-lg">{t('makes.allMakes')}</p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-form text-sm text-slate">
        {business.makes.map((make) => (
          <li key={make}>{make}</li>
        ))}
      </ul>
    </section>
  )
}

export function AreasServed() {
  const { t } = useTranslation()
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('areas.title')}</h2>
      <p className="mt-2 text-lg">{business.areasServed.join(' · ')}</p>
    </section>
  )
}

/**
 * Reviews, with no number attached.
 *
 * The shop has six reviews and no testimonials on file. Nothing here invents a
 * rating, a count, or a quote: the real ones live on the Google profile.
 */
export function ReviewsPanel() {
  const { t } = useTranslation()
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('reviews.title')}</h2>
      <p className="mt-2 max-w-prose text-lg">{t('reviews.body')}</p>
      <div className="mt-5 flex flex-wrap gap-6">
        <a
          href={business.links.readReviews}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-oxblood no-underline"
        >
          {t('actions.readReviews')}
          <ArrowGlyph />
        </a>
        <a
          href={business.links.leaveReview}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-graphite no-underline"
        >
          {t('actions.leaveReview')}
          <ArrowGlyph />
        </a>
      </div>
    </section>
  )
}

/**
 * Photo slots.
 *
 * The client has not sent shop photos. These are labelled ruled frames that
 * say so, sized at the real aspect ratio, so dropping images in later is a
 * content change rather than a layout change. No texture or stock picture
 * stands in for the missing photograph.
 */
export function PhotoSlots({ count = 3 }: { count?: number }) {
  const { t } = useTranslation()
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('photos.title')}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="flex aspect-[4/3] items-center justify-center rounded-leaf border border-dashed border-rule-strong bg-carbon p-4 text-center"
          >
            <FieldLabel>{t('photos.pending')}</FieldLabel>
          </div>
        ))}
      </div>
    </section>
  )
}

export function HoursLocation() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{t('contact.title')}</h2>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <AddressBlock />

        <RecordLeaf className="p-5">
          <FieldLabel>{t('hours.title')}</FieldLabel>
          <table className="mt-3 w-full text-left font-form text-sm tabular-nums">
            <tbody>
              <tr className="border-b border-rule">
                <th scope="row" className="py-1.5 pe-4 font-normal">
                  {t('hours.weekdays')}
                </th>
                <td className="py-1.5 text-right">{formatRange(weekdayRange(), language)}</td>
              </tr>
              <tr className="border-b border-rule">
                <th scope="row" className="py-1.5 pe-4 font-normal">
                  {t('hours.saturday')}
                </th>
                <td className="py-1.5 text-right">{formatRange(saturdayRange(), language)}</td>
              </tr>
              <tr>
                <th scope="row" className="py-1.5 pe-4 font-normal">
                  {t('hours.sunday')}
                </th>
                <td className="py-1.5 text-right">{t('hours.closed')}</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-5">
            <FieldLabel>{t('contact.phoneLabel')}</FieldLabel>
            <br />
            <a
              href={business.phone.href}
              className="font-form text-xl tabular-nums text-oxblood no-underline"
            >
              {business.phone.display}
            </a>
          </p>
        </RecordLeaf>
      </div>

      <div className="mt-5 overflow-hidden rounded-leaf border border-rule">
        <iframe
          src={business.links.mapEmbed}
          title={t('contact.mapTitle', { address: fullAddress() })}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-72 w-full sm:h-96"
        />
      </div>
    </section>
  )
}

export function ClosingCall() {
  const { t } = useTranslation()
  return (
    <section className="mt-16 border-t border-rule pt-10">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{streetLine()}</h2>
      <p className="mt-1 font-form text-lg tabular-nums text-slate">{cityLine()}</p>
      <div className="mt-5 flex flex-wrap items-center gap-5">
        <CallButton size="loud" />
        <p className="text-sm text-slate">{t('policies.walkIns')}</p>
      </div>
    </section>
  )
}
