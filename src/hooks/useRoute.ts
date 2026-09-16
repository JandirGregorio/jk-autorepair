import { useEffect } from 'react'
import { useLocation } from 'react-router'

import { languageOf, pageOf, type Language, type Page } from '../routes'

/**
 * Which page and language the current URL is. The router strips the base path,
 * so these paths match the ones in routes.ts.
 */
export function useRouteInfo(): { page: Page | undefined; language: Language; path: string } {
  const { pathname } = useLocation()
  return { page: pageOf(pathname), language: languageOf(pathname), path: pathname }
}

/**
 * Keeps the title and the html lang honest during client-side navigation.
 * The prerendered HTML already carries both; this covers moving between pages
 * without a reload.
 */
export function useDocumentHead(title: string, language: Language) {
  useEffect(() => {
    document.title = title
    document.documentElement.lang = language
  }, [title, language])
}
