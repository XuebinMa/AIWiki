#!/usr/bin/env node
/**
 * 防回归闸门：中英镜像「结构对等」检查（多实例）。
 *
 * `check-mirror.js` 只保证「文件级配对」存在——中文改了、英文没跟（漏译一节、
 * 少一条内链、admonition 没搬）它全数放行，此前纯靠人工纪律。本脚本把 2026-07
 * 工业级评审用过的结构比对固化成闸门，对每对镜像比四样：
 *   1) `##` 二级标题数量（章节结构没漏搬）；
 *   2) admonition 开启序列（:::note/caution/tip/info/warning/danger 的类型与顺序）；
 *   3) 站内 .mdx 内链的「目标集合」（链到哪些条目必须一致；同一目标链几次是
 *      文风差异，刻意容忍——比对集合而非计数）；
 *   4) frontmatter 的 slug 与 sidebar_position（slug 不一致会破坏 locale 切换）。
 * 任一不满足即 exit 1。纯读文件、无副作用。
 *
 * 刻意不比的：三级标题、正文长度、链接密度——那些是翻译自由度，不是镜像失真。
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');

const INSTANCES = [
  {
    name: 'AI 编码误区',
    src: 'docs',
    en: 'i18n/en/docusaurus-plugin-content-docs/current',
  },
  {
    name: 'LLM 隐私保护',
    src: 'privacy',
    en: 'i18n/en/docusaurus-plugin-content-docs-privacy/current',
  },
];

const EXCLUDE_DIRS = new Set(['_templates']);
const DOC_EXT = /\.mdx?$/;

function collectDocs(base, dir = base, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (EXCLUDE_DIRS.has(name)) continue;
      collectDocs(base, full, out);
    } else if (DOC_EXT.test(name)) {
      out.push(path.relative(base, full));
    }
  }
  return out;
}

// 提取用于比对的结构指纹。
function fingerprint(file) {
  const text = fs.readFileSync(file, 'utf8');
  const fmMatch = text.match(/^---\n([\s\S]*?)\n---/);
  const fm = fmMatch ? fmMatch[1] : '';
  const body = fmMatch ? text.slice(fmMatch[0].length) : text;

  const scalar = (key) => {
    const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
  };

  // 站内 .mdx 内链目标（去锚点、去重成集合）。
  const linkTargets = new Set();
  for (const m of body.matchAll(/\]\(([^)\s]+?\.mdx)(?:#[^)]*)?\)/g)) {
    linkTargets.add(m[1]);
  }

  return {
    slug: scalar('slug'),
    sidebarPosition: scalar('sidebar_position'),
    h2Count: (body.match(/^## /gm) || []).length,
    admonitionSeq: (
      body.match(/^:::(note|caution|tip|info|warning|danger)/gm) || []
    )
      .map((s) => s.slice(3))
      .join(','),
    linkTargets,
  };
}

function setDiff(a, b) {
  return [...a].filter((x) => !b.has(x)).sort();
}

let failed = false;

for (const inst of INSTANCES) {
  const SRC_DIR = path.join(REPO, inst.src);
  const EN_DIR = path.join(REPO, inst.en);
  const problems = [];
  let checked = 0;

  for (const rel of collectDocs(SRC_DIR)) {
    const enFile = path.join(EN_DIR, rel);
    if (!fs.existsSync(enFile)) continue; // 配对缺失由 check-mirror.js 负责报
    checked++;
    const zh = fingerprint(path.join(SRC_DIR, rel));
    const en = fingerprint(enFile);
    const issues = [];

    if (zh.slug !== en.slug) {
      issues.push(`slug 不一致：zh=${zh.slug} / en=${en.slug}（会破坏 locale 切换）`);
    }
    if (zh.sidebarPosition !== en.sidebarPosition) {
      issues.push(
        `sidebar_position 不一致：zh=${zh.sidebarPosition} / en=${en.sidebarPosition}`,
      );
    }
    if (zh.h2Count !== en.h2Count) {
      issues.push(`## 标题数不等：zh=${zh.h2Count} / en=${en.h2Count}（漏译或多出章节）`);
    }
    if (zh.admonitionSeq !== en.admonitionSeq) {
      issues.push(
        `admonition 序列不等：zh=[${zh.admonitionSeq}] / en=[${en.admonitionSeq}]`,
      );
    }
    const onlyZh = setDiff(zh.linkTargets, en.linkTargets);
    const onlyEn = setDiff(en.linkTargets, zh.linkTargets);
    if (onlyZh.length || onlyEn.length) {
      if (onlyZh.length) issues.push(`内链目标仅 zh 有：${onlyZh.join('、')}`);
      if (onlyEn.length) issues.push(`内链目标仅 en 有：${onlyEn.join('、')}`);
    }

    if (issues.length) problems.push({ rel, issues });
  }

  if (problems.length) {
    failed = true;
    console.error(`\n✗ [${inst.name}] 镜像结构对等检查未通过（${problems.length} 对）：\n`);
    for (const p of problems) {
      console.error(`  - ${inst.src}/${p.rel}`);
      for (const i of p.issues) console.error(`      · ${i}`);
    }
    console.error('\n  修法：以中文源为准同步英文镜像（或反之），两边结构须一致。\n');
  } else {
    console.log(`✓ [${inst.name}] 镜像结构对等检查通过：${checked} 对结构一致。`);
  }
}

process.exit(failed ? 1 : 0);
