---
title: Routing and Link Conditions
description: Learn how routing state and Link Conditions shape a Mininet-IPLab Lab.
---

<div class="channel-note">

**Stable · core v0.1.0.** The Lab Examples and observations in this learning path use the `v0.1.0` core release.

</div>

This learning path moves from the simplest route to a protocol-driven Lab, then changes the behavior of an existing
Link. Follow it in order if you are new to routing in Mininet-IPLab; use the individual pages as task-oriented Guides
once you know the model.

## The path

| Step | What you learn | Lab Example |
| --- | --- | --- |
| 1. [Static routing](/docs/understand/routing-and-link-conditions/static-routing/) | A Router forwards to a remote network because an explicit route is present. | [`static-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/static-lab.py) |
| 2. [OSPF](/docs/understand/routing-and-link-conditions/ospf/) | Routers form adjacencies and learn paths inside one routing domain. | [`ospf-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/ospf-lab.py) |
| 3. [BGP](/docs/understand/routing-and-link-conditions/bgp/) | Autonomous Systems exchange reachability across an inter-domain topology. | [`bgp-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/bgp-lab.py) |
| 4. [IPv4 and IPv6](/docs/understand/routing-and-link-conditions/ip-addressing/) | Address families change the addresses, route commands, and observations in a Lab. | [`static-lab-ipv6.py`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/static-lab-ipv6.py) |
| 5. [Link Conditions](/docs/understand/routing-and-link-conditions/link-conditions/) | A Learner changes an existing Link's availability or quality and observes the consequence. | [`static-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/static-lab.py) in Web UI Mode |

## Maturity labels

- **Stable** means the behavior is documented for ordinary use in the `v0.1.0` Stable channel.
- **Experimental** means the capability is usable but may change. **ExaBGP Speakers** are Experimental; they are a
  kind of BGP-speaking Node used to announce routes, not a requirement for the BGP page in this path. See the
  [`v0.1.0` ExaBGP Lab Example](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/exabgp-lab.py). The
  pinned link records that the source exists in this release; the Experimental label means it is not a Stable
  compatibility guarantee.
- **Development** means there is not yet enough verified guidance for a Stable promise. A Development label does not
  make the behavior part of this Stable learning path.

Every source link above is pinned to `v0.1.0`. The executable Lab Examples remain in the core repository; this site
keeps the learner-facing concepts and observations here.

## Before you begin

Complete the [First Lab quickstart](/docs/getting-started/quickstart/) first. It prepares the Linux-capable host and
shows how to start a Lab in CLI Mode or Web UI Mode. The [Lab model overview](/docs/understand/) explains why a Link
Condition changes an existing Link without changing the Lab's Topology.
