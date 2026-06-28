---
title: 卷三 · 对话大模型（本卷导言）
sidebar_label: 本卷导言
sidebar_position: 0
---

:::note 建设中（M1 脚手架）
本卷的攻防条目尚未铺开，当前只有这页导言占位。选题与进度见 [BACKLOG-privacy.md](https://github.com/xuebinma/AIWiki/blob/main/BACKLOG-privacy.md)。
:::

## 本卷范围

对话大模型（ChatGPT 起）把隐私问题从「训练集」延伸到「每一次对话」：

- **PII 回吐**：模型在异常提示下吐出训练里的真实个人信息。
- **上下文面隐私**：系统提示词、开发者消息、会话上下文、工具结果、检索片段——这些「上下文面」如何被提取、被泄露（比单说「系统提示词泄露」更底层）。
- **DP 微调实用化**：DP-SGD、PEFT + DP 把差分隐私落到微调环节。
- **成员推断在 LLM 上的演化**：判别式时代的 MIA 到大模型上变成什么样。

## 与相邻卷的分工

本卷讲**单模型对话**这一面；多租户检索、跨会话记忆串味、agent 外联属于卷四（RAG 与 Agent）。
