import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'

import naive from 'naive-ui'

const app = createApp(App)

app.use(naive)

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/home', name: 'home', component: () => import('@V/Home.vue') },
        { path: '/designer', name: 'designer', component: () => import('@V/设计器.vue') },
        { path: '/render', name: 'render', component: () => import('@V/渲染器.vue') },

        {
            path: '/',
            redirect: '/home'
        }
    ]
})

app.use(router)

app.mount('#app')
