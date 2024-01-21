import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'

const app = createApp(App)

import naive from 'naive-ui'
app.use(naive)

import "./common.css"

// import Vant from 'vant'
// import 'vant/lib/index.css'
// app.use(Vant)

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/home', name: 'home', component: () => import('@V/Home.vue') },
        { path: '/designer', name: 'designer', component: () => import('@V/设计器.vue') },
        { path: '/render', name: 'render', component: () => import('@V/render.vue') },
        { path: '/basic', name: 'basic', component: () => import('@V/basic.vue') },
        { path: '/data-view', name: 'data', component: () => import('@V/数据展示/Index.vue') },

        {
            path: '/',
            redirect: '/home'
        }
    ]
})

app.use(router)

app.mount('#app')
