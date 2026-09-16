import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'
import { StaticRouter } from 'react-router'

import App from './App'
import { business } from './content/business'
import { createI18n } from './i18n'
import { defaultLanguage, pageOf, type Language } from './routes'
import { buildHead, buildNotFoundHead } from './seo/head'
import { autoRepairSchema } from './seo/schema'

const base = import.meta.env.BASE_URL
const siteUrl = (
  import.meta.env.VITE_SITE_URL ?? 'https://jandirgregorio.github.io/jk-autorepair'
).replace(/\/$/, '')

export type RenderResult = { html: string; head: string }

/** The router sees the same URL it will see in the browser, base included. */
function withBase(path: string): string {
  return `${base.replace(/\/$/, '')}${path}`
}

function renderApp(path: string, language: Language): string {
  const i18n = createI18n(language)
  return renderToString(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <StaticRouter basename={base} location={withBase(path)}>
          <App />
        </StaticRouter>
      </I18nextProvider>
    </StrictMode>,
  )
}

export function render(path: string, language: Language): RenderResult {
  const page = pageOf(path) ?? 'home'
  const i18n = createI18n(language)
  const t = i18n.t.bind(i18n)

  const schema = autoRepairSchema({
    pageUrl: `${siteUrl}${path}`,
    language,
    serviceNames: business.services.map((group) => t(`services.${group.id}.label`)),
  })

  return {
    html: renderApp(path, language),
    head: buildHead({
      page,
      language,
      path,
      siteUrl,
      title: t(`seo.${page}.title`),
      description: t(`seo.${page}.description`),
      schema,
    }),
  }
}

export function renderNotFound(language: Language = defaultLanguage): RenderResult {
  const i18n = createI18n(language)
  return {
    html: renderApp('/this-page-does-not-exist/', language),
    head: buildNotFoundHead(i18n.t('notFound.title')),
  }
}
