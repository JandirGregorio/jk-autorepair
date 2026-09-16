import { useTranslation } from 'react-i18next'

import { AddressPlate, CallButton, PaintedArrow } from '../components/sign'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'
import { pathFor } from '../routes'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  const other = language === 'es' ? 'en' : 'es'

  // GitHub Pages serves one 404.html for every missing path, and it is in
  // Spanish. When that path was an English one, correct the title after load.
  useDocumentHead(t('notFound.title'), language)

  return (
    <div className="mx-auto max-w-3xl px-4 pt-12 sm:px-6">
      <h1 className="text-4xl sm:text-6xl">
        <span className="block text-sign-yellow [text-shadow:6px_6px_0_var(--color-brush)]">
          {t('notFound.title')}
        </span>
      </h1>
      <p className="mt-4 text-lg">{t('notFound.body')}</p>

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <CallButton size="loud" />
        {/* A real link, not a router link: 404.html can be served at any path. */}
        <a
          href={pathFor('home', language)}
          className="group inline-flex items-center gap-2 font-display text-sign-yellow"
        >
          {t('notFound.home')}
          <PaintedArrow />
        </a>
      </div>

      <a
        href={pathFor('home', other)}
        lang={other}
        hrefLang={other}
        className="mt-4 inline-block font-display text-sm text-sign-yellow"
      >
        {t('notFound.english')}
      </a>

      <div className="mt-10">
        <AddressPlate tone="deep" />
      </div>
    </div>
  )
}
