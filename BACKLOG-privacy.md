# 选题与待办储备：「LLM 隐私保护」主题 / Backlog

「LLM 隐私保护」是 AiWiki 百科下与「AI 编码误区」**并列的主题**，面向 LLM 隐私保护工程师，偏原理 + 实现 + 真实案例，按 LLM 发展史叙述、持续更新。本文件是该主题自己的看板，**与第一个主题的 `BACKLOG.md` 分开**（别混）。立项与架构见 `PROPOSAL-privacy-book.md`。

> 状态：⬜ 待做 ｜ 🟡 进行中 ｜ ✅ 已落地 ｜ ❌ 评估后不做
> 范围纪律：精而深，不追条数（见 PROPOSAL 第 4 节）。**定位**（评审 R1 收敛）：一本**工程隐私风险与防护手册**，围绕一个问题组织——「LLM 系统里的敏感数据在训练、微调、RAG、agent、推理服务、日志、删除请求、合规审计中会在哪里泄露？工程上怎么验证、降低、证明、追踪？」不做大而全综述站。

## 写作前必核（事实核验欠债，最高优先）

> **铁律**：本主题准确门槛高于「误区」——写错会让工程师做出**假安全**系统。任何 ε/δ、性能开销、「已生产部署」类声明，进正文前必须有**一手出处 + 版本戳 + 适用条件**（workload / 硬件 / 模型规模）；research 与 production 用 `maturity` 区分，「生产」必须有真实部署或厂商文档支撑。
>
> **本「写作前必核」是强制闸门，不是提醒**：每条隐私内容写作前必须逐项过；未过不写（评审 R2）。

> **治理原则（原样入库，评审 R2）**：**证据纪律对评审者也一视同仁**——评审意见（含本主题的独立评审 ChatGPT）不因「听起来专业」就直接入库，同样要回一手出处。否则 AiWiki 会从「反对 AI 幻觉」滑成「采纳评审幻觉」。

### 硬闸门（强制，每条写作前必过；评审 R2）

- **A. 量化声明闸门**：凡出现 ε/δ、攻击成功率、性能开销、部署数量、star 数、更新时间、保留天数、模型规模、吞吐 / 延迟——必须有 ① 一手出处 ② 核验日期 ③ 实验 / 适用条件，**不得裸写结论**。「三不写」：未回一手出处不写、没有实验条件不写、没有适用边界不写。性能数字必同时给：硬件 / 模型规模 / batch size / sequence length / throughput·latency 指标 / baseline / 安全模式 / 是否含远程证明·加密通道·I/O / 出处时间。
- **B. 内省表达闸门**：凡出现「我记得 / 我知道 / 我忘了 / 我保证不会泄露 / 我确认合规」，一律改写为可外部观察的行为或机制倾向（见 PROPOSAL §7.3 第一人称红线）。
- **C. 成熟度闸门**：`maturity = production` 必须满足至少一项——真实生产部署论文 / 官方厂商文档 / 标准框架明确推荐且有工程实践 / 可核查公开案例；否则只能 `research` 或 `experimental`。

### 立项 + 评审阶段遗留待核（凭知识/二手提及，未二次核）

- ⬜ **Apple PCC（Private Cloud Compute）**：机密推理生产实例，本会话未检索。核机制（TEE / 远程证明）、定位、发布时间。出处：Apple Security 官方。
- ⬜ **Carlini 等 · 抽取 / 量化记忆**：核确切标题 / 年份——《Extracting Training Data from Large Language Models》（USENIX Security 2021？）、《Quantifying Memorization Across Neural Language Models》（2022/2023？）。
- ⬜ **PATE**：全称 Private Aggregation of Teacher Ensembles、出处（Papernot 等 2017？）、与 DP-SGD 区别。
- ⬜ **机密推理开销（高优）**：我写「H100/H200 约 95–99% 原生」过乐观；评审 R1 给「penalty 约 4–8%」与「模型换入换出场景低 45–70%」。**这三个数都待一手核**，落条目必须带条件（workload / batch / seq len / 模型规模 / 是否含权重保护 / against provider 还是 co-tenant）。
- ⬜ **Gboard DP 模型数**：我「15+」vs 评审 R1「二十多个」——以一手论文（Xu 等 2023）为准。
- ⬜ **二手 → 一手升级**：HE 约 10⁴× 开销；竞品 `Awesome-*` 的 star 数 / 出版年。
- ⬜ **评审 R1 引用的数据同样待核**：4–8% / 45–70% / 「二十多个」不因来自评审而免检——一视同仁查一手。

