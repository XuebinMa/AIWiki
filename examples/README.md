# Runnable examples: permissions, MCP, and retries

[中文](./README.zh-CN.md) · [Back to the project](../README.md)

These examples turn three engineering recommendations into observable allowed, denied, and recovered outcomes. They use synthetic data, call no model or production API, and require no keys. Each entry point includes assertions: an expected denial passes the demonstration; an unexpected result exits with a nonzero status.

## Run

From the repository root, use Node.js 22.13 or later in the 22.x line, or Node.js 24+:

```bash
npm ci --prefix mcp --ignore-scripts
npm run test:examples
```

Installation uses the existing `mcp/package-lock.json` and needs access to the npm registry. Once installed, the examples run without network access. Permissions and retries use only Node built-ins and can also run individually:

```bash
node examples/permissions/demo.mjs
node mcp/examples/least-privilege/demo.mjs
node examples/retry/demo.mjs
```

On success, permissions prints `PASS read-only` / `PASS read-write`; MCP prints JSON with `example: "mcp-least-privilege"` and a check list; retries prints `PASS` for recovery, deduplication, and budget checks. The combined command also runs regression tests for corrupt/reset checkpoints and cleanup after a failed MCP client check. It exits with status 0 when all checks pass.

Each group creates its own temporary directory and removes it after completion or an ordinary thrown error. Interruptions or system crashes can leave a directory behind. Do not substitute a real project, credential directory, or production state directory.

## Permissions: test an actual process boundary

[Source](./permissions/demo.mjs) · [Restricted probe](./permissions/probe.mjs) · [Related template](../i18n/en/docusaurus-plugin-content-docs/current/toolkit/permissions-config.mdx)

A trusted parent creates dummy files and starts a fixed probe with `--permission` and precise file grants. Allowed reads and writes succeed; unapproved reads, writes, and child-process creation fail with `ERR_ACCESS_DENIED`. The parent also checks the final files rather than trusting a printed denial.

This demonstrates Node Permission Model restrictions on trusted code. It does not test Claude Code permission matching or establish an OS sandbox or network isolation. Node documents that malicious code can bypass the model; symbolic links and already-open file descriptors also have limitations. Do not use it to execute untrusted code.

## MCP: real protocol calls and server constraints

[Client](../mcp/examples/least-privilege/demo.mjs) · [Server](../mcp/examples/least-privilege/server.mjs) · [Related entry](../i18n/en/docusaurus-plugin-content-docs/current/00-setup-collaboration/mcp-over-access.mdx)

The client uses the real SDK's stdio transport to initialize, list tools, and call `read_note`. The server accepts only fixed note identifiers and validates arguments strictly. The example checks that invalid identifiers, path or URL arguments, extra arguments, and unknown write tools are rejected. The server exposes no file-path argument, outbound tool, or write tool.

A synthetic note includes instruction-like text. The example verifies that it returns as data without executing it. No model is involved, so this does not test model resistance to prompt injection. Narrow tools and schema validation do not replace authentication, tenant/object authorization, credential isolation, or a process sandbox. This example reuses SDK 1.29.0 from the lockfile and does not change the production AiWiki MCP server.

## Retries: recover an unknown outcome in a new process

[Entry point](./retry/demo.mjs) · [Related entry](../i18n/en/docusaurus-plugin-content-docs/current/05-implementation/durable-tasks-retry-idempotency.mdx)

The caller persists a business key, request digest, and attempt budget before calling. A simulated service records an export, then deliberately loses the response and exits the caller. A new process reads the checkpoint, queries the service using the original key, and recovers the completed result. Only one export exists at the end.

The example also checks that reusing a key with different parameters is rejected, permanent errors are not blindly retried, and restarting does not reset the budget. Short waits illustrate backoff. The local ledger is an explicitly simulated service with no real exports or charges.

This is a teaching implementation for a single writer in a trusted temporary directory. Production systems still need transaction and concurrency semantics, key scope and expiry, retry deadlines, and reconciliation. It does not implement MCP Tasks or guarantee power-loss recovery or business-level exactly-once effects.

## Verification and sources

On 2026-10-31, all three demonstrations and five supplementary tests passed on macOS arm64 with Node.js 22.13.0, 24.22.1, and 25.6.0, using SDK 1.29.0 from the lockfile. Other platforms need an actual run. The new CI step runs once the changes reach the remote repository.

Use exit status and assertions to assess a run. CI also runs `npm run test:examples` to catch drift when documentation or the SDK changes.

- [Node.js 22 Permission Model](https://nodejs.org/docs/latest-v22.x/api/permissions.html): permission flags and limitations; stable since 22.13.
- MCP TypeScript SDK 1.29.0 [server documentation](https://github.com/modelcontextprotocol/typescript-sdk/blob/v1.29.0/docs/server.md) and [client documentation](https://github.com/modelcontextprotocol/typescript-sdk/blob/v1.29.0/docs/client.md): tools, schemas, and stdio.
- [Amazon: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/): intent identifiers, parameter conflicts, and server-side idempotency contracts.
