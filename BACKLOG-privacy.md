# 选题与待办储备：「LLM 隐私保护」主题 / Backlog

「LLM 隐私保护」是 AiWiki 百科下与「AI 编码误区」**并列的主题**，面向 LLM 隐私保护工程师，偏原理 + 实现 + 真实案例，按 LLM 发展史叙述、持续更新。本文件是该主题自己的看板，**与第一个主题的 `BACKLOG.md` 分开**（别混）。立项与架构见 `PROPOSAL-privacy-book.md`。

> 状态：⬜ 待做 ｜ 🟡 持续维护 / 部分完成 ｜ ✅ 已落地 ｜ ⏸️ 有条件搁置 ｜ ❌ 评估后不做
> 范围纪律：精而深，不追条数（见 PROPOSAL 第 4 节）。**定位**（评审 R1 收敛）：一本**工程隐私风险与防护手册**，围绕一个问题组织——「LLM 系统里的敏感数据在训练、微调、RAG、agent、推理服务、日志、删除请求、合规审计中会在哪里泄露？工程上怎么验证、降低、证明、追踪？」不做大而全综述站。

## 当前看板（2026-10-30 校准）

**本节列当前状态与剩余行动；后面的评审、选题批次和 M1 施工记录均为历史档案。** 本次只对照仓库文件、元数据和已交付复核记录校准状态，没有新增来源研究、算法复现、密码学证明或部署认证。

- ✅ **M1 脚手架和 M2 首批样板已产出**：当前攻防条目：**45 条**；分卷：**6 / 6 / 6 / 9 / 12 / 6**（均有中英正文）；不含导读、地图、基线、案例库和工件。这些中文正文与英文镜像的 `maturity` 对应，均有 `verified_at: 2026-10-29`、`review_after` 和 `review_triggers`。样板产出与文档复核不代表用户逐篇签署、算法已复现或生产配置已认证。
- ✅ **2026-10-29 内容复核与本地验收已交付**：36 对旧隐私文章的逐篇依据、处理与残余限制见 [隐私复核记录](./REVIEW-privacy-20261029.md)；其余本轮刷新与新增条目见 [任务记录](./TASKS-content-refresh.md)。镜像、构建、流程图、检索及 MCP 的具体范围见 [全量复核总览](./REVIEW-SUMMARY-20261029.md) 和 [本地验收记录](./ACCEPTANCE-20261029.md)。这些记录不证明线上已部署。
- ✅ **导读与工件已落地**：[必读 12 条](./privacy/core-12.mdx)、[最小基线](./privacy/baseline.mdx)、[案例库](./privacy/incidents.mdx)、[机制索引](./privacy/mechanisms.mdx)、[隐私地图](./privacy/map.mdx)、[供应商数据边界清单](./privacy/vendor-data-boundary-checklist.mdx) 均有中英文件。2026-06 的 11 个刷新选题与 2026-07 的 12 个选题均已形成条目；其后增加[持久记忆投毒](./privacy/04-rag-agents/persistent-memory-poisoning.mdx)。

### 仍保留的行动

| 状态 | 事项 | 当前证据与完成边界 |
|---|---|---|
| 🟡 | 按到期日 / 事件复核，重大密码学修改继续独立评审 | 各篇已有复核元数据与台账；未声称全部具体协议、账户、硬件或生产配置均经独立专家认证。后续按实际变更复核，不把已完成批次重开成“全部待审”。 |
| ⬜ | 卷一「密码学信任模型总表」 | 现有文章分别讲边界，但尚无 DP / TEE / HE / MPC / 安全聚合 / 机密推理 × 保护对象 / 不保护什么 / 信任根的统一总表。与地图按威胁面反查分工。 |
| ⬜ 可选 | 六卷 generated-index 显式英文 URL | 六个 `_category_.json` 目前均未设置 `link.slug`；现有路由已可用。若实施须核跳转兼容性，非内容完成阻塞项。 |
| ⬜ 可选 | 威胁矩阵拆二级索引 | 当前仍在 `privacy/map.mdx` 统一列矩阵，尚未另建训练期 / 推理期 / RAG·Agent / 治理 / 评测二级页面；仅在浏览需求明确时拆。 |
| ⬜ 可选 | 中文搜索 scope 文案 | 配置已用双主题 `docsRouteBasePath`；仓库尚无 `i18n/zh-Hans/code.json` 自定义覆盖。实际哪些 scope 串仍需翻译应先目视核验，不能由缺文件推断所有中文界面均未本地化。 |
| 🟡 按需 | 框架 / 产品差异小节 | RAG 正文已有五类存储的隔离与授权边界表；安全聚合实现门限 / 开销、向量库删除与恢复语义的具体版本矩阵仍可按需补。现有文档不等于已对各产品运行验证。 |

**不再作为当前待办**：M2 首批样板、隐私导读 / 工件、单行卡片截断与展开均已实现。`DocCard` 当前读取 `item.description ?? doc.description`，标题和摘要默认单行、按需展开（`src/theme/DocCard/index.js`）。若要另外改短标题或摘要文案，应作为新需求，不能保留“先查卡片来源”的旧任务。

**元数据取舍**：当前仍是单一主 `evidence` 标签 + 散文说明主要 / 补充证据（见 `terminology.md`）。frontmatter 多标签数组未实施，已有“本阶段不扩 schema”的决定；`productionEvidence` 仅在未来出现明确机读消费需求时再设计，不作为悬而未决的默认任务。

### 有条件搁置的核验债

- ⏸️ **无匹配一手基准的 HE / 机密推理开销倍数**：旧提案与评审中的百分比 / 倍数未获同条件验证；已从现行 [HE/MPC](./privacy/01-foundations/he-mpc.mdx) 与 [机密推理](./privacy/05-frontier-deployment/confidential-inference.mdx) 的通用结论中移除。**移除无据数字不等于核实数字**。只有具体工作负载 / 选型需要这些数，且能取得参数匹配的一手基准时再立项核验。
- ⏸️ **PATE 独立释义 / 比较**：仍未形成专门条目；DP-ICL 中只有类比，不能据此把全称、出处和与 DP-SGD 比较标成已核。待实际写入相关内容时，再回一手资料核验；本次不扩写。
- ⏸️ **竞品 star 数 / 出版年与压缩隐私选题**：不支撑现有正文的具体主张，不为清空待办另做采集。只有影响选题取舍或出现明确工程问题与充分一手证据时再评估。

## 长期写作闸门（持续生效，非待清空任务）

> **铁律**：本主题准确门槛高于「误区」——写错会让工程师做出**假安全**系统。任何 ε/δ、性能开销、「已生产部署」类声明，进正文前必须有**一手出处 + 版本戳 + 适用条件**（workload / 硬件 / 模型规模）；research 与 production 用 `maturity` 区分，「生产」必须有真实部署或厂商文档支撑。
>
> **本「写作前必核」是强制闸门，不是提醒**：每条隐私内容写作前必须逐项过；未过不写（评审 R2）。

