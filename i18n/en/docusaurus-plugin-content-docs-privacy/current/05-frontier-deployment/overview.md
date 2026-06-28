---
title: "Volume 5 · Frontier and deployment (volume intro)"
sidebar_label: Volume intro
sidebar_position: 0
---

:::note Under construction (M1 scaffold)
The attack/defense entries for this volume aren't out yet; for now this intro is the only placeholder. Topics and progress are in [BACKLOG-privacy.md](https://github.com/xuebinma/AIWiki/blob/main/BACKLOG-privacy.md).
:::

## Scope of this volume

The current frontier and its engineering landing, along three lines:

- **Private computation and confidential inference**: TEE / GPU confidential computing, remote attestation; encrypted inference (HE / MPC). **Overhead depends heavily on the workload — no single optimistic number, always with conditions** — concrete figures get a primary source one by one in the entries.
- **Verifiable deletion and machine unlearning**: suppression vs. true deletion, the unlearning-verification problem, engineering the right to be forgotten.
- **Production-grade DP·FL deployment**: real differential-privacy / federated-learning production cases.

## A high accuracy-risk zone

:::caution To be verified
The performance overhead of confidential inference, and the scale figures behind various "already in production" claims, are where this part is easiest to get wrong and where the damage is largest. Every quantitative claim in this volume must clear hard gate A (primary source + verification date + experimental / applicability conditions); disputed cryptography conclusions get flagged in place with `:::caution to be verified` and recorded in `BACKLOG-privacy.md`, never written as a single bare optimistic number.
:::
