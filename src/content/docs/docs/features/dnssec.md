---
title: DNSSEC
description: Add signed Zones and a validating Resolver to a Lab.
---

<div class="channel-note">

**Development · core revision `a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a`.** DNSSEC is an extension of the DNS Service;
use the current source-linked example for the full hierarchy.

</div>

DNSSEC has two sides: a Primary Zone signs records, and a Resolver validates the chain using a Trust Anchor. A signed
Zone by itself does not prove that a client is validating responses.

## Add it to a Lab

Mark the authoritative Zone as signed:

```python
from mniplab.dns import ARecord, DNSService, Zone

example_zone = Zone(
    'example.com.',
    [
        ARecord('web', '10.0.6.100'),
        ARecord('mail', '10.0.3.2'),
    ],
    host_node='auth1',
    dnssec=True,
)
auth1.addService(DNSService(example_zone))
```

Attach a validating Resolver and give it the Root Host as a Trust Anchor:

```python
from mniplab.resolver import ResolverService

res1.addService(ResolverService(
    root_hints=[root1],
    trust_anchors=[root1],
))
```

The complete DNSSEC Lab also declares signed Root and `com.` Zones, DS records between parents and children, and a
Secondary. Use that source rather than inventing a partial hierarchy when the lesson is about delegation.

## Verify it

From the client Host, ask for DNSSEC data and check the authenticated-data flag:

```bash
dig +dnssec web.example.com @10.0.5.2
delv web.example.com @10.0.5.2
```

The source-backed [`dnssec-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/examples/dnssec-lab.py)
contains the full Root → TLD → Authoritative → Resolver topology. The broader DNS Service reference is in
[`DNS.md`](https://github.com/mininet-iplab/mininet-iplab/blob/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a/docs/DNS.md).