> **治理原则（原样入库，评审 R2）**：**证据纪律对评审者也一视同仁**——评审意见（含本主题的独立评审 ChatGPT）不因「听起来专业」就直接入库，同样要回一手出处。否则 AiWiki 会从「反对 AI 幻觉」滑成「采纳评审幻觉」。

### 硬闸门（强制，每条写作前必过；评审 R2）

- **A. 量化声明闸门**：凡出现 ε/δ、攻击成功率、性能开销、部署数量、star 数、更新时间、保留天数、模型规模、吞吐 / 延迟——必须有 ① 一手出处 ② 核验日期 ③ 实验 / 适用条件，**不得裸写结论**。「三不写」：未回一手出处不写、没有实验条件不写、没有适用边界不写。性能数字必同时给：硬件 / 模型规模 / batch size / sequence length / throughput·latency 指标 / baseline / 安全模式 / 是否含远程证明·加密通道·I/O / 出处时间。
- **B. 内省表达闸门**：凡出现「我记得 / 我知道 / 我忘了 / 我保证不会泄露 / 我确认合规」，一律改写为可外部观察的行为或机制倾向（见 PROPOSAL §7.3 第一人称红线）。
- **C. 成熟度闸门**：`maturity = production` 必须满足至少一项——真实生产部署论文 / 官方厂商文档 / 标准框架明确推荐且有工程实践 / 可核查公开案例；否则只能 `research` 或 `experimental`。

### 早期核验债的当前处置

- ✅ **Apple PCC**：已在[机密推理](./privacy/05-frontier-deployment/confidential-inference.mdx)按特定设计说明设备端验证、证明与获准软件；不再列作全未核，也不推广成所有 TEE 的保证。
- ✅ **Carlini 抽取 / 量化记忆的题名与年份**：已落[训练数据抽取](./privacy/02-memorization-extraction/training-data-extraction.mdx)及[量化记忆](./privacy/02-memorization-extraction/quantifying-memorization.mdx)，2026-10-29 复核记录有具体来源；不再保留标题年份问号。
- ✅ **Gboard 部署论文口径**：现行 [DP·FL](./privacy/05-frontier-deployment/dp-federated-learning.mdx)区分 2023 v2 的二十多个 DP 模型、其中两个额外启用安全聚合及隐私单位 / 会计条件；不把历史部署外推为所有当前或未来功能。
- ⏸️ **无据性能数字、PATE 与竞品元信息**：处置与重启条件见顶部搁置项，不以删除主张冒充补齐证据。

### 分类必核清单（A–G，长期检查项；不是七条未完成任务）

- **A. DP / FL**：隐私单位（sample / user / device / client-level）；邻接关系定义；ε、δ 或 ρ-zCDP 含义；隐私会计（RDP / PRV / zCDP / DP-FTRL）；clipping norm、noise multiplier、采样方式；有无 secure aggregation；formal DP 还是「privacy-inspired」；效用下降指标；攻击模型是否仍成立。
- **B. 记忆抽取 / MIA**：目标模型类型（open-weight / API / black/white-box）；攻击者是否知训练分布；查询预算；是否需 logprobs；extraction 成功标准；目标样本是否重复/罕见/格式固定；区分 memorization / regurgitation / extraction；MIA 的 base-rate 问题；benchmark 还是真实系统案例。
- **C. 机器遗忘**：删除目标（样本/实体/概念/能力/风格/知识）；删除阶段（训练前/中/后/推理抑制）；true unlearning 还是 output suppression；验证指标（forget quality / retain utility / attack resistance）；防 re-learning；是否影响相邻知识；是否适用 closed model；有无法律意义删除证据。
- **D. TEE / HE / MPC / 机密推理**：威胁模型（保护谁不看见什么）；信任根（CPU/GPU TEE / cloud / hardware vendor）；远程证明；数据在 CPU-GPU 通道/显存/主存/磁盘/日志的状态；侧信道假设；性能（throughput/latency/batch/seq len）+ 模型规模 + 硬件型号；保护权重/prompt/输出/KV cache 哪些；against provider 还是仅 co-tenant。
- **E. RAG / Agent**：租户隔离模型；向量库 ACL 检索前执行还是检索后过滤；embedding 是否可逆/可推断；chunk 是否含 PII；tool output 是否进长期 memory；agent 是否可外联；untrusted content→tool call 链路；日志/trace/observability 是否记录私有上下文；跨用户会话记忆是否共享。
- **F. 推理服务期**：API 输入是否用于训练；retention period；abuse monitoring 数据保留；enterprise/team/free 差异；fine-tuning data retention；opt-out 是否覆盖日志/缓存/评估/人工 review；data residency；subprocessors；zero data retention 条件；有无 DPA/BAA/HIPAA/SOC2。
- **G. 合规**：法条版本 + 生效时间；管辖区；数据主体权利；controller/processor 责任；透明度义务还是技术删除义务；训练数据/权重/RAG 库/日志/缓存分别如何处理；有无真实监管/执法案例；技术措施与法律满足之间的差距。

## 历史评审分诊记录（归档）

> 以下保留 2026-06 / 07 当时的意见与处置。所称“本轮 / 待做 / 生产 / 已核”等均对应当时批次，不是重新启动的行动指令；当前状态以前面的看板、现行正文及 2026-10-29 复核记录为准。历史数字、评审自引和旧厂商描述不能直接复制回正文。

> 沿用第一个主题的约定：评审里「认同但暂不做」的结论落这里，别只留对话。处置：✅ 照改 ｜ 🟡 部分认同 ｜ ↩️ 反向 / 保留。

### R1 · ChatGPT（2026-06，基于 PROPOSAL）

> 当时“每条加合规映射”的表述现按 `STYLE-GUIDE.md` 隐私结构规范处理为可选、短且打版本戳；不能用历史约定强制所有机制条目新增法律判断。

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

### R4 · ChatGPT 密码学独立评审（2026-07，卷一 / 卷五线上页面，结清 :211 该轮）

> 主控核验：评审全部引述已逐条 grep 对回仓库原文（无失实引述）；其自引数字（如 Gboard「二十多个」）不因来自评审免检——该数字本就在条目出处句里带一手论文，不另采信评审转述。总评「整体质量高、无需推倒重写」。

