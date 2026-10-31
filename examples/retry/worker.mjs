import {setTimeout as delay} from 'node:timers/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {checkpointPath, PermanentError, readJson, validateCheckpoint, writeJson} from './state.mjs';
import {createExport, lookupExport} from './service.mjs';

export const EXIT = {OK: 0, PERMANENT: 65, RETRY_LATER: 75, EXHAUSTED: 78};

class TransientError extends Error {}
class LostResponse extends Error {}

async function transport(directory, state, fault) {
  if (fault === 'transient') throw new TransientError('Simulated temporary transport failure');
  const result = await createExport(directory, state);
  // The service committed, but the caller never receives a result.
  if (fault === 'lose-response') throw new LostResponse('Simulated reply loss after service commit');
  return result;
}

export async function resumeOperation(directory, {fault = 'none', yieldAfterTransient = false} = {}) {
  if (!['none', 'transient', 'lose-response'].includes(fault)) throw new Error('Unknown test fault');
  const path = checkpointPath(directory);
  const state = validateCheckpoint(await readJson(path));
  try {
    // Reconciliation is a read and is allowed even after the write budget is spent.
    // That is how an unknown outcome can be resolved without another creation.
    const existing = await lookupExport(directory, state.businessKey, state.digest);
    if (existing) {
      state.status = 'completed';
      state.result = existing;
      state.lastError = null;
      await writeJson(path, state);
      return EXIT.OK;
    }
    if (state.status === 'completed') {
      throw new PermanentError('MISSING_RESOURCE', 'Completed receipt has no matching service record');
    }
    if (state.status === 'permanent_failure') return EXIT.PERMANENT;
    while (state.attempts < state.maxAttempts) {
      // The next allowed time is in the checkpoint, not a process-local timer.
      await delay(Math.max(0, state.notBefore - Date.now()));
      state.attempts += 1;
      state.attemptHistory.push({attempt: state.attempts, startedAt: Date.now()});
      state.status = 'in_flight';
      // Spend before calling: a crash can consume an unused attempt, never grant one.
      await writeJson(path, state);
      try {
        const result = await transport(directory, state, fault);
        state.status = 'completed';
        state.result = result;
        state.lastError = null;
        await writeJson(path, state);
        return EXIT.OK;
      } catch (error) {
        if (error instanceof LostResponse) {
          // Leave the saved in_flight state intact; the next process must reconcile.
          return EXIT.RETRY_LATER;
        }
        if (!(error instanceof TransientError)) throw error;
        state.status = 'waiting';
        state.lastError = 'TRANSIENT_TRANSPORT';
        state.notBefore = Date.now() + state.backoffMs;
        await writeJson(path, state);
        if (state.attempts < state.maxAttempts && yieldAfterTransient) return EXIT.RETRY_LATER;
      }
    }
    state.status = 'exhausted';
    await writeJson(path, state);
    return EXIT.EXHAUSTED;
  } catch (error) {
    // Only known permanent service errors are classified. Filesystem, JSON, and
    // programming errors escape: they must not reset state or be blindly retried.
    if (!(error instanceof PermanentError)) throw error;
    state.status = 'permanent_failure';
    state.lastError = error.code;
    await writeJson(path, state);
    return EXIT.PERMANENT;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [directory, fault = 'none', extra] = process.argv.slice(2);
  if (!directory || (extra && extra !== '--yield-after-transient')) {
    console.error('Internal worker: provide a trusted demo directory and optional test fault');
    process.exitCode = 1;
  } else {
    try {
      process.exitCode = await resumeOperation(directory, {fault, yieldAfterTransient: Boolean(extra)});
    } catch (error) {
      console.error(error.name + ': ' + error.message);
      process.exitCode = 1;
    }
  }
}
