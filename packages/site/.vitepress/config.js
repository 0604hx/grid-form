import { join, resolve } from 'path'

import { defineConfig } from 'vitepress'
import { DEMO_DESIGNER, DEMO_RENDER, GUIDE_DESIGNER, GUIDE_RENDER, GUIDE_STARTED, csdnSvg } from './resource'

let demo = (suffix = "") => join(__dirname, "../demo", suffix) + '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "格子表单/GRID-FORM",
    description: "基于 GRID 布局的简单表单工具（包含可视化设计器、渲染器）",
    lastUpdated: false,
    // cleanUrls: true,

    markdown: { lineNumbers: false, image:{ lazyLoading: true } },
    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }]
    ],
    themeConfig: {
        logo: "/logo.svg",
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '文档', link: GUIDE_STARTED },
            { text: '在线设计器', link: DEMO_DESIGNER, target:"_blank" },
            { text: '在线渲染器', link: DEMO_RENDER, target:"_blank" }
        ],
        sidebar: [
            {
                text: '使用说明',
                items: [
                    { text: '快速开始', link: GUIDE_STARTED },
                    { text: '可视化设计器', link: GUIDE_DESIGNER },
                    { text: '渲染器', link: GUIDE_RENDER },
                    { text: '数据结构', link: '/guide/data-structure' }
                ]
            },
            {
                text: "进阶",
                items: [
                    { text: '事件及数据联动', link: '/guide/advance' },
                    { text: '自定义组件', link:"/guide/custom" }
                ]
            }
        ],
        footer: {
            message: '基于<a href="https://github.com/0604hx/grid-form/LICENSE"> MIT</a> 许可发布',
            copyright: '版权所有 © 2023-至今 <a href="https://github.com/0604hx">0604hx/集成显卡</a>'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/0604hx/grid-form' },
            { icon: 'npm', link: 'https://www.npmjs.com/~0604hx' },
            { icon:{ svg: csdnSvg }, link:"https://blog.csdn.net/ssrc0604hx?type=blog" }
        ],
        lastUpdated: {
            text: '更新于',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        }
    },
    vite:{
        server: {
            port: 8080
        },
        ssr: {
            /**
             * Named export 'dateZhCN' not found. The requested module 'naive-ui' is a CommonJS module
             *
             * https://github.com/tusen-ai/naive-ui/issues/4641
             */
            noExternal: ['naive-ui']
        },
        build:{
            chunkSizeWarningLimit: 2000
        }
    }
})
