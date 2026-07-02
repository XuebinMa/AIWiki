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

- ✅ **Apple PCC（Private Cloud Compute）**：已核（Apple Security Research 官方）——设备级远程证明 + 把生产软件镜像公开上**可验证透明日志**（设备只与「证明匹配公开发布」的节点通信）+ **无特权运行角色** + 部分源码开放安全研究。已作《机密推理》（卷五）的生产实例出处。
- ⬜ **Carlini 等 · 抽取 / 量化记忆**：核确切标题 / 年份——《Extracting Training Data from Large Language Models》（USENIX Security 2021？）、《Quantifying Memorization Across Neural Language Models》（2022/2023？）。
- ⬜ **PATE**：全称 Private Aggregation of Teacher Ensembles、出处（Papernot 等 2017？）、与 DP-SGD 区别。
- ⬜ **机密推理开销（高优）**：我写「H100/H200 约 95–99% 原生」过乐观；评审 R1 给「penalty 约 4–8%」与「模型换入换出场景低 45–70%」。**这三个数都待一手核**，落条目必须带条件（workload / batch / seq len / 模型规模 / 是否含权重保护 / against provider 还是 co-tenant）。
- ✅ **Gboard DP 模型数**：已核（Xu 等 2023, ACL）——论文原文「**more than twenty**」=「二十多个」，评审 R1 对；且所有下一词预测神经语言模型现均带 DP、未来发布要求 DP。已用于《生产级 DP·FL 部署》（卷五）。
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
| 证据字段多标签（primary/supporting） | P1 | 🟡 **轻量版早已落**（R3：terminology「主要/补充」约定 + 延伸阅读开头标注）；frontmatter 机读多标签**仍待**——评审重提，作可选增强（机密推理是混合证据典型）。须可机械派生、不靠打分（接 evidenceLevel） |
| 目录页卡片摘要过长 | P1 | ⬜ 待做：卡片只留短标题 / 一句话风险 / 风险等级 / 成熟度 / 证据 / 板块，长摘要留正文。先查 DocCard 取 description 还是摘要 |
| 威胁矩阵拆二级页面 | P1 | ⬜ 待做：留总表 + 拆「训练期 / 推理期 / RAG·Agent / 治理 / 评测」二级索引 |
| 隐私案例库入口 | P2 | ✅ **已落（2026-07）**：`privacy/incidents.mdx`（真实事故与实证索引，中英，slug `incidents`，侧栏 pos 8）——两层：**A 真实生产事故**（EchoLeak / CamoLeak / ChatGPT 串味 / NYT 保全令 / o3 反向定位⚠️）+ **B 里程碑演示**（Nasr 抽取 / Carlini 扩散图 / Morris 嵌入反演 / PromptPeek KV-cache / Fredrikson 反演），每条反链条目 + 一手源；两层分列即一条纪律（别把「已证明可行」当「生产已泄露」） |
| 最小隐私基线页面 | P2 | ✅ **已落（2026-07）**：`privacy/baseline.mdx`（10 条速用基线，中英，slug `baseline`，侧栏 pos 7）——数据分级 + 边界 / 厂商「不训练」非整条边界 / RAG 前置 ACL·向量非匿名 / 租户隔离 + 并发压测 / Agent 出站收口渲染层 / MCP 最小采集 + 审子处理方 / 去重 + DP 审 ε / 删除跨副本扇出可验证 / 发布前记忆量化 + 注入 eval / 推理链·截屏当输出面脱敏；每条点破一个假安全、仿 `docs/threat-model` 顶部基线 |

## 选题储备（按卷 × 技术板块，待逐条立项）

> 卷（阅读主线）与技术板块（查询轴）见 PROPOSAL 第 6 节（板块经 R1 调整为 14，含去重边界）。下面只占位，逐条进流水线前再细化、去重、配 ≥2 个一手出处。

