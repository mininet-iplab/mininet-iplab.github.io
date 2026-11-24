# Core and documentation repository boundary

The core repository remains authoritative for Mininet-IPLab behavior: runtime code, package and release metadata, executable Lab Examples, and behavior-defining tests. The documentation repository publishes the public landing page and user-facing documentation; any generated reference or source-backed example published there must be traceable to a specific core-repository revision so the site does not become a competing implementation source.

## Consequences

- The site may reorganize and explain core material without redefining the product’s behavior.
- The two repositories need an explicit synchronization and compatibility check before the site claims a release or API is current.
- The existing core README and docs cannot simply be copied indefinitely; ownership and migration rules must be decided before publication.
