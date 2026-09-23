---
title: Static routing
description: Add explicit routes between networks in a Mininet-IPLab Lab.
---

<div class="channel-note">

**Development · core revision `a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a`.** The Stable `static-lab` source is also
available in [`v0.1.0`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/static-lab.py).

</div>

Static routing is the smallest routing feature: create the Nodes and Links, then add a route for each remote network.
The route belongs in the Lab Example, not in the learner's terminal.

## Add it to a Lab

Inside `build_network()`, after creating `r1`, `r2`, and their Links:

```python
r1.cmd('ip route add 192.168.2.0/24 via 10.10.1.2')
r2.cmd('ip route add 192.168.1.0/24 via 10.10.1.1')
```

The surrounding topology needs these addresses:

```python
net.addLink(r1, r2,
            params1={'ip': '10.10.1.1/30'},
            params2={'ip': '10.10.1.2/30'})
```

Use one route in each direction. A directly connected interface is not enough to reach the other Host's network.

## Verify it

Run the Lab, then inspect both route tables and test the path:

```bash
r1 vtysh -c 'show ip route 192.168.2.0/24'
r2 vtysh -c 'show ip route 192.168.1.0/24'
h1 ping -c 3 192.168.2.2
```

The route should show as static (`S`) and the ping should cross `h1 → r1 → r2 → h2`. For the complete runnable
topology, use the [`static-lab.py` source](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/examples/static-lab.py)
and its [`frr-config`](https://github.com/mininet-iplab/mininet-iplab/tree/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/frr-config/static-lab)
directory.

For the conceptual difference between a configured route and a Link Condition, change one existing Link in Web UI Mode
and compare the result with the route table above.
