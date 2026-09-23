# JK Auto Repair

Static bilingual site for JK Auto Repair, a mechanic shop at 1865 E State St Suite C, Hamilton Township, NJ. It exists to be found in Google local search, so every page ships as prerendered HTML in both languages.

- Spanish (default): `/` and `/servicios/`
- English: `/en/` and `/en/services/`

## Running it

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check, build the client, build the SSR bundle, then prerender every route |
| `npm run preview` | Serve `dist/` exactly as GitHub Pages will |
| `npm test` | Unit tests (routes, schema, copy rules) |
| `npm run check-dist` | Reads the built HTML: language, canonical, hreflang, JSON-LD, address, phone |
| `npm run lint` | oxlint |
| `npm run design:lint` | Validates the design tokens and contrast. Needs `DESIGN.md`, which is kept locally and not in this repo |

## Changing content

**Facts** live in one file: [`src/content/business.ts`](src/content/business.ts). Address, phone, hours, services, makes, areas served, and the Google links. Everything on the page and in the structured data reads from there.

**Words** live in [`src/locales/es.json`](src/locales/es.json) and [`src/locales/en.json`](src/locales/en.json). Both files must have the same keys; a test fails if they drift.

**Look** is implemented as tokens in [`src/styles/theme.css`](src/styles/theme.css), the only place colors, fonts, radii and spacing are defined. Change the tokens, not the components. The written design system (`DESIGN.md`) and the product record (`PRODUCT.md`) are kept on disk and deliberately not published here.

Three rules the tests enforce:

1. The address must stay `1865 E State St Suite C`, matching the Google Business Profile character for character. A mismatch costs local ranking and can force re-verification.
2. The shop does not do transmission work, so that word must not appear as a service.
3. No invented reviews, ratings, counts, or testimonials. The site links to the shop's Google reviews instead.

## Still to come from the client

- Real shop photos (drop them in `src/assets/photos/` and replace the placeholder panels in `src/components/sections.tsx`)
- A logo, if the shop wants one; the wordmark is type for now
- Final wording for About and Mission, which is placeholder copy today

## Deploying

There is no CI in this repo, so nothing deploys on push. Build and publish the output yourself:

```bash
npm run lint && npm test && npm run build && npm run check-dist
```

`dist/` then holds the whole site: four prerendered pages, `404.html`, `sitemap.xml` and `robots.txt`. Upload that directory to whatever serves the site.

For GitHub Pages specifically, the repository has to be public on the free plan, and Pages needs a source (a branch holding the built output, or a workflow you add yourself). `VITE_BASE` must match the path the site is served from.

## Adding the custom domain

Two values change, both read at build time:

```bash
VITE_BASE=/ VITE_SITE_URL=https://example.com npm run build
```

Set them in the workflow, add `public/CNAME` containing the domain, and point the domain's DNS at GitHub Pages. Canonical URLs, hreflang tags, the sitemap and robots.txt all follow from `VITE_SITE_URL`, so nothing else needs editing.

## Structured data

Each page carries `AutoRepair` JSON-LD built from `business.ts`: address, phone, opening hours, areas served, languages spoken, and the service catalog. It deliberately omits `aggregateRating` (Google ignores self-served review markup) and geo coordinates (nobody measured them).
