# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + TypeScript + Vite, built as a static site and pre-rendered to HTML per route. Hosted on GitHub Pages (served from the `/jk-autorepair/` subpath until a Cloudflare-purchased custom domain is attached). Spanish and English live at separate URLs via react-i18next. Chosen by the user, not delegated.

## Users

Drivers in Hamilton Township, New Jersey and the towns around it (Trenton, Mercerville, Yardville, Robbinsville, Hamilton Square) who have a car problem now and are looking for a nearby shop they can trust. Many of them speak Spanish and prefer to be helped in Spanish. Most arrive on a phone, from a Google search or the shop's Google Business Profile.

Their primary job: find the shop and come in. Secondary: confirm he handles their kind of problem, and call ahead when they want to.

## Product Purpose

The shop hired this site so it can be found in Google local search. Success is measured in phone calls and walk-ins that start with a search, and in the site agreeing with the Google Business Profile so that profile keeps ranking.

## Positioning

An owner-operated shop where the person who diagnoses your car is the person who fixes it, with 20+ years of experience, service in Spanish, walk-ins welcome, same-day work on common jobs, and free estimates. Chains and dealerships can match the hours but not the single accountable mechanic or the Spanish-first welcome.

## Operating Context

- The shop occupies Suite C of a shared building at 1865 E State St, Hamilton Township, NJ 08619. Unit letters matter: the Google Business Profile is registered with "Suite C" and the site must match it exactly.
- The phone, (609) 858-1486, is the only booking channel. There is no online scheduling in v1.
- Hours: Monday–Friday 9:00 AM–8:00 PM, Saturday 9:00 AM–7:00 PM, closed Sunday.
- The shop has a Google Business Profile with 6 reviews and a review link (`https://g.page/r/CauZi0M6HbR_EAE/review`). No Yelp, no Carfax, no other listing.
- The owner works on the cars himself and speaks Spanish with customers.

## Capabilities and Constraints

Work the shop does: maintenance (oil changes, filters, fluids, tune-ups, tire rotation, inspections); brakes and suspension (pads and rotors, shocks and struts, steering, alignment); diagnostics and engine (check engine light, diagnostic scans, engine repair, cooling system); electrical and A/C (batteries, starters, alternators, A/C and heating). All makes and models.

- **The shop does not do transmission work.** No page, service list, or schema may imply otherwise.
- No booking system, customer accounts, or payment in v1. A booking system with an admin dashboard is a possible later phase.
- Static hosting only: no server, no database, no API keys in the client.
- Content must be readable without JavaScript, because the pages exist to be crawled.

## Brand Commitments

- The name is "JK Auto Repair". Name, address and phone appear identically everywhere, matching the Google Business Profile.
- Spanish is the default language; English is the alternate. Spanish copy is written as Spanish, not translated word for word.
- No invented testimonials, reviews, ratings, customer counts, or success rates. No badges for services the shop doesn't have.
- No logo exists yet, so the identity carries through type.

## Evidence on Hand

- Real: the Google Business Profile, its 6 reviews, the review link, the address, the phone, the hours, 20+ years of experience, Spanish service, the service list above.
- Not available: shop and team photos (placeholders until the client sends files), a logo, any testimonial or quote, and any documented mission. The About and Mission sections are explicitly placeholder copy to be confirmed with the client, and nothing in them may read as a quote or a claim about results.

## Product Principles

1. The phone number and the address are the product. Every screen answers "where is he" and "how do I reach him" without scrolling hunting.
2. Spanish first, and never as an afterthought or a translation artifact.
3. Say only what the shop can back up. Absent evidence stays absent instead of being filled in.
4. What the crawler reads and what the visitor reads are the same HTML.
5. A stranger with a broken car decides in seconds on a phone, often outdoors. Legibility beats decoration.

## Accessibility & Inclusion

Bilingual by requirement. Mobile-first on older and mid-range phones, readable in daylight, with large touch targets for the call and directions actions. Pages carry the right `lang` so screen readers pronounce each language correctly.
