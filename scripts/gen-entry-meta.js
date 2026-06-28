#!/usr/bin/env node
/**
 * 生成分类页卡片所需的轻量元数据：docId(slug) → 元信息，按 locale 分组。
 *
 * 本站有两个并列的 docs 主题实例，卡片需要的轴不同，各产一份产物：
 *   1)「AI 编码误区」(docs/)        → src/data/entryMeta.json        { severity, roles }
 *   2)「LLM 隐私保护」(privacy/)     → src/data/entryMeta-privacy.json { severity, maturity, technique }
 *
 * 数据从各条目 frontmatter **确定性派生**（不手维护、不改条目），供 swizzle 后的 DocCard
 * 读取，在分类页卡片上显示徽章，提升扫描效率。挂在 package.json 的 prebuild / prestart，
 * 并提交产物，便于 diff 审阅。
 *
 * 纯读条目 + 写 src/data/*.json，不动任何条目内容。
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const OUT_DIR = path.join(REPO, 'src/data');
const EXCLUDE_DIRS = new Set(['_templates']);
const DOC_EXT = /\.mdx?$/;

// 两个实例的产物定义：源/英文镜像目录、输出文件、要抽取的字段。
// fields 决定从 frontmatter 派生哪些标量；roles 这类列表字段单独处理。
const INSTANCES = [
  {
    src: 'docs',
    en: 'i18n/en/docusaurus-plugin-content-docs/current',
    out: 'entryMeta.json',
    pick: (fm) => {
      const severity = scalar(fm, 'severity');
      const roles = list(fm, 'roles');
      // 没有 severity、也没有 roles 的不是误区条目（intro、案例库等）→ 不渲染徽章。
      if (!severity && roles.length === 0) return null;
      return { severity: severity || '', roles };
    },
  },
  {
    src: 'privacy',
    en: 'i18n/en/docusaurus-plugin-content-docs-privacy/current',
    out: 'entryMeta-privacy.json',
    pick: (fm) => {
      const severity = scalar(fm, 'severity');
      const maturity = scalar(fm, 'maturity');
      const technique = scalar(fm, 'technique');
      // 没有 severity、也没有 maturity 的不是攻防条目（intro、本卷导言等）→ 不渲染徽章。
      if (!severity && !maturity) return null;
      return {
        severity: severity || '',
        maturity: maturity || '',
        ...(technique ? { technique } : {}),
      };
    },
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

function buildMap(base, pick) {
  const map = {};
  for (const file of collect(base)) {
    const fm = frontmatter(fs.readFileSync(file, 'utf8'));
    const slug = scalar(fm, 'slug');
    if (!slug) continue; // 按全站唯一的 frontmatter slug 建键（与卡片 href 末段对应）。
    const meta = pick(fm);
    if (!meta) continue;
    map[slug] = meta;
  }
  return map;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const inst of INSTANCES) {
  const data = {
    'zh-Hans': buildMap(path.join(REPO, inst.src), inst.pick),
    en: buildMap(path.join(REPO, inst.en), inst.pick),
  };
  fs.writeFileSync(
    path.join(OUT_DIR, inst.out),
    JSON.stringify(data, null, 2) + '\n',
  );
  console.log(
    `✓ ${inst.out} 生成：zh ${Object.keys(data['zh-Hans']).length} 条 / en ${Object.keys(data.en).length} 条`,
  );
}
