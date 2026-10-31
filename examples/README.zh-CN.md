# 权限、MCP 与重试：可运行示例

[English](./README.md) · [返回项目](../README.zh-CN.md)

这些示例把三条工程建议变成可以观察的允许、拒绝和恢复结果。只使用合成数据，不调用模型或生产 API，不需要密钥。每个入口自带断言；预期拒绝发生时整组仍成功，行为不符则非零退出。

## 运行

在仓库根目录执行，使用 Node.js 22.13 或更新的 22.x，或 Node.js 24+：

```bash
npm ci --prefix mcp --ignore-scripts
npm run test:examples
```

安装按现有 `mcp/package-lock.json` 解析 SDK 依赖，需要访问 npm registry；安装完成后示例运行不访问网络。权限与重试示例只用 Node 内置模块，也可单独运行：

```bash
node examples/permissions/demo.mjs
node mcp/examples/least-privilege/demo.mjs
node examples/retry/demo.mjs
```

成功时，权限组输出 `PASS read-only` / `PASS read-write`；MCP 组输出带 `example: "mcp-least-privilege"` 和检查列表的 JSON；重试组输出恢复、去重和预算检查的 `PASS`。总入口还运行检查点损坏 / 重置防护及 MCP 客户端失败清理的回归测试；全部通过后退出码为 0。

每组创建独立临时目录，完成或正常抛错后自动清理。中断进程或系统崩溃可能留下临时目录，不把它改成真实项目、凭据目录或生产状态目录。

## 权限：验证真实进程的允许与拒绝

[源码](./permissions/demo.mjs) · [受限探针](./permissions/probe.mjs) · [对应模板](../docs/toolkit/permissions-config.mdx)

可信父进程创建假文件，再用 `--permission` 和精确文件授权启动固定探针。你会看到获准读取 / 写入成功、未获准读取 / 写入与子进程创建被 `ERR_ACCESS_DENIED` 拒绝。父进程还核对文件最终状态，避免把“打印了拒绝”当成有效防护。

这演示的是 Node Permission Model 对可信代码的进程级限制。它不验证 Claude Code 的规则匹配，也不建立 OS 沙箱或网络隔离。Node 官方明确说明恶意代码可能绕过，符号链接和已打开的文件描述符等也有边界；不要用它执行不可信代码。

## MCP：协议调用与服务端收口

[客户端](../mcp/examples/least-privilege/demo.mjs) · [服务端](../mcp/examples/least-privilege/server.mjs) · [对应条目](../docs/00-setup-collaboration/mcp-over-access.mdx)

客户端通过真实 SDK 的 stdio transport 初始化、列工具并调用 `read_note`。服务端只接受固定笔记标识，严格校验参数；示例检查非法标识、路径 / URL 参数、额外参数和未知写工具均被拒绝。服务端没有文件路径参数、外发工具或写工具。

合成笔记含一段指令样文本。示例只验证它作为数据返回，没有执行这些文字；未接入模型，因此不能据此判断模型是否抵抗提示注入。窄工具和 schema 检查也不替代真实系统的身份认证、租户 / 对象授权、凭据隔离和进程沙箱。此例复用锁文件中的 SDK 1.29.0，不变更正式 AiWiki MCP 服务。

## 重试：结果未知后跨进程恢复

[运行入口](./retry/demo.mjs) · [对应条目](../docs/05-implementation/durable-tasks-retry-idempotency.mdx)

调用方先持久记录业务键、请求摘要和尝试预算。模拟服务写入导出记录后，故意让调用进程丢失回复并退出。新进程读取检查点，按原键查询服务记录，找回已完成结果；最终导出只有一份。

示例还验证同键异参被拒绝、永久错误不盲目重试，以及跨进程恢复不会重置预算。等待只用于演示退避；本地账本是明确标出的模拟服务，没有真实导出或计费。

这是单写者、可信临时目录中的教学实现。生产系统仍须定义事务、并发、幂等键作用域与过期、重试时限和对账方式；本例不实现 MCP Tasks，不提供断电恢复或业务级 exactly-once 保证。

## 实际验证与来源

2026-10-31 在 macOS arm64 的 Node.js 22.13.0、24.22.1、25.6.0 上，三组演示与五项补充测试全部通过，MCP SDK 为锁文件中的 1.29.0。其他平台须实际运行验证；新增 CI 步骤会在提交到远程后执行。

运行是否通过以命令退出状态和断言为准。CI 也运行 `npm run test:examples`，帮助发现文档或 SDK 变化导致的漂移。

- [Node.js 22 Permission Model](https://nodejs.org/docs/latest-v22.x/api/permissions.html)：授权参数与限制；22.13 起稳定。
- [MCP TypeScript SDK 1.29.0 服务端文档](https://github.com/modelcontextprotocol/typescript-sdk/blob/v1.29.0/docs/server.md)与[客户端文档](https://github.com/modelcontextprotocol/typescript-sdk/blob/v1.29.0/docs/client.md)：工具、schema 与 stdio。
- [Amazon：Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)：业务意图标识、参数冲突和服务端幂等契约。
