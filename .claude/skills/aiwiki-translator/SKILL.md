---
name: aiwiki-translator
description: 把一条 AIWiki 中文误区条目（docs/ 下的 .mdx）翻译成英文镜像，输出到 i18n/en/ 对应路径。当需要为新增或修订的中文条目生成/更新英文版时使用。
---

# AIWiki 译者（中 → 英，轻量）

单遍把一条条目翻成英文：保术语一致、保结构、读起来像母语、绝不编造。原则：**质量第一、轻量第二**——不开 Agent Teams、不产出 docx/pdf，纯 MDX 进、MDX 出。

> 本 skill 的术语表与「防编造 / 保结构」纪律借鉴自 [senshinji/claude-translation-skill](https://github.com/senshinji/claude-translation-skill)（MIT，见 `CREDITS.md`），但刻意做成单遍轻量版，契合短条目场景。

## 输入 / 输出

- 输入：`docs/<阶段目录>/<slug>.mdx`
- 输出：`i18n/en/docusaurus-plugin-content-docs/current/<相同阶段目录>/<slug>.mdx`（与中文版路径镜像对齐）

## 规则

1. **术语统一**：所有术语、以及 frontmatter 与 `<PitfallMeta>` 里的枚举值（roles / phase / severity），一律以 `terminology.md` 为准。表里没有的新术语，先补进 `terminology.md` 再用。
2. **保结构原样**：
   - frontmatter：key 不动；`title`/`tags`/`applies_to` 译；`roles`/`phase`/`severity` 用 `terminology.md` 的英文枚举；`slug`、`sidebar_position` 不变；`sources` 的 url 不变，title 可译。
   - 保留 `import … PitfallMeta`、`<PitfallMeta .../>`（props 改成英文枚举值）、所有 ```mermaid``` 代码块（节点内文字可译，结构与箭头不动）、`:::note` admonition。
3. **像母语，不逐字**：用英文母语者的说法把同一件事讲清楚（见 `STYLE-GUIDE.md`「中英一致性」），但事实、数字、出处、结论必须与中文完全一致。
4. **防编造自查**（翻完逐项打勾）：
   - [ ] 没有中文里不存在的新论断或新例子
   - [ ] 段落与中文一一对应，无漏译、无擅自合并
   - [ ] 所有 `sources` 链接与中文版一致
   - [ ] 元数据（角色 / 阶段 / 严重度 / 适用版本）与中文版语义相同
5. **分类标签**：若该条目是其所在阶段目录在英文站的**第一条**（此前该目录没有条目），还要在 `i18n/en/docusaurus-plugin-content-docs/current.json` 补上该分类的英文 `label` 与 generated-index 的 `title` / `description`——否则英文站的侧边栏 / 面包屑 / 分类首页会回退显示中文。
6. 翻完跑英文向 linter（Vale / cspell）。
