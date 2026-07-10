import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize, searchEntries } from '../src/lib/search.js';

const FIXTURES = [
  {
    id: 'context-rot',
    subject: 'coding-pitfalls',
    kind: 'entry',
    title: '上下文腐烂：喂得越长，我反而越容易丢中段、质量越降',
    title_en: 'Context rot: the longer you feed me, the more I drop the middle',
    summary: '把整个仓库都喂给它是个错觉，长上下文呈 U 形表现，中段被严重忽略。',
    summary_en: 'Dumping the whole repo is an illusion; long context is U-shaped.',
    tags: ['上下文管理', '上下文窗口', '注意力稀释'],
    phase: '编码实现',
    severity: '中',
    evidence: '研究支持',
    url: 'https://example.test/implementation/context-rot',
    url_en: 'https://example.test/en/implementation/context-rot',
    raw: 'https://raw.test/docs/05-implementation/context-rot.mdx',
    raw_en: 'https://raw.test/i18n/en/context-rot.mdx',
  },
  {
    id: 'training-data-extraction',
    subject: 'privacy',
    kind: 'entry',
    title: '训练数据抽取：喂进训练的私有数据，外部攻击者可能让我逐字吐回来',
    title_en: 'Training data extraction',
    summary: '罕见、独特、格式固定的串存在被逐字抽取的风险。',
    summary_en: 'Rare unique strings can be extracted verbatim.',
    tags: ['记忆与回吐', '训练数据抽取', '成员推断'],
    phase: '',
    severity: '高',
    evidence: '研究支持',
    url: 'https://example.test/privacy/memorization-extraction/training-data-extraction',
    url_en: 'https://example.test/en/privacy/memorization-extraction/training-data-extraction',
    raw: 'https://raw.test/privacy/02/training-data-extraction.mdx',
    raw_en: '',
  },
  {
    id: 'tool-matrix',
    subject: 'coding-pitfalls',
    kind: 'page',
    title: '工具矩阵',
    title_en: 'Tool matrix',
    summary: '哪些误区是范式级通用的、哪些在工具间防法不同的一张索引。',
    summary_en: 'Which pitfalls are paradigm-level vs tool-specific.',
    tags: [],
    phase: '',
    severity: '',
    evidence: '',
    url: 'https://example.test/tool-matrix',
    url_en: 'https://example.test/en/tool-matrix',
    raw: 'https://raw.test/docs/tool-matrix.mdx',
    raw_en: '',
  },
];

test('tokenize extracts latin words and CJK bigrams', () => {
  const tokens = tokenize('Context 上下文');
  assert.ok(tokens.includes('context'));
  assert.ok(tokens.includes('上下'));
  assert.ok(tokens.includes('下文'));
});

test('tokenize handles single CJK char and empty input', () => {
  assert.deepEqual(tokenize(''), []);
  assert.ok(tokenize('坑').includes('坑'));
});

test('finds entry by Chinese title keywords', () => {
  const results = searchEntries(FIXTURES, '上下文 变笨');
  assert.equal(results[0].id, 'context-rot');
});

test('finds entry by English query against en fields', () => {
  const results = searchEntries(FIXTURES, 'context rot long window');
  assert.equal(results[0].id, 'context-rot');
});

test('title match outranks summary-only match', () => {
  // 「训练数据」在第二条的 title 与 tags 中，第一条完全不含
  const results = searchEntries(FIXTURES, '训练数据');
  assert.equal(results[0].id, 'training-data-extraction');
});

test('subject filter restricts results', () => {
  const results = searchEntries(FIXTURES, '喂', { subject: 'privacy' });
  assert.ok(results.length > 0);
  assert.ok(results.every((r) => r.subject === 'privacy'));
});

test('limit caps result count', () => {
  const results = searchEntries(FIXTURES, '的', { limit: 1 });
  assert.ok(results.length <= 1);
});

test('no match returns empty array', () => {
  const results = searchEntries(FIXTURES, 'zzz-nonexistent-zzz');
  assert.deepEqual(results, []);
});

test('empty query returns empty array', () => {
  assert.deepEqual(searchEntries(FIXTURES, '   '), []);
});
