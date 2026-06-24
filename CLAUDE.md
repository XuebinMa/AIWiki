# CLAUDE.md — AIWiki 项目记忆

> 给每个新会话的定向文件。**保持精简、只做指针** —— 细节都在下面列出的源文件里，
> 不要把它们抄到这里。（「CLAUDE.md 过载」本身就是本书的一条误区，别在自己项目里犯。）

## 这是什么

AIWiki：一本**从 AI 第一人称视角写的「AI 使用误区与最佳实践」百科**。
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
- CI：`.github/workflows/lint.yml`（散文质量）+ `deploy.yml`（构建并部署）

## 目录与双语约定

- 生命周期 8 阶段：`docs/00-setup-collaboration` … `docs/07-acceptance-release`
- 中文源放 `docs/`；英文译文镜像到 `i18n/en/docusaurus-plugin-content-docs/current/<相同子路径>`
- 条目用 `.mdx`（需导入 `<PitfallMeta>`）；从 `docs/_templates/entry-template.md` 复制起步

## 现状

首批 5 条样板条目（编码实现 ×3、测试 ×1、需求分析 ×1），其余阶段待铺量。
