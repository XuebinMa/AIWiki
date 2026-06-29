---
name: aiwiki-privacy-entry-author
description: 为 AiWiki「LLM 隐私保护」主题撰写或修订一条攻防条目（privacy/ 下的 .mdx）。当需要新增/改写隐私条目、并保证第一人称红线、九节结构、三道硬闸门、隐私 frontmatter 与一手出处时使用。
---

# AiWiki 隐私条目作者

把一个「LLM 隐私攻防机制」写成符合「LLM 隐私保护」主题规范的条目。**准确门槛高于「AI 编码误区」主题**——写错会让工程师做出**假安全**系统。原则：质量第一、证据第一；密码学拿不准就 `:::caution 待核验` + 记 `BACKLOG-privacy.md`，绝不裸写。

## 动手前先读（不要在本 skill 里重复它们的内容）

- `STYLE-GUIDE.md`「LLM 隐私保护主题专属规范」—— 第一人称红线（强规则）+「可 / 不可第一人称」对照表 + 九节结构。命门。
- `BACKLOG-privacy.md`「硬闸门 A/B/C」+「写作前必核」+「分类必核清单 A–G」—— 写作前逐项过。
- `privacy/_templates/entry-template.md` —— 隐私 frontmatter + 九节骨架（导入 `PrivacyMeta`）。
- `terminology.md`「LLM 隐私保护主题术语」—— 隐私术语 + era / technique / maturity / audience / severity 枚举。先补表再用。
- `PROPOSAL-privacy-book.md` —— 定位（工程隐私风险与防护手册）、六卷结构、§7.3 红线。
- 达标样例：首条样板定稿后回填指向它；在此之前，密度与语气以模板加一条已达标的「误区」条目为参照。

## 三道硬闸门（写作前必过；未过不写）

- **A 量化声明**：凡 ε/δ、攻击成功率、性能开销、部署数量、保留天数、吞吐 / 延迟——必带①一手出处②核验日期③实验 / 适用条件。性能数字给全字段（硬件 / 模型规模 / batch / 序列长度 / baseline / 安全模式 / 是否含远程证明·加密通道 / 出处时间）。三不写：未回一手出处不写、没有实验条件不写、没有适用边界不写。
- **B 内省表达（第一人称红线）**：禁「我记得 / 我知道 / 我忘了 / 我保证不泄露 / 我确认合规」——改写成可外部观察的行为或机制倾向（对照表见 `STYLE-GUIDE.md`）。
- **C 成熟度**：`maturity=生产` 须有真实部署 / 厂商文档 / 标准推荐 / 可核查案例；否则只能 `研究` / `试验`。

## 步骤

1. **定位卷 + 技术板块**：判断属六卷哪一卷（进对应 `privacy/0X-*/` 目录）+ 14 技术板块哪一个（frontmatter `technique`）。
2. **过分类必核清单**：按板块对应 `BACKLOG-privacy.md`「分类必核清单 A–G」逐项核（攻击者模型、隐私单位、威胁模型、成熟度证据…）。
3. **建文件**：复制 `privacy/_templates/entry-template.md` 到该目录，命名 `<slug>.mdx`，删模板里的注释。
4. **填隐私 frontmatter**：title / slug / sidebar_label / audience / era / technique / attack_surface / severity / maturity / evidence / tags / sources。`sources` **至少两条可核查一手出处**；任何量化声明必回一手。叙事长标题必配短 `sidebar_label`（名词短语）。
5. **写九节**（顺序不可变）：一句话摘要 → 机制（我这边发生了什么，第一人称 + 机制图）→ 威胁面 → 防护原理 → 落地实现（配方 + 结尾收一个 **最小可测试断言** 小块：怎么测 / 通过证明什么 / 失败看到什么——把风险变成 CI / eval / 审计里可回归的断言）→ 真实案例 / 生产部署 → 残余风险与权衡 → 版本说明（`:::note`）→ 延伸阅读与出处。可选小节：合规映射 / 何时这条防护不适用 / 与相邻技术的区别 / 框架差异（短、打版本戳，无内容就删）。
6. **插 PrivacyMeta**：顶部 `<PrivacyMeta era=… technique=… audience={[...]} severity=… maturity=… evidence=… />`，props 与 frontmatter 完全一致。
7. **专打假安全**：在「残余风险」段点破——朴素匿名化可被去匿名化、抑制 ≠ 真删除、关掉训练开关 ≠ 不留存、ε 不为零意味着什么。
8. **配图**：机制处用 Mermaid 自绘（零版权风险）。注意 SVG 文本模式：节点标签只用纯文本和 `<br/>` 换行，别放 `&nbsp;` 等 HTML 实体。
9. **存疑标记**：拿不准的密码学结论就地 `:::caution 待核验`，并把待核项记入 `BACKLOG-privacy.md`「写作前必核」，绝不让不确定冒充定论。
10. **出英文版**：调用 `aiwiki-translator`（`terminology.md` 已扩隐私术语段），输出到 `i18n/en/docusaurus-plugin-content-docs-privacy/current/<相同子路径>/<slug>.mdx`。
11. **跑闸门**：autocorrect / Vale / cspell（含 `privacy/**` glob）/ `npm run check:i18n` / `npm run check:mirror` / `npm run build`（两 locale 两实例）。
12. **占位收尾**：若该卷还挂着「本卷导言」占位、且本条是该卷首条真条目，把占位删掉或改写成真正的卷导言。

## 与「AI 编码误区」主题条目的区别（别混）

- 结构是**九节**（不是七段）；元数据组件是 `PrivacyMeta`（不是 `PitfallMeta`）；轴是卷 / 技术板块 / 受众 / 隐私风险 / 成熟度 / 证据。
- 准确门槛更高：多了三道硬闸门和第一人称红线；密码学数字与「已生产」声明是头号风险区。
- 落到第二实例 `privacy/`，镜像到 `docusaurus-plugin-content-docs-privacy/current/`（不是 docs 实例）。

## 红线（写之前默念）

- 第一人称只述**可外部观察的行为 / 机制倾向**，禁虚假内省（B 闸门）。
- 量化数字一律带条件——同一指标常因 workload 差一个数量级，不裸写单一乐观数。
- 不编造、不采纳评审幻觉：评审意见也要回一手出处（治理原则，证据纪律对评审者一视同仁）。
- 拿不准就 `:::caution 待核验` + 记 `BACKLOG-privacy.md`，不让不确定冒充定论。