- ✅ 卷一 · 隐私根基（**只讲最小承重地基**）：**已补完**——MIA（`membership-inference`）、TEE（`trusted-execution-environment`）、HE·MPC（`he-mpc`）三条已落；**模型抽取与窃取**（`model-extraction-stealing`：Tramèr USENIX'16 判别式根基 + Carlini ICML'24 生产 LLM 投影层窃取）后补为第四条**根基级攻击**（前 LLM / 判别式时代起源，恰配本卷定位，放大离线 MIA / 抽取）；**模型反演与属性推断**（`model-inversion-attribute-inference`：Fredrikson CCS'15 人脸反演 + USENIX Sec'14 华法林属性推断）补为第五条（与 MIA 同属推断类攻击板块）；**属性 / 分布推断**（`property-inference`：Ganju CCS'18 元分类器 + Suri&Evans PoPETs'22 `n_leaked`，群体级、补第六条）✅；DP 最小地基并在卷三《DP 微调》（各条已回链）。卷一现 6 条。HE 开销倍数 / 机密推理开销 / Apple PCC 仍挂「写作前必核」待一手核（条目内已 `:::caution`）。
- 🟡 卷二 · 记忆与抽取（**旗舰**）：**训练数据抽取**（`training-data-extraction`）✅、**量化记忆与记忆审计**（`quantifying-memorization`：Secret Sharer canary/exposure + Quantifying Memorization scaling，technique=隐私评测与审计，落板块 14）✅、**训练数据去重**（`training-data-deduplication`：Lee ACL'22 记忆降约 10× + Kandpal ICML'22 重复→生成超线性，technique=记忆与抽取）✅、**隐私定向投毒**（`privacy-poisoning`：Tramèr Truth Serum CCS'22，投毒 <0.1% 放大对他人泄露 1–2 量级）✅；卷二现 4 条。
- ✅ 卷三 · 对话大模型（**已补完**）：**DP 微调**（`dp-fine-tuning`）、**上下文面隐私**（`context-surface-privacy`：OWASP LLM07:2025 + Zhang·Carlini·Ippolito COLM 2024 + prompt stealing）、**PII 回吐**（`pii-regurgitation`：Lukas S&P'23 脱敏减不根除 + ProPILE NeurIPS'23，technique=PII 检测与脱敏，落该板块）三条齐。
- 🟡 卷四 · RAG 与 Agent：**多租户 RAG 检索泄露**（`rag-retrieval-leakage`）✅、**跨会话 / 跨租户记忆串味**（`cross-session-memory-bleed`：ChatGPT 2023-03 redis-py 竞态事故 + OWASP LLM02）✅、**Agent 工具外联数据外泄**（`agent-tool-exfiltration`：Greshake AISec'23 间接注入 + OWASP LLM01/02）✅、**嵌入反演**（`embedding-inversion`：Song&Raghunathan CCS'20 词级 + Morris vec2text EMNLP'23 逐字）✅、**Agent 隐私评测（AgentDojo）**（`agent-privacy-benchmark`：Debenedetti AgentDojo NeurIPS'24，97 任务 × 629 安全测试含外泄注入；technique=隐私评测与审计）✅；卷四现 5 条；多 agent 协作数据边界可后续再加深。
- ✅ 卷五 · 前沿落地（**三小节齐 + FL 线已加深**）：① 私有计算与机密推理 `confidential-inference`（接卷一 TEE+HE·MPC，PCC/NVIDIA 生产实例）；② 可验证删除与机器遗忘 `machine-unlearning`（Cao&Yang 2015 / SISA 2021，MIA 作验证）；③ 生产级 DP·FL 部署 `dp-federated-learning`（Gboard DP-FTRL 二十多个模型 / Apple 本地 DP）。**FL 线加深两条**：**梯度泄露** `gradient-leakage`（Zhu DLG NeurIPS'19 + Geiping Inverting Gradients NeurIPS'20，攻击：共享梯度可反演训练样本）+ **安全聚合** `secure-aggregation`（Bonawitz CCS'17 协议 + MLSys'19 Google 生产部署，防御：服务器只见聚合和）——与 DP·FL 形成「攻击 + 两道互补防御」的 FL 隐私簇。**再加深两条**：**遗忘可验证性** `unlearning-verification`（Thudi USENIX'22 模型级不可验证 / 可伪造 + TOFU COLM'24 基准）+ **推理期侧信道** `inference-side-channels`（Weiss USENIX'24 token 长度还原 + Gu ICML'25 跨用户 prompt 缓存计时）。**FL 簇再加两条**：**拆分学习泄露** `split-learning-leakage`（Pasquini CCS'21 FSHA 恶意服务器从中间激活重建输入 + Erdoğan UnSplit WPES'22 data-oblivious 反演 MSE≈0.08–0.15）+ **联邦分析** `federated-analytics`（Google FA + Zhu AISTATS'20 DP heavy hitters + Bassily NeurIPS'17 本地 DP，maturity 生产）；卷五现 9 条。
- 🟡 卷六 · 治理合规（**合规索引 + 实体条目**）：**推理服务数据边界** `inference-service-data-boundary`✅、**数据生命周期与删除传播** `data-lifecycle-deletion`✅、**合成数据隐私** `synthetic-data-privacy`（Stadler USENIX'22 相似度评估低估 + GAN-Leaks CCS'20 黑盒 MIA；technique=PII 检测与脱敏）✅、**LLM 水印与溯源** `llm-watermarking`（Kirchenbauer ICML'23 green/red + 可靠性 ICLR'24 改写可去 + Copyright Traps ICML'24）✅、**微调即服务隐私** `ftaas-privacy`（Qi ICLR'24 微调侵蚀对齐、定位安全>隐私须注明 + 三厂商保留官方文档）✅；卷六现 5 条。各技术条目带「合规映射」小段的要求贯穿全书。
- ✅ 技术板块新增：13 数据生命周期与数据治理（`data-lifecycle-deletion`：删除请求跨存储传播，GDPR Art.17/19 + NIST Privacy Framework，卷六）✅；14 隐私评测与审计（`quantifying-memorization`，卷二）✅。**13 vs 12 边界（评审 R2）**：数据生命周期 = 数据在哪流动 / 存储 / 复制 / 删除 / 备份（where）；治理与合规（板块 12）= 谁负责 / 法律映射 / 审计证据留存（who·law）。
- ✅ **14 技术板块全覆盖里程碑**：本波（PII 回吐 / 量化记忆审计 / 模型抽取窃取 / 数据生命周期）落地后，14 个技术板块**各有至少一条落地条目，或以「贯穿各条」方式覆盖**（治理与合规贯穿合规映射、隐私评测贯穿最小可测试断言且另有专题）。map.mdx 的 _规划中_ 标记已全部转实链。后续按**深度**补强，不为铺板块注水。

