# Versioned documentation with a version selector

Supersedes [0002](0002-stable-and-unreleased-documentation-channels.md) and
[0005](0005-traceable-manual-documentation-sync.md).

The site publishes one copy of the documentation per core release instead of a Stable channel and a commit-pinned
Next channel. The current copy describes `v0.1.0` and is served at `/docs/`. A version selector beside the site title
lists every published version from `src/versions.ts`; choosing one opens the same page in that version, or its start
page when the page does not exist there.

Pages no longer carry per-page channel notes or commit hashes. Source links point at the release tag the copy
documents (`blob/v0.1.0/...`), so a page stays traceable to exactly one core release.

## Consequences

- The core repository's `v0.1.0` tag must point at the revision these pages describe.
- When the core cuts a new release, the current docs are archived under `/docs/<old-version>/`, the new release
  becomes the entry served at `/docs/`, and `src/versions.ts` gains an entry (see README.md).
- Behavior that is not in a release is not documented until the release that ships it.
- Screenshots in `src/assets/screenshots/` are taken from the release they illustrate.
