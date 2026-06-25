#!/usr/bin/env node
/**
 * 防回归闸门：英文站侧边栏分类翻译完整性检查。
 *
 * 背景（见 commit 历史的真实踩坑）：Docusaurus 对「自动生成侧边栏」的分类，
 * 翻译键由分类 label 文本推导（sidebar.<name>.category.<label>）。一旦给
 * docs/**\/_category_.json 的 label 改了字（比如加 emoji），翻译键的「来源」就变了，
 * 旧键失配、英文站静默回退成中文——而 build / Vale / cspell 都不会报错。
 *
 * 本脚本用 docusaurus 自己的 write-translations 重新生成「当前 label 应有的键」，
 * 然后检查 current.json 里这些分类键是否齐全、且 message 已译成英文（不含中文）。
 * 任一不满足即失败，逼着「改 label」与「同步翻译键」绑定发生。
 *
 * 实现：write-translations 只能写回真实文件，故先快照、跑、检查、再原样还原，
 * 不污染工作区。
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const LOCALE_DIR = path.join(REPO, 'i18n/en'); // write-translations 会改这里的多个 json
const TARGET = path.join(
  LOCALE_DIR,
  'docusaurus-plugin-content-docs/current.json',
);
const CJK = /[\u4e00-\u9fff]/; // 常用汉字区间：英文译文里不该出现

if (!fs.existsSync(TARGET)) {
  console.error(`找不到 ${TARGET}，跳过 i18n 检查。`);
  process.exit(0);
}

// 快照整个 i18n/en 目录：write-translations 会顺带改 code.json 等多个文件，
// 检查跑完必须原样还原，绝不污染工作区。
function snapshotDir(dir) {
  const snap = new Map();
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      for (const [k, v] of snapshotDir(full)) snap.set(k, v);
    } else {
      snap.set(full, fs.readFileSync(full));
    }
  }
  return snap;
}
function restoreDir(dir, snap) {
  // 删掉 write-translations 可能新建、快照里没有的文件
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) restoreDir(full, snap);
    else if (!snap.has(full)) fs.unlinkSync(full);
  }
  // 还原快照内的全部文件
  for (const [full, buf] of snap) fs.writeFileSync(full, buf);
}

const snapshot = snapshotDir(LOCALE_DIR);
let failed = false;
try {
  // 重新生成「当前 label 应有的键」（缺失键会以中文源串作为默认 message 补进来）。
  execSync('npx docusaurus write-translations --locale en', {
    cwd: REPO,
    stdio: 'pipe',
  });

  const data = JSON.parse(fs.readFileSync(TARGET, 'utf8'));
  const bad = [];
  for (const [key, val] of Object.entries(data)) {
    if (!key.startsWith('sidebar.')) continue; // 只管侧边栏分类相关键
    if (CJK.test(val.message || '')) bad.push([key, val.message]);
  }

  if (bad.length) {
    failed = true;
    console.error(
      '\n✗ i18n 分类翻译检查未通过：以下侧边栏分类键缺失或仍为中文源串。',
    );
    console.error(
      '  多半是改了 docs/**/_category_.json 的 label（如加/改 emoji）但没同步',
    );
    console.error(
      '  i18n/en/.../current.json 的「键」。修法：跑 `npm run write-translations -- --locale en`，',
    );
    console.error('  把英文文案补到新键上，删掉失配的旧键。\n');
    for (const [k, m] of bad) console.error(`  - ${k}\n      => ${m}`);
    console.error('');
  } else {
    console.log('✓ i18n 分类翻译检查通过：所有侧边栏分类键齐全且已译为英文。');
  }
} finally {
  // 原样还原整个目录，绝不留下 write-translations 的副作用。
  restoreDir(LOCALE_DIR, snapshot);
}

process.exit(failed ? 1 : 0);
