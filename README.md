# AIWiki

> AI 最理解 AI。这是一本**从 AI 视角写的「AI 使用误区与最佳实践」百科**——告诉你人们在使用 AI 时反复踩的坑，以及怎么绕开它们。
>
> _An encyclopedia of AI usage pitfalls and best practices, written from the AI's own perspective._

**首期聚焦：用 [Claude Code](https://code.claude.com/docs) 做软件工程**，覆盖从灵感、调研、需求、设计、编码、测试到发布的完整流程。

🌐 中文 / English 双语 · 📚 按软件工程生命周期组织 · 🏷️ 按角色与版本检索

---

## 这本书为什么不一样

市面上已有大量 Claude Code 的「最佳实践清单」「配置合集」和「教程翻译」。本项目的差异化在于一个尚无人占住的组合：

- **AI 第一人称叙述** —— 不是第三人称教程，而是「我作为模型，看到你常这样做」。
- **从机制讲根因** —— 把表面现象追到模型的工作方式，让最佳实践成为能自己推导的常识。
- **按软件工程角色检索** —— 每条误区标注适用角色（项目经理 / 架构师 / 工程师 / 测试 / 运维）。
- **按 AI 版本区分** —— 版本是内容的一等公民；旧版本的坑可能在新版本已被填上。

## 内容结构

以软件工程生命周期为主线：

| 阶段 | 目录 |
|------|------|
| 准备与协作 | `docs/00-setup-collaboration/` |
| 灵感与可行性 | `docs/01-ideation-feasibility/` |
| 需求分析 | `docs/02-requirements/` |
| 概要设计 | `docs/03-architecture/` |
| 详细设计 | `docs/04-detailed-design/` |
| 编码实现 | `docs/05-implementation/` |
| 测试 | `docs/06-testing/` |
| 验收与发布 | `docs/07-acceptance-release/` |

每一条误区都用统一结构呈现：现象 → 为什么会这样 → 后果 → 最佳实践 → 示例 → 版本说明 → 出处。

## 本地运行

基于 [Docusaurus](https://docusaurus.io/)（原生支持版本化、双语 i18n、全文搜索）。

```bash
npm install
npm run start                 # 中文站点
npm run start -- --locale en  # 英文站点
npm run build                 # 全量构建（两个语言）
```

## 参与贡献

这是一个开放的、长期演进的项目。欢迎补充新的误区条目、修正错误、完善翻译。

- 📖 [贡献指南 CONTRIBUTING.md](./CONTRIBUTING.md) —— 条目模板与提交流程
- ✍️ [写作规范 STYLE-GUIDE.md](./STYLE-GUIDE.md) —— 如何写得像真人、可靠、有出处

## 路线图

- [x] 站点骨架（Docusaurus + 双语 + Mermaid）
- [x] 内容模型、条目模板、写作规范
- [x] 首批样板条目（编码 / 测试 / 需求阶段）
- [ ] 铺量其余生命周期阶段
- [ ] 接入 Algolia DocSearch 全文搜索
- [ ] 按需启用 Docusaurus 原生版本快照
- [ ] 扩展到其他模型（ChatGPT / 通义千问 / Gemini）与其他领域（写作 / 视频 / 商业 / 数据分析）

## 许可与版权

内容以 **CC BY-SA 4.0** 共享，引用来源已在各条目末尾标注。配图优先自绘（Mermaid），外部素材仅采用授权清晰者并注明出处。如发现任何引用不当，请提 [Issue](https://github.com/xuebinma/AIWiki/issues)。
