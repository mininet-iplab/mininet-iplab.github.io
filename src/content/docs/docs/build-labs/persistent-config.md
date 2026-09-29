---
title: Persistent Config
description: Keep each Router's FRR configuration in files so a Lab starts from the same state every time.
---

By default a Router's FRR configuration is **Ephemeral Config**: whatever `add_frr_config()` builds when the Lab
starts, gone when it stops. **Persistent Config** keeps each Router's configuration in a directory instead, so the
Lab Example ships a known starting state and `write memory` in `vtysh` saves changes back to files.

## Add it to a Lab

Create one directory per Router under `frr-config/<lab-id>/` and point `frr_dir` at it. `%(name)s` expands to the
Router's name:

```bash
mkdir -p frr-config/my-lab/r1 frr-config/my-lab/r2
```

```python
r1 = net.addRouter('r1', proto='OSPF', frr_dir='./frr-config/my-lab/%(name)s')
r2 = net.addRouter('r2', proto='OSPF', frr_dir='./frr-config/my-lab/%(name)s')
```

Each directory holds that Router's `frr.conf`, `daemons`, and `vtysh.conf`. Author them by running the Lab Example in
CLI Mode (`python3 examples/my-lab.py`), configuring each Router in `vtysh`, and running `write memory`: in CLI Mode
and in Single-Lab Mode the Lab reads and writes these files directly. Commit the directory with the Lab Example.

Register the Lab Example with `util/gen_labs_json.py`, which records `persistent_config` in `examples/labs.json` so
the Web UI offers the controls below.

## The seed and each Group's copy

In [Multi-Lab Mode](/docs/features/multi-lab/) the Lab Example's `frr_dir` directory (by convention
`frr-config/<lab-id>/`) is the **seed**, the Instructor's versioned copy. A Group's first start of that Lab Example copies each Router's seed into the Group's own
copy under `group-config/<group>/<lab-id>/<router>/`; later starts resume that copy, and a Group's `write memory`
lands only in its copy. Two Groups never share a file, and a Group never writes the seed.

- Each entry on a Group's start screen says whether the next start **resumes your Group's saved Router Configs** or
  **begins from the seed**. A Group holding a copy also has **Start clean**, which discards it.
- On the Instructor's **Overview** tab, each Group's copies have a **Reset** that discards one Group's copy, and
  **Reset every Group's Router Config…** discards every Group's copy of one Lab Example. Both ask first, and a reset is
  refused while that Group's Lab on that Lab Example is running.
- Exercise Configuration such as DHCP Pools, DNS Records, Leases, and Resolver rules is not part of Persistent Config
  and does not resume.

## Verify it

Start the Lab Example, change something on a Router, and save it:

```bash
r1 vtysh -c 'configure terminal' -c 'router ospf' -c 'ospf router-id 9.9.9.9' -c 'end' -c 'write memory'
```

Stop and start the Lab again: `show running-config` on `r1` still has the new router-id. In CLI Mode the change is in
`frr-config/my-lab/r1/frr.conf`; in Multi-Lab Mode it is in the Group's copy and the seed is unchanged.
