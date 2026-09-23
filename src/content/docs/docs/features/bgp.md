---
title: BGP
description: Add BGP sessions and inter-domain route exchange to a Lab.
---

<div class="channel-note">

**Development · core revision `a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a`.** This page describes the current FRR-backed
BGP authoring pattern.

</div>

BGP needs two BGP Routers, an addressed Link between their peers, an AS number on each Router, and a `network`
statement for every prefix that should be advertised.

## Add it to a Lab

Enable BGP on the Routers:

```python
r1 = net.addRouter('r1', proto='BGP')
r2 = net.addRouter('r2', proto='BGP')

net.addLink(r1, r2,
            params1={'ip': '10.10.1.1/30'},
            params2={'ip': '10.10.1.2/30'})
```

Configure each side with the other side's address and AS:

```python
r1.add_frr_config('''
router bgp 65001
 bgp router-id 1.1.1.1
 neighbor 10.10.1.2 remote-as 65002
 address-family ipv4 unicast
  network 192.168.1.0/24
 exit-address-family
exit
''')

r2.add_frr_config('''
router bgp 65002
 bgp router-id 2.2.2.2
 neighbor 10.10.1.1 remote-as 65001
 address-family ipv4 unicast
  network 192.168.2.0/24
 exit-address-family
exit
''')
```

The advertised networks must exist in the Router's route table. Add Host-facing Links or other route sources before
expecting BGP to announce them.

## Verify it

Inspect the session, then the learned BGP table:

```bash
r1 vtysh -c 'show bgp summary'
r1 vtysh -c 'show bgp ipv4 unicast'
```

Use [`bgp-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/examples/bgp-lab.py)
for a complete multi-AS example. Use the source example to compare the configuration with the observed session and
learned prefixes.
