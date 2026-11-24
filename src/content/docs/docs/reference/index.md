---
title: Reference
description: Find precise operational documentation for Mininet-IPLab.
---

<p class="doc-lede">Use this page when you already know what you need: a command, setting, or public Python name.</p>

For a guided path, start with [Prerequisites](/docs/getting-started/prerequisites/), [Quick Start](/docs/getting-started/quickstart/),
or [How to create a Lab](/docs/build-labs/).

## CLI commands

Run these commands inside the Compose container unless you are using the contributor dev container. The `mniplab`
console command is provided by the package.

| Command | Purpose |
| --- | --- |
| `mniplab --version` | Print the installed Mininet-IPLab version. |
| `mniplab serve [--web-host H] [--web-port P] [--log-level L]` | Start the classroom server: no Lab up front, Labs started from the browser. Same as `python -m mniplab serve`. |
| `mniplab cleanup` | Remove the runtime root and stop **every** Lab on the host, kill FRR processes, and remove temp files. Never run it while `serve` is up. `--no-keep-committed` also removes `./frr-config/`. |
| `mniplab -c` | Alias for `mniplab cleanup`. |
| `mniplab kill-frr` | Kill FRR daemon processes only. |
| `mniplab cleanup-configs` | Remove temporary FRR configuration files. |
| `mniplab cleanup-python` | Remove Python cache files. |
| `mniplab cleanup-mniplab` | Remove Mininet-IPLab temporary files. |
| `mniplab cleanup-mininet` | Clean up leftover Mininet state. |

The classroom server starts without a preloaded Lab. It reads the Lab manifest and lets an Instructor start Labs from
the browser, each in a child process of the server. In Single-Lab Mode one Lab is active at a time; in
[Multi-Lab Mode](/docs/features/multi-lab/) each Group runs its own. See
[Classroom deployment](/docs/getting-started/classroom/) for the complete multi-user workflow.

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

The Web UI and a Lab read `.env` from their current working directory. In Compose mode, put it beside `docker-compose.yml` in the
core repository. Shell environment variables override values from the file. Copy the template before editing:

```bash
cp .env.example .env
```

Never commit `.env`: it contains credentials. The most-used settings are:

| Setting | Default | Purpose |
| --- | --- | --- |
| `MNIPLAB_HOST` | `0.0.0.0` | Web server bind address, for `--enable-web` and `serve` alike; a `--web-host` flag wins. |
| `MNIPLAB_PORT` | `8050` | Web server port, for `--enable-web` and `serve` alike; a `--web-port` flag wins. Compose publishes only `8050`. |
| `MNIPLAB_USERNAME` | `admin` | The shared login's name while `MNIPLAB_USERS` is unset. |
| `MNIPLAB_PASSWORD` | generated | The shared login's password. When unset, a random one is generated at every start and printed on the console. |
| `MNIPLAB_USERS` | empty | Comma-separated `username:password:role` entries. Roles are `instructor` and `learner`; when set, this replaces the single-user pair. |
| `MNIPLAB_ENVIRONMENT` | `development` | Set to `production` for stricter password and CORS checks. |
| `MNIPLAB_CORS_ORIGINS` | `[*]` | Allowed browser origins. Use explicit classroom origins in production. |
| `MNIPLAB_USE_SECURE_COOKIES` | `false` | Set `true` only when the Web UI is served through HTTPS. |
| `MNIPLAB_TERMINAL_PER_SESSION_CAP` | `5` | Maximum Terminals in one browser Session. |
| `MNIPLAB_TERMINAL_GLOBAL_CAP` | `100` | Maximum live Terminals across the host. |
| `MNIPLAB_TERMINAL_IDLE_TIMEOUT` | `300` | Seconds before an idle Terminal disconnects; also how long a reloaded page can reattach and a Packet Capture runs on after its last viewer. |
| `MNIPLAB_SESSION_IDLE_TIMEOUT` | `9000` | Seconds before an unseen Session expires; the default is 2.5 hours. |
| `MNIPLAB_SESSION_PER_USER_CAP` | `0` | Maximum Sessions per account; `0` disables the cap. Keep it `0` for intentionally shared classroom accounts. |
| `MNIPLAB_TERMINAL_PING_INTERVAL` | `15` | WebSocket keepalive interval in seconds. Must be lower than the Terminal idle timeout. |
| `MNIPLAB_LOGIN_RATE_LIMIT` | `5` | Wrong passwords allowed per minute for one login name before it is locked for the rest of the minute. |
| `MNIPLAB_LAB_MODE` | `single` | `single` runs one Lab for everyone; `multi` runs a Lab per Group. Read at startup only. See [Multi-Lab Mode](/docs/features/multi-lab/). |
| `MNIPLAB_LAB_CAP` | `4` | Multi-Lab Mode only: the most Labs alive at once on the host. |
| `MNIPLAB_LAB_BUILDER_TIMEOUT` | `60` | Seconds a Lab may take to build and report ready. |
| `MNIPLAB_ENV_FILE` | `.env` | The env file to read instead; export it in the shell, since it cannot be set from inside the file it names. |
| `MNIPLAB_AUTHORED_LABS_DIR` | `authored-labs/` | Where [Lab Authoring](/docs/build-labs/lab-authoring/) keeps drafts and published Lab Examples. |

