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
| `npm run preview` | Serve `dist/` exactly as GitHub Pages will |
| `npm test` | Unit tests (routes, schema, copy rules) |
| `npm run check-dist` | Reads the built HTML: language, canonical, hreflang, JSON-LD, address, phone, and that nothing calls a third party uninvited |
| `npm run lint` | oxlint |
| `npm run design:lint` | Validates the design tokens and contrast. Needs `DESIGN.md`, which is kept locally and not in this repo |

## Deploying

Live at <https://jandirgregorio.github.io/jk-autorepair/>. There is no CI here, so nothing deploys on push. GitHub Pages serves the **`gh-pages`** branch, which holds the built output and nothing else.

To publish a new build:

```bash
npm run lint && npm test && npm run build && npm run check-dist
```

Then copy `dist/` into a scratch directory, add an empty `.nojekyll` beside it, commit that directory as its own repo and force-push it to `gh-pages`. Build there rather than in the working tree: `dist/` is gitignored on `development` and should stay that way.

`VITE_BASE=/jk-autorepair/` and `VITE_SITE_URL=https://jandirgregorio.github.io/jk-autorepair` are the defaults and are correct for this host. A custom domain changes both together, plus a `public/CNAME` file; canonical URLs, hreflang, the sitemap and robots.txt all follow from `VITE_SITE_URL`.
