---
title: Features
description: Add routing, services, VLANs, NAT, and Web UI observation to a Lab.
---

Once a basic Lab works, add one capability at a time. Every feature page answers the same three questions:

1. **Where does it attach?** The authoring call, runtime setting, or Web UI action that enables it.
2. **What else must the Lab contain?** Required Nodes, Links, addresses, or server configuration.
3. **How do you verify it?** A command or observation that proves the feature is active.

The executable examples live in the [core repository](https://github.com/mininet-iplab/mininet-iplab/tree/v0.1.0/examples).
These pages explain the authoring seam without copying a complete Lab Example into the site. To see every shipped
Lab running, browse the [Lab Example catalog](/docs/lab-examples/).

## Choose a feature

### Routing

| Feature | Add it with | What it demonstrates |
| --- | --- | --- |
| [Static routing](/docs/features/static-routing/) | Router route commands or FRR config | Explicit next hops between networks |
| [OSPF](/docs/features/ospf/) | `addRouter(proto='OSPF')` and FRR config | Dynamic intra-domain route learning |
| [BGP](/docs/features/bgp/) | `addRouter(proto='BGP')` and FRR config | Reachability between Autonomous Systems, path selection, and multipath |
| [RIP and other FRR protocols](/docs/features/other-protocols/) | `addRouter(proto='RIP')`, `proto='OSPF6'`, and more | Any FRR daemon, one Router at a time |
| [ExaBGP](/docs/features/exabgp/) | `net.addExaBGP(...)` | Experimental route injection from a Speaker |

### Addressing and switching

| Feature | Add it with | What it demonstrates |
| --- | --- | --- |
| [IPv4 and IPv6](/docs/features/ipv6/) | `ip`/`ip6` and family-specific Link params | Dual-stack or IPv6-only addressing |
| [VLANs and switches](/docs/features/vlans/) | Switch port `vlan`/`trunks` and Router sub-interfaces | Layer 2 segmentation and inter-VLAN routing |
| [NAT and the NAT Table](/docs/features/nat/) | `net.addNAT(...)` or `net.addTransit(...)` | Masquerading and translated connections |

### Network Services

| Feature | Add it with | What it demonstrates |
| --- | --- | --- |
| [DHCP](/docs/features/dhcp/) | `node.addService(DHCPService(...))` | Address allocation, Leases, and Reservations |
| [DHCPv6](/docs/features/dhcpv6/) | An IPv6 `Pool`, `dhcp6=True`, and Router Advertisement flags | Stateful and stateless IPv6 configuration |
| [DHCP Relay](/docs/features/dhcp-relay/) | `router.addRelay(Relay(...))` | One central DHCP Service serving remote Subnets |
| [Authoritative DNS](/docs/features/dns/) | `node.addService(DNSService(...))` | Authoritative Zones and client resolution |
| [Secondary nameserver](/docs/features/dns-secondary/) | `SecondaryZone(..., primary=...)` | Zone Transfer, Notify, and SOA timers |
| [Recursive Resolver](/docs/features/dns-resolver/) | `node.addService(ResolverService(...))` | Iterative resolution, caching, and Access Control |
| [DNSSEC](/docs/features/dnssec/) | `Zone(..., dnssec=True)` and a validating Resolver | Signed Zones and chain-of-trust validation |

### Nodes

| Feature | Add it with | What it demonstrates |
| --- | --- | --- |
| [Container Hosts](/docs/features/container-hosts/) | `net.addContainer(...)` | Real application software as a Lab Node |

### Web UI and observation

| Feature | Add it with | What it demonstrates |
| --- | --- | --- |
| [Web UI Mode](/docs/features/web-ui/) | `run_lab(..., enable_web=args.enable_web)` | Browser Topology, Node Terminals, Guides, and Service panels |
| [Link Conditions](/docs/features/link-conditions/) | Select a Link in Web UI Mode, or `link_config` | Delay, jitter, loss, bandwidth, disconnect, and reconnect |
| [Packet Capture](/docs/features/packet-capture/) | Select a Node Interface or Link in Web UI Mode | Protocol exchanges, decoded fields, and a downloadable pcap |
| [Lab Prompt](/docs/features/lab-prompt/) | **Lab Prompt** in the Web UI header, or CLI Mode | Network-wide commands such as `show_ips`, `show_routes`, and `show_leases` |

### Classroom

| Feature | Add it with | What it demonstrates |
| --- | --- | --- |
| [Classroom deployment](/docs/getting-started/classroom/) | `mniplab serve` and `MNIPLAB_USERS` | One shared Lab for an Instructor and Learners |
| [Multi-Lab Mode](/docs/features/multi-lab/) | `MNIPLAB_LAB_MODE=multi` with `mniplab serve` | A separate Lab and Assignment for each Group |
| [Persistent Config](/docs/build-labs/persistent-config/) | `addRouter(..., frr_dir=...)` | Router configuration that survives a restart |

## The composition rule

Add a feature at the layer that owns its behavior:

- **Topology:** `addRouter`, `addHost`, `addSwitch`, `addContainer`, `addExaBGP`, `addNAT`, and `addLink` create the
  Lab shape.
- **Routing:** Router protocol arguments, `add_frr_config`, and route commands create forwarding behavior.
- **Switching:** Switch port VLANs and Router sub-interfaces determine Layer 2 segments and their gateways.
- **Services:** `node.addService(...)` attaches DHCP, DNS, or Resolver behavior to an existing Node, and
  `node.addRelay(...)` forwards DHCP for a remote Subnet. A Service is not a new Node type.
- **Runtime mode:** `run_lab(..., enable_web=args.enable_web)` selects CLI Mode or optional Web UI Mode for the same
  Lab Example.
- **Observation:** Link Conditions, Packet Capture, the NAT Table, Service panels, and the Lab Prompt act on a running
  Lab without changing its Topology.
- **Classroom:** `mniplab serve` and `MNIPLAB_LAB_MODE` choose whether Groups share a Lab or run separate Labs.

Author Lab behavior in the core repository's Lab Example, then link to its source here.

## Before you add anything

Finish [Prerequisites](/docs/getting-started/prerequisites/), run the [Quick Start](/docs/getting-started/quickstart/),
and follow [Create a Lab](/docs/build-labs/) to establish `build_network()` first. If the basic Lab does not start,
feature errors are harder to distinguish from host setup errors.
