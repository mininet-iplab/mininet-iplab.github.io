---
title: VLANs and switches
description: Segment a switch into VLANs and route between them with Router sub-interfaces.
---

<div class="channel-note">

**Development · core revision `9c14a8fee2ac40ac430909e4c4390d39662f3c6c`.** This recipe follows the managed Open vSwitch
and Router sub-interface APIs.

</div>

A VLAN assigns switch ports to separate Layer 2 segments. To let Hosts in different VLANs communicate, connect a
Router to a trunk port and give it one addressed sub-interface per VLAN. The host must have a route via that address.

## Add it to a Lab

Create a switch and connect Host-facing access ports and a Router-facing trunk:

```python
s1 = net.addSwitch('s1')
r1 = net.addRouter('r1')
h1 = net.addHost('h1', ip='192.168.10.2/24', defaultRoute='via 192.168.10.1')
h2 = net.addHost('h2', ip='192.168.20.2/24', defaultRoute='via 192.168.20.1')

net.addLink(h1, s1, params2={'vlan': 10})
net.addLink(h2, s1, params2={'vlan': 20})
trunk = net.addLink(r1, s1, params2={'trunks': [10, 20]})

r1.add_subinterface(trunk.intf1, 10, ip='192.168.10.1/24')
r1.add_subinterface(trunk.intf1, 20, ip='192.168.20.1/24')
```

The `vlan` and `trunks` parameters belong on the switch end of each Link. Open vSwitch kernel modules must be loaded
on the host before starting a switch-based Lab. The complete
[`vlan-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/examples/vlan-lab.py)
also includes two Hosts in VLAN 10 so you can compare traffic within and between VLANs.

## Verify it

At the Lab prompt, run `show_vlans s1` to inspect port modes and tags. In Web UI Mode, select `s1` to view or change
its port configuration. From `h1`, run `ping -c 3 192.168.20.2`; successful replies show that `r1` routes between
the VLANs. See the [VLAN Lab Guide](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/examples/guides/vlan-lab.md)
for the same-VLAN and inter-VLAN checks.
