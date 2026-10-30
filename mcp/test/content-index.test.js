import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { canonicalId, resolveEntry } from '../src/lib/identity.js';
import { createLoader } from '../src/lib/loader.js';

const require = createRequire(import.meta.url);
const { buildIndex, toLegacyIndex, summaryOf, summaryOfEn, collect, INSTANCES, frontmatter, scalar, list } = require('../../scripts/gen-mcp-index.js');
const repo = fileURLToPath(new URL('../../', import.meta.url));

test('real documents produce bilingual entry summaries and unique canonical IDs', () => {
  const index = buildIndex({ sourceCommit: '' });
  const entries = index.entries.filter((entry) => entry.kind === 'entry');
  const sourceEntryCount = INSTANCES.flatMap((inst) => collect(path.join(repo, inst.src)))
    .filter((file) => scalar(frontmatter(fs.readFileSync(file, 'utf8')), 'severity')).length;
  assert.equal(entries.length, sourceEntryCount);
  assert.equal(new Set(index.entries.map((entry) => entry.id)).size, index.count);
  for (const entry of entries) {
    assert.ok(entry.summary.trim(), `Missing Chinese summary: ${entry.id}`);
    assert.ok(entry.summary_en.trim(), `Missing English summary: ${entry.id}`);
    assert.equal(entry.id, `${entry.subject}:${entry.legacy_id}`);
  }
});

test('an empty quoted summary never consumes the following section heading', () => {
  assert.equal(summaryOf('> 一句话摘要：\n\n## 现象\n内容', ''), '');
  assert.equal(summaryOfEn('> In one sentence:\n\n## Symptom\nBody', ''), '');
  assert.equal(summaryOfEn('> In one sentence: First\n> second\n\n## Symptom', ''), 'First second');
});

test('inline metadata helpers never consume values from a later line', () => {
  assert.equal(scalar('slug:\nsidebar_position: 12', 'slug'), undefined);
  assert.ok(!scalar('slug: \t\nsidebar_position: 12', 'slug'));
  assert.equal(scalar('slug: \tcontext-rot', 'slug'), 'context-rot');
  assert.deepEqual(list('tags:\n[not-an-inline-list]', 'tags'), []);
  assert.deepEqual(list('tags: \t[context, memory]', 'tags'), ['context', 'memory']);
});

test('legacy endpoint keeps old IDs for clients that cannot read legacy_id', () => {
  const v2 = buildIndex({ sourceCommit: '' });
  const v1 = toLegacyIndex(v2);
  assert.equal(v1.spec, 'aiwiki-index-v1');
  assert.equal(v1.entries.find((entry) => entry.id === 'context-rot').canonical_id, 'coding-pitfalls:context-rot');
  assert.equal(v1.count, v2.count);
});

test('content gate rejects missing source identity, invalid maturity and hidden metadata', () => {
  const script = path.join(repo, 'scripts/check-content.js');
  const mutations = [
    [ /privacy\/04-rag-agents\/agent-privacy-benchmark\.mdx$/, /^slug:.*\n/m, '', /Missing required slug/ ],
    [ /privacy\/04-rag-agents\/agent-privacy-benchmark\.mdx$/, /^slug:.*$/m, 'slug:', /Missing required slug \(zh\)/ ],
    [ /docusaurus-plugin-content-docs-privacy\/current\/04-rag-agents\/agent-privacy-benchmark\.mdx$/, /^slug:.*$/m, 'slug: \t', /Missing required slug \(en\)/ ],
    [ /privacy\/04-rag-agents\/agent-privacy-benchmark\.mdx$/, /^maturity:.*$/m, 'maturity: Banana', /Invalid maturity/ ],
    [ /privacy\/04-rag-agents\/agent-privacy-benchmark\.mdx$/, / maturity="[^"]+"/, '', /Displayed maturity missing/ ],
  ];
  for (const [filePattern, search, replacement, expected] of mutations) {
    const readOnlyFs = { ...fs, readFileSync(file, ...options) {
      const result = fs.readFileSync(file, ...options);
      return filePattern.test(String(file)) && typeof result === 'string' ? result.replace(search, replacement) : result;
    } };
    const sandbox = {
      module: { exports: {} }, __dirname: path.dirname(script),
      require: (name) => name === 'fs' ? readOnlyFs : name === './gen-mcp-index' ? require('../../scripts/gen-mcp-index.js') : require(name),
    };
    vm.runInNewContext(fs.readFileSync(script, 'utf8'), sandbox, { filename: script });
    assert.ok(sandbox.module.exports.checkContent().errors.some((error) => expected.test(error)), String(expected));
  }
});

test('privacy mechanisms resolves to its own full text through search identity', async () => {
  const index = buildIndex({ sourceCommit: '' });
  const entry = resolveEntry(index.entries, 'privacy:mechanisms');
  assert.equal(entry.subject, 'privacy');
  assert.match(entry.raw_en, /content-docs-privacy/);
  const loader = createLoader({ fetchFn: async (url) => {
    assert.equal(url, entry.raw_en);
    return { ok: true, text: async () => 'Privacy mechanisms from the selected English source' };
  } });
  assert.match(await loader.getEntryContent(entry, 'en'), /^Privacy mechanisms/);
});

test('legacy IDs stay usable when unique and fail explicitly when ambiguous', () => {
  const { entries } = buildIndex({ sourceCommit: '' });
  assert.equal(resolveEntry(entries, 'context-rot').id, 'coding-pitfalls:context-rot');
  assert.throws(() => resolveEntry(entries, 'mechanisms'), /Ambiguous/);
  assert.equal(resolveEntry(entries, 'mechanisms', 'privacy').subject, 'privacy');
  assert.equal(resolveEntry(entries, 'does-not-exist'), undefined);
});

test('canonical identities also work with a cached v1 index', () => {
  const entries = [
    { id: 'mechanisms', subject: 'coding-pitfalls' },
    { id: 'mechanisms', subject: 'privacy' },
  ];
  assert.equal(canonicalId(entries[1]), 'privacy:mechanisms');
  assert.equal(resolveEntry(entries, 'privacy:mechanisms'), entries[1]);
  assert.throws(() => resolveEntry(entries, 'mechanisms'), /Ambiguous/);
});

test('production source URLs pin the build commit and source digest is repeatable', () => {
  const sourceCommit = 'a'.repeat(40);
  const first = buildIndex({ sourceCommit });
  assert.match(first.source_revision, /^sha256:[a-f0-9]{64}$/);
  assert.equal(first.source_revision, buildIndex({ sourceCommit }).source_revision);
  assert.equal(first.source_commit, sourceCommit);
  assert.ok(first.entries.every((entry) => entry.raw.includes(`/${sourceCommit}/`)));
  assert.throws(() => buildIndex({ sourceCommit: 'main' }), /full Git commit SHA/);
});
