/**
 * Painted primitives.
 *
 * Every edge here is hand-cut: hard offset shadows, brushstroke borders, no
 * blur, no gradient. The sign is painted boards butted against each other.
 */

import { useSyncExternalStore, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { business, cityLine, isOpenAt } from '../content/business'
import { formatRange, todayRange } from '../content/hours'
import type { Language } from '../routes'

type PanelProps = {
  children: ReactNode
  /** Enamel is the off-white board; blue is the deep painted board. */
  tone?: 'enamel' | 'deep'
  className?: string
}

export function PaintedPanel({ children, tone = 'enamel', className = '' }: PanelProps) {
  const tones =
    tone === 'enamel'
      ? 'bg-enamel text-ink border-ink'
      : 'bg-sign-blue-deep text-enamel border-brush'
  return (
    <div
      className={`rounded-painted border-4 shadow-painted ${tones} ${className}`}
    >
      {children}
    </div>
  )
}

/** An arrow that points at a real destination and leans toward it on hover. */
export function PaintedArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 16"
      aria-hidden="true"
      className={`h-4 w-8 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 ${className}`}
    >
      <path
        d="M1 8h26M21 2l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function CallButton({ size = 'normal' }: { size?: 'normal' | 'loud' }) {
  const { t } = useTranslation()
  const loud = size === 'loud'
  return (
    <a
      href={business.phone.href}
      className={`group inline-flex items-center gap-3 rounded-painted border-4 border-ink bg-painted-red text-enamel shadow-painted transition-transform duration-150 ease-out hover:-translate-y-0.5 ${
        loud ? 'px-6 py-4 text-3xl sm:text-4xl' : 'px-4 py-3 text-lg'
      }`}
    >
      <span className="font-display">{t('actions.call')}</span>
      <span className="numerals font-display">{business.phone.display}</span>
    </a>
  )
}

export function DirectionsLink({ className = '' }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <a
      href={business.links.directions}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-2 font-display text-sign-yellow underline decoration-sign-yellow ${className}`}
    >
      {t('actions.directions')}
      <PaintedArrow />
    </a>
  )
}

/**
 * The open/closed enamel badge.
 *
 * It reads the shop's clock, not the visitor's, and only after hydration: the
 * prerendered HTML has no idea what time it is where the visitor stands, and
 * painting a guess would either lie or break hydration.
 */
export function OpenBadge({ language }: { language: Language }) {
  const { t } = useTranslation()
  const minute = useSyncExternalStore(subscribeToMinute, currentMinute, noMinuteOnServer)

  if (minute === null) return null

  const now = new Date(minute * 60_000)
  const open = isOpenAt(now)
  const today = todayRange(now)

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span
        className={`rounded-painted border-2 border-ink px-2 py-1 font-display text-sm ${
          open ? 'bg-sign-yellow text-ink' : 'bg-enamel text-ink'
        }`}
      >
        {open ? t('hours.openNow') : t('hours.closedNow')}
      </span>
      <span className="numerals text-sm">
        {today
          ? t('hero.hoursToday', { hours: formatRange(today, language) })
          : `${t('hours.sunday')}: ${t('hours.closed')}`}
      </span>
    </p>
  )
}

/**
 * The address, painted as one plate.
 *
 * "Suite C" sits on its own line at the same weight as the street, because the
 * building has units A, B and C and the Google Business Profile says Suite C.
 * Anything else costs the shop its local ranking.
 */
export function AddressPlate({ tone = 'deep' }: { tone?: 'enamel' | 'deep' }) {
  const { t } = useTranslation()
  return (
    <PaintedPanel tone={tone} className="p-5">
      <p className="font-display text-xs tracking-widest">{t('contact.addressLabel')}</p>
      <address className="mt-2 not-italic">
        <span className="block font-display text-2xl sm:text-3xl">{business.address.street}</span>
        <span className="block font-display text-2xl text-sign-yellow sm:text-3xl">
          {business.address.unit}
        </span>
        <span className="numerals mt-1 block text-lg">{cityLine()}</span>
      </address>
      <DirectionsLink className="mt-3" />
    </PaintedPanel>
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

/** The one brush-script line on the site. */
export function SpanishLine({ className = '' }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <p className={`font-script text-sign-yellow ${className}`}>{t('contact.spanishSpoken')}</p>
  )
}
