---
title: Get Started
description: Prepare a host and find the first Mininet-IPLab workflow.
---

<div class="channel-note">

**Stable · core v0.1.0.** The commands on this page install and run the `v0.1.0` core release.

</div>

Mininet-IPLab runs in a container. The supported first-success path uses Docker Compose on a Linux-capable host and
then runs `static-lab`, the canonical first Lab Example.

Continue to the [First Lab quickstart](/docs/getting-started/quickstart/) for the complete run-and-observe Guide.

## Before you install

Check these requirements before building the image:

- **A Linux-capable host.** Mininet uses Linux network namespaces and `veth` pairs. A 64-bit Linux host is the direct
  path.
- **Docker Engine and Docker Compose.** The container needs the Compose plugin and elevated privileges for Mininet’s
  network namespace operations.
- **Open vSwitch kernel modules on the host.** Containers share the host kernel and cannot provide its modules. Check
  the host with `lsmod | grep openvswitch`; if it is missing, load it with `sudo modprobe openvswitch`. Labs that
  create switches depend on this module, so prepare it even though the router-only `static-lab` does not create a
  switch.

### macOS and Windows

Mininet-IPLab does not run natively on macOS or Windows. Use a Linux VM, such as the Linux VM provided by Docker
Desktop, OrbStack, WSL2, or a similar option. The Linux-capable host, Docker, and Open vSwitch requirements above
apply to that VM; Docker Desktop or WSL2 is not native Mininet-IPLab support.

## Build and run `static-lab`

Clone the Stable core release, build its container image, and start the container:

```bash
git clone --branch v0.1.0 https://github.com/mininet-iplab/mininet-iplab.git
cd mininet-iplab
docker compose build
docker compose up -d
```

Run the first Lab in Web UI Mode:

```bash
docker compose exec mniplab python3 examples/static-lab.py --enable-web
```

Open [http://localhost:8050](http://localhost:8050) to view the running Lab and sign in with the local-development
defaults `admin` / `changeme123`. For CLI Mode, omit `--enable-web` from the command. Change the defaults before
sharing a Web UI deployment.

If the container or Lab stops unexpectedly, run the cleanup command before trying again:

```bash
docker compose exec mniplab python -m mniplab cleanup
```

The [core `v0.1.0` source](https://github.com/mininet-iplab/mininet-iplab/tree/v0.1.0) remains authoritative for the
executable Lab Example and container configuration.
