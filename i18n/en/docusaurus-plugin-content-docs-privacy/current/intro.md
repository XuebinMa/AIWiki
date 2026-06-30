---
slug: /
sidebar_position: 0
title: What this part is
description: "LLM Privacy — a part of the AiWiki encyclopedia that sits alongside AI Coding Pitfalls. Written from the AI's first-person view, it explains how privacy leaks out of LLM systems and how it's protected — mechanism, a buildable recipe, and a real case for each, told along the arc of LLM history and updated as models change."
---

# What this part is

**This is an engineer-facing part of the AiWiki encyclopedia: from the AI's point of view, it explains how privacy leaks out of LLM systems and how it's protected — the mechanism, a buildable recipe, and a real case for each, told along the arc of LLM history and updated as models change.**

It sits **alongside** the other part you may be reading, [AI Coding Pitfalls](/welcome) — not under it. That part covers the mistakes people most often make while using AI coding tools; this one covers where sensitive data leaks in an LLM system, and how to verify / reduce / prove / trace it in engineering terms. They share the same core — mechanism-first, first-person, checkable evidence, updated per version — but the domain, the unit, and the structure are all different.

:::note Current status: M1+ · sample content expanding (shifted from "breadth" to "depth + review + cases")
The six-volume structure, glossary, template, and quality gates are all in place; **all 14 technique boards now have at least one shipped entry**, or are covered "running through every entry" (see the [privacy map](./map.mdx)). From here the focus is no longer adding new entries but **deepening existing ones, site-wide review (maturity / evidence discipline), and adding real cases and how companies actually do this in production** (roadmap in [`PROPOSAL-privacy-book.md`](https://github.com/xuebinma/AIWiki/blob/main/PROPOSAL-privacy-book.md) and [`BACKLOG-privacy.md`](https://github.com/xuebinma/AIWiki/blob/main/BACKLOG-privacy.md)).
:::

## Who it's for

Mainly **LLM privacy engineers**, plus ML engineers, AI security engineers, and privacy / compliance engineers. The audience is narrower and more specialized than for AI Coding Pitfalls — a lower traffic ceiling, but stronger depth and stickiness. If the question you need answered is "for our RAG / fine-tuning / inference service, can sensitive data leak, and how do we prove it doesn't," this is written for you.

## Why write about privacy in the first person

The core question in privacy attack and defense is, at bottom, "what happens on the model's side" — how I retain a piece of training data, under what prompt I might regurgitate it, how an outside attacker infers whether a given sample was in my training set, what a single act of "forgetting" actually changed. Having the model speak to that directly is a view no paper list, academic survey, or vendor doc can give you.

But the first person comes with a **red line** in privacy that's much stricter than in AI Coding Pitfalls:

:::danger First-person red line: describe only externally observable behavior; no false introspection
I cannot reliably introspect the influence of my own training data. Writing introspection as fact manufactures **false security** — being confidently wrong. So:

- ❌ Don't write: "I remember your email," "I know this record is in my training set," "I've truly forgotten it," "DP means I'll never leak privacy."
- ✅ Rewrite as externally verifiable behavior or a mechanism tendency: "To an outside attacker, I may, under certain prompts, reproduce fragments from training that were highly repeated, rare, or fixed in format," "The goal of DP training is to bound any single sample's influence on the parameter distribution, but that is not the same as zero leakage," "An unlearning method may lower the probability that the target content is emitted, but whether that amounts to deletion in the legal sense has to be proven separately."

The first person gets people in the door; whether a claim holds is decided by the checkable source at the end of the entry and by human review — not by the fact that the narrator happens to be an AI. The full "first-person do / don't" table is in [`STYLE-GUIDE.md`](https://github.com/xuebinma/AIWiki/blob/main/STYLE-GUIDE.md).
:::

## How it's organized: a history mainline plus a technique index

This carries over the proven approach from AI Coding Pitfalls — one mainline plus several cross-cutting indexes. **The reading mainline runs along the history of LLMs, split into six volumes** (left sidebar), so scattered techniques sew into a single storyline; **technique areas and a "threat → mitigation" matrix** serve as query axes (built out as entries accumulate). Each entry hangs on both "which volume it belongs to" and "which technique area it belongs to."

The six-volume reading mainline:

- **🧱 Volume 1 · Privacy foundations** — the pre-LLM, discriminative era: the origins of membership inference attacks, and the **minimum load-bearing foundation** of differential privacy / federated learning / homomorphic encryption / secure multi-party computation / trusted execution environments (only the minimal set later volumes depend on — not a PPML textbook).
- **🧠 Volume 2 · Memorization and extraction** — the generative pretraining era: verbatim and quantified memorization, training-data extraction attacks, what amplifies memorization, and deduplication / DP pretraining / memorization auditing. This is the **flagship volume** — the strongest story, the hardest evidence.
- **💬 Volume 3 · Conversational LLMs** — PII regurgitation, context-surface privacy (system prompt / conversation context / tool-result leakage), DP fine-tuning made practical, and how membership inference evolves on LLMs.
- **🔗 Volume 4 · RAG and agents** — retrieval leakage (vector store across tenants / across users), cross-session memory bleed, private data exfiltrated by tool calls and agents, and data boundaries in multi-agent collaboration.
- **🔬 Volume 5 · Frontier and deployment** — private computation and confidential inference (TEE / GPU confidential computing / HE / MPC), verifiable deletion and machine unlearning, and production-grade DP·FL deployments.
- **⚖️ Volume 6 · Governance and compliance** — mapping the GDPR right to be forgotten, the EU AI Act, NIST, and OWASP LLM02 to engineering actions. Compliance runs **through every volume**; this one is just the master index.

## Accuracy discipline: harder than for "pitfalls"

Getting it wrong here costs more — one fudged ε value or "already in production" claim can lead an engineer to build a **false-security** system. So every piece of privacy content must clear three hard gates before it's written:

- **A · Quantitative-claim gate**: any ε/δ, attack success rate, performance overhead, deployment count, retention period, throughput / latency — must carry ① a primary source ② a verification date ③ experimental / applicability conditions; no bare conclusions. Performance numbers must give the full set of fields (hardware / model size / batch / sequence length / baseline / security mode…).
- **B · Introspection-expression gate**: see the first-person red line above.
- **C · Maturity gate**: marking `maturity = production` requires support from a real deployment / vendor doc / standard recommendation / checkable case; otherwise it can only be `research` or `experimental`.

Two more ground rules: **every quantitative number carries its conditions** (the same metric often differs by an order of magnitude depending on workload — never write a single optimistic number bare); and **go straight at "false security"** — naive anonymization can be de-anonymized, the "suppression" of unlearning ≠ true deletion, flipping off a training switch ≠ no retention. These "thought it was safe, it wasn't" cases must be called out in the "residual risk" section.

> **An honest word about this part itself**: it also dogfoods the AI Coding Pitfalls method — AI drafts candidates, checkable sources plus human review finalize them. The cryptography is the easiest place to get it wrong and is this part's existential risk; until a suitable human cryptography reviewer is on hand, disputed entries are flagged in place with `:::caution to be verified`, recorded in `BACKLOG-privacy.md` for later expert review, and never allowed to masquerade as settled.

## How to read

The left sidebar is ordered by the six volumes — that's the recommended reading order. Each attack/defense entry uses the same nine-section structure: one-sentence summary → mechanism (what happens on my side) → threat surface → defense principle → buildable recipe → real case → residual risk and trade-offs → version notes → sources. You don't have to read front to back — find the relevant entry by volume or by technique area. **If you already know the leak surface you worry about** (training data memorized, RAG cross-tenant bleed, the provider retaining your data, gradient leakage…), the faster entry point is the [privacy map](./map.mdx)'s threat → mitigation matrix: look up by leak surface to find the entries that cover it, and see at a glance what they **don't** solve.

Want to help write, or spotted a misattribution? Flag it on [GitHub](https://github.com/xuebinma/AIWiki/issues).