### 分类必核清单（A–G，写对应条目前逐项核；采纳评审 R1）

- ⬜ **A. DP / FL**：隐私单位（sample / user / device / client-level）；邻接关系定义；ε、δ 或 ρ-zCDP 含义；隐私会计（RDP / PRV / zCDP / DP-FTRL）；clipping norm、noise multiplier、采样方式；有无 secure aggregation；formal DP 还是「privacy-inspired」；效用下降指标；攻击模型是否仍成立。
- ⬜ **B. 记忆抽取 / MIA**：目标模型类型（open-weight / API / black/white-box）；攻击者是否知训练分布；查询预算；是否需 logprobs；extraction 成功标准；目标样本是否重复/罕见/格式固定；区分 memorization / regurgitation / extraction；MIA 的 base-rate 问题；benchmark 还是真实系统案例。
- ⬜ **C. 机器遗忘**：删除目标（样本/实体/概念/能力/风格/知识）；删除阶段（训练前/中/后/推理抑制）；true unlearning 还是 output suppression；验证指标（forget quality / retain utility / attack resistance）；防 re-learning；是否影响相邻知识；是否适用 closed model；有无法律意义删除证据。
- ⬜ **D. TEE / HE / MPC / 机密推理**：威胁模型（保护谁不看见什么）；信任根（CPU/GPU TEE / cloud / hardware vendor）；远程证明；数据在 CPU-GPU 通道/显存/主存/磁盘/日志的状态；侧信道假设；性能（throughput/latency/batch/seq len）+ 模型规模 + 硬件型号；保护权重/prompt/输出/KV cache 哪些；against provider 还是仅 co-tenant。
- ⬜ **E. RAG / Agent**：租户隔离模型；向量库 ACL 检索前执行还是检索后过滤；embedding 是否可逆/可推断；chunk 是否含 PII；tool output 是否进长期 memory；agent 是否可外联；untrusted content→tool call 链路；日志/trace/observability 是否记录私有上下文；跨用户会话记忆是否共享。
- ⬜ **F. 推理服务期**：API 输入是否用于训练；retention period；abuse monitoring 数据保留；enterprise/team/free 差异；fine-tuning data retention；opt-out 是否覆盖日志/缓存/评估/人工 review；data residency；subprocessors；zero data retention 条件；有无 DPA/BAA/HIPAA/SOC2。
- ⬜ **G. 合规**：法条版本 + 生效时间；管辖区；数据主体权利；controller/processor 责任；透明度义务还是技术删除义务；训练数据/权重/RAG 库/日志/缓存分别如何处理；有无真实监管/执法案例；技术措施与法律满足之间的差距。

## 评审分诊记录

> 沿用第一个主题的约定：评审里「认同但暂不做」的结论落这里，别只留对话。处置：✅ 照改 ｜ 🟡 部分认同 ｜ ↩️ 反向 / 保留。

### R1 · ChatGPT（2026-06，基于 PROPOSAL）

