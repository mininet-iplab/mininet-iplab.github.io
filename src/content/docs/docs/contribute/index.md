---
title: Contribute
description: Understand the contribution boundary between the two repositories.
---

<div class="channel-note">

**Stable · core v0.1.0.** This documentation channel describes the supported `v0.1.0` core release.

</div>

<p class="doc-lede">Put runtime behavior in the core repository. Put this site’s content and presentation in the
documentation repository.</p>

The core repository owns runtime implementation, package metadata, executable Lab Examples, and behavior-defining
tests. This repository owns the landing page, content, navigation, styling, assets, and deployment workflow.

## Choose the right repository

| Change | Repository |
| --- | --- |
| Python runtime, Mininet integration, FRR, DHCP, DNS, DNSSEC, ExaBGP, or Web UI behavior | [Core repository](https://github.com/mininet-iplab/mininet-iplab) |
| Lab Example scripts, layouts, and in-app Guides | [Core repository](https://github.com/mininet-iplab/mininet-iplab) |
| Runtime tests, packaging, Docker image, or CI | [Core repository](https://github.com/mininet-iplab/mininet-iplab) |
| Landing page, documentation pages, sidebar, CSS, assets, or Pages deployment | [Documentation repository](https://github.com/mininet-iplab/iplab-landing-page) |

If a change affects both behavior and explanation, update the core first, then update the matching documentation page
with a link to the exact core revision.

## Contribute to the core repository

1. Fork and clone the [core repository](https://github.com/mininet-iplab/mininet-iplab).
2. Create a focused branch, such as `fix/web-session-timeout` or `feat/dns-lab`.
3. Make the smallest change that explains the new behavior in code, tests, and documentation.
4. Run the checks below inside the dev container or the lab image.
5. Open a pull request against `main` with the problem, solution, test plan, and any host requirements.

### Core checks

The fast suite does not require privileged networking:

```bash
python -m pytest -m unit -q
```

For a full local verification when Docker, Mininet, FRR, and Open vSwitch are available:

```bash
python -m mniplab cleanup
python -m pytest -m integration -rs
python -m mniplab cleanup
```

The CI checks also run:

```bash
pylint mniplab/ --disable=all --enable=E,F --load-plugins=pylint_pydantic
mypy mniplab/ --ignore-missing-imports --exclude mniplab/tests
```

Before submitting a runtime or Lab change, manually verify at least one example:

```bash
python3 examples/static-lab.py
python -m mniplab cleanup
```

If you change Web UI behavior, also run an example with `--enable-web`, check the browser workflow, and verify that
the relevant classroom or Web UI documentation is updated.

## Contribute to this documentation site

From this repository:

```bash
npm install
npm run check
npm test
```

Use the existing content structure when adding a page. Keep the path task-oriented, include runnable commands with a
language identifier, link to the exact core source revision for implementation claims, and label current-development
behavior separately from Stable `v0.1.0` behavior.

For a documentation-only pull request, check:

- the page appears in the intended sidebar group;
- links resolve to the generated trailing-slash routes;
- code blocks match the current core checkout;
- the page explains what to verify and how to recover from failure; and
- `npm test` and `npm run check` pass.

## What makes a useful issue or pull request?

For a bug report, include the host OS, Python version, Docker/Compose versions, Mininet-IPLab revision, exact command,
expected behavior, actual behavior, and relevant logs. For a feature request, explain the teaching or network-emulation
scenario, who needs it, and how a learner or Instructor would verify it.

Pull requests should include:

- a short problem statement and the chosen approach;
- tests or a manual verification record;
- documentation updates for changed behavior;
- cleanup steps if a Lab or privileged test was run; and
- screenshots or a short recording for meaningful Web UI changes.

Use [GitHub Issues](https://github.com/mininet-iplab/mininet-iplab/issues) for bugs and feature requests. Report
security issues privately rather than opening a public issue.

## Development boundaries

Mininet-IPLab runs privileged networking workloads. A container or dev container is the supported development
environment, but it still depends on the host Linux kernel and Open vSwitch modules. Do not treat the Web UI, a Lab
Terminal, or classroom credentials as a security boundary; follow the core Web UI configuration guidance before
sharing a server.

Read the core repository's [CONTRIBUTING.md](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/CONTRIBUTING.md)
for the complete coding standards, test markers, pull request process, and community guidance.
