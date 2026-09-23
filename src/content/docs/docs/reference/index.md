---
title: Reference
description: Find precise operational documentation for Mininet-IPLab.
---

<div class="channel-note">

**Development · core revision `a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a`.** Use the pinned source links on this page
when the current-development behavior matters. The Stable channel is `v0.1.0`.

</div>

<p class="doc-lede">Use this page when you already know what you need: a command, setting, or public Python name.</p>

For a guided path, start with [Prerequisites](/docs/getting-started/prerequisites/), [Quick Start](/docs/getting-started/quickstart/),
or [How to create a Lab](/docs/build-labs/).

## CLI commands

Run these commands inside the Compose container unless you are using the contributor dev container. The `mniplab`
console command is provided by the package.

| Command | Purpose |
| --- | --- |
| `mniplab --version` | Print the installed Mininet-IPLab version. |
| `mniplab serve --web-host 0.0.0.0 --web-port 8050` | Start standalone Web UI mode; an Instructor selects a Lab from the browser. |
| `mniplab cleanup` | Remove FRR processes and temporary runtime state after a Lab exits abnormally. |
| `mniplab -c` | Alias for `mniplab cleanup`. |
| `mniplab kill-frr` | Kill FRR daemon processes only. |
| `mniplab cleanup-configs` | Remove temporary FRR configuration files. |
| `mniplab cleanup-python` | Remove Python cache files. |
| `mniplab cleanup-mniplab` | Remove Mininet-IPLab temporary files. |
| `mniplab cleanup-mininet` | Clean up leftover Mininet state. |

The standalone server starts without a preloaded Lab. It reads the Lab manifest and lets an Instructor start one Lab
from the browser; only one Lab is active at a time. See [Classroom deployment](/docs/getting-started/classroom/) for
the complete multi-user workflow.

### Typical Compose commands

```bash
docker compose build
docker compose up -d
docker compose exec mniplab mniplab serve --web-host 0.0.0.0 --web-port 8050
```

For a single Lab without standalone selection:

```bash
docker compose exec mniplab python3 examples/static-lab.py --enable-web
```

After either workflow, clean up from the container when needed:

```bash
docker compose exec mniplab mniplab cleanup
```

## `.env` settings

The Web UI reads `.env` from its current working directory. In Compose mode, put it beside `docker-compose.yml` in the
core repository. Shell environment variables override values from the file. Copy the template before editing:

```bash
cp .env.example .env
```

Never commit `.env`: it contains credentials. The most-used settings are:

| Setting | Default | Purpose |
| --- | --- | --- |
| `MNIPLAB_HOST` | `0.0.0.0` | Web server bind address used by the Web UI settings and production warning. `mniplab serve --web-host` is authoritative for standalone mode. |
| `MNIPLAB_PORT` | `8050` | Web UI port setting. `mniplab serve --web-port` is authoritative for standalone mode. |
| `MNIPLAB_USERNAME` | `admin` | Single-user login name when `MNIPLAB_USERS` is empty. |
| `MNIPLAB_PASSWORD` | `changeme123` | Single-user password; change it before sharing access. |
| `MNIPLAB_USERS` | empty | Comma-separated `username:password:role` entries. Roles are `instructor` and `learner`; when set, this replaces the single-user pair. |
| `MNIPLAB_ENVIRONMENT` | `development` | Set to `production` for stricter password and CORS checks. |
| `MNIPLAB_CORS_ORIGINS` | `[*]` | Allowed browser origins. Use explicit classroom origins in production. |
| `MNIPLAB_USE_SECURE_COOKIES` | `false` | Set `true` only when the Web UI is served through HTTPS. |
| `MNIPLAB_TERMINAL_PER_SESSION_CAP` | `5` | Maximum Terminals in one browser Session. |
| `MNIPLAB_TERMINAL_GLOBAL_CAP` | `100` | Maximum live Terminals across the host. |
| `MNIPLAB_TERMINAL_IDLE_TIMEOUT` | `60` | Seconds before an idle Terminal disconnects. |
| `MNIPLAB_SESSION_IDLE_TIMEOUT` | `9000` | Seconds before an unseen Session expires; the default is 2.5 hours. |
| `MNIPLAB_SESSION_PER_USER_CAP` | `0` | Maximum Sessions per account; `0` disables the cap. Keep it `0` for intentionally shared classroom accounts. |
| `MNIPLAB_TERMINAL_PING_INTERVAL` | `15` | WebSocket keepalive interval in seconds. Must be lower than the Terminal idle timeout. |
| `MNIPLAB_LOGIN_RATE_LIMIT` | `5` | Login attempts per minute per IP. |

The full classroom example, including role-based users and production settings, is in [Classroom deployment](/docs/getting-started/classroom/).

## Public Python API

The package exports the main Lab-building seams from `mniplab`:

| Name | Use |
| --- | --- |
| `mnIPLab` | Create and manage the emulated network. |
| `FRRouter`, `mnIPLabHost` | Add FRR routers and regular Mininet hosts. |
| `ContainerHost`, `ContainerIntf`, `ContainerLink` | Run a Docker image as a Lab node. |
| `IPv6Intf` | Configure IPv6-aware interfaces. |
| `Service`, `ServiceMixin` | Attach reusable services to Lab nodes. |
| `DHCPService`, `Pool`, `Relay` | Build DHCPv4/DHCPv6 pools and relays. |
| `DNSService`, `Zone`, `SecondaryZone`, record classes | Build authoritative DNS and DNSSEC scenarios. |
| `mnIPLabCLI`, `parse_lab_args`, `run_lab` | Add the interactive CLI and standard Lab entrypoint. |
| `start_server`, `stop_server` | Start or stop the optional Web UI from Python. |

Start with the [Lab authoring guide](/docs/build-labs/) for composition examples. The exact public exports are defined
in [`mniplab/__init__.py`](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/mniplab/__init__.py),
and the longer API reference remains in the core repository's
[`docs/api-reference.md`](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/docs/api-reference.md).

## Source of truth

When this site and the runtime disagree, use the pinned core revision as the authority:

- [CLI entrypoint](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/mniplab/__main__.py)
- [Web UI settings](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/mniplab/webserver/config.py)
- [Public package exports](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/mniplab/__init__.py)
- [Core `.env.example`](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/.env.example)
