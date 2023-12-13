// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

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
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
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
            sidebarId: 'learnSidebar',
            label: 'Learn',
          },
          {
            to: "docs/build",
            position: 'left',
            sidebarId: 'buildSidebar',
            label: 'Build',
          },
          {
            to: "docs/nodes",
            position: 'left',
            sidebarId: 'nodeSidebar',
            label: 'Nodes',
          },
          {
            to: "docs/references",
            position: 'left',
            sidebarId: 'refSidebar',
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
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
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
