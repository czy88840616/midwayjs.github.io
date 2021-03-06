'use strict';

module.exports = {
  base: '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Midway - 面向未来的云端一体 Node.js 框架',
      description: '面向未来的云端一体框架',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Midway - Future oriented full-stack web framework',
      description: 'Future oriented full-stack web framework',
    },
  },
  themeConfig: {
    sidebarDepth: 0,
    smoothScroll: true,
    repo: 'midwayjs/midway',
    algolia: {
      apiKey: '181ce1895a48cc70c1871fa3b7185858',
      indexName: 'midwayjs'
    },
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'Midway - 面向未来的云端一体 Node.js 框架',
        description: '面向未来的云端一体框架',
        repo: 'midwayjs/midway',
        docsDir: 'docs',
        editLinks: true,
        serviceWorker: {
          updatePopup: true,
        },
        sidebar: require('./nav'),
        nav: [
          {
            text: 'API',
            link: 'https://midwayjs.org/api-reference/index.html',
            target:'_self',
          },
          {
            text: '更新日志',
            link: 'https://www.yuque.com/midwayjs/report'
          },
          { 
            text: '旧版文档', 
            items: [
              { text: 'faas 文档', link: 'https://www.yuque.com/midwayjs/faas' },
              { text: 'v1 文档', link: 'https://www.yuque.com/midwayjs/midway_v1' },
            ] 
          },
        ],
      },
      '/en/': {
        lang: 'en-US',
        title: 'Midway - Future oriented full-stack web framework',
        description: 'Future oriented full-stack Web framework',
        repo: 'midwayjs/midway',
        docsDir: 'docs',
        editLinks: true,
        serviceWorker: {
          updatePopup: true,
        },
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide' },
          { text: 'IoC', link: '/en/ioc' },
          { text: 'Toolkit', link: '/en/tool_set' },
          { text: 'TS Guide', link: '/en/ts_start' },
          {
            text: 'API',
            link: 'http://midwayjs.org/midway/api-reference/globals.html',
          },
          {
            text: 'MidwayJs Team',
            items: [
              {
                text: 'Framework',
                items: [
                  {
                    text: 'Midway - Future oriented Web framework',
                    link: '/en/',
                  },
                ],
              },
              {
                text: 'Application Manger',
                items: [
                  {
                    text: 'Pandora.js - Node.js Application Manager',
                    link: 'http://midwayjs.org/pandora/',
                  },
                ],
              },
              {
                text: 'Monitoring',
                items: [
                  {
                    text: 'Sandbox - Private Node.js APM',
                    link: 'https://github.com/midwayjs/sandbox-docker',
                  },
                ],
              },
              {
                text: 'Node.js Injection Module',
                items: [
                  {
                    text: 'Injection - Use IoC in your Node.js application',
                    link: 'http://midwayjs.org/injection',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
};
