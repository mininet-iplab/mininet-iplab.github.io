---
title: DNS
description: Add an authoritative Zone or recursive Resolver to a Lab.
---

<div class="channel-note">

**Development · core revision `a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a`.** This page follows the current Knot DNS and
Unbound-backed Service APIs.

</div>

DNS is added as a Service on an existing Node. An authoritative Service hosts a Zone; a Resolver Service queries the
hierarchy or forwards queries for client Hosts.

## Add it to a Lab

### Add an authoritative DNS Service

Create a DNS Host, give it an address, and attach a Zone:

```python
from mniplab.dns import ARecord, CNAMERecord, DNSService, Zone

dns1 = net.addHost('dns1', ip='10.0.0.2/24', defaultRoute='via 10.0.0.1')
dns1.addService(DNSService(Zone(
    'example.com.',
    [
        ARecord('web', '10.0.2.2'),
        CNAMERecord('alias', 'web.example.com.'),
    ],
    host_node='dns1',
)))
```

Point client Hosts at that Node with `nameservers`:

```python
h1 = net.addHost(
    'h1',
    ip='10.0.1.2/24',
    defaultRoute='via 10.0.1.1',
    nameservers=['10.0.0.2'],
)
```

The `nameservers` setting gives the emulated Host its own resolver configuration; it does not change the machine
running the Lab.

### Add a recursive Resolver

Attach `ResolverService` to a Host or Router. For an in-Lab iterative lesson, seed it with a Root Hint:

```python
from mniplab.resolver import ResolverService

res1.addService(ResolverService(root_hints=[root1]))
```

Use `forwarders=[...]` instead when the lesson is about forwarding rather than an in-Lab Root → TLD → Authoritative
walk.

## Verify it

From a client Terminal:

```bash
dig web.example.com
ping web.example.com
```

Inspect a Service with `show_dns dns1`, or use the Web UI DNS panel. See the complete [`DNS.md`](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/docs/DNS.md)
and [`dns-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/examples/dns-lab.py).
