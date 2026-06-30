---
name: aiwiki-research-refresh-privacy
description: 定期为 AiWiki「LLM 隐私保护」主题做一次「高质量一手来源研究 → 去重 → 三道硬闸门把关 → 走隐私条目流水线 → 过闸门」的扩充。当需要发现并新增 LLM 隐私攻防新选题（尤其由月度定时触发器拉起的无人值守会话），且要保证一手出处、不与现有条目重复、不制造假安全时使用。
---

# AiWiki 隐私研究刷新（定时扩充）

把「定期发现新的 LLM 隐私攻防选题并安全地加进主题」固化成一条可重复、口径一致的流程。**准确门槛高于「AI 编码误区」主题**——写错会让工程师做出**假安全**系统。**质量第一**：宁可这轮 0 条，也不要无一手出处、过不了三道硬闸门、或与现有条目重复的条目。适合月度触发器或手动运行。

## 与「误区」研究刷新的区别（别混）

- 去重基线是 **`privacy/`**（不是 `docs/`）；写作用 `aiwiki-privacy-entry-author`（九节 + 第一人称红线 + 三道硬闸门），不是 `aiwiki-entry-author`。
- 多一道**治理原则**：**证据纪律对评审者也一视同仁**——评审 / 二手提及不因「听起来专业」就入库，同样回一手出处（见 `BACKLOG-privacy.md` 顶部）。
- 拿不准的密码学结论**绝不裸写**：就地 `:::caution 待核验` + 记 `BACKLOG-privacy.md`「写作前必核」。

## 先读这些（不要在本 skill 里重复它们）

- `BACKLOG-privacy.md` —— 进度、「写作前必核」「硬闸门 A/B/C」「评审分诊记录」「选题储备」「结构/流程待办」。**命门**：去重 + 防重复提待办都靠它。
- `STYLE-GUIDE.md`「LLM 隐私保护主题专属规范」+ `PROPOSAL-privacy-book.md` —— 定位（工程隐私风险与防护手册）、六卷、§7.3 第一人称红线。
- `terminology.md`「LLM 隐私保护主题术语」—— 隐私术语 + era/technique/maturity/audience/evidence 枚举（先补表再用）。
- 写作 / 翻译用 `aiwiki-privacy-entry-author` 与 `aiwiki-translator` 两个 skill。

## 步骤

### 1) 摸清「已有什么」（去重基线）

- `ls privacy/**/*.mdx`，读 `BACKLOG-privacy.md` 的「选题储备（按卷 × 技术板块）」与各待核区；记下每条 slug + 一句话主题 + 所属卷/technique 板块作查重清单。**已写过什么以 `privacy/` 实际内容为准**。

### 2) 研究——只用高质量一手来源

- 用 WebSearch 检索 LLM 隐私攻防的实证研究与真实部署：成员推断 / 抽取 / 反演、DP·FL、机器遗忘、HE·MPC·TEE·机密推理、RAG/Agent 隐私、推理服务条款、合规。
- **来源质量硬标准**（命门，宁缺毋滥）：
  - **优先（业界实践优先于学术，见 `STYLE-GUIDE.md`「来源优先级」）**：① **业界实践**——厂商安全 / 数据治理 / 官方文档（Apple PCC·Security Research、Google DP / Gboard、Microsoft Presidio、NVIDIA、OpenAI / Anthropic data-retention、CCC）、真实部署与隐私事故复盘、标准（NIST SP 800-226、OWASP LLM Top 10、GDPR / EU AI Act 条文），即「各家线上实际怎么做」；② 顶会 / 期刊实证（**IEEE S&P、USENIX Security、ACM CCS、NeurIPS / ICML / ICLR、PoPETs**、arXiv 预印）作**机制背书**。论文不当头条；但本主题攻防机制多源于论文，**三道硬闸门不松**。
  - **拒绝**：内容农场、无数据的「N 个隐私技巧」、营销软文、找不到一手的二手转述。
  - 每个出处都 **WebSearch 复核标题 / 会议 / 年份真实存在**；**arXiv `/abs/` 常被代理 403** → 改用 dblp / 会议官网 / 出版社 / Semantic Scholar 核实，**不可核实的一律不用**。
- **量化声明过硬闸门 A**：ε/δ、攻击成功率、性能开销、保留天数、部署数量等——必带①一手出处②核验日期③实验/适用条件；核不到 → 降为条件化表述或 `:::caution 待核`，不裸写。

### 3) 去重 / 防冲突

- 每个候选对照第 1 步清单：**主题是否已被某条覆盖？** 接近就必须说清「卷 / 板块 / 角度有何不同」，否则丢弃或并入。
- 典型易撞：抽取 vs 成员推断 vs 属性推断；上下文面隐私 vs RAG/Agent；服务期 vs 合规；卷一机制 vs 卷五落地（机制层 vs 部署层）。区分不出就不立新条。

### 4) 产出候选清单，先给人过目

- 汇总成表：候选标题、卷、technique 板块、maturity、severity、**每条 ≥2 个已核实的一手出处**、「为什么不与现有条目重复」、以及「能否过 maturity 硬闸门 C」。
- **新增条目属需确认类**：交用户/发起者确认写哪些再进第 5 步。无人值守场景：无人确认则**只产出清单 + 开草稿 PR/issue 记候选，不直接合并**。

### 5) 写作（沿用验证过的流水线）

- 每条用 `aiwiki-privacy-entry-author` 写中文源（九节 + 第一人称红线 + 三道硬闸门 + 最小可测试断言）、`aiwiki-translator` 出英文镜像；**1 条 = 1 工作单元**。批量可并行 subagent，每个只动自己的新文件。
- 收口（主控做，不让子代理碰共享文件）：
  - 新术语并入 `terminology.md`（先补表再用）；新专名补 `.cspell.json`（非标准造词改回标准词，别加白名单）。
  - 若某卷首次出现真条目，**删该卷「本卷导言」占位**（中英）。
  - 统一同卷 `sidebar_position`；跨条目内链一律用 **`.mdx` 相对链接**（否则 `onBrokenLinks: throw` 拦）。
  - 新条目落地后跑 `npm run gen:meta`（更新 `entryMeta-privacy.json`）。
  - `BACKLOG-privacy.md`：标新增与进度；本轮分诊出的「认同但不做」结构/流程项写进对应区，**别只留对话**（会话压缩会丢）；结清的「写作前必核」待核项标 ✅。

### 6) 过闸门（缺一不可）

`autocorrect --lint .`（**全仓**，别只扫 privacy/，曾因漏扫 BACKLOG 让 CI 挂）· `cspell`（privacy/** + i18n/**）· `npm run check:i18n` · `npm run check:mirror`（两实例镜像）· `npm run build`（两 locale 两实例，含死链）· Vale 套话（本地无 vale 时按 `styles/AIWiki/Cliches.yml` token 逐条 grep，UTF-8 locale）。

### 7) 提交

- 遵守 `CLAUDE.md`/隐私版的**复用分支铁律**：动手前 `git fetch origin main` 并把 main 合并进工作分支；禁 force-push，非快进用「合并进分支」补救。
- 开**草稿** PR；新增条目留用户过目再合并。

## 失败 / 边界处理

- 这轮没有够格的新选题：诚实报「本轮无新增」，不为凑数硬写、不降来源标准。
- 拿不准是否重复、或密码学结论拿不准：默认**不立新条 / 不裸写**，列进 PR/issue 或 `:::caution 待核` 交人判断。
