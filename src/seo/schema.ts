/**
 * JSON-LD for the shop, built from src/content/business.ts so the markup and
 * the visible page can never disagree.
 *
 * Deliberately absent:
 * - aggregateRating / review: Google ignores self-serving review markup for a
 *   local business, and the shop has 6 reviews. Real ones live on the profile.
 * - geo coordinates: nobody measured them, so they'd be invented.
 * - sameAs: the review form URL is not the profile URL, and the profile URL
 *   hasn't been confirmed. Add it once the client sends the real link.
 */

import { business, cityLine, streetLine } from '../content/business'
import type { Language } from '../routes'

const schemaDayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const

export type SchemaInput = {
  /** Absolute URL of the page this markup describes. */
  pageUrl: string
  language: Language
  /** Service names in this page's language, for the offer catalog. */
  serviceNames: string[]
}

export function autoRepairSchema({ pageUrl, language, serviceNames }: SchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: business.name,
    url: pageUrl,
    telephone: business.phone.e164,
    inLanguage: language,
    knowsLanguage: ['es', 'en'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: streetLine(),
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: business.areasServed.map((name) => ({
      '@type': 'City',
      name,
      addressRegion: business.address.region,
    })),
    openingHoursSpecification: business.hours.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.days.map((day) => schemaDayNames[day]),
      opens: entry.opens,
      closes: entry.closes,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: business.name,
      itemListElement: serviceNames.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  }
}

/** The address as one string, for humans and for quick equality checks. */
export function schemaAddressLine(): string {
  return `${streetLine()}, ${cityLine()}`
}
