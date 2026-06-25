# 术语表 / Glossary

全站译名以本表为准。`aiwiki-translator` 与 `aiwiki-entry-author` 都依赖它来保持一致。
**新增术语先补表，再用。** 术语表机制借鉴自 [senshinji/claude-translation-skill](https://github.com/senshinji/claude-translation-skill)（MIT，见 `CREDITS.md`）。

## 专有名词（不翻译，原样保留）

Claude Code · CLAUDE.md · Anthropic · Claude · Opus · Sonnet · Haiku · Docusaurus · MDX · Mermaid · Git · GitHub · slug · frontmatter · WebSearch · WebFetch · ADR · slopsquatting

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

| 中文 | English |
|------|---------|
| Claude Code 全版本 | All Claude Code versions |
