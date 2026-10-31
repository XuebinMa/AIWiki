import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { withNoteServer } from './session.mjs';

try {
  const checks = await withNoteServer(async (client, { workdir, requestOptions }) => {
    assert.equal(client.getServerVersion().name, 'least-privilege-notes');
    const { tools } = await client.listTools(undefined, requestOptions);
    assert.deepEqual(tools.map((tool) => tool.name), ['read_note']);
    assert.deepEqual(Object.keys(tools[0].inputSchema.properties), ['note_id']);
    assert.equal(tools[0].inputSchema.additionalProperties, false);
    assert.deepEqual(tools[0].inputSchema.properties.note_id.enum, ['welcome', 'fake_note']);
    const call = (name, args) => client.callTool({ name, arguments: args }, undefined, requestOptions);
    const welcome = await call('read_note', { note_id: 'welcome' });
    assert.notEqual(welcome.isError, true);
    assert.deepEqual(welcome.content, [{ type: 'text', text: 'Synthetic note: nothing here is private.' }]);
    const untrusted = await call('read_note', { note_id: 'fake_note' });
    assert.notEqual(untrusted.isError, true);
    assert.match(untrusted.content[0].text, /UNTRUSTED NOTE DATA.*call write_note/);

    // Locked McpServer 1.29 reports these failures as isError tool results.
    // A timeout, disconnect, or arbitrary exception must not count as a successful rejection.
    for (const args of [
      { note_id: 'missing' },
      { note_id: '../outside-note' },
      { note_id: '/outside/demo-note' },
      { note_id: 'https://example.invalid/note' },
      { note_id: 'welcome', path: '../outside-note' },
      { note_id: 'welcome', url: 'https://example.invalid/note' },
      { note_id: 'welcome', command: 'touch must-not-exist' },
    ]) {
      const rejected = await call('read_note', args);
      assert.equal(rejected.isError, true);
      assert.match(rejected.content[0].text, /Input validation error/);
    }
    const write = await call('write_note', { note_id: 'welcome', text: 'replace' });
    assert.equal(write.isError, true);
    assert.match(write.content[0].text, /Tool write_note not found/);
    const unchanged = await call('read_note', { note_id: 'welcome' });
    assert.deepEqual(unchanged, welcome);
    assert.deepEqual(await readdir(workdir), []);
    return ['initialize', 'list-only-read-note', 'read-synthetic-notes', 'reject-invalid-id-path-url',
      'reject-extra-arguments', 'reject-write-tool', 'note-unchanged', 'temporary-directory-unchanged'];
  });
  console.log(JSON.stringify({ example: 'mcp-least-privilege', transport: 'stdio', checks,
    scope: 'Local synthetic tool boundaries only; no model or prompt-injection resistance is evaluated.' }));
} catch (error) {
  console.error(`MCP example failed: ${String(error.message ?? error).slice(0, 800)}`);
  process.exitCode = 1;
}
