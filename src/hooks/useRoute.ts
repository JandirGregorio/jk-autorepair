import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

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

/**
 * A new page starts at the top.
 *
 * Client-side navigation keeps the scroll position, so following a link from
 * halfway down the home page dropped the visitor into the middle of the next
 * one. Only PUSH and REPLACE scroll: on POP the browser is restoring a real
 * position the visitor left, and the first render is a POP too, so a deep link
 * or a reload stays where it landed.
 */
export function useScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, navigationType])
}
