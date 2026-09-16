/**
 * Plain anchors need the deployment base path spelled out.
 *
 * React Router's <Link> prefixes the basename on its own, but a raw <a href>
 * does not. GitHub Pages serves this site from /jk-autorepair/ until a custom
 * domain arrives, so a root-relative href like "/en/" lands on the domain root
 * and returns GitHub's 404.
 *
 * Use this for every internal <a>, and <Link> for in-app navigation.
 */
export function hrefFor(path: string): string {
  const base = import.meta.env?.BASE_URL ?? '/'
  return `${base.replace(/\/$/, '')}${path}`
}
