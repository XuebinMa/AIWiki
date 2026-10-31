import assert from 'node:assert/strict';
import {readFile, rm, writeFile} from 'node:fs/promises';
import test from 'node:test';
import {checkpointPath, initializeOperation, ledgerPath, readJson} from './state.mjs';
import {runWorker, withTemporaryDirectory} from './harness.mjs';
import {EXIT} from './worker.mjs';

const options = {
  businessKey: 'export:test-report',
  request: {reportId: 'test-report', format: 'csv'},
  maxAttempts: 2,
  backoffMs: 10,
};

test('initialization cannot reset consumed attempts or replace the saved budget', async () => {
  await withTemporaryDirectory(async (directory) => {
    await initializeOperation(directory, options);
    assert.equal(runWorker(directory, 'transient', {yieldAfterTransient: true}).status, EXIT.RETRY_LATER);
    const before = await readFile(checkpointPath(directory), 'utf8');
    const same = await initializeOperation(directory, options);
    assert.equal(same.attempts, 1);
    await assert.rejects(initializeOperation(directory, {...options, maxAttempts: 3}), {code: 'CHECKPOINT_CONFLICT'});
    await assert.rejects(
      initializeOperation(directory, {...options, request: {...options.request, format: 'json'}}),
      {code: 'CHECKPOINT_CONFLICT'},
    );
    assert.equal(await readFile(checkpointPath(directory), 'utf8'), before);
    assert.equal((await readJson(ledgerPath(directory))).exports.length, 0);
  });
});

test('corrupt checkpoint fails closed without recreating or rewriting it', async () => {
  await withTemporaryDirectory(async (directory) => {
    await initializeOperation(directory, options);
    const corrupt = '{"version": 1,';
    await writeFile(checkpointPath(directory), corrupt);
    const result = runWorker(directory);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /SyntaxError/);
    assert.equal(await readFile(checkpointPath(directory), 'utf8'), corrupt);
    assert.equal((await readJson(ledgerPath(directory))).calls.length, 0);
  });
});

for (const missingState of ['checkpoint', 'ledger']) {
  test('initialization refuses a missing ' + missingState + ' without replacing the surviving file', async () => {
    await withTemporaryDirectory(async (directory) => {
      await initializeOperation(directory, options);
      assert.equal(runWorker(directory).status, EXIT.OK);
      assert.equal((await readJson(ledgerPath(directory))).exports.length, 1);
      const missing = missingState === 'checkpoint' ? checkpointPath(directory) : ledgerPath(directory);
      const surviving = missingState === 'checkpoint' ? ledgerPath(directory) : checkpointPath(directory);
      const original = await readFile(surviving, 'utf8');
      await rm(missing);
      await assert.rejects(initializeOperation(directory, options), {code: 'INCOMPLETE_SETUP'});
      assert.equal(await readFile(surviving, 'utf8'), original);
      await assert.rejects(readFile(missing), {code: 'ENOENT'});
    });
  });
}
