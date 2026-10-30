# 选题储备库 / Backlog

本项目是**百科**，目标是把各阶段的「AI 使用误区」铺到足够密。这份清单记录尚待处理的提案、持续维护事项与已完成的选题。

> **状态**：⬜ 待做 / 待评估 ｜ 🔄 持续维护 ｜ ⏸️ 待外部证据触发 ｜ ✅ 仓库已落地 ｜ ❌ 历史取舍未采纳。
> **本次校准**：2026-10-30，对照仓库 `2920ff1` 的正文、中英镜像、配置、脚本及验收记录。✅ 表示对应仓库工件已存在并满足所述范围，不表示线上已更新，也不表示每篇文章的配方或实验均已运行。历史批次记录见文末。

## 当前行动清单

以下均为未完成或需评估的提案，不代表已经认领或正在实施。

- ⬜ **主题首页角色 CTA（可选扩展）**：[编码引言](docs/intro.md)及[英文镜像](i18n/en/docusaurus-plugin-content-docs/current/intro.md)已提供工程师、架构师、发布 / 安全三个角色入口及 `/roles` 回链；[主题首页](src/pages/index.mdx)及[英文首页](i18n/en/docusaurus-plugin-content-pages/index.mdx)仍按两大主题分流。若希望首次访问即按角色进入，可评估把编码引言的入口移植到主题首页，保留两主题的层级。
- ⬜ **`evidenceLevel` 证据强度轴**：现有 `evidence` 是作者依据来源记录的**证据类型**；[贡献指南](CONTRIBUTING.md)规定选取规则，[索引脚本](scripts/gen-mcp-index.js)直接读取 frontmatter，尚无从 `sources` 自动分类强度的实现。历史提案 `incident-backed` / `mechanism-documented` / `experience-based` / `speculative` 仅为候选取值，须先明确可重复的派生规则、混合证据及冲突处理，再评估术语、徽章和存量迁移，不能把来源类别当成结论强度。
- ⬜ **阶段总论**：各阶段已有 `_category_.json` 简介；原提案是在阶段入口补「这一阶段 AI 最容易整体性翻车的地方」的机制总论，并串起条目。简介存在不等于这一叙事层已完成，需先确认增量价值。
- ⬜ **人类职责边界（升级角色页）**：[角色页](src/pages/roles.mdx)及[英文镜像](i18n/en/docusaurus-plugin-content-pages/roles.mdx)已有各角色关注点和标签入口；尚缺逐角色明确「哪些判断不可外包」的责任层。
- ⬜ **案例卡片标准化**：[案例规范](CONTRIBUTING.md)和现有案例已包含时间、影响、来源及「印证 / 不证明」等内容；若继续做统一卡片，应先定义耐久字段与呈现方式。修复状态、工具版本按案例条件说明，不设为每案必显的统一字段；现有内容大半已具备，是否仍需统一字段或呈现方式待评估，不预设新增组件。
- ⬜ **必读 20 条轻量治理**：[页面](docs/core-20.mdx)与[写作规范](STYLE-GUIDE.md)已有入选依据；原提案中的 CONTRIBUTING 进出准则及页顶「非固定榜单」说明尚未齐备。保留轻量完善，四维数字评分仍不采纳。
- ⬜ **模板按使用者分组**：[分类说明](docs/toolkit/_category_.json)及[英文分类译文](i18n/en/docusaurus-plugin-content-docs/current.json)仍是通用工件介绍；可评估在 description 增加按角色 / 任务的分组地图，不必新增子目录和分类翻译键。
- ⬜ **后续策展专题**：AI Code Review 已完成；数据库迁移、多 agent 协作、成本治理可按需要评估聚合入口。已有 [schema 设计](docs/03-architecture/schema-design-sloppy.mdx)、[子代理边界](docs/00-setup-collaboration/subagent-no-boundaries.mdx)、[成本循环](docs/05-implementation/runaway-agent-loops.mdx)等正文，不等于这些专题页已经完成，也不应为专题重复立相同根因条目。
- ⬜ **可派生的成熟度标记**：`case-backed`（被案例反链）/ `template-linked`（被模板引用）仍为提案；[当前元数据组件](src/components/PitfallMeta/index.js)未实现这类状态轴。若做，仅收可机械派生的关系，不加主观 `draft/reviewed` 评级。
- ⬜ **最小协作工作流入口**：已有[小 bug 修复](docs/toolkit/workflow-small-bugfix.mdx)、[大重构](docs/toolkit/workflow-large-refactor.mdx)、[需求到发布](docs/toolkit/workflow-idea-to-release.mdx)、[AI 与人审分工](docs/toolkit/workflow-ai-human-review.mdx)及[最小安全基线](docs/threat-model.mdx)，尚未形成一个统一的端到端最小协作入口。先评估能否通过现有工件串联解决；这与历史上未采纳的独立「正用法」站区不是同一实现。
- ⏸️ **较弱的工具差异候选**：保留工作区信任、内容排除与数据使用策略等研究方向。2026-06/07 对 Cursor / Copilot 的观察只是历史候选，不能作为当前默认值；有足够一手证据且能说明独特防法时，再决定并入既有条目还是单列。当前核查入口见[工具矩阵](docs/tool-matrix.mdx)。

