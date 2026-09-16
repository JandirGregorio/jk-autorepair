/**
 * Builds the <head> contents for one route, as a string, at build time.
 *
 * Strings rather than a helmet library: the prerender script needs the markup
 * before React hydrates, and every page's head is fully known from its route.
 */

import { defaultLanguage, languages, pathFor, type Language, type Page } from '../routes'

export type HeadInput = {
  page: Page
  language: Language
  path: string
  /** Origin plus base path, no trailing slash. */
  siteUrl: string
  title: string
  description: string
  /** JSON-LD object for this page. */
  schema: unknown
}

export function buildHead({
  page,
  language,
  path,
  siteUrl,
  title,
  description,
  schema,
}: HeadInput): string {
  const canonical = `${siteUrl}${path}`

  const alternates = languages
    .map(
      (lang) =>
        `<link rel="alternate" hreflang="${lang}" href="${siteUrl}${pathFor(page, lang)}" />`,
    )
    .concat(
      `<link rel="alternate" hreflang="x-default" href="${siteUrl}${pathFor(
        page,
        defaultLanguage,
      )}" />`,
    )
    .join('\n    ')

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeAttribute(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    alternates,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeAttribute(title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:locale" content="${language === 'es' ? 'es_US' : 'en_US'}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<script type="application/ld+json">${serializeSchema(schema)}</script>`,
  ].join('\n    ')
}

/** Head for the 404 page: no canonical, and kept out of the index. */
export function buildNotFoundHead(title: string): string {
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="robots" content="noindex, follow" />`,
  ].join('\n    ')
}

function serializeSchema(schema: unknown): string {
  // A literal </script> inside JSON would end the tag early.
  return JSON.stringify(schema).replace(/</g, '\\u003c')
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/"/g, '&quot;')
}
