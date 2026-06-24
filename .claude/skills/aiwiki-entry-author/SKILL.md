---
name: aiwiki-entry-author
description: 为 AIWiki 撰写或修订一条「误区」条目（docs/ 下的 .mdx）。当需要新增/改写误区条目、并保证第一人称 AI 声音、七段结构、frontmatter 规范与可核查出处时使用。
---

# AIWiki 条目作者

把一个「使用 AI 时常见的误区」写成符合全站规范的百科条目。原则：**质量第一、轻量第二**——不开子代理，单遍写作，交给 linter 兜底。

## 动手前先读这几份源文件（不要在本 skill 里重复它们的内容）

- `STYLE-GUIDE.md` —— 声音与语气（八条「反 AI 腔」规则、七段结构、准确性硬要求）。**这是命门，每次都要对照。**
- `docs/_templates/entry-template.md` —— frontmatter 字段 + 七段骨架。
- `CONTRIBUTING.md` —— 完整贡献流程与「一条好条目的标准」。
- `docs/05-implementation/kitchen-sink-session.mdx` —— 一个达标样例，照着它的密度和语气写。
- `terminology.md` —— 术语与枚举值（roles/phase/severity）的统一译名。

## 步骤

1. **定位阶段**：判断该误区属于哪个生命周期阶段，进入对应的 `docs/0X-*/` 目录。
2. **建文件**：复制 `docs/_templates/entry-template.md` 到该目录，命名为 `<slug>.mdx`，删掉模板里的 `#` 注释。
3. **填 frontmatter**：title/slug/roles/phase/severity/applies_to/tags/sources/sidebar_position。`sources` 至少一条可核查链接——**没有可靠出处的论断不写**。
4. **写正文七段**（顺序不可变）：现象 → 为什么会这样 → 后果 → 最佳实践 → 示例 → 版本说明（`:::note`）→ 延伸阅读与出处。正文前加一句 `> 一句话摘要：…`。
5. **插入徽章**：顶部 `<PitfallMeta roles={[...]} phase=… severity=… appliesTo=… />`，props 必须与 frontmatter 完全一致。
6. **配图**：关系复杂处用 Mermaid 自绘（零版权风险），能一张图说清就别堆三段文字。
7. **自查**：对照 `STYLE-GUIDE.md` 的「AI 腔」清单逐句过；确认零错别字、术语与 `terminology.md` 一致。
8. **出英文版**：调用 `aiwiki-translator` skill，生成 `i18n/en/docusaurus-plugin-content-docs/current/<相同子路径>/<slug>.mdx`。
9. **跑 linter**：`.github/workflows/lint.yml` 里用到的工具（autocorrect / Vale / cspell），本地可先跑一遍再提交。

## 红线（写之前默念一遍）

- **第一人称**：「我（AI）」对「你（使用者）」讲，像同事复盘，不退回第三人称教程腔。
- **结论先行**：先说「别这么做」，再讲为什么，不要层层铺垫。
- **每个论点要有理由或 before/after 示例**，杜绝「测试很重要」这类正确的废话。
- **不编造**：拿不准就不写，绝不「听起来很对」地糊过去。
