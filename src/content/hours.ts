import { business, hoursForDay } from './business'
import type { Language } from '../routes'

/** "9:00 AM" in English, "9:00 a.m." in Spanish. */
function formatTime(time: string, language: Language): string {
  const [hour24, minute] = time.split(':').map(Number)
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  const suffix =
    language === 'es' ? (hour24 < 12 ? 'a.m.' : 'p.m.') : hour24 < 12 ? 'AM' : 'PM'
  return `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`
}

export function formatRange(
  entry: { opens: string; closes: string },
  language: Language,
): string {
  const separator = language === 'es' ? ' a ' : ' to '
  return `${formatTime(entry.opens, language)}${separator}${formatTime(entry.closes, language)}`
}

export const weekdayRange = () => business.hours[0]
export const saturdayRange = () => business.hours[1]

/** Today's hours in the shop's time zone, or undefined when it is closed. */
export function todayRange(now: Date) {
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: business.timeZone,
    weekday: 'short',
  }).format(now)
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday)
  return day === -1 ? undefined : hoursForDay(day)
}
