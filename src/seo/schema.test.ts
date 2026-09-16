import { describe, expect, it } from 'vitest'

import { business, isOpenAt, streetLine } from '../content/business'
import { autoRepairSchema } from './schema'

const schema = autoRepairSchema({
  pageUrl: 'https://example.test/',
  language: 'es',
  serviceNames: ['Mantenimiento', 'Frenos y suspensión'],
})

describe('local business schema', () => {
  it('repeats the Business Profile address exactly', () => {
    expect(schema.address).toMatchObject({
      streetAddress: '1865 E State St Suite C',
      addressLocality: 'Hamilton Township',
      addressRegion: 'NJ',
      postalCode: '08619',
      addressCountry: 'US',
    })
    expect(schema.address.streetAddress).toBe(streetLine())
  })

  it('keeps the unit on the street line, since the profile says Suite C', () => {
    expect(schema.address.streetAddress).toContain('Suite C')
    expect(schema.address.streetAddress).not.toContain('Unit C')
  })

  it('uses the phone in E.164 form', () => {
    expect(schema.telephone).toBe('+16098581486')
    expect(schema.telephone).toBe(business.phone.e164)
  })

  it('publishes the real hours and never Sunday', () => {
    const [weekdays, saturday] = schema.openingHoursSpecification
    expect(weekdays.dayOfWeek).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    expect(weekdays.opens).toBe('09:00')
    expect(weekdays.closes).toBe('20:00')
    expect(saturday.dayOfWeek).toEqual(['Saturday'])
    expect(saturday.closes).toBe('19:00')
    expect(JSON.stringify(schema)).not.toContain('Sunday')
  })

  it('claims no rating, review count, or coordinates', () => {
    const serialized = JSON.stringify(schema)
    expect(serialized).not.toContain('aggregateRating')
    expect(serialized).not.toContain('ratingValue')
    expect(serialized).not.toContain('reviewCount')
    expect(serialized).not.toContain('geo')
  })

  it('names the towns the shop serves and both languages', () => {
    expect(schema.areaServed.map((area) => area.name)).toContain('Hamilton Township')
    expect(schema.areaServed.map((area) => area.name)).toContain('Trenton')
    expect(schema.knowsLanguage).toEqual(['es', 'en'])
  })
})

describe('open now', () => {
  const at = (iso: string) => isOpenAt(new Date(iso))

  it('is open on a Tuesday afternoon', () => {
    // 2026-09-15 is a Tuesday. 18:00 in New Jersey.
    expect(at('2026-09-15T22:00:00Z')).toBe(true)
  })

  it('is closed before nine and after eight on weekdays', () => {
    expect(at('2026-09-15T12:30:00Z')).toBe(false) // 08:30 local
    expect(at('2026-09-16T00:30:00Z')).toBe(false) // 20:30 local Tuesday
  })

  it('closes an hour earlier on Saturday', () => {
    expect(at('2026-09-19T22:30:00Z')).toBe(true) // 18:30 local Saturday
    expect(at('2026-09-19T23:30:00Z')).toBe(false) // 19:30 local Saturday
  })

  it('is closed all day Sunday', () => {
    expect(at('2026-09-20T16:00:00Z')).toBe(false) // noon local Sunday
  })
})
