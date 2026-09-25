---
title: Packet Capture
description: Observe packets on a Lab Interface and download the capture for deeper analysis.
---

<div class="channel-note">

**Development · core revision `9c14a8fee2ac40ac430909e4c4390d39662f3c6c`.** This page follows the current Web UI
Packet Capture workflow.

</div>

Packet Capture observes one Interface of a running Lab. It helps connect a command in a Node Terminal to the
protocol messages seen on the wire. A capture does not change the Topology or routing configuration.

## Add it to a Lab

Start a Lab Example in Web UI Mode, for example `python3 examples/dhcp-lab.py --enable-web`. Select a Link, Router,
Host, or Speaker and choose **Packet Capture**. Then choose the Interface to watch. A Router's menu also lists
Interfaces on Links hidden from the drawing, such as one facing a NAT gateway.

Select a protocol preset such as DHCP, DNS, OSPF, BGP, ICMP, or ARP, or enter a BPF capture filter such as
`host 10.0.0.1 and icmp`. Changing the filter starts a new capture. Open a packet row to inspect its decoded fields;
use **Download pcap** to analyze the full capture outside the browser. At most two captures can run at once, so you
can compare packets on either side of a Router.

## Verify it

Capture a Host or Router Interface, then send `ping -c 3 <peer-address>` from a Node Terminal. The capture should
show ICMP Echo requests and replies. Select a row to inspect its fields and download the pcap before stopping the
Lab; capture files are removed when the Lab stops. For a guided protocol example, follow the
[BGP Packet Analysis exercise](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/examples/guides/bgp-nat-isp-lab.md#packet-analysis).
The [core Web UI guide](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/docs/web-ui.md#packet-capture)
documents filters, capture limits, and pcap retention.
