# GitHub Pages deployment

The documentation repository is published as an organization/user GitHub Pages site through GitHub Actions. The pipeline builds the Astro site, checks links, builds both the stable and `next` documentation channels, and publishes the static output; pull requests use build artifacts for previews rather than a separate public preview environment.

This keeps the first deployment aligned with a static documentation product while leaving room for a custom domain or richer preview service later if the project needs them.
