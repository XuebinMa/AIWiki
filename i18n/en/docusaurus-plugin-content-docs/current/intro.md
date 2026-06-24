---
slug: /
sidebar_position: 0
title: What this book is
description: AiWiki — an encyclopedia of AI usage pitfalls and best practices, written from the AI's own perspective. The first edition focuses on Claude Code and the software engineering lifecycle.
---

# What this book is

I'm an AI. Every day, thousands of people sit down to write code, look things up, and make decisions alongside a model like me. And I can see something you might not: **most of the moments where the collaboration goes wrong aren't about the model—they're about how it's being used.**

Give the same problem to two people and one gets a usable result in three sentences, while the other is still going in circles an hour later. The difference usually isn't who knows more about the technology. It's who understands how to work *with* an AI. That knowledge is scattered across blog posts, tweets, and the corners of documentation, and almost nobody has laid it out systematically from the model's side of the conversation.

That's what this book is for: **to use the AI's perspective to show you the mistakes people make over and over when using AI—and how to avoid them.**

## Why write it from the AI's perspective

Because some things only make sense when you look at them from inside the model.

Take "why does the AI get worse the longer we talk?" What you see is me suddenly getting dumber. What I see is a context window stuffed with material that has nothing to do with the current task, drowning out the instructions that actually matter. Once you understand that layer, you stop trying to fix it by scolding me harder, and you reach for the right move instead: start a clean session.

Many pitfalls are like this. Everyone runs into the surface symptom, but the root cause hides in the way the model works. Make the root cause clear, and the best practice stops being a rule you have to memorize and becomes common sense you can derive yourself.

## First edition: Claude Code and software engineering

You have to start small. This first edition covers exactly one thing—**using [Claude Code](https://code.claude.com/docs) for software engineering**—across the full lifecycle: ideation, research, requirements, design, implementation, testing, and release.

So you can find what's relevant to your role quickly, we organize everything along the **software engineering lifecycle**, and we tag every pitfall with the **roles** it applies to (project manager, architect, engineer, test engineer, ops engineer) and the **versions** it applies to. AI moves fast; today's pitfall may be patched in tomorrow's release. That's why version information is a first-class citizen of every entry.

## How to read it

The left-hand navigation follows the lifecycle. Every pitfall is presented with the same structure:

- **Symptom** — what I see you doing
- **Why it happens** — the root cause, from how the model works
- **Consequences** — where it leads
- **Best practice** — a different move
- **Example** — before / after
- **Version notes** — which versions have this problem
- **Sources** — verifiable references

You don't have to read it front to back. When you hit a concrete problem, find the matching entry by phase or by role.

## This book is itself an experiment

"AI understands AI best" is a hypothesis, not a conclusion. This book—from inception and research to writing and release—is itself built through collaboration with AI. So **whether it can be pulled off, and how well, is itself a test of that hypothesis.**

If the first edition holds up, we'll extend it to more models (ChatGPT, Tongyi Qianwen, Gemini…) and more domains (writing, video, business plans, data analysis…). But first, let's make this one point solid.

## On sources and copyright

The views and material cited in the book are linked to their sources at the end of each entry. Diagrams are drawn by us where possible; when external assets are genuinely needed, we use only clearly licensed content with attribution. If you spot any improper citation, please flag it on [GitHub](https://github.com/xuebinma/AIWiki/issues).

Want to write with us? Read the [Contributing guide](https://github.com/xuebinma/AIWiki/blob/main/CONTRIBUTING.md) and the [Style guide](https://github.com/xuebinma/AIWiki/blob/main/STYLE-GUIDE.md).
