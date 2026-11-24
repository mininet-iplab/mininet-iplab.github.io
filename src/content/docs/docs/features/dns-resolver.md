---
title: Recursive Resolver
description: Add a recursive caching Resolver that walks an in-Lab Root, TLD, and authoritative hierarchy.
---

A Resolver answers clients by asking other nameservers: it walks Root → TLD → Authoritative, caches what it learns,
and answers the next query from the cache. A Lab has no route to the public root servers, so the Resolver is seeded
with **Root Hints** that name the Lab's own root nameserver. The Service is backed by Unbound.

## Add it to a Lab

Build the hierarchy with [authoritative DNS Services](/docs/features/dns/): a `.` Zone on `root1` delegating `com.`,
a `com.` Zone delegating `example.com.`, and the `example.com.` Zone itself. Then attach the Resolver:

```python
from mniplab.resolver import ResolverService

res1 = net.addHost('res1', defaultRoute='via 10.0.5.1')     # 10.0.5.2/24 on its Link end
res1.addService(ResolverService(root_hints=[root1]))

client1 = net.addHost('client1', defaultRoute='via 10.0.6.1',
                      nameservers=['10.0.5.2'])             # 10.0.6.2/24 on its Link end
```

A Root Hint may be a Node or a bare IP address string.

Other options:

- `forwarders=['10.0.0.1']` passes every query upstream instead of walking the hierarchy. If you declare both,
  forwarding wins and a start-time warning says so.
- `max_ttl` (300 s by default) and `max_negative_ttl` (60 s) cap cached TTLs so an exercise never waits out a
  production-length TTL.
- `access_control=[AccessRule('10.0.0.0/8', 'allow'), AccessRule('10.0.9.0/24', 'refuse')]` (from
  `mniplab.resolver`) limits which clients may ask. Actions are `allow`, `refuse`, and `deny`.

The Resolver accepts every in-lab client until told otherwise. Rules a Learner authors later are Exercise
Configuration and are discarded when the Lab stops.

The Lab refuses to start when the Resolver can never resolve anything: no Root Hints, no forwarders, and no default
route; a hinted Node with no address; or a hint or forwarder the Resolver has no route to. It warns and runs when the
misconfiguration is the lesson, such as Root Hints aimed at a Node that does not host the `.` Zone.

## Verify it

From the client, ask the same name twice and a name that does not exist:

```bash
dig web.example.com | grep -E "Query time|status"
dig web.example.com | grep -E "Query time|status"
dig missing.example.com | grep status
```

The first query walks the hierarchy; the second is answered from the cache and is faster; the third returns
`NXDOMAIN` and is cached as a negative answer. Select the teal `RESOLVER` badge on `res1` to open the **Cache
Inspector**: query and hit counters, then every cached entry with a `HIT`, `NXDOMAIN`, or `NODATA` status and a TTL
that counts down. Flush one entry, or the whole cache, to make the next query walk again. The **Access Control** tab
edits the rules and applies them with a hot reload that keeps the cache.

![The Cache Inspector for res1 after a few queries: query and hit counters above the cached entries, each with its TTL and status](../../../../assets/screenshots/resolver-cache.png)

At the Lab Prompt use `show_resolver res1`, `show_cache res1`, `flush_cache res1 [name] [--zone]`, and
`resolver_access res1 [add <cidr> <allow|refuse|deny> | del <cidr>]`. In
[`dns-lab.py`](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/dns-lab.py) `res1` walks the
hierarchy from `root1` for `client1`, with TTL caps short enough to watch a cache entry expire in class.
