import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Areal HR System",
  description: "Веб-приложение, в котором специалист по кадрам ведет учет сотрудников в нескольких организациях.",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Главная', link: '/' },
      { text: 'API', link: '/api' },
      { text: 'Установка', link: '/installation' }
    ],

    sidebar: [
      {
        text: 'Установка и настройка',
        items: [
          { text: 'API', link: '/api' },
          { text: 'Установка', link: '/installation' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/merkit5/areal-hr_ext-test.git' }
    ]
  }
})
