#!/usr/bin/env node
/**
 * 生成分类页卡片所需的轻量元数据：docId → { severity, roles }，按 locale 分组。
 *
 * 数据从各条目 frontmatter **确定性派生**（不手维护、不改条目），供 swizzle 后的
 * DocCard 读取，在分类页卡片上显示「严重度 / 角色」徽章，提升扫描效率（评审 P1#5）。
 * 挂在 package.json 的 prebuild / prestart，并提交一份产物，便于 diff 审阅。
 *
 * 纯读条目 + 写 src/data/entryMeta.json，不动任何条目内容。
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const SRC_DIR = path.join(REPO, 'docs');
const EN_DIR = path.join(REPO, 'i18n/en/docusaurus-plugin-content-docs/current');
const OUT = path.join(REPO, 'src/data/entryMeta.json');
const EXCLUDE_DIRS = new Set(['_templates']);
const DOC_EXT = /\.mdx?$/;

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

function buildMap(base) {
  const map = {};
  for (const file of collect(base)) {
    const fm = frontmatter(fs.readFileSync(file, 'utf8'));
    const slug = scalar(fm, 'slug');
    const severity = scalar(fm, 'severity');
    const roles = list(fm, 'roles');
    // 按全站唯一的 frontmatter slug 建键（与卡片 href 末段对应）；没有 slug、或没有
    // severity/roles 的不是误区条目（intro、案例库等）→ 不渲染徽章，跳过。
    if (!slug || (!severity && roles.length === 0)) continue;
    map[slug] = { severity: severity || '', roles };
  }
  return map;
}

const data = { 'zh-Hans': buildMap(SRC_DIR), en: buildMap(EN_DIR) };

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
console.log(
  `✓ entryMeta.json 生成：zh ${Object.keys(data['zh-Hans']).length} 条 / en ${Object.keys(data.en).length} 条`,
);
