/**
 * 索引与条目内容的加载：联网取站点的 /api/index.json（内存缓存），
 * 以及按条目 raw URL 取全文。fetch 可注入，便于单测。
 */

const DEFAULT_INDEX_URL = 'https://xuebinma.github.io/AIWiki/api/index.json';
export const INDEX_URL = process.env.AIWIKI_INDEX_URL || DEFAULT_INDEX_URL;
const CACHE_TTL_MS = 10 * 60 * 1000;
const FETCH_TIMEOUT_MS = 15 * 1000;

export function createLoader({ fetchFn = fetch, now = () => Date.now() } = {}) {
  let cache = null;
  let cachedAt = 0;

  async function fetchWithTimeout(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetchFn(url, { signal: controller.signal });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} fetching ${url}`);
      }
      return res;
    } finally {
      clearTimeout(timer);
    }
  }

  async function getIndex() {
    if (cache && now() - cachedAt < CACHE_TTL_MS) return cache;
    const res = await fetchWithTimeout(INDEX_URL);
    const data = await res.json();
    if (!data || !Array.isArray(data.entries)) {
      throw new Error(`Unexpected index format from ${INDEX_URL} (spec: ${data && data.spec})`);
    }
    cache = data;
    cachedAt = now();
    return data;
  }

  /** 取条目全文（markdown），并做轻量清理：去掉 import 行与 Meta 组件标签 */
  async function getEntryContent(entry, lang = 'zh') {
    const rawUrl = lang === 'en' && entry.raw_en ? entry.raw_en : entry.raw;
    const res = await fetchWithTimeout(rawUrl);
    const text = await res.text();
    return text
      .replace(/^import\s.+$/gm, '')
      .replace(/^<(PitfallMeta|PrivacyMeta)[\s\S]*?\/>$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  return { getIndex, getEntryContent };
}