## 持续维护

- 🔄 **来源与适用边界**：工程实践优先已写入 [STYLE-GUIDE](STYLE-GUIDE.md) 和[作者 skill](.claude/skills/aiwiki-entry-author/SKILL.md)，属于已采用的规范；后续持续逐条执行，区分产品行为、受测研究和工程推断，不把规范存在当成所有结论永久有效。
- 🔄 **有意义的例外**：[条目模板](docs/_templates/entry-template.md)和写作规范已有可选「什么时候例外」。随事实复核补充适用边界，没有实质例外时可省略，不再按主题一概规定永不添加；历史「已回填 33 条」仅是当时批次记录。
- 🔄 **案例增补**：案例库基线已完成；仅在出现真实、公开、可核查且增加独立机制信息的案例时补充，保持中英、双链及「不证明」边界。事故披露不表示当前版本仍受影响。
- 🔄 **工具矩阵与工具差异**：机制级入口已完成；按[矩阵的核查日期及来源](docs/tool-matrix.mdx)和条目的复核触发条件维护，区分 CLI / IDE / 云端、版本、平台与权限模式。新增工具或差异需有证据；某文未覆盖不等于产品没有能力。
- 🔄 **统计、索引与镜像**：新增或实质修订时同步目录、[机制索引](docs/mechanisms.mdx)、中英元数据及机器索引；使用 [check:counts](scripts/check-counts.js)、[check:mirror-deep](scripts/check-mirror-deep.js) 和[内容检查](scripts/check-content.js)防漂移。脚本通过只证明其检查范围，不能替代逐条来源与配方验证。
- 🔄 **定期 / 事件触发复核**：遵循[复核治理](CONTRIBUTING.md)及文章的 `review_after` / `review_triggers`。2026-10-29 的 105 条旧文复核已结项，后续到期维护是新一轮工作，不能继续挂作同一批「进行中」。

## 原则

- **不为凑数硬填**：每条必须是一个独立、可核查的误区，有可靠出处。
- **加权分布**：误区在「编码实现」最密，「灵感/详细设计」天然薄，别平均摊。
- **活文档**：模型每次大更新都可能带来新误区，持续新增。

## 当前进度总览

| 阶段 | 仓库已收录 |
|------|------------|
| 00 准备与协作 | 18 |
| 01 灵感与可行性 | 6 |
| 02 需求分析 | 6 |
| 03 概要设计 | 7 |
| 04 详细设计 | 8 |
| 05 编码实现 | 17 |
| 06 测试 | 12 |
| 07 验收与发布 | 11 |
| **合计** | **85** |

> 口径：`docs/00-*` 至 `docs/07-*` 的误区正文，不含案例、模板、索引和隐私主题。配套目录见[案例库](docs/cases/)、[模板库](docs/toolkit/)及 [README 现状](README.zh-CN.md)；计数以实际文件和检查脚本为准。以下是选题收录记录，具体论断、版本和适用条件以正文为准。

## 00 准备与协作

