import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router'

import { business, cityLine, streetLine } from '../content/business'
import { formatRange, saturdayRange, weekdayRange } from '../content/hours'
import { useRouteInfo } from '../hooks/useRoute'
import { alternatePath, pathFor } from '../routes'
import { CallButton, SpanishLine } from './sign'

export function Layout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-svh bg-sign-blue pb-20 sm:pb-0">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-painted focus:border-2 focus:border-ink focus:bg-sign-yellow focus:px-3 focus:py-2 focus:font-display focus:text-ink"
      >
        {t('nav.skipToContent')}
      </a>

      <Header />
      <main id="content">
        <Outlet />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  )
}

function Header() {
  const { t } = useTranslation()
  const { language, path } = useRouteInfo()
  const other = language === 'es' ? 'en' : 'es'

  return (
    <header className="border-b-8 border-brush">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <Link to={pathFor('home', language)} className="font-display text-xl no-underline sm:text-2xl">
          <span className="text-enamel [text-shadow:3px_3px_0_var(--color-brush)]">JK</span>{' '}
          <span className="text-sign-yellow [text-shadow:3px_3px_0_var(--color-brush)]">
            Auto Repair
          </span>
        </Link>

        <nav className="flex items-center gap-4 font-display text-sm">
          <Link to={pathFor('home', language)} className="no-underline hover:underline">
            {t('nav.home')}
          </Link>
          <Link to={pathFor('services', language)} className="no-underline hover:underline">
            {t('nav.services')}
          </Link>
        </nav>

        <div className="ms-auto flex items-center gap-4">
          <a
            href={alternatePath(path)}
            lang={other}
            hrefLang={other}
            className="rounded-painted border-2 border-sign-yellow px-3 py-1 font-display text-sm text-sign-yellow no-underline"
          >
            {other === 'en' ? t('actions.switchToEnglish') : t('actions.switchToSpanish')}
          </a>
          <div className="hidden sm:block">
            <CallButton />
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()

  return (
    <footer className="mt-16 border-t-8 border-brush bg-sign-blue-deep">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-lg">{business.name}</p>
          <p className="mt-1 text-sm">{t('footer.tagline')}</p>
          <SpanishLine className="mt-2 text-2xl" />
        </div>

        <div className="numerals text-sm">
          <p className="font-display text-xs tracking-widest">{t('contact.addressLabel')}</p>
          <p className="mt-2">{streetLine()}</p>
          <p>{cityLine()}</p>
          <a href={business.phone.href} className="mt-2 inline-block font-display text-lg">
            {business.phone.display}
          </a>
        </div>

        <div className="numerals text-sm">
          <p className="font-display text-xs tracking-widest">{t('hours.title')}</p>
          <p className="mt-2">
            {t('hours.weekdays')}: {formatRange(weekdayRange(), language)}
          </p>
          <p>
            {t('hours.saturday')}: {formatRange(saturdayRange(), language)}
          </p>
          <p>
            {t('hours.sunday')}: {t('hours.closed')}
          </p>
        </div>
      </div>

      {/* The hand-ruled title panel that closes the sign. */}
      <div className="border-t-4 border-brush py-4 text-center font-display text-xs tracking-[0.3em] text-sign-yellow">
        {business.name.toUpperCase()}
      </div>
    </footer>
  )
}

function MobileCallBar() {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-ink bg-painted-red sm:hidden">
      <a
        href={business.phone.href}
        className="flex items-center justify-center gap-3 px-4 py-4 font-display text-lg text-enamel no-underline"
      >
        {t('actions.call')}
        <span className="numerals">{business.phone.display}</span>
      </a>
    </div>
  )
}
