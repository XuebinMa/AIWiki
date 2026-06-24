# 术语表 / Glossary

全站译名以本表为准。`aiwiki-translator` 与 `aiwiki-entry-author` 都依赖它来保持一致。
**新增术语先补表，再用。** 术语表机制借鉴自 [senshinji/claude-translation-skill](https://github.com/senshinji/claude-translation-skill)（MIT，见 `CREDITS.md`）。

## 专有名词（不翻译，原样保留）

Claude Code · CLAUDE.md · Anthropic · Claude · Opus · Sonnet · Haiku · Docusaurus · MDX · Mermaid · Git · GitHub · slug · frontmatter

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
