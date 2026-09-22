import { useTranslation } from 'react-i18next'

import { AddressBlock, ArrowGlyph, CallButton } from '../components/sign'
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
    <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
        {t('notFound.title')}
      </h1>
      <p className="mt-4 text-lg leading-relaxed">{t('notFound.body')}</p>

      <div className="mt-7 flex flex-wrap items-center gap-6">
        <CallButton size="loud" />
        {/* A real link, not a router link: 404.html can be served at any path. */}
        <a
          href={hrefFor(pathFor('home', language))}
          className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-oxblood no-underline"
        >
          {t('notFound.home')}
          <ArrowGlyph />
        </a>
      </div>

      <a
        href={hrefFor(pathFor('home', other))}
        lang={other}
        hrefLang={other}
        className="mt-4 inline-block font-form text-xs uppercase tracking-[0.14em] text-slate"
      >
        {t('notFound.english')}
      </a>

      <div className="mt-12">
        <AddressBlock />
      </div>
    </div>
  )
}
