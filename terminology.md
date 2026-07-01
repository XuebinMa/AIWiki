# 术语表 / Glossary

全站译名以本表为准。`aiwiki-translator` 与 `aiwiki-entry-author` 都依赖它来保持一致。
**新增术语先补表，再用。** 术语表机制借鉴自 [senshinji/claude-translation-skill](https://github.com/senshinji/claude-translation-skill)（MIT，见 `CREDITS.md`）。

## 专有名词（不翻译，原样保留）

Claude Code · Cursor · GitHub Copilot · Codex CLI · Gemini CLI · CLAUDE.md · Anthropic · Claude · Opus · Sonnet · Haiku · Docusaurus · MDX · Mermaid · Git · GitHub · slug · frontmatter · WebSearch · WebFetch · ADR · slopsquatting

## 通用术语

| 中文 | English | 备注 |
|------|---------|------|
| 上下文窗口 | context window | 全站统一，不要写成 memory |
| 上下文 | context | |
| 会话 | session | |
| 子代理 | subagent | |
| 钩子 | hook | |
| 斜杠命令 | slash command | |
| 技能 | skill | |
| 插件 | plugin | |
| 提示词 | prompt | |
| 误区 | pitfall | 条目的基本单元 |
| 最佳实践 | best practice | |
| 验证闭环 | verification loop | |
| 上下文压缩 | compaction | 对应 `/compact` |
| 注意力（稀释） | attention (dilution) | |
| 一句话摘要 | In one sentence | 每条开头的摘要句式 |
| 谄媚 | sycophancy | AI 倾向附和用户而非说真话 |
| 确认偏误 | confirmation bias | |
| 偏好模型 | preference model | RLHF 中给回答打分的模型 |
| 人类反馈强化学习 | RLHF | 缩写 RLHF 全文保留不译 |
| 想法验证 | idea validation | |
| 可行性 | feasibility | |
| 最小权限 | least privilege | |
| 权限（确认）| permission (prompt) | |
| 过度授权 | over-permissioning | |
| 提示注入 | prompt injection | |
| 沙箱（隔离）| sandbox / sandboxing | |
| 确认疲劳 | approval fatigue | |
| 过度代理 | excessive agency | OWASP LLM Top 10 |
| AI 代理 | AI agent | |
| 过度设计 | over-engineering | |
| 技术选型 | technology selection | |
| 权衡 | trade-off | |
| 技术债 | technical debt | |
| 边界条件 | boundary conditions | |
| 健壮性 | robustness | |
| 主路径 | happy path | 也写 happy path |
| 幂等 | idempotency | |
| 代码风格 | code style | |
| 一致性 | consistency | |
| 约定 | convention | 项目既有写法/规范 |
| 风格漂移 | style drift | 跨文件/跨轮风格不一致 |
| 格式化工具 | formatter | |
| 性能 | performance | |
| 复杂度 | complexity | |
| 反模式 | anti-pattern | |
| 非功能需求 | non-functional requirement | |
| 幻觉 | hallucination | AI 编造看似可信的内容 |
| 编造来源 | fabricated sources | |
| 检索 | retrieval | |
| 非确定性 | non-determinism | 同输入未必同输出 |
| 不确定度 | uncertainty | |
| 置信度 | confidence | |
| 架构决策记录 | ADR (architecture decision record) | 缩写 ADR 保留不译 |
| 歧义 | ambiguity | |
| 计划模式 | plan mode | 对应 plan mode |
| 规格 | spec | |
| 验收标准 | acceptance criteria | |
| 占位值 | placeholder | |
| 假数据 | fake data | |
| 重复逻辑 | duplicate logic | 违反 DRY |
| 幻觉 import | hallucinated import | 幻觉出不存在的依赖；参见 slopsquatting |
| 供应链（攻击）| supply chain (attack) | |
| 确定性 | determinism | 与「非确定性」成对；hook 是确定性执行 |
| 渐进式披露 | progressive disclosure | skill 按需加载的设计 |
| 强制配置 | enforced configuration | settings 强制生效，区别于「建议性上下文」 |
| 建议性上下文 | advisory context | CLAUDE.md 是建议性、非强制 |
| 多代理协作 | multi-agent collaboration | |
| 职责边界 | responsibility boundaries | 多 subagent 各自负责范围 |
| 共享契约 | shared contract | 跨 subagent 的接口/格式/命名约定 |
| 致命三件套 | lethal trifecta | Simon Willison：私有数据 + 不可信内容 + 对外通信 |
| 版本漂移 | version drift | API/依赖版本对不上 |
| 文档源 | doc source | 版本化文档源，如 Context7 |
| 自动化偏误 | automation bias | 人倾向接受自动化输出、放松核验 |
| 技能萎缩 | skill atrophy | 长期外包给 AI 导致能力退化 |
| 人在环上 | human-in-the-loop | 关键判断保留人工把关 |
| 自我纠正 | self-correction | |
| 模式锁定 | pattern locking | 锁进熟悉模式反复套同一修法 |
| 运行反馈 | runtime feedback | 栈/日志/失败断言等真实运行信息 |
| 不可逆操作 | irreversible action | |
| 破坏性操作 | destructive operation | |
| 备份隔离 | backup isolation | 备份与生产不同凭据、不同爆炸半径 |
| 冻结期 | freeze | 代码/操作冻结窗口 |
| 试运行 | dry-run | 先打印将要改动什么、不真做 |
| 上下文腐烂 | context rot | 上下文越长质量越降、中段被忽略 |
| 静态扫描 | SAST | 静态应用安全测试 |
| 错误处理 | error handling | |
| 静默失败 | silent failure | 吞掉异常 / 用兜底默认值掩盖 |
| 间接提示注入 | indirect prompt injection | 外部内容里藏的恶意指令 |
| 文档漂移 | doc drift | 注释/文档与代码不一致 |
| 依赖膨胀 | dependency bloat | 为小需求引入重依赖 |
| 过早抽象 | premature abstraction | 为不存在的需求提前抽象 |
| 原子提交 | atomic commit | 一个提交一件事 |
| 失控循环 | runaway loop | agent 非终止 / 烧 token |
| 数据模型 | data model | schema / 表结构 / 接口契约 |
| 迁移 | migration | schema 变更脚本 |
| 演进式设计 | evolutionary design | schema 跟代码一起迭代 |
| 并发 | concurrency | |
| 竞态条件 | race condition | check-then-act / read-modify-write |
| 魔数 | magic number | 无名字的字面量 |
| 硬编码 | hardcoding | 把配置值写死进代码 |
| 许可合规 | license compliance | |
| copyleft | copyleft | 传染性许可（GPL/AGPL） |
| 知识产权 | intellectual property (IP) | |
| 记忆与回吐 | memorization / regurgitation | 模型逐字复现训练样本 |
| 校准 | calibration | 置信度与正确率是否匹配 |
| 解释忠实性 | explanation faithfulness | 解释是否反映真实推理 |
| 过度自信 | overconfidence | |
| 规划谬误 | planning fallacy | 系统性低估工期 |
| 参照类比预测 | reference-class forecasting | 用历史同类项目校准估算 |
| 需求镀金 | gold plating | 擅自把需求做大 |
| 过度 mock | over-mocking | 把真实依赖 mock 掉致测试失义 |
| 范围蔓延 | scope creep | 擅自扩大改动范围 |
| 文件状态 | file state | 文件当前真实内容 |
| 整文件重写 | full-file rewrite | 不读现状、从头重写整个文件 |
| 最小 diff | minimal diff | 只改必要之处 |
| 重构 | refactoring | |
| 回归测试 | regression testing | |
| 副作用 | side effect | |
| 鉴权 | authorization | |
| 输入校验 | input validation | |
| 纵深防御 | defense in depth | |
| 威胁建模 | threat modeling | |
| 可维护性 | maintainability | |
| 质量闸门 | quality gate | |
| 敏感数据 | sensitive data | |
| 案例库 | Case Library | 真实事故 / 复盘的可核查案例集 |
| 复盘 | postmortem | 事后审查 |
| 爆炸半径 | blast radius | 一次操作能波及的范围 |
| 提权 | privilege escalation | 本地 / 跨用户提升权限 |
| 配置安全 | config security | 配置来源信任 / 完整性 |
| 清单 | checklist | |
| 模板 | template | |
| 任务启动模板 | task-kickoff template | 给 AI 下任务的开场模板 |

## 枚举值映射（frontmatter 与 `<PitfallMeta>`）

### roles 角色

| 中文 | English |
|------|---------|
| 项目经理 | Project Manager |
| 架构师 | Architect |
| 工程师 | Engineer |
| 测试工程师 | QA Engineer |
| 运维工程师 | DevOps Engineer |

### phase 阶段（与 `docs/` 目录一一对应）

| 目录 | 中文 | English |
|------|------|---------|
| `00-setup-collaboration` | 准备与协作 | Setup & Collaboration |
| `01-ideation-feasibility` | 灵感与可行性 | Ideation & Feasibility |
| `02-requirements` | 需求分析 | Requirements |
| `03-architecture` | 概要设计 | Architecture |
| `04-detailed-design` | 详细设计 | Detailed Design |
| `05-implementation` | 编码实现 | Implementation |
| `06-testing` | 测试 | Testing |
| `07-acceptance-release` | 验收与发布 | Acceptance & Release |

### severity 严重度

| 中文 | English |
|------|---------|
| 高 | High |
| 中 | Medium |
| 低 | Low |

### applies_to 常用说法

> 自由文本，非严格枚举；标注一条误区「跨哪些 AI 系统」。轴是**工具 / agent**（见下「tool」），不是模型。
> 旧值「全模型通用 / All models」已弃用——按误区是 **LLM 级**（纯聊天也会犯）还是 **coding-agent 级**（需代码生成 + 工具 + 自动执行）拆进「通用 LLM / Coding Agent 通用」。

| 中文 | English |
|------|---------|
| Claude Code 全版本 | All Claude Code versions |
| Claude Code（支持 /rewind 的版本效果最佳） | Best results on versions that support /rewind |
| Coding Agent 通用 | All coding agents |
| 通用 LLM | All LLMs |
| Gemini CLI 特有 | Gemini CLI only |
| Cursor 特有 | Cursor only |

### tool 工具 / agent（矩阵轴；按 harness 而非模型）

> 误区绝大多数是范式级的（LLM + 工具调用 + 长上下文 + 自动执行共有）。值得单列的差异几乎都来自 **harness / 工具机制**（hooks、并行 subagent 编辑、权限模型…），不来自底层模型——同一模型在不同工具下行为也不同。故「工具矩阵」与各条「工具差异」小节一律按**工具 / agent**组织，不按模型分写。每条用**工具名作 tag**（沿用 roles 的 tag 聚合，见 `src/pages/roles.mdx`）。工具名属专有名词，原样保留不翻译。

| 中文 | English | 备注 |
|------|---------|------|
| Claude Code | Claude Code | 当前覆盖最深 |
| Cursor | Cursor | IDE 内 agent / Composer |
| GitHub Copilot | GitHub Copilot | 补全 / chat / agent 模式 |
| Codex CLI | Codex CLI | OpenAI 终端 agent |
| Gemini CLI | Gemini CLI | Google 开源终端 agent（首个试点第 2 工具） |

### evidence 证据类型

每条只挂**一个**主标签，取其 `sources` 里「最强」的一类。用来让读者一眼分清哪些是硬证据、哪些是经验或推测。

| 中文 | English | 含义 | 可信度档 |
|------|---------|------|---------|
| 官方文档 | Official docs | 厂商 / 工具官方文档明确说明 | 高 |
| 研究支持 | Research | 论文 / 实证研究支撑 | 高 |
| 安全报告 | Security advisory | OWASP / CVE / 安全披露 | 高 |
| 社区案例 | Community case | 公开 issue / 复盘 / 博客讨论 | 中 |
| 经验观察 | Experience | 协作中反复观察，无单一权威出处 | 中 |
| 推测待验证 | Unverified | 合理推测，尚无强证据 | 待验证 |

取值规则（确定性派生自 frontmatter `sources`，便于复核）：

- 含官方文档（`code.claude.com` / 厂商 docs）→ 官方文档
- 含论文 / 研究（arXiv、ACM、Springer、METR 等）→ 研究支持
- 含 OWASP / CVE / 安全披露 → 安全报告
- 仅博客 / Medium / 社区讨论 → 社区案例
- 无强外部出处、主要靠机制推理 → 经验观察（实在拿不准 → 推测待验证）
- 多类并存时取「最强」一类作为主标签。

**混合证据的「主要 / 补充」（评审 R3）**：一条的 `sources` 常跨多类（如 RAG 检索泄露 = 研究论文 + 官方事故复盘 + 框架）。仍只挂**一个主标签**（取最强一类，见上），**不另设多字段**——这是刻意的轻量取舍。其余证据类型在条目「延伸阅读与出处」里逐条点明即可；混合明显时，在该节开头补一句「主要：X；补充：Y」，让读者一眼看清证据构成，而不必为此扩 frontmatter / 组件 schema。

---

# 「LLM 隐私保护」主题术语

> 这一段服务于与「AI 编码误区」**并列的第二主题**（`privacy/` 目录）。立项见 `PROPOSAL-privacy-book.md`，看板见 `BACKLOG-privacy.md`。译名与上面同表一样以本段为准，**新增术语先补表再用**。`PrivacyMeta` 组件与隐私版 `aiwiki-entry-author`、`aiwiki-translator` 都依赖它。

## 专有名词（不翻译，原样保留）

DP-SGD · PATE · FHE · HE · MPC · MCP · TEE · MIA · PII · GDPR · NIST · OWASP · RAG · Opacus · canary · exposure · ε · δ · ρ-zCDP · RDP · PRV · DP-FTRL · Gboard · PCC · AICore

## 隐私术语对照

| 中文 | English | 备注 |
|------|---------|------|
| 差分隐私 | differential privacy (DP) | 以 ε/δ 量化的隐私保证 |
| 隐私预算 | privacy budget (ε, δ) | ε 越小越私密；δ 是失败概率 |
| 邻接关系 | adjacency / neighboring datasets | DP 定义的基准；区分样本级 / 用户级 |
| 隐私会计 | privacy accounting | RDP / zCDP / PRV / DP-FTRL 等组合方法 |
| 梯度裁剪 | gradient clipping | clipping norm |
| 噪声乘子 | noise multiplier | DP-SGD 加噪强度 |
| 用户级隐私 | user-level privacy | 保护「一个用户的全部数据」 |
| 样本级隐私 | sample-level privacy | 保护「单条样本」，比用户级弱 |
| 效用权衡 | utility trade-off | 隐私越强、模型效用通常越降 |
| 联邦学习 | federated learning (FL) | 数据不出本地、只传更新 |
| 安全聚合 | secure aggregation | 服务器只见聚合结果、不见单方更新 |
| 同态加密 | homomorphic encryption (HE) | 密文上直接计算 |
| 全同态加密 | fully homomorphic encryption (FHE) | 任意运算的 HE，开销最大 |
| 安全多方计算 | secure multi-party computation (MPC) | 多方协作算函数、互不泄露输入 |
| 可信执行环境 | trusted execution environment (TEE) | 硬件隔离的运行时飞地 |
| 机密计算 | confidential computing | TEE 在云 / GPU 上的工程形态 |
| 远程证明 | remote attestation | 向远端证明「我跑在可信环境里」 |
| 信任边界 | trust boundary | 谁在边界内可信、边界外不可信 |
| 侧信道 | side channel | 时序 / 功耗 / 缓存等非预期泄露通道 |
| 成员推断攻击 | membership inference attack (MIA) | 判定「某样本是否在训练集」 |
| 模型反演 | model inversion | 从模型反推输入 / 属性 |
| 属性推断 | attribute inference | 推断未给出的敏感属性 |
| 模型抽取 | model extraction / stealing | 通过查询复制模型功能 |
| 训练数据抽取 | training-data extraction | 把记住的训练样本逼出来 |
| 逐字记忆 | verbatim memorization | 模型可原样复现训练片段 |
| 量化记忆 | quantified memorization | 以可测指标刻画记忆程度 |
| 机器遗忘 | machine unlearning | 让模型「忘掉」指定数据 |
| 被遗忘权 | right to be forgotten | GDPR Art.17 的数据主体权利 |
| 输出抑制 | output suppression | 压低输出概率，≠ 真删除 |
| 记忆审计 | memorization auditing | 用 canary / exposure 量化泄露 |
| 探针 | canary | 注入训练集的稀有标记串 |
| 暴露度 | exposure | canary 被模型偏好的程度指标 |
| 困惑度 | perplexity | 模型对序列的预测不确定度，记忆审计常用 |
| 模型反演 | model inversion | 靠置信度重建某类别的代表性输入（类=个人时可辨认） |
| 属性推断 | attribute inference | 由部分特征 + 模型 + 人群先验反推个体未公开属性 |
| 训练数据去重 | training-data deduplication | 训练前删重复 / 近重复样本，降记忆与抽取 |
| 近重复 | near-duplicate | 非完全相同但高度相似的样本 / 子串 |
| 嵌入反演 | embedding inversion | 从文本嵌入向量反演回原文（词级乃至逐字短文本） |
| 隐私定向投毒 | privacy-targeted poisoning | 掺少量投毒样本，放大对其他记录的隐私泄露 |
| 分布推断 | property / distribution inference | 推断训练集的群体 / 统计属性（区别于个体的属性推断） |
| 遗忘验证 | unlearning verification | 证明 / 审计「确已遗忘」；模型级不可验证、可伪造 |
| 推理期侧信道 | inference-time side channel | 由响应时序 / 长度 / 缓存计时旁路泄露内容 |
| 个人可识别信息 | PII (personally identifiable information) | |
| 脱敏 | redaction / de-identification | |
| 命名实体识别 | NER (named entity recognition) | 识别文本中姓名 / 邮箱 / 电话等实体，脱敏的基础 |
| PII 回吐 | PII regurgitation | 模型在生成中复现训练语料里的个人信息 |
| 匿名化 | anonymization | |
| 去匿名化 | de-anonymization | 朴素匿名化可被反推还原 |
| 合成数据 | synthetic data | 以生成数据替代真实数据 |
| 上下文面隐私 | context-surface privacy | 系统提示词 / 会话 / 工具结果 / 检索片段的泄露面 |
| 系统提示词提取 | system prompt extraction | |
| 模型抽取与窃取 | model extraction & stealing | 借查询 API 复刻模型功能 / 解出部分参数 |
| 数据边界 | data boundary | 私有数据允许流到哪里的界线 |
| 数据生命周期 | data lifecycle | 采集→训练→评估→日志→删除→备份 |
| 数据血缘 | data lineage | 数据从哪来、流到哪、被谁复制 |
| 删除传播 | deletion propagation | 删除请求扇出到所有副本（备份 / 日志 / 向量库 / 派生模型 / 第三方）|
| 数据保留 | data retention | 服务方保留输入 / 日志的时长与范围 |
| 零数据保留 | zero data retention | 约定不留存请求数据 |
| 假安全 | false security | 以为安全其实没有（本主题的头号靶子） |
| 残余风险 | residual risk | 防护后仍存在的泄露可能 |
| 威胁模型 | threat model | 防谁、防到什么程度的假设集 |
| 间接提示注入 | indirect prompt injection | 把指令藏进模型会读取的内容里，远程操纵其行为 |
| 数据外泄 | data exfiltration | 私有数据经外联通道（工具 / 渲染 / API）被送出 |
| 跨会话串味 | cross-session bleed | 共享记忆 / 缓存未按用户隔离，A 的数据出现在 B 的会话 |
| 梯度泄露 | gradient leakage / gradient inversion | 从共享梯度反演出训练样本 |
| 安全聚合 | secure aggregation | 用 MPC 让服务器只得更新之和、看不到单个更新 |
| 拆分学习 | split learning | 把模型按层切成客户端 / 服务器两段、只传中间激活；激活可被反演回输入 |
| 联邦分析 | federated analytics | 只在设备本地算统计 / 最频繁项、不集中原始数据；聚合 ≠ 匿名，仍需 DP |
| 最频繁项 | heavy hitters | 联邦 / 本地 DP 下要发现的高频项，须叠 DP 才有界 |
| LLM 水印 | LLM watermarking | 生成时嵌入可检测信号（如 green/red list）；改写 / 翻译可削弱 |
| 数据溯源 | data provenance | 判「内容是否 AI 生成」「我的数据是否被训练」；含版权陷阱 / 成员推断法 |
| 微调即服务 | fine-tuning-as-a-service (FTaaS) | 厂商托管微调 API；微调数据去向 / 保留与对齐侵蚀是其隐私面 |
| Agent 隐私评测 | agent privacy evaluation | 用 AgentDojo 等基准把「Agent 注入后外泄」做成可复现、可打分 |
| 持久记忆 | persistent memory | 产品级跨会话记忆功能（saved memories / 引用聊天历史）；留存与可删边界在产品与后端，非隔离 bug |
| 端侧推理 | on-device inference | 模型在用户设备本地跑、prompt 不出设备的隐私姿态；不覆盖回落云 / 遥测 / 本机被攻陷 |
| 多模态地理定位推断 | VLM geolocation inference | 视觉语言模型从图像画面内容（非 EXIF / GPS）推断拍摄地点；推理期的属性推断 |
| MCP 数据流 | MCP data flow | Model Context Protocol 下 host↔server 的上下文切片传递；最小采集 / 同意 / 凭据集中是其隐私面 |
| 最小采集 | least-collection / data minimization | 只把任务所必需的上下文字段交给 server；对应 GDPR 数据最小化原则 |
| 凭据集中 | credential concentration | 多个 MCP server 的凭据汇聚成单一高价值目标，放大被攻破的爆炸半径 |

## 枚举值映射（隐私 frontmatter 与 `<PrivacyMeta>`）

### era 卷（阅读主线，与 `privacy/` 目录一一对应）

| 目录 | 中文 | English |
|------|------|---------|
| `01-foundations` | 卷一 · 隐私根基 | Volume 1 · Privacy foundations |
| `02-memorization-extraction` | 卷二 · 记忆与抽取 | Volume 2 · Memorization and extraction |
| `03-conversational-llms` | 卷三 · 对话大模型 | Volume 3 · Conversational LLMs |
| `04-rag-agents` | 卷四 · RAG 与 Agent | Volume 4 · RAG and agents |
| `05-frontier-deployment` | 卷五 · 前沿与落地 | Volume 5 · Frontier and deployment |
| `06-governance-compliance` | 卷六 · 治理与合规 | Volume 6 · Governance and compliance |

### technique 技术板块（查询轴，14 选一；边界见 PROPOSAL §6.2）

| 中文 | English |
|------|---------|
| 记忆与训练数据抽取 | Memorization & training-data extraction |
| 推断类攻击 | Inference attacks (MIA / inversion / attribute) |
| 模型抽取与窃取 | Model extraction & stealing |
| 差分隐私 | Differential privacy |
| 联邦学习与安全聚合 | Federated learning & secure aggregation |
| 机器遗忘与被遗忘权 | Machine unlearning & right to be forgotten |
| PII 检测与脱敏 | PII detection, redaction & synthetic data |
| 隐私保护计算 | Privacy-preserving computation (HE / MPC / TEE) |
| RAG 与 Agent 隐私 | RAG & agent privacy |
| 上下文面隐私 | Context-surface privacy |
| 推理服务期隐私 | Inference-service privacy |
| 治理与合规 | Governance & compliance |
| 数据生命周期与数据治理 | Data lifecycle & data governance |
| 隐私评测与审计 | Privacy evaluation & auditing |

### maturity 成熟度（硬约束；`生产` 须过硬闸门 C）

| 中文 | English | 含义 |
|------|---------|------|
| 研究 | Research | 论文 / 原型，尚无生产验证 |
| 试验 | Experimental | 有限试点 / 预览，未普遍可用 |
| 生产 | Production | 真实部署 / 厂商文档 / 标准推荐且有工程实践 |

### audience 受众（隐私 frontmatter 的 `audience`，对应第一主题的 roles）

| 中文 | English |
|------|---------|
| 隐私工程师 | Privacy Engineer |
| ML 工程师 | ML Engineer |
| 安全工程师 | Security Engineer |
| 合规工程师 | Compliance Engineer |

### severity 隐私风险（沿用高 / 中 / 低，显示作「隐私风险」）

| 中文 | English |
|------|---------|
| 高 | High |
| 中 | Medium |
| 低 | Low |
