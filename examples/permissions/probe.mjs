// Internal trusted probe, launched only by demo.mjs with native Node flags.
// permission.has() is diagnostic; real fs/spawnSync calls below test enforcement.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [mode, root] = process.argv.slice(2);
assert.ok(['read-only', 'read-write'].includes(mode) && root);
assert.equal(typeof process.permission?.has, 'function', 'Native permissions must be on');

const workspace = join(root, 'workspace');
const input = join(workspace, 'input.txt');
const output = join(workspace, 'output.txt');
const protectedFile = join(root, 'protected.txt');
const canWrite = mode === 'read-write';

assert.equal(process.permission.has('fs.read', input), true);
assert.equal(process.permission.has('fs.write', output), canWrite);
assert.equal(process.permission.has('fs.read', protectedFile), false);

function denied(action, permission) {
  // ENOENT, EACCES and a made-up policy result do not count as Node enforcement.
  assert.throws(action, { code: 'ERR_ACCESS_DENIED', permission });
}

// 1: Allowed read through node:fs.
assert.equal(readFileSync(input, 'utf8'), 'FAKE INPUT\n');

// 2: Changing only --allow-fs-write changes the same actual write operation.
if (canWrite) writeFileSync(output, 'FAKE OUTPUT\n');
else denied(() => writeFileSync(output, 'FAKE OUTPUT\n'), 'FileSystemWrite');

// 3–4: This fake protected sibling has no read or write grant.
denied(() => readFileSync(protectedFile, 'utf8'), 'FileSystemRead');
denied(() => writeFileSync(protectedFile, 'OVERWRITTEN\n'), 'FileSystemWrite');

// 5: Normalizing ../ must not turn the granted workspace into its parent.
// This ordinary path test is not a test of symlink or other escape resistance.
denied(() => writeFileSync(join(workspace, '..', 'outside.txt'), 'OUTSIDE\n'),
  'FileSystemWrite');

// 6: No --allow-child-process grant. The attempted child is a harmless fixed
// Node exit, uses argv without a shell, and must be rejected before it starts.
denied(() => spawnSync(process.execPath, ['-e', 'process.exit(0)'], {
  shell: false, stdio: 'ignore', timeout: 1_000,
}), 'ChildProcess');

console.log(JSON.stringify({ mode, checks: 6 }));
