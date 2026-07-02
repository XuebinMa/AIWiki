#!/usr/bin/env node
/**
 * 防回归闸门：散文里的「手写条目计数」与仓库实际一致性。
 *
 * 背景（2026-07 工业级评审，同类债第三次发生才立此闸门）：条目总数被手写在
 * 多处散文里（core-20 的「全书 N 条」、CLAUDE.md「现状」段），每次新增条目都
 * 靠人记得同步——已先后漂移过 56→66→77 三个旧值。本脚本把「声称 = 实际」变成
 * CI 强制：实际数从条目 frontmatter 确定性统计（与 gen-entry-meta 同口径：
 * 生命周期/卷目录下含 `severity:` 的 .mdx），声称数用锚定正则从散文里抠出来比对。
 *
 * 若你改了声称语句的措辞导致正则匹配不到，本脚本会「找不到即失败」——
 * 这是刻意的：宁可让你来改这里的规则，也不让检查静默失效。
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');

// 实际条目数：主题源目录下、数字开头的阶段/卷子目录里，frontmatter 含 severity 的文档。
function countEntries(srcRoot) {
  let count = 0;
  const base = path.join(REPO, srcRoot);
  for (const dirName of fs.readdirSync(base)) {
    if (!/^\d/.test(dirName)) continue;
    const dir = path.join(base, dirName);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!/\.mdx?$/.test(f)) continue;
      const text = fs.readFileSync(path.join(dir, f), 'utf8');
      const fm = text.match(/^---\n([\s\S]*?)\n---/);
      if (fm && /^severity:/m.test(fm[1])) count++;
    }
  }
  return count;
}

const docsCount = countEntries('docs');
const privacyCount = countEntries('privacy');

// 声称清单：文件 × 锚定正则（捕获组 1 = 声称的数字）× 应等于的实际数。
// 新增「手写计数」时必须在这里登记；改措辞时同步改正则。
const CLAIMS = [
  {
    file: 'docs/core-20.mdx',
    pattern: /全书 \[(\d+) 条\]/,
    expect: docsCount,
    label: '「全书 [N 条]」',
  },
  {
    file: 'i18n/en/docusaurus-plugin-content-docs/current/core-20.mdx',
    pattern: /All \[(\d+) entries\]/,
    expect: docsCount,
    label: '"All [N entries]"',
  },
  {
    file: 'CLAUDE.md',
    pattern: /已铺 (\d+) 条误区/,
    expect: docsCount,
    label: '「已铺 N 条误区」',
  },
  {
    file: 'CLAUDE.md',
    pattern: /个根因桶覆盖全 (\d+) 条/,
    expect: docsCount,
    label: '「根因桶覆盖全 N 条」',
  },
  {
    file: 'CLAUDE.md',
    pattern: /已 (\d+) 条中英条目/,
    expect: privacyCount,
    label: '「已 N 条中英条目」（隐私主题）',
  },
];

let failed = false;
console.log(`实际条目数：docs ${docsCount} 条 / privacy ${privacyCount} 条`);

for (const claim of CLAIMS) {
  const full = path.join(REPO, claim.file);
  if (!fs.existsSync(full)) {
    failed = true;
    console.error(`✗ ${claim.file} 不存在（声称登记表过期？同步更新本脚本）。`);
    continue;
  }
  const text = fs.readFileSync(full, 'utf8');
  const m = text.match(claim.pattern);
  if (!m) {
    failed = true;
    console.error(
      `✗ ${claim.file}：没找到 ${claim.label} 声称语句——若改了措辞，请同步更新 scripts/check-counts.js 的匹配规则（检查不允许静默失效）。`,
    );
    continue;
  }
  const claimed = Number(m[1]);
  if (claimed !== claim.expect) {
    failed = true;
    console.error(
      `✗ ${claim.file}：${claim.label} 写的是 ${claimed}，实际是 ${claim.expect}——请把声称改成 ${claim.expect}。`,
    );
  } else {
    console.log(`✓ ${claim.file}：${claim.label} = ${claimed}，与实际一致。`);
  }
}

process.exit(failed ? 1 : 0);
