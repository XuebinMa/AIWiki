/**
 * 纯函数检索逻辑：无依赖、无 IO，便于单测。
 *
 * 打分模型（KISS）：查询切成 token（拉丁词 + CJK 二元组），
 * 对每个 token 按命中字段加权求和——标题 > 标签/id > 摘要。
 */

const CJK_RUN = /[一-鿿㐀-䶿]+/g;
const LATIN_WORD = /[a-z0-9][a-z0-9._-]*/g;

const FIELD_WEIGHTS = [
  { field: 'title', weight: 4 },
  { field: 'title_en', weight: 4 },
  { field: 'id', weight: 3 },
  { field: 'tagsText', weight: 3 },
  { field: 'summary', weight: 2 },
  { field: 'summary_en', weight: 2 },
];

const DEFAULT_LIMIT = 5;

export function tokenize(query) {
  const text = String(query || '').toLowerCase();
  const tokens = new Set();
  for (const m of text.matchAll(LATIN_WORD)) tokens.add(m[0]);
  for (const m of text.matchAll(CJK_RUN)) {
    const run = m[0];
    if (run.length === 1) {
      tokens.add(run);
      continue;
    }
    for (let i = 0; i < run.length - 1; i++) tokens.add(run.slice(i, i + 2));
  }
  return [...tokens];
}

function scoreEntry(entry, tokens) {
  const haystacks = {
    title: entry.title.toLowerCase(),
    title_en: (entry.title_en || '').toLowerCase(),
    id: entry.id.toLowerCase(),
    tagsText: (entry.tags || []).join(' ').toLowerCase(),
    summary: (entry.summary || '').toLowerCase(),
    summary_en: (entry.summary_en || '').toLowerCase(),
  };
  let score = 0;
  for (const token of tokens) {
    for (const { field, weight } of FIELD_WEIGHTS) {
      if (haystacks[field].includes(token)) score += weight;
    }
  }
  return score;
}

/**
 * @param {Array<object>} entries index.json 里的条目数组
 * @param {string} query 自然语言或关键词查询（中英皆可）
 * @param {{subject?: string, limit?: number}} [options]
 * @returns {Array<object>} 按相关度降序的条目（含 score）
 */
export function searchEntries(entries, query, options = {}) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const { subject, limit = DEFAULT_LIMIT } = options;
  const pool = subject ? entries.filter((e) => e.subject === subject) : entries;

  return pool
    .map((entry) => ({ ...entry, score: scoreEntry(entry, tokens) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
