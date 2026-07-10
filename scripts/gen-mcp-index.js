#!/usr/bin/env node
/**
 * 生成站点公开的机器可读条目索引：static/api/index.json。
 *
 * 消费方是 aiwiki-mcp（mcp/ 目录的 MCP server）等外部工具——部署后可从
 * https://xuebinma.github.io/AIWiki/api/index.json 联网获取，站点内容更新
 * 后索引随构建刷新，MCP 包无需重新发版。
 *
 * 与 gen-entry-meta.js 的分工：那份产物是站内分类页卡片的徽章数据（src/data/）；
 * 本产物是全条目的对外索引（标题 / 一句话摘要 / 标签 / URL / 源文件路径，中英双语）。
 * 同样从 frontmatter 确定性派生，不手维护、不改条目。挂 prebuild / prestart 并提交产物。
 *
 * URL 推导规则（与 Docusaurus 实际行为对齐，已对照线上 sitemap 验证）：
 *   - 目录段的数字前缀被剥掉：docs/05-implementation/x → /implementation/x
 *   - frontmatter slug 以 / 开头 → 直接作为实例内路径；否则替换路径末段
 *   - privacy 实例挂在 /privacy 下
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const OUT_FILE = path.join(REPO, 'static/api/index.json');
const SITE = 'https://xuebinma.github.io/AIWiki';
const RAW_BASE = 'https://raw.githubusercontent.com/XuebinMa/AIWiki/main';
const EXCLUDE_DIRS = new Set(['_templates']);
const DOC_EXT = /\.mdx?$/;
const NUMBER_PREFIX = /^\d+-/;

const INSTANCES = [
  {
    subject: 'coding-pitfalls',
    src: 'docs',
    en: 'i18n/en/docusaurus-plugin-content-docs/current',
    routeBase: '',
    isEntry: (fm) => Boolean(scalar(fm, 'severity')) || list(fm, 'roles').length > 0,
  },
  {
    subject: 'privacy',
    src: 'privacy',
    en: 'i18n/en/docusaurus-plugin-content-docs-privacy/current',
    routeBase: '/privacy',
    isEntry: (fm) => Boolean(scalar(fm, 'severity')) || Boolean(scalar(fm, 'maturity')),
  },
];

function collect(base, dir = base, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (EXCLUDE_DIRS.has(name)) continue;
      collect(base, full, out);
    } else if (DOC_EXT.test(name)) {
      out.push(full);
    }
  }
  return out;
}

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : '';
}

function scalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
}

function list(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*\\[(.*?)\\]`, 'm'));
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
}

// 正文里的「一句话摘要」引用块；没有则回退 frontmatter description。
function summaryOf(text, fm) {
  const m = text.match(/^>\s*一句话摘要[：:]\s*([\s\S]*?)(?=\n[^>]|\n$)/m);
  if (m) {
    return m[1]
      .split('\n')
      .map((line) => line.replace(/^>\s?/, '').trim())
      .join('')
      .replace(/\*\*/g, '')
      .trim();
  }
  return scalar(fm, 'description') || '';
}

// 英文镜像的摘要块是 "> One-line summary:" 或原样中文标记的直译；宽松匹配。
function summaryOfEn(text, fm) {
  const m = text.match(/^>\s*(?:One-line summary|一句话摘要)[：:]\s*([\s\S]*?)(?=\n[^>]|\n$)/m);
  if (m) {
    return m[1]
      .split('\n')
      .map((line) => line.replace(/^>\s?/, '').trim())
      .join(' ')
      .replace(/\*\*/g, '')
      .trim();
  }
  return scalar(fm, 'description') || '';
}

function routeOf(instance, relFile, slug) {
  const relDirs = path.dirname(relFile) === '.' ? [] : path.dirname(relFile).split(path.sep);
  const cleanDirs = relDirs.map((seg) => seg.replace(NUMBER_PREFIX, ''));
  if (slug.startsWith('/')) {
    // 绝对 slug：实例内的完整路径（privacy 的 "/" → /privacy/）
    return `${instance.routeBase}${slug === '/' ? '/' : slug}`;
  }
  return `${instance.routeBase}/${[...cleanDirs, slug].join('/')}`;
}

function build() {
  const entries = [];
  for (const inst of INSTANCES) {
    const srcBase = path.join(REPO, inst.src);
    const enBase = path.join(REPO, inst.en);
    for (const file of collect(srcBase)) {
      const text = fs.readFileSync(file, 'utf8');
      const fm = frontmatter(text);
      const slug = scalar(fm, 'slug');
      const title = scalar(fm, 'title');
      if (!slug || !title) continue;

      const relFile = path.relative(srcBase, file);
      const route = routeOf(inst, relFile, slug);

      // 同路径英文镜像（若存在）提供英文标题 / 摘要
      const enFile = path.join(enBase, relFile);
      let titleEn = '';
      let summaryEn = '';
      if (fs.existsSync(enFile)) {
        const enText = fs.readFileSync(enFile, 'utf8');
        const enFm = frontmatter(enText);
        titleEn = scalar(enFm, 'title') || '';
        summaryEn = summaryOfEn(enText, enFm);
      }

      entries.push({
        id: slug.replace(/^\//, '') || 'privacy-intro',
        subject: inst.subject,
        kind: inst.isEntry(fm) ? 'entry' : 'page',
        title,
        title_en: titleEn,
        summary: summaryOf(text, fm),
        summary_en: summaryEn,
        tags: list(fm, 'tags'),
        phase: scalar(fm, 'phase') || '',
        severity: scalar(fm, 'severity') || '',
        evidence: scalar(fm, 'evidence') || '',
        url: `${SITE}${route}`,
        url_en: `${SITE}/en${route}`,
        raw: `${RAW_BASE}/${inst.src}/${relFile.split(path.sep).join('/')}`,
        raw_en: fs.existsSync(enFile)
          ? `${RAW_BASE}/${inst.en}/${relFile.split(path.sep).join('/')}`
          : '',
      });
    }
  }
  // 稳定排序，保证产物 diff 干净
  entries.sort((a, b) => (a.subject + a.url).localeCompare(b.subject + b.url));
  return entries;
}

const entries = build();
const out = {
  site: SITE,
  spec: 'aiwiki-index-v1',
  count: entries.length,
  entries,
};
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
console.log(
  `✓ static/api/index.json 生成：共 ${entries.length} 条（entry ${entries.filter((e) => e.kind === 'entry').length} / page ${entries.filter((e) => e.kind === 'page').length}）`,
);
