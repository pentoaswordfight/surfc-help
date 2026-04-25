import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Surfc Help',
  description: 'How Surfc works — guides for capturing, indexing, and getting the most out of your reading.',
  lang: 'en-GB',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#FFF8F2' }],
  ],

  themeConfig: {
    siteTitle: 'Surfc Help',

    nav: [
      { text: 'Getting started', link: '/getting-started/' },
      { text: 'Surfc app', link: 'https://app.surfc.app' },
      { text: 'About Surfc', link: 'https://surfc.app' },
    ],

    sidebar: [
      {
        text: 'Getting started',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/getting-started/' },
          { text: 'Your first capture', link: '/getting-started/first-capture' },
          { text: 'The idea system', link: '/getting-started/idea-system' },
          { text: 'Sources & provenance', link: '/getting-started/sources-provenance' },
          { text: 'Idea discovery', link: '/getting-started/idea-discovery' },
        ],
      },
      {
        text: 'Beyond the basics',
        collapsed: false,
        items: [
          { text: 'Sync, offline & multi-device', link: '/sync-and-devices' },
          { text: 'Tiers & quotas', link: '/tiers-quotas' },
          { text: 'Export & data ownership', link: '/export' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/pentoaswordfight/surfc' },
    ],

    footer: {
      message: 'Surfc — a personal index of great ideas.',
      copyright: '© Surfc',
    },

    outline: {
      level: [2, 3],
      label: 'On this page',
    },
  },
})