### 研究刷新候选（aiwiki-research-refresh-privacy 跑出，已核一手源，待逐条立项确认）

> **Wave 1（5 条）+ Wave 2（6 条）= 本批 11 个候选已全部落地**（子代理并行起草 + 主控质量过）。Wave 1：嵌入反演、隐私定向投毒、属性 / 分布推断、遗忘可验证性、推理期侧信道。Wave 2：合成数据隐私、LLM 水印与溯源、拆分学习泄露、联邦分析、微调即服务隐私、Agent 隐私评测（AgentDojo）。下表为候选记录（出处存档备查），新选题进下一轮 research-refresh。

> 2026-06 由 research-refresh 流水线 fan-out 多个核源子代理产出，**均已核一手出处**（venue / year 交叉核实；arXiv 代理 403 时改用 dblp / 会议官网 / PMLR / PoPETs / OpenReview / NIST）。新增条目属需确认类——下表交用户挑选再进流水线。标 ⚠️ 者为 preprint / venue 待核，写前再核。

| 候选 | 卷 / 板块 | 已核一手源（最强） | maturity |
|---|---|---|---|
| 文本嵌入反演 embedding inversion | 卷四 或卷一推断 | Song&Raghunathan CCS'20；Morris vec2text EMNLP'23（杰出论文，32-token 92% 精确还原） | 研究 |
| 合成数据隐私与失效 | 卷六 / PII | Stadler USENIX'22（相似度评估严重低估风险）；GAN-Leaks CCS'20；PATE-GAN ICLR'19；NIST SP 800-226 | 研究/试验 |
| 隐私定向投毒 Truth Serum | 卷二 | Tramèr 等 Truth Serum CCS'22（投毒 <0.1% 放大对他人记录泄露 1–2 个数量级） | 研究 |
| 属性 / 分布推断 | 卷一 推断类攻击 | Ganju CCS'18；Suri&Evans PoPETs'22（n_leaked 形式化）；Ateniese IJSN'15 | 研究 |
| 机器遗忘可验证性 / 审计 | 卷五 遗忘 | Thudi USENIX'22（模型级无法验证遗忘、可伪造证明）；TOFU COLM'24；MUSE ⚠️preprint | 研究 |
| LLM 水印及其极限 | 卷六 / 新角度 | Kirchenbauer ICML'23（green/red list）；可靠性 ICLR'24（改写可去）；Copyright Traps ICML'24 | 研究 |
| 推理期侧信道（token 长度 / prompt 缓存 / 投机解码 / 硬件缓存） | 卷五 / 新角度 | Weiss USENIX'24（token 长度→29% 逐字 / 55% 主题）；Gu ICML'25（跨用户 prompt 缓存计时）；Wei NDSS'25；Gao USENIX'25 | 研究 |
| 拆分学习泄露 split learning | 卷五 FL 簇 | Pasquini CCS'21 FSHA（恶意服务器重建输入）；UnSplit WPES'22 | 研究 |
| 联邦分析 federated analytics | 卷五 FL 簇 | Google FA 博客 + Secure Agg；Zhu AISTATS'20 DP heavy hitters；Bassily NeurIPS'17 | 生产 |
| 微调即服务 FTaaS 隐私 | 卷六 | Qi 等 ICLR'24（10 样本 <$0.20 越狱微调 API；安全>隐私需注明）+ 三厂商数据保留官方文档 | 研究/生产 |
| Agent PII 外泄基准 AgentDojo | 卷四 加深 | AgentDojo NeurIPS'24（97 任务×629 安全测试，含外泄注入任务） | 研究 |