On `serve`, an Instructor can also change the Terminal, Session, and Lab limits while the class runs from
**Server settings**; those overrides are saved in `settings.json`, and `.env` stays the baseline.

The full classroom example, including role-based users and production settings, is in [Classroom deployment](/docs/getting-started/classroom/).

## Lab Prompt commands

The `mininet-iplab>` prompt in CLI Mode, and the **Lab Prompt** in Web UI Mode, add network-wide commands such as
`show_ips`, `show_routes`, `link_config`, `iperf3`, `show_vlans`, `show_leases`, `show_dns`, `show_cache`, and
`show_speaker`, `show_rpki`, and `show_vrps` to Mininet's own. The full table is on the [Lab Prompt](/docs/features/lab-prompt/) page; run
`help <command>` at the prompt for usage.

## Public Python API

The package exports the main Lab-building seams from `mniplab`:

| Name | Use |
| --- | --- |
| `mnIPLab` | Create and manage the emulated network. |
| `FRRouter`, `mnIPLabHost` | Add FRR routers and regular Mininet hosts. |
| `ContainerHost`, `ContainerIntf`, `ContainerLink` | Run a Docker image as a Lab node. |
| `IPv6Intf` | Configure IPv6-aware interfaces. |
| `Service`, `ServiceMixin` | Attach reusable services to Lab nodes. |
| `ManagedSwitch` | Open vSwitch switch with per-port VLAN control. |
| `MasqueradeNAT`, `TransitNAT` | The Internet Gateways behind `net.addNAT()` and `net.addTransit()`. |
| `PortForward`, `StaticNAT` | Router NAT entries for `addRouter(..., nat=[...])`. See [NAT](/docs/features/nat/). |
| `DHCPService`, `Pool`, `Relay` | Build DHCPv4/DHCPv6 pools and relays. `Reservation` is in `mniplab.dhcp`. |
| `DNSService`, `Zone`, `SecondaryZone`, record classes | Build authoritative DNS and DNSSEC scenarios. |
| `mniplab.resolver.ResolverService`, `AccessRule` | Build a recursive caching Resolver and its Access Control. |
| `mniplab.exabgp.BGPNeighbor`, `make_v4_peer_routes`, `make_v6_peer_routes` | Describe a Speaker's Neighbors and generated routes. |
| `mniplab.rpki.RPKICAService`, `HostedCA`, `ValidatorService` | Build an RPKI CA with its Hosted CAs and a Validator. See [RPKI](/docs/features/rpki/). |
| `mnIPLabCLI`, `parse_lab_args`, `run_lab` | Add the interactive CLI and standard Lab entrypoint. |
| `start_server`, `stop_server` | Start or stop the optional Web UI from Python. |

Start with the [Lab authoring guide](/docs/build-labs/) for composition examples. The exact public exports are defined
in [`mniplab/__init__.py`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/mniplab/__init__.py),
and the longer API reference remains in the core repository's
[`docs/api-reference.md`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/docs/api-reference.md).

## Source of truth

When this site and the runtime disagree, use the `v0.1.0` core source as the authority:

- [CLI entrypoint](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/mniplab/__main__.py)
- [Web UI settings](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/mniplab/webserver/config.py)
- [Public package exports](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/mniplab/__init__.py)
- [Core `.env.example`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/.env.example)
