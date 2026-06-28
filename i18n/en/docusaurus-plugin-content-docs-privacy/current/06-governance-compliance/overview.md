---
title: "Volume 6 · Governance and compliance (volume intro)"
sidebar_label: Volume intro
sidebar_position: 0
---

:::note Under construction (M1 scaffold)
The attack/defense entries for this volume aren't out yet; for now this intro is the only placeholder. Topics and progress are in [BACKLOG-privacy.md](https://github.com/xuebinma/AIWiki/blob/main/BACKLOG-privacy.md).
:::

## Scope of this volume

Compliance isn't a chapter of its own — it runs **through every volume**: each technique entry embeds a short "compliance mapping" note (short, version-stamped, so the legal references don't rot). This volume is just the master index:

- What the **GDPR right to be forgotten (Art. 17)** means, in engineering actions, for a trained model.
- The **EU AI Act** training-data transparency obligation.
- Mapping **NIST** (SP 800-226 / AI 600-1) and **OWASP LLM Top 10 (LLM02 sensitive information disclosure)** to engineering actions.
- **Data-boundary policy** and vetting of vendor data-use terms (paired with the toolkit's "LLM Vendor Data Boundary Checklist").

## A boundary: a transparency obligation ≠ a technical deletion obligation

There's a real gap between the law "requiring deletion" and engineering "being able to truly delete." This volume's discipline is to make that gap explicit — not to treat "marked compliant" as "the data is really gone," which is yet another **false security**.
