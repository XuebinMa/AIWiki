# CLAUDE.md — AiWiki 项目记忆

> 给每个新会话的定向文件。**保持精简、只做指针** —— 细节都在下面列出的源文件里，
> 不要把它们抄到这里。（「CLAUDE.md 过载」本身就是本书的一条误区，别在自己项目里犯。）

## 这是什么

AiWiki：一本**从 AI 第一人称视角写的百科**，内含若干**并列的主题**。**中文为创作源，英文为译文。**

- **主题一「AI 编码误区」（`docs/`）**：聚焦**用 AI 编码工具（agentic coding）做软件工程**的通用误区；当前以 Claude Code 覆盖最深，正逐步接入同类工具（Cursor / GitHub Copilot / Codex CLI / Gemini CLI…）。
- **主题二「LLM 隐私保护」（`privacy/`）**：面向工程师的 LLM 隐私攻防手册（机制 + 配方 + 案例，按 LLM 发展史分卷）。**目前在 M1 脚手架阶段**——立项 / 决策见 `PROPOSAL-privacy-book.md`，看板见 `BACKLOG-privacy.md`，专属规范见 `STYLE-GUIDE.md`「LLM 隐私保护主题专属规范」。**写隐私内容前必读这三处**；准确门槛更高（三道硬闸门 + 第一人称红线）。
- 站点用 Docusaurus **多实例 docs** 承载两主题并列：`docs/` 走 preset（routeBasePath `/`），`privacy/` 走第二实例（routeBasePath `privacy`，`sidebars-privacy.js`）。

## 每次动手前必读（按顺序）

1. `STYLE-GUIDE.md` —— 声音/语气（八条「反 AI 腔」规则）、七段结构、准确性硬要求。**命门。**
2. `terminology.md` —— 全站统一术语，以及 roles / phase / severity / evidence 的中英枚举映射。
3. `CONTRIBUTING.md` —— 完整贡献流程与「一条好条目的标准」。
4. `CREDITS.md` —— 借鉴来源与版权说明。

## 写作 / 翻译用 skill（不要手搓流程）

- 写 / 改一条条目：`aiwiki-entry-author`
- 出对应英文版：`aiwiki-translator`
- 定期研究扩充新选题（去重 + 质量把关 + 走流水线）：`aiwiki-research-refresh`（适合月度定时触发器或手动跑）

## 保持连贯的硬规则（防止跨会话的风格 / 内容漂移）

- **动手写新条目前，先 `ls docs/**/*.mdx` 并抽读 1–2 条已有条目**，对齐语气、密度与术语，
  避免重复选题或风格断层。**已写过什么，以 `docs/` 的实际内容为准**——本文件不维护逐条清单（会过期）。
- 术语一律以 `terminology.md` 为准；遇到表里没有的新术语，先补表再用。
- 第一人称「我（AI）对你（使用者）」叙述；结论先行；每个论点都要有理由或 before/after 示例。
- 内容必须有可核查出处；拿不准就不写。
- **评审 / 研究结论分诊后立刻落库**：外部评审或 `aiwiki-research-refresh` 得出的「认同但本轮不做」项，写进 `BACKLOG.md`「结构 / 流程待办」区，别只留在对话——会话压缩会丢。

## 质量闸门（提交前必须全过；CI 会再卡一道）

- `autocorrect --lint .` —— 中英混排空格 / 标点（已在 `.autocorrectrc` 关掉 `fullwidth` 以保护 frontmatter 逗号）
- `vale docs i18n privacy` —— 套话 / AI 腔，**error 级硬性闸门**，命中即失败（两主题都要扫）
- `cspell "docs/**/*.{md,mdx}" "privacy/**/*.{md,mdx}" "i18n/**/*.{md,mdx}"` —— 拼写（已忽略 CJK）
- `npm run check:i18n` —— **两实例**侧边栏分类翻译完整性，防英文站回退成中文（见下「侧边栏分类 i18n 铁律」）
- `npm run check:mirror` —— **两实例**中英镜像完整性，每条 `docs/`、`privacy/` 都要有 `i18n/en` 对应译文（防孤儿/漏译）
- `npm run build` —— 两 locale **两实例**构建，连带校验 MDX / `<PitfallMeta>`·`<PrivacyMeta>` import / 死内链（`onBrokenLinks: throw`）；**PR CI 也会跑**
- 提交前对照 `DOGFOODING.md` 自查（吃自己的狗粮：写本书时别犯本书记录的误区；含隐私三道硬闸门清单）
- CI：`.github/workflows/lint.yml`（散文质量 + i18n + 镜像 + 构建）+ `deploy.yml`（构建并部署）

## 目录与双语约定

