---
title: OSPF
description: Learn how OSPF discovers paths inside a routing domain.
---

<div class="channel-note">

**Stable · core v0.1.0.** This Guide uses the `ospf-lab` Lab Example and FRR OSPF behavior from the `v0.1.0` core
release.

</div>

OSPF is a dynamic routing protocol for learning paths inside one routing domain. Instead of writing every remote route
as a static entry, the Routers form adjacencies, exchange link-state information, and calculate reachable paths.

## Concept

The [`ospf-lab.py` source](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/ospf-lab.py) models three
regions joined by a triangular Router backbone. Each region has an internal shared segment and two client Hosts. The
OSPF process runs on the Routers, while the Hosts provide destinations whose reachability you can test.

The important observation is the source of the route. An OSPF route is learned through the protocol and can change when
the set or quality of Links changes. A static route is written into configuration and does not discover an alternate
path by itself.

## Task: observe adjacency and learned reachability

Start the Lab in CLI Mode or Web UI Mode:

```bash
docker compose exec mniplab python3 examples/ospf-lab.py --enable-web
```

At the CLI prompt, inspect the OSPF neighbor relationship and route table:

```bash
r1 vtysh -c 'show ip ospf neighbor'
r1 vtysh -c 'show ip route'
```

In a browser Terminal opened for `r1`, omit the leading `r1` and run the `vtysh -c ...` command itself.

The neighbor command should show the adjacent Routers after convergence. The route table should include OSPF-learned
paths to networks that are not directly attached to `r1`. From a client Host, test one of those paths:

```bash
ping -c 3 172.17.2.2
```

Use the exact topology and addresses in the [Stable `ospf-lab.py` source](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/ospf-lab.py)
when choosing another source and destination.

## Link change experiment

In Web UI Mode, select one backbone Link and disconnect it. Wait for OSPF to converge, then run the neighbor and route
commands again. If another path exists, traffic may continue through the alternate path; the changed route is a
consequence of the Link Condition and OSPF's response to it.

Do not label the disconnected Link as an OSPF route. The Link Condition changes connectivity; OSPF is the routing
protocol that reacts to that changed connectivity.

## What to remember

- **OSPF** learns and recalculates routes inside a routing domain.
- `show ip ospf neighbor` proves adjacency; `show ip route` shows the resulting forwarding state.
- A Link Condition is an exercise input. It can trigger protocol behavior, but it is not protocol state itself.
