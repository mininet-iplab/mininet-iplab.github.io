import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';
import { latestVersion, versionForPath } from './versions';

type SidebarEntry = StarlightRouteData['sidebar'][number];

/**
 * Keep a reader inside the documentation version they are reading.
 *
 * The sidebar in astro.config.mjs lists the latest version's pages under `/docs/`. On a page from an archived
 * version (served under `/docs/<version>/`), rewrite the sidebar and the previous/next links to that version's
 * prefix so navigation never jumps to a different release.
 */
export const onRequest = defineRouteMiddleware((context) => {
  const version = versionForPath(context.url.pathname);
  if (version === latestVersion) return;

  const route = context.locals.starlightRoute;
  const toVersion = (href: string) => (href.startsWith(latestVersion.base) ? version.base + href.slice(latestVersion.base.length) : href);
  const current = context.url.pathname.endsWith('/') ? context.url.pathname : `${context.url.pathname}/`;

  const rewrite = (entries: SidebarEntry[]): SidebarEntry[] =>
    entries.map((entry) => {
      if (entry.type === 'group') return { ...entry, entries: rewrite(entry.entries) };
      const href = toVersion(entry.href);
      return { ...entry, href, isCurrent: href === current };
    });

  route.sidebar = rewrite(route.sidebar);
  const { prev, next } = route.pagination;
  route.pagination = {
    prev: prev && { ...prev, href: toVersion(prev.href) },
    next: next && { ...next, href: toVersion(next.href) },
  };
});
