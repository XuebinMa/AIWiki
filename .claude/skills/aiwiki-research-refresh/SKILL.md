---
name: aiwiki-research-refresh
description: 定期为 AiWiki 做一次「高质量来源研究 → 去重 → 质量把关 → 走条目流水线 → 过闸门」的扩充。当需要发现并新增「AI 使用误区」新选题（尤其由月度定时触发器拉起的无人值守会话），且要保证来源质量、不与现有条目重复时使用。
---

# AiWiki 研究刷新（定时扩充）

把「定期发现新误区并安全地加进百科」固化成一条可重复、口径一致的流程。**质量第一**：宁可这轮 0 条，也不要低质量来源或与现有条目重复的条目。适合月度触发器或手动运行。

## 何时跑

- 月度定时触发器（Claude Code on the web 的 scheduled trigger）拉起的无人值守会话；或
- 用户手动要求「查查有没有新的可加」。

## 先读这些（不要在本 skill 里重复它们）

- `CLAUDE.md` —— 全局约定、质量闸门、合并与「复用分支铁律」。
- `STYLE-GUIDE.md` —— 声音 / 七段结构 / 准确性硬要求（命门）。
- `terminology.md` —— 统一术语与 roles/phase/severity 枚举。
- `CONTRIBUTING.md` —— 一条好条目的标准与提交流程。
- 写作 / 翻译用 `aiwiki-entry-author` 与 `aiwiki-translator` 两个 skill。

## 步骤

### 1) 摸清「已有什么」（去重的基线）

- `ls docs/**/*.mdx` 并读 `BACKLOG.md` 进度总览、各阶段清单与「结构 / 流程待办」区（后者避免重复提已记下的待办）。**已写过什么以 `docs/` 实际内容为准**。
- 记下每条的 slug 与一句话主题，作为查重清单。

### 2) 研究——只用高质量来源

- 用 WebSearch 检索近一年（用当前月份限定「recent」）的 **AI 编码 agent / Claude Code 失效模式、实证研究、安全、人因** 等主题。
- **来源质量硬标准**（命门，宁缺毋滥）：
  - **优先**：arXiv / 会议或期刊（IEEE、ACM、TACL…）实证研究；Anthropic / OWASP 等一手官方；知名机构与研究者（METR、Martin Fowler、Simon Willison、Google/Thoughtworks 工程博客）；可核查的真实事故库（AI Incident Database、权威媒体如 Fortune）。
  - **拒绝**：SEO 内容农场、无署名/无数据的「N 个技巧」清单、纯营销软文、二手转述且找不到一手出处的页面。
  - 每条候选的每个出处都要 **WebSearch 复核标题与 URL 真实存在**；WebFetch 偶被代理 403 时改用 WebSearch 核实，**不可核实的一律不用**。

### 3) 去重 / 防冲突

- 每个候选都对照第 1 步清单：**主题是否已被某条覆盖？** 若接近，必须能说清「角度/层次有何不同」，否则丢弃或并入已有条目。
- 典型易撞：泛安全 vs 具体安全角度、需求澄清类几条之间、上下文类几条之间。区分不出就不立新条。

### 4) 产出候选清单，先给人过目

- 汇总为一张表：候选标题、阶段、角色、severity、**每条 ≥2 个已核实的高质量出处**、以及「为什么不与现有条目重复」一句话。
- **新增条目属需确认类**：把清单交给用户/发起者确认要写哪些，再进入第 5 步。（无人值守触发场景下：若无人确认，**只产出清单并开一个草稿 PR / issue 记录候选，不直接合并**。）

### 5) 写作（沿用验证过的流水线）

- 每条用 `aiwiki-entry-author` 写中文源、`aiwiki-translator` 出英文镜像；**1 条 = 1 个工作单元**。批量时可并行 3–4 个 subagent，每个只动自己的新文件。
- 收口（主控做，**不让子代理碰共享文件**）：
  - 新术语并入 `terminology.md`（先补表再用）。
  - 若某阶段在英文站首次出现条目，补 `i18n/.../current.json` 的英文分类 label + generated-index（防回退中文）。
  - 统一同阶段 `sidebar_position`，避免撞号。
  - 跨条目内链一律用 **`.mdx` 文件相对链接**（否则 `onBrokenLinks: throw` 会拦）。
  - `BACKLOG.md`：标记新增条目与进度计数；并把本轮分诊出的「认同但不做」结构 / 流程项写进「结构 / 流程待办」区（别只留在对话——会话压缩会丢）。
  - 新引用专名 / 技术词补进 `.cspell.json`；非标准英文造词（如 misguess/unjudged）改回标准词而非加白名单。

### 6) 过六道闸门（缺一不可）

`autocorrect --lint .` · `cspell` · `npm run check:i18n` · `npm run check:mirror` · `npm run build`（两 locale，含死链）· Vale 套话（本地无 vale 时，按 `styles/AIWiki/Cliches.yml` 的 token 逐条 grep 核对；注意用 UTF-8 locale 避免字节级误匹配）。

### 7) 提交

- 遵守 `CLAUDE.md` 的**复用分支铁律**：动手前 `git fetch origin main` 并把 main 合并进工作分支；禁 force-push，非快进时用「合并进分支」补救。
- 开 PR；新增条目按约定**留给用户过目再合并**。

## 失败/边界处理

- 这一轮没有够格的新选题：诚实报告「本轮无新增」，不要为凑数硬写或降低来源标准。
- 拿不准是否重复：默认**不立新条**，在 PR/issue 里列出来交人判断。