- ✅ **P0×4 全修（中英）**：①机密推理摘要不再把 Apple PCC 归为「GPU TEE」例——改「硬件隔离 + 远程证明」路线、NVIDIA GPU 机密计算与 PCC 分开点名；②TEE「加完整性保护」→「部分平台提供完整性 / 回滚防护，取决于 SGX/TDX/SEV-SNP/GPU-TEE 型号、固件与证明范围」；③HE·MPC「零硬件信任 / 不信任何硬件」（含标题）→「不把远端执行环境当信任根」+ 补客户端密钥 / 随机数 / 实现的残余信任点；④成员推断「DP 是唯一形式保证」→「最主流、最通用、最可组合的形式化防护框架」。
- ✅ **P1×5 全修（中英）**：⑤HE 参数断言从单一 λ≥128 扩为「参数集 + lattice estimator + 深度 / 噪声预算」；⑥安全聚合门限拆四件事（隐私门限 / 掉线容忍 / 最小参与方 / 串通模型）；⑦审计断言补「运行时审计不替代密码学证明」；⑧DP-FL 延伸阅读补「主要：生产部署论文」标注行（frontmatter 单标签制度不变，接多标签待办）；⑨梯度泄露「还原质量崩」→条件化（正确裁剪 / 足够噪声 / 可复算会计下显著下降）。
- ✅ **P2「上链」**：机密推理「公开上链」→「append-only 防篡改透明日志」（zh 独有问题，en 本就写 log）。
- ⬜ **P2 卷一「密码学信任模型总表」**（保护什么 / 不保护什么 / 信任根）：认同，落待办表（与 map 威胁矩阵分工：总表按技术、矩阵按威胁面）。
- 🟡 **P2 maturity 细分（productionEvidence 子字段）**：认同方向，并入既有「证据字段多标签」待办（同一治理标准：可机械派生、不靠打分）。
- ↩️ **DP-FL evidence frontmatter 改双标签**：不改——terminology 现约定每条一个主标签，双标签属 schema 层变更（见上并入项）；语义诉求已用延伸阅读「主要 / 补充」行满足。

### R2 · 用户 + ChatGPT（2026-06，对 R1 分诊的再评审）

- ✅ 认可 R1 分诊（评价「比全盘采纳更成熟」）；**证据纪律对评审者一视同仁**升为治理原则（见顶部）。
- ✅ 过满断言用带时间戳 + 判定条件的最终措辞（proposal §0 已落）。
- ✅ 「禁止虚假内省」升为**红线强规则**（proposal §7.3 红线块；待进隐私版 STYLE-GUIDE，CI/评审按它卡）。
- ✅ 量化数字 → **三道硬闸门 A/B/C** + 性能数字必填字段（见顶部）。
- ✅ 第一人称三层定位（品牌识别 / 可信度护城河 / 内容壁垒；入口差异非壁垒）（proposal §5 已落）。
- 🟡 企业 / 供应商并入板块 11 + toolkit「LLM Vendor Data Boundary Checklist」（见待办）。
- 🟡 板块 13/12 边界澄清（见选题储备）；首批样板四类确认（模型内化 / 训练期 / 集成期 / 运营期 各一）。

### R3 · 用户 + 外部评审（2026-06，对 `privacy/` 四条样板的逐条评审）

> 总评：四条已超「样板草稿」（统一 frontmatter + 九节 + 合规映射 + 残余风险 + 第一人称克制）；主要意见是**继续降绝对性**，集中在三类——跨模型泛化结论、DP 保证解释、厂商条款时效。**治理原则照旧（R2）**：评审对 OpenAI/Anthropic 当前文档的描述（按 endpoint/feature 细分、Anthropic 公开页不再裸现「7 天」）属二手，**落条目前回一手核**；核不到就降为条件化表述、不裸写数字。

**P0 · 降绝对性（本轮 PR 改，直接服务硬闸门 A）**

| 评审点 | 处置 | 落点 |
|---|---|---|
| 训练抽取「更大更强风险只会更重」过绝对 | ✅ | 条件化：「已有测量中容量/重复/上下文放大**可发现**记忆；故不应视为天然降险，反需更强去重/审计/隐私控制」 |
| 训练抽取摘要「只要…就可能」近充分条件 | ✅ | 收为「即使只在单文档出现，若够罕见/独特/格式固定，在已有研究设置下**观察到过**逐字抽取风险」 |
| DP「普通微调没有上限」 | ✅ | 改「没有**差分隐私意义上的统一上界**」 |
| DP「攻击者优势被 (ε,δ) 限制」过简 | ✅ | 加「在定义的邻接关系/隐私单位/会计假设内」+「实际风险还取决于先验/查询/组合/隐私单位是否匹配」（措辞收紧，别堆长句） |
| RAG「embedding 能反演回近似原文」一概而论 | ✅ | 摘要/机制**早加条件**（依赖 embedding 模型/攻击者是否可查询同模型/文本长度/领域分布） |
| 推理服务厂商数字（Anthropic 7 天 / OpenAI 30 天）裸写 | ✅ | 改**表格**（厂商×端点×默认训练×保留×ZDR×例外×核验日期）+ 强打戳 + 条件化；**数字回一手核**，核不到则只留方法论 + 条件 |

**P1 · 增强工程感（本轮一并改）**

| 评审点 | 处置 | 落点 |
|---|---|---|
| 训练抽取 canary 边界 | ✅ | 配方加：canary 应**人工生成、无真实 PII、可删可追踪**的稀有串，勿用真实敏感数据当 canary |
| DP：PEFT/LoRA ≠ DP | ✅ | 配方加：「参数高效不等于隐私；只有裁剪 + 加噪 + 会计 + 隐私单位齐全才构成 DP」 |
| DP「生产部署」小节 vs maturity=试验 语义冲突 | ✅ | 小节首句加「本条尚不标生产成熟；以下为研究/工程可行性证据」 |
| RAG OpenAI/Redis 事故非严格 RAG 检索泄露 | ✅ | 重标「相邻真实事故：跨用户状态隔离失败」+ 一句界定（同类边界层 bug，非向量检索攻击） |
| RAG 缺具体跨租户探针配方 | ✅ | 补 `tenant_a_secret` / `tenant_b_probe` 测试集 + 三条断言（候选集/最终答案/日志均不含 A） |

**P2 · 结构演进（认同但本轮不做，须作为模板级统一决定，避免四条与后续漂移）**

