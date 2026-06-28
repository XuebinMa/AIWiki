#!/usr/bin/env node
/**
 * 防回归闸门：英文站侧边栏分类翻译完整性检查（多实例）。
 *
 * 背景（见 commit 历史的真实踩坑）：Docusaurus 对「自动生成侧边栏」的分类，翻译键由
 * 分类 label 文本推导（sidebar.<sidebarId>.category.<label>）。一旦给某个 _category_.json
 * 的 label 改了字（比如加 emoji），翻译键的「来源」就变了，旧键失配、英文站静默回退成
 * 中文——而 build / Vale / cspell 都不会报错。
 *
 * 本站有两个并列的 docs 主题实例，各有自己的 current.json：
 *   1) preset docs（AI 编码误区）：docusaurus-plugin-content-docs/current.json
 *   2) privacy 实例（LLM 隐私保护）：docusaurus-plugin-content-docs-privacy/current.json
 * write-translations 会一次性把两个实例的分类键都重新生成，故两个 current.json 都要查。
 *
 * 本脚本用 docusaurus 自己的 write-translations 重新生成「当前 label 应有的键」，然后检查
 * 各 current.json 里的分类键是否齐全、且 message 已译成英文（不含中文）。任一不满足即失败，
 * 逼着「改 label」与「同步翻译键」绑定发生。
 *
 * 实现：write-translations 只能写回真实文件，故先快照、跑、检查、再原样还原，不污染工作区。
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const LOCALE_DIR = path.join(REPO, 'i18n/en'); // write-translations 会改这里的多个 json

// 两个实例的分类翻译目标文件。新增实例时往这里加一项即可。
const TARGETS = [
  {
    name: 'AI 编码误区',
    file: path.join(LOCALE_DIR, 'docusaurus-plugin-content-docs/current.json'),
  },
  {
    name: 'LLM 隐私保护',
    file: path.join(
      LOCALE_DIR,
      'docusaurus-plugin-content-docs-privacy/current.json',
    ),
  },
];
const CJK = /[\u4e00-\u9fff]/; // 常用汉字区间：英文译文里不该出现

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
  // write-translations 一次性覆盖所有 docs 实例，两个 current.json 同时刷新。
  execSync('npx docusaurus write-translations --locale en', {
    cwd: REPO,
    stdio: 'pipe',
  });

  for (const target of TARGETS) {
    if (!fs.existsSync(target.file)) {
      console.error(`找不到 ${target.file}，跳过 [${target.name}] i18n 检查。`);
      continue;
    }
    const data = JSON.parse(fs.readFileSync(target.file, 'utf8'));
    const bad = [];
    for (const [key, val] of Object.entries(data)) {
      if (!key.startsWith('sidebar.')) continue; // 只管侧边栏分类相关键
      if (CJK.test(val.message || '')) bad.push([key, val.message]);
    }

    if (bad.length) {
      failed = true;
      console.error(
        `\n✗ [${target.name}] i18n 分类翻译检查未通过：以下侧边栏分类键缺失或仍为中文源串。`,
      );
      console.error(
        '  多半是改了对应 _category_.json 的 label（如加/改 emoji）但没同步',
      );
      console.error(
        '  current.json 的「键」。修法：跑 `npm run write-translations -- --locale en`，',
      );
      console.error('  把英文文案补到新键上，删掉失配的旧键。\n');
      for (const [k, m] of bad) console.error(`  - ${k}\n      => ${m}`);
      console.error('');
    } else {
      console.log(
        `✓ [${target.name}] i18n 分类翻译检查通过：所有侧边栏分类键齐全且已译为英文。`,
      );
    }
  }
} finally {
  // 原样还原整个目录，绝不留下 write-translations 的副作用。
  restoreDir(LOCALE_DIR, snapshot);
}

process.exit(failed ? 1 : 0);
