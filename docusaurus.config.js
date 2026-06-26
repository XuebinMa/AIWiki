// @ts-check
// Docusaurus 配置（CommonJS）。站点：AiWiki —— 从 AI 视角写的使用误区百科。
const { themes: prismThemes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AiWiki',
  tagline: '用 AI 编码工具写代码最容易踩的坑，以及对应的工程护栏',
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
  themes: [
    '@docusaurus/theme-mermaid',
    // 本地全文搜索（构建即用、零外部依赖、支持中英）。导航栏出现搜索框 + Ctrl/Cmd-K。
    // 后续 Algolia DocSearch 批下来再切换为官方搜索 + contextualSearch 分面。
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

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
      // Mermaid：用原生 SVG <text> 渲染节点标签（htmlLabels:false），节点按真实文字尺寸排版，
      // 绕开 v11 默认 foreignObject 路径「方框不再纵向撑高 → 末行被裁」的回归（mermaid #7354）。
      // 这是全局根治：从此无需在多行/长节点末尾手动补 <br/>&nbsp; 占位。
      mermaid: {
        options: {
          htmlLabels: false,
        },
      },
      navbar: {
        title: 'AiWiki',
        logo: {
          alt: 'AiWiki Logo',
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
            to: '/roles',
            position: 'left',
            label: '按角色浏览',
          },
          {
            to: '/tool-matrix',
            position: 'left',
            label: '工具矩阵',
          },
          {
            to: '/mechanisms',
            position: 'left',
            label: '机制索引',
          },
          {
            to: '/threat-model',
            position: 'left',
            label: '安全索引',
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
        copyright: `© ${new Date().getFullYear()} AiWiki. 内容以 CC BY-SA 4.0 共享，引用来源已在各条目标注。`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

module.exports = config;