#### 2026-07 轮 · 前沿新攻防面扫描（业界实践优先；4 簇 fan-out，已核一手源）

> 承用户「业界实践 > 学术」指示，本轮侧重 2025–2026 前沿新面 + 各家线上真实做法 / 事故。四个前沿簇（多模态 / 推理、私有提示与 DP、Agent / 协议层、供应链与审计）并行核源，去重基线 = 现有 `privacy/` 32 条。**✅ 本轮结束：Tier A + B + C 全 12 条已落地 PR #72（隐私 32 → 44，中英镜像齐、六道闸门全过）**——分三波（Wave 4/5/6）子代理起草 + 主控质量过（含 AgentLeak 数字区间化、Apple AFM 3 年份订正、多处红线散文化等独立复核改正）。仅剩 3 条并入 / 搁置（见文末「并入 / 搁置」）。标 ⚠️ 为 preprint / 待核，写前再核。已当场复核的顶会源：Leaky Thoughts EMNLP 2025 主会 ✅、Mission: Impossible PoPETs 2025-0137 ✅、RWKU NeurIPS 2024 D&B ✅、MAGPIE 系 NeurIPS 2025 **Workshop（ResponsibleFM）非主会** ⚠️。

**Tier A（业界实践最强，本波写作中）**

| 候选 | 卷 / 板块 | 已核一手源（最强） | maturity |
|---|---|---|---|
| 持久记忆的隐私与留存 `persistent-agent-memory-privacy` | 卷六 / 数据生命周期与数据治理 | OpenAI Memory FAQ + Anthropic memory-tool 官方文档；OpenAI 回应 NYT 数据令（法律令冻结删除）| 生产 |
| 多模态地理定位推断 `vlm-geolocation-inference` | 卷三 / 推断类攻击 | Mission: Impossible PoPETs 2025-0137（绝对精度仍有限，须保留条件）；部署模型反向定位现象 ⚠️部分二手 | 生产 |
| MCP 数据流与最小采集 `mcp-data-flow-privacy` | 卷四 / RAG 与 Agent 隐私 | MCP 安全规范 2025-06（同意 + 最小采集原文）；NSA/CISA MCP CSI；CoSAI/OASIS WS4 | 生产 |
| 端侧推理隐私 `on-device-inference-privacy` | 卷五 / 隐私保护计算 | Apple Intelligence + PCC 官方；Google Gemini Nano / Android AICore 官方 | 生产 |

