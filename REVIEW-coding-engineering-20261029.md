# Coding engineering review — 2026-10-29

范围：仅 manifest 分配的 38 对中英文章。逐篇阅读正文并打开下列一手依据；这是文档及来源核验，没有执行文章中的命令或证明产品在所有环境中的行为。基线：0799967。

38 对中英文已完成正文修订与来源核验；无待核条目。review_after 是复评期限，各条另有按机制定制的事件触发条件。

## 逐篇记录

### dependency-bloat

- 中文：[docs/03-architecture/dependency-bloat.mdx](docs/03-architecture/dependency-bloat.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/03-architecture/dependency-bloat.mdx](i18n/en/docusaurus-plugin-content-docs/current/03-architecture/dependency-bloat.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://arxiv.org/abs/2512.22387](https://arxiv.org/abs/2512.22387)；[https://momentjs.com/docs/#/-project-status/](https://momentjs.com/docs/#/-project-status/)
- 核验结论：Moment 是 maintenance 非停止开发，包大小依打包方式不得裸写几百 KB；13.5 倍为三代理 100 提示 300 项目 PythonJSJava 依赖框架，不等于内存或普遍风险；高频训练模式与内部成本权重不可当可知因果；GPL 传染表述应降为按分发方式审查
- 改动 / 保留理由：修复产品状态、数字范围和全模型默认归因；改 evidence 研究支持，加入 Moment 一手源
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### duplicate-logic-hallucinated-imports

- 中文：[docs/03-architecture/duplicate-logic-hallucinated-imports.mdx](docs/03-architecture/duplicate-logic-hallucinated-imports.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/03-architecture/duplicate-logic-hallucinated-imports.mdx](i18n/en/docusaurus-plugin-content-docs/current/03-architecture/duplicate-logic-hallucinated-imports.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://arxiv.org/abs/2406.10279](https://arxiv.org/abs/2406.10279)；[https://arxiv.org/abs/2406.01359](https://arxiv.org/abs/2406.01359)；[https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks](https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks)
- 核验结论：上下文窗口并非重复与幻觉 import 的唯一原因，检索覆盖亦重要；19.7%/43% 不能泛化当前模型；移除无条件比例；包名存在不足防恶意抢注，应核对发布者仓库版本锁定；全模型固有断言降为风险
- 改动 / 保留理由：收窄来源并加强包身份核验
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### over-engineering-no-pushback

- 中文：[docs/03-architecture/over-engineering-no-pushback.mdx](docs/03-architecture/over-engineering-no-pushback.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/03-architecture/over-engineering-no-pushback.mdx](i18n/en/docusaurus-plugin-content-docs/current/03-architecture/over-engineering-no-pushback.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models](https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models)
- 核验结论：2023 谄媚实验不证明架构堆栈奖励机制；GitClear 二手时间序列不支持 AI 架构因果，删除数值因果段；无评分机制/我几乎不会反对/全模型默认过强
- 改动 / 保留理由：观察性失败模式与工程推断分开；不外推模型训练内省
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### premature-abstraction

- 中文：[docs/03-architecture/premature-abstraction.mdx](docs/03-architecture/premature-abstraction.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/03-architecture/premature-abstraction.mdx](i18n/en/docusaurus-plugin-content-docs/current/03-architecture/premature-abstraction.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)；[https://martinfowler.com/bliki/Yagni.html](https://martinfowler.com/bliki/Yagni.html)
- 核验结论：RuleOfThree 是启发式不是第三次硬阈值；训练语料没学到/想讨好奖励非可核事实；具体 1043 等数字若无一手记录需标作者情境不当研究证据
- 改动 / 保留理由：保留抽象演化原则，去硬阈值与训练断言
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### schema-design-sloppy

- 中文：[docs/03-architecture/schema-design-sloppy.mdx](docs/03-architecture/schema-design-sloppy.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/03-architecture/schema-design-sloppy.mdx](i18n/en/docusaurus-plugin-content-docs/current/03-architecture/schema-design-sloppy.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://martinfowler.com/articles/evodb.html](https://martinfowler.com/articles/evodb.html)；[https://martinfowler.com/bliki/ParallelChange.html](https://martinfowler.com/bliki/ParallelChange.html)
- 核验结论：代码无状态/重构近乎免费不成立；迁移需至少三次发布是过度规定；金额 decimal12,2 不适用于所有币种，需按货币最小单位和精度；可回滚迁移需条件，数据丢失无法保证逆转
- 改动 / 保留理由：修复迁移与金额边界，保留版本化迁移主旨
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### single-option-no-tradeoffs

- 中文：[docs/03-architecture/single-option-no-tradeoffs.mdx](docs/03-architecture/single-option-no-tradeoffs.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/03-architecture/single-option-no-tradeoffs.mdx](i18n/en/docusaurus-plugin-content-docs/current/03-architecture/single-option-no-tradeoffs.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)；[https://adr.github.io/](https://adr.github.io/)
- 核验结论：我心里掠过候选/不被奖励等虚假内省；WYSIATI 人类研究不可作模型训练因果；消息中间件表是情境示例，DB 撑不住无延迟指标不能断言
- 改动 / 保留理由：用输出未披露备选替代内心叙述；条件化示例选择
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### concurrency-races

- 中文：[docs/04-detailed-design/concurrency-races.mdx](docs/04-detailed-design/concurrency-races.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/concurrency-races.mdx](i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/concurrency-races.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://arxiv.org/html/2501.14326v1](https://arxiv.org/html/2501.14326v1)；[https://www.postgresql.org/docs/current/transaction-iso.html](https://www.postgresql.org/docs/current/transaction-iso.html)
- 核验结论：竞态不等于每次并发都错、不可复现；默认 1/所有训练示例不加锁非一手实证；单线程事件循环和普通事务均不自动消除逻辑竞态；原子自增不处理业务重复请求、冲突重试需预算幂等
- 改动 / 保留理由：修正并发触发条件及事务/事件循环例外；收窄 2025 受测模型范围
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### fs-event-ordering

- 中文：[docs/04-detailed-design/fs-event-ordering.mdx](docs/04-detailed-design/fs-event-ordering.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/fs-event-ordering.mdx](i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/fs-event-ordering.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://man7.org/linux/man-pages/man7/inotify.7.html](https://man7.org/linux/man-pages/man7/inotify.7.html)；[https://nodejs.org/api/fs.html#caveats](https://nodejs.org/api/fs.html#caveats)；[https://github.com/paulmillr/chokidar](https://github.com/paulmillr/chokidar)；[https://man7.org/linux/man-pages/man2/fsync.2.html](https://man7.org/linux/man-pages/man2/fsync.2.html)；[https://man7.org/linux/man-pages/man2/rename.2.html](https://man7.org/linux/man-pages/man2/rename.2.html)
- 核验结论：fsync 持久性不等可见性；等待异步完成和发布协议另议；同一 inotify fd 是有序队列，不能称普遍乱序；rename 原子性需具体平台同 fs 及不原地续写，崩溃持久需同步目录；awaitWriteFinish 尺寸稳定启发式非完成证明；本机试过不是规范保证
- 改动 / 保留理由：重点技术纠错，保留对账/原子发布建议并明确前提
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### magic-numbers-hardcoding

- 中文：[docs/04-detailed-design/magic-numbers-hardcoding.mdx](docs/04-detailed-design/magic-numbers-hardcoding.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/magic-numbers-hardcoding.mdx](i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/magic-numbers-hardcoding.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://12factor.net/config](https://12factor.net/config)；[https://refactoring.com/catalog/replaceMagicLiteral.html](https://refactoring.com/catalog/replaceMagicLiteral.html)
- 核验结论：MAX_RETRIES 不是真正不变常数分类例子；建议例子保留吞错和空 URL 默认会误导，补 failfast/终止错误；hooks 链接指错 overpermission，改 hooks-not-prompts；提示规则不能达到确定性 lint 同样效果
- 改动 / 保留理由：修正配置分类、示例失败出口与权限事实，去全版本训练归因
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### missing-edge-cases

- 中文：[docs/04-detailed-design/missing-edge-cases.mdx](docs/04-detailed-design/missing-edge-cases.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/missing-edge-cases.mdx](i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/missing-edge-cases.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)
- 核验结论：所有可能边界不可能穷尽；测试非完整证明；主路径强边界弱不是全部模型固有定理；非空类型不防运行时外部输入，例外需信任边界
- 改动 / 保留理由：保留边界清单与可执行验收，限制枚举与类型保证范围
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### performance-antipatterns

- 中文：[docs/04-detailed-design/performance-antipatterns.mdx](docs/04-detailed-design/performance-antipatterns.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/performance-antipatterns.mdx](i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/performance-antipatterns.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://arxiv.org/abs/2407.21579](https://arxiv.org/abs/2407.21579)；[https://arxiv.org/abs/2503.22851](https://arxiv.org/abs/2503.22851)；[https://docs.python.org/3/library/re.html#re.compile](https://docs.python.org/3/library/re.html#re.compile)
- 核验结论：N+1 通常查询数线性，不该与 n 平方一起称超线性；Python re 缓存使每次 compile 不一定重新编译；RobuNFR 不证明优化仅因没人提要求；需区分 correctness 与 NFR 指标；O(n) 仅内存映射，数据库计划/分批/参数上限单独；冷路径也可能资源超限
- 改动 / 保留理由：纠正复杂度、re 缓存、基准适用范围及热点判据
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### plausible-but-brittle-design

- 中文：[docs/04-detailed-design/plausible-but-brittle-design.mdx](docs/04-detailed-design/plausible-but-brittle-design.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/plausible-but-brittle-design.mdx](i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/plausible-but-brittle-design.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)；[https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)
- 核验结论：数倍返工成本无条件数字非来源支持；每套生产方案必须列所有机制过度，按失败后果选；模型本质只优化合理不健壮不可内省
- 改动 / 保留理由：保留假设/失败模式推演，收窄成本和必备机制为适用条件
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### preview-and-execution-diverge

- 中文：[docs/04-detailed-design/preview-and-execution-diverge.mdx](docs/04-detailed-design/preview-and-execution-diverge.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/preview-and-execution-diverge.mdx](i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/preview-and-execution-diverge.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://checkmarx.com/zero-post/bypassing-ai-agent-defenses-with-lies-in-the-loop/](https://checkmarx.com/zero-post/bypassing-ai-agent-defenses-with-lies-in-the-loop/)；[https://cwe.mitre.org/data/definitions/367.html](https://cwe.mitre.org/data/definitions/367.html)；[https://git-scm.com/docs/git-config](https://git-scm.com/docs/git-config)
- 核验结论：示例 lookup_remote_tip 仍传 remote 而非冻结 pushURL，可能查错仓库；force-with-lease 默认引入非快进重写能力，要先强制祖先关系/明确允许；多 pushurl 需拒绝或全部预览，不能默认只第一个；冻结绝对路径/URL 非完整 TOCTOU/DNS 权限保证
- 改动 / 保留理由：纠正冻结 URL 取远端 tip、拒绝多目标、只允许快进示例并限制保证
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### style-drift

- 中文：[docs/04-detailed-design/style-drift.mdx](docs/04-detailed-design/style-drift.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/style-drift.mdx](i18n/en/docusaurus-plugin-content-docs/current/04-detailed-design/style-drift.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)；[https://code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)
- 核验结论：每会话空白忽略自动载入 CLAUDE/AGENTS 与 auto memory；读邻近不是默认永远不查，按可见上下文论风险；hooks 链接指错，提示词达不到 formatter 同等保证；来源老标题应更新语义定位
- 改动 / 保留理由：更新跨会话来源与规则分工，保留邻近模式和自动格式化
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### ai-can-do-not-feasibility

- 中文：[docs/01-ideation-feasibility/ai-can-do-not-feasibility.mdx](docs/01-ideation-feasibility/ai-can-do-not-feasibility.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/ai-can-do-not-feasibility.mdx](i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/ai-can-do-not-feasibility.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works](https://www.gov.uk/service-manual/agile-delivery/how-the-alpha-phase-works)
- 核验结论：技术能做不等于几乎总能做，训练乐观因果未经核验；示例延迟/云 API 条件不可泛化；原来源仅百科缺一手
- 改动 / 保留理由：约束可行性与验证门槛，添加 GOVUK alpha 一手指导，保留五维检查
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### confidently-wrong-explanations

- 中文：[docs/01-ideation-feasibility/confidently-wrong-explanations.mdx](docs/01-ideation-feasibility/confidently-wrong-explanations.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/confidently-wrong-explanations.mdx](i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/confidently-wrong-explanations.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://arxiv.org/abs/2305.04388](https://arxiv.org/abs/2305.04388)；[https://arxiv.org/abs/2502.11028](https://arxiv.org/abs/2502.11028)；[https://www.anthropic.com/research/measuring-faithfulness-in-chain-of-thought-reasoning](https://www.anthropic.com/research/measuring-faithfulness-in-chain-of-thought-reasoning)
- 核验结论：无内部置信机制和所有解释先结论后理由过强；CoT 不忠实证据限特定偏置任务/模型；口头信心不等于概率校准
- 改动 / 保留理由：限定非忠实解释与校准研究，保留可复现实验/排除假设方法
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### fabricated-research-data

- 中文：[docs/01-ideation-feasibility/fabricated-research-data.mdx](docs/01-ideation-feasibility/fabricated-research-data.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/fabricated-research-data.mdx](i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/fabricated-research-data.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://arxiv.org/abs/2202.03629](https://arxiv.org/abs/2202.03629)；[https://www.nhd.uscourts.gov/sites/default/files/pdf/Mata-v-Avianca-sanctions-order.PDF](https://www.nhd.uscourts.gov/sites/default/files/pdf/Mata-v-Avianca-sanctions-order.PDF)
- 核验结论：无搜索必编造/没有不知能力/训练原因过强；引用存在不代表支持主张；ACM 原链接 403 需作者版本
- 改动 / 保留理由：区分候选来源和已验证引用，补作者版本与原始裁决，示例明确虚构
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### nondeterministic-flip-flop

- 中文：[docs/01-ideation-feasibility/nondeterministic-flip-flop.mdx](docs/01-ideation-feasibility/nondeterministic-flip-flop.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/nondeterministic-flip-flop.mdx](i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/nondeterministic-flip-flop.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://docs.anthropic.com/en/api/messages](https://docs.anthropic.com/en/api/messages)；[https://arxiv.org/abs/2408.04667](https://arxiv.org/abs/2408.04667)
- 核验结论：每字随机忽略贪心/模型可用参数变化；跨会话无记忆不是所有代理产品现状；重复一致不代表真，口头置信不能当校准
- 改动 / 保留理由：限定复现设置与记忆边界，保留 ADR/证据锁定
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### sycophancy-idea-validation

- 中文：[docs/01-ideation-feasibility/sycophancy-idea-validation.mdx](docs/01-ideation-feasibility/sycophancy-idea-validation.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/sycophancy-idea-validation.mdx](i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/sycophancy-idea-validation.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models](https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models)
- 核验结论：RLHF 必然讨好/永不可消除不成立；扮演反方和改写 prompt 不保证正确；要求三个真实失败案例可能诱发幻觉
- 改动 / 保留理由：限定 2023 研究范围，反例要求可核验或明确不足
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### underestimating-effort

- 中文：[docs/01-ideation-feasibility/underestimating-effort.mdx](docs/01-ideation-feasibility/underestimating-effort.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/underestimating-effort.mdx](i18n/en/docusaurus-plugin-content-docs/current/01-ideation-feasibility/underestimating-effort.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://www.pmi.org/learning/library/planning-fallacy-causes-solutions-project-expectations-6374](https://www.pmi.org/learning/library/planning-fallacy-causes-solutions-project-expectations-6374)
- 核验结论：乐观下界不能当数学下界；人类 planningfallacy 不直接证明 LLM 更严重；工时数字应标注演示非研究测量
- 改动 / 保留理由：区分估算与承诺，保留参考类/范围/依赖，明确数字条件
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### comment-doc-drift

- 中文：[docs/05-implementation/comment-doc-drift.mdx](docs/05-implementation/comment-doc-drift.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/comment-doc-drift.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/comment-doc-drift.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://csnagy.github.io/research/pdfs/2019/Wen2019-preprint.pdf](https://csnagy.github.io/research/pdfs/2019/Wen2019-preprint.pdf)；[https://web.stanford.edu/~ouster/cgi-bin/aposd.php](https://web.stanford.edu/~ouster/cgi-bin/aposd.php)
- 核验结论：原 USI PDF 404，替换同篇作者版本；历史维护研究不是 LLM 因果实验；只写 why 与可执行文档永不漂移均过强
- 改动 / 保留理由：保留同步评审，补契约/单位/错误语义；测试与理由也需复核
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### degenerative-debugging-loops

- 中文：[docs/05-implementation/degenerative-debugging-loops.mdx](docs/05-implementation/degenerative-debugging-loops.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/degenerative-debugging-loops.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/degenerative-debugging-loops.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://arxiv.org/abs/2310.01798](https://arxiv.org/abs/2310.01798)；[https://arxiv.org/abs/2602.06875](https://arxiv.org/abs/2602.06875)；[https://arxiv.org/abs/2507.21017](https://arxiv.org/abs/2507.21017)；[https://code.claude.com/docs/en/checkpointing](https://code.claude.com/docs/en/checkpointing)
- 核验结论：无外部反馈自纠研究不等于所有当前 agent 无法自纠；无轨迹不一定无法定位，静态/编译证据也有效；检查点回退需保护用户/并行修改
- 改动 / 保留理由：限定研究范围，保留假设和新增证据；回退前检查实际覆盖
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### git-hygiene

- 中文：[docs/05-implementation/git-hygiene.mdx](docs/05-implementation/git-hygiene.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/git-hygiene.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/git-hygiene.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)；[https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project)；[https://code.claude.com/docs/en/checkpointing](https://code.claude.com/docs/en/checkpointing)
- 核验结论：大提交降低 bisect 粒度而非命令失效；gitignore 不影响已跟踪文件；逐文件提交不合理；旧跨产品恢复表无足够当前依据
- 改动 / 保留理由：保留逻辑原子提交与暂存 diff；更新已核验 Claude 覆盖、取消未核产品承诺
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### hallucinated-api-version-drift

- 中文：[docs/05-implementation/hallucinated-api-version-drift.mdx](docs/05-implementation/hallucinated-api-version-drift.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/hallucinated-api-version-drift.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/hallucinated-api-version-drift.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://github.com/upstash/context7](https://github.com/upstash/context7)；[https://code.claude.com/docs/en/mcp](https://code.claude.com/docs/en/mcp)；[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)
- 核验结论：训练截止不等于代理不会读当前版本；Context7 检索不保证资料版本/完整覆盖/所有签名都官方；类型检查不证明语义兼容，somelib 是虚构
- 改动 / 保留理由：实际安装版本与第一方版本来源核对，删无依据跨产品默认表
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### ignoring-file-state-overwrite

- 中文：[docs/05-implementation/ignoring-file-state-overwrite.mdx](docs/05-implementation/ignoring-file-state-overwrite.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/ignoring-file-state-overwrite.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/ignoring-file-state-overwrite.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things)；[https://geminicli.com/docs/tools/file-system/](https://geminicli.com/docs/tools/file-system/)；[https://developers.openai.com/api/docs/guides/tools-apply-patch](https://developers.openai.com/api/docs/guides/tools-apply-patch)；[https://code.claude.com/docs/en/checkpointing](https://code.claude.com/docs/en/checkpointing)
- 核验结论：先读不消灭读写竞态，局部匹配也可能定位错；OpenAI API 宿主补丁语义不能直接等同 CodexCLI；原报成功没改产品断言无足够依据；当前检查点可还原已追踪文件后续外部/Bash 改动，链接路径受限
- 改动 / 保留理由：分清读取/内容前置条件与恢复范围，替换旧 Gemini 链接并删除无来源行为断言
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### kitchen-sink-session

- 中文：[docs/05-implementation/kitchen-sink-session.mdx](docs/05-implementation/kitchen-sink-session.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/kitchen-sink-session.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/kitchen-sink-session.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)；[https://code.claude.com/docs/en/context-window](https://code.claude.com/docs/en/context-window)
- 核验结论：所有历史一直留窗口已不准确；clear 不撤回文件/删除所有持久记忆或停止所有后台任务；不能把三个话题导致退化写成全模型定律
- 改动 / 保留理由：保留任务聚焦原则，先保存核验状态再决定摘要/独立会话
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### lost-track-in-refactor

- 中文：[docs/05-implementation/lost-track-in-refactor.mdx](docs/05-implementation/lost-track-in-refactor.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/lost-track-in-refactor.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/lost-track-in-refactor.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/context-window](https://code.claude.com/docs/en/context-window)；[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)
- 核验结论：任务工具/持久清单可外置状态，压缩会重载部分规则计划记忆；零文本命中不证明动态/别名/仓外契约迁移完成；逐文件 tsc+ 提交可能使跨文件类型迁移不可行
- 改动 / 保留理由：连贯逻辑步骤，结合类型/行为/兼容审查与搜索，更新配方示例
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### over-correcting

- 中文：[docs/05-implementation/over-correcting.mdx](docs/05-implementation/over-correcting.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/over-correcting.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/over-correcting.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)；[https://code.claude.com/docs/en/checkpointing](https://code.claude.com/docs/en/checkpointing)；[https://code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)
- 核验结论：纠正不必然越纠越差，关键是新增证据；两次为经验提醒非固定阈值；跨会话无记忆与双 Esc 直接回退都不准确
- 改动 / 保留理由：区分精简上下文与代码恢复，保留失败证据和用户改动
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### over-editing-scope-creep

- 中文：[docs/05-implementation/over-editing-scope-creep.mdx](docs/05-implementation/over-editing-scope-creep.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/over-editing-scope-creep.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/over-editing-scope-creep.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)
- 核验结论：不能反推所有模型缺少最小改动偏好；必要跨文件迁移不是越界，文件数不是风险倍数；旧配方为每行重复确认造成阻塞
- 改动 / 保留理由：按目标/必要依赖界定 diff，已有授权的小改动直接完成，关键范围变化再澄清
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### runaway-agent-loops

- 中文：[docs/05-implementation/runaway-agent-loops.mdx](docs/05-implementation/runaway-agent-loops.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/runaway-agent-loops.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/runaway-agent-loops.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/costs](https://code.claude.com/docs/en/costs)；[https://code.claude.com/docs/en/cli-reference](https://code.claude.com/docs/en/cli-reference)；[https://github.com/anthropics/claude-code/issues/15909](https://github.com/anthropics/claude-code/issues/15909)；[https://arxiv.org/abs/2503.13657](https://arxiv.org/abs/2503.13657)；[https://arxiv.org/abs/2602.20021](https://arxiv.org/abs/2602.20021)；[https://geminicli.com/docs/reference/configuration/](https://geminicli.com/docs/reference/configuration/)；[https://developers.openai.com/codex/agent-approvals-security](https://developers.openai.com/codex/agent-approvals-security)
- 核验结论：公开 issue 为报告者数据非厂商复现；MAST 早停不直接证明无限循环；max-turns 限 print 并计 agentic turns；费用估计可能超上限；Gemini 当前路径 model.maxSessionTurns，Codex 旧档位表过时；提示词上限不是工具侧硬预算
- 改动 / 保留理由：重写执行器/调用/时间/预算/副作用分层约束，保留进度及报告边界；去掉 Replit 无限循环成因推断
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### shelling-out-inherits-config

- 中文：[docs/05-implementation/shelling-out-inherits-config.mdx](docs/05-implementation/shelling-out-inherits-config.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/shelling-out-inherits-config.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/shelling-out-inherits-config.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://github.com/github/copilot-cli/security/advisories/GHSA-9ccr-r5hg-74gf](https://github.com/github/copilot-cli/security/advisories/GHSA-9ccr-r5hg-74gf)；[https://github.blog/open-source/git/securing-git-addressing-5-new-vulnerabilities/](https://github.blog/open-source/git/securing-git-addressing-5-new-vulnerabilities/)；[https://git-scm.com/docs/git-config](https://git-scm.com/docs/git-config)
- 核验结论：工作树可写不等于 Git 元数据可写；仅覆盖 global/system 及两键仍留 local/worktree/include 和执行配置；同用户权限仍有第三方代码执行风险；沙箱能力取决于策略，不能说只防外逃
- 改动 / 保留理由：示例降为明确局部缓解并用独立验证 trusted_repo 前提；可信特权执行上下文与入口测试
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### swallowing-errors

- 中文：[docs/05-implementation/swallowing-errors.mdx](docs/05-implementation/swallowing-errors.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/05-implementation/swallowing-errors.mdx](i18n/en/docusaurus-plugin-content-docs/current/05-implementation/swallowing-errors.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://daplab.cs.columbia.edu/general/2026/01/08/9-critical-failure-patterns-of-coding-agents.html](https://daplab.cs.columbia.edu/general/2026/01/08/9-critical-failure-patterns-of-coding-agents.html)；[https://arxiv.org/abs/2503.15223](https://arxiv.org/abs/2503.15223)；[https://docs.astral.sh/ruff/rules/try-except-pass/](https://docs.astral.sh/ruff/rules/try-except-pass/)；[https://docs.astral.sh/ruff/rules/blind-except/](https://docs.astral.sh/ruff/rules/blind-except/)；[https://docs.astral.sh/ruff/rules/suppressible-exception/](https://docs.astral.sh/ruff/rules/suppressible-exception/)；[https://eslint.org/docs/latest/rules/no-empty](https://eslint.org/docs/latest/rules/no-empty)
- 核验结论：差分行为不等于错误，更不证明吞异常原因；研究仅三个工具/SWE-benchVerified；SIM105 建议 suppress 非阻止吞异常；lint 有配置与语义边界；从输出不能断言故意伪装
- 改动 / 保留理由：限定研究；S110/BLE001 与 no-empty 实际用途；可观测降级和更新过时测试保留
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### implicit-assumptions

- 中文：[docs/02-requirements/implicit-assumptions.mdx](docs/02-requirements/implicit-assumptions.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/02-requirements/implicit-assumptions.mdx](i18n/en/docusaurus-plugin-content-docs/current/02-requirements/implicit-assumptions.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://genai.owasp.org/llmrisk/llm092025-misinformation/](https://genai.owasp.org/llmrisk/llm092025-misinformation/)；[https://www.thegnar.com/blog/why-your-ai-coding-agent-keeps-making-bad-decisions-and-how-to-fix-it](https://www.thegnar.com/blog/why-your-ai-coding-agent-keeps-making-bad-decisions-and-how-to-fix-it)；[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)
- 核验结论：不必猜完所有缺口，已有契约可查；示例按固定行数决定无索引不成立；原配方逐条批准所有假设过度阻塞
- 改动 / 保留理由：事实/暂定/关键未决分开；先查仓库；可逆低风险说明后推进；按查询计划判断索引
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### llm-forces-solutions

- 中文：[docs/02-requirements/llm-forces-solutions.mdx](docs/02-requirements/llm-forces-solutions.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/02-requirements/llm-forces-solutions.mdx](i18n/en/docusaurus-plugin-content-docs/current/02-requirements/llm-forces-solutions.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://www.thegnar.com/blog/why-your-ai-coding-agent-keeps-making-bad-decisions-and-how-to-fix-it](https://www.thegnar.com/blog/why-your-ai-coding-agent-keeps-making-bad-decisions-and-how-to-fix-it)；[https://arxiv.org/abs/2406.12307](https://arxiv.org/abs/2406.12307)
- 核验结论：社区转述中的训练因果过强；原研究为 APIBank/ToolBench 缺失改造任务，不是所有当代 coding 产品；任何未知先停工的配方不必要
- 改动 / 保留理由：补原研究 v5 为一手、证据改研究支持；检查工具/输入充分性，先查证，关键歧义再问
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### placeholder-fake-inputs

- 中文：[docs/02-requirements/placeholder-fake-inputs.mdx](docs/02-requirements/placeholder-fake-inputs.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/02-requirements/placeholder-fake-inputs.mdx](i18n/en/docusaurus-plugin-content-docs/current/02-requirements/placeholder-fake-inputs.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://genai.owasp.org/llmrisk/llm092025-misinformation/](https://genai.owasp.org/llmrisk/llm092025-misinformation/)；[https://12factor.net/config](https://12factor.net/config)
- 核验结论：不应一律索要真实 key 或真实 PII；mock/合成数据是合法验证但不能冒充真实服务成功；换生产 key 不是上线验证
- 改动 / 保留理由：按验证层次报告；秘密走授权渠道不贴对话；独立工作继续；明确测试环境与副作用授权
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### requirement-gold-plating

- 中文：[docs/02-requirements/requirement-gold-plating.mdx](docs/02-requirements/requirement-gold-plating.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/02-requirements/requirement-gold-plating.mdx](i18n/en/docusaurus-plugin-content-docs/current/02-requirements/requirement-gold-plating.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://martinfowler.com/bliki/Yagni.html](https://martinfowler.com/bliki/Yagni.html)；[https://projectmanagementacademy.net/resources/blog/gold-plating-vs-scope-creep/](https://projectmanagementacademy.net/resources/blog/gold-plating-vs-scope-creep/)
- 核验结论：YAGNI 不能证明具体 RLHF 奖励和必然多做；最少测试/最不可靠不是已核实统计；旧例把字段权限/容量约束当可省额外功能
- 改动 / 保留理由：核心/独立新功能/必要正确性安全基线区分，复用字段白名单与容量上限
- 复评期限：2027-04-29；来源或运行环境相关行为变化时提前复评。

### skipping-specs

- 中文：[docs/02-requirements/skipping-specs.mdx](docs/02-requirements/skipping-specs.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/02-requirements/skipping-specs.mdx](i18n/en/docusaurus-plugin-content-docs/current/02-requirements/skipping-specs.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)；[https://www.oreilly.com/radar/how-to-write-a-good-spec-for-ai-agents/](https://www.oreilly.com/radar/how-to-write-a-good-spec-for-ai-agents/)
- 核验结论：工程经验不是模型训练证明，写 spec 不保证一次成功；重复审批已有规格不必要；退款示例缺正金额、幂等并发和状态契约
- 改动 / 保留理由：按风险写最小可审查规格，复用已知契约；补余额/幂等/并发/恢复边界，关键未决再确认
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

### vague-as-clear

- 中文：[docs/02-requirements/vague-as-clear.mdx](docs/02-requirements/vague-as-clear.mdx)
- 英文：[i18n/en/docusaurus-plugin-content-docs/current/02-requirements/vague-as-clear.mdx](i18n/en/docusaurus-plugin-content-docs/current/02-requirements/vague-as-clear.mdx)
- 状态：中英已修订
- 实际打开的一手依据：[https://code.claude.com/docs/en/best-practices](https://code.claude.com/docs/en/best-practices)；[https://martinfowler.com/articles/exploring-gen-ai.html](https://martinfowler.com/articles/exploring-gen-ai.html)
- 核验结论：Fowler 现有 URL 是系列索引，不是标注的 Commonpitfalls 特定文章；不能从输出推断内部已识别所有歧义或训练奖励；用户心里没有唯一答案也可能需要关键决策
- 改动 / 保留理由：改正来源标题，先查既有语义；重要解读用验收例，低代价可逆细节按惯例推进
- 复评期限：2027-01-29；来源或运行环境相关行为变化时提前复评。

## 核验限制

- 论文结论限其模型、版本、提示、任务及实验环境；作者指南属于工程建议，不能直接证明模型内部因果。
- 未运行部署、负载、安全攻击或产品端到端测试；示例应按明确前提理解。
- 未运行整站构建或生成器；最后仅对本批镜像、元数据与格式做定向检查。

## 定向交付检查

- 38 对 / 76 篇：中英二级标题数、admonition 序列、站内 MDX 目标集、sources URL 集一致。
- 76 篇去 frontmatter 后均通过 @mdx-js/mdx 内存编译；没有生成站点或构建产物。
- check:content 读取真实源文件：162 对文档、0 个交付问题、0 条缺复核元数据或到期。
- 本批 AutoCorrect 与 Vale 定向检查；拼写只剩 Python 标准库名 contextlib，交由主执行者统一补词典。
- git diff --check 针对本批文件无空白错误。
- 未运行整站 build、生成器或部署；未修改全局配置 / 索引 / 词典，未提交。

## 维护与证据边界补记

- schema 的迁移配方明确恢复或向前修复，不承诺数据丢失可逆；金额示例的输入已说明两位精度及范围前提。
- 并发自增仅说明成功提交的读改写更新；请求失败、去重、异步重入及跨进程共享另处理。
- Claude Code 检查点的本轮核验范围：本会话文件工具已追踪文件的后续 Bash / 外部改动可能一并恢复，Bash-only 未追踪文件、部分子代理与链接路径另有限制。没有向其他产品外推。
- Git 执行器示例只是局部配置缓解；清除 global/system 不清除 local/worktree/include，trusted_repo 必须由独立验证流程建立。
- 论文数字未外推为当前产品统一概率；公开 issue 数字明确为报告者数据；演示数字、代码提纲及未运行集成不构成生产验证。
