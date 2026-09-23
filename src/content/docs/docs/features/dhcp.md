---
title: DHCP
description: Add an IPv4 or IPv6 DHCP Service and client interface to a Lab.
---

<div class="channel-note">

**Development · core revision `a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a`.** This page follows the current Kea-backed
DHCP authoring surface.

</div>

DHCP has two separate authoring steps: attach a `DHCPService` with one `Pool` per served Subnet, then mark a client
interface as a DHCP client. The framework does not acquire a Lease for the Learner automatically.

## Add it to a Lab

Attach the Service to a Router or Host:

```python
from mniplab.dhcp import DHCPService, Pool

r1.addService(DHCPService(
    Pool(
        cidr='10.50.0.0/24',
        start='10.50.0.100',
        end='10.50.0.200',
    ),
))
```

On the client side of a Link, use `dhcp4=True` instead of a static IPv4 address:

```python
h1 = net.addHost('h1')
net.addLink(
    r1,
    h1,
    params1={'ip': '10.50.0.1/24'},
    params2={'dhcp4': True},
)
```

The `Pool.cidr` must match the client's Subnet. To serve a remote Subnet, keep the Pool on the central Service and
add a `Relay` on the Router facing that client; see the core [`DHCP.md` relay section](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/docs/DHCP.md#serving-remote-subnets-with-dhcp-relay).

For DHCPv6, use an IPv6 Pool and `dhcp6=True`:

```python
net.addLink(
    r1,
    h1,
    params1={'ip6': '2001:db8:1::1/64'},
    params2={'dhcp6': True},
)
```

## Verify it

Run a client inside `h1` after the Lab starts:

```bash
dhcpcd -1 -B -d -4 h1-eth0
```

Then inspect the Lease table with `show_leases r1` or the Web UI Service panel. The complete example is
[`dhcp-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/examples/dhcp-lab.py).