| 评审点 | 处置 | 说明 |
|---|---|---|
| `evidence` 支持多证据类型 | ✅ | **已落（轻量）**：不扩 schema；`terminology.md` 加「主要 / 补充」约定，模板 + skill 同步；RAG 主标签 安全报告→研究支持（最强一类）、RAG + 推理服务在「延伸阅读」开头注「主要：X；补充：Y」。 |
| 「真实案例/生产部署」小节按条目类型可改名 | ✅ | **已落**：模板 + skill 标明该小节标题可按 `maturity` 微调；四条对齐——训练抽取→「真实案例」、DP→「真实案例 / 工程可行性」、RAG→「真实案例：相邻事故」、推理服务→「厂商现状」（不再给试验级条目挂「生产部署」）。 |
| 每条加「最小可测试断言」块 | ✅ | **已落**：并入「落地实现」小节末（怎么测 / 通过证明什么 / 失败看到什么），不新增第十节（防九节膨胀）；`entry-template` + `aiwiki-privacy-entry-author` skill + 四条全回填，后续条目沿用。 |
| 抽 toolkit「Vendor Data Boundary Checklist」+ 正文链接 | ✅ | **已落**：`privacy/vendor-data-boundary-checklist.mdx`（中英），8 类可填清单 + 逐厂商记录表；《推理服务数据边界》正文「落地实现」段已双向链过去。 |

### R4 · 外部评审（2026-06，从线上 /privacy/ 重新加载评审，评分 8.3/10）

> 总评：已从「4 条样板」进到「内容骨架成型 + 工程手册雏形」；最强是「威胁→缓解矩阵 + 最小可测试断言 + 专打假安全」。主要意见：少数过强表述、证据标签粒度、目录页密度、生产成熟度审计。

| 评审点 | 优先级 | 处置 |
|---|---|---|
| 首页状态滞后（仍写「M1 脚手架 / 本卷导言占位」） | P0 | ✅ 本轮已改：intro 中英改「M1+ · 内容样板扩展中（铺面→加深 / 复核 / 补案例）」+ 删失实占位句 |
| 收紧「训练数据抽取」绝对化表述 | P0 | ✅ **已是当前源状态**：摘要 + 版本说明早已条件化（「已有研究设置下观察到」「不保证所有设置下单调」）——评审读到的是**未重新部署的旧线上版**，本轮无需改，main 重新部署后即一致 |
| maturity=生产 全站审计 | P0 | ✅ 本轮审 9 条：8 条证据充分（真实事故 / 厂商文档 / 已部署 TEE / Google 生产 FL·安全聚合）；`training-data-deduplication` 原仅「标准实践」口头支撑 → **本轮补 RefinedWeb（Falcon/TII，NeurIPS'23）公开生产去重管线**坐实，中英齐 |
| 隐私地图作威胁优先入口 | P0·小 | ✅ 本轮 intro「怎么读」中英各加一句：知道泄露面就先进隐私地图威胁矩阵 |
| 证据字段多标签（primary/supporting） | P1 | ✅ 轻量版已落；当前采用单一主标签，未扩 schema。历史的机读数组建议不再列“仍待”；`productionEvidence` 按顶部所列需求触发条件再议。 |
| 卷一「密码学信任模型总表」 | P2 | ⬜ 待做（R4 提出）：DP / TEE / HE / MPC / 安全聚合 / 机密推理 ×「保护什么 / 不保护什么 / 信任根」一览表，放卷一导言或独立页。与 `map` 威胁矩阵分工：总表按**技术**、矩阵按**威胁面**，别重复 |
| 目录页卡片摘要过长 | P1 | ✅ 已有标题 / 摘要单行截断与展开；`DocCard` 读取 `item.description ?? doc.description`。进一步改短文案是可选新需求，非未实现截断。 |
| 威胁矩阵拆二级页面 | P1 | ⬜ 待做：留总表 + 拆「训练期 / 推理期 / RAG·Agent / 治理 / 评测」二级索引 |
| 隐私案例库入口 | P2 | ✅ **已落（2026-07）**：`privacy/incidents.mdx`（真实事故与实证索引，中英，slug `incidents`，侧栏 pos 8）——两层：**A 真实生产事故**（EchoLeak / CamoLeak / ChatGPT 串味 / NYT 保全令 / o3 反向定位⚠️）+ **B 里程碑演示**（Nasr 抽取 / Carlini 扩散图 / Morris 嵌入反演 / PromptPeek KV-cache / Fredrikson 反演），每条反链条目 + 一手源；两层分列即一条纪律（别把「已证明可行」当「生产已泄露」） |
| 最小隐私基线页面 | P2 | ✅ **已落（2026-07）**：`privacy/baseline.mdx`（10 条速用基线，中英，slug `baseline`，侧栏 pos 7）——数据分级 + 边界 / 厂商「不训练」非整条边界 / RAG 前置 ACL·向量非匿名 / 租户隔离 + 并发压测 / Agent 出站收口渲染层 / MCP 最小采集 + 审子处理方 / 去重 + DP 审 ε / 删除跨副本扇出可验证 / 发布前记忆量化 + 注入 eval / 推理链·截屏当输出面脱敏；每条点破一个假安全、仿 `docs/threat-model` 顶部基线 |

## 选题储备（历史批次快照）

> 以下保留早期分卷数量与选题状态，不代表当前目录或尚待立项。2026-10-29 交付快照记录为 45 条；当前数量见顶部看板，明细以 `privacy/` 实际条目和生成索引为准。

> 卷（阅读主线）与技术板块（查询轴）见 PROPOSAL 第 6 节（板块经 R1 调整为 14，含去重边界）。下面记录当时占位与逐步落地过程，不是重新启动写作或采集的清单。

