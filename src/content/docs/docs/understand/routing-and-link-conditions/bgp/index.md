---
title: BGP
description: Learn how BGP exchanges reachability between autonomous systems.
---

<div class="channel-note">

**Stable · core v0.1.0.** This Guide uses the `bgp-lab` Lab Example and FRR BGP behavior from the `v0.1.0` core
release.

</div>

BGP exchanges reachability between Autonomous Systems (ASes). In a Lab, the AS boundary is a useful teaching seam:
the internal routing design can carry traffic inside an AS, while BGP peers exchange the networks that belong to
different ASes.

## Concept

The [`bgp-lab.py` source](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/bgp-lab.py) creates three
regions. Routers use BGP and OSPF together: OSPF supports internal paths, while the backbone Links connect the regions
with eBGP sessions. The three client networks are the prefixes you can follow across the AS boundaries.

This is a different question from the static-routing Lab. Static routing asks, “Which explicit next hop did the
Instructor configure?” BGP asks, “Which reachability information did a peer advertise, and which path did the Router
select?”

## Task: inspect a BGP session and a learned prefix

Start the Stable Lab in CLI Mode or Web UI Mode:

```bash
docker compose exec mniplab python3 examples/bgp-lab.py --enable-web
```

At the CLI prompt, inspect the BGP session and the IPv4 BGP table:

```bash
r11 vtysh -c 'show bgp summary'
r11 vtysh -c 'show bgp ipv4 unicast'
```

In a browser Terminal opened for `r11`, omit the leading `r11` and run the `vtysh -c ...` command itself.

Look for established peers and prefixes learned from another AS. Then test the resulting reachability from a client
Host, for example:

```bash
ping -c 3 172.18.1.2
```

The [exact Stable source](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/bgp-lab.py) is the
authority for the current Router names, addresses, AS configuration, and Links.

<div class="channel-note">

**Experimental · ExaBGP Speakers.** A Speaker is a Node that announces and withdraws routes on demand. ExaBGP is the
software used to implement that role. The [`v0.1.0` ExaBGP Lab Example](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/exabgp-lab.py)
is source-linked for exploration. The pinned source establishes release provenance; the Experimental label means ExaBGP
Speakers are not a Stable compatibility guarantee and are not required for this BGP learning path.

</div>

## Link change experiment

You can use a Link Condition to disconnect a BGP backbone Link and then inspect `show bgp summary` and `show bgp
ipv4 unicast` after convergence. The session and selected paths may change because the transport path changed. The
Link Condition remains an exercise-controlled change to the Link; it is not an advertised prefix or a BGP attribute.
