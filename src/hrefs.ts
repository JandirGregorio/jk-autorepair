/**
 * Plain anchors need the deployment base path spelled out.
 *
 * React Router's <Link> prefixes the basename on its own, but a raw <a href>
 * does not. Served from the root this makes no difference, but on any host
 * that serves the site from a subpath, a root-relative href like "/en/" lands
 * outside the site and returns the host's 404.
 *
 * Use this for every internal <a>, and <Link> for in-app navigation.
 */
export function hrefFor(path: string): string {
  const base = import.meta.env?.BASE_URL ?? '/'
  return `${base.replace(/\/$/, '')}${path}`
}