- ✅ 一上来就把所有权限 / 自动确认都给我（过度授权，缺少 scope 边界）
- ✅ 把该进 settings 的东西塞进 CLAUDE.md（settings 管「能做什么」、CLAUDE.md 管「该知道什么」）
- ✅ [hook 与提示词的执行边界](docs/00-setup-collaboration/hooks-not-prompts.mdx)：明确覆盖事件、调用路径及失败处理。
- ✅ 给 MCP 过多 / 过敏感的访问，扩大提示注入面
- ✅ 多个 subagent 协作时没有清晰职责边界与共享状态契约
- ✅ [按任务风险使用计划](docs/00-setup-collaboration/skipping-plan-mode.mdx)，避免复杂或高后果任务未经澄清就执行。
- ✅ 没接版本化文档（如 Context7），放任我上网搜文档、猜 API
- ✅ [指令与可复用流程分层](docs/00-setup-collaboration/process-in-claudemd-not-skill.mdx)：skill 组织流程，仍须验证执行。
- ✅ 你越来越懒得查我：自动化偏误 / 技能萎缩 / 橡皮图章式审查（扩充，研究后新增）
- ✅ 破坏性 / 不可逆操作：删库、抹备份、无视冻结期（扩充，取材真实事故）
- ✅ 自主性 / 审批边界策略：按风险分级设人审门（治理子簇，研究支持）
- ✅ 数据边界策略：哪些数据绝不喂给外部 AI（治理子簇，OWASP LLM02）
- ✅ 沙箱 / 文件系统隔离：软权限 vs OS 级硬隔离（基础设施安全子簇，官方文档）
- ✅ 网络出口控制：砍掉致命三件套「对外通信」腿（基础设施安全子簇，SSRF / lethal trifecta）
- ✅ [世界可写配置提权](docs/00-setup-collaboration/world-writable-config-escalation.mdx)：历史漏洞与配置加载风险，按正文限定 ACL、受测工具版本和进程权限。
- ✅ [Gemini 文件夹信任继承](docs/00-setup-collaboration/gemini-folder-trust-inheritance.mdx)
- ✅ [Cursor ignore 文件的适用边界](docs/00-setup-collaboration/cursor-ignore-best-effort.mdx)
- ✅ [Skill 与插件供应链](docs/00-setup-collaboration/skill-plugin-supply-chain.mdx)

## 01 灵感与可行性

- ✅ 找我验证想法时，我会不自觉地偏向支持你（谄媚 / 确认偏误）
- ✅ 让我做市场 / 竞品调研时，我会编造数据和来源
- ✅ 把「AI 说能做」直接当成可行性结论，不另做验证
- ✅ 非确定性：同一想法两次问给出相反结论，你却没察觉
- ✅ 我会自信地把错的解释成对的（查缺补漏，区别于谄媚/非确定性）
- ✅ 我倾向低估复杂度和工期（查缺补漏，规划谬误，区别于「能不能做」）

## 02 需求分析

- ✅ 需求缺口处，我倾向于硬猜而不是反问
- ✅ 缺少真实输入时，我用占位符（假的环境变量 / API key）糊过去
- ✅ 不追问就把模糊需求当成明确需求开干
- ✅ 我的隐式假设没有外显，你以为我们想的是一回事
- ✅ 该写规格（spec）的任务，也被「凭感觉」做了
- ✅ 需求镀金：我自作主张把需求做大（查缺补漏，区别于代码层多改）

## 03 概要设计

- ✅ 让我出架构方案时，我倾向过度设计、堆时髦技术，且默认不质疑你的选型
- ✅ 我对过往的架构权衡零记忆，于是重复决策、忽略既有模式
- ✅ 我只给一个方案，而不是把「比较与权衡」摊开给你
- ✅ 跨模块 / 跨仓改动时，我产生重复逻辑和幻觉 import
- ✅ 依赖膨胀：为小需求引入重依赖（查缺补漏，区别于重复造内部轮子）
- ✅ 过早抽象 / 推测性通用化（查缺补漏，区别于系统级过度设计）
- ✅ 数据模型 / schema 定得草率，后期迁移牵一发动全身（查缺补漏）

