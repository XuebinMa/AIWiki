# 致谢与来源 / Credits

本项目站在很多人的肩膀上。这里记录被复用或借鉴的开源项目与资料，避免版权纠纷。
每条**误区条目内部**的事实来源，单独列在该条目的「延伸阅读与出处」一节。

## 借鉴的开源项目

- **[senshinji/claude-translation-skill](https://github.com/senshinji/claude-translation-skill)**（MIT）
  我们的 `aiwiki-translator` skill 与 `terminology.md` 借鉴了它的**术语表（glossary）机制**和**「防编造 / 保结构」纪律**。我们没有直接复用其代码——它是面向整篇正式文档、产出排版好的 .docx/.pdf 的重型多 agent 流水线；我们刻意重写成单遍、轻量、纯 MDX 的版本，以契合短条目场景。

## 工具链（均为开源，作为质量闸门）

- [Vale](https://vale.sh/) —— 散文风格 linter（套话 / AI 腔检查）
- [autocorrect](https://github.com/huacnlee/autocorrect) —— 中英文混排空格与标点规范
- [cspell](https://cspell.org/) —— 拼写检查
- [Docusaurus](https://docusaurus.io/) —— 站点框架

> 备注：[zhlint](https://github.com/zhlint-project/zhlint) 评估过但暂未启用——其默认规则会与我们刻意采用的「」引号和全角标点风格冲突（在干净内容上误报数百处）。中英混排规范由 autocorrect 覆盖，待 zhlint 规则调稳后再考虑接入。

## 调研参考

首批条目的事实素材来自各条目自列的出处，主要包括 [Anthropic 官方 Claude Code 文档](https://code.claude.com/docs/en/best-practices) 及社区最佳实践仓库。具体链接见每条条目末尾。
