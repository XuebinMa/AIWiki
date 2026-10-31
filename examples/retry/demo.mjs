import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {join} from 'node:path';
import {createExport} from './service.mjs';
import {checkpointPath, initializeOperation, ledgerPath, readJson, requestDigest} from './state.mjs';
import {runWorker, withTemporaryDirectory} from './harness.mjs';
import {EXIT} from './worker.mjs';

// Local files and fresh child processes only. No network or real external export.
await withTemporaryDirectory(async (root) => {
  const recovery = join(root, 'recovery');
  await mkdir(recovery);
  const options = {
    businessKey: 'export:quarterly-summary-2026-q3',
    request: {reportId: 'quarterly-summary-2026-q3', format: 'csv'},
    maxAttempts: 1,
    backoffMs: 20,
  };
  const initial = await initializeOperation(recovery, options);
  assert.equal(initial.attempts, 0);
  const lost = runWorker(recovery, 'lose-response');
  assert.equal(lost.status, EXIT.RETRY_LATER, lost.stderr);
  const interrupted = await readJson(checkpointPath(recovery));
  const committed = await readJson(ledgerPath(recovery));
  assert.equal(interrupted.status, 'in_flight');
  assert.equal(interrupted.attempts, 1);
  assert.equal(interrupted.result, null);
  assert.equal(committed.exports.length, 1, 'Service really created before reply was lost');
  const restarted = runWorker(recovery);
  assert.equal(restarted.status, EXIT.OK, restarted.stderr);
  assert.notEqual(lost.pid, restarted.pid, 'Recovery must use a new process');
  const recovered = await readJson(checkpointPath(recovery));
  assert.equal(recovered.businessKey, initial.businessKey);
  assert.equal(recovered.digest, initial.digest);
  assert.equal(recovered.attempts, 1, 'Read reconciliation works with the write budget already spent');
  assert.deepEqual(recovered.result, committed.exports[0]);
  assert.equal(runWorker(recovery).status, EXIT.OK);
  assert.equal((await readJson(ledgerPath(recovery))).calls.length, 1);
  console.log('PASS: committed export recovered in a new process after a lost response');

  const same = await createExport(recovery, initial);
  assert.deepEqual(same, recovered.result);
  const changed = {reportId: options.request.reportId, format: 'json'};
  await assert.rejects(
    createExport(recovery, {...initial, request: changed, digest: requestDigest(changed)}),
    {code: 'KEY_CONFLICT'},
  );
  const afterConflict = await readJson(ledgerPath(recovery));
  assert.equal(afterConflict.exports.length, 1);
  assert.deepEqual(afterConflict.calls.map((call) => call.outcome), ['created', 'deduplicated', 'key_conflict']);
  console.log('PASS: same key is deduplicated; changed parameters are rejected');

  const permanent = join(root, 'permanent');
  await mkdir(permanent);
  await initializeOperation(permanent, {
    ...options,
    businessKey: 'export:restricted-report',
    request: {reportId: 'restricted-report', format: 'csv'},
    maxAttempts: 3,
  });
  assert.equal(runWorker(permanent).status, EXIT.PERMANENT);
  assert.equal(runWorker(permanent).status, EXIT.PERMANENT);
  const refused = await readJson(checkpointPath(permanent));
  assert.equal(refused.attempts, 1);
  assert.equal(refused.lastError, 'FORBIDDEN');
  assert.equal((await readJson(ledgerPath(permanent))).exports.length, 0);
  assert.equal((await readJson(ledgerPath(permanent))).calls.length, 1);
  console.log('PASS: permanent refusal is not retried, including after restart');

  const budget = join(root, 'budget');
  await mkdir(budget);
  await initializeOperation(budget, {...options, businessKey: 'export:bounded-retry', maxAttempts: 2});
  assert.equal(runWorker(budget, 'transient', {yieldAfterTransient: true}).status, EXIT.RETRY_LATER);
  const waiting = await readJson(checkpointPath(budget));
  assert.equal(waiting.attempts, 1);
  assert.equal(waiting.status, 'waiting');
  assert.ok(waiting.notBefore > waiting.attemptHistory[0].startedAt);
  assert.equal(runWorker(budget, 'transient').status, EXIT.EXHAUSTED);
  assert.equal(runWorker(budget).status, EXIT.EXHAUSTED, 'Restart must not replenish the budget');
  const exhausted = await readJson(checkpointPath(budget));
  assert.equal(exhausted.attempts, 2);
  assert.equal(exhausted.status, 'exhausted');
  assert.ok(exhausted.attemptHistory[1].startedAt >= waiting.notBefore, 'Persisted backoff must be honored');
  assert.equal((await readJson(ledgerPath(budget))).exports.length, 0);
  console.log('PASS: backoff and two-attempt budget survive process restarts');
});
console.log('PASS: temporary files removed; no external service was contacted');
console.log('Scope: trusted single writer; no production transaction, concurrency, power-loss, or exactly-once guarantee. Not MCP Tasks.');
