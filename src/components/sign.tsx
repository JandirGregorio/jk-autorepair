/**
 * Service-record primitives.
 *
 * The page is the shop's work order: oat paper, graphite ink, hairline rules,
 * and one oxblood accent spent only on the phone. Panels are off-white leaves
 * laid on the paper, lifted by one soft shadow rather than a hard offset.
 */

import { useSyncExternalStore, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { business, cityLine, isOpenAt } from '../content/business'
import { formatRange, todayRange } from '../content/hours'
import type { Language } from '../routes'

type LeafProps = {
  children: ReactNode
  className?: string
}

/** An off-white leaf laid on the paper. */
export function RecordLeaf({ children, className = '' }: LeafProps) {
  return (
    <div className={`rounded-leaf border border-rule bg-leaf shadow-leaf ${className}`}>
      {children}
    </div>
  )
}

/** A small ruled label, the way a form names its fields. */
export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-form text-[0.7rem] uppercase tracking-[0.18em] text-slate">
      {children}
    </span>
  )
}

/** A thin arrow that leans toward its destination on hover. */
export function ArrowGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 12"
      aria-hidden="true"
      className={`h-3 w-7 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 ${className}`}
    >
      <path
        d="M0 6h24M19 1.5 24 6l-5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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
      className={`inline-flex items-center gap-3 rounded-leaf bg-oxblood text-paper no-underline transition-colors duration-150 hover:bg-oxblood-deep ${
        loud ? 'px-6 py-4' : 'px-4 py-2.5'
      }`}
    >
      <span className={`font-display font-semibold ${loud ? 'text-lg' : 'text-sm'}`}>
        {t('actions.call')}
      </span>
      {/* The number never wraps: it is the point of the button. */}
      <span
        className={`whitespace-nowrap font-form tabular-nums ${loud ? 'text-2xl sm:text-3xl' : 'text-base'}`}
      >
        {business.phone.display}
      </span>
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
      className={`group inline-flex items-center gap-2 font-display text-sm font-semibold text-oxblood ${className}`}
    >
      {t('actions.directions')}
      <ArrowGlyph />
    </a>
  )
}

/**
 * The open/closed stamp.
 *
 * It reads the shop's clock, not the visitor's, and only after hydration: the
 * prerendered HTML cannot know what time it is, and painting a guess would
 * either lie or break hydration.
 */
export function OpenStamp({ language }: { language: Language }) {
  const { t } = useTranslation()
  const minute = useSyncExternalStore(subscribeToMinute, currentMinute, noMinuteOnServer)

  if (minute === null) return null

  const now = new Date(minute * 60_000)
  const open = isOpenAt(now)
  const today = todayRange(now)

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span
        className={`rounded-leaf border px-2 py-1 font-form text-[0.7rem] uppercase tracking-[0.14em] ${
          open ? 'border-oxblood text-oxblood' : 'border-rule-strong text-slate'
        }`}
      >
        {open ? t('hours.openNow') : t('hours.closedNow')}
      </span>
      <span className="font-form text-sm tabular-nums text-slate">
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
 * The address, ruled like a filled-in form field.
 *
 * "Suite C" sits on its own ruled line at the same weight as the street: the
 * building has units A, B and C, and the Google Business Profile is registered
 * with Suite C. Anything else costs the shop its local ranking.
 */
export function AddressBlock({ className = '' }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <RecordLeaf className={`p-5 ${className}`}>
      <FieldLabel>{t('contact.addressLabel')}</FieldLabel>
      <address className="mt-3 not-italic">
        <span className="block border-b border-rule pb-1 font-display text-xl font-semibold">
          {business.address.street}
        </span>
        <span className="block border-b border-rule py-1 font-display text-xl font-semibold">
          {business.address.unit}
        </span>
        <span className="block pt-1 font-form text-base tabular-nums text-slate">{cityLine()}</span>
      </address>
      <DirectionsLink className="mt-3" />
    </RecordLeaf>
  )
}

/** Stated plainly, in the form's own voice. */
export function SpanishNote({ className = '' }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <span
      className={`inline-block rounded-leaf border border-rule-strong px-2 py-1 font-form text-[0.7rem] uppercase tracking-[0.14em] text-graphite ${className}`}
    >
      {t('contact.spanishSpoken')}
    </span>
  )
}
