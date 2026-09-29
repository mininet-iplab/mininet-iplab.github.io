---
title: RIP and other FRR protocols
description: Enable RIP, OSPFv3, IS-IS, BFD, or any other FRR daemon on a Router.
---

Every Router is an FRR Router, and `proto` chooses which FRR daemons it runs. OSPF and BGP have their own pages; the
same pattern enables any other daemon FRR ships.

## Add it to a Lab

Name the protocol when you add the Router, then configure it with `add_frr_config`. This is the RIP core from
`dns-secondary-lab`, with classroom timers so a change converges in seconds rather than minutes:

```python
r1 = net.addRouter('r1', proto='RIP')
r2 = net.addRouter('r2', proto='RIP')
core = net.addLink(r1, r2,
                   params1={'ip': '10.0.0.1/30'},
                   params2={'ip': '10.0.0.2/30'})

r1.add_frr_config(
    'router rip\n'
    ' version 2\n'
    ' timers basic 5 15 10\n'
    ' passive-interface default\n'
    f' no passive-interface {core.intf1.name}\n'
    ' network 10.0.0.0/30\n'
    ' network 10.0.1.0/24'
)
```

Only the core Link speaks RIP: every interface is passive except the one the Link reports, named through
`core.intf1.name` rather than a hard-coded `r1-eth0`, because interface numbers follow the order Links are added.

Combine protocols with a comma, as the BGP Labs do for an OSPF underlay: `proto='BGP,OSPF'`.

| `proto` | FRR daemon |
| --- | --- |
| `OSPF` | `ospfd` |
| `OSPF6`, `OSPFv3` | `ospf6d` |
| `BGP` | `bgpd` |
| `RIP`, `RIPv2` | `ripd` |
| `RIPNG`, `RIPv6` | `ripngd` |
| `ISIS`, `IS-IS` | `isisd` |
| `EIGRP` | `eigrpd` |
| `BABEL` | `babeld` |
| `BFD` | `bfdd` |
| `PIM`, `PIM6` | `pimd`, `pim6d` |
| `LDP` | `ldpd` |
| `NHRP` | `nhrpd` |
| `PBR` | `pbrd` |
| `FABRIC` | `fabricd` |
| `SHARP` | `sharpd` |

A daemon can also be enabled after the Router exists with `r1.enable_daemon('ripd')`. Only RIP, OSPF, and BGP ship
with a Lab Example; the others are enabled the same way but have no Guide yet.

## Verify it

Inspect the protocol's own state with `vtysh`:

```bash
r1 vtysh -c 'show ip rip'
r1 vtysh -c 'show ip route rip'
```

Routes learned by RIP show as `R` in the route table. Disconnect the core Link as a
[Link Condition](/docs/features/link-conditions/) and watch the route time out after the `timeout` timer, then
return after you reconnect it.
