---
title: Features
description: Add routing, services, VLANs, NAT, packet capture, and classroom modes to a Lab.
---

<div class="channel-note">

**Development · additions checked against core revision `9c14a8fee2ac40ac430909e4c4390d39662f3c6c`.** Individual recipes
identify the revision they describe. Check each recipe's pinned source when you need release-specific behavior.

</div>

Once a basic Lab works, add one capability at a time. Every feature page answers the same three questions:

1. **Where does it attach?** The authoring call, runtime setting, or Web UI action that enables it.
2. **What else must the Lab contain?** Required Nodes, Links, addresses, or server configuration.
3. **How do you verify it?** A command or observation that proves the feature is active.

The executable examples remain in the [core repository](https://github.com/mininet-iplab/mininet-iplab/tree/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/examples).
These pages explain the authoring seam without copying a complete Lab Example into the site.

## Choose a feature

| Feature | Add it with | What it demonstrates |
| --- | --- | --- |
| [Static routing](/docs/features/static-routing/) | Router route commands or FRR config | Explicit next hops between networks |
| [OSPF](/docs/features/ospf/) | `addRouter(proto='OSPF')` and FRR config | Dynamic intra-domain route learning |
| [BGP](/docs/features/bgp/) | `addRouter(proto='BGP')` and FRR config | Reachability between Autonomous Systems |
| [IPv4 and IPv6](/docs/features/ipv6/) | `ip`/`ip6` and family-specific Link params | Dual-stack or IPv6-only addressing |
| [VLANs and switches](/docs/features/vlans/) | Switch port `vlan`/`trunks` and Router sub-interfaces | Layer 2 segmentation and inter-VLAN routing |
| [NAT](/docs/features/nat/) | `net.addNAT(...)` or `net.addTransit(...)` | Masquerading and translated connections |
| [DHCP](/docs/features/dhcp/) | `node.addService(DHCPService(...))` | Address allocation and Relay behavior |
| [DNS](/docs/features/dns/) | `node.addService(DNSService(...))` | Authoritative Zones and client resolution |
| [DNSSEC](/docs/features/dnssec/) | `Zone(..., dnssec=True)` and a validating Resolver | Signed Zones and chain-of-trust validation |
| [Container Hosts](/docs/features/container-hosts/) | `net.addContainer(...)` | Real application software as a Lab Node |
| [ExaBGP](/docs/features/exabgp/) | `net.addExaBGP(...)` | Experimental route injection from a Speaker |
| Web UI Mode | `run_lab(..., enable_web=args.enable_web)` | Browser topology, Node Terminals, and the Lab Prompt |
| Link Conditions | Existing Links in Web UI Mode | Learner-controlled delay, loss, bandwidth, disconnect, and reconnect |
| [Packet Capture](/docs/features/packet-capture/) | Select a Node Interface or Link in Web UI Mode | Inspect protocol exchanges and download a pcap |
| [Multi-Lab Mode](/docs/features/multi-lab/) | `MNIPLAB_LAB_MODE=multi` with `mniplab serve` | A separate Lab and Assignment for each Group |

## The composition rule

Add a feature at the layer that owns its behavior:

- **Topology:** `addRouter`, `addHost`, `addSwitch`, `addContainer`, `addNAT`, and `addLink` create the Lab shape.
- **Routing:** Router protocol arguments, `add_frr_config`, and route commands create forwarding behavior.
- **Switching:** Switch port VLANs and Router sub-interfaces determine Layer 2 segments and their gateways.
- **Services:** `node.addService(...)` attaches DHCP, DNS, or Resolver behavior to an existing Node. A Service is not
  a new Node type.
- **Runtime mode:** `run_lab(..., enable_web=args.enable_web)` selects CLI Mode or optional Web UI Mode for the same
  Lab Example.
- **Observation:** Packet Capture and the NAT Table inspect a running Lab from Web UI Mode.
- **Classroom:** `mniplab serve` and `MNIPLAB_LAB_MODE` choose whether Groups share a Lab or run separate Labs.

Author Lab behavior in the core repository's Lab Example, then link to its exact source revision here. Runtime
controls such as Packet Capture and Multi-Lab Mode use the existing Lab Example without changing its Topology.

## Features that do not add Nodes

Some capabilities are runtime controls rather than new Topology objects.

### Web UI Mode

Keep the same `build_network()` and select the browser surface in the standard runner:

```python
args = parse_lab_args('My Lab')
run_lab(
    build_network(),
    enable_web=args.enable_web,
    web_host=args.web_host,
    web_port=args.web_port,
    log_level=args.log_level,
)
```

Learners open the topology and Node Terminals in the browser. The Instructor can also open the **Lab Prompt** to run
network-wide CLI commands such as `show_ips` and `link_config` without leaving the browser. CLI Mode and Web UI Mode
exercise the same Lab.
See [Classroom deployment](/docs/getting-started/classroom/) for `mniplab serve`, `.env`, and multi-user roles, or
use the core repository's [Web UI guide](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/docs/web-ui.md)
for the interface workflow.

### Link Conditions

There is no `addLinkCondition()` authoring call. A Link Condition changes an existing Link while the Lab is running.
Start the Lab with `--enable-web`, select a Link, and use the Web UI controls to disconnect, reconnect, or configure
delay, loss, or bandwidth. It does not add a Node, create a Link, or install a route. The Lab prompt also offers
[`link_config`](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/mniplab/cli.py#L484)
for delay, jitter, loss, and bandwidth.

## Before you add anything

Finish [Prerequisites](/docs/getting-started/prerequisites/), run the [Quick Start](/docs/getting-started/quickstart/),
and follow [Create a Lab](/docs/build-labs/) to establish `build_network()` first. If the basic Lab does not start,
feature errors are harder to distinguish from host setup errors.