**Tier B（强选题，研究档或混合背书，下一波候选）**

| 候选 | 卷 / 板块 | 已核一手源（最强） | maturity |
|---|---|---|---|
| 推理链（思维）泄露 `reasoning-trace-leakage` | 卷三 / 上下文面 | Leaky Thoughts EMNLP 2025（主会，思考越多漏越多）；Trend Micro DeepSeek-R1 | 研究 |
| 多智能体内部信道泄露 `multi-agent-internal-leakage` | 卷四 / RAG 与 Agent | AgentLeak ⚠️（内漏比外漏多 2.6×、输出审计漏 46%）；MAGPIE NeurIPS'25 Workshop ⚠️；ConVerse ⚠️ | 研究 |
| Computer-use 屏幕捕获隐私 `computer-use-screen-capture-privacy` | 卷四 / RAG 与 Agent | Anthropic computer-use 文档；OpenAI Operator system card | 生产 |
| LoRA / 适配器泄露微调数据 `lora-adapter-leakage` | 卷三 或卷五 | LoRA-Leak ⚠️（delta + 公开底座 = MIA 放大器）；SPIE | 研究/试验 |

**Tier C（偏学术 / 需严格划界，储备）**

| 候选 | 卷 / 板块 | 已核一手源（最强） | maturity |
|---|---|---|---|
| DP 审计 / 一次训练审计 ε `dp-privacy-auditing` | 卷三 或卷五 / 隐私评测与审计 | Steinke NeurIPS'23 杰出论文「Privacy Auditing with One Training Run」；ICLR'25 后续 | 研究/试验 |
| 遗忘基准与标准化评测 `unlearning-benchmarks` | 卷五 / 隐私评测与审计 | RWKU NeurIPS'24 D&B；MUSE ⚠️preprint（须与 `machine-unlearning` / `unlearning-verification` 严格划界）| 研究 |
| DP 上下文学习 / 私有提示 `dp-in-context-learning` | 卷三 / 差分隐私 | Wu ICLR'24（DP-ICL，Microsoft Research）| 试验 |
| 多模态训练图像抽取 `multimodal-training-image-extraction` | 卷二 / 记忆与抽取 | Carlini USENIX'23（扩散模型逐字抽取）；VLM-MIA NeurIPS'24 | 研究 |

**并入 / 搁置（不单独成条）**

- ✅ `kv-cache-prompt-reconstruction`（PromptPeek，NDSS 2025）→ **已并入 `inference-side-channels`**（缓存侧信道从「探测复用」升级到「逐 token 重建正文」：SGLang radix-tree KV-cache，已知模板约 99% / 无背景约 95%，绑定其设置）。已核 NDSS 2025，非独立面。
- ✅ `a2a-protocol-privacy`（arXiv 2505.12490 ⚠️单篇预印）→ **已并入 `multi-agent-internal-leakage` 延伸阅读**（协议层相邻缺口：A2A 令牌生命周期 / 过宽 scope / 缺同意流 + consent orchestration + 短时效 scoped token）。单源太薄，作方向性佐证、不单列成条。
- ⏸️ `compression-privacy`（量化 / 蒸馏对记忆泄露的影响）→ **搁置确认（本轮不立条）**：现有证据多指向压缩**降低**泄露，不合「误区 / 假安全」形；有反向一手证据（压缩**放大**泄露）再议。

