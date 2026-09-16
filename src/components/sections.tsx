/**
 * The page's painted boards.
 *
 * Deliberately not a row of identical cards: the boards vary in width and tone
 * the way panels on a real sign do, and the lists inside them carry the work.
 */

import { useTranslation } from 'react-i18next'

import { business, cityLine, fullAddress, streetLine } from '../content/business'
import { formatRange, saturdayRange, weekdayRange } from '../content/hours'
import { useRouteInfo } from '../hooks/useRoute'
import { AddressPlate, CallButton, PaintedArrow, PaintedPanel } from './sign'

export function ServiceBoards() {
  const { t } = useTranslation()

  // Widths alternate so the boards read as painted panels, not a card grid.
  const spans = ['sm:col-span-3', 'sm:col-span-2', 'sm:col-span-2', 'sm:col-span-3']

  return (
    <div className="grid gap-5 sm:grid-cols-5">
      {business.services.map((group, index) => (
        <PaintedPanel
          key={group.id}
          tone={index % 2 === 0 ? 'enamel' : 'deep'}
          className={`p-6 ${spans[index]}`}
        >
          <h3 className="text-2xl">{t(`services.${group.id}.label`)}</h3>
          <ul className="mt-4 space-y-2">
            {group.items.map((item) => (
              <li key={item} className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-2 inline-block h-2 w-2 shrink-0 ${
                    index % 2 === 0 ? 'bg-painted-red' : 'bg-sign-yellow'
                  }`}
                />
                {t(`services.${group.id}.items.${item}`)}
              </li>
            ))}
          </ul>
        </PaintedPanel>
      ))}
    </div>
  )
}

export function MakesBoard() {
  const { t } = useTranslation()
  return (
    <section className="mt-12">
      <h2 className="text-3xl">{t('makes.title')}</h2>
      <p className="mt-2 text-lg">{t('makes.allMakes')}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {business.makes.map((make) => (
          <li
            key={make}
            className="rounded-painted border-2 border-sign-yellow px-3 py-1 font-display text-xs tracking-wider text-sign-yellow"
          >
            {make}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function AreasServed() {
  const { t } = useTranslation()
  return (
    <section className="mt-12">
      <h2 className="text-3xl">{t('areas.title')}</h2>
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
    <PaintedPanel tone="enamel" className="mt-12 p-6">
      <h2 className="text-3xl">{t('reviews.title')}</h2>
      <p className="mt-2 max-w-prose text-lg">{t('reviews.body')}</p>
      <div className="mt-5 flex flex-wrap gap-4">
        <a
          href={business.links.readReviews}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-painted border-4 border-ink bg-sign-yellow px-4 py-3 font-display text-ink no-underline shadow-painted-sm"
        >
          {t('actions.readReviews')}
          <PaintedArrow />
        </a>
        <a
          href={business.links.leaveReview}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-painted border-4 border-ink px-4 py-3 font-display text-ink no-underline"
        >
          {t('actions.leaveReview')}
          <PaintedArrow />
        </a>
      </div>
    </PaintedPanel>
  )
}

/**
 * Photo boards.
 *
 * The client has not sent shop photos. These are painted panels that say so,
 * rather than stock pictures of somebody else's garage.
 */
export function PhotoPanels() {
  const { t } = useTranslation()
  return (
    <section className="mt-12">
      <h2 className="text-3xl">{t('photos.title')}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="flex aspect-[4/3] items-center justify-center rounded-painted border-4 border-dashed border-sign-yellow/70 bg-sign-blue-deep p-4 text-center font-display text-sm text-sign-yellow"
          >
            {t('photos.pending')}
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
    <section className="mt-12">
      <h2 className="text-3xl">{t('contact.title')}</h2>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <AddressPlate tone="enamel" />

        <PaintedPanel tone="deep" className="p-5">
          <p className="font-display text-xs tracking-widest">{t('hours.title')}</p>
          <table className="numerals mt-3 w-full text-left">
            <tbody>
              <tr>
                <th scope="row" className="pe-4 font-normal">
                  {t('hours.weekdays')}
                </th>
                <td>{formatRange(weekdayRange(), language)}</td>
              </tr>
              <tr>
                <th scope="row" className="pe-4 font-normal">
                  {t('hours.saturday')}
                </th>
                <td>{formatRange(saturdayRange(), language)}</td>
              </tr>
              <tr>
                <th scope="row" className="pe-4 font-normal">
                  {t('hours.sunday')}
                </th>
                <td>{t('hours.closed')}</td>
              </tr>
            </tbody>
          </table>

          <p className="numerals mt-4">
            <span className="font-display text-xs tracking-widest">{t('contact.phoneLabel')}</span>
            <br />
            <a href={business.phone.href} className="font-display text-2xl">
              {business.phone.display}
            </a>
          </p>
        </PaintedPanel>
      </div>

      <div className="mt-5 rounded-painted border-4 border-ink shadow-painted">
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
    <section className="mt-14 border-t-4 border-brush pt-8">
      <h2 className="text-3xl">{streetLine()}</h2>
      <p className="numerals mt-1 text-lg">{cityLine()}</p>
      <div className="mt-5 flex flex-wrap items-center gap-5">
        <CallButton size="loud" />
        <p className="text-sm">{t('policies.walkIns')}</p>
      </div>
    </section>
  )
}
