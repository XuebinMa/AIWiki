# CLAUDE.md — AiWiki 项目记忆

> 给每个新会话的定向文件。**保持精简、只做指针** —— 细节都在下面列出的源文件里，
> 不要把它们抄到这里。（「CLAUDE.md 过载」本身就是本书的一条误区，别在自己项目里犯。）

## 这是什么

AiWiki：一本**从 AI 第一人称视角写的「AI 使用误区与最佳实践」百科**。
首期聚焦 Claude Code + 软件工程全流程。**中文为创作源，英文为译文。**

## 每次动手前必读（按顺序）

1. `STYLE-GUIDE.md` —— 声音/语气（八条「反 AI 腔」规则）、七段结构、准确性硬要求。**命门。**
2. `terminology.md` —— 全站统一术语，以及 roles / phase / severity 的中英枚举映射。
3. `CONTRIBUTING.md` —— 完整贡献流程与「一条好条目的标准」。
4. `CREDITS.md` —— 借鉴来源与版权说明。

## 写作 / 翻译用 skill（不要手搓流程）

- 写 / 改一条条目：`aiwiki-entry-author`
- 出对应英文版：`aiwiki-translator`

## 保持连贯的硬规则（防止跨会话的风格 / 内容漂移）

- **动手写新条目前，先 `ls docs/**/*.mdx` 并抽读 1–2 条已有条目**，对齐语气、密度与术语，
  避免重复选题或风格断层。**已写过什么，以 `docs/` 的实际内容为准**——本文件不维护逐条清单（会过期）。
- 术语一律以 `terminology.md` 为准；遇到表里没有的新术语，先补表再用。
- 第一人称「我（AI）对你（使用者）」叙述；结论先行；每个论点都要有理由或 before/after 示例。
- 内容必须有可核查出处；拿不准就不写。

## 质量闸门（提交前必须全过；CI 会再卡一道）

- `autocorrect --lint .` —— 中英混排空格 / 标点（已在 `.autocorrectrc` 关掉 `fullwidth` 以保护 frontmatter 逗号）
- `vale docs i18n` —— 套话 / AI 腔，**error 级硬性闸门**，命中即失败
- `cspell "docs/**/*.{md,mdx}" "i18n/**/*.{md,mdx}"` —— 拼写（已忽略 CJK）
- `npm run check:i18n` —— 侧边栏分类翻译完整性，防英文站回退成中文（见下「侧边栏分类 i18n 铁律」）
- `npm run check:mirror` —— 中英镜像完整性，每条 `docs/` 都要有 `i18n/en` 对应译文（防孤儿/漏译）
- `npm run build` —— 两 locale 构建，连带校验 MDX / `<PitfallMeta>` import / 死内链（`onBrokenLinks: throw`）；**PR CI 也会跑**
- CI：`.github/workflows/lint.yml`（散文质量 + i18n + 镜像 + 构建）+ `deploy.yml`（构建并部署）

## 目录与双语约定

- 生命周期 8 阶段：`docs/00-setup-collaboration` … `docs/07-acceptance-release`
- 中文源放 `docs/`；英文译文镜像到 `i18n/en/docusaurus-plugin-content-docs/current/<相同子路径>`
- 条目用 `.mdx`（需导入 `<PitfallMeta>`）；从 `docs/_templates/entry-template.md` 复制起步
- **侧边栏分类 i18n 铁律**：Docusaurus 对自动生成侧边栏的分类，翻译键由 `_category_.json` 的 `label` 文本推导（`sidebar.wikiSidebar.category.<label>`）。**一旦改动任一 `docs/**/_category_.json` 的 `label`（哪怕只是加 / 换 emoji），翻译键的来源就变了**，旧键失配、英文站会静默回退成中文。改完 label 必须立刻 `npm run write-translations -- --locale en`，把英文文案补到新键、删掉失配旧键，再 `npm run check:i18n` 验证（CI 也会卡）。曾因加 emoji 踩过这个坑。
- **扩展到其他模型（ChatGPT/Gemini…）时**：用 Docusaurus docs 多实例 + 导航栏产品下拉，每个模型一套独立 docs / 版本线；阶段与角色保持与模型无关，便于平移。当前只有 Claude Code 一个默认实例。

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

首批 5 条样板条目（编码实现 ×3、测试 ×1、需求分析 ×1），其余阶段待铺量。
