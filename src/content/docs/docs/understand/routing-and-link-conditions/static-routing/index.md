---
title: Static routing
description: Learn how explicit routes carry traffic between routed networks.
---

<div class="channel-note">

**Stable · core v0.1.0.** This Guide uses the `static-lab` Lab Example and the static routes in the `v0.1.0` core
release.

</div>

Static routing makes the forwarding decision visible. A Router has a route to a remote network because the Lab's FRR
configuration contains that route; no routing-protocol neighbor relationship is needed to learn it.

## Concept

The [`static-lab.py` source](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/static-lab.py) creates
two Hosts and two Routers connected by three Links:

```text
h1 ── r1 ── r2 ── h2
```

`r1` has the directly connected `192.168.1.0/24` network and a static route to `192.168.2.0/24` through `10.10.1.2`.
`r2` has the reverse route through `10.10.1.1`. The route definitions are in the exact
[`r1` FRR configuration](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/frr-config/static-lab/r1/frr.conf)
and [`r2` FRR configuration](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/frr-config/static-lab/r2/frr.conf).

The route is different from a directly connected route: the destination network is beyond the next Router. If you
remove the static route, the Hosts still have interfaces and gateways, but traffic to the remote network has no
forwarding entry.

## Task: prove the route is doing the work

Start the Stable Lab as described in the [First Lab quickstart](/docs/getting-started/quickstart/), then use a Terminal
for `h1`:

```bash
ping -c 3 192.168.2.2
```

The replies show that traffic crossed all three Links. At the CLI prompt, inspect the route on each Router:

```bash
r1 vtysh -c 'show ip route 192.168.2.0/24'
r2 vtysh -c 'show ip route 192.168.1.0/24'
```

In a browser Terminal opened for `r1` or `r2`, omit the leading Node name and run only the `vtysh -c ...` command.

You should see a static (`S`) route on both Routers. Read the next hop as part of the observation: `r1` forwards the
remote network through `10.10.1.2`, while `r2` forwards it through `10.10.1.1`.

## What to remember

- The **Topology** supplies interfaces and Links; the route supplies the forwarding decision for a remote network.
- A static route does not discover a new path when the Topology changes. That is the contrast to OSPF and BGP.
- A Link Condition can make the existing `r1`–`r2` Link unavailable or slower, but it does not become a new route or
  change the route's protocol. Continue with [Link Conditions](/docs/understand/routing-and-link-conditions/link-conditions/)
  to test that distinction.

The executable source remains the [exact `v0.1.0` `static-lab.py` file](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/static-lab.py);
the documentation repository does not copy it.