- 生命周期 8 阶段：`docs/00-setup-collaboration` … `docs/07-acceptance-release`
- 中文源放 `docs/`；英文译文镜像到 `i18n/en/docusaurus-plugin-content-docs/current/<相同子路径>`
- 条目用 `.mdx`（需导入 `<PitfallMeta>`）；从 `docs/_templates/entry-template.md` 复制起步
- **侧边栏分类 i18n 铁律**：Docusaurus 对自动生成侧边栏的分类，翻译键由 `_category_.json` 的 `label` 文本推导（`sidebar.wikiSidebar.category.<label>`）。**一旦改动任一 `docs/**/_category_.json` 的 `label`（哪怕只是加 / 换 emoji），翻译键的来源就变了**，旧键失配、英文站会静默回退成中文。改完 label 必须立刻 `npm run write-translations -- --locale en`，把英文文案补到新键、删掉失配旧键，再 `npm run check:i18n` 验证（CI 也会卡）。曾因加 emoji 踩过这个坑。
- **扩展到其他模型 / 工具（ChatGPT/Codex/Gemini…）：反模式为主、工具差异为辅，别按模型各写一套**。绝大多数误区是范式级的（LLM + 工具调用 + 长上下文 + 自动执行共有），按模型分写会 70–85% 重复。结构是「**反模式主条目 + 条目内『工具差异（可选）』小节 + 一张工具矩阵索引页**」。**根因判据**：根因相同、只是配置不同 → 放「工具差异」小节，别拆；根因来自某工具独有机制（如 Claude Code hooks 覆盖面、Gemini 并行 subagent 编辑冲突）→ 才单独成条、挂工具专题页。工具差异小节与矩阵**很快过时**，务必短、打版本戳，矩阵只写机制名不写具体命令。**轴按工具/agent（harness 机制层）而非模型**——同一模型在不同工具下行为不同，值得标注的差异几乎都来自 harness 机制（hooks、并行 subagent 编辑、权限模型…）。**当前正接入第 2 个工具（Gemini CLI 试点）**：`docs/tool-matrix` 矩阵页与各条「工具差异」小节随之建立；工具枚举见 `terminology.md`「tool 工具 / agent」，每条用工具名作 tag（沿用 roles 的 tag 聚合）。（曾把「多实例、每模型一套独立 docs」写进规划——对误区品类是错的，会大量重复，已改为本条。）

## 合并与部署（用户授权）

- **纯修复 / 样式 / 文案订正类 PR**：本地三道闸门 + `npm run build` 通过后，可直接标记 ready、合并到 `main` 并部署，**无需逐次征求确认**。
- **新增条目、架构或流程层面的改动**：仍需先和用户确认再合并。
- 合并到 `main` 会自动触发 `deploy.yml` 发布到 GitHub Pages（约 2 分钟）。
- **复用分支铁律（防 squash 冲突）**：本仓库用 **squash 合并**——PR 合并后 `main` 上是一个**全新 SHA**，与你分支里的原始提交血缘不同；**且分支保护禁止 force-push**，远程工作分支停在旧 tip、改不动。两者叠加：在同一条复用分支上继续提交，会让「已被 squash 进 main 的原始改动」与 main 上的 squash 提交被 git 当成两份重叠新增 → 下个 PR 冲突，而你又没法用强推抹平。可行的处理：
  - **首选**——合并后、开新活前，`git fetch origin main` 再 **把 main 合并进分支**（`git merge origin/main`，普通合并提交、可正常 push）。**别指望 `git reset --hard origin/main` 后强推**——非快进会被拒、force 被禁。
  - **若已基于旧 tip 写了东西、push 报「非快进」**：`git merge origin/<本分支的远程 tip>` 让本地成为远程后代，再快进 push（树内容一致时通常自动合并）。
  - **最省心的根治**：合并后让 GitHub 自动删除 head 分支，下一波从最新 main 重新建同名分支。
  （已两次踩坑：PR #9 与本波都靠「合并进分支」的非 force 路径补救。）

## 现状

已铺 77 条误区，中英镜像齐（00 准备 ×17、01 灵感 ×6、02 需求 ×6、03 概要 ×7、04 详设 ×6、05 编码 ×15、06 测试 ×10、07 验收 ×10；06 含 AI 代码审查子簇 4 条，00/07 含 AI 治理 + 基础设施安全子簇 6 条，00 另有 1 条跨工具配置提权 CVE-2026-35603 类）+ 案例库 5 例 + 模板与清单 12 件（`toolkit`：5 基础 + 4 工作流 + 3 治理模板）+ 四条浏览/导读轴索引页：工具矩阵（`/tool-matrix`）、机制索引（`/mechanisms`，7 个根因桶覆盖全 77 条）、安全索引（`/threat-model`，按威胁维度聚合安全/治理条目与案例，顶部含「最小安全基线」8 条速用清单）、必读 20 条（`/core-20`）+ AI 代码审查专题页（`/code-review`，聚合审查子簇 4 条 + 分工工件）。**首个第二工具 Gemini CLI 试点已落地**：8 条主条目带「工具差异」小节、1 条 Gemini 独有条目（folder-trust 继承）、1 例 Tracebit RCE 案例。每条带证据类型标签（`terminology.md`「evidence」），可按阶段（侧边栏）、角色（`/roles`）、工具（`/tool-matrix`、`/tags/gemini-cli`）或机制（`/mechanisms`）浏览。具体写过什么以 `docs/` 实际内容为准。
