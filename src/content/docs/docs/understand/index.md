---
title: Understand Mininet-IPLab
description: The concepts behind a Mininet-IPLab Lab.
---

<div class="channel-note">

**Stable · core v0.1.0.** This page describes the Lab model in the Stable release.

</div>

Mininet-IPLab is a network emulation framework for teaching IP routing and core network services on top of Mininet.

## From a recipe to a running Lab

A **Lab Example** is a Python recipe that creates one **Lab**. A Lab is one emulated network running now: its Nodes,
Links, and routing state. The recipe is repeatable; the Lab is the running result that a Learner can inspect. A
learner-facing **Guide** explains what to try and observe, while an optional **Layout** only controls where the
Topology is drawn in Web UI Mode.

The Lab model has three connected ideas:

- A **Topology** is the shape of a Lab: which **Nodes** exist and which **Links** join them. It describes the Lab,
  but it is not the Lab itself.
- A **Node** is a participant in a Lab, such as a Host or Router. A Node can offer a **Service**, while a **Speaker**
  is a Node that announces and withdraws routes when the Lab Example includes that capability.
- A **Link** connects two Nodes and carries the traffic whose behavior the Learner is studying. Link Conditions can
  later make that connection lossy, delayed, or bandwidth-limited.

This separation keeps the lesson concrete: an Instructor chooses the Lab Example and its Topology, then a Learner
observes how Nodes communicate across Links in the running Lab.

The Lab Example owns the Lab shape: its Nodes, Links, addresses, routing behavior, and Services. **Exercise
Configuration** is the set of lesson values an Instructor exposes for a Learner to change. It can alter an exercise's
inputs or a Link Condition, but it does not normally add Nodes, rewire Links, or change the Lab lifecycle.

CLI Mode and Web UI Mode provide two ways to observe the same Lab. The first-success path starts with the
[`static-lab` Lab Example](/docs/getting-started/), a small static-routing exercise.

Once that first Lab is working, follow the [Routing and Link Conditions learning path](/docs/understand/routing-and-link-conditions/)
to compare static routing, OSPF, BGP, IPv4, IPv6, and Learner-controlled Link Conditions.

Instructors who need to create a new Lab Example should continue with the [Build Labs authoring guide](/docs/build-labs/).
