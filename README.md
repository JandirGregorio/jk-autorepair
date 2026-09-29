# JK Auto Repair

Static bilingual site for JK Auto Repair, a mechanic shop at 1865 E State St Suite C, Hamilton Township, NJ. It exists to be found in Google local search, so every page ships as prerendered HTML in both languages.

- Spanish (default): `/`, `/servicios/` and `/avisos-legales/`
- English: `/en/`, `/en/services/` and `/en/legal/`

## Running it

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check, build the client, build the SSR bundle, then prerender every route |
| `npm run preview` | Serve `dist/` locally, as it will be deployed |
| `npm test` | Unit tests (routes, schema, copy rules) |
| `npm run check-dist` | Reads the built HTML: language, canonical, hreflang, JSON-LD, address, phone, and that nothing calls a third party uninvited |
| `npm run lint` | oxlint |
| `npm run design:lint` | Validates the design tokens and contrast. Needs `DESIGN.md`, which is kept locally and not in this repo |

## Deploying

Hosted on Cloudflare Pages at <https://jk-autorepair.pages.dev/>. Cloudflare builds and publishes `main` on every push; the build settings live in the Cloudflare dashboard, not in this repo.

Work happens on `development`. Merging it into `main` is what ships, so anything pushed to `development` alone stays off the live site.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build && npm run check-dist` |
| Build output directory | `dist` |
| `NODE_VERSION` | `22` |

`check-dist` is part of the build on purpose: a page with a broken link, a missing canonical or a tracker fails the deploy instead of going live.

`VITE_BASE` defaults to `/` and `VITE_SITE_URL` to `https://jk-autorepair.pages.dev`. When the shop gets its own domain, set `VITE_SITE_URL` to it in the Cloudflare dashboard and redeploy; canonical URLs, hreflang, the sitemap and robots.txt all follow from it.
