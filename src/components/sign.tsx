/**
 * Service Minimal primitives.
 *
 * Pill actions, hairline rules, one family at light weights, no accent color.
 * Every primitive comes in a light and a dark variant because the page
 * alternates full-bleed bands.
 */

import { useSyncExternalStore, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { business, cityLine, isOpenAt } from '../content/business'
import { formatRange, todayRange } from '../content/hours'
import type { Language } from '../routes'

type Tone = 'light' | 'dark'

/** A full-bleed band. The page is a stack of these. */
export function Band({
  children,
  tone = 'light',
  muted = false,
  className = '',
}: {
  children: ReactNode
  tone?: Tone
  muted?: boolean
  className?: string
}) {
  const ground =
    tone === 'dark' ? 'bg-ink text-canvas' : muted ? 'bg-mist text-ink' : 'bg-canvas text-ink'
  return (
    <section className={`${ground} ${className}`}>
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">{children}</div>
    </section>
  )
}

/** Small letter-spaced label, the only ornament this world allows. */
export function Kicker({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`text-[0.7rem] uppercase tracking-[0.22em] ${
        tone === 'dark' ? 'text-fog' : 'text-smoke'
      }`}
    >
      {children}
    </span>
  )
}

export function CallButton({ tone = 'light' }: { tone?: Tone }) {
  const { t } = useTranslation()
  const filled =
    tone === 'dark'
      ? 'bg-canvas text-ink hover:bg-fog'
      : 'bg-ink text-canvas hover:bg-smoke'
  return (
    <a
      href={business.phone.href}
      className={`inline-flex items-center justify-center gap-2 rounded-pill px-8 py-3.5 text-sm font-medium no-underline transition-colors duration-200 ${filled}`}
    >
      {t('actions.call')}
      <span className="tabular-nums">{business.phone.display}</span>
    </a>
  )
}

export function DirectionsButton({ tone = 'light' }: { tone?: Tone }) {
  const { t } = useTranslation()
  const outlined =
    tone === 'dark'
      ? 'border-line-dark text-canvas hover:border-canvas'
      : 'border-line text-ink hover:border-ink'
  return (
    <a
      href={business.links.directions}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-pill border px-8 py-3.5 text-sm font-medium no-underline transition-colors duration-200 ${outlined}`}
    >
      {t('actions.directions')}
    </a>
  )
}

/**
 * The open/closed line.
 *
 * It reads the shop's clock, not the visitor's, and only after hydration: the
 * prerendered HTML cannot know what time it is, and printing a guess would
 * either lie or break hydration.
 */
export function OpenStatus({ language, tone = 'light' }: { language: Language; tone?: Tone }) {
  const { t } = useTranslation()
  const minute = useSyncExternalStore(subscribeToMinute, currentMinute, noMinuteOnServer)

  if (minute === null) return null

  const now = new Date(minute * 60_000)
  const open = isOpenAt(now)
  const today = todayRange(now)
  const muted = tone === 'dark' ? 'text-fog' : 'text-smoke'

  return (
    <p className={`flex flex-wrap items-center justify-center gap-x-2 text-sm ${muted}`}>
      <span className={tone === 'dark' ? 'text-canvas' : 'text-ink'}>
        {open ? t('hours.openNow') : t('hours.closedNow')}
      </span>
      <span aria-hidden="true">·</span>
      <span className="tabular-nums">
        {today
          ? t('hero.hoursToday', { hours: formatRange(today, language) })
          : `${t('hours.sunday')}: ${t('hours.closed')}`}
      </span>
    </p>
  )
}

/**
 * The clock, as an external store.
 *
 * The snapshot is a minute index, not a Date: a fresh Date on every read would
 * never compare equal and would re-render forever. On the server there is no
 * snapshot at all, so the prerendered HTML carries no open/closed claim.
 */
function subscribeToMinute(onChange: () => void): () => void {
  const timer = window.setInterval(onChange, 60_000)
  return () => window.clearInterval(timer)
}

function currentMinute(): number {
  return Math.floor(Date.now() / 60_000)
}

function noMinuteOnServer(): null {
  return null
}

/**
 * The address.
 *
 * "Suite C" sits on its own line: the building has units A, B and C, and the
 * Google Business Profile is registered with Suite C. Anything else costs the
 * shop its local ranking.
 */
export function AddressBlock({ tone = 'light' }: { tone?: Tone }) {
  const { t } = useTranslation()
  const muted = tone === 'dark' ? 'text-fog' : 'text-smoke'
  return (
    <div>
      <Kicker tone={tone}>{t('contact.addressLabel')}</Kicker>
      <address className="mt-4 text-xl font-light not-italic leading-snug">
        <span className="block">{business.address.street}</span>
        <span className="block">{business.address.unit}</span>
        <span className={`mt-1 block text-base tabular-nums ${muted}`}>{cityLine()}</span>
      </address>
    </div>
  )
}

/** A full-bleed frame waiting for a real photograph. */
export function PhotoFrame({ className = '' }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <div
      className={`flex aspect-[16/9] w-full items-center justify-center bg-mist ${className}`}
    >
      <Kicker>{t('photos.pending')}</Kicker>
    </div>
  )
}