| 评审点 | 处置 | 说明 / 落点 |
|---|---|---|
| 「没有任何现成资源」过满 | ✅ | 改「未见主流公开资源」（proposal §0，本轮已落） |
| 差异化别只押第一人称 | 🟡 | 重定主轴：第一人称=可读性 + **品牌识别**；护城河=闭环 + 证据纪律+maturity+ 刷新（proposal §5 已落护城河校准） |
| 第一人称禁「虚假内省」 | ✅ | §7.3 改为只述可外部验证行为/机制 + 对照表（本轮已落，并修了原违规例子） |
| maturity 设硬约束 | ✅ | 「生产」须真实部署/厂商文档；写进必核通用规则（已落本文件） |
| 卷一只讲最小承重地基 | ✅ | 不写成 PPML 教材；DP/HE/MPC/TEE 各只讲后续条目依赖的最小集（M0.5 落 proposal §6.1） |
| 卷五拆三小节 | ✅ | 私有计算与机密推理 / 可验证删除与遗忘 / 生产级 DP·FL（proposal §6.1 已加注，M0.5 展开） |
| 卷六=合规索引 + 每条加合规映射 | ✅ | 合规贯穿；每条技术条目加「合规映射」小段（短、打戳，防法条腐烂）（M0.5/模板） |
| 板块去重：抽取 vs 推断 | ✅ | 抽取=模型能否生成/泄露训练样本；推断=能否判定成员/属性/表示存在（M0.5 §6.2） |
| 板块去重：上下文面隐私 vs RAG/Agent | ✅ | 「系统提示词与上下文泄露」重定为更底层「上下文面隐私」（system/developer/conversation/tool result/hidden chain/retrieved chunk）；RAG/Agent 专注多租户检索/外联/跨会话记忆/数据边界（M0.5 §6.2） |
| 板块去重：服务期 vs 合规 | ✅ | 服务期讲工程机制，合规讲责任映射（M0.5 §6.2） |
| +板块「数据生命周期与数据治理」 | ✅ | 采集/清洗/标注/训练/评估/日志/删除/备份 + consent/license/最小化/lineage + **删除请求跨存储传播**（M0.5 §6.2，板块 13） |
| +板块「隐私评测与审计」 | ✅ | canary/exposure/MIA bench/PII & prompt leakage eval/RAG ACL test/red-team/DP accountant validation/unlearning verification（M0.5 §6.2，板块 14；工程手册主线之一） |
| 企业部署/供应商数据边界 | 🟡 | 内容全收，但**不单设板块**——并入板块 11（推理服务期）+ 做 toolkit checklist（控板块数；评审亦称「不一定写长」） |
| 多模态 | 🟡 | M0 排除，记入**范围边界**（后续扩展）（M0.5 §1/范围节） |
| 定位收敛为「工程隐私风险与防护手册」 | ✅ | 已写进本文件顶 + proposal（M0.5 §0/§4 校准措辞） |
| 首批样板四面 | 🟡 | 采纳记忆抽取 + DP·FL 生产 + RAG·Agent + 推理服务数据边界；**DP 最小地基并进 DP·FL 条目**；私有推理留作批 1.5 的 §6.4 多路线范例 |
| H100 数字过乐观 | ✅ | proposal §6.1 已加条件 + 入必核（见上） |
| 评审给的数字本身 | ↩️ | 4–8%/45–70%/「二十多个」不免检，入必核一视同仁查一手 |

### R2 · 用户 + ChatGPT（2026-06，对 R1 分诊的再评审）

- ✅ 认可 R1 分诊（评价「比全盘采纳更成熟」）；**证据纪律对评审者一视同仁**升为治理原则（见顶部）。
- ✅ 过满断言用带时间戳 + 判定条件的最终措辞（proposal §0 已落）。
- ✅ 「禁止虚假内省」升为**红线强规则**（proposal §7.3 红线块；待进隐私版 STYLE-GUIDE，CI/评审按它卡）。
- ✅ 量化数字 → **三道硬闸门 A/B/C** + 性能数字必填字段（见顶部）。
- ✅ 第一人称三层定位（品牌识别 / 可信度护城河 / 内容壁垒；入口差异非壁垒）（proposal §5 已落）。
- 🟡 企业 / 供应商并入板块 11 + toolkit「LLM Vendor Data Boundary Checklist」（见待办）。
- 🟡 板块 13/12 边界澄清（见选题储备）；首批样板四类确认（模型内化 / 训练期 / 集成期 / 运营期 各一）。

## 选题储备（按卷 × 技术板块，待逐条立项）

> 卷（阅读主线）与技术板块（查询轴）见 PROPOSAL 第 6 节（板块经 R1 调整为 14，含去重边界）。下面只占位，逐条进流水线前再细化、去重、配 ≥2 个一手出处。

- ⬜ 卷一 · 隐私根基（**只讲最小承重地基**）：MIA 起源；DP（邻接/ε,δ/隐私会计/DP-SGD/用户级 vs 样本级/效用权衡）；HE·MPC（保护什么、开销、威胁模型）；TEE（运行时数据/远程证明/信任边界/侧信道/供应商信任）。
- ⬜ 卷二 · 记忆与抽取（**旗舰**）：逐字/量化记忆、抽取攻击、影响因素、去重/DP 预训练/记忆审计。
- ⬜ 卷三 · 对话大模型：PII 回吐、上下文面隐私（系统提示词等）、DP 微调。
- ⬜ 卷四 · RAG 与 Agent：多租户检索泄露、跨会话记忆串味、工具外联/数据边界。
- ⬜ 卷五 · 前沿落地（**拆三小节**）：① 私有计算与机密推理（TEE/GPU CC/HE/MPC）② 可验证删除与机器遗忘 ③ 生产级 DP·FL 部署（Gboard、Apple 本地 DP）。
- ⬜ 卷六 · 治理合规（**合规索引**）：GDPR Art.17、EU AI Act、NIST、OWASP LLM02 映射；并要求各技术条目带「合规映射」小段。
- ⬜ 技术板块新增：13 数据生命周期与数据治理；14 隐私评测与审计。**13 vs 12 边界（评审 R2）**：数据生命周期 = 数据在哪流动 / 存储 / 复制 / 删除 / 备份（where）；治理与合规（板块 12）= 谁负责 / 法律映射 / 审计证据留存（who·law）。

