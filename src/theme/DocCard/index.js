/**
 * Swizzle 自 @docusaurus/theme-classic 的 DocCard（仅覆写顶层 index，沿用原
 * Heading / Description 子组件）。在分类页的 doc 卡片底部追加一行「严重度 / 角色」
 * 徽章，数据来自 scripts/gen-entry-meta.js 派生的 entryMeta.json——让分类页一眼
 * 可扫描轻重与是否与自己相关（评审 P1#5）。分类卡片与外链卡片保持原样。
 */
import React, {useState, useRef, useLayoutEffect, useCallback} from 'react';
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

// 卡片描述由 Docusaurus 从条目正文首个引用块自动派生，文案恒以「一句话摘要：」/
// 「In one sentence:」开头——每张卡都重复一遍，既冗余又占地方。这里把这层前缀剥掉，
// 只留真正的摘要内容。
const SUMMARY_PREFIX = /^\s*(?:一句话摘要|In one sentence)\s*[:：]\s*/;

function stripSummaryPrefix(text) {
  return text.replace(SUMMARY_PREFIX, '');
}

// 剥掉「In one sentence:」前缀后，英文摘要常以小写字母开头（前缀后本是句中小写）。
// 把第一个字母大写——跳过开头的引号 / 反引号等非字母字符，只动首个字母。
function capitalizeFirstLetter(text) {
  return text.replace(/^([^\p{L}]*)(\p{L})/u, (_, lead, ch) => lead + ch.toUpperCase());
}

// 条目卡片正文：标题与摘要默认各截断成一行；当任一被截断时，卡片底部出现一个
// 「展开 / 收起」按钮，一次同时展开标题与摘要的完整内容（再点收起）。整张卡片是个
// <Link>，故按钮必须 preventDefault + stopPropagation，避免点按钮时跳转到条目页。
function EntryCardBody({icon, title, description}) {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  // 仅在收起态测量：单行截断时 scrollWidth 会超过 clientWidth。展开后会换行，无需再测。
  const measure = useCallback(() => {
    if (expanded) {
      return;
    }
    const t = titleRef.current;
    const d = descRef.current;
    const over =
      (t && t.scrollWidth > t.clientWidth + 1) ||
      (d && d.scrollWidth > d.clientWidth + 1);
    setOverflowing(Boolean(over));
  }, [expanded]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const onToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((v) => !v);
  };

  // 卡片整体是个 <a>，按 HTML 规范不能再嵌套 <button> 这类交互元素，否则 SSR/水合
  // 会出问题。故切换控件用带 role="button" 的 <span>，自行接管键盘（Enter / 空格）。
  const onToggleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onToggle(e);
    }
  };

  let summary = description ? stripSummaryPrefix(description) : null;
  // 仅英文站把摘要首字母大写（中文无大小写，无需处理）。
  if (summary && currentLocale === 'en') {
    summary = capitalizeFirstLetter(summary);
  }
  const showToggle = overflowing || expanded;
  const label =
    currentLocale === 'en'
      ? expanded
        ? 'Show less'
        : 'Show more'
      : expanded
        ? '收起'
        : '展开';

  return (
    <>
      <h2 className={clsx(ThemeClassNames.docs.docCard.heading, styles.cardTitle)}>
        {icon && (
          <span className={styles.cardIcon} aria-hidden="true">
            {icon}
          </span>
        )}
        <span
          ref={titleRef}
          className={clsx(
            styles.cardTitleText,
            expanded ? styles.expanded : 'text--truncate',
          )}>
          {title}
        </span>
      </h2>
      {summary && (
        <p
          ref={descRef}
          className={clsx(
            ThemeClassNames.docs.docCard.description,
            styles.cardDescription,
            expanded ? styles.expanded : 'text--truncate',
          )}>
          {summary}
        </p>
      )}
      {showToggle && (
        <span
          role="button"
          tabIndex={0}
          className={styles.toggle}
          onClick={onToggle}
          onKeyDown={onToggleKey}
          aria-expanded={expanded}>
          {label} <span aria-hidden="true">{expanded ? '▲' : '▼'}</span>
        </span>
      )}
    </>
  );
}

function CardLink({item}) {
  const doc = useDocById(item.docId ?? undefined);
  const description = item.description ?? doc?.description;
  const {icon, title} = getIconTitleProps(item);
  return (
    <Container href={item.href} className={item.className}>
      <EntryCardBody icon={icon} title={title} description={description} />
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
