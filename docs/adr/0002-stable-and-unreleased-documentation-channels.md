# Stable and unreleased documentation channels

The documentation site publishes both a stable channel for the `v0.1.0` core-repository release and an unreleased channel curated from current development on the core repository. Stable pages must describe only behavior present in `v0.1.0`; post-release features belong in the unreleased channel until a later core release includes them.

## Consequences

- The site must show which channel and core revision a page describes.
- The unreleased channel may document newer features such as post-`v0.1.0` ExaBGP and Web UI changes, but must not present them as part of the stable release.
- Synchronization checks need to validate both a release tag and the development branch.