- ✅ 卷一 · 隐私根基（**只讲最小承重地基**）：**已补完**——MIA（`membership-inference`）、TEE（`trusted-execution-environment`）、HE·MPC（`he-mpc`）三条已落；**模型抽取与窃取**（`model-extraction-stealing`：Tramèr USENIX'16 判别式根基 + Carlini ICML'24 生产 LLM 投影层窃取）后补为第四条**根基级攻击**（前 LLM / 判别式时代起源，恰配本卷定位，放大离线 MIA / 抽取）；**模型反演与属性推断**（`model-inversion-attribute-inference`：Fredrikson CCS'15 人脸反演 + USENIX Sec'14 华法林属性推断）补为第五条（与 MIA 同属推断类攻击板块）；**属性 / 分布推断**（`property-inference`：Ganju CCS'18 元分类器 + Suri&Evans PoPETs'22 `n_leaked`，群体级、补第六条）✅；DP 最小地基并在卷三《DP 微调》（各条已回链）。卷一现 6 条。早期 HE / 机密推理性能数字已按顶部规则搁置；PCC 已按具体设计核对，不再以旧 `:::caution` 状态描述现行正文。
- 🟡 卷二 · 记忆与抽取（**旗舰**）：**训练数据抽取**（`training-data-extraction`）✅、**量化记忆与记忆审计**（`quantifying-memorization`：Secret Sharer canary/exposure + Quantifying Memorization scaling，technique=隐私评测与审计，落板块 14）✅、**训练数据去重**（`training-data-deduplication`：Lee ACL'22 记忆降约 10× + Kandpal ICML'22 重复→生成超线性，technique=记忆与抽取）✅、**隐私定向投毒**（`privacy-poisoning`：Tramèr Truth Serum CCS'22，投毒 <0.1% 放大对他人泄露 1–2 量级）✅；卷二现 4 条。
- ✅ 卷三 · 对话大模型（**已补完**）：**DP 微调**（`dp-fine-tuning`）、**上下文面隐私**（`context-surface-privacy`：OWASP LLM07:2025 + Zhang·Carlini·Ippolito COLM 2024 + prompt stealing）、**PII 回吐**（`pii-regurgitation`：Lukas S&P'23 脱敏减不根除 + ProPILE NeurIPS'23，technique=PII 检测与脱敏，落该板块）三条齐。
- 🟡 卷四 · RAG 与 Agent：**多租户 RAG 检索泄露**（`rag-retrieval-leakage`）✅、**跨会话 / 跨租户记忆串味**（`cross-session-memory-bleed`：ChatGPT 2023-03 redis-py 竞态事故 + OWASP LLM02）✅、**Agent 工具外联数据外泄**（`agent-tool-exfiltration`：Greshake AISec'23 间接注入 + OWASP LLM01/02）✅、**嵌入反演**（`embedding-inversion`：Song&Raghunathan CCS'20 词级 + Morris vec2text EMNLP'23 逐字）✅、**Agent 隐私评测（AgentDojo）**（`agent-privacy-benchmark`：Debenedetti AgentDojo NeurIPS'24，97 任务 × 629 安全测试含外泄注入；technique=隐私评测与审计）✅；卷四现 5 条；多 agent 协作数据边界可后续再加深。
- ✅ 卷五 · 前沿落地（**三小节齐 + FL 线已加深**）：① 私有计算与机密推理 `confidential-inference`（接卷一 TEE+HE·MPC，PCC/NVIDIA 生产实例）；② 可验证删除与机器遗忘 `machine-unlearning`（Cao&Yang 2015 / SISA 2021，MIA 作验证）；③ 生产级 DP·FL 部署 `dp-federated-learning`（Gboard DP-FTRL 二十多个模型 / Apple 本地 DP）。**FL 线加深两条**：**梯度泄露** `gradient-leakage`（Zhu DLG NeurIPS'19 + Geiping Inverting Gradients NeurIPS'20，攻击：共享梯度可反演训练样本）+ **安全聚合** `secure-aggregation`（Bonawitz CCS'17 协议 + MLSys'19 Google 生产部署，防御：服务器只见聚合和）——与 DP·FL 形成「攻击 + 两道互补防御」的 FL 隐私簇。**再加深两条**：**遗忘可验证性** `unlearning-verification`（Thudi USENIX'22 模型级不可验证 / 可伪造 + TOFU COLM'24 基准）+ **推理期侧信道** `inference-side-channels`（Weiss USENIX'24 token 长度还原 + Gu ICML'25 跨用户 prompt 缓存计时）。**FL 簇再加两条**：**拆分学习泄露** `split-learning-leakage`（Pasquini CCS'21 FSHA 恶意服务器从中间激活重建输入 + Erdoğan UnSplit WPES'22 data-oblivious 反演，条件以现行正文为准）+ **联邦分析** `federated-analytics`（Google FA + Zhu AISTATS'20 DP heavy hitters + Bassily NeurIPS'17 本地 DP，maturity 生产）；卷五现 9 条。
- 🟡 卷六 · 治理合规（**合规索引 + 实体条目**）：**推理服务数据边界** `inference-service-data-boundary`✅、**数据生命周期与删除传播** `data-lifecycle-deletion`✅、**合成数据隐私** `synthetic-data-privacy`（Stadler USENIX'22 相似度评估低估 + GAN-Leaks CCS'20 黑盒 MIA；technique=PII 检测与脱敏）✅、**LLM 水印与溯源** `llm-watermarking`（Kirchenbauer ICML'23 green/red + 可靠性 ICLR'24，旧改写概括已在现行正文纠正 + Copyright Traps ICML'24）✅、**微调即服务隐私** `ftaas-privacy`（Qi ICLR'24 微调侵蚀对齐、定位安全>隐私须注明 + 三厂商保留官方文档）✅；卷六现 5 条。各技术条目带「合规映射」小段的要求贯穿全书。
- ✅ 技术板块新增：13 数据生命周期与数据治理（`data-lifecycle-deletion`：删除请求跨存储传播，GDPR Art.17/19 + NIST Privacy Framework，卷六）✅；14 隐私评测与审计（`quantifying-memorization`，卷二）✅。**13 vs 12 边界（评审 R2）**：数据生命周期 = 数据在哪流动 / 存储 / 复制 / 删除 / 备份（where）；治理与合规（板块 12）= 谁负责 / 法律映射 / 审计证据留存（who·law）。
- ✅ **14 技术板块全覆盖里程碑**：本波（PII 回吐 / 量化记忆审计 / 模型抽取窃取 / 数据生命周期）落地后，14 个技术板块**各有至少一条落地条目，或以「贯穿各条」方式覆盖**（治理与合规贯穿合规映射、隐私评测贯穿最小可测试断言且另有专题）。map.mdx 的 _规划中_ 标记已全部转实链。后续按**深度**补强，不为铺板块注水。

### 2026-06 刷新批次（已落地档案，非候选队列）

> **Wave 1（5 条）+ Wave 2（6 条）= 本批 11 个候选已全部落地**（子代理并行起草 + 主控质量过）。Wave 1：嵌入反演、隐私定向投毒、属性 / 分布推断、遗忘可验证性、推理期侧信道。Wave 2：合成数据隐私、LLM 水印与溯源、拆分学习泄露、联邦分析、微调即服务隐私、Agent 隐私评测（AgentDojo）。下表为已落地档案（出处存档备查），不据此启动新一轮 research-refresh。

> 2026-06 由 research-refresh 流水线 fan-out 多个核源子代理产出，**均已核一手出处**（venue / year 交叉核实；arXiv 代理 403 时改用 dblp / 会议官网 / PMLR / PoPETs / OpenReview / NIST）。当时的立项流程与来源状态仅作档案；下表对应条目均已落地，不再等待挑选。完整来源、发表状态、数字与适用条件以各篇现行正文和复核记录为准。

