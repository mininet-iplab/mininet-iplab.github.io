/**
 * Documentation versions shown in the version selector.
 *
 * Each entry is one published copy of the docs. `base` is the route prefix the
 * copy is served under and `coreRef` is the core-repository tag its source links
 * point at. The first entry is the latest version and is always served at
 * `/docs/`. See README.md ("Publishing a new documentation version") for how to
 * archive the current docs when the core repository cuts a new release.
 */
export interface DocsVersion {
  id: string;
  label: string;
  base: string;
  coreRef: string;
}

export const versions: DocsVersion[] = [
  { id: 'v0.1.0', label: 'v0.1.0', base: '/docs/', coreRef: 'v0.1.0' },
];

export const latestVersion = versions[0];

/** The version whose route prefix owns `pathname`; the longest prefix wins. */
export function versionForPath(pathname: string): DocsVersion {
  return (
    [...versions]
      .sort((a, b) => b.base.length - a.base.length)
      .find((version) => pathname.startsWith(version.base)) ?? latestVersion
  );
}
