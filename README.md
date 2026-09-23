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
