# Mininet-IPLab documentation site

This repository contains the static Mininet-IPLab landing page and documentation site. It is one Astro application with a custom landing route and Starlight documentation under `/docs/`.

## Local development

```sh
npm install
npm run dev
```

Build and validate the production artifact with:

```sh
npm test
```

The site is configured for the organization/user GitHub Pages root at `https://mininet-iplab.github.io`. Runtime implementation, package metadata, executable Lab Examples, and behavior-defining tests remain in the [core repository](https://github.com/mininet-iplab/mininet-iplab).

## Documentation versions

The docs describe one core release per copy. The copy at `/docs/` is the latest release (currently `v0.1.0`), and the
version selector beside the site title lists every entry in [`src/versions.ts`](src/versions.ts). Source links in a
copy point at its release tag, for example `https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/...`, so the
core repository's tag must point at the revision the copy describes.

### Publishing a new documentation version

When the core repository releases a new version (for example `v0.2.0`):

1. Archive the current docs: `node scripts/archive-docs-version.mjs v0.1.0`. This copies them to
   `src/content/docs/docs/v0.1.0/` and rewrites their links to `/docs/v0.1.0/`.
2. In `src/versions.ts`, add `{ id: 'v0.2.0', label: 'v0.2.0', base: '/docs/', coreRef: 'v0.2.0' }` as the first entry
   and change the `v0.1.0` entry's `base` to `/docs/v0.1.0/`.
3. Update the pages under `src/content/docs/docs/` for the new release, and change their `blob/v0.1.0/` source links
   to `blob/v0.2.0/`.
4. Retake any screenshots in `src/assets/screenshots/` whose Web UI changed.
5. Run `npm test`.

An archived page uses the latest sidebar with its links rewritten to the archived prefix (see `src/routeData.ts`).

## Screenshots

`src/assets/screenshots/` holds Web UI screenshots of the core Lab Examples running `v0.1.0`, taken at 1440×900 with
the Lab's authored Layout. Astro converts them to optimized WebP at build time.
