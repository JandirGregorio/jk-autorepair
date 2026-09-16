/**
 * i18next setup.
 *
 * The language comes from the URL, never from the browser, so each language has
 * its own crawlable page. Prerendering renders every route in one process, so
 * each render gets its own instance instead of mutating a shared one.
 */

import { createInstance, type i18n as I18n } from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import es from './locales/es.json'
import { defaultLanguage, type Language } from './routes'

const resources = {
  es: { translation: es },
  en: { translation: en },
}

export function createI18n(language: Language = defaultLanguage): I18n {
  const instance = createInstance()
  instance.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: defaultLanguage,
    interpolation: { escapeValue: false },
  })
  return instance
}
