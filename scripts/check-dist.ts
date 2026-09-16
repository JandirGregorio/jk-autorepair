/**
 * Checks the built site, not the source.
 *
 * Unit tests pass while the shipped HTML is empty, so this reads dist/ the way
 * a crawler would: is the content in the markup, is the language right, does
 * each page point at its other-language twin, and does the address in the
 * structured data still match the Google Business Profile?
 *
 * Run after the build: tsx scripts/check-dist.ts
 */

import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { business, streetLine } from '../src/content/business'
import { allRoutes, defaultLanguage, languages, pathFor } from '../src/routes'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const siteUrl = (
  process.env.VITE_SITE_URL ?? 'https://jandirgregorio.github.io/jk-autorepair'
).replace(/\/$/, '')

const failures: string[] = []

function check(condition: boolean, message: string) {
  if (!condition) failures.push(message)
}

async function read(relative: string): Promise<string | undefined> {
  try {
    return await readFile(join(dist, relative), 'utf8')
  } catch {
    failures.push(`missing file: ${relative}`)
    return undefined
  }
}

async function main() {
  for (const route of allRoutes) {
    const file = join(route.path.replace(/^\//, ''), 'index.html')
    const html = await read(file)
    if (!html) continue

    const where = `${file} (${route.language})`

    check(html.includes(`<html lang="${route.language}"`), `${where}: wrong or missing html lang`)
    check(/<h1[\s>]/.test(html), `${where}: no h1 in the prerendered markup`)
    check(
      html.includes(`<link rel="canonical" href="${siteUrl}${route.path}"`),
      `${where}: canonical missing or not absolute`,
    )

    for (const language of languages) {
      const alternate = `${siteUrl}${pathFor(route.page, language)}`
      check(
        html.includes(`hreflang="${language}" href="${alternate}"`),
        `${where}: missing hreflang ${language}`,
      )
    }
    check(
      html.includes(`hreflang="x-default" href="${siteUrl}${pathFor(route.page, defaultLanguage)}"`),
      `${where}: missing hreflang x-default`,
    )

    check(html.includes('application/ld+json'), `${where}: no JSON-LD`)
    check(html.includes(streetLine()), `${where}: address does not match business.ts`)
    check(html.includes(business.phone.e164), `${where}: phone does not match business.ts`)
    check(html.includes(business.phone.href), `${where}: no click-to-call link`)

    for (const word of business.notOffered) {
      check(!html.toLowerCase().includes(word.toLowerCase()), `${where}: mentions "${word}"`)
    }

    // The page must say something without JavaScript, not just ship a shell.
    const bodyText = html
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    check(bodyText.length > 400, `${where}: prerendered text looks empty (${bodyText.length} chars)`)
  }

  const notFound = await read('404.html')
  if (notFound) {
    check(/<html lang="es"/.test(notFound), '404.html: should be Spanish')
    check(notFound.includes(business.phone.href), '404.html: no click-to-call link')
  }

  const sitemap = await read('sitemap.xml')
  if (sitemap) {
    for (const route of allRoutes) {
      check(sitemap.includes(`${siteUrl}${route.path}`), `sitemap.xml: missing ${route.path}`)
    }
    check(sitemap.includes('hreflang="x-default"'), 'sitemap.xml: missing x-default alternates')
  }

  const robots = await read('robots.txt')
  if (robots) {
    check(robots.includes(`${siteUrl}/sitemap.xml`), 'robots.txt: sitemap URL missing')
    check(!/Disallow:\s*\/\s*$/m.test(robots), 'robots.txt: blocks the whole site')
  }

  if (failures.length > 0) {
    console.error(`check-dist failed with ${failures.length} problem(s):`)
    for (const failure of failures) console.error(`  - ${failure}`)
    process.exit(1)
  }

  console.log(`check-dist passed: ${allRoutes.length} pages, 404, sitemap, robots`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
