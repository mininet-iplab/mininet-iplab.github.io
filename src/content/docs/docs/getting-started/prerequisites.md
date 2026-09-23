---
title: Prerequisites
description: Prepare the Linux-capable host and container runtime before starting a Lab.
---

<div class="channel-note">

**Stable · core v0.1.0.** These requirements apply to the supported Stable installation path.

</div>

Start here. Mininet-IPLab runs in a container, but the container still depends on the host kernel for Linux network
namespaces, `veth` pairs, and Open vSwitch.

## Required before you begin

### 1. A 64-bit Linux-capable host

Use a 64-bit Linux host, or a Linux VM provided by Docker Desktop, OrbStack, WSL2, or a similar tool. Mininet-IPLab
does not run natively on macOS or Windows; the requirements on this page apply to the Linux VM instead.

### 2. Docker Engine and Docker Compose

Install Docker Engine and the Compose plugin. The container runs with the elevated privileges Mininet needs to create
network namespaces, so this is expected in the local development setup.

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

Only Labs that create switches require Open vSwitch. The router-only `static-lab` works without it, but most larger
topologies use switches. To load it after every reboot, add `openvswitch` to the host's modules-load configuration.

## What you do not need to install manually

The Docker Compose image supplies Mininet, FRR, ExaBGP, DHCP, DNS, and the other runtime dependencies used by the
core examples. Do not run the Lab directly on the host unless you intentionally install and support that full stack.

## Ready for the next step?

Continue to the [Quick Start](/docs/getting-started/quickstart/) to clone the Stable core release, start the
container, and run `static-lab`.

For host packages, a dev container, and troubleshooting, see the core repository's
[`docs/install.md`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/docs/install.md).
