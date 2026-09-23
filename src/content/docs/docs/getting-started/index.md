---
title: Get Started
description: Prepare a host and find the first Mininet-IPLab workflow.
---

<div class="channel-note">

**Stable · core v0.1.0.** The commands on this page install and run the `v0.1.0` core release.

</div>

<p class="doc-lede">The supported first-success path is Docker Compose on a Linux-capable host, followed by the
<code>static-lab</code> example.</p>

## Choose your path

1. **Prepare the host.** Use [Prerequisites](/docs/getting-started/prerequisites/) to check a Linux-capable host,
   Docker Engine, Docker Compose, and Open vSwitch kernel modules on the host.
2. **Run the first Lab.** Follow the [Quick Start](/docs/getting-started/quickstart/) to start `static-lab`, prove
   traffic crosses the topology, and clean up.
3. **Teach a class.** Follow [Classroom deployment](/docs/getting-started/classroom/) to configure `.env`, start
   `mniplab serve`, and give Learners separate accounts.

### macOS and Windows

Mininet-IPLab does not run natively on macOS or Windows. Use a Linux VM, such as the Linux VM provided by Docker
Desktop, OrbStack, WSL2, or a similar option. The Linux-capable host, Docker, and Open vSwitch requirements above
apply to that VM; Docker Desktop or WSL2 is not native Mininet-IPLab support.

## Keep going

Once the first Lab works, use [How to create a Lab](/docs/build-labs/) to author an example or [Features](/docs/features/)
to add one exact capability. The [core `v0.1.0` source](https://github.com/mininet-iplab/mininet-iplab/tree/v0.1.0)
remains authoritative for runtime behavior and container configuration.
