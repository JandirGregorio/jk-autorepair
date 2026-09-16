import { describe, expect, it } from 'vitest'

import { business } from '../content/business'
import en from './en.json'
import es from './es.json'

type Json = { [key: string]: Json | string }

function keyPaths(value: Json, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof child === 'string' ? [path] : keyPaths(child, path)
  })
}

const spanish = es as Json
const english = en as Json
const allText = [JSON.stringify(es), JSON.stringify(en)].join(' ').toLowerCase()

describe('locales', () => {
  it('has the same keys in both languages', () => {
    expect(keyPaths(spanish).sort()).toEqual(keyPaths(english).sort())
  })

  it('covers every service group and item from business.ts', () => {
    for (const group of business.services) {
      for (const locale of [spanish, english]) {
        const services = locale.services as Json
        const entry = services[group.id] as Json
        expect(entry, `missing service group ${group.id}`).toBeDefined()
        expect(typeof entry.label).toBe('string')
        for (const item of group.items) {
          expect((entry.items as Json)[item], `missing item ${group.id}.${item}`).toBeDefined()
        }
      }
    }
  })

  it('never offers transmission work', () => {
    for (const word of business.notOffered) {
      expect(allText).not.toContain(word.toLowerCase())
    }
  })

  it('claims no listing the shop does not have', () => {
    expect(allText).not.toContain('yelp')
    expect(allText).not.toContain('carfax')
  })

  it('invents no rating, review count, or success rate', () => {
    expect(allText).not.toMatch(/\d+(\.\d+)?\s*(★|star|estrella)/)
    expect(allText).not.toMatch(/\d+\s*(reviews|reseñas)/)
    expect(allText).not.toMatch(/\d+\s*%/)
  })
})