## 04 详细设计

- ✅ 我容易漏掉边界条件（实现层）
- ✅ 我给的方案「看起来对」，但经不起边界推敲（设计层）
- ✅ 风格漂移：同一类问题我今天用 async/await、明天用 promise 链
- ✅ 我引入性能反模式而不自知
- ✅ 并发 / 竞态：单线程跑得对，一并发就出错（查缺补漏）
- ✅ 魔数 / 硬编码：把该配置的值写死进代码（查缺补漏）
- ✅ [文件系统事件与写入顺序假设](docs/04-detailed-design/fs-event-ordering.mdx)
- ✅ [预览与执行不同源](docs/04-detailed-design/preview-and-execution-diverge.mdx)

## 05 编码实现

- ✅ 厨房水槽式会话：把无关任务堆进同一段对话
- ✅ CLAUDE.md 过载：规则太多，我反而忽略一半
- ✅ 反复纠正污染上下文（→ 回滚而非硬纠）
- ✅ 不懂 `/compact` 时机：要么太晚、要么在关键时刻触发把进度冲掉
- ✅ 我在快速演进的库上幻觉 API / 版本漂移
- ✅ 过度编辑：你只问一个文件，我改了五个
- ✅ 我不引用具体文件状态，按「干净重来」覆盖了你的改动
- ✅ 长重构中途我跟丢了「已经改过哪些文件」
- ✅ 退化式调试循环 / pattern locking：反复套失败修法越改越糟（扩充）
- ✅ [上下文腐烂与关键信息利用](docs/05-implementation/context-rot.mdx)：按模型、任务、干扰与位置条件理解受测结论。
- ✅ 吞掉异常 / 空 catch 让它「跑通」（查缺补漏，区别于退化调试循环）
- ✅ 开发期提示注入：读了恶意 README/issue/rules 就被劫持（查缺补漏）
- ✅ Agent 失控循环烧 token / 成本失控（查缺补漏，成本维度）
- ✅ 注释 / 文档与代码漂移（查缺补漏）
- ✅ Git 卫生：巨型提交 / 烂提交信息 / 提交垃圾（查缺补漏）
- ✅ [长任务恢复、重试与幂等](docs/05-implementation/durable-tasks-retry-idempotency.mdx)
- ✅ [外部命令继承配置](docs/05-implementation/shelling-out-inherits-config.mdx)

## 06 测试

- ✅ 信任但不验证：我写的代码「看起来对」≠「真的对」
- ✅ 嫌麻烦不建测试基础设施
- ✅ 我写的测试只覆盖 happy path，不测边界
- ✅ 为了让测试通过，我去改测试 / 造假断言
- ✅ 用测试给我建一个能自己跑、能给通过/失败信号的验证闭环（最佳实践向）
- ✅ 过度 mock：把真实依赖 mock 掉，测了个寂寞（查缺补漏，区别于只测 happy path）
- ✅ 让我审查我自己写的代码：自我偏好偏差（AI 审查子簇，研究支持）
- ✅ 审查只挑表面 / 风格，漏语义与逻辑 bug（AI 审查子簇）
- ✅ 只看 diff 不看上下文的「上下文饥饿」审查（AI 审查子簇）
- ✅ 审查谄媚 + 橡皮图章：迎合作者框架 / 人盖章 AI 审查（AI 审查子簇）
- ✅ [测试 fixture 造假](docs/06-testing/test-fixture-fabrication.mdx)
- ✅ [代理评测不能只靠单元测试](docs/06-testing/agent-evals-not-just-unit-tests.mdx)

## 07 验收与发布

