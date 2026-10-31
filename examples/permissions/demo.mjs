// Run: node examples/permissions/demo.mjs
// Node 22.13+ (22.x), or Node 24+: --permission is stable in Node 22.13.
// Official reference: https://nodejs.org/download/release/v22.13.0/docs/api/permissions.html
// This trusted orchestrator runs WITHOUT --permission to create/delete fixtures.
// Only the fixed probe runs with permissions; no user-supplied code is executed.
// Node's model is a seat belt for trusted code, not an OS sandbox for malicious
// code. Symlinks and existing file descriptors have documented limitations.
// These tests use fresh ordinary files, no symlinks and no inherited file handles
// apart from standard I/O. They do not test or guarantee network isolation.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [major, minor] = process.versions.node.split('.').map(Number);
assert.ok((major === 22 && minor >= 13) || major >= 24,
  'Use Node 22.13+ (22.x), or Node 24+; prefer a current patched release.');
assert.equal(process.argv.length, 2, 'This demo accepts no custom target or code.');
assert.equal(process.permission, undefined,
  'Run the trusted orchestrator without --permission; it restricts its probes.');

const probe = realpathSync(fileURLToPath(new URL('./probe.mjs', import.meta.url)));
// Resolve the OS temp path first: on macOS /var may itself be a symlink.
const root = mkdtempSync(join(realpathSync(tmpdir()), 'aiwiki-permissions-'));

try {
  const workspace = join(root, 'workspace');
  const protectedFile = join(root, 'protected.txt');
  const output = join(workspace, 'output.txt');
  const outside = join(root, 'outside.txt');
  mkdirSync(workspace);
  writeFileSync(join(workspace, 'input.txt'), 'FAKE INPUT\n');
  writeFileSync(protectedFile, 'FAKE PROTECTED DATA\n');

  for (const mode of ['read-only', 'read-write']) {
    const args = [
      '--permission',
      `--allow-fs-read=${probe}`,
      `--allow-fs-read=${workspace}`,
      ...(mode === 'read-write' ? [`--allow-fs-write=${workspace}`] : []),
      probe, mode, root,
    ];
    const result = spawnSync(process.execPath, args, {
      shell: false,
      cwd: workspace,
      // No inherited secrets, NODE_OPTIONS preloads or NODE_PATH module lookup.
      env: process.platform === 'win32' ? { SystemRoot: process.env.SystemRoot } : {},
      stdio: ['ignore', 'pipe', 'pipe'],
      encoding: 'utf8',
      timeout: 5_000,
      maxBuffer: 64 * 1024,
    });
    if (result.error) throw result.error;
    assert.equal(result.status, 0,
      `${mode} probe failed (signal ${result.signal ?? 'none'}):\n${result.stderr}`);
    assert.deepEqual(JSON.parse(result.stdout), { mode, checks: 6 });

    // Independently verify effects rather than trusting the probe's report.
    assert.equal(readFileSync(protectedFile, 'utf8'), 'FAKE PROTECTED DATA\n');
    assert.equal(readFileSync(join(workspace, 'input.txt'), 'utf8'), 'FAKE INPUT\n');
    assert.equal(existsSync(outside), false);
    if (mode === 'read-only') assert.equal(existsSync(output), false);
    else assert.equal(readFileSync(output, 'utf8'), 'FAKE OUTPUT\n');
    console.log(`PASS ${mode}: 6 native permission checks and expected file effects`);
  }
} finally {
  // Runs after assertions, probe errors and timeouts; cleanup errors also fail.
  rmSync(root, { recursive: true, force: true });
}

assert.equal(existsSync(root), false);
console.log('PASS cleanup: temporary fake data removed');
