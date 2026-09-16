import { describe, expect, it } from 'vitest'

import {
  allRoutes,
  alternatePath,
  languageOf,
  languages,
  pageOf,
  pages,
  pathFor,
} from './routes'

describe('routes', () => {
  it('gives every page a URL in both languages', () => {
    for (const page of pages) {
      for (const language of languages) {
        expect(pathFor(page, language)).toMatch(/^\//)
      }
    }
    expect(allRoutes).toHaveLength(pages.length * languages.length)
  })

  it('ends every path with a slash, which is how GitHub Pages serves directories', () => {
    for (const route of allRoutes) {
      expect(route.path.endsWith('/')).toBe(true)
    }
  })

  it('puts Spanish at the root and English under /en/', () => {
    expect(pathFor('home', 'es')).toBe('/')
    expect(pathFor('home', 'en')).toBe('/en/')
    expect(languageOf('/servicios/')).toBe('es')
    expect(languageOf('/en/services/')).toBe('en')
  })

  it('pairs each page with the same page in the other language', () => {
    expect(alternatePath('/')).toBe('/en/')
    expect(alternatePath('/en/')).toBe('/')
    expect(alternatePath('/servicios/')).toBe('/en/services/')
    expect(alternatePath('/en/services/')).toBe('/servicios/')
  })

  it('tolerates a missing trailing slash, a query, or a hash', () => {
    expect(pageOf('/servicios')).toBe('services')
    expect(pageOf('/en/services?utm_source=google')).toBe('services')
    expect(alternatePath('/servicios#horario')).toBe('/en/services/')
  })

  it('falls back to the home page in the other language for an unknown path', () => {
    expect(pageOf('/nope/')).toBeUndefined()
    expect(alternatePath('/nope/')).toBe('/en/')
    expect(alternatePath('/en/nope/')).toBe('/')
  })
})
