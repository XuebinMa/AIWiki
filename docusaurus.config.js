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

  // 客户端模块：Mermaid 图「点击放大」（全屏叠层 + 滚轮缩放 + 拖拽）。
  clientModules: [require.resolve('./src/clientModules/mermaidZoom.js')],

  themes: [
    '@docusaurus/theme-mermaid',
    // 本地全文搜索（构建即用、零外部依赖、支持中英）。导航栏出现搜索框 + Ctrl/Cmd-K。
    // 后续 Algolia DocSearch 批下来再切换为官方搜索 + contextualSearch 分面。
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
        // 两个 docs 主题实例都入索引：'/'（AI 编码误区，preset）+ 'privacy'（LLM 隐私保护）。
        // 该插件的 docsRouteBasePath 接受 string | string[]，无需切 Algolia 即可同时索引。
        docsRouteBasePath: ['/', 'privacy'],
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  // 多实例 docs：preset 的 docs 实例承载「AI 编码误区」主题（routeBasePath '/'）；
  // 下面这个第二实例承载并列的「LLM 隐私保护」主题（routeBasePath 'privacy'）。
  // 两个主题并列、各有独立侧边栏，不是「一个主题两部分」。详见 PROPOSAL-privacy-book.md §8。
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'privacy',
        path: 'privacy',
        routeBasePath: 'privacy',
        sidebarPath: require.resolve('./sidebars-privacy.js'),
        editUrl: 'https://github.com/xuebinma/AIWiki/tree/main/',
      }),
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
      image: 'img/og-cover.png',
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
          // 主题一「AI 编码误区」：作下拉，把它专属的交叉索引（角色 / 工具矩阵 / 机制 /
          // 安全）收进来作二级子项——这些索引只服务于本主题，不该与两个并列主题同级平铺。
          // 主题二「LLM 隐私保护」保持顶层并列；待它也长出自己的索引轴后再如法改成下拉。
          {
            type: 'dropdown',
            label: 'AI 编码误区',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'wikiSidebar',
                label: '误区总览（按阶段）',
              },
              { to: '/roles', label: '按角色浏览' },
              { to: '/tool-matrix', label: '工具矩阵' },
              { to: '/mechanisms', label: '机制索引' },
              { to: '/threat-model', label: '安全索引' },
            ],
          },
          {
            type: 'docSidebar',
            docsPluginId: 'privacy',
            sidebarId: 'privacySidebar',
            position: 'left',
            label: 'LLM 隐私保护',
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
              { label: 'AiWiki 是什么', to: '/' },
              { label: 'AI 编码误区', to: '/welcome' },
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
