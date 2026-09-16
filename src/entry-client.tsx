import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router'

import App from './App'
import { createI18n } from './i18n'
import './index.css'
import { languageOf } from './routes'

const base = import.meta.env.BASE_URL

/** The URL owns the language, so read it from the path the router will see. */
const appPath = window.location.pathname.startsWith(base)
  ? `/${window.location.pathname.slice(base.length)}`
  : window.location.pathname

const i18n = createI18n(languageOf(appPath))

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={base}>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </StrictMode>,
)
