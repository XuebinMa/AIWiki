#!/usr/bin/env node
/**
 * 防回归闸门：中英文条目镜像完整性检查。
 *
 * 项目铁律：每条中文源（docs/ 下的 .md / .mdx）都必须有对应的英文译文，
 * 镜像到 i18n/en/docusaurus-plugin-content-docs/current/<相同子路径>。
 *
 * 现状全靠人工纪律维持。一旦新写了中文条目却忘了出英文版（或反过来删了
 * 一边），英文站就会缺页或构建异常，而 autocorrect / Vale / cspell 都不查
 * 「文件级配对」——会静默放行。本脚本做双向校验：
 *   1) 每个 docs/ 源文件都有 i18n/en 镜像；
 *   2) 每个 i18n/en 镜像都有对应的 docs/ 源（防止留下英文孤儿）。
 * 任一不满足即 exit 1，逼着「新增/删除条目」与「同步另一语种」绑定发生。
 *
 * 纯比对文件是否存在，无任何写副作用（不调用 write-translations），不污染工作区。
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const SRC_DIR = path.join(REPO, 'docs');
const EN_DIR = path.join(
  REPO,
  'i18n/en/docusaurus-plugin-content-docs/current',
);
// _templates 是写作模板，不是条目，不参与镜像校验。
const EXCLUDE_DIRS = new Set(['_templates']);
const DOC_EXT = /\.mdx?$/; // .md 或 .mdx

// 递归收集某目录下所有 .md/.mdx 的「相对子路径」（相对 base），排除模板目录。
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

const srcDocs = new Set(collectDocs(SRC_DIR));
const enDocs = new Set(collectDocs(EN_DIR));

const missingEn = []; // 有中文源、缺英文镜像
const orphanEn = []; // 有英文镜像、缺中文源
for (const rel of srcDocs) if (!enDocs.has(rel)) missingEn.push(rel);
for (const rel of enDocs) if (!srcDocs.has(rel)) orphanEn.push(rel);

if (missingEn.length || orphanEn.length) {
  console.error('\n✗ 中英镜像完整性检查未通过：\n');
  if (missingEn.length) {
    console.error('  以下中文源缺少英文译文，请补到对应镜像路径：');
    for (const rel of missingEn.sort()) {
      console.error(
        `  - docs/${rel}\n      => 需新建 i18n/en/docusaurus-plugin-content-docs/current/${rel}`,
      );
    }
    console.error('');
  }
  if (orphanEn.length) {
    console.error('  以下英文译文没有对应的中文源（孤儿，应删除或补回中文源）：');
    for (const rel of orphanEn.sort()) {
      console.error(
        `  - i18n/en/docusaurus-plugin-content-docs/current/${rel}\n      => 缺对应 docs/${rel}`,
      );
    }
    console.error('');
  }
  process.exit(1);
}

console.log(
  `✓ 中英镜像完整性检查通过：${srcDocs.size} 条中文源与英文译文一一对应。`,
);
process.exit(0);
