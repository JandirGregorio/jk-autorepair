import { useTranslation } from 'react-i18next'

import { CallButton } from '../components/sign'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'
import { hrefFor } from '../hrefs'
import { pathFor } from '../routes'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  const other = language === 'es' ? 'en' : 'es'

  // GitHub Pages serves one 404.html for every missing path, and it is in
  // Spanish. When that path was an English one, correct the title after load.
  useDocumentHead(t('notFound.title'), language)

  return (
    <section className="flex min-h-svh flex-col items-center justify-center bg-ink px-6 py-32 text-center text-canvas">
      <h1 className="text-4xl font-light sm:text-5xl">{t('notFound.title')}</h1>
      <p className="mx-auto mt-6 max-w-lg text-lg text-fog">{t('notFound.body')}</p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <CallButton tone="dark" />
        {/* A real link, not a router link: 404.html can be served at any path. */}
        <a
          href={hrefFor(pathFor('home', language))}
          className="inline-flex items-center justify-center rounded-pill border border-line-dark px-8 py-3.5 text-sm font-medium no-underline transition-colors duration-200 hover:border-canvas"
        >
          {t('notFound.home')}
        </a>
      </div>

      <a
        href={hrefFor(pathFor('home', other))}
        lang={other}
        hrefLang={other}
        className="mt-8 text-sm text-fog"
      >
        {t('notFound.english')}
      </a>
    </section>
  )
}
