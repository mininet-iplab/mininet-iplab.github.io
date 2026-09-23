---
title: IPv4 and IPv6
description: Understand how address families change Lab authoring and observations.
---

<div class="channel-note">

**Stable · core v0.1.0.** These examples use the explicit IPv4 and IPv6 Lab authoring supported by the `v0.1.0` core
release.

</div>

IPv4 and IPv6 are separate address families. The routing idea is the same—Nodes need addresses, gateways, and routes—
but the address notation, interface configuration, and inspection commands change with the family.

## Authoring differences

For IPv4, a Host commonly uses `ip` and `defaultRoute`, and a Link interface uses `params1={'ip': ...}` or
`params2={'ip': ...}`. For IPv6, use the family-specific names:

```python
h1 = net.addHost(
    'h1',
    ip6='2001:db8:1::2/64',
    defaultRoute6='via 2001:db8:1::1',
)
net.addLink(h1, r1, params2={'ip6': '2001:db8:1::1/64'})
```

The documentation prefix `2001:db8::/32` is useful for examples. The [core `CREATE_LAB.md` IPv6 section](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/docs/CREATE_LAB.md#ipv6-support)
describes the supported address allocation and the `ip6`/`defaultRoute6` authoring names.

## Task: compare the two route tables

The [`static-lab-ipv6.py` source](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/static-lab-ipv6.py)
uses two Hosts and two Routers with IPv6-only addresses. Start it in Web UI Mode:

```bash
docker compose exec mniplab python3 examples/static-lab-ipv6.py --enable-web
```

From `h1`, test the remote Host with IPv6 ping and inspect the Router's IPv6 route table:

```bash
ping -6 -c 3 2001:db8:2::2
r1 ip -6 route
r1 vtysh -c 'show ipv6 route'
```

The corresponding IPv4 task uses `ping` and `show ip route`; the IPv6 task uses `ping -6` and `show ipv6 route`.
Seeing a Link and a Node in the Topology is not enough to prove reachability: the address family and the route must
match on both sides.

## What to remember

- Put the address family in the Host and Link configuration; do not assume an IPv4 address creates an IPv6 route.
- Use family-specific route inspection when a task is about IPv6.
- IPv6 Link Conditions still affect the Link's traffic. They do not convert an IPv6 route into an IPv4 route or change
  the routing protocol that installed it.
