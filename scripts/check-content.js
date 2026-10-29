#!/usr/bin/env node
/** Content delivery checks and a review queue, using actual bilingual source files. */
const fs = require('fs');
const path = require('path');
const { buildIndex, frontmatter, scalar, list, collect, INSTANCES } = require('./gen-mcp-index');

const REPO = path.resolve(__dirname, '..');
const ENUMS = {
  severity: { zh: ['高', '中', '低'], en: ['high', 'medium', 'low'] },
  evidence: {
    zh: ['官方文档', '研究支持', '安全报告', '社区案例', '经验观察', '推测待验证'],
    en: ['official docs', 'research', 'security advisory', 'community case', 'experience', 'unverified'],
  },
  maturity: { zh: ['研究', '试验', '生产'], en: ['research', 'experimental', 'production'] },
};

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}

function sourceUrls(fm) {
  return [...new Set([...fm.matchAll(/\burl:\s*["']([^"']+)["']/g)].map((m) => m[1]))].sort();
}

function checkContent() {
  const index = buildIndex({ sourceCommit: '' });
  const errors = [];
  const ids = new Set();
  for (const entry of index.entries) {
    if (ids.has(entry.id)) errors.push(`Duplicate canonical id: ${entry.id}`);
    ids.add(entry.id);
    if (entry.kind === 'entry' && (!entry.summary || !entry.summary_en)) {
      errors.push(`Missing bilingual entry summary: ${entry.id}`);
    }
  }

  for (const inst of INSTANCES) {
    const srcBase = path.join(REPO, inst.src);
    for (const file of collect(srcBase)) {
      const relative = path.relative(srcBase, file);
      const enFile = path.join(REPO, inst.en, relative);
      if (!fs.existsSync(enFile)) {
        errors.push(`Missing English mirror: ${inst.src}/${relative}`);
        continue;
      }
      const zh = frontmatter(fs.readFileSync(file, 'utf8'));
      const en = frontmatter(fs.readFileSync(enFile, 'utf8'));
      if (JSON.stringify(sourceUrls(zh)) !== JSON.stringify(sourceUrls(en))) {
        errors.push(`Source URLs differ: ${inst.src}/${relative}`);
      }
      for (const key of ['verified_at', 'review_after']) {
        const value = scalar(zh, key);
        if (value !== scalar(en, key)) errors.push(`Review metadata differs (${key}): ${relative}`);
        if (value && !validDate(value)) errors.push(`Invalid ${key}: ${relative}`);
      }
      if (scalar(zh, 'review_after') && (!scalar(zh, 'verified_at') || scalar(zh, 'review_after') < scalar(zh, 'verified_at'))) {
        errors.push(`review_after precedes verified_at: ${relative}`);
      }
      for (const [locale, full, fm] of [['zh', file, zh], ['en', enFile, en]]) {
        const text = fs.readFileSync(full, 'utf8');
        const isEntry = /^\d[^/]*\//.test(relative);
        const required = ['title', 'slug', ...(isEntry ? ['severity', 'evidence', ...(inst.subject === 'privacy'
          ? ['era', 'technique', 'attack_surface', 'maturity'] : ['phase', 'applies_to'])] : [])];
        for (const key of required) {
          if (!scalar(fm, key)) errors.push(`Missing required ${key} (${locale}): ${relative}`);
        }
        if (isEntry && !sourceUrls(fm).length) errors.push(`Missing sources (${locale}): ${relative}`);
        for (const [key, values] of Object.entries(ENUMS)) {
          const value = scalar(fm, key);
          if (value && !values[locale].includes(locale === 'en' ? value.toLowerCase() : value)) {
            errors.push(`Invalid ${key} (${locale}): ${relative}`);
          }
        }
        const meta = text.match(/<(?:PitfallMeta|PrivacyMeta)\s([\s\S]*?)\/>/);
        if (isEntry && !meta) errors.push(`Missing Meta component (${locale}): ${relative}`);
        if (!meta) continue;
        const fields = inst.subject === 'privacy' ? ['severity', 'evidence', 'maturity', 'era', 'technique'] : ['phase', 'severity', 'evidence', 'appliesTo'];
        for (const key of fields) {
          const shown = meta[1].match(new RegExp(`\\b${key}="([^"]+)"`));
          const expected = scalar(fm, key === 'appliesTo' ? 'applies_to' : key);
          if (!shown || expected !== shown[1]) errors.push(`Displayed ${key} missing or differs from frontmatter (${locale}): ${relative}`);
        }
        const roleKey = inst.subject === 'privacy' ? 'audience' : 'roles';
        const expectedRoles = list(fm, roleKey).sort();
        const shownRoles = meta[1].match(new RegExp(`\\b${roleKey}=\\{\\[([^\\]]*)\\]\\}`));
        const roles = shownRoles ? [...shownRoles[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1]).sort() : [];
        if (!expectedRoles.length || JSON.stringify(expectedRoles) !== JSON.stringify(roles)) {
          errors.push(`Displayed ${roleKey} missing or differs from frontmatter (${locale}): ${relative}`);
        }
      }
    }
    const mechanismFile = path.join(srcBase, 'mechanisms.mdx');
    const mechanismLinks = [...fs.readFileSync(mechanismFile, 'utf8').matchAll(/\]\(\.\/([^\s)]+\.mdx)\)/g)].map((m) => m[1]);
    for (const file of collect(srcBase)) {
      const relative = path.relative(srcBase, file);
      const fm = frontmatter(fs.readFileSync(file, 'utf8'));
      if (!scalar(fm, 'severity')) continue;
      if (mechanismLinks.filter((link) => link === relative).length !== 1) {
        errors.push(`Entry must appear once in mechanism index: ${inst.src}/${relative}`);
      }
    }
  }
  return { index, errors };
}

function reviewQueue(index, asOf = new Date().toISOString().slice(0, 10)) {
  if (!validDate(asOf)) throw new Error('as-of must be YYYY-MM-DD');
  return index.entries.filter((entry) => entry.kind === 'entry').map((entry) => ({
    id: entry.id,
    title: entry.title,
    verified_at: entry.verified_at || null,
    review_after: entry.review_after || null,
    status: !entry.verified_at ? 'needs-review-metadata' : entry.review_after && entry.review_after <= asOf ? 'due' : 'recorded',
    triggers: entry.review_triggers,
  })).filter((entry) => entry.status !== 'recorded');
}

if (require.main === module) {
  const { index, errors } = checkContent();
  if (process.argv.includes('--review-queue')) {
    const asOf = process.argv.find((arg) => arg.startsWith('--as-of='))?.split('=')[1];
    console.log(JSON.stringify(reviewQueue(index, asOf), null, 2));
  } else {
    for (const error of errors) console.error(`✗ ${error}`);
    console.log(`${errors.length ? '✗' : '✓'} 内容交付检查：${index.count} 对文档；${errors.length} 个问题；${reviewQueue(index).length} 条待补复核元数据或到期。`);
  }
  process.exitCode = errors.length ? 1 : 0;
}

module.exports = { checkContent, reviewQueue, validDate };