| 已落地选题 | 卷 / 板块 | 历史立项依据（非当前完整来源） | 2026-10-29 复核快照 maturity |
|---|---|---|---|
| [文本嵌入反演](./privacy/04-rag-agents/embedding-inversion.mdx) | 卷四 | Song&Raghunathan CCS'20；Morris vec2text EMNLP'23；指标与设置见现行正文 | 研究 |
| [合成数据隐私](./privacy/06-governance-compliance/synthetic-data-privacy.mdx) | 卷六 | Stadler USENIX'22 等；现行正文已更新端到端 DP 边界 | 研究 |
| [隐私定向投毒](./privacy/02-memorization-extraction/privacy-poisoning.mdx) | 卷二 | Truth Serum CCS'22；任务、分母与历史成本见现行正文 | 研究 |
| [属性 / 分布推断](./privacy/01-foundations/property-inference.mdx) | 卷一 | Ganju CCS'18；Suri&Evans PoPETs'22；`n_leaked` 风险方向已在正文纠正 | 研究 |
| [机器遗忘可验证性](./privacy/05-frontier-deployment/unlearning-verification.mdx) | 卷五 | Thudi USENIX'22；TOFU COLM'24；经验审计与形式保证分开 | 研究 |
| [LLM 水印及其极限](./privacy/06-governance-compliance/llm-watermarking.mdx) | 卷六 | ICML'23 / ICLR'24 水印、Copyright Traps ICML'24；旧“改写可去”概括已纠正，鲁棒性取决于条件 | 研究 |
| [推理期侧信道](./privacy/05-frontier-deployment/inference-side-channels.mdx) | 卷五 | Weiss USENIX'24；Gu ICML'25；Wei NDSS'25；Gao USENIX'25；指标与跨身份条件见正文 | 研究 |
| [拆分学习泄露](./privacy/05-frontier-deployment/split-learning-leakage.mdx) | 卷五 | FSHA CCS'21；UnSplit WPES'22；重建与标签推断条件见正文 | 研究 |
| [联邦分析](./privacy/05-frontier-deployment/federated-analytics.mdx) | 卷五 | Google / Apple 具名历史部署与特定算法保证分别记录 | 生产 |
| [微调即服务隐私](./privacy/06-governance-compliance/ftaas-privacy.mdx) | 卷六 | Qi ICLR'24 与服务方文档；安全实验不直接证明隐私拒答失效 | 研究 |
| [Agent 隐私评测](./privacy/04-rag-agents/agent-privacy-benchmark.mdx) | 卷四 | AgentDojo NeurIPS'24；现行正文还区分其他基准目标与版本 | 研究 |

#### 2026-07 轮 · 前沿新攻防面扫描（业界实践优先；4 簇 fan-out，已核一手源）

> 承用户「业界实践 > 学术」指示，本轮侧重 2025–2026 前沿新面 + 各家线上真实做法 / 事故。四个前沿簇（多模态 / 推理、私有提示与 DP、Agent / 协议层、供应链与审计）并行核源，去重基线 = 现有 `privacy/` 32 条。**✅ 本轮结束：Tier A + B + C 全 12 条已落地 PR #72（隐私 32 → 44，中英镜像齐、六道闸门全过）**——分三波（Wave 4/5/6）子代理起草 + 主控质量过（含 AgentLeak 数字区间化、Apple AFM 3 年份订正、多处红线散文化等独立复核改正）。仅剩 3 条并入 / 搁置（见文末「并入 / 搁置」）。⚠️ 为当时的 preprint / 待核状态；现行发表状态与适用条件以链接正文为准。该批记录的会议来源：Leaky Thoughts EMNLP 2025 主会 ✅、Mission: Impossible PoPETs 2025-0137 ✅、RWKU NeurIPS 2024 D&B ✅、MAGPIE 系 NeurIPS 2025 **Workshop（ResponsibleFM）非主会** ⚠️。

**Tier A（历史分层，四条均已落地）**

| 已落地条目 | 卷 / 板块 | 历史立项依据（当前细节见正文） | 2026-10-29 复核快照 maturity |
|---|---|---|---|
| [持久记忆的隐私与留存](./privacy/06-governance-compliance/persistent-agent-memory-privacy.mdx) | 卷六 / 数据生命周期与数据治理 | OpenAI / Anthropic 记忆文档；现行正文区分读写、保存、留存与历史法律保全 | 生产 |
| [多模态地理定位推断](./privacy/03-conversational-llms/vlm-geolocation-inference.mdx) | 卷三 / 推断类攻击 | Mission: Impossible PoPETs 2025-0137；绝对精度有限，不以二手产品事件认证生产可靠性 | 研究 |
| [MCP 数据流与最小采集](./privacy/04-rag-agents/mcp-data-flow-privacy.mdx) | 卷四 / RAG 与 Agent 隐私 | MCP 规范与安全治理资料；现行正文含 2026-07-28 协议数据流与旧版比较 | 生产 |
| [端侧推理隐私](./privacy/05-frontier-deployment/on-device-inference-privacy.mdx) | 卷五 / 隐私保护计算 | Apple / Android 一手产品文档；具体调用与回云边界须按部署验证 | 生产 |

**Tier B（历史分层，四条均已落地）**

| 已落地条目 | 卷 / 板块 | 历史立项依据（当前细节见正文） | 2026-10-29 复核快照 maturity |
|---|---|---|---|
| [推理链（思维）泄露](./privacy/03-conversational-llms/reasoning-trace-leakage.mdx) | 卷三 / 上下文面 | Leaky Thoughts EMNLP 2025 与产品资料；raw / summary / hidden 视图分开 | 研究 |
| [多智能体内部信道泄露](./privacy/04-rag-agents/multi-agent-internal-leakage.mdx) | 卷四 / RAG 与 Agent | AgentLeak、MAGPIE、ConVerse；固定版本与任务/授权判据见正文 | 研究 |
| [Computer-use 屏幕捕获隐私](./privacy/04-rag-agents/computer-use-screen-capture-privacy.mdx) | 卷四 / RAG 与 Agent | Anthropic / OpenAI 产品文档；实际 capture 面、截图权限与留存见正文 | 生产 |
| [LoRA / 适配器泄露微调数据](./privacy/05-frontier-deployment/lora-adapter-leakage.mdx) | 卷五 | LoRA-Leak 预印本及相邻研究；成员推断与主动恶意底座抽取分开 | 研究 |

**Tier C（历史分层，四条均已落地）**

| 已落地条目 | 卷 / 板块 | 历史立项依据（当前细节见正文） | 2026-10-29 复核快照 maturity |
|---|---|---|---|
| [DP 审计 / 一次训练审计 ε](./privacy/02-memorization-extraction/dp-privacy-auditing.mdx) | 卷二 / 隐私评测与审计 | Steinke NeurIPS 2023；置信下界、白盒注入能力与统计校准见正文 | 研究 |
| [遗忘基准与标准化评测](./privacy/05-frontier-deployment/unlearning-benchmarks.mdx) | 卷五 / 隐私评测与审计 | RWKU NeurIPS 2024 D&B；MUSE ICLR 2025；基准不替代形式证明 | 研究 |
| [DP 上下文学习 / 私有提示](./privacy/03-conversational-llms/dp-in-context-learning.mdx) | 卷三 / 差分隐私 | Wu ICLR 2024 等；私有访问、可信聚合与后处理条件见正文 | 试验 |
| [多模态训练图像抽取](./privacy/02-memorization-extraction/multimodal-training-image-extraction.mdx) | 卷二 / 记忆与抽取 | Carlini USENIX 2023、VL-MIA NeurIPS 2024；近复制、成员推断和法律定性分开 | 研究 |

