/**
 * Full-bleed bands, in the grammar the large service brands use: alternating
 * near-black and white, centered headlines at light weights, short supporting
 * lines in gray, and pill actions. No cards, no borders, no color.
 */

import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { business, cityLine, fullAddress, streetLine } from '../content/business'
import { formatRange, saturdayRange, weekdayRange } from '../content/hours'
import { galleryPhotos, photoSrc, photoSrcSet } from '../content/photos'
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

/**
 * The shop's own photographs, as a carousel.
 *
 * Scroll-snap does the work, so swiping is native and the thing still scrolls
 * before React hydrates and with JavaScript off. The arrows and dots are
 * enhancements on top of it, not the mechanism. Nothing auto-advances: a
 * visitor reading about brakes should not have the page move under them.
 */
export function PhotoCarousel() {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  const count = galleryPhotos.length

  /**
   * Wrapping past either end jumps instead of gliding: animating back across
   * every slide reads as a mistake, and it gets slower with each photo the
   * client adds.
   */
  const scrollToIndex = (index: number, wrapped = false) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.children[index] as HTMLElement | undefined
    if (!slide) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: slide.offsetLeft, behavior: reduced || wrapped ? 'auto' : 'smooth' })
  }

  const goTo = (index: number) => scrollToIndex((index + count) % count, index < 0 || index >= count)

  /** Which slide sits nearest the left edge, for the dots and the labels. */
  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const slide = track.children[0] as HTMLElement | undefined
    if (!slide) return
    const step = slide.getBoundingClientRect().width + 16
    setActive(Math.min(count - 1, Math.max(0, Math.round(track.scrollLeft / step))))
  }

  if (count === 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <PhotoFrame />
        <PhotoFrame />
      </div>
    )
  }

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={0}
        aria-label={t('photos.title')}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain"
      >
        {galleryPhotos.map((photo, index) => (
          <li key={photo.name} className="w-[86%] shrink-0 snap-start sm:w-[68%]">
            <img
              src={photoSrc(photo, 800)}
              srcSet={photoSrcSet(photo)}
              sizes="(min-width: 640px) 700px, 86vw"
              width={photo.width}
              height={photo.height}
              alt={t(photo.altKey)}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
            />
          </li>
        ))}
      </ul>

      {/* Arrows are for pointers; touch already swipes, so they stay off phones. */}
      <div className="mt-6 flex items-center justify-between">
        {/* Clickable, so they are real buttons with real labels rather than
            decoration everyone but a keyboard user can operate. */}
        <div className="flex gap-2">
          {galleryPhotos.map((photo, index) => (
            <button
              key={photo.name}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={t('photos.goTo', { index: index + 1 })}
              aria-current={index === active ? 'true' : undefined}
              className={`h-1.5 w-6 transition-colors duration-200 ${
                index === active ? 'bg-ink' : 'bg-line hover:bg-smoke'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm tabular-nums text-smoke">
            {t('photos.position', { index: active + 1, total: count })}
          </span>
          {/* Both arrows wrap, so the last photo leads back to the first and
              the set stays circular however many the client adds. */}
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label={t('photos.previous')}
            className="hidden h-10 w-10 items-center justify-center rounded-pill border border-line transition-colors duration-200 hover:border-ink sm:inline-flex"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label={t('photos.next')}
            className="hidden h-10 w-10 items-center justify-center rounded-pill border border-line transition-colors duration-200 hover:border-ink sm:inline-flex"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
      <path
        d={direction === 'left' ? 'M10 2 4 8l6 6' : 'M6 2l6 6-6 6'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
