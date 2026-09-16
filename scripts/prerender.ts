/**
 * Turns the SPA build into real HTML files, one per route.
 *
 * The pages exist to be crawled, so every route ships its content in the
 * markup: Google, and a visitor on a bad connection, both get the text without
 * running JavaScript. The client bundle then hydrates the same markup.
 *
 * Run after both Vite builds:
 *   vite build                                  -> dist/ (client + template)
 *   vite build --ssr src/entry-server.tsx       -> dist-ssr/entry-server.js
 *   tsx scripts/prerender.ts                    -> dist/**\/index.html
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { allRoutes, defaultLanguage, languages, pathFor, type Language } from '../src/routes'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const dist = join(root, 'dist')

/** Origin plus base path, no trailing slash. Both change with the domain. */
const siteUrl = (
  process.env.VITE_SITE_URL ?? 'https://jandirgregorio.github.io/jk-autorepair'
).replace(/\/$/, '')

type RenderResult = { html: string; head: string }
type ServerEntry = {
  render: (path: string, language: Language) => RenderResult
  renderNotFound: (language: Language) => RenderResult
}

async function main() {
  const template = await readFile(join(dist, 'index.html'), 'utf8')
  const entryPath = join(root, 'dist-ssr', 'entry-server.js')
  const { render, renderNotFound }: ServerEntry = await import(pathToFileURL(entryPath).href)

  for (const route of allRoutes) {
    const { html, head } = render(route.path, route.language)
    await writePage(route.path, fill(template, { html, head, language: route.language }))
  }

  // GitHub Pages serves 404.html for anything it can't find. Spanish, since
  // that is the default language, and it links to both home pages.
  const notFound = renderNotFound(defaultLanguage)
  await writeFile(
    join(dist, '404.html'),
    fill(template, { html: notFound.html, head: notFound.head, language: defaultLanguage }),
    'utf8',
  )

  await writeFile(join(dist, 'sitemap.xml'), sitemap(), 'utf8')
  await writeFile(join(dist, 'robots.txt'), robots(), 'utf8')

  console.log(`prerendered ${allRoutes.length} pages, 404.html, sitemap.xml, robots.txt`)
}

function fill(
  template: string,
  { html, head, language }: { html: string; head: string; language: Language },
): string {
  return template
    .replace('<html lang="en"', `<html lang="${language}"`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html)
}

async function writePage(path: string, contents: string) {
  const file = join(dist, path.replace(/^\//, ''), 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, contents, 'utf8')
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`
}

function sitemap(): string {
  const entries = allRoutes
    .map((route) => {
      const alternates = languages
        .map(
          (language) =>
            `    <xhtml:link rel="alternate" hreflang="${language}" href="${absoluteUrl(
              pathFor(route.page, language),
            )}" />`,
        )
        .concat(
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(
            pathFor(route.page, defaultLanguage),
          )}" />`,
        )
        .join('\n')

      return `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>\n${alternates}\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`
}

function robots(): string {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
