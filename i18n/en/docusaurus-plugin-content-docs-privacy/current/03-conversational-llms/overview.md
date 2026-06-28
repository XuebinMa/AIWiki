---
title: "Volume 3 · Conversational LLMs (volume intro)"
sidebar_label: Volume intro
sidebar_position: 0
---

:::note Under construction (M1 scaffold)
The attack/defense entries for this volume aren't out yet; for now this intro is the only placeholder. Topics and progress are in [BACKLOG-privacy.md](https://github.com/xuebinma/AIWiki/blob/main/BACKLOG-privacy.md).
:::

## Scope of this volume

Conversational large models (from ChatGPT onward) stretch privacy from "the training set" to "every single conversation":

- **PII regurgitation**: the model emitting real personal information from training under an anomalous prompt.
- **Context-surface privacy**: the system prompt, developer message, conversation context, tool results, retrieved chunks — how these "context surfaces" get extracted and leaked (more fundamental than just "system prompt leakage").
- **DP fine-tuning made practical**: DP-SGD and PEFT + DP bringing differential privacy down to the fine-tuning step.
- **Membership inference evolving on LLMs**: what the discriminative-era MIA becomes on large models.

## How it divides from neighboring volumes

This volume covers the **single-model conversation** surface; multi-tenant retrieval, cross-session memory bleed, and agent exfiltration belong to Volume 4 (RAG and agents).
