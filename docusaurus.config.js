// @ts-check
// Docusaurus 配置（CommonJS）。站点：AIWiki —— 从 AI 视角写的使用误区百科。
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AIWiki',
  tagline: 'AI 最理解 AI —— 从 AI 视角看你常踩的坑',
  favicon: 'img/logo.svg',

  url: 'https://xuebinma.github.io',
  baseUrl: '/AIWiki/',

  organizationName: 'xuebinma',
  projectName: 'AIWiki',

  // 链接失效时报错，保证内容质量
  onBrokenLinks: 'throw',

  // 中文为创作源，英文为译文
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': { label: '简体中文', htmlLang: 'zh-CN' },
      en: { label: 'English', htmlLang: 'en-US' },
    },
  },

  // Mermaid 自绘图，规避配图版权
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // 文档即站点首页（百科形态）
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/xuebinma/AIWiki/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      navbar: {
        title: 'AIWiki',
        logo: {
          alt: 'AIWiki Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'wikiSidebar',
            position: 'left',
            label: '百科',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/xuebinma/AIWiki',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '关于',
            items: [
              { label: '这本书是什么', to: '/' },
              { label: '贡献指南', href: 'https://github.com/xuebinma/AIWiki/blob/main/CONTRIBUTING.md' },
              { label: '写作规范', href: 'https://github.com/xuebinma/AIWiki/blob/main/STYLE-GUIDE.md' },
            ],
          },
          {
            title: '社区',
            items: [
              { label: 'GitHub', href: 'https://github.com/xuebinma/AIWiki' },
              { label: 'Issues', href: 'https://github.com/xuebinma/AIWiki/issues' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} AIWiki. 内容以 CC BY-SA 4.0 共享，引用来源已在各条目标注。`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;
