// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github
const darkCodeTheme = require('prism-react-renderer').themes.dracula

const {
  remarkCodeHike,
} = require("@code-hike/mdx")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Klaytn Docs',
  tagline: 'Welcome to the Klaytn Docs',

  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  onBrokenLinks: 'ignore',

  baseUrl: '/',
  url: 'https://docs.klaytn.foundation',

  organizationName: 'klaytn', //only needed when using `docusaurus deploy`command
  projectName: 'klaytn-docs', //only needed when using `docusaurus deploy`command
  deploymentBranch: 'main', //only needed when using `docusaurus deploy`command
  trailingSlash: true, // was "false"

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko', 'vi'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko',
        calendar: 'gregory',
        path: 'ko',
      },
      vi: {
        label: 'Tiếng Việt',
        direction: 'ltr',
        htmlLang: 'vi',
        calendar: 'gregory',
        path: 'vi',
      },      
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          showReadingTime: true,
        },
        docs: {
          beforeDefaultRemarkPlugins: [
            [remarkCodeHike, { theme: "nord" }],
          ],
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: true,
          showLastUpdateTime: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Current',
            },
          },
          editUrl:
            'https://github.com/klaytn/klaytn-docs/tree/main/',
          
          // TODO-Klaytn : it will be activated after dacusaurus-openapi bugfix
          // docLayoutComponent: "@theme/DocPage",
          // docItemComponent: "@theme/ApiItem"
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve("@code-hike/mdx/styles.css"),
          ]
        },
      }),
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "openapi", // plugin id
        docsPluginId: "classic", // id of plugin-content-docs or preset for rendering docs
        config: {
          web3rpc: {
            // template: "api.mustache",
            specPath: "web3rpc.yaml",
            outputDir: "docs/klaytn-json-rpc",
            sidebarOptions: { // optional, instructs plugin to generate sidebar.js
              groupPathsBy: "tag", // group sidebar items by operation "tag"
              categoryLinkSource: "tag",
            },
          }
        }
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"], // export theme components
  stylesheets: [
    {
      href: "https://use.fontawesome.com/releases/v5.11.0/css/all.css",
      type: "text/css",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        contextualSearch: true,
        appId: '8CTSIJ444T', // For test only. To be replaced with that of klaytn account
        apiKey: '5d557e0c45ed20f53b1464a9e8bea5a2', // For test only. To be replaced with that of klaytn account
        indexName: 'my-first-index', // For test only. To be replaced with that of klaytn account
      },
      navbar: {
        title: 'Klaytn Docs',
        logo: {
          alt: 'Klaytn Logo',
          src: 'img/klaytn-logo.png',
        },
        items: [
          {
            to: "docs/learn",
            position: 'left',
            sidebarid: 'learnSidebar',
            label: 'Learn',
          },
          {
            to: "docs/build",
            position: 'left',
            sidebarid: 'buildSidebar',
            label: 'Build',
          },
          {
            to: "docs/nodes",
            position: 'left',
            sidebarid: 'nodeSidebar',
            label: 'Nodes',
          },
          {
            to: "docs/references",
            position: 'left',
            sidebarid: 'refSidebar',
            label: 'References',
          },
/*          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documents',
          },
          { to: 'blog', label: 'Blog', position: 'left' },
          {
            href: 'https://forum.klaytn.foundation',
            label: 'Dev Forum',
            position: 'left',
          },
          {
            href: 'https://developer.klaytn.foundation',
            label: 'Dev Hub',
            position: 'left',
          },*/
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
              {
                href: 'https://klaytn.gitbook.io/',
                label: 'Legacy',
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/klaytn',
            position: 'right',
            alt: 'GitHub repository',
            className: 'header-github-link',
          },          
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
          variant: "requests",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
          variant: "axios",
        },
        {
          highlight: "java",
          language: "java",
          logoClass: "java",
          variant: "unirest",
        },
      ],
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Sites',
            items: [
              {
                label: 'Klaytn Square',
                href: 'https://square.klaytn.foundation/Home',
              },
              {
                label: 'Klaytn Online Toolkit',
                href: 'https://toolkit.klaytn.foundation/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Medium',
                href: 'https://medium.com/klaytn',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/klaytn_official',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'KIPs',
                href: 'https://kips.klaytn.foundation/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/klaytn',
              },
            ],
          },
        ],
        copyright: `© Klaytn Foundation ${new Date().getFullYear()}. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
