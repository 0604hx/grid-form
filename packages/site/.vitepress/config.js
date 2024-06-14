import { defineConfig } from 'vitepress'
import { DEMO_DESIGNER, DEMO_RENDER, GUIDE_DESIGNER, GUIDE_RENDER, GUIDE_STARTED, csdnSvg, giteeSvg } from './resource'

const isProd = process.env.npm_lifecycle_event==='build'

const base = isProd ? "/grid-form/":"/"
const head = [ ['link', { rel: 'icon', href: `${base}logo.svg` }] ]

if(isProd){
    console.log(`➕ 百度统计代码...`)
    //增加百度统计
    head.push([
        'script',
        {},
        `
        window._hmt = window._hmt || [];
        (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?2011a384a05d083dddbac20462902ad2";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
        })();
        `
    ])
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base,
    title: "格子表单/GRID-FORM",
    description: "基于 GRID 布局的简单表单工具（包含可视化设计器、渲染器）",
    lastUpdated: false,
    cleanUrls: true,            // Github Pages 支持简洁 URL

    markdown: { lineNumbers: false, image:{ lazyLoading: true } },
    head,
    themeConfig: {
        logo: '/logo.svg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '文档', link: GUIDE_STARTED },
            { text: '在线设计器', link: DEMO_DESIGNER, target:"_blank" },
            {
                text: '在线渲染器',
                items:[
                    { text: '汇总展示', link: DEMO_RENDER, target:"_blank" },
                    { text: 'Vant4（有赞出品）', link: '/demo/render-vant', target:"_blank" },
                    { text: 'Varlet（Material）', link: '/demo/render-varlet', target:"_blank" },
                    { text: 'Tree（极简风）', link: '/demo/render-tree', target:"_blank" }
                ]
            }
        ],
        sidebar: [
            {
                text: '使用说明',
                items: [
                    { text: '快速开始 / Start', link: GUIDE_STARTED },
                    { text: '可视化设计器 / Designer', link: GUIDE_DESIGNER },
                    { text: '内置组件 / Component', link:'/guide/component' },
                    { text: '渲染器 / Render', link: GUIDE_RENDER },
                    { text: '数据结构 / Schema', link: '/guide/data-structure' }
                ]
            },
            {
                text: "进阶",
                items: [
                    { text: '事件及数据联动 / Advance', link: '/guide/advance' },
                    { text: '自定义组件 / Custom', link:"/guide/custom" }
                ]
            },
            {
                text: "其他",
                items: [
                    { text: '更新日志 / Changelog', link: '/guide/changelog' }
                ]
            }
        ],
        outline:{
            level: [2,4],
            label: '文档目录'
        },
        footer: {
            message: '基于<a href="https://github.com/0604hx/grid-form/LICENSE"> MIT</a> 许可发布',
            copyright: '版权所有 © 2023-至今 <a href="https://github.com/0604hx">0604hx/集成显卡</a>'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/0604hx/grid-form' },
            { icon: {svg: giteeSvg }, link:"https://gitee.com/0604hx/grid-form"},
            { icon: 'npm', link: 'https://www.npmjs.com/~0604hx' },
            { icon:{ svg: csdnSvg }, link:"https://blog.csdn.net/ssrc0604hx?type=blog" }
        ],
        lastUpdated : true
        // lastUpdated: {
        //     text: '更新于',
        //     formatOptions: {
        //         dateStyle: 'full',
        //         timeStyle: 'medium'
        //     }
        // }
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
