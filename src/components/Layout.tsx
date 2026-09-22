import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router'

import { business, cityLine, streetLine } from '../content/business'
import { formatRange, saturdayRange, weekdayRange } from '../content/hours'
import { useRouteInfo } from '../hooks/useRoute'
import { hrefFor } from '../hrefs'
import { alternatePath, pathFor } from '../routes'
import { CallButton, FieldLabel } from './sign'

export function Layout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-svh bg-paper pb-16 text-graphite sm:pb-0">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-leaf focus:bg-graphite focus:px-3 focus:py-2 focus:font-display focus:text-paper"
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
    <header className="border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <Link
          to={pathFor('home', language)}
          className="font-display text-lg font-bold tracking-tight no-underline sm:text-xl"
        >
          {business.name}
        </Link>

        <nav className="flex items-center gap-5 font-form text-xs uppercase tracking-[0.14em]">
          <Link to={pathFor('home', language)} className="no-underline hover:underline">
            {t('nav.home')}
          </Link>
          <Link to={pathFor('services', language)} className="no-underline hover:underline">
            {t('nav.services')}
          </Link>
        </nav>

        <div className="ms-auto flex items-center gap-4">
          <a
            href={hrefFor(alternatePath(path))}
            lang={other}
            hrefLang={other}
            className="font-form text-xs uppercase tracking-[0.14em] text-slate no-underline hover:text-graphite"
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
    <footer className="mt-20 border-t border-rule bg-leaf">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-base font-bold">{business.name}</p>
          <p className="mt-1 text-sm text-slate">{t('footer.tagline')}</p>
          <p className="mt-3 font-form text-sm text-graphite">{t('contact.spanishSpoken')}</p>
        </div>

        <div>
          <FieldLabel>{t('contact.addressLabel')}</FieldLabel>
          <p className="mt-2 font-form text-sm tabular-nums">{streetLine()}</p>
          <p className="font-form text-sm tabular-nums">{cityLine()}</p>
          <a
            href={business.phone.href}
            className="mt-3 inline-block font-form text-base tabular-nums text-oxblood"
          >
            {business.phone.display}
          </a>
        </div>

        <div>
          <FieldLabel>{t('hours.title')}</FieldLabel>
          <dl className="mt-2 font-form text-sm tabular-nums">
            <div className="flex justify-between border-b border-rule py-1">
              <dt>{t('hours.weekdays')}</dt>
              <dd>{formatRange(weekdayRange(), language)}</dd>
            </div>
            <div className="flex justify-between border-b border-rule py-1">
              <dt>{t('hours.saturday')}</dt>
              <dd>{formatRange(saturdayRange(), language)}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt>{t('hours.sunday')}</dt>
              <dd>{t('hours.closed')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </footer>
  )
}

function MobileCallBar() {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-oxblood sm:hidden">
      <a
        href={business.phone.href}
        className="flex items-center justify-center gap-3 px-4 py-3.5 text-paper no-underline"
      >
        <span className="font-display text-sm font-semibold">{t('actions.call')}</span>
        <span className="font-form text-lg tabular-nums">{business.phone.display}</span>
      </a>
    </div>
  )
}