### 框架差异小节（按需补，打版本戳；判据：仅当差异源于工具机制、且短）

- ✅ 已补：`dp-fine-tuning`（DP 库：Opacus / TF-Privacy / jax-privacy）、`dp-federated-learning`（FL 框架：TFF / Flower / NVFlare）。
- ⬜ 候选：`secure-aggregation`（各实现门限 / 开销）、`data-lifecycle-deletion`（各向量库删除是否连带嵌入 + 索引）、`rag-retrieval-leakage`（各向量库多租户隔离默认）。**不逐条铺**。

## 结构 / 流程待办

- 🟡 **来源重心：工程实践 > 学术论文（用户指示 2026-06，最高优先）**：本主题天生偏研究（攻防多来自论文），但仍要以「**各公司在生产里实际怎么做**」为主线——厂商工程博客 / 安全 & 数据治理文档（Apple PCC、Google Gboard DP·FTRL / Maps DP、Microsoft Presidio 脱敏、各家 retention / ZDR 条款）、真实 FL·DP 部署、隐私事故 / 泄露复盘、从业者一手账。**论文降为机制背书**，不当头条。**三道硬闸门不松**（量化主张仍要一手 + 条件 + 日期；厂商条款属二手、落条目前回一手核、核不到就条件化不裸写数字）。判据：能讲「X 公司线上这么做」就别只摆「Y 论文证明」。落地深度见对话确认。
- ✅ **M0.5（proposal 修订一轮）**：已落（当前 `PROPOSAL-privacy-book.md` 即 M0.5 版：§6.4 并行路线、卷一最小地基、卷五拆三、卷六贯穿 + 合规映射、板块 14 + 去重边界、定位措辞、多模态范围边界、首批样板四面、「书→主题」命名清洗）。
- ✅ **frontmatter 轴枚举**：`era` / `technique` / `attack_surface` / `maturity` / `audience` 定稿写进 `terminology.md`「枚举值映射（隐私 frontmatter 与 `<PrivacyMeta>`）」；`maturity`「研究 / 试验 / 生产」为硬约束（硬闸门 C）。
- ✅ **`severity` 隐私语义**：沿用高/中/低（显示作「隐私风险」），已写 `terminology.md`；不另拆「数据敏感度」轴（PROPOSAL §13 已定）。
- ✅ **本地搜索多实例**：已验证 `@easyops-cn/docusaurus-search-local` 的 `docsRouteBasePath` 接受 `string[]`，设为 `['/', 'privacy']`，**两实例都入本地索引**，无需切 Algolia。
- ⬜ **技术评审人**：密码学准确性（尤卷一/卷五）需独立评审。**ChatGPT 作内容独立评审人**（R1 已收）；Claude 对其意见可提异议（如 R1 的数字、板块数、首批样板），目标协作。后续评审继续落「评审分诊记录」。
- ✅ **dogfooding-checklist**：`DOGFOODING.md`（repo 级精简）+ `CLAUDE.md` 一行指针；三道硬闸门进 `DOGFOODING.md` pre-PR 清单 + `STYLE-GUIDE.md`「LLM 隐私保护主题专属规范」（未堆 CLAUDE.md）。
- ✅ **企业/供应商数据边界 checklist**：toolkit 工件「**LLM Vendor Data Boundary Checklist**」已落（`privacy/vendor-data-boundary-checklist.mdx` 中英，slug `vendor-data-boundary-checklist`）。覆盖 8 类：训练使用 / retention / abuse monitoring·人工访问 / zero data retention（覆盖与否）/ subprocessors / region·residency / DPA·BAA·合规报告 / observability·tracing 二次泄露；含逐厂商记录表（答案 + 条款出处 + 核验日期）+ 季度复核。《推理服务数据边界》双向链。
- ✅ **第一人称纪律对照表**：已写进 `STYLE-GUIDE.md`「第一人称红线（强规则）」的「可 / 不可第一人称对照表」。
- ✅ **M1 最小化**：脚手架最小可渲染已落（第二实例 + 侧边栏 + 六卷 + i18n 镜像 + 模板 + 术语 + 导读 + 闸门扩面 + `PrivacyMeta` + `DocCard` 适配 + `entryMeta-privacy.json`）。**轴索引页**：`privacy/map.mdx`（隐私地图，中英，slug `map`）已落——**技术板块**分组（14 板块，已落条目挂主板块、未落标 _规划中_）+ **威胁→缓解矩阵**（按泄露面反查在管条目 + 残余风险）。**四条导读轴已落齐（2026-07，中英）**：必读 12 条（`core-12.mdx`，pos 0.5 顶部）、最小基线（`baseline.mdx`，pos 7）、案例库（`incidents.mdx`，pos 8）、机制索引（`mechanisms.mdx`，pos 9，8 个根因桶覆盖全 44 条、每条只挂主因桶）；map pos 10、工件 pos 11 收底。对齐「误区」主题的导读轴配置（必读 / 基线 / 案例 / 机制）。
- ✅ **`evidence` 多证据类型（R3）**：走**轻量**——不扩 schema。`terminology.md`「evidence」加「主要 / 补充」约定；`entry-template` + skill 同步；RAG 主标签改 研究支持（最强一类）、RAG + 推理服务在「延伸阅读」开头注「主要：X；补充：Y」。多字段数组方案**否决**（过度工程）。
- ✅ **「最小可测试断言」模板块（R3）**：已并入「落地实现」小节末（不新增第十节）；`entry-template` + `aiwiki-privacy-entry-author` skill 均加该小块，四条样板（中英）全回填「怎么测 / 通过证明什么 / 失败看到什么」，后续条目统一带。
- ✅ **「真实案例」小节标题柔性（R3）**：`entry-template` + skill 标明该小节标题可按 `maturity` 微调；四条已对齐——训练抽取「真实案例」/ DP「真实案例 / 工程可行性」/ RAG「真实案例：相邻事故」/ 推理服务「厂商现状」，不再给试验级条目挂「生产部署」。

