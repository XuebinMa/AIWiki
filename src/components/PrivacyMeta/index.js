import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

/**
 * 「LLM 隐私保护」主题条目顶部的元数据徽章条。
 * 在 MDX 中这样使用：
 *   import PrivacyMeta from '@site/src/components/PrivacyMeta';
 *   <PrivacyMeta era="卷二 · 记忆与抽取" technique="记忆与训练数据抽取"
 *     audience={['隐私工程师', 'ML 工程师']} severity="高" maturity="研究" evidence="研究支持" />
 *
 * 与 PitfallMeta 一样保持「展示组件」职责单一：只渲染传入的元数据，不读 frontmatter，
 * 中英两个 locale 直接复用同一组件。轴换成隐私主题的：卷 / 技术板块 / 受众 / 隐私风险 /
 * 成熟度 / 证据。
 */

const severityClass = {
  高: styles.sevHigh,
  中: styles.sevMed,
  低: styles.sevLow,
  High: styles.sevHigh,
  Medium: styles.sevMed,
  Low: styles.sevLow,
};

// 成熟度档：研究 / 试验 / 生产，防止把研究级方案当可部署（评审 R1，硬闸门 C）。
const maturityClass = {
  研究: styles.matResearch,
  试验: styles.matExperimental,
  生产: styles.matProduction,
  Research: styles.matResearch,
  Experimental: styles.matExperimental,
  Production: styles.matProduction,
};

// 证据类型 → 可信度档配色，与 PitfallMeta 共用同一套映射。
const evidenceClass = {
  官方文档: styles.evStrong,
  研究支持: styles.evStrong,
  安全报告: styles.evStrong,
  社区案例: styles.evMed,
  经验观察: styles.evMed,
  推测待验证: styles.evWeak,
  'Official docs': styles.evStrong,
  Research: styles.evStrong,
  'Security advisory': styles.evStrong,
  'Community case': styles.evMed,
  Experience: styles.evMed,
  Unverified: styles.evWeak,
};

function Badge({ label, value, className }) {
  return (
    <span className={`${styles.badge} ${className || ''}`}>
      <span className={styles.badgeLabel}>{label}</span>
      <span className={styles.badgeValue}>{value}</span>
    </span>
  );
}

export default function PrivacyMeta({
  era,
  technique,
  audience = [],
  severity,
  maturity,
  evidence,
}) {
  return (
    <div className={styles.meta}>
      {era && (
        <Badge
          label={<Translate id="privacyMeta.era">卷</Translate>}
          value={era}
          className={styles.era}
        />
      )}
      {technique && (
        <Badge
          label={<Translate id="privacyMeta.technique">技术板块</Translate>}
          value={technique}
          className={styles.technique}
        />
      )}
      {audience.length > 0 && (
        <Badge
          label={<Translate id="privacyMeta.audience">受众</Translate>}
          value={audience.join(' · ')}
          className={styles.audience}
        />
      )}
      {severity && (
        <Badge
          label={<Translate id="privacyMeta.severity">隐私风险</Translate>}
          value={severity}
          className={severityClass[severity] || styles.sevMed}
        />
      )}
      {maturity && (
        <Badge
          label={<Translate id="privacyMeta.maturity">成熟度</Translate>}
          value={maturity}
          className={maturityClass[maturity] || styles.matResearch}
        />
      )}
      {evidence && (
        <Badge
          label={<Translate id="privacyMeta.evidence">证据</Translate>}
          value={evidence}
          className={evidenceClass[evidence] || styles.evMed}
        />
      )}
    </div>
  );
}
