// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Klaytn Docs',
  tagline: 'Welcome to the Klaytn Docs',
  url: 'https://localhost:3000',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // editUrl:
          //   'https://github.com/klaytn/klaytn-docs',
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
          appId: 'YOUR_APP_ID',
          apiKey: 'YOUR_SEARCH_API_KEY',
          indexName: 'YOUR_INDEX_NAME',
        },
      navbar: {
        title: 'Klaytn Docs',
        logo: {
          alt: 'Klaytn Logo',
          src: 'img/klaytn-logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documents',
          },
          {
            href: 'https://forum.klaytn.foundation',
            label: 'Dev Forum',
            position: 'right',
          },
          {
            href: 'https://developer.klaytn.foundation',
            label: 'Dev Hub',
            position: 'right',
          },
          {
            type: 'docsVersionDropdown', position: 'right'
          },
          {
            type: 'localeDropdown', position: 'right'
          },
        ],
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
