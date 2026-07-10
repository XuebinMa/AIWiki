import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createLoader } from '../src/lib/loader.js';

const INDEX_BODY = {
  site: 'https://example.test',
  spec: 'aiwiki-index-v1',
  count: 1,
  entries: [{ id: 'x', title: 't', raw: 'https://raw.test/x.mdx', raw_en: '' }],
};

function fakeFetch(bodyByUrl, { failStatus } = {}) {
  const calls = [];
  const fn = async (url) => {
    calls.push(url);
    if (failStatus) return { ok: false, status: failStatus };
    return {
      ok: true,
      status: 200,
      json: async () => bodyByUrl[url],
      text: async () => bodyByUrl[url],
    };
  };
  fn.calls = calls;
  return fn;
}

test('getIndex fetches, validates, and caches within TTL', async () => {
  let t = 0;
  const fetchFn = fakeFetch({ 'https://xuebinma.github.io/AIWiki/api/index.json': INDEX_BODY });
  const loader = createLoader({ fetchFn, now: () => t });

  const first = await loader.getIndex();
  assert.equal(first.count, 1);
  t += 1000; // TTL 内
  await loader.getIndex();
  assert.equal(fetchFn.calls.length, 1);

  t += 11 * 60 * 1000; // 超过 TTL
  await loader.getIndex();
  assert.equal(fetchFn.calls.length, 2);
});

test('getIndex throws on non-OK response', async () => {
  const loader = createLoader({ fetchFn: fakeFetch({}, { failStatus: 503 }) });
  await assert.rejects(() => loader.getIndex(), /HTTP 503/);
});

test('getIndex throws on malformed payload', async () => {
  const fetchFn = fakeFetch({
    'https://xuebinma.github.io/AIWiki/api/index.json': { nope: true },
  });
  const loader = createLoader({ fetchFn });
  await assert.rejects(() => loader.getIndex(), /Unexpected index format/);
});

test('getEntryContent strips imports and meta components', async () => {
  const mdx = [
    '---',
    'title: 示例',
    '---',
    '',
    "import PitfallMeta from '@site/src/components/PitfallMeta';",
    '',
    "<PitfallMeta roles={['工程师']} severity=\"中\" />",
    '',
    '> 一句话摘要：正文开始。',
  ].join('\n');
  const fetchFn = fakeFetch({ 'https://raw.test/x.mdx': mdx });
  const loader = createLoader({ fetchFn });
  const content = await loader.getEntryContent({ raw: 'https://raw.test/x.mdx', raw_en: '' });
  assert.ok(!content.includes('import PitfallMeta'));
  assert.ok(!content.includes('<PitfallMeta'));
  assert.ok(content.includes('一句话摘要：正文开始'));
});

test('getEntryContent falls back to zh raw when en missing', async () => {
  const fetchFn = fakeFetch({ 'https://raw.test/x.mdx': 'zh content' });
  const loader = createLoader({ fetchFn });
  const content = await loader.getEntryContent({ raw: 'https://raw.test/x.mdx', raw_en: '' }, 'en');
  assert.equal(content, 'zh content');
});
