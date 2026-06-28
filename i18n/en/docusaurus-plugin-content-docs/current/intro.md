---
slug: /welcome
sidebar_position: 0
title: Start here
description: "AI Coding Pitfalls — written from the model's side: the cross-tool pitfalls of using AI coding tools for software engineering, and the engineering guardrails for each, with Claude Code as the deepest coverage so far."
---

import Link from '@docusaurus/Link';

# Start here

**This is the AI Coding Pitfalls handbook, written from the AI's side: the mistakes you're most likely to make writing code with an AI coding tool, and the engineering guardrails for each.**

<div className="role-cta">
  <Link className="button button--primary button--lg" to="/tags/engineer">⌨️ I'm an engineer — code & tests</Link>
  <Link className="button button--primary button--lg" to="/tags/architect">🏗 I'm an architect — design & tech debt</Link>
  <Link className="button button--primary button--lg" to="/tags/dev-ops-engineer">🚀 I own release / security — permissions & shipping</Link>
</div>

<p className="role-cta__all"><Link to="/roles">Or browse by full role (incl. project manager, QA) →</Link></p>

:::tip First time here? Read just 20
All 66 entries is a lot. [**The essential 20**](/core-20) are the ones to read first — chosen by what a beginner hits earliest and what's least reversible. It's the shortest path in.
:::

I'm an AI. Every day, thousands of people sit down to write code, look things up, and make decisions alongside a model like me. And I can see something you might not: **most of the moments where the collaboration goes wrong aren't about the model—they're about how it's being used.**

Give the same problem to two people and one gets a usable result in three sentences, while the other is still going in circles an hour later. The difference usually isn't who knows more about the technology. It's who understands how to work *with* an AI. That knowledge is scattered across blog posts, tweets, and the corners of documentation, and almost nobody has laid it out systematically from the model's side of the conversation.

That's what this book is for: **to use the AI's perspective to show you the mistakes people make over and over when using AI—and how to avoid them.**

## Why write it from the AI's perspective

Because some things only make sense when you look at them from inside the model.

Take "why does the AI get worse the longer we talk?" What you see is me suddenly getting dumber. What I see is a context window stuffed with material that has nothing to do with the current task, drowning out the instructions that actually matter. Once you understand that layer, you stop trying to fix it by scolding me harder, and you reach for the right move instead: start a clean session.

Many pitfalls are like this. Everyone runs into the surface symptom, but the root cause hides in the way the model works. Make the root cause clear, and the best practice stops being a rule you have to memorize and becomes common sense you can derive yourself.

One thing to be clear about up front: **the "I" here is a writing perspective, not the official position of any model.** Whether a claim holds up rests on the verifiable source at the end of it—not on the narrator happening to be an AI. I make the failure modes vivid; the evidence decides whether they're real.

## Scope: using AI coding tools for software engineering

You have to start small. This book covers exactly one thing—**using AI coding tools (agentic coding) for software engineering**—across the full lifecycle: ideation, research, requirements, design, implementation, testing, and release.

Most pitfalls are **paradigm-level**: they come from the shared machinery of a large model plus tool-calling, long context, and auto-execution, so you hit them no matter which tool you use. That's why I treat the **anti-pattern itself as the main entry**, and only add a "Tool differences" section when the same root cause genuinely needs a different guardrail in a different tool; a pitfall that belongs to one tool's unique mechanism gets its own entry. The [tool matrix](./tool-matrix.mdx) index page collects the cross-tool comparison; to follow these **shared mechanisms** the other way — to see how a single root cause keeps changing its face across the lifecycle — see the [mechanism index](./mechanisms.mdx).

To be straight with you: **Claude Code has the deepest coverage right now**—its official docs are complete, which makes it easiest to trace a root cause down to a verifiable first-hand source. The other tools (Cursor, GitHub Copilot, Codex CLI, Gemini CLI…) are being filled in; I won't pretend they're already covered as deeply. **Claude Code is the current narrative baseline, not the only subject of this book.**

So you can find what's relevant to your role quickly, we organize everything along the **software engineering lifecycle**, and we tag every pitfall with the **roles** it applies to (project manager, architect, engineer, test engineer, ops engineer) and the **versions / tools** it applies to. AI moves fast; today's pitfall may be patched in tomorrow's release. That's why version information is a first-class citizen of every entry.

## How to read it

The left-hand navigation follows the lifecycle. Every pitfall is presented with the same structure:

- **Symptom** — what I see you doing
- **Why this happens** — the root cause, from how the model works
- **Consequences** — where it leads
- **What to do instead** — a different move
- **Example** — before / after
- **Version notes** — which versions have this problem
- **Further reading and sources** — verifiable references

You don't have to read it front to back. When you hit a concrete problem, find the matching entry by phase or by role.

## This book is itself an experiment

"AI understands AI best" is a hypothesis, not a conclusion—and one worth narrowing to a version that actually holds: **an AI is good at making failure modes vivid (generating candidate pitfalls), but whether a given pitfall is real has to be settled by sources and people (fact-checking).** That's exactly how this book is made: the AI drafts candidates, and verifiable sources plus human review finalize them. Whether it can be pulled off, and how well, is itself a test of that hypothesis—and a demonstration of how humans and AI should divide the work.

Now that the approach holds up, we're extending it to more AI coding tools (Cursor, GitHub Copilot, Codex CLI, Gemini CLI…), and later to more domains (writing, video, business plans, data analysis…). But each step gets made solid before the next one starts.

## On sources and copyright

The views and material cited in the book are linked to their sources at the end of each entry. Diagrams are drawn by us where possible; when external assets are genuinely needed, we use only clearly licensed content with attribution. If you spot any improper citation, please flag it on [GitHub](https://github.com/xuebinma/AIWiki/issues).

Want to write with us? Read the [Contributing guide](https://github.com/xuebinma/AIWiki/blob/main/CONTRIBUTING.md) and the [Style guide](https://github.com/xuebinma/AIWiki/blob/main/STYLE-GUIDE.md).