- ✅ 让我配 CI/CD 时，我会想当然地加自动化步骤、忽略权限边界（取材本项目真实踩坑）
- ✅ 「demo 能跑就发布」，我说「看起来没问题」不等于通过验收
- ✅ 我引入安全漏洞 / 泄露敏感数据（不懂访问控制与数据敏感度）
- ✅ 提示注入（prompt injection）在发布面被利用
- ✅ 回归没做，旧功能被悄悄改坏
- ✅ 「三个月技术债墙」：快速堆砌后维护成本集中爆发
- ✅ 迭代中安全性退化：越让我反复改、漏洞越积越多（扩充，IEEE-ISTAS 量化）
- ✅ License / IP 污染：逐字复现训练数据里受版权/copyleft 保护的代码（查缺补漏）
- ✅ AI 生成代码的归属 / 责任 / IP 治理（治理子簇，US Copyright Office）
- ✅ 日志注入 / 审计链污染：审计完整性与注入面（基础设施安全子簇，OWASP CWE-117）
- ✅ [文档限制不能替代防护](docs/07-acceptance-release/documented-limits-not-defenses.mdx)

---

## 已完成的结构与流程

- ✅ **案例库基线**：目前收录 [Replit](docs/cases/replit-prod-db-deletion.mdx)、[Samsung](docs/cases/samsung-chatgpt-source-leak.mdx)、[Gemini Tracebit](docs/cases/gemini-cli-tracebit-rce.mdx)、[Codex 配置 RCE](docs/cases/codex-cli-config-rce.mdx)、[Copilot CamoLeak](docs/cases/github-copilot-camoleak.mdx)，均有英文镜像及「印证 / 不证明」块。旧「脚手架 + 2 例」描述已被后续增补取代；持续补例见上，不再标作正在搭建。
- ✅ **工具矩阵机制级升级**：[矩阵](docs/tool-matrix.mdx)及[英文镜像](i18n/en/docusaurus-plugin-content-docs/current/tool-matrix.mdx)已按工具列出本次已核机制、仍需确认的边界、问题入口及历史案例。已满足原「让读者知道差异是什么」的意图，无需强行恢复旧勾选网格或「稳定 / 版本观察」两层形状；当前事实以页面核查日期及来源为准。
- ✅ **短导航与适用范围回填**：本次逐文件核对了编号条目的中英 frontmatter，`sidebar_label` 与 `applies_to` 均无缺失；「01–07 尚未回填」及「只在 Gemini 试点」已过时。依据见[写作规范](STYLE-GUIDE.md)、[术语](terminology.md)及 [docs](docs/) / [英文正文](i18n/en/docusaurus-plugin-content-docs/current/)。字段存在证明覆盖，不代表标签含义无需人工复核。
- ✅ **编码引言角色 CTA**：[中文](docs/intro.md)和[英文](i18n/en/docusaurus-plugin-content-docs/current/intro.md)均有角色按钮；主题首页的可选扩展另列当前行动，避免混为一项。
- ✅ **分类页卡片徽章**：[DocCard](src/theme/DocCard/index.js)展示严重度 / 角色等已有元数据，[生成器](scripts/gen-entry-meta.js)从 frontmatter 派生，[prebuild](package.json)已接入。未因此新增主观成熟度或来源强度分类器。
- ✅ **统计与镜像闸门**：[计数检查](scripts/check-counts.js)覆盖手写现状，[深层镜像检查](scripts/check-mirror-deep.js)比较结构与链接，均接入 [CI](.github/workflows/lint.yml)。历史验收的条目数 / 镜像对数只是当时基线，当前口径见进度表与 [README](README.zh-CN.md)。
- ✅ **模板库与适用边界**：[目录](docs/toolkit/)及[英文镜像](i18n/en/docusaurus-plugin-content-docs/current/toolkit/)已有基础、工作流、治理工件，以及后续的[提示结构骨架](docs/toolkit/prompt-structure-skeleton.mdx)、[代理升级评测模板](docs/toolkit/agent-upgrade-eval-template.mdx)；各模板已有适用边界。旧「12 件 / 仅 5 件补边界」是批次范围，不是当前覆盖声明；工件存在不表示其配方均已实际运行。
- ✅ **安全策展与最小安全基线**：[威胁模型页](docs/threat-model.mdx)及[英文镜像](i18n/en/docusaurus-plugin-content-docs/current/threat-model.mdx)聚合安全 / 治理条目、案例和基线，并有[导航入口](docusaurus.config.js)。这里的基线是已有清单，不能据此宣称安全控制均已在部署中生效。
- ✅ **机制索引与必读入口**：[机制索引](docs/mechanisms.mdx)按七个主因桶策展，[内容检查](scripts/check-content.js)检查每篇误区恰好出现一次；[必读 20 条](docs/core-20.mdx)及中英引言提供优先阅读入口。旧「全 76 条」已被当前目录取代；定量评分提案仍未采纳。
- ✅ **AI Code Review 专题**：[专题页](docs/code-review.mdx)及[英文镜像](i18n/en/docusaurus-plugin-content-docs/current/code-review.mdx)串起自审、漏逻辑、上下文不足与谄媚等审查条目和分工工件。其余策展专题仍待评估，不继续用「批次一进行中」代表整个方向。
- ✅ **fixture / 文件事件候选落地**：[测试数据造假](docs/06-testing/test-fixture-fabrication.mdx)、[文件事件顺序](docs/04-detailed-design/fs-event-ordering.mdx)及英文镜像已收录，并进入中英机制索引；不再是等待挑选的候选。正文存在和文档复核不等于其中每个示例均已执行。
- ✅ **自主审批 / 测试闭环独立条目**：[自主审批边界](docs/00-setup-collaboration/autonomy-approval-boundaries.mdx)与[测试闭环](docs/06-testing/tests-as-verification-loop.mdx)均已发布到仓库并有英文镜像。历史「仅并入小节，不另立条目」的决定已被后续实现取代；保留当前不同机制与工程用途。
- ✅ **首次刷新验收与 105 条旧文复核**：[初次验收](ACCEPTANCE-20261029.md)、[总览](REVIEW-SUMMARY-20261029.md)及三份逐篇记录（[编码边界](REVIEW-coding-boundaries-20261029.md)、[工程实践](REVIEW-coding-engineering-20261029.md)、[隐私](REVIEW-privacy-20261029.md)）记录已完成的来源复核、中英修订与验证。105 指该批旧文清单，不是当前全站文章数；验收限记录所述源码、构建、抽查与测试，未声称所有配方重跑或线上已更新。

