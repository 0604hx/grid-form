import { join, resolve } from 'path'

import { defineConfig } from 'vitepress'
import { csdnSvg } from './resource'

let demo = (suffix = "") => join(__dirname, "../demo", suffix) + '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "格子表单/GRID-FORM",
    description: "基于 GRID 布局的简单表单工具（包含可视化设计器、渲染器）",
    lastUpdated: false,
    cleanUrls: true,

    markdown: { lineNumbers: false, image:{ lazyLoading: true } },
    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }]
    ],
    themeConfig: {
        logo: "/logo.svg",
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '文档', link: '/guide/getting-started' },
            { text: '在线设计器', link: ''}
        ],
        sidebar: [
            {
                text: '使用说明',
                items: [
                    { text: '快速开始', link: '/guide/getting-started' },
                    { text: '可视化设计器', link: '/guide/designer' },
                    { text: '渲染器', link: '/guide/render' },
                    // {
                    //     text: '数据字典', link: '/api-examples',
                    //     items:[
                    //         { text:"表单（容器）", link:"" },
                    //         { text:"表单项（组件）", link:"" }
                    //     ]
                    // }
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
            port: 8090
        },
        resolve: {
            alias: {
                '@/'            : demo(),
                '@V/'           : demo(`views`),
                '@C/'           : demo("component")
            },
        },
        build: {
            sourcemap: false,
            rollupOptions: {
                input: {
                    index   : resolve('demo/index.html'),
                    vant    : resolve('demo/vant.html'),
                    element : resolve('demo/element.html'),
                },
            },
        },
    }
})
