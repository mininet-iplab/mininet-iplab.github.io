---
title: Multi-Lab Mode
description: Run separate Labs for classroom Groups from one Web UI server.
---

<div class="channel-note">

**Development · core revision `9c14a8fee2ac40ac430909e4c4390d39662f3c6c`.** This page follows the current
Group, Assignment, and Lab lifecycle behavior.

</div>

Multi-Lab Mode gives each Group its own running Lab. A Group is a login, and each Group can run one Lab Example at a
time. The Instructor can assign available Lab Examples, see the running Labs, and start or stop a Group's Lab.

## Add it to a Lab

This is a server setting, not a call in `build_network()`. Configure accounts and the mode in `.env`:

```dotenv
MNIPLAB_USERS=teacher:TeachPass1:instructor,table1:Table1Pass:learner
MNIPLAB_LAB_MODE=multi
MNIPLAB_LAB_CAP=4
```

Start the server with `python -m mniplab serve` (or `docker compose exec mniplab python -m mniplab serve` in the
container). The mode is read when the server starts. The Instructor uses **Groups & Labs** to assign Lab Examples;
each Group sees its own Assignment and starts one Lab from that list. A Lab Example with persistent `frr_dir` config
gets a separate Router config copy per Group; **Start clean** resets that Group's copy to the seed.

## Verify it

Sign in as two different Groups and start the same Lab Example in each. Each Group should see only its own Lab, while
the Instructor's **Groups & Labs** page shows both with different Lab keys. Stop one Group's Lab and confirm the other
continues running. See the [core Multi-Lab Mode guide](https://github.com/mininet-iplab/mininet-iplab/blob/9c14a8fee2ac40ac430909e4c4390d39662f3c6c/docs/web-ui.md#multi-lab-mode)
for Assignments, the Lab cap, and persistent configuration behavior.