## 历史快照与取舍

本节只解释旧记录如何迁移，不是当前行动指令，也不构成新一轮撰写、发布或部署授权。

- **第一版规模与旧计数**：2026-06/07 的首版规划为约 50–66 条，随后曾有 76 / 77 / 79 条等快照；案例从最初 2 例扩充，模板与镜像对数也随批次增长。它们不再约束当前规模，现状见上表、README 和检查脚本。
- **工具差异扩充批次**：2026-06/07 曾按「12 → 17 → 20 条带差异小节」推进，并记录过具体默认值、产品生命周期与工具能力判断。这些是当时研究记录，不作为当前事实复制；现行矩阵已改为带来源与核查日期的机制入口。新增工具与差异属于持续维护，不是仍未触发的脚手架任务。
- **根因去重决策的后续变化**：曾评估不单列自主审批与测试闭环；后续已形成独立正文，旧「弃写」结论失效。fixture 和文件事件候选亦已完成。数据库迁移、多 agent、成本治理保留为策展候选，不据历史文字自动扩写。
- **2026-06 第七轮英文首页告警**：当时复核记录为旧部署缓存导致的误报；这是历史结论，不能替代当前双语验收。2026-10-29 的双语与预览检查另见验收报告。
- **机制桶调整**：历史上将过大的「全局视野不足」拆成局部与长期演进视野，形成现行七桶；未另设「治理责任」机制桶，治理问题通过威胁模型轴策展。
- ❌ **独立「正用法」站区 / 改名去第一人称**：保留当时未采纳的取舍。正向做法分布于条目、机制索引和工具模板，第一人称是写作视角、证据才支撑结论；该取舍不阻止评估现有工件组成的最小协作工作流。
- ❌ **主观量化评级**：不采纳必读榜单四维数字打分及主观 `draft/reviewed` 成熟度。尚待评估的可派生强度 / 关系标记不能据此视为已设计或已实现。
- ✅ **早期评审已满足项**：证据类型徽章、出处规范、案例归因与模板边界已有实现和规范。维护时仍需检查具体事实与来源，不以一次评审结项代替后续核验。
