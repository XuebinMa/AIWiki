/**
 * Swizzle 自 @docusaurus/theme-classic 的 DocCard（仅覆写顶层 index，沿用原
 * Heading / Description 子组件）。在分类页的 doc 卡片底部追加一行「严重度 / 角色」
 * 徽章，数据来自 scripts/gen-entry-meta.js 派生的 entryMeta.json——让分类页一眼
 * 可扫描轻重与是否与自己相关（评审 P1#5）。分类卡片与外链卡片保持原样。
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {
  extractLeadingEmoji,
  useDocCardDescriptionCategoryItemsPlural,
} from '@docusaurus/theme-common/internal';
import {ThemeClassNames} from '@docusaurus/theme-common';
import Heading from '@theme/DocCard/Heading';
import Description from '@theme/DocCard/Description';
import entryMeta from '@site/src/data/entryMeta.json';
import styles from './styles.module.css';

// severity 文案（中英）→ 三档色键，配色对齐 PitfallMeta 的 severity。
const SEV_KEY = {
  高: 'high',
  中: 'med',
  低: 'low',
  High: 'high',
  Medium: 'med',
  Low: 'low',
};

function getFallbackEmojiIcon(item) {
  if (item.type === 'category') {
    return '🗃';
  }
  return isInternalUrl(item.href) ? '📄️' : '🔗';
}

function getIconTitleProps(item) {
  const extracted = extractLeadingEmoji(item.label);
  const emoji = extracted.emoji ?? getFallbackEmojiIcon(item);
  return {icon: emoji, title: extracted.rest.trim()};
}

function CardMeta({href}) {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  // 卡片 href 末段即条目的全站唯一 slug（与 entryMeta 键对应）。
  const slug = href.replace(/\/$/, '').split('/').pop();
  const meta = entryMeta?.[currentLocale]?.[slug];
  if (!meta || (!meta.severity && !(meta.roles && meta.roles.length))) {
    return null;
  }
  return (
    <div className={styles.metaRow}>
      {meta.severity && (
        <span className={clsx(styles.sev, styles[SEV_KEY[meta.severity] || 'med'])}>
          {meta.severity}
        </span>
      )}
      {meta.roles && meta.roles.length > 0 && (
        <span className={styles.roles}>{meta.roles.join(' · ')}</span>
      )}
    </div>
  );
}

function Container({className, href, children}) {
  return (
    <Link
      href={href}
      className={clsx(
        'card padding--lg',
        ThemeClassNames.docs.docCard.container,
        styles.cardContainer,
        className,
      )}>
      {children}
    </Link>
  );
}

function CardLink({item}) {
  const doc = useDocById(item.docId ?? undefined);
  const description = item.description ?? doc?.description;
  return (
    <Container href={item.href} className={item.className}>
      <Heading item={item} {...getIconTitleProps(item)} />
      {description && <Description item={item} description={description} />}
      {item.href && <CardMeta href={item.href} />}
    </Container>
  );
}

function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }
  return (
    <Container href={href} className={item.className}>
      <Heading item={item} {...getIconTitleProps(item)} />
      <Description
        item={item}
        description={item.description ?? categoryItemsPlural(item.items.length)}
      />
    </Container>
  );
}

export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
