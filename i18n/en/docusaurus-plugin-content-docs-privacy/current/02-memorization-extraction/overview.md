---
title: "Volume 2 · Memorization and extraction (volume intro)"
sidebar_label: Volume intro
sidebar_position: 0
---

:::note Under construction (M1 scaffold)
The attack/defense entries for this volume aren't out yet; for now this intro is the only placeholder. Topics and progress are in [BACKLOG-privacy.md](https://github.com/xuebinma/AIWiki/blob/main/BACKLOG-privacy.md).
:::

## Scope of this volume

This is the **flagship volume** — the strongest story, the hardest evidence. It covers how a generative pretrained model retains training data and how it can be forced to spit it back out:

- **Verbatim and quantified memorization**: to what degree, and in what form, a model retains training samples.
- **Training-data extraction attacks**: under what conditions an outside attacker can pull memorized content back out; distinguishing memorization / regurgitation / extraction.
- **What amplifies memorization**: how repetition count, model size, and context enlarge it.
- **Defenses**: training-data deduplication, DP pretraining, memorization auditing (canary / exposure).

## A first-person red-line reminder

This volume is the easiest to write as false introspection. Remember: don't write "I remember this record," write "to an outside attacker, I may, under certain prompts, reproduce fragments from training that were highly repeated, rare, or fixed in format." The test is always **externally observable behavior**, not the model's own claim of "remember / forgot."
