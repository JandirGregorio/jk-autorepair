/**
 * Every fact about the shop lives here.
 *
 * Name, address and phone must match the Google Business Profile character for
 * character. A mismatch costs local search ranking and can force the profile
 * through verification again. Change them here and nowhere else.
 */

export const business = {
  name: 'JK Auto Repair',

  address: {
    street: '1865 E State St',
    unit: 'Suite C',
    city: 'Hamilton Township',
    region: 'NJ',
    regionName: 'New Jersey',
    postalCode: '08619',
    country: 'US',
  },

  phone: {
    display: '(609) 858-1486',
    href: 'tel:+16098581486',
    e164: '+16098581486',
  },

  /** Monday is 1, matching Date.prototype.getDay(). Sunday (0) is closed. */
  hours: [
    { days: [1, 2, 3, 4, 5], opens: '09:00', closes: '20:00' },
    { days: [6], opens: '09:00', closes: '19:00' },
  ],

  timeZone: 'America/New_York',

  links: {
    /** Opens the shop's Google review form. Straight from the Business Profile. */
    leaveReview: 'https://g.page/r/CauZi0M6HbR_EAE/review',
    readReviews:
      'https://www.google.com/maps/search/?api=1&query=JK+Auto+Repair+1865+E+State+St+Suite+C+Hamilton+Township+NJ+08619',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=JK+Auto+Repair+1865+E+State+St+Suite+C+Hamilton+Township+NJ+08619',
    mapEmbed:
      'https://www.google.com/maps?q=1865+E+State+St+Suite+C+Hamilton+Township+NJ+08619&output=embed',
  },

  yearsExperience: 20,

  /** Confirmed with the owner. Each one is true; none is a marketing claim. */
  policies: {
    walkIns: true,
    sameDayOnCommonJobs: true,
    freeEstimates: true,
  },

  /**
   * Service groups. Labels and item names live in the locale files, keyed by
   * these ids, so Spanish is written as Spanish rather than translated.
   */
  services: [
    { id: 'maintenance', items: ['oil', 'filters', 'fluids', 'tuneUp', 'tires', 'inspection'] },
    { id: 'brakes', items: ['pads', 'rotors', 'shocks', 'steering', 'alignment'] },
    { id: 'diagnostics', items: ['checkEngine', 'scan', 'engineRepair', 'cooling'] },
    { id: 'electrical', items: ['battery', 'starter', 'alternator', 'ac', 'heating'] },
  ],

  /**
   * The shop does not do transmission work. Nothing on the site may imply it
   * does. A test asserts this word never appears in the service copy.
   */
  notOffered: ['transmission', 'transmisión'],

  makes: [
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
    'Nissan',
    'Hyundai',
    'Kia',
    'Jeep',
    'Dodge',
    'Subaru',
    'Volkswagen',
    'Mazda',
  ],

  areasServed: [
    'Hamilton Township',
    'Trenton',
    'Mercerville',
    'Yardville',
    'Robbinsville',
    'Hamilton Square',
  ],
} as const

/** "1865 E State St Suite C" — street and unit on one line. */
export function streetLine(): string {
  return `${business.address.street} ${business.address.unit}`
}

/** "Hamilton Township, NJ 08619" */
export function cityLine(): string {
  const { city, region, postalCode } = business.address
  return `${city}, ${region} ${postalCode}`
}

/** The full one-line address, as it appears on the Business Profile. */
export function fullAddress(): string {
  return `${streetLine()}, ${cityLine()}`
}

/** The hours entry covering a given day, or undefined when the shop is closed. */
export function hoursForDay(day: number) {
  return business.hours.find((entry) => (entry.days as readonly number[]).includes(day))
}

/**
 * Whether the shop is open at `now`, read in the shop's own time zone rather
 * than the visitor's. Call this after hydration only: the server and the
 * visitor can disagree, and a mismatch would break hydration.
 */
export function isOpenAt(now: Date): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: business.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)

  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? ''
  const hour = parts.find((part) => part.type === 'hour')?.value ?? '00'
  const minute = parts.find((part) => part.type === 'minute')?.value ?? '00'

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const day = days.indexOf(weekday)
  const entry = day === -1 ? undefined : hoursForDay(day)
  if (!entry) return false

  const minutes = Number(hour) * 60 + Number(minute)
  const [openH, openM] = entry.opens.split(':').map(Number)
  const [closeH, closeM] = entry.closes.split(':').map(Number)
  return minutes >= openH * 60 + openM && minutes < closeH * 60 + closeM
}
