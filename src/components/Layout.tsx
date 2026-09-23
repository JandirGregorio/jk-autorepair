import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router'

import { business, cityLine, streetLine } from '../content/business'
import { formatRange, saturdayRange, weekdayRange } from '../content/hours'
import { useRouteInfo } from '../hooks/useRoute'
import { hrefFor } from '../hrefs'
import { alternatePath, pathFor } from '../routes'
import { Kicker } from './sign'

export function Layout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-svh bg-canvas pb-14 text-ink sm:pb-0">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
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

/** Sits over the dark hero, so it carries its own light type. */
function Header() {
  const { t } = useTranslation()
  const { language, path } = useRouteInfo()
  const other = language === 'es' ? 'en' : 'es'

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center gap-x-4 px-5 py-5 sm:gap-x-8 sm:px-6 sm:py-6">
        <Link
          to={pathFor('home', language)}
          className="whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.12em] text-canvas no-underline sm:text-sm sm:tracking-[0.22em]"
        >
          {business.name}
        </Link>

        <nav className="ms-auto flex items-center gap-4 text-xs text-canvas/80 sm:gap-8 sm:text-sm">
          <Link to={pathFor('home', language)} className="no-underline hover:text-canvas">
            {t('nav.home')}
          </Link>
          <Link to={pathFor('services', language)} className="no-underline hover:text-canvas">
            {t('nav.services')}
          </Link>
          <a
            href={hrefFor(alternatePath(path))}
            lang={other}
            hrefLang={other}
            className="no-underline hover:text-canvas"
          >
            {other === 'en' ? t('actions.switchToEnglish') : t('actions.switchToSpanish')}
          </a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()

  return (
    <footer className="bg-ink text-canvas">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em]">{business.name}</p>
          <p className="mt-3 text-sm text-fog">{t('footer.tagline')}</p>
          <p className="mt-2 text-sm text-fog">{t('contact.spanishSpoken')}</p>
        </div>

        <div>
          <Kicker tone="dark">{t('contact.addressLabel')}</Kicker>
          <p className="mt-3 text-sm tabular-nums text-fog">{streetLine()}</p>
          <p className="text-sm tabular-nums text-fog">{cityLine()}</p>
          <a href={business.phone.href} className="mt-3 inline-block text-base tabular-nums">
            {business.phone.display}
          </a>
        </div>

        <div>
          <Kicker tone="dark">{t('hours.title')}</Kicker>
          <dl className="mt-3 space-y-1 text-sm tabular-nums text-fog">
            <div className="flex justify-between gap-4">
              <dt>{t('hours.weekdays')}</dt>
              <dd>{formatRange(weekdayRange(), language)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{t('hours.saturday')}</dt>
              <dd>{formatRange(saturdayRange(), language)}</dd>
            </div>
            <div className="flex justify-between gap-4">
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink sm:hidden">
      <a
        href={business.phone.href}
        className="flex items-center justify-center gap-2 px-4 py-3.5 text-sm text-canvas no-underline"
      >
        {t('actions.call')}
        <span className="tabular-nums">{business.phone.display}</span>
      </a>
    </div>
  )
}
