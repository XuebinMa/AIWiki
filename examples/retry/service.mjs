import {ledgerPath, normalizeRequest, PermanentError, readJson, requestDigest, writeJson} from './state.mjs';

async function readLedger(directory) {
  const ledger = await readJson(ledgerPath(directory));
  if (ledger.version !== 1 || !Array.isArray(ledger.exports) || !Array.isArray(ledger.calls)) {
    throw new PermanentError('INVALID_LEDGER', 'Service ledger failed validation');
  }
  return ledger;
}

export async function lookupExport(directory, businessKey, digest) {
  const ledger = await readLedger(directory);
  const record = ledger.exports.find((entry) => entry.businessKey === businessKey);
  if (record && record.digest !== digest) {
    throw new PermanentError('KEY_CONFLICT', 'Business key already belongs to different parameters');
  }
  return record ?? null;
}

// This is a local simulated service, not an HTTP API or a real export provider.
// Its one-file replacement keeps the resource and deduplication record together
// in this single-writer demo. A production service needs its own atomic contract.
export async function createExport(directory, {businessKey, request, digest}) {
  const normalized = normalizeRequest(request);
  if (typeof businessKey !== 'string' || businessKey.length === 0 || requestDigest(normalized) !== digest) {
    throw new PermanentError('INVALID_IDENTITY', 'Invalid key or request digest');
  }
  const ledger = await readLedger(directory);
  const previous = ledger.exports.find((entry) => entry.businessKey === businessKey);
  const call = {businessKey, digest, outcome: null};
  ledger.calls.push(call);
  if (previous) {
    call.outcome = previous.digest === digest ? 'deduplicated' : 'key_conflict';
    await writeJson(ledgerPath(directory), ledger);
    if (previous.digest !== digest) {
      throw new PermanentError('KEY_CONFLICT', 'Same key, different parameters: refused');
    }
    return previous;
  }
  if (normalized.reportId === 'restricted-report') {
    call.outcome = 'forbidden';
    await writeJson(ledgerPath(directory), ledger);
    throw new PermanentError('FORBIDDEN', 'This report cannot be exported');
  }
  const record = {
    exportId: 'export-' + (ledger.exports.length + 1),
    businessKey,
    digest,
    request: normalized,
  };
  ledger.exports.push(record);
  call.outcome = 'created';
  await writeJson(ledgerPath(directory), ledger);
  return record;
}
