import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { DEFAULT_INHERITED_ENV_VARS, StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// cspell:ignore SYSTEMROOT -- Windows environment variable name.

const serverPath = fileURLToPath(new URL('./server.mjs', import.meta.url));

export async function withNoteServer(check) {
  const workdir = await mkdtemp(join(tmpdir(), 'aiwiki-mcp-example-'));
  // SDK 1.29 merges its default environment with env. Override every inherited value,
  // then set only the runtime paths needed here; never spread the parent's process.env.
  const env = Object.fromEntries(DEFAULT_INHERITED_ENV_VARS.map((name) => [name, '']));
  Object.assign(env, {
    HOME: workdir,
    USERPROFILE: workdir,
    TMPDIR: workdir,
    TMP: workdir,
    TEMP: workdir,
    PATH: dirname(process.execPath),
    NODE_ENV: 'production',
  });
  if (process.platform === 'win32' && process.env.SYSTEMROOT) {
    env.SYSTEMROOT = process.env.SYSTEMROOT;
  }
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [serverPath],
    cwd: workdir,
    env,
    stderr: 'pipe',
  });
  // initialize failures can start SDK cleanup before our finally block runs.
  // Share that promise so both callers wait for the same child shutdown.
  const closeTransport = transport.close.bind(transport);
  let closing;
  transport.close = () => (closing ??= closeTransport());
  const client = new Client({ name: 'least-privilege-example', version: '1.0.0' }, { capabilities: {} });
  const requestOptions = { timeout: 3_000, maxTotalTimeout: 3_000 };
  const protocolErrors = [];
  let diagnostics = '';
  client.onerror = (error) => {
    if (protocolErrors.length < 8) protocolErrors.push(error.message.slice(0, 500));
  };
  transport.stderr.on('data', (chunk) => {
    diagnostics = (diagnostics + chunk.toString()).slice(0, 2_000);
  });

  try {
    // connect performs initialize and notifications/initialized through the real SDK.
    await client.connect(transport, requestOptions);
    const result = await check(client, { workdir, pid: transport.pid, requestOptions });
    if (protocolErrors.length || diagnostics) {
      throw new Error(`Unexpected server diagnostic: ${(protocolErrors.join('; ') + diagnostics).slice(0, 500)}`);
    }
    return result;
  } finally {
    try {
      // The locked SDK closes stdin, then uses bounded SIGTERM/SIGKILL fallback.
      await client.close();
    } finally {
      try {
        await transport.close();
      } finally {
        await rm(workdir, { recursive: true, force: true });
      }
    }
  }
}
