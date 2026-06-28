---
title: "Volume 1 · Privacy foundations (volume intro)"
sidebar_label: Volume intro
sidebar_position: 0
---

:::note Under construction (M1 scaffold)
The attack/defense entries for this volume aren't out yet; for now this intro is the only placeholder. Topics and progress are in [BACKLOG-privacy.md](https://github.com/xuebinma/AIWiki/blob/main/BACKLOG-privacy.md).
:::

## Scope of this volume

The pre-LLM privacy foundation — only the minimum load-bearing set that later volumes actually depend on, not a PPML textbook:

- **Origins of membership inference attacks (MIA)**: how the discriminative-model era decided "is this sample in the training set," and why that's the underlying question behind every later discussion of "memorization / extraction."
- **Differential privacy (DP)**: adjacency, ε/δ, privacy accounting, DP-SGD, user-level vs. sample-level, the utility trade-off — only as deep as later entries need.
- **Homomorphic encryption (HE) · secure multi-party computation (MPC)**: what each protects, what it doesn't, the order of overhead, the threat model.
- **Trusted execution environments (TEE)**: runtime data, remote attestation, the trust boundary, side channels, vendor trust.

## How it divides from neighboring volumes

This volume is the **foundation** — it covers the mechanisms themselves; how those foundations get attacked and deployed on generative large models is taken up by Volume 2 (memorization and extraction) and Volume 5 (frontier and deployment).
