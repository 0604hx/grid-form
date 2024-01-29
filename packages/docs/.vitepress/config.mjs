import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "格子表单/GRID-FORM",
    description: "基于 GRID 布局的简单表单工具（包含可视化设计器、渲染器）",

    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }]
    ],
    themeConfig: {
        logo: "/logo.svg",
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '文档', link: '/markdown-examples' },
            { text: '在线设计器', link: ''}
        ],
        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/0604hx/grid-form' }
        ]
    },
    vite:{
        server: {
            port: 8090
        }
    }
})
