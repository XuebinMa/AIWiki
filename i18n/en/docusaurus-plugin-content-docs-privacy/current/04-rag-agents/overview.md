---
title: "Volume 4 · RAG and agents (volume intro)"
sidebar_label: Volume intro
sidebar_position: 0
---

:::note Under construction (M1 scaffold)
The attack/defense entries for this volume aren't out yet; for now this intro is the only placeholder. Topics and progress are in [BACKLOG-privacy.md](https://github.com/xuebinma/AIWiki/blob/main/BACKLOG-privacy.md).
:::

## Scope of this volume

Retrieval augmentation and agents widen the data boundary from "one model" to "a whole system," and the leak points multiply with it:

- **Retrieval leakage**: cross-tenant, cross-user retrieval from a vector / knowledge store; whether the ACL runs before retrieval or filters after.
- **Cross-session / cross-user memory bleed**: long-term memory carrying one user's private context into another session.
- **Tool-call and agent exfiltration**: private data sent outward by a tool; the lethal trifecta (private data + untrusted content + outbound communication) replayed from the privacy angle.
- **Data boundaries in multi-agent collaboration**: subagents sharing context they shouldn't.

## Where it crosses the "AI Coding Pitfalls" part

The lethal trifecta and indirect prompt injection have entries in the other part too, but there the framing is "getting compromised / induced to execute"; here it's "data / identity getting leaked." Overlaps get cross-links, not duplication.
