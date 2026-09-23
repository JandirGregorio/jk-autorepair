/**
 * Privacy, terms of use and accessibility, on one page.
 *
 * One page rather than three, because on a two-page brochure site three thin
 * legal pages are three more things to keep in step and three more footer
 * links for a walk-in audience to sort through. Each notice keeps its own
 * heading, so a deep link and a screen reader's heading list both still work.
 *
 * Every statement here describes what the site actually does. If the site
 * starts collecting something, this page changes in the same commit.
 */

import { useTranslation } from 'react-i18next'

import { AddressBlock, Band, CallButton, DirectionsButton, Kicker } from '../components/sign'
import { business } from '../content/business'
import { useDocumentHead, useRouteInfo } from '../hooks/useRoute'
import type { Language } from '../routes'

/** The notices, in the order they are most likely to be wanted. */
const notices = [
  { id: 'privacy', sections: ['collect', 'hosting', 'map', 'links', 'phone', 'children'] },
  { id: 'terms', sections: ['info', 'estimates', 'hours', 'warranty', 'trademarks', 'content'] },
  { id: 'accessibility', sections: ['goal', 'how', 'help'] },
] as const

export default function LegalPage() {
  const { t } = useTranslation()
  const { language } = useRouteInfo()
  useDocumentHead(t('seo.legal.title'), language)

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-ink px-6 pb-20 pt-36 text-center text-canvas sm:pb-24 sm:pt-40">
        <h1 className="text-4xl font-light sm:text-5xl">{t('legal.title')}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-fog">{t('legal.intro')}</p>
        <p className="mt-8 text-sm tabular-nums text-fog">
          {t('legal.updated', { date: formatUpdated(business.policiesUpdated, language) })}
        </p>
      </section>

      {notices.map((notice, index) => (
        <Band key={notice.id} muted={index % 2 === 1}>
          <h2 id={notice.id} className="text-3xl font-light sm:text-4xl">
            {t(`legal.${notice.id}.title`)}
          </h2>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {notice.sections.map((section) => (
              <section key={section}>
                <h3 className="text-xl font-light">
                  {t(`legal.${notice.id}.${section}.title`)}
                </h3>
                <p className="mt-3 leading-relaxed text-smoke">
                  {t(`legal.${notice.id}.${section}.body`)}
                </p>
              </section>
            ))}
          </div>

          {/* Privacy is the notice most likely to end in a question, so the
              way to ask one sits at the bottom of it. */}
          {notice.id === 'privacy' && (
            <div className="mt-12 border-t border-line pt-10">
              <Kicker>{t('legal.privacy.contact.title')}</Kicker>
              <p className="mt-3 max-w-xl leading-relaxed text-smoke">
                {t('legal.privacy.contact.body')}
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <AddressBlock />
                <div className="flex flex-wrap items-start gap-4">
                  <CallButton />
                  <DirectionsButton />
                </div>
              </div>
            </div>
          )}
        </Band>
      ))}
    </>
  )
}

/**
 * The date the notices last changed, spelled out rather than numeric: 03/09
 * is two different days depending on which side of the Atlantic you read it
 * from, and this shop's customers read both ways.
 */
function formatUpdated(iso: string, language: Language): string {
  const [year, month, day] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat(language === 'es' ? 'es-US' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}