**并入 / 搁置（不单独成条）**

- ✅ `kv-cache-prompt-reconstruction`（PromptPeek，NDSS 2025）→ **已并入 `inference-side-channels`**；历史精度快照不在看板复述，具体系统、威胁模型与恢复标准以现行正文为准。非独立选题。
- ✅ `a2a-protocol-privacy`（arXiv 2505.12490 ⚠️单篇预印）→ **已并入 `multi-agent-internal-leakage` 延伸阅读**（协议层相邻缺口：A2A 令牌生命周期 / 过宽 scope / 缺同意流 + consent orchestration + 短时效 scoped token）。单源太薄，作方向性佐证、不单列成条。
- ⏸️ `compression-privacy`（量化 / 蒸馏对记忆泄露的影响）→ **继续搁置**：未单独成条；只有明确工程问题和充分一手证据支持独立边界时再议，不因旧候选列表存在就启动写作。

### 框架差异小节（按需补，打版本戳；判据：仅当差异源于工具机制、且短）

- ✅ `dp-fine-tuning` 当前仍有 DP 库差异段（版本戳 2026-06，不据本看板认证各库最新行为）。`dp-federated-learning` 经 2026-10-29 修订聚焦单位 / 会计 / 部署，当前不再含 TFF / Flower / NVFlare 比较；旧“已补齐两篇框架小节”记录不再适用。
- 🟡 按需补：`secure-aggregation` 的具体实现门限 / 开销、`data-lifecycle-deletion` 的产品删除 / 恢复语义。`rag-retrieval-leakage` 已有五类存储隔离与授权边界表；产品默认值、资格和真实账户验证仍须按版本核。**不逐条铺**。

## 结构 / 流程落地记录与后续维护

- 🟡 **来源重心：工程实践 > 学术论文（用户指示 2026-06，最高优先）**：本主题天生偏研究（攻防多来自论文），但仍要以「**各公司在生产里实际怎么做**」为主线——厂商工程博客 / 安全 & 数据治理文档（Apple PCC、Google Gboard DP·FTRL / Maps DP、Presidio 项目脱敏（源自微软、现由社区维护）、各家 retention / ZDR 条款）、真实 FL·DP 部署、隐私事故 / 泄露复盘、从业者一手账。**论文降为机制背书**，不当头条。**三道硬闸门不松**（量化主张仍要一手 + 条件 + 日期；对厂商条款的第三方转述属二手，落条目前回厂商原文核、核不到就条件化不裸写数字）。判据：能讲「X 公司线上这么做」就别只摆「Y 论文证明」。落地深度见对话确认。
- ✅ **M0.5（proposal 修订一轮）**：已落（当前 `PROPOSAL-privacy-book.md` 即 M0.5 版：§6.4 并行路线、卷一最小地基、卷五拆三、卷六贯穿 + 合规映射、板块 14 + 去重边界、定位措辞、多模态范围边界、首批样板四面、「书→主题」命名清洗）。
- ✅ **frontmatter 轴枚举**：`era` / `technique` / `attack_surface` / `maturity` / `audience` 定稿写进 `terminology.md`「枚举值映射（隐私 frontmatter 与 `<PrivacyMeta>`）」；`maturity`「研究 / 试验 / 生产」为硬约束（硬闸门 C）。
- ✅ **`severity` 隐私语义**：沿用高/中/低（显示作「隐私风险」），已写 `terminology.md`；不另拆「数据敏感度」轴（PROPOSAL §13 已定）。
- ✅ **本地搜索多实例**：已验证 `@easyops-cn/docusaurus-search-local` 的 `docsRouteBasePath` 接受 `string[]`，设为 `['/', 'privacy']`，**两实例都入本地索引**，无需切 Algolia。
- 🟡 **技术评审人**：密码学准确性（尤卷一/卷五）需独立评审——**卷一 / 卷五该轮已完成（R4，2026-07）**：P0×4 + P1×5 + P2×1 修复落地（中英），2 项结构增强落待办。后续新条目 / 大改仍走独立评审，继续落「评审分诊记录」。
- ✅ **dogfooding-checklist**：`DOGFOODING.md`（repo 级精简）+ `CLAUDE.md` 一行指针；三道硬闸门进 `DOGFOODING.md` pre-PR 清单 + `STYLE-GUIDE.md`「LLM 隐私保护主题专属规范」（未堆 CLAUDE.md）。
- ✅ **企业/供应商数据边界 checklist**：toolkit 工件「**LLM Vendor Data Boundary Checklist**」已落（`privacy/vendor-data-boundary-checklist.mdx` 中英，slug `vendor-data-boundary-checklist`）。覆盖 8 类：训练使用 / retention / abuse monitoring·人工访问 / zero data retention（覆盖与否）/ subprocessors / region·residency / DPA·BAA·合规报告 / observability·tracing 二次泄露；含逐厂商记录表（答案 + 条款出处 + 核验日期）+ 季度复核。《推理服务数据边界》双向链。
- ✅ **第一人称纪律对照表**：已写进 `STYLE-GUIDE.md`「第一人称红线（强规则）」的「可 / 不可第一人称对照表」。
- ✅ **M1 最小化**：脚手架最小可渲染已落（第二实例 + 侧边栏 + 六卷 + i18n 镜像 + 模板 + 术语 + 导读 + 闸门扩面 + `PrivacyMeta` + `DocCard` 适配 + `entryMeta-privacy.json`）。**轴索引页**：`privacy/map.mdx`（隐私地图，中英，slug `map`）已落——**技术板块**分组（14 板块，已落条目挂主板块、未落标 _规划中_）+ **威胁→缓解矩阵**（按泄露面反查在管条目 + 残余风险）。**四条导读轴已落齐（2026-07，中英）**：必读 12 条（`core-12.mdx`，pos 0.5 顶部）、最小基线（`baseline.mdx`，pos 7）、案例库（`incidents.mdx`，pos 8）、机制索引（`mechanisms.mdx`，pos 9，8 个根因桶当时覆盖 44 条；最新明细见现行索引、每条只挂主因桶）；map pos 10、工件 pos 11 收底。对齐「误区」主题的导读轴配置（必读 / 基线 / 案例 / 机制）。
- ✅ **`evidence` 多证据类型（R3）**：走**轻量**——不扩 schema。`terminology.md`「evidence」加「主要 / 补充」约定；`entry-template` + skill 同步；RAG 主标签改 研究支持（最强一类）、RAG + 推理服务在「延伸阅读」开头注「主要：X；补充：Y」。多字段数组方案**否决**（过度工程）。
- ✅ **「最小可测试断言」模板块（R3）**：已并入「落地实现」小节末（不新增第十节）；`entry-template` + `aiwiki-privacy-entry-author` skill 均加该小块，四条样板（中英）全回填「怎么测 / 通过证明什么 / 失败看到什么」，后续条目统一带。
- ✅ **「真实案例」小节标题柔性（R3）**：`entry-template` + skill 标明该小节标题可按 `maturity` 微调；四条已对齐——训练抽取「真实案例」/ DP「真实案例 / 工程可行性」/ RAG「真实案例：相邻事故」/ 推理服务「厂商现状」，不再给试验级条目挂「生产部署」。

