---
title: 卷六 · 治理与合规（本卷导言）
sidebar_label: 本卷导言
sidebar_position: 0
---

:::note 建设中（M1 脚手架）
本卷的攻防条目尚未铺开，当前只有这页导言占位。选题与进度见 [BACKLOG-privacy.md](https://github.com/xuebinma/AIWiki/blob/main/BACKLOG-privacy.md)。
:::

## 本卷范围

合规不单独成章，而是**贯穿各卷**——每条技术条目内嵌一个「合规映射」小段（短、打版本戳，防法条腐烂）。本卷只做总索引：

- **GDPR 被遗忘权（Art.17）** 对训练好的模型意味着什么工程动作。
- **EU AI Act** 训练数据透明度义务。
- **NIST**（SP 800-226 / AI 600-1）与 **OWASP LLM Top 10（LLM02 敏感信息泄露）** 到工程动作的映射。
- **数据边界策略**与厂商数据使用条款核查（配 toolkit 的「LLM Vendor Data Boundary Checklist」）。

## 边界：透明度义务 ≠ 技术删除义务

法律「要求删除」和工程「能否真删」之间有真实落差。本卷的纪律是讲清这层落差，而不是把「标了合规」当成「数据真没了」——又一处「假安全」。
