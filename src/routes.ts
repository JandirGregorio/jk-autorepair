/**
 * One table owns every URL on the site.
 *
 * Spanish is the default language and lives at the root. English sits under
 * /en/. Each page exists at both URLs so Google can index and pair them with
 * hreflang; nothing redirects by browser language, which would hide one
 * language from the crawler.
 *
 * Paths keep their trailing slash because GitHub Pages serves a directory's
 * index.html and redirects the slashless form to it.
 */

export const languages = ['es', 'en'] as const
export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'es'

export const pages = ['home', 'services', 'legal'] as const
export type Page = (typeof pages)[number]

const paths: Record<Page, Record<Language, string>> = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  legal: { es: '/avisos-legales/', en: '/en/legal/' },
}

export function pathFor(page: Page, language: Language): string {
  return paths[page][language]
}

export function languageOf(path: string): Language {
  return normalize(path).startsWith('/en/') ? 'en' : 'es'
}

export function pageOf(path: string): Page | undefined {
  const target = normalize(path)
  return pages.find((page) => languages.some((language) => paths[page][language] === target))
}

/** The same page in the other language, for the language toggle. */
export function alternatePath(path: string): string {
  const page = pageOf(path)
  const other: Language = languageOf(path) === 'es' ? 'en' : 'es'
  return page ? pathFor(page, other) : pathFor('home', other)
}

/** Every route the prerender script writes, and the sitemap lists. */
export const allRoutes: { page: Page; language: Language; path: string }[] = pages.flatMap((page) =>
  languages.map((language) => ({ page, language, path: pathFor(page, language) })),
)

function normalize(path: string): string {
  const withoutQuery = path.split(/[?#]/)[0]
  if (withoutQuery === '' || withoutQuery === '/') return '/'
  return withoutQuery.endsWith('/') ? withoutQuery : `${withoutQuery}/`
}