## 结构 / 流程待办

- ✅ **M0.5（proposal 修订一轮）**：已落（当前 `PROPOSAL-privacy-book.md` 即 M0.5 版：§6.4 并行路线、卷一最小地基、卷五拆三、卷六贯穿 + 合规映射、板块 14 + 去重边界、定位措辞、多模态范围边界、首批样板四面、「书→主题」命名清洗）。
- ✅ **frontmatter 轴枚举**：`era` / `technique` / `attack_surface` / `maturity` / `audience` 定稿写进 `terminology.md`「枚举值映射（隐私 frontmatter 与 `<PrivacyMeta>`）」；`maturity`「研究 / 试验 / 生产」为硬约束（硬闸门 C）。
- ✅ **`severity` 隐私语义**：沿用高/中/低（显示作「隐私风险」），已写 `terminology.md`；不另拆「数据敏感度」轴（PROPOSAL §13 已定）。
- ✅ **本地搜索多实例**：已验证 `@easyops-cn/docusaurus-search-local` 的 `docsRouteBasePath` 接受 `string[]`，设为 `['/', 'privacy']`，**两实例都入本地索引**，无需切 Algolia。
- ⬜ **技术评审人**：密码学准确性（尤卷一/卷五）需独立评审。**ChatGPT 作内容独立评审人**（R1 已收）；Claude 对其意见可提异议（如 R1 的数字、板块数、首批样板），目标协作。后续评审继续落「评审分诊记录」。
- ✅ **dogfooding-checklist**：`DOGFOODING.md`（repo 级精简）+ `CLAUDE.md` 一行指针；三道硬闸门进 `DOGFOODING.md` pre-PR 清单 + `STYLE-GUIDE.md`「LLM 隐私保护主题专属规范」（未堆 CLAUDE.md）。
- ⬜ **企业/供应商数据边界 checklist**：toolkit 工件「**LLM Vendor Data Boundary Checklist**」+ 并入板块 11（推理服务期）。覆盖：是否用于训练 / retention / abuse monitoring / fine-tuning data / zero data retention / enterprise·team·consumer plan 差异 / subprocessors / region·residency / DPA·BAA / observability·tracing 二次泄露。（M5）
- ✅ **第一人称纪律对照表**：已写进 `STYLE-GUIDE.md`「第一人称红线（强规则）」的「可 / 不可第一人称对照表」。
- ✅ **M1 最小化**：脚手架最小可渲染已落（第二实例 + 侧边栏 + 六卷 + i18n 镜像 + 模板 + 术语 + 导读 + 闸门扩面 + `PrivacyMeta` + `DocCard` 适配 + `entryMeta-privacy.json`）。**轴索引页（技术板块 / 威胁→缓解矩阵 / 案例库）等有内容后再做**（M5）。

### M1 落地记录（本 PR）与遗留

**本 PR 已交付**（对照「M1 脚手架执行细节」1–9）：多实例 config + navbar 双主题入口；`sidebars-privacy.js`；`privacy/` 六卷（各 `_category_.json` generated-index）+ 每卷一页「本卷导言」占位（Docusaurus 会**过滤掉空的 generated-index 分类**，故每卷需 ≥1 篇非草稿文档才在侧边栏显形）；中英镜像 + 分类翻译键译全；三脚本扩面（check-mirror / check-i18n 两实例、gen-entry-meta 另产 entryMeta-privacy）；`cspell` glob 加 `privacy/**`（CI lint.yml 同步）；`PrivacyMeta` + `DocCard` 隐私分支；模板 / 术语 / 导读 / STYLE-GUIDE / DOGFOODING。六道闸门 + 两 locale 两实例 build 通过。

**本 PR 刻意不做（留后续 PR，遵「一 PR 一事」）**：

