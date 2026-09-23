---
title: First Lab quickstart
description: Run and observe the canonical static-routing Lab Example.
---

<div class="channel-note">

**Stable · core v0.1.0.** This Guide uses the `v0.1.0` core release and its `static-lab` Lab Example.

</div>

Use `static-lab` as the first successful Lab. It is deliberately small: two Hosts, two Routers, and three Links
demonstrate how manually configured routes carry traffic between two networks. Start with the [Stable installation
path](/docs/getting-started/) if you have not prepared a Linux-capable host, Docker Engine, Docker Compose, and the
Open vSwitch kernel modules yet.

## 1. Get the Stable source

Clone the `v0.1.0` core repository and enter its directory:

```bash
git clone --branch v0.1.0 https://github.com/mininet-iplab/mininet-iplab.git
cd mininet-iplab
```

Build and start the Compose service:

```bash
docker compose build
docker compose up -d
```

The Compose service is privileged because Mininet creates network namespaces. Keep Docker running while the Lab is
active.

## 2. Start `static-lab`

Run the Lab in Web UI Mode:

```bash
docker compose exec mniplab python3 examples/static-lab.py --enable-web
```

Open [http://localhost:8050](http://localhost:8050), then sign in with the local-development defaults:

- Username: `admin`
- Password: `changeme123`

These defaults are for local use. Change them before sharing a Web UI deployment. Leave the command running while
you inspect the Lab.

The executable source stays in the core repository. Open the exact [`v0.1.0` `static-lab.py` source](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/static-lab.py) to compare the recipe with the running Lab; this documentation site does not copy it.

## 3. Guide: observe the route

The Lab has this shape:

| Node | Interfaces and addresses | Role |
| --- | --- | --- |
| `h1` | `192.168.1.2/24`, gateway `192.168.1.1` | Source Host |
| `r1` | `192.168.1.1/24`, `10.10.1.1/30` | Router for the `192.168.1.0/24` network |
| `r2` | `10.10.1.2/30`, `192.168.2.1/24` | Router for the `192.168.2.0/24` network |
| `h2` | `192.168.2.2/24`, gateway `192.168.2.1` | Destination Host |

In Web UI Mode, confirm that the Topology shows `h1`, `r1`, `r2`, and `h2` joined in that order. Then open a Terminal
for `h1` and run:

```bash
ping -c 3 192.168.2.2
```

The Host should receive replies from `h2`. The packet crosses the `h1`–`r1`, `r1`–`r2`, and `r2`–`h2` Links. The
destination network is not directly connected to `r1`, so `r1` uses its static route through `10.10.1.2`.

Open a Terminal for each Router and inspect the corresponding route:

```bash
# On r1
vtysh -c 'show ip route 192.168.2.0/24'

# On r2
vtysh -c 'show ip route 192.168.1.0/24'
```

Each Router should show a static route (`S`) through the other Router: `r1` via `10.10.1.2`, and `r2` via
`10.10.1.1`. This is the lesson in the first Lab: connectivity works because the route to the remote network was
configured explicitly. No routing-protocol neighbor relationship is required.

For the same Lab in CLI Mode, stop the Web UI process with `exit`, then run:

```bash
docker compose exec mniplab python3 examples/static-lab.py
```

At the `mininet-iplab>` prompt, try `nodes`, `net`, and `pingall`. Type `exit` when you are finished with the Lab.

## Troubleshooting

### Docker or Compose is unavailable

Run `docker info` and `docker compose version` on the host. Start Docker Engine if the daemon is unavailable, and make
sure your account can access the Docker socket. If Compose cannot find the service, run the commands from the cloned
core repository directory and check `docker compose ps`.

### Open vSwitch is missing

Open vSwitch kernel modules belong to the Linux-capable host, not the container. Check and load the module on the host:

```bash
lsmod | grep openvswitch
sudo modprobe openvswitch
```

If the module cannot be loaded inside a Linux VM, configure the VM with a kernel that provides Open vSwitch modules.
The `static-lab` Topology does not add a switch, but other Lab Examples depend on this host capability.

### The Web UI does not open

Check that the service is running with `docker compose ps`, that the `static-lab` command is still attached, and that
port `8050` is not already in use. A stopped or interrupted run can be restarted with:

```bash
docker compose down --remove-orphans
docker compose up -d
```

Then run the `static-lab` command again. Do not expose the default credentials outside local development.

### A previous Lab left resources behind

After an interrupted run, clean the Lab inside the service before starting another one:

```bash
docker compose exec mniplab python -m mniplab cleanup
docker compose down --remove-orphans
```

The cleanup command removes the core runtime's leftover routing processes and network namespaces. Use it after an
abnormal exit; a normal `exit` from the `mininet-iplab>` prompt performs the Lab shutdown path first.

## Stop the service

After exiting the Lab, stop the Compose service when you no longer need it:

```bash
docker compose down
```

The [Stable `v0.1.0` source tree](https://github.com/mininet-iplab/mininet-iplab/tree/v0.1.0) remains authoritative for
the executable example, Compose configuration, and runtime behavior.
