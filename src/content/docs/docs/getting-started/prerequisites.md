---
title: Prerequisites
description: Prepare the Linux-capable host and container runtime before starting a Lab.
---

Start here. Mininet-IPLab runs in a container, but the container still depends on the host kernel for Linux network
namespaces, `veth` pairs, and Open vSwitch.

## Required before you begin

### 1. A 64-bit Linux-capable host

Use a 64-bit Linux host, or a Linux VM provided by Docker Desktop, OrbStack, WSL2, or a similar tool. Mininet-IPLab
does not run natively on macOS or Windows; the requirements on this page apply to the Linux VM instead.

### 2. Docker Engine and Docker Compose

Install Docker Engine and the Compose plugin. The container runs `privileged: true`, which Mininet needs for its network
namespaces. That gives it near-host access, so run it on a machine set aside for the lab, not one holding other work.

Verify both commands on the host:

```bash
docker info
docker compose version
```

### 3. Open vSwitch kernel modules on the host

Containers cannot provide kernel modules. Check the host, not the container:

```bash
lsmod | grep openvswitch
```

If there is no output, load the module:

```bash
sudo modprobe openvswitch
```

Only Labs that create switches require Open vSwitch; without it they stop at startup with a `NetworkError` naming the
missing module. The router-only `static-lab` works without it, but most larger topologies use switches. This is the most
common setup problem. To load the module after every reboot:

```bash
echo openvswitch | sudo tee /etc/modules-load.d/openvswitch.conf
```

## Tested platforms

`v0.1.0` is tested on **macOS on Apple silicon with OrbStack** (arm64), where every Lab and the integration and browser
test suites run, and on **GitHub's Ubuntu 24.04 runner** (amd64) for lint, type checks, and the unit suite. Running Labs
on amd64 has not been tested yet. Other 64-bit Linux hosts that meet these requirements should work; reports are
welcome.

## What you do not need to install manually

The Docker Compose image supplies Mininet (built in at a pinned commit, not from PyPI), FRR, ExaBGP, Kea, Knot DNS,
Unbound, Krill, Routinator, and the other runtime dependencies used by the core examples. Do not run the Lab directly on the host unless you intentionally install and support that full stack.

## Ready for the next step?

Continue to the [Quick Start](/docs/getting-started/quickstart/) to clone the `v0.1.0` core release, start the
container, and run `static-lab`.

For host packages, a dev container, and troubleshooting, see the core repository's
[`docs/install.md`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/docs/install.md).
