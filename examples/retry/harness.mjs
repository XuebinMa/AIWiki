import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {access, mkdtemp, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const workerPath = fileURLToPath(new URL('./worker.mjs', import.meta.url));

export function runWorker(directory, fault = 'none', {yieldAfterTransient = false} = {}) {
  const args = [workerPath, directory, fault];
  if (yieldAfterTransient) args.push('--yield-after-transient');
  const result = spawnSync(process.execPath, args, {
    cwd: directory,
    encoding: 'utf8',
    timeout: 5_000,
    env: {}, // Do not forward credentials, preloads, or NODE_OPTIONS into the fixture.
  });
  if (result.error) throw result.error;
  assert.equal(result.signal, null, 'Worker must exit normally, not time out or be signaled');
  return result;
}

export async function withTemporaryDirectory(run) {
  const directory = await mkdtemp(join(tmpdir(), 'aiwiki-retry-'));
  try {
    return await run(directory);
  } finally {
    await rm(directory, {recursive: true, force: true});
    await assert.rejects(access(directory), {code: 'ENOENT'});
  }
}
