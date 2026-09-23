---
title: Link Conditions
description: Change Link availability and quality without confusing it with routing state.
---

<div class="channel-note">

**Stable · core v0.1.0.** Web UI Mode in the `v0.1.0` core release lets a Learner interact with an existing Link's
availability and traffic characteristics.

</div>

A **Link Condition** describes what happens to traffic on an existing Link. In Web UI Mode, a Learner can disconnect
or reconnect a Link and configure characteristics such as delay, loss, and bandwidth. The action changes the behavior
of that Link; it does not add a Link, remove a Node, rewrite an address, or install a route.

## Link Condition versus routing state

| Thing being observed | What it answers | Example |
| --- | --- | --- |
| Link Condition | Can traffic cross this existing Link, and what quality does it have? | The `r1`–`r2` Link is disconnected or has `10ms` delay. |
| Routing protocol state | Which paths does a Router know and select? | `show ip ospf neighbor` or `show bgp summary`. |
| Forwarding route | Which next hop does a Router use for a destination prefix? | `192.168.2.0/24` via `10.10.1.2`. |

A Link Condition can cause a routing protocol to recalculate. That reaction does not make the Link Condition a route,
neighbor, prefix, or protocol attribute. For example, disconnecting an OSPF backbone Link may remove a neighbor and
lead OSPF to choose another path; the disconnected Link is still the exercise input.

## Task: change one Link and observe the consequence

Start [`static-lab.py` in Web UI Mode](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/examples/static-lab.py):

```bash
docker compose exec mniplab python3 examples/static-lab.py --enable-web
```

1. From `h1`, establish the baseline:

   ```bash
   ping -c 3 192.168.2.2
   ```

2. Select the `r1`–`r2` Link in the topology. Use **Disconnect Link**, then repeat the ping. The configured route may
   still be present, but the only Link carrying the route's next hop is unavailable, so the end-to-end ping should
   fail. Inspect `show ip route` separately from the ping: a configured route is not proof that its next hop is
   reachable.
3. Use **Reconnect Link** and repeat the ping. Connectivity should return without changing the static route.
4. Use **Configure Link** on the same Link to add a delay, loss, or bandwidth limit. Repeat the ping and compare
   latency, replies, or transfer behavior with the baseline.

The core repository's [Stable Web UI Guide](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/docs/web-ui.md)
describes the browser Topology and Link controls. The [source markup for those controls](https://github.com/mininet-iplab/mininet-iplab/blob/v0.1.0/mniplab/webserver/static/index.html)
remains the exact release source; this documentation page does not promise a separate Web API contract.

## Extend the experiment

Repeat the experiment with the [OSPF Guide](/docs/understand/routing-and-link-conditions/ospf/) or [BGP Guide](/docs/understand/routing-and-link-conditions/bgp/).
After a Link change, inspect the relevant neighbor, route, or BGP commands. The interesting observation is the causal
chain:

```text
Learner changes a Link Condition
        ↓
traffic on that Link changes
        ↓
the routing protocol may react
        ↓
the forwarding path may change
```

This is a Learner-controlled change to the running Lab's behavior. It does not change the Lab Example's Topology or
turn a Link Condition into routing protocol state.