### M1 落地记录（本 PR）与遗留

**本 PR 已交付**（对照「M1 脚手架执行细节」1–9）：多实例 config + navbar 双主题入口；`sidebars-privacy.js`；`privacy/` 六卷（各 `_category_.json` generated-index）+ 每卷一页「本卷导言」占位（Docusaurus 会**过滤掉空的 generated-index 分类**，故每卷需 ≥1 篇非草稿文档才在侧边栏显形）；中英镜像 + 分类翻译键译全；三脚本扩面（check-mirror / check-i18n 两实例、gen-entry-meta 另产 entryMeta-privacy）；`cspell` glob 加 `privacy/**`（CI lint.yml 同步）；`PrivacyMeta` + `DocCard` 隐私分支；模板 / 术语 / 导读 / STYLE-GUIDE / DOGFOODING。六道闸门 + 两 locale 两实例 build 通过。

**本 PR 刻意不做（留后续 PR，遵「一 PR 一事」）**：

- ✅ **skill 派生**：`aiwiki-privacy-entry-author`（九节 + 红线 + 隐私 frontmatter）已落；`aiwiki-research-refresh-privacy`（去重基线指 `privacy/`、三道硬闸门、密码学 / ML 隐私一手来源标准、全仓 autocorrect、gen:meta 收口）已落 + `CLAUDE.md` 指针更新。`aiwiki-translator` 直接复用（术语已扩）。
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
