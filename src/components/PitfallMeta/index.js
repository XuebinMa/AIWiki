import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

/**
 * 误区条目顶部的元数据徽章条。
 * 在 MDX 中这样使用：
 *   import PitfallMeta from '@site/src/components/PitfallMeta';
 *   <PitfallMeta roles={['工程师']} phase="编码实现" severity="中" appliesTo="Claude Code 全版本" />
 *
 * 设计上保持「展示组件」职责单一：只渲染传入的元数据，不读取 frontmatter，
 * 这样在中英两个 locale 里都能直接复用同一组件。
 */

const severityClass = {
  高: styles.sevHigh,
  中: styles.sevMed,
  低: styles.sevLow,
  high: styles.sevHigh,
  medium: styles.sevMed,
  low: styles.sevLow,
};

// 证据类型 → 可信度档配色。强（官方/研究/安全披露）、中（社区/经验）、弱（推测待验证）。
// 用蓝到灰的梯度，避免与 severity 的红/黄/绿撞色。
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

export default function PitfallMeta({ roles = [], phase, severity, appliesTo, evidence }) {
  return (
    <div className={styles.meta}>
      {phase && (
        <Badge
          label={<Translate id="pitfallMeta.phase">阶段</Translate>}
          value={phase}
          className={styles.phase}
        />
      )}
      {roles.length > 0 && (
        <Badge
          label={<Translate id="pitfallMeta.roles">角色</Translate>}
          value={roles.join(' · ')}
          className={styles.roles}
        />
      )}
      {severity && (
        <Badge
          label={<Translate id="pitfallMeta.severity">严重度</Translate>}
          value={severity}
          className={severityClass[severity] || styles.sevMed}
        />
      )}
      {appliesTo && (
        <Badge
          label={<Translate id="pitfallMeta.appliesTo">适用版本</Translate>}
          value={appliesTo}
          className={styles.version}
        />
      )}
      {evidence && (
        <Badge
          label={<Translate id="pitfallMeta.evidence">证据</Translate>}
          value={evidence}
          className={evidenceClass[evidence] || styles.evMed}
        />
      )}
    </div>
  );
}