- ⬜ **skill 派生**：`aiwiki-entry-author` 隐私版（九节 + 红线 + 隐私 frontmatter）、`aiwiki-research-refresh` 检索主题改隐私 + 去重基线指 `privacy/`——M2 开写样板条目前做。`aiwiki-translator` 可直接复用（术语已扩）。
- ⬜ **M2 首批样板（3–5 条）**：横跨不同卷 / 板块，定调声音与结构，留用户过目（届时删掉对应卷的「本卷导言」占位或改写为真导言）。
- 🟡 **卷索引页 URL（可选 polish）**：六卷 generated-index 现用 Docusaurus 默认中文派生 slug（如 `/privacy/category/-卷一--隐私根基`），与主题一行为一致；若要清洁 URL，给各 `_category_.json` 的 `link` 设显式英文 `slug`（注意别与卷内容目录路由 `/privacy/<dir>` 撞）。非阻塞。
- 🟡 **contextual 搜索 zh 文案（可选 polish）**：`docsRouteBasePath` 设为数组后，本地搜索开启**按主题分面**（可只搜某一主题），顺带引入几个搜索 scope UI 串（`theme.SearchPage.searchContext.*` 等）；英文站已是英文，中文站沿用插件英文默认（与改动前的搜索框文案同状态）。要全中文化需建 `i18n/zh-Hans/code.json` 覆盖这几串。非阻塞。

## M1 脚手架执行细节（交接用；探查已确认，新会话照此做、无需重探）

> 本仓 Docusaurus 3.8、`@easyops-cn/docusaurus-search-local` 0.55.2。**新分支 + 新 PR**（一 PR 一事），完成后留用户确认再并 main。

1. **`docusaurus.config.js`**：`plugins` 加第二实例 `['@docusaurus/plugin-content-docs', { id:'privacy', path:'privacy', routeBasePath:'privacy', sidebarPath:require.resolve('./sidebars-privacy.js'), editUrl:'.../tree/main/' }]`（preset 的 docs 不动）；navbar 加两个 `type:'docSidebar'`（`wikiSidebar` 标「AI 编码误区」；`docsPluginId:'privacy'` + `privacySidebar` 标「LLM 隐私保护」）；新建 `sidebars-privacy.js`（`{privacySidebar:[{type:'autogenerated',dirName:'.'}]}`）。i18n 全局配置不动。
2. **目录**：`privacy/` 六卷 + 各 `_category_.json`（label/position/generated-index）；英文镜像 `i18n/en/docusaurus-plugin-content-docs-privacy/current/`；改任何 label 后跑 `npm run write-translations -- --locale en`。
3. **闸门脚本扩面（扩，非重写）**：`scripts/check-mirror.js`（L21–25 硬编码 `docs` ↔ `docusaurus-plugin-content-docs/current`）→ 遍历实例对数组含 privacy；`scripts/check-i18n.js`（L22–26 单 current.json）→ 两个 current.json 都查 CJK 回退；`scripts/gen-entry-meta.js`（L15–18）→ 另产 `src/data/entryMeta-privacy.json`（隐私轴 severity+maturity+technique）。
4. **组件**：`src/components/PitfallMeta` 是纯渲染组件 → 复制为 `src/components/PrivacyMeta`（badges：era / technique / severity「隐私风险」/ maturity / evidence；复用其 `styles.module.css` 色系）；`src/theme/DocCard/index.js` 的 CardMeta 按 `href.includes('/privacy/')` 分书取 `entryMeta-privacy.json`、渲染 severity + maturity（剥前缀 / 英文首字母大写 / 展开收起逻辑与字段无关，直接复用）。
5. **模板 / 术语 / 导读**：`privacy/_templates/entry-template.md`（九节结构 + §7.3 第一人称红线 + 隐私 frontmatter，导入 `PrivacyMeta`）；`terminology.md` 补隐私术语段 + era/technique/maturity/audience 枚举（先补表再用）；`privacy/intro.md`（+ 英镜像）。
6. **skill**：`aiwiki-translator` 直接复用；`aiwiki-research-refresh` 检索主题改隐私、去重基线指 `privacy/`；`aiwiki-entry-author` 派生隐私版；`STYLE-GUIDE.md` 增补第一人称红线 + 「可 / 不可第一人称」对照表。
7. **本地搜索（坑）**：`docsRouteBasePath:'/'` 单值默认**不索引第二实例** → 先验证是否支持数组 `['/','/privacy']`，不支持就让第二实例暂不入索引（记待办），不急切 Algolia。
8. **治理落地**：顺手做 `dogfooding-checklist`（repo 级精简）+ `CLAUDE.md` 一行指针 + 三道硬闸门进 skill / pre-PR 清单（别堆 CLAUDE.md）。
9. **验证**：六道闸门（autocorrect / vale 或按 Cliches.yml grep / cspell / check:i18n / check:mirror / build 两 locale 两实例）+ 冒烟（主题切换、`/privacy` 路由存在、英文不回退中文）。
