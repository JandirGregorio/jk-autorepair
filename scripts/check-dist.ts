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

import { readdir, readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { business, streetLine } from '../src/content/business'
import { allRoutes, defaultLanguage, languages, pathFor } from '../src/routes'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const siteUrl = (
  process.env.VITE_SITE_URL ?? 'https://jandirgregorio.github.io/jk-autorepair'
).replace(/\/$/, '')

const base = process.env.VITE_BASE ?? '/jk-autorepair/'

const failures: string[] = []

/** Root-relative hrefs, which are the ones that need the base path. */
function internalHrefs(html: string): string[] {
  return [...html.matchAll(/href="(\/[^"]*)"/g)].map((match) => match[1])
}

function check(condition: boolean, message: string) {
  if (!condition) failures.push(message)
}

/**
 * Names that only turn up when somebody has added a tracker.
 *
 * The privacy notice on /avisos-legales/ promises no analytics, no advertising
 * tracker and no cookies. That promise is only worth something if the build
 * refuses to ship one, so this list is the enforcement.
 */
const trackerSignatures = [
  'googletagmanager',
  'google-analytics',
  'gtag(',
  'fbq(',
  'connect.facebook',
  'doubleclick',
  'hotjar',
  'clarity.ms',
  'segment.com/analytics',
  'document.cookie',
]

/** Everything the site is allowed to reach out to, and why. */
const allowedExternalHosts = [
  // Review, directions and map links the visitor chooses to follow.
  'https://www.google.com',
  'https://g.page',
  // Vocabulary URLs inside JSON-LD. Nothing fetches these.
  'https://schema.org',
  'http://schema.org',
  'http://www.w3.org',
]

/** Tags that would pull a third party in on page load, without being asked. */
function autoLoadedThirdParty(html: string): string[] {
  const found: string[] = []
  const patterns: [RegExp, string][] = [
    [/<iframe\b/i, '<iframe> in the prerendered markup'],
    [/<script[^>]+src="https?:\/\//i, 'external <script src>'],
    [/<link[^>]+href="https?:\/\/[^"]*"[^>]*rel="stylesheet"/i, 'external stylesheet'],
    [/<link[^>]+rel="stylesheet"[^>]*href="https?:\/\//i, 'external stylesheet'],
    [/<img[^>]+src="https?:\/\//i, 'external <img src>'],
  ]
  for (const [pattern, label] of patterns) if (pattern.test(html)) found.push(label)
  return found
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

    // Every internal link must carry the deployment base path. A plain <a>
    // does not get it from the router, and a link without it leaves the site.
    for (const href of internalHrefs(html)) {
      check(href.startsWith(base), `${where}: internal link "${href}" is missing the base path`)
    }

    // Nothing may reach a third party just because the page opened. The map
    // is the one embed on the site and it waits for a click.
    for (const offender of autoLoadedThirdParty(html)) {
      check(false, `${where}: ${offender} contacts a third party before the visitor asks`)
    }

    for (const signature of trackerSignatures) {
      check(!html.includes(signature), `${where}: contains tracker signature "${signature}"`)
    }

    // Any absolute URL in the markup must be one the site is allowed to name.
    for (const url of [...html.matchAll(/https?:\/\/[^"'\s<>)]+/g)].map((match) => match[0])) {
      const allowed =
        url.startsWith(siteUrl) || allowedExternalHosts.some((host) => url.startsWith(host))
      check(allowed, `${where}: unexpected external URL ${url}`)
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
    for (const href of internalHrefs(notFound)) {
      check(href.startsWith(base), `404.html: internal link "${href}" is missing the base path`)
    }
  }

  const sitemap = await read('sitemap.xml')
  if (sitemap) {
    for (const route of allRoutes) {
      check(sitemap.includes(`${siteUrl}${route.path}`), `sitemap.xml: missing ${route.path}`)
    }
    check(sitemap.includes('hreflang="x-default"'), 'sitemap.xml: missing x-default alternates')
  }

  // The bundle, too: a tracker added in React would never show up in the
  // prerendered markup, only in the JavaScript that hydrates it.
  const assetsDir = join(dist, 'assets')
  let assets: string[] = []
  try {
    assets = (await readdir(assetsDir)).filter((name) => name.endsWith('.js'))
  } catch {
    failures.push('missing dist/assets')
  }
  check(assets.length > 0, 'no JavaScript bundle found to scan')
  for (const asset of assets) {
    const code = await readFile(join(assetsDir, asset), 'utf8')
    for (const signature of trackerSignatures) {
      check(!code.includes(signature), `assets/${asset}: contains tracker signature "${signature}"`)
    }
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