### M1 落地记录（历史归档）

**当时 PR 已交付**（对照下面归档施工记录 1–9）：多实例 config + navbar 双主题入口；`sidebars-privacy.js`；`privacy/` 六卷（各 `_category_.json` generated-index）+ 每卷一页「本卷导言」占位（Docusaurus 会**过滤掉空的 generated-index 分类**，故每卷需 ≥1 篇非草稿文档才在侧边栏显形）；中英镜像 + 分类翻译键译全；三脚本扩面（check-mirror / check-i18n 两实例、gen-entry-meta 另产 entryMeta-privacy）；`cspell` glob 加 `privacy/**`（CI lint.yml 同步）；`PrivacyMeta` + `DocCard` 隐私分支；模板 / 术语 / 导读 / STYLE-GUIDE / DOGFOODING。六道闸门 + 两 locale 两实例 build 通过。

**当时延后项的当前处置**（已完成项不重开）：

- ✅ **skill 派生**：`aiwiki-privacy-entry-author`（九节 + 红线 + 隐私 frontmatter）已落；`aiwiki-research-refresh-privacy`（去重基线指 `privacy/`、三道硬闸门、密码学 / ML 隐私一手来源标准、全仓 autocorrect、gen:meta 收口）已落 + `CLAUDE.md` 指针更新。`aiwiki-translator` 直接复用（术语已扩）。
- ✅ **M2 首批样板已产出并扩展**：现有中英正文及 2026-10-29 复核 / 本地验收记录；六卷当前无「本卷导言」占位文件。此处只关闭样板产出任务，不声称代替用户逐篇审批。
- 🟡 **卷索引页 URL（可选 polish）**：六卷 generated-index 现用 Docusaurus 默认中文派生 slug（如 `/privacy/category/-卷一--隐私根基`），与主题一行为一致；若要清洁 URL，给各 `_category_.json` 的 `link` 设显式英文 `slug`（注意别与卷内容目录路由 `/privacy/<dir>` 撞）。非阻塞。
- ⬜ **contextual 搜索 zh 文案（可选 polish）**：双主题搜索配置已落地；仓库未添加 `i18n/zh-Hans/code.json` 自定义覆盖。先目视确认 `theme.SearchPage.searchContext.*` 哪些串仍需本地化，再决定是否补覆盖；本次未重新验收这些界面文案。非阻塞。

## M1 脚手架施工记录（仅历史档案，不再执行）

> 以下是当时的实施清单和依赖快照，保留作架构来源，**不是当前待办、版本结论或操作授权**。相关文件已经落地；后续维护应读取现有实现及当前依赖，不能照此重建第二实例、模板、skill 或重跑采集。

1. **`docusaurus.config.js`**：`plugins` 加第二实例 `['@docusaurus/plugin-content-docs', { id:'privacy', path:'privacy', routeBasePath:'privacy', sidebarPath:require.resolve('./sidebars-privacy.js'), editUrl:'.../tree/main/' }]`（preset 的 docs 不动）；navbar 加两个 `type:'docSidebar'`（`wikiSidebar` 标「AI 编码误区」；`docsPluginId:'privacy'` + `privacySidebar` 标「LLM 隐私保护」）；新建 `sidebars-privacy.js`（`{privacySidebar:[{type:'autogenerated',dirName:'.'}]}`）。i18n 全局配置不动。
2. **目录**：`privacy/` 六卷 + 各 `_category_.json`（label/position/generated-index）；英文镜像 `i18n/en/docusaurus-plugin-content-docs-privacy/current/`；改任何 label 后跑 `npm run write-translations -- --locale en`。
3. **闸门脚本扩面（扩，非重写）**：`scripts/check-mirror.js`（L21–25 硬编码 `docs` ↔ `docusaurus-plugin-content-docs/current`）→ 遍历实例对数组含 privacy；`scripts/check-i18n.js`（L22–26 单 current.json）→ 两个 current.json 都查 CJK 回退；`scripts/gen-entry-meta.js`（L15–18）→ 另产 `src/data/entryMeta-privacy.json`（隐私轴 severity+maturity+technique）。
4. **组件**：`src/components/PitfallMeta` 是纯渲染组件 → 复制为 `src/components/PrivacyMeta`（badges：era / technique / severity「隐私风险」/ maturity / evidence；复用其 `styles.module.css` 色系）；`src/theme/DocCard/index.js` 的 CardMeta 按 `href.includes('/privacy/')` 分书取 `entryMeta-privacy.json`、渲染 severity + maturity（剥前缀 / 英文首字母大写 / 展开收起逻辑与字段无关，直接复用）。
5. **模板 / 术语 / 导读**：`privacy/_templates/entry-template.md`（九节结构 + §7.3 第一人称红线 + 隐私 frontmatter，导入 `PrivacyMeta`）；`terminology.md` 补隐私术语段 + era/technique/maturity/audience 枚举（先补表再用）；`privacy/intro.md`（+ 英镜像）。
6. **skill**：`aiwiki-translator` 直接复用；`aiwiki-research-refresh` 检索主题改隐私、去重基线指 `privacy/`；`aiwiki-entry-author` 派生隐私版；`STYLE-GUIDE.md` 增补第一人称红线 + 「可 / 不可第一人称」对照表。
7. **本地搜索（坑）**：`docsRouteBasePath:'/'` 单值默认**不索引第二实例** → 先验证是否支持数组 `['/','/privacy']`，不支持就让第二实例暂不入索引（记待办），不急切 Algolia。
8. **治理落地**：顺手做 `dogfooding-checklist`（repo 级精简）+ `CLAUDE.md` 一行指针 + 三道硬闸门进 skill / pre-PR 清单（别堆 CLAUDE.md）。
9. **验证**：六道闸门（autocorrect / vale 或按 Cliches.yml grep / cspell / check:i18n / check:mirror / build 两 locale 两实例）+ 冒烟（主题切换、`/privacy` 路由存在、英文不回退中文）。
