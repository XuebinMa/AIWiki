import {createHash} from 'node:crypto';
import {readFile, rename, writeFile} from 'node:fs/promises';
import {join} from 'node:path';

// One writer, trusted private directory. Rename avoids partial JSON on process
// interruption; there is no fsync, lock, cross-file transaction, or power-loss guarantee.
export const checkpointPath = (directory) => join(directory, 'caller-checkpoint.json');
export const ledgerPath = (directory) => join(directory, 'service-ledger.json');

export class PermanentError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

export function normalizeRequest(request) {
  if (
    request === null ||
    typeof request !== 'object' ||
    Array.isArray(request) ||
    Object.keys(request).sort().join(',') !== 'format,reportId' ||
    typeof request.reportId !== 'string' ||
    request.reportId.length === 0 ||
    !['csv', 'json'].includes(request.format)
  ) {
    throw new PermanentError('INVALID_REQUEST', 'Expected reportId and csv/json format only');
  }
  return {reportId: request.reportId, format: request.format};
}

export function requestDigest(request) {
  return createHash('sha256').update(JSON.stringify(normalizeRequest(request))).digest('hex');
}

export async function readJson(path) {
  // Missing/corrupt persisted state is an error, never an empty-state fallback.
  return JSON.parse(await readFile(path, 'utf8'));
}

async function readIfPresent(path) {
  try {
    return {found: true, value: await readJson(path)};
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return {found: false};
  }
}

export async function writeJson(path, value) {
  const temporary = path + '.pending';
  await writeFile(temporary, JSON.stringify(value, null, 2) + '\n', {mode: 0o600});
  await rename(temporary, path);
}

export function validateCheckpoint(state) {
  if (
    state.version !== 1 ||
    typeof state.businessKey !== 'string' ||
    state.businessKey.length === 0 ||
    state.digest !== requestDigest(state.request) ||
    !Number.isInteger(state.maxAttempts) ||
    state.maxAttempts < 1 ||
    state.maxAttempts > 10 ||
    !Number.isInteger(state.attempts) ||
    state.attempts < 0 ||
    state.attempts > state.maxAttempts ||
    !Number.isInteger(state.backoffMs) ||
    state.backoffMs < 1 ||
    state.backoffMs > 250 ||
    !Number.isFinite(state.notBefore) ||
    !Array.isArray(state.attemptHistory) ||
    state.attemptHistory.length !== state.attempts ||
    !['pending', 'in_flight', 'waiting', 'completed', 'permanent_failure', 'exhausted'].includes(state.status)
  ) {
    throw new PermanentError('INVALID_CHECKPOINT', 'Checkpoint failed validation');
  }
  return state;
}

export async function initializeOperation(directory, options) {
  const {businessKey, request, maxAttempts = 3, backoffMs = 20} = options;
  const state = validateCheckpoint({
    version: 1,
    businessKey,
    request: normalizeRequest(request),
    digest: requestDigest(request),
    maxAttempts,
    backoffMs,
    attempts: 0,
    attemptHistory: [],
    notBefore: 0,
    status: 'pending',
    result: null,
    lastError: null,
  });
  const [checkpoint, ledger] = await Promise.all([
    readIfPresent(checkpointPath(directory)),
    readIfPresent(ledgerPath(directory)),
  ]);
  if (checkpoint.found !== ledger.found) {
    throw new PermanentError('INCOMPLETE_SETUP', 'One state file is missing; preserve the other and investigate');
  }
  if (checkpoint.found) {
    const existing = validateCheckpoint(checkpoint.value);
    if (ledger.value?.version !== 1 || !Array.isArray(ledger.value.exports) || !Array.isArray(ledger.value.calls)) {
      throw new PermanentError('INVALID_LEDGER', 'Existing service ledger failed validation');
    }
    if (
      existing.businessKey !== state.businessKey ||
      existing.digest !== state.digest ||
      existing.maxAttempts !== state.maxAttempts ||
      existing.backoffMs !== state.backoffMs
    ) {
      throw new PermanentError('CHECKPOINT_CONFLICT', 'Cannot replace an existing operation or its budget');
    }
    return existing;
  }
  // Initial setup is outside the failure simulation. A worker never initializes
  // missing state, so interrupted/partial setup must be investigated by the caller.
  await writeJson(ledgerPath(directory), {version: 1, exports: [], calls: []});
  await writeJson(checkpointPath(directory), state);
  return state;
}
