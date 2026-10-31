import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import test from 'node:test';
import { withNoteServer } from './session.mjs';

test('a failed client check still closes the real server and removes its temporary directory', { timeout: 12_000 }, async () => {
  let workdir;
  let pid;
  const expected = new Error('Deliberate client assertion failure');
  await assert.rejects(withNoteServer(async (client, session) => {
    ({ workdir, pid } = session);
    assert.equal(client.getServerVersion().name, 'least-privilege-notes');
    assert.ok(Number.isInteger(pid));
    throw expected;
  }), (error) => error === expected);
  await assert.rejects(access(workdir), { code: 'ENOENT' });
  assert.throws(() => process.kill(pid, 0), { code: 'ESRCH' });
});
