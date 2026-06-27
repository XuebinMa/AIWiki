# 选题与待办储备：「LLM 隐私保护」主题 / Backlog

「LLM 隐私保护」是 AiWiki 百科下与「AI 编码误区」**并列的主题**，面向 LLM 隐私保护工程师，偏原理 + 实现 + 真实案例，按 LLM 发展史叙述、持续更新。本文件是该主题自己的看板，**与第一个主题的 `BACKLOG.md` 分开**（别混）。立项与架构见 `PROPOSAL-privacy-book.md`。

> 状态：⬜ 待做 ｜ 🟡 进行中 ｜ ✅ 已落地 ｜ ❌ 评估后不做
> 范围纪律：精而深，不追条数（见 PROPOSAL 第 4 节）。

## 写作前必核（事实核验欠债，最高优先）

> **铁律**：本主题准确门槛高于「误区」——写错会让工程师做出**假安全**系统。任何 ε/δ、性能开销、「已生产部署」类声明，进正文前必须有**一手出处 + 版本戳**；research 与 production 用 `maturity` 区分。
> 下列是立项调研阶段**凭既有知识提及、本会话（deep-research 对抗核验流水线失败后转手动检索）未二次核**的点，写进对应条目前必须核实。

- ⬜ **Apple PCC（Private Cloud Compute）**：作为机密推理生产实例提及，本会话未检索。核：PCC 的隐私机制（TEE / 远程证明）、定位、发布时间。一手出处：Apple Security 官方博客 / 白皮书。
- ⬜ **Carlini 等 · 训练数据抽取 / 量化记忆**：提及「2021/2022 里程碑」。核确切标题 / 作者 / 年份 / 出处——《Extracting Training Data from Large Language Models》（USENIX Security 2021？）、《Quantifying Memorization Across Neural Language Models》（2022/2023？）。
- ⬜ **PATE**：作为 DP 方法提及。核全称（Private Aggregation of Teacher Ensembles）、出处（Papernot 等 2017？）、与 DP-SGD 的区别与适用。
- ⬜ **二手 → 一手升级**：HE 约 10⁴× 开销、GPU 机密计算约 95–99% 原生、Gboard 15+ DP 模型、Apple 本地 DP——立项时取自二手搜索摘要，entry 级需换一手出处 + 版本戳。
- ⬜ **竞品快照**：`Awesome-*` 的 star 数 / 最近更新、各书出版年，写进任何「竞品 / 缺口」页前重核（PROPOSAL 已标「时间点快照」）。

## 选题储备（按卷 × 技术板块，待逐条立项）

> 卷（阅读主线）与技术板块（查询轴）见 PROPOSAL 第 6 节。下面只占位，逐条进条目流水线前再细化、去重、配 ≥2 个一手出处。

- ⬜ 卷一 · 隐私根基：MIA 起源、DP/FL/HE/MPC/TEE 地基
- ⬜ 卷二 · 记忆与抽取（旗舰）：逐字 / 量化记忆、抽取攻击、去重 / DP 预训练 / 记忆审计
- ⬜ 卷三 · 对话大模型：PII 回吐、系统提示词 / 上下文泄露、DP 微调
- ⬜ 卷四 · RAG 与 Agent：检索泄露、跨用户记忆串味、agent 外泄
- ⬜ 卷五 · 前沿落地：机密推理（TEE/GPU CC）、加密推理（HE/MPC）、可扩展遗忘、DP 联邦生产
- ⬜ 卷六 · 治理合规：GDPR Art.17、EU AI Act、NIST、OWASP LLM02 映射

## 结构 / 流程待办（评审与决策沉淀）

> 沿用第一个主题的约定：评审 / 研究里「认同但暂不做」的结论落这里，别只留对话——会话压缩会丢。

- ⬜ **frontmatter 轴枚举**：`era` / `technique` / `attack_surface` / `maturity` / `audience` 取值表，定稿后写进 `terminology.md`。
- ⬜ **`severity` 隐私语义**：沿用高 / 中 / 低（显示作「隐私风险」）为默认；是否另拆「数据敏感度」轴待定。
- ⬜ **本地搜索多实例**：`docsRouteBasePath` 单值默认不索引第二实例；验证数组支持 / 升级 / 暂缓 / 切 Algolia。
- ⬜ **技术评审人**：密码学准确性（尤卷一 / 卷五）需独立评审。**已定：ChatGPT 作内容独立评审人**（用户引入）；Claude 对其意见可提异议，目标协作把主题写好。评审意见分诊后落本文件。
- ⬜ **dogfooding-checklist**：把「自我遵守《AI 编码误区》」做成 repo 级精简清单 + `CLAUDE.md` 一行指针 + 自查步骤进 skill（别堆 CLAUDE.md，那本身是一条误区）。
- ⬜ **命名清洗（M0.5）**：`PROPOSAL-privacy-book.md` 等处余下「书」字统一改「主题」（百科形态）；文件名是否一并改待定。
- ⬜ **M1 最小化**：脚手架只做最小可渲染（第二实例 + 模板 + 术语 + 导读）；`PrivacyMeta` / `entryMeta-privacy` / 索引页等轴锁定且有内容后再做（防 over-engineering / premature-abstraction）。
