# 贡献指南

感谢你愿意一起写这本书。下面是新增或修改一条「误区条目」的完整流程。

## 一条好条目的标准

1. **有可核查的出处。** 没有可靠来源支撑的「经验之谈」不要写——至少要有一条可验证的链接。
2. **从机制讲根因。** 本书的核心价值是把「现象」追到「模型为什么会这样」，而不是停在「你应该……」。
3. **像真人写，不像 AI 写。** 严格遵守 [STYLE-GUIDE.md](./STYLE-GUIDE.md)：无错别字、无语义模糊、不堆排比套话。
4. **标清适用角色与版本。** 角色帮读者按身份检索，版本说明随模型迭代更新。

## 新增一条条目

1. 确定它属于哪个生命周期阶段，进入对应目录（如 `docs/05-implementation/`）。
2. 复制模板 [`docs/_templates/entry-template.md`](./docs/_templates/entry-template.md)，重命名为 `your-slug.mdx`（用 `.mdx` 扩展名，因为条目会导入 `<PitfallMeta>` 组件）。
3. 填写 frontmatter 元数据：

   | 字段 | 说明 |
   |------|------|
   | `title` | 一句话点出误区，**不要用问句** |
   | `slug` | 全站唯一的英文短横线标识 |
   | `roles` | 适用角色，可多选：项目经理 / 架构师 / 工程师 / 测试工程师 / 运维工程师 |
   | `phase` | 所属阶段，与所在目录一致 |
   | `severity` | 严重度：高 / 中 / 低 |
   | `applies_to` | 适用或已修复的版本说明 |
   | `tags` | 检索标签 |
   | `sources` | 出处列表，**至少一条** |
   | `sidebar_position` | 在该阶段内的排序 |

4. 按统一七段结构写正文：**现象 → 为什么会这样 → 后果 → 最佳实践 → 示例 → 版本说明 → 延伸阅读与出处**。
5. 顶部放元数据徽章：

   ```mdx
   import PitfallMeta from '@site/src/components/PitfallMeta';

   <PitfallMeta roles={['工程师']} phase="编码实现" severity="中" appliesTo="Claude Code 全版本" />
   ```

## 配图

- **优先用 Mermaid**（站点已开启），自绘流程图 / 对照图，零版权风险。
- 确需外部图片时，仅用自制或授权清晰（如 CC）的素材，并在出处中注明。

## 双语

- **中文是创作源**，先写好中文。
- 英文译文放在 `i18n/en/docusaurus-plugin-content-docs/current/` 下，目录结构与 `docs/` 镜像。
- 暂未翻译的条目，英文站点会自动回退显示中文，不影响构建。
- **给某个阶段目录（分类）添加第一条条目时**，记得去 `i18n/en/docusaurus-plugin-content-docs/current.json` 补上该分类的英文 `label` 与 generated-index 的 `title` / `description`。分类名不随条目翻译走——漏了的话，英文站的侧边栏、面包屑、分类首页会显示中文（曾踩过这个坑）。
- **改动 `docs/**/_category_.json` 的 `label`（包括加 / 换 emoji）后必做**：翻译键由 label 文本推导，改字即换键、旧译失配。先 `npm run write-translations -- --locale en` 生成新键，把英文文案搬到新键、删掉旧键，再 `npm run check:i18n` 确认通过（CI 同样会卡）。不要只改 `current.json` 里的 `message` 值而不动键名——那正是上次回退成中文的原因。

## 本地验证

提交前请确认：

```bash
npm run start                  # 预览中文，检查徽章、Mermaid、排版
npm run start -- --locale en   # 预览英文
npm run build                  # 全量构建必须无报错（onBrokenLinks 设为 throw）
```

并人工通读：无错别字、语义清晰、语气自然、所有出处链接可访问。

## 提交

- 提交信息写清楚改了什么、为什么。
- 一个 PR 聚焦一件事（一条新条目 / 一次修订 / 一处翻译），便于评审。
