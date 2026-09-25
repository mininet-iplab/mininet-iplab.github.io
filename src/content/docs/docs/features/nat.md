---
title: NAT
description: Add a masquerading gateway and inspect translated connections in a Lab.
---

<div class="channel-note">

**Development · core revision `9c14a8fee2ac40ac430909e4c4390d39662f3c6c`.** This recipe follows the current
NAT gateway and NAT Table behavior.

</div>

`addNAT()` creates a hidden gateway that connects a Lab to networks outside its emulated Topology. The Router on the
Lab side translates traffic on its NAT-facing Interface. For an ISP path through a Speaker, `addTransit()` also
configures the downstream Router and the Speaker's route toward the gateway.

## Add it to a Lab

Create the gateway and explicitly link it to a Router. Unlike Mininet's built-in `addNAT()`, Mininet-IPLab does not
attach this gateway to a switch automatically:

```python
r1 = net.addRouter('r1')
nat1 = net.addNAT('nat1', subnet='100.64.0.0/23', ip='100.64.0.1/24')
net.addLink(nat1, r1, params2={'ip': '100.64.0.2/24'})
```

The Router also needs Host-facing Links and addresses. For a transit scenario, use `net.addTransit('nat1',
downstream=isp1, ip='192.168.0.1/30')` and link that gateway to an ExaBGP Speaker. Follow the complete
[`bgp-nat-isp-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/examples/bgp-nat-isp-lab.py)
for the Speaker, ISP, and customer Links; see also the simpler
[`static-lab-nat.py`](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/examples/static-lab-nat.py).

## Verify it

In Web UI Mode, send traffic from a Host across the translating Router, then select that Router and open **NAT
Table**. An entry shows the inside and outside addresses, connection state, and time until expiry. Capture the
Router's Interfaces on both sides to see the source address change. The
[BGP 2 ISP Lab Guide](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/examples/guides/bgp-nat-isp-lab.md#nat-and-the-nat-table)
walks through this comparison with concrete addresses.
